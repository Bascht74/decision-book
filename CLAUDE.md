# Decision book -- for Claude working on this repository

This repository is the decision book: one claude.ai artifact page (`template/book.html`, German) through which a
project owner and Claude run a project -- cards, orders, live talks, releases, statistics, archive, backup. The
page holds no project; a book is the page published as an artifact with its own database. `README.md` says what
is where, `SETUP.md` how a new book is set up.

**Working with a book** (reading and writing cards, answering talks, the wake-up, releases): the skill
`.claude/skills/book/SKILL.md`. Read it before the first touch of any book.

**The development book.** The cards for this repository's own work live in a book artifact. Its URL is **not**
written anywhere in this repository; the owner gives it in the first message of a session. Keep it out of
files, commits and scenario data.

## First thing in a session

    tools/bootstrap.sh     # suite + forbidden-strings check, no network; prints the next steps

## Build, check

    python3 template/build_template.py template/book.html   # version, update block, neutral texts, forbidden check
    suite/run_all.sh                                        # every scenario on the template, about 15 s
    python3 suite/breaks/counterproof.py                    # every check goes red on its break, under a minute
    python3 suite/forbidden.py --all                        # every file of the checkout
    python3 suite/forbidden.py --history                    # every file and commit message in git

Edit the page in `template/book.html`, the update block only in `template/update.js` (the build puts it in).
A new behaviour brings its scenario in `suite/scenarios/` and a break per check in `suite/breaks/counterproof.py`
(`suite/README.md` says how). Only synthetic data: the roles "Eigner" and "Claude", `example.org`, made-up cards.

## A new version

1. `VERSION`: `x.y.z` -- a new version raises the middle number, a fix the last.
2. `BUCH_LOG` in the page: a German entry on top for that version (what changed for the owner).
3. `CHANGELOG.md`: an English section -- what a user notices, and whether the book's data changes shape.
4. **Every change to the shape of the data ships a migration** in `MIGRATIONS` (`template/update.js`), with a
   scenario that starts from the old data: idempotent, copies and never deletes, throws on what it cannot do, no
   owner stamp. No shape change, no migration: the page then only moves `meta/buch.version` on.
5. Build, suite green, counterproof all proven, `forbidden.py --all` and `--history` at 0 hits.
6. One commit. Moving a book to it: `python3 tools/update_book.py --from <meta/buch.version>`.

## Commits

* Author and committer are neutral:
  `git -c user.name=decision-book -c user.email=decision-book@example.org commit -F <file>` (message from a file).
* The message ends with exactly one trailer: the `Co-Authored-By:` line with Claude's model name and Anthropic's
  noreply address, as the session's attribution gives it. **No `Claude-Session:` line, no session URLs**, no names,
  no links to artifacts.
* `python3 suite/forbidden.py --all` and `--history` show 0 hits before every push. The repository is public.
