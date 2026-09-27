# Changelog

Versions count `x.y.z`: a new version raises the middle number (0.2.0, 0.3.0 …), a fix the last (0.1.1).
The page shows its own change log in German (`BUCH_LOG`, when the version number is clicked); this file is
the repository's. Every section says whether the book's data changes shape -- and if so, which migration
brings an existing book along.

## 0.1.0

The first version of the decision book as a project of its own.

**What the book is.** A single-page claude.ai artifact through which a project owner and Claude run a
software project: cards for decisions, tasks and notes with five fields (Stand, Ziel, wartet auf, von, Art);
orders and live talks that reach the Claude session at once as comments; pasted pictures and files; a
release view with steps, a start button and GitHub run links; per-release statistics; an archive for
finished releases; backup to a file and restore from a file or folder. All data lives in the artifact's
shared database, all project values in `meta/einstellungen`; the page carries only neutral defaults. The
page is in German.

**Where it comes from.** The page was built and used in one project over about 110 unversioned revisions
(shown as v1 … v113). 0.1.0 is that page made neutral: the owner's name, the project's texts and
storage-key prefix, and card references are gone; the page's version is the repository's `VERSION`.

**New in 0.1.0**

* Versions from 0.1.0 (`VERSION`, `PAGE_VERSION`, this file).
* The book's data carries its own version in `meta/buch`. When a page opens a book whose data is older, a
  viewer who may write brings it up to date: every pending migration runs in order, shows its progress under
  the header, records itself in `meta/buch.migriert`, and only then is `meta/buch.version` set. A failure
  stops, names the migration and keeps the old version. A reader sees a hint. The owner's automatic rules
  wait until the data is current. A page older than its book says so and writes nothing.
* `tools/update_book.py`: checks a checkout and prints how to move a book to it.
* `suite/forbidden.py` keeps the words it looks for as SHA-256 hashes only; `--history` scans every file and
  commit message in git.

**Data: migration 0.1.0.** The owner's stamp on a card, written by every card write from the page, was
named after the owner (`<name>_am`); it is `eigner_am` now. The migration finds the old name (from
`meta/buch.stempel_alt`, else the owner name in `meta/einstellungen.eigner`, else the one unknown `…_am`
field on the cards), copies it to `eigner_am` where that is missing or older -- on the cards and on the
archived cards -- and keeps the old field. Remembered sorting and folding in the browser (the old
`localStorage`/`sessionStorage` keys with the project's prefix) start fresh once.
