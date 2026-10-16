"""Generates picture-book illustrations with the OpenAI Images API.

Usage:  OPENAI_API_KEY=... python tools/gen_images.py cast            # character sheet
        OPENAI_API_KEY=... python tools/gen_images.py masal-12-2 book-4 # chosen pages
        OPENAI_API_KEY=... python tools/gen_images.py all               # every page not yet generated
The key is read from the environment only and never written to disk."""
import base64, http.client, io, json, os, sys, time, uuid, urllib.request, urllib.error
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'kechy-dunyasi', 'img', 'ai')
LOGO = os.path.join(ROOT, 'kechy-dunyasi', 'img', 'logo.png')
CAST = os.path.join(ROOT, 'tools', 'cast.png')
MODELS = ['gpt-image-2.5-flare', 'gpt-image-2.5', 'gpt-image-2', 'gpt-image-1']
KEY = os.environ.get('OPENAI_API_KEY', '').strip()

SETTINGS = {
    'school': 'a bright cheerful classroom with a green chalkboard, a yellow wall clock and a warm wooden floor',
    'room': "a cozy child's room with a window showing blue sky, a small bookshelf and a soft purple rug",
    'sky': 'open blue sky with fluffy white clouds, seen from above the clouds',
    'meadow': 'a sunny green meadow with gentle rolling hills and small colorful flowers',
    'garden': 'a sunny garden with a white picket fence and flower beds',
    'forest': 'a friendly green forest with round leafy trees, mushrooms and soft grass',
    'sea': 'underwater in a bright blue sea with sunbeams from above, sand, seaweed and bubbles',
    'space': 'outer space with twinkling stars, a soft purple nebula and a ringed planet',
    'moon': 'the grey cratered surface of the Moon, with Earth glowing in the black starry sky',
    'night': 'a calm night with a crescent moon and stars over dark green hills',
    'lab': 'a colorful science lab with bubbling flasks on a wooden shelf and a wooden table',
    'stage': 'a small theater stage with pink curtains and a warm yellow spotlight',
    'snow': 'a snowy winter landscape with snow-covered pine trees and gently falling snowflakes',
    'beach': 'a sunny beach with a turquoise sea, soft sand and a pink-yellow striped umbrella',
}
CHARS = {
    'kechy': 'Kechy, the cute cartoon goat from the character sheet (cream fur, curved orange horns, big friendly eyes, rosy cheeks, teal scarf with a yellow star)',
    'momo': 'Momo, a friendly tan puppy with floppy brown ears and a pink collar',
    'mino': 'Mino, a small grey mouse scientist with pink round ears and lab goggles',
    'piko': 'Piko, a funny green parrot with a pink, yellow and teal crest',
    'luna': 'Luna, a purple owl with big yellow eyes and round glasses',
    'robo': 'Robo, a small friendly light-blue robot with an antenna and glowing cyan eyes',
}
MOOD = {'sleep': 'sad, looking down', 'wow': 'surprised and curious', 'happy2': 'laughing happily', 'happy': 'smiling'}
STYLE = ('flat 2D children\'s picture-book illustration, bold dark navy outlines (#1D2E42), warm friendly palette '
         '(sky teal #5BC6D1, sunny yellow #FFC83A, orange #F2752B, berry pink #E6508A, leaf green #43AE5B, cream #FFF1DC), '
         'soft paper-grain texture, rounded shapes, big expressive eyes, gentle daylight, main character large and clearly readable')


def describe(spec):
    parts = [p.strip() for p in spec.split(';') if p.strip()]
    setting = SETTINGS.get(parts[0], SETTINGS['meadow']) if parts else SETTINGS['meadow']
    who, props = [], []
    for p in parts[1:]:
        t = p.split()
        if t[0] in CHARS:
            who.append(CHARS[t[0]] + (f', {MOOD[t[4]]}' if len(t) > 4 and t[4] in MOOD else ''))
        else:
            props.append(t[0])
    return setting, who, props


def page_prompt(page):
    setting, who, props = describe(page['spec'])
    return '\n'.join([
        'Create one illustration for a page of a Turkish children\'s magazine story (ages 3-7).',
        f'Scene: {setting}.',
        f'Subject: {"; ".join(who) if who else "the scene itself"}.' + (f' Also show: {" ".join(props)} (draw these as real objects in the scene).' if props else ''),
        f'Story text of this page (Turkish): "{page["text"]}" - illustrate exactly this moment.',
        f'Important Details: {STYLE}. Every character must look exactly like on the character sheet in Image 1 (Kechy is the goat with orange horns and the teal star scarf).',
        'Use Case: full-width story page illustration, landscape.',
        'Constraints: no text, no letters, no numbers, no watermark, each character appears at most once, plain objects without writing.',
    ])


CAST_PROMPT = '\n'.join([
    'Create a character sheet for the Kechy children\'s magazine.',
    'Scene: plain warm cream background (#FFF6E6), soft floor shadow.',
    'Subject: six characters standing side by side in one row, full body, front view, evenly spaced: ' + '; '.join(CHARS[k] for k in ['kechy', 'momo', 'mino', 'piko', 'luna', 'robo']) + '. Kechy wears a teal scarf with a small yellow star.',
    f'Important Details: {STYLE}. Kechy must keep the face, horns and colors of the goat in Image 1.',
    'Use Case: character reference sheet reused for every illustration.',
    'Constraints: no text, no names, no labels, no watermark, exactly six characters.',
])


def multipart(fields, files):
    b = uuid.uuid4().hex
    body = io.BytesIO()
    for k, v in fields.items():
        body.write(f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode())
    for k, (name, data) in files:
        body.write(f'--{b}\r\nContent-Disposition: form-data; name="{k}"; filename="{name}"\r\nContent-Type: image/png\r\n\r\n'.encode() + data + b'\r\n')
    body.write(f'--{b}--\r\n'.encode())
    return body.getvalue(), f'multipart/form-data; boundary={b}'


def edit(prompt, images, quality='medium', size='1536x1024'):
    last = None
    for model in MODELS:
        data, ctype = multipart({'model': model, 'prompt': prompt, 'size': size, 'quality': quality, 'n': '1'},
                                [('image[]', (os.path.basename(p), open(p, 'rb').read())) for p in images])
        req = urllib.request.Request('https://api.openai.com/v1/images/edits', data=data, headers={'Authorization': 'Bearer ' + KEY, 'Content-Type': ctype})
        code, msg = None, ''
        for attempt in range(8):
            try:
                with urllib.request.urlopen(req, timeout=300) as r:
                    j = json.loads(r.read())
                return base64.b64decode(j['data'][0]['b64_json']), model
            except urllib.error.HTTPError as e:
                code, msg = e.code, e.read().decode('utf-8', 'replace')[:300]
            except (http.client.HTTPException, urllib.error.URLError, OSError) as e:
                code, msg = 'net', repr(e)[:200]
            if code == 'net' or (isinstance(code, int) and code >= 500):
                print(f'  bağlantı hatası ({msg[:80]}), 15 sn sonra tekrar', flush=True)
                time.sleep(15)
                req = urllib.request.Request('https://api.openai.com/v1/images/edits', data=data, headers={'Authorization': 'Bearer ' + KEY, 'Content-Type': ctype})
                continue
            if code == 429:
                m = __import__('re').search(r'try again in ([\d.]+)s', msg)
                wait = float(m.group(1)) + 2 if m else 20
                print(f'  hız sınırı, {wait:.0f} sn bekleniyor', flush=True)
                time.sleep(wait)
                req = urllib.request.Request('https://api.openai.com/v1/images/edits', data=data, headers={'Authorization': 'Bearer ' + KEY, 'Content-Type': ctype})
                continue
            break
        if code == 429:
            raise SystemExit('Hız sınırı aşılamadı')
        last = f'{model}: HTTP {code} {msg}'
        if code in (400, 404) and ('model' in msg.lower() or 'not found' in msg.lower() or 'does not exist' in msg.lower()):
            continue  # try the next model id
        raise SystemExit('API hatası: ' + last)
    raise SystemExit('Hiçbir model kabul edilmedi. Son hata: ' + last)


def save_webp(png, key):
    os.makedirs(OUT, exist_ok=True)
    im = Image.open(io.BytesIO(png)).convert('RGB')
    im.thumbnail((1200, 1200), Image.LANCZOS)
    path = os.path.join(OUT, key + '.webp')
    im.save(path, 'WEBP', quality=82, method=6)
    return path, os.path.getsize(path) // 1024


def main():
    if not KEY:
        raise SystemExit('OPENAI_API_KEY bulunamadı.')
    args = sys.argv[1:]
    pages = {p['key']: p for p in json.load(open(os.path.join(ROOT, 'tools', 'pages.json'), encoding='utf-8'))}
    if args == ['cast']:
        png, model = edit(CAST_PROMPT, [LOGO], quality='high')
        open(CAST, 'wb').write(png)
        print(f'cast.png hazır ({model})')
        return
    if not os.path.exists(CAST):
        raise SystemExit('Önce karakter kartını üret: gen_images.py cast')
    keys = [k for k in pages if not os.path.exists(os.path.join(OUT, k + '.webp'))] if args == ['all'] else args
    for i, k in enumerate(keys, 1):
        t0 = time.time()
        png, model = edit(page_prompt(pages[k]), [CAST])
        path, kb = save_webp(png, k)
        print(f'[{i}/{len(keys)}] {k} -> {kb} KB ({model}, {time.time() - t0:.0f} sn)', flush=True)


if __name__ == '__main__':
    main()
