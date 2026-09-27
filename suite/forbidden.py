#!/usr/bin/env python3
"""forbidden.py [FILE ...] | --all | --history | --hash WORD -- nothing personal or project-bound may stand here.

    python3 suite/forbidden.py                  # template/book.html
    python3 suite/forbidden.py page.html        # any built page
    python3 suite/forbidden.py --all            # every text file of this repository (card numbers excepted)
    python3 suite/forbidden.py --history [REV]  # every file and commit message reachable in git (default: all refs;
                                                # card numbers excepted)
    python3 suite/forbidden.py --hash WORD      # the line to add a new word to WORDS below

Prints one line per hit (file, line, rule, the text around it) and exits 1 on any hit.

Words that must not stand anywhere -- people's names, their handles, the names of a project the book once served,
its tools and services -- are listed only as SHA-256 hashes, so this file names nobody. Every text is cut into tokens
(runs of letters and digits); a token matches when the hash of its lower-case form is in WORDS (or of the token as
written, in WORDS_CASE, for a word that is harmless in lower case), also with a trailing "s" taken off. The hashes are
not a secret -- a guessed word can be checked against them -- they only keep the words themselves out of the repository.

Other rules, as patterns: links to claude.ai artifacts and sessions, e-mail addresses (example.org/.com/.net
excepted), keys and tokens, local home paths, and card numbers ("E-" and three digits -- a book's card numbers belong
to one project, not to the page). The card-number rule applies to pages only: the suite's synthetic scenario data
uses such numbers."""
import hashlib, os, re, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)

# sha256(lower-case token) -> what kind of word it is
WORDS = {
    '4dd68e2ab3a30973318ea903e088b3d3480655ef4236109fe47272c1c1582880': 'personal name',
    '0456e50086d924490738f5b2e58218eeb54b36b0bc47511a1d52835f408d7a8c': 'personal name',
    '2d0dcec9ec91ab51b7db9ff564afe73058271cf61ebf925841af4d8aa41c8f38': 'personal name',
    'baa1fb87ddaa187f12f59b426737586e80d36bf8b0df9d97c7ec5d5f98c1ed2b': 'personal handle',
    '51f46140fe8380f4381753f92613ebd56ba57859e191c4fd06285dd79d543b50': 'personal handle',
    'fb8217b5d507044416e56024b51c2202a19e3070705aafe570c8e46511ede1fd': 'a project the book served',
    '0f999c500ee6299775b79c479f561e7b7c789a265370c4a658e8c3466377cb8f': 'a project the book served',
    '81861f2a7cc2b429795efae68dc1d0d3bd3c7d4752acaf5974a213c6243d4312': 'that project\'s services',
    '7a62c1187b4217e70a6661e2182c744a5d8cd555f5f5d5d66ff5fdcadeeda0d7': 'that project\'s tools',
}
# sha256(token exactly as written) -- words that are ordinary in lower case (a JavaScript "resolve")
WORDS_CASE = {
    'c8f193b315c86f3a9d5ff6c85697aa6112760966f93f92da5f7a4153f3c0bc8c': 'that project\'s tools',
}
RULES = [
    ('artifact link', re.compile(r'claude\.ai/(?:code/)?artifacts?/')),
    ('session link', re.compile(r'claude\.ai/code/session|session_0')),
    ('e-mail address', re.compile(r'[A-Za-z0-9._%+-]+@(?!example\.(?:org|com|net)\b)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b')),
    ('key or token', re.compile(r'sk-ant-|ghp_[A-Za-z0-9]{10}|gho_[A-Za-z0-9]{10}|github_pat_|xox[bp]-|AKIA[0-9A-Z]{12}|-----BEGIN [A-Z ]*PRIVATE KEY')),
    ('local path', re.compile(r'/Users/|/private/tmp/|/home/[a-z]|[A-Z]:\\Users\\')),
]
# the two attribution lines every commit made with Claude ends with (a fixed address, and a link to the Claude Code
# session that made it -- it opens only for its owner): allowed in commit messages, and counted in the summary
TRAILER = re.compile(r'^(Co-Authored-By: Claude [^<>]*<noreply@anthropic\.com>|Claude-Session: https://claude\.ai/code/session_\w+)$')
CARD = ('card number', re.compile(r'\bE-\d{3}'))
# the one e-mail-like string the page needs: the font request "…wght@400;500…" is no address (the rule needs a dot-domain)
SKIP_DIRS = {'.git', 'out'}
TEXT = ('.html', '.js', '.json', '.py', '.sh', '.md', '.txt', '.css', '.gitignore', 'VERSION')
TOKEN = re.compile(r'[A-Za-z0-9]+')
h = lambda s: hashlib.sha256(s.encode('utf-8')).hexdigest()


def word_hits(line):
    for m in TOKEN.finditer(line):
        t = m.group(0)
        for v in {t, t[:-1] if len(t) > 3 and t[-1] in 'sS' else t}:
            why = WORDS.get(h(v.lower())) or WORDS_CASE.get(h(v))
            if why:
                yield why, m
                break


def scan_text(name, text, rules):
    hits = []
    for n, line in enumerate(text.split('\n'), 1):
        found = [(why, m) for why, m in word_hits(line)] + [(rn, m) for rn, rx in rules for m in rx.finditer(line)]
        for why, m in found:
            # the word itself is not printed in full: the line number and its surroundings are enough to find it
            hits.append('%s:%d: %s: …%s[%d chars]%s…' % (name, n, why, line[max(0, m.start() - 40):m.start()],
                                                          m.end() - m.start(), line[m.end():m.end() + 40]))
    return hits


def scan(path, rules):
    try:
        text = open(path, encoding='utf-8').read()
    except (UnicodeDecodeError, OSError):
        return []
    return scan_text(os.path.relpath(path, root), text, rules)


def history(revs):
    """every blob reachable from any ref, with the first path it was seen under"""
    git = lambda *a: subprocess.run(['git', '-C', root] + list(a), capture_output=True, check=True).stdout
    seen = {}
    for line in git('rev-list', '--objects', *revs).decode('utf-8', 'replace').splitlines():
        sha, _, path = line.partition(' ')
        if path and sha not in seen:
            seen[sha] = path
    out = []
    for sha, path in sorted(seen.items(), key=lambda x: x[1]):
        if git('cat-file', '-t', sha).strip() != b'blob':
            continue
        data = git('cat-file', 'blob', sha)
        try:
            out.append(('%s@%s' % (path, sha[:10]), data.decode('utf-8')))
        except UnicodeDecodeError:
            out.append(('%s@%s' % (path, sha[:10]), data.decode('latin-1')))
    commits = git('log', *revs, '--format=%H%n%an <%ae>%n%cn <%ce>%n%B%n').decode('utf-8', 'replace').split('\n')
    kept = [l for l in commits if not TRAILER.match(l)]
    out.append(('commit messages and authors', '\n'.join(kept)))
    return out, len(commits) - len(kept)


def main(args):
    if args[:1] == ['--hash']:
        for w in args[1:]:
            print("    '%s': '<kind>',   # lower-case token" % h(w.lower()))
        return 0
    if args[:1] == ['--history']:
        items, trailers = history(args[1:] or ['--all'])
        print('== history: %d attribution trailer lines allowed (Co-Authored-By / Claude-Session)' % trailers)
        # this file's own patterns would match themselves: here only the words are looked for
        hits = [x for name, text in items for x in scan_text(name, text, [] if name.startswith('suite/forbidden.py@') else RULES)]
        n = len(items)
    elif args == ['--all']:
        me = os.path.abspath(__file__)
        files = []
        for d, dirs, fs in os.walk(root):
            dirs[:] = [x for x in dirs if x not in SKIP_DIRS and not x.startswith('out_')]
            files += [os.path.join(d, f) for f in fs if f.endswith(TEXT) and os.path.join(d, f) != me]
        hits = [x for f in sorted(files) for x in scan(f, RULES)] + scan(me, [])
        n = len(files)
    else:
        files = args or [os.path.join(root, 'template', 'book.html')]
        hits = [x for f in sorted(files) for x in scan(f, RULES + [CARD])]
        n = len(files)
    for x in hits:
        print('FORBIDDEN ' + x)
    print('== forbidden strings: %d files, %d hits' % (n, len(hits)))
    return 1 if hits else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
