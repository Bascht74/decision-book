#!/bin/bash
# run_one.sh NAME -- builds, runs and judges one scenario. Needs SRC, SCEN, OUT and CHROME_POOL (set by run_all.sh).
# Prints exactly one line: "ok NAME", "skip NAME: …" or "FAIL NAME: …".
name=$1; lib=$(cd "$(dirname "$0")" && pwd)
exp="$SCEN/$name.expect.json"
read -r width height budget wrap flags < <(python3 -c '
import json,sys;r=json.load(open(sys.argv[1])).get("run",{})
print(r.get("width",1280),r.get("height",900),r.get("budget",10000),1 if r.get("wrap") else 0," ".join(r.get("flags",[])) or "-")' "$exp")
[ "$flags" = "-" ] && flags=""
wrapw=0; [ "$wrap" = 1 ] && wrapw=$width
python3 "$lib/build.py" "$SRC" "$SCEN" "$name" "$OUT" "$wrapw" "$height" || { echo "FAIL $name: build failed"; exit 1; }
page="$OUT/$name.html"; [ "$wrap" = 1 ] && page="$OUT/w_$name.html"
winw=$width; [ "$wrap" = 1 ] && winw=$(( width < 500 ? 500 : width ))
dom="$OUT/$name.dom"
# one of the Chromes run_all.sh started (lib/pool.py): a fresh browser context, the window size, the virtual time budget
python3 "$lib/pool.py" dump "$CHROME_POOL" "$page" $winw $height $budget "$flags" "$dom"
python3 "$lib/check.py" "$name" "$dom" "$exp"
exit 0
