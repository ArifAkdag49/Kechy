"""Turns a Kechy issue PDF into reader pages for the site.

Usage: python tools/pdf_pages.py <issue number> <pdf path> [width]
Writes kechy-dunyasi/sayi/<n>/p001.webp ... (reader pages), kapak.webp (cover for the shelf)
and sayilar/ocr/<n>/p001.jpg (large copies for reading the text off the page)."""
import io, os, sys
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    n, pdf = int(sys.argv[1]), sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 1000
    out = os.path.join(ROOT, 'kechy-dunyasi', 'sayi', str(n))
    ocr = os.path.join(ROOT, 'sayilar', 'ocr', str(n))
    os.makedirs(out, exist_ok=True)
    os.makedirs(ocr, exist_ok=True)
    doc = pymupdf.open(pdf)
    total = 0
    for i, page in enumerate(doc):
        zoom = 1600 / page.rect.width
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
        im.save(os.path.join(ocr, f'p{i + 1:03d}.jpg'), quality=85)
        web = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        path = os.path.join(out, f'p{i + 1:03d}.webp')
        web.save(path, 'WEBP', quality=70, method=6)
        total += os.path.getsize(path)
        if i == 0:
            im.resize((600, round(im.height * 600 / im.width)), Image.LANCZOS).save(os.path.join(out, 'kapak.webp'), 'WEBP', quality=78, method=6)
    print(f'Kechy {n}: {doc.page_count} sayfa, {total // 1024} KB ({total // 1024 // doc.page_count} KB/sayfa)')


if __name__ == '__main__':
    main()
