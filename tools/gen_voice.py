"""Records every fixed read-aloud text with Microsoft Edge neural voices (free, no key).

Usage:  node tools/export_texts.js && python tools/gen_voice.py      # records only new or changed texts
Writes kechy-dunyasi/audio/tts/<hash>.mp3 (+ <hash>.json word timings for the karaoke stories).
The hash is FNV-1a over the UTF-16 code units of the normalised text; Voice.file() in src/core.js computes the same."""
import asyncio, json, os, re, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'kechy-dunyasi', 'audio', 'tts')
STATE = os.path.join(ROOT, 'tools', 'voice_state.json')
# Turkish Edge voices are adult; a raised pitch makes Emel sound young (F0 ~245 Hz storyteller, ~295 Hz Kechy, child range).
VOICES = {
    'anlatici': ('tr-TR-EmelNeural', '-6%', '+25Hz'),
    'kechy': ('tr-TR-EmelNeural', '+4%', '+60Hz'),
}


def norm(t):
    return re.sub(r'\s+', ' ', t).strip()


def fnv(t):
    h = 0x811C9DC5
    b = t.encode('utf-16-le')
    for i in range(0, len(b), 2):
        h ^= b[i] | (b[i + 1] << 8)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f'{h:08x}'


BITRATE = '32k'  # Edge sends 48 kbps; speech stays clear at 32 kbps and the site stays under the host's upload limit


async def squeeze(mp3):
    try:
        p = await asyncio.create_subprocess_exec('ffmpeg', '-v', 'quiet', '-i', 'pipe:0', '-ac', '1', '-b:a', BITRATE, '-f', 'mp3', 'pipe:1',
                                                 stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE)
        out, _ = await p.communicate(mp3)
        return out if p.returncode == 0 and len(out) > 1000 else mp3
    except FileNotFoundError:
        return mp3


async def record(item, sem, state, done, total):
    text, role = norm(item['text']), item['role']
    voice, rate, pitch = VOICES[role]
    key, sig = fnv(text), f'{voice}|{rate}|{pitch}|{BITRATE}'
    mp3 = os.path.join(OUT, key + '.mp3')
    if state.get(key) == sig and os.path.exists(mp3) and (not item.get('words') or os.path.exists(mp3[:-4] + '.json')):
        return
    async with sem:
        for attempt in range(5):
            try:
                audio, words, pos = bytearray(), [], 0
                com = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary='WordBoundary')
                async for m in com.stream():
                    if m['type'] == 'audio':
                        audio += m['data']
                    elif m['type'] == 'WordBoundary':
                        k = text.find(m['text'], pos)
                        if k >= 0:
                            words.append([round(m['offset'] / 10000), k])
                            pos = k + len(m['text'])
                if not audio:
                    raise RuntimeError('boş ses')
                audio = await squeeze(bytes(audio))
                open(mp3, 'wb').write(audio)
                if item.get('words'):
                    open(mp3[:-4] + '.json', 'w', encoding='utf-8').write(json.dumps(words, separators=(',', ':')))
                state[key] = sig
                done[0] += 1
                print(f'[{done[0]}/{total}] {key} {role} {len(audio) // 1024} KB  {text[:50]}', flush=True)
                return
            except Exception as e:
                print(f'  {key}: {e!r} - tekrar ({attempt + 1})', flush=True)
                await asyncio.sleep(3 + attempt * 4)
        print(f'  {key}: VAZGEÇİLDİ', flush=True)


async def main():
    os.makedirs(OUT, exist_ok=True)
    items = json.load(open(os.path.join(ROOT, 'tools', 'texts.json'), encoding='utf-8'))
    state = json.load(open(STATE, encoding='utf-8')) if os.path.exists(STATE) else {}
    sem, done = asyncio.Semaphore(4), [0]
    try:
        await asyncio.gather(*(record(it, sem, state, done, len(items)) for it in items))
    finally:
        json.dump(state, open(STATE, 'w', encoding='utf-8'), indent=0)
    keep = {fnv(norm(it['text'])) for it in items}
    stale = [f for f in os.listdir(OUT) if f.split('.')[0] not in keep]
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print(f'Bitti: {len(keep)} metin, {total // 1024} KB' + (f', kullanılmayan {len(stale)} dosya: {stale[:5]}' if stale else ''))


if __name__ == '__main__':
    asyncio.run(main())
