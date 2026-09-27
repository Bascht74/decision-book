---
name: book
description: Working with the owner through the decision book (Entscheidungsbuch), a claude.ai artifact with cards, orders, live talks and a shared database. Read before the first read or write to the book in a session, before answering a live comment prefixed [G:], [K:], [A:] or [R:], on every 15-minute wake-up, before starting or finishing any work on a card, before a release step, and before publishing a new version of the page or updating a book to one.
---

# The decision book

The book is the one place where the owner and Claude work together. Every open question, decision,
order, answer and release step lives there. Chat and console are not a channel. The page is German;
write cards, answers and talks in the owner's language. Field names and the data model are in
`reference.md`.

Read and write the data with `ArtifactData` (collections `entscheidungen`, `gespraech`, `auftraege`,
`meta`, ...), comment threads with `ArtifactComments`. The session must **watch** the book or live
comments never arrive; after a restart re-arm the watch and the wake-up before anything else.

## The rules

1. **The console stays silent.** No summaries, no "you need to do X", no end-of-wake-up line. What
   the owner must know or do goes into the book (a talk answer or a card). Only exception: the owner
   wrote in the console himself -- then answer there.
2. **Times come from `date -u +%Y-%m-%dT%H:%M:%SZ`**, run right before the write; that exact value
   is written. Never estimated, never counted forward across a batch, never in the future.
3. **One question per card.** A follow-up question or a new decision is a **new card** under
   "Offen", pointing to the old one -- never a paragraph inside a report, a `verlauf` step or
   `abweichung`, where nobody answers it.
4. **Answer at once, or create the card in the same write.** A reply is either the finished answer
   or it comes together with a card (and `karte` set on the talk or order). "A strand is on it, I'll
   report here" without a card is a promise that gets lost.
5. **Replies are new entries.** Every reply on a card is a new element appended to `kommentare`
   (`{von: "Claude", text, zeit}`). Never rewrite, shorten or extend an earlier comment, a `verlauf`
   step or `abweichung`; never repeat what already stands there.
6. **Starting work moves the card in the same step.** The write that launches a strand (or Claude's
   own work) sets Stand `arbeit`, `fertig_pct` and `tokens_prognose`. A card whose work runs while it
   still stands under "Entschieden" is the first thing the owner sees wrong.
7. **Claude never files a card as done.** Stand "Erledigt" and "Verworfen" are the owner's. Claude's
   work ends in "Prüfen", or -- for an answer -- as a Hinweis on top of "Für Dich".
8. **Tokens are counted, not guessed.** `tokens_prognose` is written before the work starts;
   `tokens_ist` after it, from a script that sums the usage recorded in the session and strand logs.
   Every strand order begins with `Karten: E-nnn` so its usage can be booked to its cards. Both
   numbers must be there before a card goes to "Prüfen" -- the page pulls it back otherwise.
9. **A release starts only through the book's start button** (see Releases).
10. **Release steps are written when they happen**, into `meta/schritte`, each text starting with
    date and time. The wake-up only checks; it does not catch up.
11. **No names, secrets or private material in the book.** Roles only ("Eigner", "Claude"); no keys,
    passwords or tokens; nothing from real production data. Anyone with the link can read it.

## A card's five fields

Every card carries five dropdowns; they are what the owner sees and sorts by.

| field | data | values | who sets it |
|---|---|---|---|
| Stand | `blatt` | `vorrat`, `offen`, `entschieden`, `arbeit` ("in Arbeit"), `pruefen`, `erledigt`, `verworfen` | see below |
| Ziel | `ziel` | a release (`1.0.0b3`), `später`, or `""` (open) | Claude proposes; frozen once the card is in work |
| wartet auf | `wartet` | `"Dich"` (the owner), `"Claude"`, `""` | whoever hands the card over |
| von | `von` | the owner's name from the settings, or `"Claude"` | who decided |
| Art | `art` | `entscheidung`, `aufgabe`, `hinweis`, `auftrag` | Claude at creation |

| Stand | means | moved there by |
|---|---|---|
| `vorrat` | backlog not yet presented | Claude |
| `offen` | the owner decides | Claude, when presenting or handing back |
| `entschieden` | decided, not started; the owner orders it (`rang`) | the page, when the owner answers |
| `arbeit` | being built | Claude, when starting (rule 6); the page, when token numbers are missing |
| `pruefen` | built, for the owner to look at | Claude, when finished |
| `erledigt` / `verworfen` | done and seen / dropped | **only the owner** |

An Aufgabe (something the owner must do) or Hinweis (something he should know) stands on top under
"Hinweise & Aufgaben" while its Stand is `offen` or `pruefen`; his "Erledigt" / "Gelesen" files it.
Postponed means Ziel `später` -- there is no separate state for it.

* **Presenting** (`vorrat` -> `offen`): the card carries its own context (enough to decide without
  reading other cards), the options, a recommendation with its reason, the effort, `wartet: "Dich"`.
* **An answer that does not fit** (a contradiction, a gap, a question instead of a decision): hand
  it back -- Stand `offen`, `wartet: "Dich"`, and a new comment saying why.
* **Options change fundamentally:** a new card with the new proposals; the old one gets a comment
  pointing to it and goes to "Prüfen", where the owner files it.
* **Finished:** Stand `pruefen`, `fertig_pct: 100`, both token numbers, and `abweichung` naming
  exactly what differs from the decision or what Claude decided alone, and why.
* **Claude's own significant decisions** get a card with `von: "Claude"`; the owner sees them in
  "Prüfen" like his own.

## Live comments, talks and orders

Live comments arrive with a prefix that says where the answer belongs:

| prefix | source | read | answer |
|---|---|---|---|
| `[G:<id>]` | a live talk | `gespraech/<id>` | append to `nachrichten` |
| `[K:<nr>]` | the field under a card | `entscheidungen/<nr>` | append to `kommentare` (rule 5) |
| `[A:<id>]` | an order, new or edited | `auftraege/<id>` | take over with a card |
| `[R:<release>]` | the release start button | `meta/stand`, the start order | start the release |

* **Talk:** the answer goes **into the talk** -- append `{von: "Claude", text, zeit}` to
  `nachrichten`, set `wartet: ""`, give it a short `titel` if it has none, and `karte` when a card
  came out of it. In the comment thread only one short line ("Antwort steht im Buch"), then resolve
  it. Anything that is not answered at once gets an interim answer **and** a card in the same write.
* **Card comment:** a new `kommentare` entry; `wartet: ""`, or `"Dich"` when it asks something.
  If it raises a new question, that is a new card (rule 3).
* **Order:** take it over the moment it is read, **before** working: create the card, set the
  order's `status: "übernommen"`, `karte`, `karte_am`. The answer is a card with Art `hinweis`,
  Stand `offen` -- never `erledigt`. An order `in_bearbeitung` belongs to the owner for 15 minutes
  after `bearbeitet_seit`; after that, or with no time, treat it as `neu`.
* A comment that did not arrive live is found by the wake-up -- that is its job.

## Releases

* **Start only by the button.** After a release is published, set `meta/stand` to
  `{aktuell: <next>, wartet_auf_start: true}` with `start_commit`, `start_lauf_url` and
  `start_lauf_gruen` for the state it would start from, reset `meta/schritte` for the next release,
  move the open cards of the finished release (see below), and **stop**. The owner's click leaves
  an order and an `[R:]` comment; nothing is built for that release before it.
* Between releases only prepare: measure, write tests, present cards. Nothing that needs the owner's
  OK or his machine is run -- it is presented.
* Inside a started release, start every decided card whose files do not collide with running work,
  in parallel (rule 6 for each).
* **An unanswered question at its deadline** has two ways out: decide it explicitly (reason on the
  card, card to "Prüfen"), or move its Ziel to the next release, where it waits. Never build the
  recommendation silently.
* **No open card keeps a finished release as its target.** At every release change, every card
  that is not `erledigt` or `verworfen` and whose `ziel` is a finished release moves to the current
  release, with a new comment on the card saying so. A card brought back from the archive gets the
  current release as `ziel`; its old target stays in `ziel_vorher`.
* Every CI run Claude starts goes into `meta/laeufe` (`status: "läuft"`) and is set to `"fertig"`
  when it ends.

## The 15-minute wake-up

A background timer of about 15 minutes wakes the session. It is the net for what did not arrive
live, not a poll for work that reports itself.

0. **Set the next timer first**, before looking at anything.
1. Take the time from `date -u`.
2. Talks with `wartet == "Claude"` -> answer (in the talk).
3. Orders `neu`, or `in_bearbeitung` with an expired lease -> take over (card first).
4. Cards with `wartet == "Claude"` whose newest comment is the owner's -> answer (new entry).
5. **All** cards in `entschieden` (the whole list) -> start what can run in parallel (rule 6).
6. No card in `vorrat` may target the current release: each goes to `arbeit` (Claude may decide it)
   or to `offen` (the owner must).
7. Every card in `arbeit` has `tokens_prognose` and a current `fertig_pct`; every card in `pruefen`
   has both token numbers.
8. The release: steps in `meta/schritte` match what has happened (rule 10); `meta/laeufe` current;
   no open card targets a finished release.
9. Limits: at most 5000 documents per book and 256 KB per document; `meta/stand.buch_voll` set means
   full. Past 3000 documents or 200 KB, put a card to the owner. Claude deletes nothing on its own.
10. Stamp `meta/claude` (`zuletzt`, `auftraege_gelesen`, `karten_bearbeitet` -- timestamps).
11. Nothing to the console (rule 1). A blocked action goes to the owner as an Aufgabe card with the
    ready command and the permission rule that would let Claude do it next time.

## Changing the page and updating a book

The page lives in the decision-book repository (`template/book.html`); a book is that page published as an
artifact, with its data in the artifact's database. Page and data carry versions `x.y.z` (from 0.1.0; a new
version 0.2.0, a fix 0.1.1): the page's `PAGE_VERSION` (= the repository's `VERSION`), the data's
`meta/buch.version`.

* **Changing the page** happens in the repository, never in a book's copy: edit `template/book.html` (the
  update block in `template/update.js`), bump `VERSION`, add the `BUCH_LOG` entry on top (the owner's
  language, what changed for him, the real publish time) and the `CHANGELOG.md` section, run
  `template/build_template.py template/book.html`, `suite/run_all.sh`, and for a new check its break and
  `suite/breaks/counterproof.py`. Only a green run is published.
* **Every change to the shape of the data ships a migration** in `MIGRATIONS` (`template/update.js`), with a
  scenario that starts from the old data. Idempotent; copies old fields, never deletes them; throws when it
  cannot be sure; writes no `geaendert` and no owner stamp.
* **Updating a book**: `python3 tools/update_book.py --from <meta/buch.version>` (read it first with
  `ArtifactData`; no `meta/buch` = before 0.1.0 -- leave `--from` out) and follow its steps: publish
  `template/book.html` to the book's own URL (keep its capabilities), have it opened once by a viewer who may
  write -- the page runs the migrations itself and shows it under the header -- then verify
  `meta/buch.version` and `meta/buch.migriert`. If the page stopped ("Aktualisierung angehalten bei …"), the
  version stayed; fix the cause (a card for the owner if it is his to decide) and open again. Claude never
  migrates a book's data by hand with `ArtifactData` -- the page's migration is the one that is tested.
* A book newer than the page (`meta/buch.version` > `PAGE_VERSION`) is never published over.
* Everything that belongs to one project lives in `meta/einstellungen` and is read with `S(key, default)`;
  the page carries only neutral defaults. Nothing personal goes into the repository
  (`suite/forbidden.py --all` and `--history` must stay green).
* Before writing text into a field, check that the page shows that field.
