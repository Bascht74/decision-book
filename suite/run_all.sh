#!/bin/bash
# run_all.sh [SRC] -- the decision book's suite. Every scenario in scenarios/ is built on SRC, run in headless
# Chrome and judged against its NAME.expect.json. One line per scenario, a summary, exit 1 on any FAIL.
# Environment: JOBS (Chromes, started once per run and reused, default 6), ONLY (regex over scenario names),
# FORBIDDEN=0 (skip the check), CHROME_POOL (the socket of a running lib/pool.py: use its Chromes, start none).
# SRC defaults to ../template/book.html.
here=$(cd "$(dirname "$0")" && pwd)
export SRC=$(cd "$(dirname "${1:-${SRC:-$here/../template/book.html}}")" && pwd)/$(basename "${1:-${SRC:-$here/../template/book.html}}")
[ -f "$SRC" ] || { echo "no page at $SRC"; exit 2; }
export SCEN="$here/scenarios" OUT="${OUT:-$here/out}"
rm -rf "$OUT"; mkdir -p "$OUT"
t0=$(date +%s)
names=$(ls "$SCEN"/*.expect.json | sed 's#.*/##; s#\.expect\.json$##' | grep -E "${ONLY:-.}")
jobs=${JOBS:-6}; nn=$(printf '%s\n' $names | grep -c .); [ "$nn" -gt 0 ] && [ "$nn" -lt "$jobs" ] && jobs=$nn
if [ -n "$CHROME_POOL" ] && [ -S "$CHROME_POOL" ]; then
  : # a pool that is already running (breaks/counterproof.py starts one for all its calls): no Chrome is started here
else
  # JOBS headless Chromes (no more than there are scenarios), started once and closed again however this script ends
  # (lib/pool.py); no window ever opens
  export CHROME_POOL="$OUT/pool.sock"
  python3 "$here/lib/pool.py" serve "$CHROME_POOL" "$jobs" & pool=$!
  trap 'kill $pool 2>/dev/null; wait $pool 2>/dev/null' EXIT
  trap 'exit 130' INT TERM
  for _ in $(seq 1 300); do [ -S "$CHROME_POOL" ] && break; kill -0 $pool 2>/dev/null || break; sleep 0.1; done
  [ -S "$CHROME_POOL" ] || { echo "no Chrome pool (lib/pool.py) came up"; exit 2; }
fi
res=$(printf '%s\n' $names | xargs -P "$jobs" -n 1 "$here/lib/run_one.sh" | sort -k2)
echo "$res"
n=$(printf '%s\n' "$res" | grep -c .); ok=$(printf '%s\n' "$res" | grep -c '^ok ')
sk=$(printf '%s\n' "$res" | grep -c '^skip '); bad=$(printf '%s\n' "$res" | grep -c '^FAIL ')
echo "== $n scenarios: $ok ok, $bad FAIL, $sk skipped · $(( $(date +%s) - t0 )) s · page $(grep -o 'PAGE_VERSION="[^"]*"' "$SRC" | cut -d'"' -f2) ($SRC)"
# the template must carry nothing personal (FORBIDDEN=0 skips this for a live book's own copy)
fb=0; [ "${FORBIDDEN:-1}" = 1 ] && { python3 "$here/forbidden.py" "$SRC" || fb=1; }
[ "$bad" = 0 ] && [ "$n" -gt 0 ] && [ "$fb" = 0 ]
