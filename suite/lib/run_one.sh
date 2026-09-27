#!/bin/bash
# run_one.sh NAME -- builds, runs and judges one scenario. Needs SRC, SCEN, OUT in the environment.
# Prints exactly one line: "ok NAME", "skip NAME: …" or "FAIL NAME: …".
name=$1; lib=$(cd "$(dirname "$0")" && pwd)
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
exp="$SCEN/$name.expect.json"
read -r width height budget wrap flags < <(python3 -c '
import json,sys;r=json.load(open(sys.argv[1])).get("run",{})
print(r.get("width",1280),r.get("height",900),r.get("budget",10000),1 if r.get("wrap") else 0," ".join(r.get("flags",[])) or "-")' "$exp")
[ "$flags" = "-" ] && flags=""
wrapw=0; [ "$wrap" = 1 ] && wrapw=$width
python3 "$lib/build.py" "$SRC" "$SCEN" "$name" "$OUT" "$wrapw" "$height" || { echo "FAIL $name: build failed"; exit 1; }
page="$OUT/$name.html"; [ "$wrap" = 1 ] && page="$OUT/w_$name.html"
winw=$width; [ "$wrap" = 1 ] && winw=$(( width < 500 ? 500 : width ))
dom="$OUT/$name.dom"; prof="$OUT/prof_$name"; rm -rf "$prof"
# no network: every host name fails to resolve; background services off
TZ=Europe/Berlin LANG=de_DE.UTF-8 "$CHROME" --headless --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
  --disable-background-networking --disable-sync --disable-component-update --use-mock-keychain --password-store=basic \
  --host-resolver-rules="MAP * ~NOTFOUND" --allow-file-access-from-files --lang=de-DE \
  --user-data-dir="$prof" --window-size=$winw,$height --virtual-time-budget=$budget $flags \
  --dump-dom "file://$page" > "$dom" 2>/dev/null &
pid=$!
# Chrome on this Mac prints the DOM and then lingers; stop it as soon as the dump is complete (at most 45 s)
for _ in $(seq 1 450); do
  tail -c 32 "$dom" 2>/dev/null | grep -q '</html>' && break
  kill -0 $pid 2>/dev/null || break
  sleep 0.1
done
kill $pid 2>/dev/null; wait $pid 2>/dev/null
rm -rf "$prof"
python3 "$lib/check.py" "$name" "$dom" "$exp"
exit 0
