# Decision book

A single-page claude.ai artifact through which a project owner and Claude run a software project
together: cards with decisions, tasks and notes (each with Stand, Ziel, wartet auf, von, Art), orders
(Aufträge), live talks that reach the Claude session at once, pasted pictures and files, release
steps with a start button, per-release statistics, an archive, backup and restore. The data lives in
the artifact's shared database; the page itself holds nothing of a project. The page is in German.

Version: see `VERSION` (0.2.0) and `CHANGELOG.md`.

## What is in here

| path | what |
|---|---|
| `template/book.html` | the page as an **empty** book: no names, no links to a particular artifact, session or repository, no keys, no card data |
| `template/update.js` | the update block that goes into the page: `MIGRATIONS` and the code that runs them when a book is opened |
| `template/build_template.py` | builds `book.html`: sets `PAGE_VERSION` from `VERSION`, puts the update block in, neutralises project texts, runs the forbidden-strings check |
| `tools/update_book.py` | checks the checkout and prints how Claude moves an existing book to this version |
| `suite/` | the page's tests: headless Chrome, a stand-in for the artifact runtime, one scenario per behaviour, a counter-proof for each check, and `forbidden.py` |
| `.claude/skills/book/` | the Claude Code skill for working with a book (`SKILL.md`) and its data model (`reference.md`) |
| `CLAUDE.md` | for Claude working on this repository: build, checks, release, commit rules |
| `tools/bootstrap.sh` | the first thing a new session runs: suite, forbidden-strings check, next steps (no network) |
| `SETUP.md` | publish the template as a new book, seed the settings, point Claude at the skill |
| `LICENSE` | MIT |

    suite/run_all.sh                       # all scenarios on the template + the forbidden-strings check
    python3 suite/breaks/counterproof.py   # every check goes red on its break
    python3 suite/forbidden.py --all       # the whole repository: no names, links, addresses, keys
    python3 suite/forbidden.py --history   # the same over every file and commit message in git

## Versions

The page counts `x.y.z` from 0.1.0: a new version is 0.2.0, 0.3.0 …, a fix 0.1.1. `VERSION` is the one place
that says it; `template/build_template.py` writes it into the page as `PAGE_VERSION`. Every version gets a
section in `CHANGELOG.md` (English, for this repository) and an entry on top of `BUCH_LOG` in the page
(German, what changed for the owner; shown when the version number in the page is clicked).

A book's **data** has its own version, `meta/buch.version` in its database. When a page opens a book whose
data is older, it brings the data up to date itself (see below).

## Changing the page

1. Edit `template/book.html` (the update block only in `template/update.js`), bump `VERSION`, write the
   `BUCH_LOG` entry and the `CHANGELOG.md` section.
2. `python3 template/build_template.py template/book.html` -- sets the version, puts the update block in,
   checks for forbidden strings. (Given a live page that still counts v1, v2 … it makes the template from it;
   the change log then holds one neutral entry -- put the real `BUCH_LOG` entries back and build once more.)
3. `suite/run_all.sh` green; a new behaviour brings its scenario, and each check its break in
   `suite/breaks/counterproof.py`; `python3 suite/breaks/counterproof.py` proves them all.
4. Commit. Moving a book to it: `python3 tools/update_book.py` prints the steps.

**Every change to the shape of the data ships a migration.** A renamed or moved field, a new field the page
relies on, a changed format: add `{to: "<the new version>", was: "<what, in German>", run: async (db, say) => {…}}`
to `MIGRATIONS` in `template/update.js`, with a scenario that starts from the old data. A migration

* is idempotent -- run twice, it changes nothing the second time;
* copies, never deletes: an old page may still be open somewhere and read the old field;
* throws on anything it cannot do safely (the page then stops, names it, and keeps the old version);
* writes no `geaendert` or owner stamp -- it is not a change anyone made.

## Updating a book

A book is a published artifact with its database. To move it to this version (Claude does this):

    python3 tools/update_book.py [--from <meta/buch.version>] [--url <the book's URL>]

It checks the checkout (no network) and prints the steps: publish `template/book.html` to the book's own URL,
open it once as a viewer who may write, verify `meta/buch`. On opening, the page compares `meta/buch.version`
(no `meta/buch`: a book from before 0.1.0) with its own `PAGE_VERSION` and runs every pending migration in
order, showing its progress under the header. Each one records itself in `meta/buch.migriert`; only when all
ran is `meta/buch.version` set. A failure stops there, names the migration, and leaves the version as it was
-- the next opening tries again. A viewer without write access sees a hint instead, and the owner's automatic
rules wait until the data is current.

## What is deliberately not in here

* **Any real book**: the published artifact, its URL and its data -- cards, orders, talks, pictures,
  statistics, settings. The template's change log starts at one neutral entry; the history of a real book
  stays with that book.
* **Claude's working notes and memory** about any project.
* **Session addresses**, repository names, e-mail addresses, and everything else that belongs in a book's
  `meta/einstellungen`.
* **Keys and passwords** of any kind.

Scenario data in `suite/` is synthetic: the roles "Eigner" and "Claude", `example.org` addresses, made-up
card numbers. `suite/forbidden.py` keeps the words that must not appear as hashes only, so the check itself
names nobody.

## Open

* **License:** MIT, see `LICENSE`.
