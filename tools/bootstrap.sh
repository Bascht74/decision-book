#!/bin/bash
# bootstrap.sh -- the first thing a new session runs in this repository. No network, changes nothing but suite/out/.
# Checks the tools, runs the suite on the template and the forbidden-strings check over the checkout, then prints
# the next steps. Exit 1 when anything is not in order.
root=$(cd "$(dirname "$0")/.." && pwd)
bad=0
say(){ printf '%s\n' "$*"; }
command -v python3 >/dev/null || { say "missing: python3"; exit 1; }
chrome=${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}
[ -x "$chrome" ] || command -v google-chrome >/dev/null || command -v chromium >/dev/null ||
  { say "missing: Google Chrome (set CHROME to the binary)"; bad=1; }
v=$(cat "$root/VERSION"); pv=$(grep -o 'PAGE_VERSION="[^"]*"' "$root/template/book.html" | cut -d'"' -f2)
say "== decision book $v (template page $pv)"
[ "$v" = "$pv" ] || { say "VERSION and the template's PAGE_VERSION differ: python3 template/build_template.py template/book.html"; bad=1; }
if [ "$bad" = 0 ]; then out=$("$root/suite/run_all.sh"); rc=$?; printf '%s\n' "$out" | grep -v '^ok '; [ "$rc" = 0 ] || bad=1; fi
out=$(python3 "$root/suite/forbidden.py" --all); rc=$?; printf '%s\n' "$out" | tail -n 20; [ "$rc" = 0 ] || bad=1
if [ "$bad" = 0 ]; then say "== all in order"; else say "== NOT in order: see above"; fi
cat <<'EOF'

Next:
  * Working with a book: read .claude/skills/book/SKILL.md first. The development book's URL comes from the owner's
    first message; it is never written into this repository.
  * Changing the page: CLAUDE.md ("Build, check", "A new version"); suite/README.md for scenarios and breaks.
  * Before a push: python3 suite/breaks/counterproof.py, python3 suite/forbidden.py --history
EOF
exit $bad
