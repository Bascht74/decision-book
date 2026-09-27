# Decision book: data model

As read and written by the page (`template/book.html`, data version 0.1.0 -- see `meta/buch`).
All times are UTC ISO strings with `Z`, taken from `date -u`. The owner's own entries carry
`von: "Eigner"` or the owner name from the settings -- a role, never a real name; Claude's carry
`von: "Claude"`.

## `entscheidungen/<nr>` -- cards

The document id is the card number (`E-001`, `E-002`, ...).

| field | meaning |
|---|---|
| `ueberschrift` | headline; a question while open, a statement once decided |
| `beschreibung` | what it is about -- context enough to decide alone |
| `option1`, `option2`, `weitere` | the options |
| `empfehlung` | recommendation and reason |
| `entscheidung` | the owner's answer (written by the page) |
| `blatt` | **Stand**: `vorrat`, `offen`, `entschieden`, `arbeit`, `pruefen`, `erledigt`, `verworfen` |
| `ziel` | **Ziel**: target release, `später`, or `""` |
| `ziel_vorher` | the target a card had before it was brought back from the archive |
| `wartet` | **wartet auf**: `"Dich"` (the owner), `"Claude"`, or `""` |
| `von` | **von**: who decided -- the owner name from the settings, or `"Claude"` |
| `art` | **Art**: `entscheidung` (default), `aufgabe`, `hinweis`, `auftrag` (made from an order) |
| `rang` | order inside "Entschieden" (no rank = last; fractions allowed); only the owner moves it |
| `tokens_prognose`, `tokens_ist` | estimate (before) and counted usage (after), numbers |
| `fertig_pct` | Claude's estimate 0..100 while in work; shown as "NN % fertig" |
| `fertig_wenn` | list (or lines) of points that make the card done; stands first under "Prüfen" |
| `abweichung` | what differs from the decision / what Claude decided alone |
| `verlauf` | `[{zeit, text}]` steps of the work |
| `kommentare` | `[{von, text, zeit, live, bilder}]` messages under the card -- append only |
| `frist`, `ersatz` | a deadline and what Claude takes if it passes unanswered (shown only) |
| `haengt_an` | card numbers this one waits for (`"E-12, E-13"` or a list); the page shows the reverse |
| `rueckblick_faellig`, `rueckblick` | a release after which the page asks "Hat es gewirkt?"; the answer |
| `thread` | the comment thread of the card's live messages |
| `bilder` | ids in `auftragsbilder` |
| `quelle` | where a backlog card came from |
| `geaendert` | last change (page and Claude) |
| `token_fehlt` | set by the page when it pulled a card back for missing token numbers |
| `eigner_am`, `gesichtet`, `zurueck`, `gelesen`, `erledigt_am` | stamps only the owner's hand writes (`eigner_am`: every card write from the page; before 0.1.0 it was named after the owner, `<name>_am` -- migration 0.1.0 copied it, the old field stays) |

Old fields the page neither shows nor writes: `status`, `typ`, `release`.

## `auftraege/<id>` -- orders

`text`, `zeit`, `bilder`, `status` (`neu`, `in_bearbeitung`, `übernommen`), `bearbeitet_seit`
(the owner's 15-minute lease while editing), `karte` and `karte_am` (the card made from it),
`antwort` (only for an order answered without a card), `fertig_pct`.

## `gespraech/<id>` -- live talks

`start`, `status` (`offen`, `gelesen`), `wartet` (`"Claude"` or `""`), `thread`, `titel`, `karte`,
`nachrichten: [{von, text, zeit, bilder, live}]`, `gelesen_am`.

## `auftragsbilder/<id>` -- pictures and files

`{asset_id, url, type, zeit}` (an uploaded asset) or `{data, zeit}` (a shrunk data URL).

## `statistik/<id>` -- one row per release (written by Claude, only shown)

`version`, `ordnung`, `veroeffentlicht`, `zyklus_std`, `commits`, `geaenderte_zeilen`,
`codezeilen`, `tokens_neu`, `tokens_ausgabe`, `ci_pr_s`, `ci_langsamster`, `ci_langsamster_s`,
`release_lauf_s`, `release_versuche`, `release_weg`, `suite_lokal_s`, `nicht_gelaufen`,
`changelog: {Added, Changed, Fixed, ...}`, `changelog_summe`, `testdateien`, `pruefungen`,
`test_summe_s`, `test_gemessen`. Missing values stay missing (shown as "–").

## `meta/*`

| document | fields |
|---|---|
| `meta/einstellungen` | the project's values -- see `SETUP.md` |
| `meta/stand` | `aktuell` (current release), `wartet_auf_start`, `start_commit`, `start_lauf_url`, `start_lauf_gruen`; the page writes `gestartet*` on a start and `buch_voll` when the book is full |
| `meta/schritte` | `release`, `schritte: {"2": {zustand, text, teile: [{name, zustand, text}]}, ...}`; `zustand` is `erledigt`, `läuft`, `wartet …`, else not yet. Steps 1 and 8 are computed by the page. |
| `meta/claude` | `zuletzt`, `auftraege_gelesen`, `karten_bearbeitet` (timestamps) |
| `meta/laeufe` | `laeufe: [{name, url, status, gestartet}]`; shown while a status is not `fertig` |
| `meta/regeln` | the page's lease for its own rule writes -- never touch |
| `meta/buch` | the data version: `version` (`x.y.z`, set by the page when every migration up to it ran), `migriert` (the migrations that ran, in order), `aktualisiert` (time); `stempel_alt` only by hand, when migration 0.1.0 asks for the old stamp field. Written by the page only. |

## `archiv/<art>-<release>[-n]` -- the archive

`{art: "karten"|"auftraege"|"gespraeche", release, gepackt, eintraege: [{id, …every field of the original…}]}`.
Packed by Claude with a script once a release is closed; the page only shows, finds, counts and brings back.
The comment "THE ARCHIVE" in `template/book.html` holds the full rules.
