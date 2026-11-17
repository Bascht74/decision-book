# Changelog

Versions count `x.y.z`: a new version raises the middle number (0.2.0, 0.3.0 …), a fix the last (0.1.1).
The page shows its own change log in German (`BUCH_LOG`, when the version number is clicked); this file is
the repository's. Every section says whether the book's data changes shape -- and if so, which migration
brings an existing book along.

## 0.4.0

**Answer with one tap.** Right under the text of a decision under "Offen" stands a row of buttons: "Wie empfohlen"
(only with a recommendation; it answers "Option N – wie empfohlen" when the recommendation starts with an option), one
button per option, "Später" (back to the backlog with the target "später") and "Erklär es einfacher" (only a message;
the card stays). A Hinweis has "Gelesen", "Jetzt machen" and "Nein" there, an Aufgabe "Erledigt". A tap goes the way
of "Senden": live to Claude, into the card's messages and its fields in one write, re-reading the card first. The
yellow field stays for a free answer ("Oder frei antworten"). The statistics count an answer that starts with "Wie
empfohlen" as following the recommendation.

**Undo.** After a tap a line at the lower edge of the window says for ten seconds what was done, with "Rückgängig".
Taking back writes the card's fields as they stood, adds a message of its own (it never rewrites one), tells Claude
live in the card's thread where the answer had gone live, and the card is back, open.

**On a phone, written only.** The one-tap buttons and the order field under "Für Dich" write to the book without a
live comment on a phone (the Claude app closes the book when one goes out); Claude reads them at the next look. On a
computer they go live as before.

**Cards start closed.** Every card starts closed, in every column: its head shows number, project, Stand, headline
and deadline. A tap on the head opens and closes it; what a viewer opened is remembered in the browser ("eb-open", as
before) and the page works without storage. The answer buttons stand only in the opened card. Only a card the owner
has already acted on and that comes back with a new message of Claude's opens once, as before.

**Deadlines.** Under "Offen", "Prüfen" and "Hinweise & Aufgaben" the cards with a deadline stand first, nearest
first, then the others by their last change. The mark says what is left: "noch 2 Tage", "morgen", "heute",
"überfällig", red on its day and after. A deadline without a time ("2026-11-19") holds until the end of that day in
local time (before, it was read as midnight UTC and ran out the night before) and shows no time. "warten auf Dich"
adds "· n mit Frist bis <day>" for deadlines within three days.

**Projects.** A new optional field `projekt` (a short name): a coloured pill after the card's number and, while a
card carries one, a filter group "Projekt:" with "alle Projekte", a button per project with the number of its cards
under "Für Dich", and "ohne Projekt". The choice is remembered per viewer ("eb-proj"); a remembered project that no
card carries any more hides nothing.

**Order field under "Für Dich".** The field for a new order also stands under "Für Dich": label "Auftrag an Claude",
the field and "Senden" in one line; after sending, "gesendet – steht unter Aufträge". Talks, orders and "Frühere" stay
under "Aufträge".

**Text to pass on.** A new optional field `kopiertext` (plain text, never read as Markdown): a box "Zum Weitergeben"
after "Worum es geht", a read-only field that marks all of its text on focus, and "Kopieren". Where the browser
refuses the clipboard, the text stays marked and the line says so. Project and text are in the find text of a closed
card.

**Less above the first card.** Without a current release (`meta/stand.aktuell` empty) there is no release card; the
tab "Releases" goes while no card has a release as its target and the statistics are empty (not while it is open);
the "Release:" chips and the lone "Ziel offen" lane head go while there is nothing to choose. On a phone a column's
explanation is one line behind a "?". The marks of a card's head share one line. The column hints name the buttons as
they are called ("Gelesen", "Senden"), and a phone no longer shows a key shortcut at the yellow field.

New scenarios: `quick_decide`, `quick_hint`, `quick_undo`, `quick_phone`, `cards_closed`, `cards_closed_nostore`,
`deadline_order`, `project`, `project_kept`, `order_here`, `copy_text`, `no_release`, `no_release_open`,
`look_new_phone` and `look_new_dark` (the new parts at 390 px: 4.5:1 and nothing over the edge); `deadline` covers
plain dates and what is left. Scenarios that relied on a card under "Offen" standing open now open it themselves
(`dark_contrast`, `done_when`, `local_times`, `fields_phone`); `settings_absent` and `settings_present` read the
owner's name at the yellow field of a card under "Prüfen" (under "Offen" it reads "Oder frei antworten").

**Also fixed.** "warten auf Dich" follows a release that becomes current while the page is open.

The book's data does not change shape: `projekt` and `kopiertext` are optional fields; no migration.

## 0.3.0

**A new look.** A dark blue title bar across the whole window, the views as tabs below it, and an office-style
ribbon for search and filters. This is the one look; there is no setting for the old one.

**Title bar.** Name, version and "Einstellungen" on the left; "wartet auf Dich" is a light button on the right,
next to "live" and the four times ("Buch fast voll" in a light red). On a phone, name, version and "⚙" stay on one
line and the rest wraps below.

**Views, search and filters.** The view in front is bold with a bar under its name. Search and filters share one
white toolbar card under the views; "Entschieden von:" and "Release:" are groups set apart by a line (the "·" before
"Release:" is gone). When the toolbar gets narrow, a group wraps as a whole, so its buttons stay with their label. A
pressed filter has a light blue ground, bold text and a line along its lower edge. The release card now follows below
the toolbar, so the Tab key reaches the views, the search and the filters first.

**Buttons, fields, marks.** Main buttons ("Senden", "Release … starten") are filled blue; secondary ones
("Bearbeiten", "↑"/"↓", "Öffnen", the fold buttons) are light blue with an edge. Fields have a darker lower edge
and show focus as a 2 px blue line along it (the filters in table heads too); everything else shows focus as a 2 px
ring, white in the title bar, and inside the column tabs, whose bar scrolls sideways. Stand, kind, deadline,
dependency and step state are pills that carry their word. Headings and column heads take the dark blue of the title
bar; tables have a grey head row with dark text, and only the sorted column is blue. In dark mode a column lies darker
than its cards, and a group row or a row under the pointer lighter than its table. The page uses the system font and
no longer loads a web font.

**Also fixed.** The line that names the check run of a running step ("…-Prüflauf: … – Live") stands under the
step's name again, not letter by letter in the number column. A long word in a card's headline wraps instead of making a phone page wider.
Below 761 px the releases table takes the phone's narrow columns (between 641 and about 760 px the headline had no room
left), and below 360 px narrower ones still. "Erledigt" and "Archiv" take the full width like the release card. Filter
fields in table heads are 28 px high (32 px on a phone), dependency pills and the card links in table rows 24 px. A card
opened in a table row keeps off the table's edge, and the change log's close button stays on one line.

**Contrast in light and dark.** Text reaches 4.5:1 and the edges of buttons and fields 3:1 (WCAG 2.2 AA) in both
modes; the dark mode keeps its page and text colours. New scenarios hold the look: `look_titlebar`, `look_tabs`,
`look_toolbar` and `look_toolbar_1000`, `look_contrast` and `look_contrast_dark` (every text, not only buttons and
fields), `look_focus`, `look_focus_1000` and `look_focus_dark` (no ring cut by a box that scrolls), `look_phone`,
`look_narrow_320`, `look_releases_700`, `look_parts` and `look_parts_dark` (field heights, target sizes, labels, the
order of surfaces in dark mode), and `look_wide_1000`/`_1300`/`_1920` (no view runs over the right edge).
`suite/lib/common.js` has helpers for them (colours from `color-mix()`, the ground an element stands on, elements that
stick out of the window, how much of a focus ring a box cuts away).

The book's data does not change shape; no migration.

## 0.2.1

**The "Release:" chips filter.** A click on a chip shows only that target: every other target is left out
(folded in the lane columns), also in the other view, under the other "Entschieden von" and on cards that come in
later. The page remembers the choice in the browser as "eb-solo" next to "eb-hidden". A click on the chip that is already the only one shown shows all again, and a
new first chip "alle" shows all. Lane heads still fold one lane at a time.

**"Hinweise & Aufgaben" follows the filters.** The tab leaves out the cards whose target the chips leave out
("Ziel offen" for an empty one) and follows "Entschieden von", like the other tabs.

**Counts of what is shown.** The tab counts and column heads count the cards the column shows under the current
filter; the chips still offer every target of the tab.

No data migration: the data does not change shape.

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
