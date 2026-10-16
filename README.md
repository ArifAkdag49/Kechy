# Kechy Dünyası

Kechy Çocuk Dergisi'nin dijital dünyası: dergiyi oku, dinle, oyna, keşfet, üret.
Canlı site: https://kechy-dunyasi.vercel.app (Vercel projesi `kechy-dunyasi`). Telefonda ana ekrana eklenince uygulama gibi çalışır (iPhone ve Android).

## Klasörler

| Klasör | İçerik |
| --- | --- |
| `src/` | Sitenin kaynak kodu (tek sayfalık uygulama: `data.js`, `core.js`, `pages*.js`, `games.js`, `muzik.js`, `worlds.js` …, `styles.css`, `shell.html`) |
| `kechy-dunyasi/` | Yayınlanan site: `index.html` (derlenmiş), `sayi/<n>/` dergi sayfaları + kapak + `metin.json`, `audio/tts/` sesli okuma kayıtları, `img/` logo, ikonlar, açılış ekranları, AI resimleri, `api/` Vercel fonksiyonları, `sw.js`, `manifest.webmanifest` |
| `sayilar/text/` | Dergi sayfalarının yazıya dökülmüş metinleri (`<n>.json`, sayfa sayfa) |
| `sayilar/post_*.json`, `archive.json` | Substack'teki sayı yazıları (PDF bağlantılarının kaynağı) |
| `tools/` | Üretim araçları (aşağıda) |

## Derleme ve yayın

```bash
python -X utf8 build.py                      # src/ -> kechy-dunyasi/index.html
cd kechy-dunyasi && npx vercel deploy --prod # yayınla
```

## Araçlar

- `tools/pdf_pages.py <n> <pdf>` – bir sayının PDF'ini sayfa görsellerine ve kapağa çevirir (`kechy-dunyasi/sayi/<n>/`).
- Sayfa metinleri `sayilar/text/<n>.json` dosyasına yazılır (PDF'ler taranmış görsel olduğu için metin sayfalardan okunarak çıkarıldı); `build.py` bunları `metin.json` ve arama dizinine çevirir.
- `tools/export_texts.js` + `tools/gen_voice.py` – sesli okunan tüm metinleri Microsoft Edge sesleriyle kaydeder (`kechy-dunyasi/audio/tts/`). Metin değişince ikisini yeniden çalıştır.
- `tools/gen_images.py` – masal ve mini kitap sayfalarına OpenAI ile resim üretir. Anahtar dosyaya yazılmaz: `resimleri-uret.ps1` anahtarı ekranda sorar.
- `tools/make_icons.py` – uygulama ikonları ve iPhone açılış ekranları.

## Eksikler

- Kechy 2, 3, 4, 5 ve 7'nin PDF'leri henüz sitede yok (yalnızca kapalı bir Google Drive klasöründe). Kechy 6'nın yalnızca kapağı var. PDF'ler gelince `tools/pdf_pages.py` ile eklenir.
- Sayıların 5'er sorusu ve 0–7 yaş masalları örnek içeriktir; gerçek sayılara göre yeniden yazılmalı (editör paneli: `#admin`).
- Masal sayfalarının yapay zekâ resimlerinden 23/57'si hazır.
