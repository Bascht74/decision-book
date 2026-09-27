#!/usr/bin/env python3
"""build_template.py SRC [OUT] -- makes template/book.html: the empty book page at the repository's VERSION.

    python3 template/build_template.py template/book.html          # after editing update.js or VERSION: rebuild in place
    python3 template/build_template.py path/to/old_live_page.html  # once: turn a live page from before 0.1.0 into the template

What it does, in this order:
  1. PAGE_VERSION becomes the repository's VERSION (the file VERSION next to this folder). A page from before 0.1.0
     (PAGE_VERSION "v113" and the like) gets a change log (BUCH_LOG) of one neutral entry for that version; a page that
     already counts x.y.z keeps its log, and the top entry must name VERSION.
  2. The update block (template/update.js: MIGRATIONS and the code that runs them on load) is put in after
     PAGE_VERSION, or replaces the one already there; the page's start calls it once the db is there.
  3. Card references in comments ("E-123:", "(E-124)", "E-125/E-126") are removed; the few format examples that carry
     a card number get neutral ones.
  4. Texts that describe one particular project (its language, build machines, outside services, first releases) are
     replaced by neutral ones -- the list NEUTRAL below. The owner's stamp field and a project's storage-key prefix get
     their neutral names ("eigner_am", "eb-").
  5. The result is checked by suite/forbidden.py; the build fails if anything forbidden is left.

A NEUTRAL entry whose text is not found is reported (the page moved on, or it was neutral already): look at the text
and adjust the entry. The forbidden-strings check still guards the result either way."""
import os, re, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)

# (what, pattern, replacement) -- regular expressions, each one kept narrow. They are written so that this file
# names nothing of the project they neutralise (no card numbers, no outside services).
N = r'E-\d{3}'
NEUTRAL = [
    ('format example in a comment', r'\("%s", \d+, or "%s, %s"\)' % (N, N, N), '("E-12", 12, or "E-12, E-13")'),
    ('format example in a comment', r'\("%s", "e\d{3}", "\d{3}"\)' % N, '("E-19", "e19", "19")'),
    ('format example in a comment', r'\{id:"%s", …' % N, '{id:"E-12", …'),
    ('a comment names one real incident', r" \(the owner's comment on %s went out twice\)" % N, ' (a comment once went out twice)'),
    ('a comment names one project\'s numbering', r'\(\d+\.\d+\.\d+bNN -> \d+\.\d+\.\d+b\(NN\+1\)\); the one place that knows it \(to be set in the settings later, %s\)' % N,
     '(x.y.zbNN -> x.y.zb(NN+1)); the one place that knows it'),
    ('a comment names the owner\'s machine', r"backs it up to the owner's Mac", "backs it up to the owner's machine"),
    ('a comment names the owner\'s backup folder', r"Claude's backup on the Mac \(~/[^)]*\)", "Claude's backup on the owner's machine (one folder per backup)"),
    ('the page\'s own versions', r'// Version of this page, shown small next to the title\. Bump it on EVERY publish \(v27 -> v28 -> \.\.\.\)\.',
     '// Version of this page (x.y.z), shown small next to the title: the repository\'s VERSION, set by template/build_template.py.'),
    ('the page\'s own versions', r'klicken für die Änderungen seit v1"', 'klicken für die Änderungen"'),
    ('statistics hint: the project\'s language', r'(Zeilen des Programms|der Programmzeilen) \([A-Za-z+#]+\)', r'\1'),
    ('statistics hint: when the project started counting tokens', r'; vor dem Zählskript \([\d.]+\) teils geschätzt, daher kann es bei älteren Releases über dem Gesamtwert liegen\.', '.'),
    ('statistics hint: when the project started counting cards', r' Karten gibt es erst seit b\d+, davor steht „–“\.', ' Was nicht gemessen wurde, steht als „–“.'),
    ('statistics hint: how far the project\'s logs reach', r' Die Protokolle reichen bis zum [\d.]+ zurück, also ab b\d+[.;]', ''),
    ('statistics hint: the project\'s build machines', r'vom Start bis der letzte der \w+ Jobs fertig war \(gibt es erst ab [\d.]+\)\.', 'vom Start, bis der letzte Job fertig war.'),
    ('statistics hint: the project\'s own machine', r'Suite hier: alle Tests auf dem Mac \(erst ab b\d+ gemessen\)\.', 'Suite hier: alle Tests auf dem eigenen Rechner.'),
    ('statistics hint: the project\'s outside services', r'„nicht gelaufen“ zählt Tests, die [^"]*? oder ein anderes System brauchen\.',
     '„nicht gelaufen“ zählt Tests, die ein fremdes Programm oder einen fremden Dienst brauchen.'),
    ('statistics hint: the project\'s build machines', r'\(je Test der Mittelwert über die \w+ Rechner,', '(je Test der Mittelwert über alle Rechner,'),
    ('default release steps: the project\'s count of build checks', r' – alle \w+ Prüfungen grün"', ' – alle Prüfungen grün"'),
    ('default release steps: the project\'s own records', r'Veröffentlichung – Version erscheint, Testdauern aufgezeichnet', 'Veröffentlichung – Version erscheint'),
    ('default release steps: the project\'s registers', r'"Register & Zählstände"', '"Zählstände"'),
    ('statistics hint: the project\'s bilingual change log', r'Punkte je Abschnitt im Changelog \(englische Hälfte gezählt\)\.', 'Punkte je Abschnitt im Changelog.'),
    ('statistics hint: when the project started measuring', r' Gemessen wird das seit b\d+\.', ''),
]

REF = r'E-\d{2,4}[a-z]?(?: Nachtrag(?: \d+)?)?'
REFS = REF + r'(?:\s*(?:/|\.\.|,|and)\s*' + REF + r')*'
UPD_BEGIN, UPD_END = '/* == book-update: begin ==', '/* == book-update: end == */'
START_OLD = '  if(!db){$("#live").textContent="nicht verbunden – nur Ansicht";canWrite=false;render();return}\n'
START_HOOK = '  bookUpdate(db);  // the data version: runs the pending MIGRATIONS (update block above)\n'


def strip_refs(page):
    n0 = len(re.findall(REF, page))
    page = re.sub(r'\s*\(' + REFS + r'\)', '', page)            # "(E-422)", "(E-442/E-444)"
    page = re.sub(r'\(' + REFS + r':\s*', '(', page)             # "(E-123: a dropdown" -> "(a dropdown"
    page = re.sub(r',\s*' + REFS + r'\)', ')', page)              # '(and of "Archiv", E-544)' -> '(and of "Archiv")'
    page = re.sub(r'\.\s+' + REFS + r':\s*', '. ', page)          # "… round). E-123: last …" -> "… round). last …"
    page = re.sub(REFS + r':\s*', '', page)                       # "// E-123: text" -> "// text"
    page = re.sub(r'/\*\s*' + REFS + r'\s*\*/', '', page)         # "/* E-600 */"
    page = re.sub(r'//\s*' + REFS + r'\s*$', '//', page, flags=re.M)
    page = re.sub(r'//\s*' + REFS + r'\s+(?=\S)', '// ', page)    # "// E-458 (the chips …" -> "// (the chips …"
    return page, n0


def neutral_names(page, missed):
    """the owner's stamp field and a project's storage-key prefix -- found by where they are used, so no name stands here"""
    # the owner's own stamp on a card was a field named after him ("<name>_am", written by save() on every card write);
    # since 0.1.0 it is "eigner_am" (migration 0.1.0 copies the old field in a book's data)
    st = re.search(r'update\(Object\.assign\(\{geaendert:now,([a-z]+)_am:now\}', page)
    if not st:
        missed.append('the owner\'s stamp field in save()')
    elif st.group(1) != 'eigner':
        page = re.sub(r'\b%s_am\b' % st.group(1), 'eigner_am', page)
    # local/session storage keys are "eb-…"; keys that carried a project's prefix get "eb-" (a viewer loses only a
    # remembered sort or fold once)
    for pre in sorted(set(re.findall(r'Storage\.(?:getItem|setItem|removeItem)\("([a-z]+)-', page)) - {'eb'}):
        page = page.replace('"%s-' % pre, '"eb-')
    return page


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, 'book.html')
    version = open(os.path.join(root, 'VERSION'), encoding='utf-8').read().strip()
    if not re.fullmatch(r'\d+\.\d+\.\d+', version):
        sys.exit('VERSION is not x.y.z: %r' % version)
    page = open(src, encoding='utf-8').read()
    m = re.search(r'const PAGE_VERSION="([^"]*)";', page)
    if not m:
        sys.exit('no PAGE_VERSION in ' + src)
    was = m.group(1)
    old_style = not re.fullmatch(r'\d+\.\d+\.\d+', was)
    missed = []

    # 1. the version, and for a page from before 0.1.0 its change log: one neutral entry
    page = page.replace(m.group(0), 'const PAGE_VERSION="%s";' % version, 1)
    if old_style:
        page, n = re.subn(r'^const BUCH_LOG=\[.*\];$',
                          lambda _: 'const BUCH_LOG=[{"v": "%s", "datum": "", "uhrzeit": "", "karten": [], "punkte": ['
                          '"Ausgangsstand: die leere Vorlage des Entscheidungsbuchs.", '
                          '"Versionen zählen ab jetzt x.y.z (Nachbesserungen x.y.z+1). Das Buch führt seinen Datenstand in meta/buch '
                          'und bringt seine Daten beim Öffnen selbst auf den Stand dieser Seite, sobald jemand mit Schreibrechten es öffnet."]}];' % version,
                          page, count=1, flags=re.M)
        if n != 1:
            sys.exit('BUCH_LOG not found on a line of its own')
    else:
        top = re.search(r'^const BUCH_LOG=\[\{"v": "([^"]*)"', page, flags=re.M)
        if not top or top.group(1) != version:
            missed.append('BUCH_LOG has no entry for %s on top -- write it (German, what changed for the owner)' % version)

    # 2. the update block, and the call at the start
    upd = open(os.path.join(here, 'update.js'), encoding='utf-8').read().strip('\n') + '\n'
    if UPD_BEGIN in page:
        a = page.index(UPD_BEGIN); b = page.index(UPD_END, a) + len(UPD_END) + 1
        page = page[:a] + upd + page[b:]
    else:
        line = 'const PAGE_VERSION="%s";\n' % version
        page = page.replace(line, line + upd, 1)
    if START_HOOK not in page:
        if page.count(START_OLD) != 1:
            sys.exit('the start of the page (db without connection) is not found once: the update call cannot be put in')
        page = page.replace(START_OLD, START_OLD + START_HOOK)
    if 'async function runRules(){if(UPD.busy||' not in page:
        page, n = re.subn(r'async function runRules\(\)\{if\(', 'async function runRules(){if(UPD.busy||', page, count=1)
        if n != 1:
            missed.append('runRules() not found: the rule writes do not wait for the migrations')

    # 3 and 4: neutral texts first (some carry card numbers), then names, then card references
    for what, old, new in NEUTRAL:
        page, c = re.subn(old, new, page)
        if c == 0 and old_style:
            missed.append(what + ': ' + old[:70])
    page = neutral_names(page, missed)
    page, nrefs = strip_refs(page)
    left = re.findall(REF, page)

    open(out, 'w', encoding='utf-8').write(page)
    print('template %s written from %s: page %s -> %s, %d card references removed, update block with %d migration(s)'
          % (os.path.relpath(out, root), src, was, version, nrefs - len(left), upd.count('{to:"')), flush=True)
    for x in missed:
        print('  not found (the page moved on?): ' + x)

    # 5. the check
    r = subprocess.run([sys.executable, os.path.join(root, 'suite', 'forbidden.py'), out])
    sys.exit(r.returncode)


if __name__ == '__main__':
    main()
