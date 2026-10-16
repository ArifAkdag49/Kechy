"""Bundle src/ into: kechy.html (artifact body), kechy-dunyasi/index.html (Vercel site)."""
import hashlib
import io
import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
read = lambda n: io.open(os.path.join(SRC, n), encoding='utf-8').read()

css = read('styles.css')


def versions(folder, ext, mark=None):
    """name -> short content hash, so a regenerated file gets a new URL (and never comes from an old cache)."""
    d = os.path.join(ROOT, 'kechy-dunyasi', *folder)
    if not os.path.isdir(d):
        return {}
    out = {}
    for f in sorted(os.listdir(d)):
        if f.endswith(ext):
            v = hashlib.md5(open(os.path.join(d, f), 'rb').read()).hexdigest()[:6]
            out[f[:-len(ext)]] = v + ('w' if mark and os.path.exists(os.path.join(d, f[:-len(ext)] + mark)) else '')
    return out


def issue_files():
    """Real magazine pages (tools/pdf_pages.py) and their transcribed text (sayilar/text/<n>.json).
    The text goes to sayi/<n>/metin.json (loaded by the reader); titles + a short snippet stay in the bundle for search."""
    base, out = os.path.join(ROOT, 'kechy-dunyasi', 'sayi'), {}
    if not os.path.isdir(base):
        return out
    for n in sorted(os.listdir(base), key=lambda s: int(s) if s.isdigit() else 0):
        d = os.path.join(base, n)
        pages = sorted(f for f in os.listdir(d) if f.startswith('p') and f.endswith('.webp'))
        if not n.isdigit() or not pages:
            continue
        h = hashlib.md5()
        for f in pages + ['kapak.webp']:
            if os.path.exists(os.path.join(d, f)):
                h.update(open(os.path.join(d, f), 'rb').read())
        info = {'count': len(pages), 'v': h.hexdigest()[:6]}
        src = os.path.join(ROOT, 'sayilar', 'text', n + '.json')
        if os.path.exists(src):
            data = json.load(open(src, encoding='utf-8'))
            rows = {p['p']: p for p in data.get('pages', [])}
            metin = [[rows.get(i, {}).get('kind', ''), rows.get(i, {}).get('title', '').strip(), rows.get(i, {}).get('text', '').strip()] for i in range(1, len(pages) + 1)]
            raw = json.dumps(metin, ensure_ascii=False, separators=(',', ':'))
            open(os.path.join(d, 'metin.json'), 'w', encoding='utf-8').write(raw)
            info['t'] = hashlib.md5(raw.encode('utf-8')).hexdigest()[:6]
            info['theme'] = data.get('theme', '')
            info['idx'] = [[i + 1, m[1] or ' '.join(m[2].split())[:48], ' '.join(m[2].split())[:90]] for i, m in enumerate(metin) if m[1] or m[2]]
        out[int(n)] = info
    return out


ai_img, tts, issues = versions(['img', 'ai'], '.webp'), versions(['audio', 'tts'], '.mp3', '.json'), issue_files()
js = ('const AI_IMG = ' + json.dumps(ai_img, separators=(',', ':')) + ';\nconst TTS_FILES = ' + json.dumps(tts, separators=(',', ':')) + ';\n'
      + 'const ISSUE_FILES = ' + json.dumps(issues, ensure_ascii=False, separators=(',', ':')) + ';\n'
      + '\n'.join(read(n) for n in ['data.js', 'art.js', 'core.js', 'pages1.js', 'pages2.js', 'games.js', 'muzik.js', 'merak.js', 'admin.js', 'age.js', 'worlds.js', 'scenes.js', 'boot.js']))
page = read('shell.html').replace('/*CSS*/', css).replace('//JS', js)
io.open(os.path.join(ROOT, 'kechy.html'), 'w', encoding='utf-8', newline='\n').write(page)

cut = page.index('<svg width="0"')
head, body = page[:cut], page[cut:]
desc = "Kechy Çocuk Dergisi'nin dijital dünyası: oku, oyna, keşfet, üret. Kechy Yolu, pasaport, rozetler, 14 oyun ve dünya haritası."
meta = f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1FA2B0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Kechy">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="format-detection" content="telephone=no">
<meta property="og:title" content="Kechy Dünyası">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:image" content="img/logo.png">
<link rel="icon" type="image/png" href="img/app/icon-192.png">
<link rel="apple-touch-icon" href="img/app/apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
''' + (io.open(os.path.join(ROOT, 'tools', 'splash-links.html'), encoding='utf-8').read() if os.path.exists(os.path.join(ROOT, 'tools', 'splash-links.html')) else '')
doc = '<!doctype html>\n<html lang="tr">\n<head>\n' + meta + head + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n'
os.makedirs(os.path.join(ROOT, 'kechy-dunyasi'), exist_ok=True)
io.open(os.path.join(ROOT, 'kechy-dunyasi', 'index.html'), 'w', encoding='utf-8', newline='\n').write(doc)
print('AI images:', len(ai_img), '· recordings:', len(tts), '· issues with pages:', {n: i['count'] for n, i in issues.items()}, '· with text:', [n for n, i in issues.items() if 't' in i]); print('kechy.html', len(page.encode('utf-8')) // 1024, 'KB; kechy-dunyasi/index.html', len(doc.encode('utf-8')) // 1024, 'KB')
