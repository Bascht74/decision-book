# Setting up a new book

About ten minutes. You need Claude Code with the Artifact tools and a claude.ai account that may
publish artifacts with runtime capabilities.

## 1. Check the page

    suite/run_all.sh                      # every scenario on template/book.html, about 15 s; also the forbidden-strings check
    python3 suite/breaks/counterproof.py  # optional, under a minute: every check goes red on its break

Needs macOS or Linux with Google Chrome (set `CHROME` to the binary if it is not in
`/Applications`) and python3. No network is used.

## 2. Publish the template

Ask Claude to publish `template/book.html` as a new **private** artifact with these capabilities:

| capability | why |
|---|---|
| `db` | the book's data: cards, orders, talks, settings |
| `comments` | "Senden" reaches the Claude session live, as a comment sent to Claude |
| `assets` | pasted pictures and files are stored as files (without it: small data URLs) |
| `user` | the page knows whether the viewer is the owner (only the owner's view enforces the rules) and may write |
| `downloads` | "Sicherung herunterladen" in the settings hands the viewer a backup file |

Keep the artifact's URL; it is the book's address. Do not put it into this repository.

## 3. Seed the meta documents

With `ArtifactData` on the new artifact (the backup cycle can also be chosen in the page's "⚙ Einstellungen"):

`meta/einstellungen` -- every key optional; without it the page uses the neutral default.

| key | default | used for |
|---|---|---|
| `eigner` | `"Eigner"` | the owner's display role ("von …", "Entscheidung …") -- a role or first name, never needed |
| `release` | `""` | the current release until `meta/stand.aktuell` is set |
| `schritte` | ten neutral steps | the release steps, a list of ten strings; steps 1 and 8 are counted from the board |
| `sitzung_url` | none | link "Claude-Sitzung in eigenem Fenster" (http(s) only) |
| `buch_url` | none | on a phone: the link that opens the book outside the Claude app |
| `github_repo` | none | `owner/name`; the link to its Actions runs |
| `token_regel_ab` | `1970-01-01T00:00:00Z` | cards changed from then on need both token numbers in "Prüfen" |
| `antwort_regel_ab` | `1970-01-01T00:00:00Z` | from then on an answered order filed in "Erledigt" comes back as a Hinweis |
| `sicherung_zyklus` | `release` | how often Claude backs the book up (`release`, `taeglich`, `stuendlich`, `15min`, `nie`) |

Then:

    meta/stand     {aktuell: "<first release, e.g. 1.0.0b1>"}
    meta/buch      {version: "<VERSION>", migriert: []}     -- optional: the page writes it itself on the first opening
    meta/schritte  {release: "<same>", schritte: {}}
    meta/claude    {zuletzt: "<date -u>"}

Releases are expected as `x.y.zbN` (the page counts the next one by the number after `b`), plus
`später`.

## 4. Point Claude at the skill

Copy `.claude/skills/book/` to `.claude/skills/book/` in the project the book belongs to (or to
`~/.claude/skills/book/` for every project). In the project's own `CLAUDE.md`, name the book's URL
(that file is the project's, not this repository's) and say that the skill `book` is read before the
first touch of the book. A session started in this repository picks the skill up by itself.

At the start of each session Claude then watches the artifact (so live comments arrive) and starts
the 15-minute wake-up, as the skill says.

## 5. Later versions

The page counts `x.y.z` (see `VERSION` and `CHANGELOG.md`). To move a book to a newer version of this
repository, Claude runs

    python3 tools/update_book.py --from <the book's meta/buch.version>

and follows what it prints: publish `template/book.html` to the book's own URL, open it once as a viewer who
may write -- the page migrates the book's data itself and records it in `meta/buch` -- and verify. A book set
up from a page before 0.1.0 (no `meta/buch`) is moved the same way; migration 0.1.0 brings its data over.

Changing the page itself: see "Changing the page" in `README.md`.
