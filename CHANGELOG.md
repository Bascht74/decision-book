# Changelog

Versions count `x.y.z`: a new version raises the middle number (0.2.0, 0.3.0 …), a fix the last (0.1.1).
The page shows its own change log in German (`BUCH_LOG`, when the version number is clicked); this file is
the repository's. Every section says whether the book's data changes shape -- and if so, which migration
brings an existing book along.

## 0.2.0

**Packing finished releases into the archive.** "Einstellungen" has a new section "Archiv" (only for a viewer who
may write). It lists every closed release -- published, not the current one, none of its cards open -- that has
something to pack, with what packing would take: its done and rejected cards, and the orders and talks from its
time (a packed release is not listed). Orders not yet taken and talks not yet read stay in the book, and so do cards whose target is "Buch", "später" or empty. "Packen" asks once
in the page, then writes the archive documents (split at 200 KB), reads every one back and compares it entry by
entry, writes the sums into the release's statistics, and only then deletes the originals, one at a time -- each
only if nobody changed it meanwhile. Any failure stops right there and says how far it got; nothing is deleted
before the archive is written and verified. Packed cards stay findable under "Archiv", in the card search, and can
be brought back.

**"Erledigt" and "Archiv" counted apart.** The tab "Erledigt" counts only the done cards in the book; it no longer
adds the archived ones, and its line no longer says "dazu N im Archiv". "Archiv" counts the packed cards.

**Statistics in release order.** The statistics tables order releases by publication time and then by version
(`1.0.0-beta` < `3.0.0b9` < `3.0.0b10` < `3.0.0`), no longer by the `ordnung` number in each statistics document.
A release not yet published stands after the newest published one below it. "The previous release", the newest
line count in the total row, and the time span packing uses all follow the same order.

**Live sums in "Karten und Tokens".** A release that is not packed is counted live from the cards in the book
(and the orders and talks of its time), shown in italics. A packed release shows its stored sums, plus any of its
cards that are back in the book.

**Smaller.** The "Ziel" dropdown offers "Buch" only while a card carries that target. `.claude/skills/book/`
holds the skill in the Claude Code layout (it was `skill/`), `CLAUDE.md` says how to work on this repository,
and `tools/bootstrap.sh` checks a fresh checkout. The build stops when the update block and the page declare
the same global name (the page's new `verCmp` would otherwise have replaced the update block's).

**Data: no migration.** Packing adds documents to `archiv` and fields to `statistik/<release>` (`archiv` and the
sums) that the 0.1.0 page already reads; nothing existing is renamed, moved or reformatted. A book on
0.1.0 is moved to 0.2.0 by opening the new page once as a viewer who may write: `meta/buch.version` becomes
0.2.0, and `meta/buch.migriert` stays as it was.

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
