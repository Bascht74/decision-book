#!/bin/bash
# run_all.sh [SRC] -- the decision book's suite. Every scenario in scenarios/ is built on SRC, run in headless
# Chrome and judged against its NAME.expect.json. One line per scenario, a summary, exit 1 on any FAIL.
# Environment: JOBS (parallel Chromes, default 6), ONLY (regex over scenario names), FORBIDDEN=0 (skip the check).
# SRC defaults to ../template/book.html.
here=$(cd "$(dirname "$0")" && pwd)
export SRC=$(cd "$(dirname "${1:-${SRC:-$here/../template/book.html}}")" && pwd)/$(basename "${1:-${SRC:-$here/../template/book.html}}")
[ -f "$SRC" ] || { echo "no page at $SRC"; exit 2; }
export SCEN="$here/scenarios" OUT="${OUT:-$here/out}"
rm -rf "$OUT"; mkdir -p "$OUT"
t0=$(date +%s)
names=$(ls "$SCEN"/*.expect.json | sed 's#.*/##; s#\.expect\.json$##' | grep -E "${ONLY:-.}")
res=$(printf '%s\n' $names | xargs -P "${JOBS:-6}" -n 1 "$here/lib/run_one.sh" | sort -k2)
echo "$res"
n=$(printf '%s\n' "$res" | grep -c .); ok=$(printf '%s\n' "$res" | grep -c '^ok ')
sk=$(printf '%s\n' "$res" | grep -c '^skip '); bad=$(printf '%s\n' "$res" | grep -c '^FAIL ')
echo "== $n scenarios: $ok ok, $bad FAIL, $sk skipped · $(( $(date +%s) - t0 )) s · page $(grep -o 'PAGE_VERSION="[^"]*"' "$SRC" | cut -d'"' -f2) ($SRC)"
# the template must carry nothing personal (FORBIDDEN=0 skips this for a live book's own copy)
fb=0; [ "${FORBIDDEN:-1}" = 1 ] && { python3 "$here/forbidden.py" "$SRC" || fb=1; }
[ "$bad" = 0 ] && [ "$n" -gt 0 ] && [ "$fb" = 0 ]
