/* ============ Yaş grupları: 0-7 (minik) ve 7-12 (büyük) ============ */
const AGES = { minik: { e: '🧸', t: '0-7 yaş', n: 'Minik Kaşif', d: 'Büyük düğmeler, sesli sorular, kolay oyunlar.' }, buyuk: { e: '🎒', t: '7-12 yaş', n: 'Büyük Kaşif', d: 'Bütün oyunlar, bilmeceler, dedektiflik ve daha zor sorular.' } };
const isMinik = () => S.age === 'minik';
DATA.DAILY_GAMES_MINIK = ['hafiza', 'yapboz', 'boyama', 'labirent', 'hayvan', 'fark'];
['hafiza', 'labirent', 'yapboz', 'sudoku', 'fark', 'boyama', 'uzay', 'hayvan'].forEach(id => { const g = DATA.GAMES.find(x => x.id === id); if (g) g.minik = true; });

DATA.QUESTIONS_MINIK = [
  ['Hangisi bir meyvedir?', ['🚗 Araba', '🍎 Elma', '🏠 Ev'], 1, 'Elma bir meyvedir. Hem tatlı hem sağlıklı!'],
  ['Kedi nasıl ses çıkarır?', ['🐶 Hav hav', '🐮 Möö', '🐱 Miyav'], 2, 'Kediler miyav der.'],
  ['Hangisi gökyüzünde uçar?', ['🐦 Kuş', '🐟 Balık', '🐢 Kaplumbağa'], 0, 'Kuşlar kanatlarıyla uçar.'],
  ['Güneş ne renktir?', ['🔵 Mavi', '🟢 Yeşil', '🟡 Sarı'], 2, 'Güneş sarı ve sıcaktır.'],
  ['Kaç tane çilek var? 🍓🍓🍓', ['2', '3', '4'], 1, 'Bir, iki, üç! Üç çilek.'],
  ['Hangisi en büyüktür?', ['🐭 Fare', '🐘 Fil', '🐜 Karınca'], 1, 'Fil en büyük kara hayvanlarından biridir.'],
  ['Yağmur yağınca ne kullanırız?', ['🕶️ Güneş gözlüğü', '🩴 Terlik', '☂️ Şemsiye'], 2, 'Şemsiye bizi yağmurdan korur.'],
  ['Hangisi suda yaşar?', ['🐠 Balık', '🐄 İnek', '🐔 Tavuk'], 0, 'Balıklar suda yüzer.'],
  ['Dişlerimizi neyle fırçalarız?', ['🥄 Kaşık', '🪥 Diş fırçası', '✏️ Kalem'], 1, 'Günde iki kez diş fırçalamayı unutma!'],
  ['Hangisi bir sebzedir?', ['🍭 Şeker', '🧸 Oyuncak', '🥕 Havuç'], 2, 'Havuç bir sebzedir, gözlerimize iyi gelir.'],
  ['Gece gökyüzünde ne görürüz?', ['🌙 Ay', '🌈 Gökkuşağı', '☀️ Güneş'], 0, 'Gece Ay ve yıldızlar parlar.'],
  ['Hangisi kırmızıdır?', ['🍌 Muz', '🍓 Çilek', '🥒 Salatalık'], 1, 'Çilek kırmızıdır.'],
  ['Kechy hangi hayvandır?', ['🐑 Koyun', '🐴 At', '🐐 Keçi'], 2, 'Kechy sevimli bir keçidir!'],
  ['Hangisi soğuktur?', ['🧊 Buz', '🔥 Ateş', '☕ Sıcak çay'], 0, 'Buz çok soğuktur.'],
  ['Arılar ne yapar?', ['🥛 Süt', '🍯 Bal', '🍞 Ekmek'], 1, 'Arılar çiçeklerden bal yapar.'],
  ['Hangisiyle resim yaparız?', ['🍴 Çatal', '👟 Ayakkabı', '🖍️ Boya kalemi'], 2, 'Boya kalemleriyle rengârenk resimler yaparız.'],
  ['Kaç tane yıldız var? ⭐⭐⭐⭐⭐', ['4', '5', '6'], 1, 'Beş yıldız! Parmaklarınla say.'],
  ['Hangisi bir taşıttır?', ['🚌 Otobüs', '🌳 Ağaç', '🐸 Kurbağa'], 0, 'Otobüs bizi bir yerden bir yere götürür.'],
  ['Kışın ne giyeriz?', ['🩳 Şort', '🧣 Atkı', '🩱 Mayo'], 1, 'Atkı ve bere bizi sıcak tutar.'],
  ['Uyurken nerede yatarız?', ['⚽ Top', '🚲 Bisiklet', '🛏️ Yatak'], 2, 'İyi uykular! Yatak dinlenmemizi sağlar.']
];
DATA.TASKS_MINIK = [['🔵', 'Evde mavi olan 3 şey bul.'], ['🧸', 'Oyuncaklarını topla ve kutusuna koy.'], ['👏', '5 kez alkış yap!'], ['🐾', 'Bir hayvan taklidi yap: miyav, hav hav!'], ['💧', 'Bir bardak su iç.'],
  ['🌸', 'Bir çiçeğe ya da yaprağa dokun ve kokla.'], ['🤗', 'Ailene kocaman sarıl.'], ['🎨', 'Bir güneş resmi çiz.', 'cizim'], ['🔢', 'Parmaklarınla 10\'a kadar say.'], ['🦘', 'Kanguru gibi 5 kez zıpla.'],
  ['🎵', 'Kechy\'nin bir şarkısını birlikte söyle.'], ['🍎', 'Bugün bir meyve ye.'], ['👟', 'Ayakkabılarını yerine koy.'], ['🪥', 'Dişlerini fırçala ve aynaya gülümse!'], ['📚', 'Bir büyüğünle bir kitaba bak.']];

function applyAge() { document.documentElement.dataset.age = S.age || 'buyuk'; renderNav(); const b = $('#agebtn'); if (b) { const a = AGES[S.age || 'buyuk']; b.innerHTML = `<span aria-hidden="true">${a.e}</span><span class="agelbl">${a.t}</span>`; b.title = 'Yaş grubu: ' + a.n; } }
function ageModal(first) {
  const m = Modal.open(`<div class="reward"><div style="width:130px">${Art.kechy('happy2', 'kechy-bob')}</div><span class="eyebrow">${first ? 'Kechy Dünyası\'na hoş geldin!' : 'Yaş grubu'}</span><h2>Kaç yaşındasın?</h2>
    <div class="agepick">${Object.entries(AGES).map(([k, a]) => `<button class="card agecard ${S.age === k ? 'on' : ''}" data-a="${k}"><span class="ae">${a.e}</span><b>${a.t}</b><span class="an">${a.n}</span><small>${a.d}</small></button>`).join('')}</div>
    <p class="small muted">Sonra üstteki rozetten ya da Ebeveyn Köşesi'nden değiştirebilirsin.</p></div>`, { sticky: first, noX: first });
  $$('.agecard', m).forEach(b => b.addEventListener('click', () => {
    S.age = b.dataset.a; save(); applyAge(); sfx('ok');
    if (isMinik() && Voice.ok && S.settings.voice) Voice.say('Merhaba minik kaşif! Hadi oynayalım!');
    Modal.close(true); render();
  }));
  if (first && Voice.ok) setTimeout(() => $('.agecard', m)?.focus(), 80);
}
/* read questions aloud for young children */
function autoSay(text) { if (isMinik() && S.settings.voice && Voice.ok) setTimeout(() => Voice.say(text), 350); }
