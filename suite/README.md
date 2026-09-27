# Decision book suite

Runs before every publish of the decision book page. Only a green run is published. It also runs
`forbidden.py` on the page: nothing personal or project-bound may stand in the template.

## Run it

    ./run_all.sh                 # the template: ../template/book.html
    FORBIDDEN=0 ./run_all.sh book.html   # a live book's own copy (it carries card numbers)
    ./run_all.sh path/to/page.html
    ONLY='talk|card' ./run_all.sh     # a subset (regex over scenario names)
    SHOW=1 ./run_all.sh          # also print every scenario's full output (stderr)
    JOBS=12 ./run_all.sh         # more Chromes in the pool (default 6)

It prints one line per scenario, `ok NAME`, `skip NAME: why` or `FAIL NAME: field why: expected …, got …`, then a
summary with the run time and the page version, and it exits 1 on any FAIL. The whole suite takes about 15 seconds.
The built pages and Chrome's DOM dumps stay in `out/` until the next run.

Needs: Google Chrome in /Applications, python3. No network: every host name is made unresolvable
(`--host-resolver-rules`), background services are off, and nothing is published or written anywhere but `out/`.

## How it works

* `lib/build.py` copies the page and puts three scripts right after `<body>`: `lib/stub.js` (the stand-in for
  `window.claude.use`), `lib/common.js` (error capture and helpers) and the scenario's `NAME.pre.js` (the data).
  `NAME.epi.js` goes right before `</body>`.
* `run_all.sh` starts `lib/pool.py serve`: JOBS headless Chromes (DevTools over `--remote-debugging-pipe`, no library),
  started once per run and closed however the run ends. No window ever opens. With `CHROME_POOL` set to the socket of
  a running pool, `run_all.sh` uses that one and starts no Chrome (`breaks/counterproof.py` does this).
* `lib/run_one.sh` builds the page and asks the pool (`lib/pool.py dump`) to run it: a fresh browser context per
  scenario (its own localStorage and IndexedDB, thrown away afterwards), the window size, a virtual time budget that
  starts at the load event (timers run as fast as the machine allows), then the DOM as `--dump-dom` would write it.
  Of the Chrome flags only `--force-dark-mode` is known (it becomes `prefers-color-scheme: dark`).
* The scenario calls `probe(out)` once (through `scenario(async out=>{…})`). `lib/check.py` reads that output and
  compares it with `NAME.expect.json`.
* Every script error and unhandled rejection anywhere on the page fails the scenario, whatever else it says.

## Add a scenario

Three files in `scenarios/`:

* `NAME.pre.js` -- the data, before the page runs: `seed(n)` for n synthetic cards, or `__DB.store.set(path, doc)`,
  and `localStorage` (e.g. `eb-view`). Stand-in knobs are listed at the top of `lib/stub.js`
  (`__SYNC`, `__FAIL`, `__SEND_DELAY`, `__ON_SEND`, `__ON_GET`, `__USE_DELAY`, `__OWNER`, `__CAN_WRITE`, `__OLD_BOOK`,
  `__ASSETS`, `__ASSETS_HAVE`, `__DL`). Only synthetic data:
  the roles "Eigner" and "Claude", example.org addresses, no names from real life.
* `NAME.epi.js` -- the actions: `scenario(async out=>{ … out.x = … })`. Helpers: `until(cond, ms)`, `sleep(ms)`,
  `$$(sel)`, `findBtn(sel, /re/)`, `goView('Aufträge')`, `typeIn(field, text)`, `press(target, key, {metaKey:true})`,
  `__DB.external(path, patch)` (another writer), `CALLS` (writes and sends in order), `READS` (doc gets).
  A `</script>` inside a string must be written `<\/script>`.
* `NAME.expect.json` -- `{"run": {…}, "expect": {…}}`.
  * `run` (all optional): `width` (1280), `height` (900), `budget` (virtual ms, 10000), `wrap` (true: inside an
    iframe of exactly `width` px -- needed below 500 px), `flags` (extra Chrome flags, e.g. `--force-dark-mode`).
  * `expect`: output key (dotted paths like `before.Claude zuletzt` or `lines.0` work) -> value. A value is compared
    exactly, unless it is an object made only of matchers: `{"min":n}`, `{"max":n}`, `{"re":"…"}`, `{"len":n}`,
    `{"has":x}`, `{"lacks":x}`, `{"eq":x}`. Keys the output has but the file does not name are only information.
  * An output `{"_skip": "why"}` prints `skip` and does not fail (used by `dark_mode` when Chrome cannot emulate).

Then add its break to `breaks/counterproof.py` (it refuses to run while a scenario has none) and run
`python3 breaks/counterproof.py [PAGE]` (default: the template, under a minute, on one pool of JOBS Chromes): every scenario must be ok on the
page, and for each break it runs the scenario on a scratch copy of the page with one small change, expects FAIL naming
the field, writes `COUNTERPROOF.md` and deletes the copies. A break whose text is not in the page exactly once counts as
not proven -- rewrite it for the new text. Every check a scenario makes should have a break of its own.

## The book's data version

The stand-in puts `meta/buch {version: PAGE_VERSION}` into every book at the first `use("db")`, so a scenario sees a
current book and the update block has nothing to do. `__OLD_BOOK = true` leaves it out: a book from before 0.1.0, and
the page runs its migrations. The `upd_*` scenarios cover the update: `upd_migrate_old` (a book on the old numbering),
`upd_current` (nothing to do), `upd_newer` (a page older than its book), `upd_readonly` (a reader gets a hint),
`upd_fail_stops` (a failure stops the run and keeps the version), `upd_old_scan` (finding the old stamp field).
A new migration brings a scenario that starts from the data before it (seeded in `pre.js`) and checks the data after.

## Timing

The virtual time budget starts at the page's load event. From then on the clocks (`Date.now`, `performance.now`)
stand still inside every task; they only run while the page is being parsed and loaded. `perf_700` therefore measures synchronously in its
epilogue with `__SYNC = true`. Do not measure time in an `async` scenario.

## What the stand-in does not model

* Real claude.ai delivery: whether a comment "sent to Claude" reaches a session, threads, the 3800-byte limit on the
  server side, rate limits. `sendToClaude` only logs and returns a thread id.
* Consent and permission prompts (sending to Claude, notifications), `canSendToClaude` answers other than
  `available` unless a scenario sets them. A reader (`__CAN_WRITE=false`) is only told so by `user.can`; the stand-in's
  db still accepts its writes -- a scenario checks that the page makes none.
* The real database: no server timestamps or `updatedAt` on snapshots, no latency jitter, no offline cache, no
  conflicting writes except those a scenario makes with `__DB.external`, no document size limits, no rules.
* The `assets` capability: absent unless a scenario sets `__ASSETS` (then upload and list only); paste itself is not
  exercised (no clipboard in headless Chrome).
* Real phones: the 390 px run is desktop Chrome in a 390 px iframe -- no Safari, no on-screen keyboard, no zoom on
  focus, no touch; `blur` before a tap has to be simulated.
* Real file reads: a picked file's `text()` and a `FileReader` are I/O that `--virtual-time-budget` does not wait
  for, so the `imp_*` scenarios hand the page files whose `text()` answers at once, and set `files` on the input directly
  (no file dialog). A picked folder's `webkitRelativePath` is set by hand. Whether a real browser gives the same paths is
  not modelled.
* Fonts from Google Fonts are blocked (no network), so layout uses the fallback font.
* Several open tabs or viewers at once, the 15-minute look, and a page republished under an open view.

## Files

* `run_all.sh`, `lib/` -- the runner. `scenarios/` -- one scenario per behaviour. `breaks/` -- the counter-proof.
* `forbidden.py` -- the forbidden-strings check (`--all` scans the whole repository, `--history` every file in git).
