"""Builds the home-screen icons and iOS launch screens from the logo and the character sheet.

Usage: python tools/make_icons.py   (writes kechy-dunyasi/img/app/*)"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'kechy-dunyasi', 'img')
OUT = os.path.join(IMG, 'app')
BG = (253, 246, 225)          # cream, same as the character sheet background
TEAL = (31, 162, 176)
INK = (29, 46, 66)

# Portrait launch screens: (css width, css height, device pixel ratio)
SPLASH = [
    (440, 956, 3), (402, 874, 3), (430, 932, 3), (393, 852, 3), (428, 926, 3), (390, 844, 3),
    (375, 812, 3), (414, 896, 3), (414, 896, 2), (414, 736, 3), (375, 667, 2), (320, 568, 2),
    (1032, 1376, 2), (1024, 1366, 2), (834, 1210, 2), (834, 1194, 2), (820, 1180, 2), (810, 1080, 2), (744, 1133, 2), (768, 1024, 2),
]


def fit(im, box):
    k = box / max(im.width, im.height)
    return im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)


def cut_logo():
    """The logo was cropped from a screenshot: flood-fill its light backdrop from the edges into transparency."""
    im = Image.open(os.path.join(IMG, 'logo.png')).convert('RGB')
    w, h = im.size
    marked = im.copy()
    for p in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1)]:
        ImageDraw.floodfill(marked, p, (255, 0, 255), thresh=28)
    mask = Image.new('L', (w, h), 255)
    mask.putdata([0 if px == (255, 0, 255) else 255 for px in marked.get_flattened_data()])
    mask = mask.filter(ImageFilter.GaussianBlur(.8))
    im.putalpha(mask)
    return im


LOGO = None


def logo_img():
    global LOGO
    LOGO = LOGO or cut_logo()
    return LOGO


def logo_on(bg, size, pad):
    logo = fit(logo_img(), int(size * (1 - 2 * pad)))
    im = Image.new('RGBA', (size, size), bg + (255,))
    im.alpha_composite(logo, ((size - logo.width) // 2, (size - logo.height) // 2))
    return im.convert('RGB')


def font(px):
    for f in ('segoeuib.ttf', 'arialbd.ttf'):
        p = os.path.join(os.environ.get('WINDIR', 'C:/Windows'), 'Fonts', f)
        if os.path.exists(p):
            return ImageFont.truetype(p, px)
    return ImageFont.load_default()


def splash(w, h):
    im = Image.new('RGB', (w, h), BG)
    d = ImageDraw.Draw(im)
    logo = fit(logo_img(), int(min(w, h) * .42))
    cast = Image.open(os.path.join(ROOT, 'tools', 'cast.png')).convert('RGB')
    cw = int(w * .92)
    cast = cast.resize((cw, int(cast.height * cw / cast.width)), Image.LANCZOS)
    title = font(int(min(w, h) * .075))
    sub = font(int(min(w, h) * .038))
    t1, t2 = 'Kechy Dünyası', 'Oku · Oyna · Keşfet · Üret'
    b1, b2 = d.textbbox((0, 0), t1, font=title), d.textbbox((0, 0), t2, font=sub)
    gap = int(h * .025)
    total = logo.height + gap + (b1[3] - b1[1]) + gap // 2 + (b2[3] - b2[1]) + gap * 2 + cast.height
    y = (h - total) // 2
    im.paste(logo, ((w - logo.width) // 2, y), logo); y += logo.height + gap
    d.text(((w - (b1[2] - b1[0])) // 2, y - b1[1]), t1, font=title, fill=INK); y += (b1[3] - b1[1]) + gap // 2
    d.text(((w - (b2[2] - b2[0])) // 2, y - b2[1]), t2, font=sub, fill=TEAL); y += (b2[3] - b2[1]) + gap * 2
    edge = Image.new('L', cast.size, 0)
    m = int(cast.width * .04)
    ImageDraw.Draw(edge).rectangle((m, m, cast.width - m, cast.height - m), fill=255)
    im.paste(cast, ((w - cast.width) // 2, y), edge.filter(ImageFilter.GaussianBlur(m / 2)))
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    logo_on(BG, 180, .08).save(os.path.join(OUT, 'apple-touch-icon.png'), optimize=True)
    logo_on(BG, 192, .06).save(os.path.join(OUT, 'icon-192.png'), optimize=True)
    logo_on(BG, 512, .06).save(os.path.join(OUT, 'icon-512.png'), optimize=True)
    logo_on(BG, 512, .18).save(os.path.join(OUT, 'maskable-512.png'), optimize=True)
    links = []
    for w, h, r in SPLASH:
        name = f'splash-{w * r}x{h * r}.jpg'
        splash(w * r, h * r).save(os.path.join(OUT, name), quality=80, optimize=True, progressive=True)
        links.append(f'<link rel="apple-touch-startup-image" media="(device-width: {w}px) and (device-height: {h}px) and (-webkit-device-pixel-ratio: {r}) and (orientation: portrait)" href="img/app/{name}">')
    open(os.path.join(ROOT, 'tools', 'splash-links.html'), 'w', encoding='utf-8').write('\n'.join(links) + '\n')
    print(len(links), 'launch screens,', sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT)) // 1024, 'KB')


if __name__ == '__main__':
    main()
