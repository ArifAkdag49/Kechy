/* ============ Merak Duvarı, Haftanın Konusu, yeni sayı tanıtımı, otomatik içerik ============ */
Object.assign(NAV_OF, { merak: 'kesfet', hafta: 'oku', yeni: 'kechy' });
DATA.BADGES.splice(DATA.BADGES.findIndex(b => b.issue), 0,
  { id: 'merak', name: 'Merak Ustası', emoji: '🧐', color: '#F2752B', how: 'Bir günde Merak Duvarı\'ndaki 12 kutunun hepsine bak.' },
  { id: 'hafta', name: 'Haftanın Okuru', emoji: '📰', color: '#3C7DD9', how: 'Haftanın Konusu\'ndaki 3 kısa yazının hepsini oku.' });

/* ---------- teaser boxes for the newest issue (editable in the editor panel) ---------- */
DATA.TEASERS = {
  12: { hook: 'Kechy 12\'nin içinde 4 sürpriz saklı!', guess: ['Sence bir arkadaşımıza kötü davranıldığını görünce ne yapmalıyız?', ['Susmalıyız', 'Yanında durup bir büyüğe anlatmalıyız', 'Görmezden gelmeliyiz']],
    items: [['🛡️', 'Bir arkadaş zor durumda', 'Momo bugün çok sessiz. Neden? Kim ona yardım edecek?'], ['🔐', 'Gizli bir şifre', 'Bu sayının sayfalarına bir şifre saklandı. Bulan, Gizli Kasa\'yı açar!'],
      ['🎵', 'Yeni bir şarkı', 'Kechy Müzik Kanalı\'nda yeni şarkı: Arkadaşlık Şarkısı. Nakaratını tahmin et!'], ['🏅', 'Yeni bir rozet', 'Okuduktan sonra 5 soruyu çöz, Arkadaşlık rozetini koleksiyonuna ekle.']] }
};

/* ---------- weekly theme: short reads between monthly issues ---------- */
DATA.WEEKLY = [
  { id: 'okyanus', t: 'Okyanusların Sırları', e: '🌊', bg: 'var(--tint-ocean)', posts: [
    { e: '🐙', t: 'Üç kalpli dahi', text: 'Ahtapotun üç kalbi var: ikisi solungaçlara, biri bütün vücuda kan pompalar. Kanı ise mavidir, çünkü içinde bakır bulunur. Ahtapotlar çok akıllıdır: kavanoz kapağı açabilir, labirentten çıkabilir, hatta taklit yaparak saklanabilirler. Rengini saniyeler içinde değiştirip kayaların arasında kaybolur.', q: ['Ahtapotun kaç kalbi vardır?', ['1', '2', '3'], 2, 'İkisi solungaçlara, biri vücuda kan pompalar.'] },
    { e: '🐋', t: 'Denizin en büyük sesi', text: 'Mavi balina dünyada yaşamış en büyük hayvandır. Dinozorlardan bile büyüktür! Kalbi küçük bir araba kadar, dili bir fil kadar ağır olabilir. Ama minicik karides benzeri kril ile beslenir. Balinalar birbirleriyle çok uzaklara ulaşan şarkılarla konuşur.', q: ['Mavi balina neyle beslenir?', ['Köpekbalığıyla', 'Kril ile', 'Yosunla'], 1, 'Günde tonlarca minik kril yer.'] },
    { e: '🪸', t: 'Mercanlar taş değil', text: 'Mercanlar taşa benzer ama aslında minik hayvanların oluşturduğu kolonilerdir. Binlerce yılda büyüyüp dev resifler kurarlar. Resifler, balıklar için hem ev hem de oyun parkıdır. Deniz ısınınca mercanlar renklerini kaybedebilir; bu yüzden denizleri korumak çok önemli.', q: ['Mercanlar nedir?', ['Taş', 'Minik hayvan kolonileri', 'Bitki'], 1, 'Mercan resifleri denizin en kalabalık mahalleleridir.'] }] },
  { id: 'uzay', t: 'Uzayda Bir Hafta', e: '🚀', bg: 'var(--tint-lilac)', posts: [
    { e: '🌕', t: 'Ay neden şekil değiştirir?', text: 'Ay aslında hiç şekil değiştirmez. Güneş hep Ay\'ın bir yarısını aydınlatır. Ay, Dünya\'nın etrafında dönerken biz aydınlık kısmın bazen hepsini, bazen yarısını, bazen de sadece ince bir hilalini görürüz. Buna Ay\'ın evreleri denir ve bir tur yaklaşık 29,5 gün sürer.', q: ['Ay\'ın bir turu yaklaşık kaç gün sürer?', ['7 gün', '29,5 gün', '365 gün'], 1, 'Bir dolunaydan diğerine yaklaşık bir ay geçer.'] },
    { e: '👩‍🚀', t: 'Astronotlar nasıl uyur?', text: 'Uzay istasyonunda yerçekimi hissedilmediği için astronotlar yatakta değil, duvara bağlı uyku tulumlarında uyur. Yoksa uyurken süzülüp bir yerlere çarpabilirler! Her gün 16 kez gün doğumu gördükleri için göz bandı takarlar.', q: ['Astronotlar neden uyku tulumunu duvara bağlar?', ['Süzülmemek için', 'Üşümemek için', 'Moda olduğu için'], 0, 'Yerçekimi hissedilmeyince her şey süzülür.'] },
    { e: '☄️', t: 'Kayan yıldız aslında ne?', text: 'Kayan yıldız bir yıldız değildir! Uzaydan gelen küçük taş ve toz parçaları, havaya çok hızlı girince sürtünmeyle ısınır ve parlak bir çizgi bırakır. Ağustos ayında gökyüzüne bakarsan saatte onlarca kayan yıldız görebilirsin.', q: ['Kayan yıldız aslında nedir?', ['Düşen bir yıldız', 'Havada yanan küçük uzay taşı', 'Bir uçak'], 1, 'Buna meteor denir.'] }] },
  { id: 'bocek', t: 'Minik Mühendisler: Böcekler', e: '🐜', bg: 'var(--tint-leaf)', posts: [
    { e: '🐜', t: 'Karınca şehirleri', text: 'Karıncalar toprağın altında tüneller, odalar ve depolar olan dev şehirler kurar. Her karıncanın bir görevi vardır: kimi yiyecek taşır, kimi yavrulara bakar, kimi yuvayı korur. Kendi ağırlıklarının onlarca katını taşıyabilirler!', q: ['Karınca yuvasında herkesin neyi vardır?', ['Kendi odası', 'Bir görevi', 'Kanatları'], 1, 'Karıncalar iş bölümü yaparak birlikte yaşar.'] },
    { e: '🐝', t: 'Arıların dansı', text: 'Bir bal arısı güzel çiçekler bulunca kovana dönüp dans eder. Dansın yönü çiçeklerin yönünü, süresi ise uzaklığını anlatır. Diğer arılar bu dansı izleyip çiçekleri bulur. Kelimeler olmadan yol tarif etmek harika değil mi?', q: ['Arılar çiçeklerin yerini nasıl anlatır?', ['Şarkı söyleyerek', 'Dans ederek', 'Harita çizerek'], 1, 'Buna sallanma dansı denir.'] },
    { e: '🐞', t: 'Uğur böceğinin benekleri', text: 'Uğur böceğinin parlak renkleri kuşlara "Beni yeme, tadım kötü!" der. Uğur böcekleri bahçelerin kahramanıdır, çünkü bitkilere zarar veren yaprak bitlerini yer. Bir uğur böceği hayatı boyunca binlerce yaprak biti yiyebilir.', q: ['Uğur böcekleri neden bahçelerin kahramanıdır?', ['Bitkilere zarar veren böcekleri yer', 'Çiçek eker', 'Su taşır'], 0, 'Çiftçiler uğur böceklerini çok sever.'] }] },
  { id: 'hava', t: 'Hava Durumu Dedektifleri', e: '🌦️', bg: 'var(--tint-sky)', posts: [
    { e: '🌈', t: 'Gökkuşağının tarifi', text: 'Gökkuşağı için iki şey gerekir: güneş ve yağmur damlaları. Güneş ışığı damlaların içine girip kırılır ve yedi renge ayrılır. Gökkuşağını görmek için güneş arkanda, yağmur önünde olmalı. Bahçe hortumuyla sen de gökkuşağı yapabilirsin!', q: ['Gökkuşağını görmek için güneş nerede olmalı?', ['Önümüzde', 'Arkamızda', 'Tepemizde'], 1, 'Güneş arkada, yağmur damlaları önde olmalı.'] },
    { e: '⚡', t: 'Şimşek ve gök gürültüsü', text: 'Şimşek, bulutlardaki elektriğin bir anda boşalmasıdır. Işık çok hızlı gittiği için şimşeği hemen görürüz, ses ise daha yavaş gelir. Şimşekten sonra saymaya başla: her 3 saniye, fırtınanın yaklaşık 1 kilometre uzakta olduğunu gösterir.', q: ['Şimşeği neden gök gürültüsünden önce görürüz?', ['Işık sesten hızlıdır', 'Ses daha hızlıdır', 'Bulutlar sesi saklar'], 0, 'Işık saniyede 300.000 km gider!'] },
    { e: '❄️', t: 'Her kar tanesi farklı', text: 'Kar taneleri buluttaki su damlacıklarının donmasıyla oluşur ve neredeyse hep altı kolludur. Düşerken sıcaklık ve nem değiştiği için her biri farklı bir desen kazanır. Bir dahaki karda eldivenine düşen kar tanesine büyüteçle bak!', q: ['Kar taneleri genelde kaç kolludur?', ['4', '6', '8'], 1, 'Su molekülleri donarken altıgen bir düzen kurar.'] }] }
];
const weekTheme = () => DATA.WEEKLY[weekIndex() % DATA.WEEKLY.length];

/* ---------- Merak Duvarı: 12 daily curiosity boxes (finite) ---------- */
function merakItems() {
  const r = Art.rng(dayIndex() * 31 + 7), pick = (a, n) => shuffle(a, r).slice(0, n);
  const items = [
    ...pick(DATA.FACTS, 2).map(f => ({ e: f[0], t: 'Biliyor muydun?', sub: f[1], kind: 'fact', data: f })),
    ...pick(DATA.ANIMALS, 2).map(a => ({ e: a.e, t: a.name, sub: 'Süper gücü: ' + a.power, kind: 'animal', data: a })),
    ...pick(DATA.COUNTRIES, 2).map(c => ({ e: c.flag, flag: true, t: c.name, sub: '“' + c.hello + '!” de', go: 'harita-' + c.code })),
    ...pick(DATA.SONGS, 1).map(s => ({ e: s.e, t: s.t, sub: 'Kechy Müzik', go: 'muzik-' + s.id })),
    ...pick(DATA.TV, 1).map(x => ({ e: x.cat, t: x.title, sub: 'Kechy TV', go: 'tv-' + x.id })),
    ...pick(DATA.EXPERIMENTS, 1).map(x => ({ e: x.e, t: x.title, sub: 'Deney', go: 'lab-' + x.id })),
    ...pick(DATA.RIDDLES, 1).map(x => ({ e: '❓', t: 'Bilmece', sub: x[0], kind: 'riddle', data: x })),
    ...pick(DATA.AUDIO_STORIES, 1).map(x => ({ e: x.e, t: x.title, sub: 'Hikâye', go: 'dinle-' + x.id })),
    ...pick(DATA.GAMES, 1).map(x => ({ e: x.e, t: x.t, sub: 'Oyun', go: 'oyun-' + x.id }))
  ];
  return shuffle(items, r);
}
function merakSeen() { const k = dateKey(); if (!S.merak || S.merak.d !== k) S.merak = { d: k, seen: [] }; return S.merak.seen; }
function openMerak(i, items, after) {
  const it = items[i], seen = merakSeen();
  const first = !seen.includes(i);
  if (first) { seen.push(i); act('merak', it.t, 0); save(); }
  if (first && seen.length === items.length) { reward(10, 'Merak Duvarı tamam', null); award('merak'); boom(true); }
  if (it.go) { go(it.go); return; }
  if (it.kind === 'fact') Modal.open(`<div class="reward"><div style="font-size:4rem">${it.e}</div><span class="eyebrow">Biliyor muydun?</span><p class="qtext">${esc(it.data[1])}</p><div class="row" style="justify-content:center">${sayBtn(it.data[1])}<button class="btn" data-close>Vay be! 🤯</button></div></div>`, { onClose: after });
  else if (it.kind === 'animal') { const a = it.data; Modal.open(`<div class="reward"><div style="font-size:4.4rem" class="a-pop">${a.e}</div><h2>${a.name}</h2><p><b>Yaşadığı yer:</b> ${a.home} · <b>Besini:</b> ${a.food}</p><p><b>Süper gücü:</b> ${a.power}</p><p>💡 ${a.fact}</p><div class="row" style="justify-content:center">${sayBtn(a.name + '. ' + a.power + '. ' + a.fact)}<a class="btn ghost" href="#hayvanlar" data-close>Tüm hayvanlar →</a></div></div>`, { onClose: after }); }
  else if (it.kind === 'riddle') {
    const m = Modal.open(`<div class="reward"><div style="font-size:3.6rem">❓</div><span class="eyebrow">Piko'nun bilmecesi</span><p class="qtext">“${esc(it.data[0])}”</p><button class="btn sun reveal">Cevabı göster</button><p class="ans" hidden><b style="font-size:1.4rem;font-family:var(--font-d)">${esc(it.data[1])}</b> 🎉</p></div>`, { onClose: after });
    $('.reveal', m).addEventListener('click', (e) => { e.currentTarget.remove(); $('.ans', m).hidden = false; sfx('ok'); });
  }
}
const merakTile = (it, i, seen) => `<button class="card mtile ${seen ? 'seen' : ''}" data-m="${i}"><span class="me ${it.flag ? 'flag' : ''}">${it.e}</span><b>${esc(it.t)}</b><small>${esc(it.sub.length > 60 ? it.sub.slice(0, 58) + '…' : it.sub)}</small>${seen ? '<span class="pill leaf mck">Baktın ✓</span>' : ''}</button>`;
P.merak = (pg) => {
  const items = merakItems(), seen = merakSeen();
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.character('kechy', 'wow')}</div><div><h1>🧐 Merak Duvarı</h1><p>Bugün için 12 merak kutusu. Ona da bak, buna da bak! Yarın hepsi yenilenir.</p></div></header>
    <div class="hero-prog" style="max-width:520px"><span class="lbl">${seen.length}/12 kutuya baktın${seen.length === 12 ? ' 🎉' : ''}</span><div class="prog berry"><i style="width:${seen.length / 12 * 100}%"></i></div></div>
    <div class="mwall">${items.map((it, i) => merakTile(it, i, seen.includes(i))).join('')}</div>
    ${seen.length === 12 ? '<div class="card nextup"><h3>🎉 Bugünün bütün meraklarına baktın!</h3><p>Yarın 12 yeni kutu gelecek. Şimdi biraz mola vermeye ne dersin?</p></div>' : ''}`;
  $$('.mtile', pg).forEach(b => b.addEventListener('click', () => openMerak(+b.dataset.m, items, () => render())));
};

/* ---------- Haftanın Konusu ---------- */
P.hafta = (pg) => {
  const w = weekTheme(), nx = DATA.WEEKLY[(weekIndex() + 1) % DATA.WEEKLY.length];
  S.weekly = S.weekly || {}; const key = weekIndex() + ':' + w.id, done = S.weekly[key] || (S.weekly[key] = []);
  pg.innerHTML = `<a class="crumb" href="#oku">← Oku</a>
    <header class="pagehead"><div class="art" style="font-size:4.6rem;display:grid;place-items:center">${w.e}</div><div><span class="eyebrow">Haftanın konusu · ${fmtDate(new Date(), { day: 'numeric', month: 'long' })} haftası</span><h1>${w.t}</h1><p>Bu hafta 3 kısa yazı var. Her biri 1 dakikada okunur, sonunda küçük bir soru seni bekler.</p></div></header>
    <div class="wposts">${w.posts.map((p, i) => `<article class="card wpost" style="background:${w.bg}"><div class="row" style="flex-wrap:nowrap"><span style="font-size:2.6rem">${p.e}</span><h2>${esc(p.t)}</h2>${sayBtn(p.t + '. ' + p.text)}</div><p class="wtext">${esc(p.text)}</p><div class="wq" data-i="${i}"></div></article>`).join('')}</div>
    <section class="card pad row" style="background:var(--card-2)"><span style="font-size:2.4rem">${nx.e}</span><div class="stack" style="gap:2px;flex:1"><span class="eyebrow">Gelecek hafta</span><b style="font-family:var(--font-d);font-size:1.2rem">${nx.t}</b></div><span class="pill">Pazartesi açılıyor</span></section>`;
  $$('.wq', pg).forEach(box => {
    const i = +box.dataset.i, q = w.posts[i].q;
    if (done.includes(i)) { box.innerHTML = `<div class="explain"><span>✅</span><div><b>Okudun ve cevapladın!</b><p>${esc(q[3])}</p></div></div>`; return; }
    box.innerHTML = `<p class="qtext" style="font-size:1.15rem">${esc(q[0])}</p><div class="qopts three">${q[1].map((o, k) => `<button class="qopt" data-k="${k}">${esc(o)}</button>`).join('')}</div><div class="qres"></div>`;
    $$('.qopt', box).forEach(b => b.addEventListener('click', () => {
      const k = +b.dataset.k, ok = k === q[2]; sfx(ok ? 'ok' : 'no');
      $$('.qopt', box).forEach((x, j) => { x.disabled = true; if (j === q[2]) x.classList.add('right'); else if (j === k) x.classList.add('wrong'); });
      $('.qres', box).innerHTML = `<div class="explain ${ok ? '' : 'no'}"><span>${ok ? '🎉' : '💡'}</span><div><b>${ok ? 'Doğru!' : 'Cevap: ' + esc(q[1][q[2]])}</b><p>${esc(q[3])}</p></div></div>`;
      done.push(i); S.count.okuma++; act('okuma', 'Haftanın konusu: ' + w.posts[i].t, 5); reward(ok ? 8 : 5, 'Kısa yazı', b); save();
      if (done.length === w.posts.length) { award('hafta'); boom(true); }
    }));
  });
};

/* ---------- Yeni sayı tanıtımı: sürprizleri aç, sonra oku ---------- */
function latestIssue() { return DATA.ISSUES.reduce((a, b) => (b.n > a.n ? b : a), DATA.ISSUES[0]); }
P.yeni = (pg, param) => {
  const is = DATA.ISSUES.find(x => x.n === +param) || latestIssue(), tz = DATA.TEASERS[is.n];
  S.teaser = S.teaser || {}; const opened = S.teaser[is.n] || (S.teaser[is.n] = []);
  const rt = readTarget(), readGo = DATA.PAGES[is.n] ? 'sayi-' + is.n : (is.n === 12 ? rt.go : 'sayi-' + is.n);
  pg.innerHTML = `<a class="crumb" href="#kechy">← Kechy Yolu</a>
    <section class="teaser card">
      <div class="tz-cover"><div class="tz-glow"></div><div class="yol-cover" style="transform:rotate(-3deg)"><span class="cvwrap">${Art.coverHTML(is)}</span><span class="sticker">YENİ!</span></div></div>
      <div class="stack">
        <span class="eyebrow">Kechy ${is.n} · ${is.date || ''}</span>
        <h1>${tz ? esc(tz.hook) : `Kechy ${is.n} geldi!`}</h1>
        <p>${tz ? 'Kutulara dokun, sürprizleri tek tek aç. Hepsini açınca okuma başlıyor!' : 'Bu sayının sürprizleri editörler tarafından hazırlanıyor.'}</p>
        ${tz ? `<div class="tzgrid">${tz.items.map((x, i) => `<button class="tzbox ${opened.includes(i) ? 'open' : ''}" data-i="${i}" aria-label="Sürpriz ${i + 1}"><span class="tz-in"><span class="tz-f">❓<small>Sürpriz ${i + 1}</small></span><span class="tz-b"><span class="tz-e">${x[0]}</span><b>${esc(x[1])}</b><small>${esc(x[2])}</small></span></span></button>`).join('')}</div>` : ''}
        ${tz && tz.guess ? `<div class="card pad stack guess" style="box-shadow:none;background:var(--tint-sun)"><b style="font-family:var(--font-d)">🤔 Tahmin et: ${esc(tz.guess[0])}</b><div class="chips">${tz.guess[1].map((g, k) => `<button class="chip" data-g="${k}" aria-pressed="${S.teaser['g' + is.n] === k}">${esc(g)}</button>`).join('')}</div><p class="small muted gmsg">${S.teaser['g' + is.n] != null ? 'Tahminin kaydedildi. Okuyunca kontrol et!' : 'Doğru cevabı sayının içinde bulacaksın.'}</p></div>` : ''}
        <div class="row"><a class="btn berry lg tzgo ${tz && opened.length < tz.items.length ? 'wait' : ''}" href="#${readGo}">📖 Okumaya başla</a><span class="small muted tzleft">${tz && opened.length < tz.items.length ? `${tz.items.length - opened.length} sürpriz daha var!` : 'Hazırsın!'}</span></div>
      </div>
    </section>`;
  $$('.tzbox', pg).forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i; if (b.classList.contains('open')) return;
    b.classList.add('open'); sfx('open'); if (!opened.includes(i)) { opened.push(i); save(); }
    const left = tz.items.length - opened.length;
    $('.tzleft', pg).textContent = left ? `${left} sürpriz daha var!` : 'Hepsini açtın, hazırsın! 🎉';
    if (!left) { $('.tzgo', pg).classList.remove('wait'); boom(); }
  }));
  $$('[data-g]', pg).forEach(b => b.addEventListener('click', () => { S.teaser['g' + is.n] = +b.dataset.g; save(); $$('[data-g]', pg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); $('.gmsg', pg).textContent = 'Tahminin kaydedildi. Okuyunca kontrol et!'; sfx('pop'); }));
};

/* ---------- otomatik içerik: Substack'teki yeni sayılar, haberler, NASA ---------- */
DATA.NEWS = [];
function applyFeed(posts) {
  if (!Array.isArray(posts)) return false;
  let added = false;
  DATA.NEWS = posts.slice(0, 6);
  posts.forEach(p => {
    const n = p.n; if (!n) return;
    let is = DATA.ISSUES.find(i => i.n === n);
    if (!is) {
      is = { n, title: 'Yeni sayı', emoji: '🎁', color: '#1B8F9C', date: p.date ? new Date(p.date).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }) : '', slogan: p.sub || '', auto: true };
      DATA.ISSUES.push(is); added = true;
      DATA.BADGES.push({ id: 'sayi-' + n, name: 'Kechy ' + n, emoji: '🎁', color: '#1B8F9C', c2: '#FFC83A', how: 'Kechy ' + gen(n) + ' sorularını cevapla.', issue: n });
    }
    if (p.cover && is.auto && !is.img) is.img = p.cover;
    if (p.sub && !is.slogan && is.auto) is.slogan = p.sub;
  });
  DATA.ISSUES.sort((a, b) => a.n - b.n);
  return added;
}
async function syncFeed() {
  if (S.feed) applyFeed(S.feed.posts);
  try {
    const r = await fetch('api/kechy', { cache: 'no-cache' }); if (!r.ok) return;
    const j = await r.json(); if (!j.posts) return;
    const before = latestIssue().n; S.feed = { t: Date.now(), posts: j.posts }; save();
    applyFeed(j.posts);
    if (latestIssue().n !== before && (currentRoute === 'kechy' || currentRoute === 'oku')) render();
  } catch (e) { }
}
let apod = null;
async function loadApod() {
  if (apod) return apod;
  try { const r = await fetch('api/uzay'); if (!r.ok) return null; apod = await r.json(); return apod; } catch (e) { return null; }
}

const _baseSearch = searchIndex;
searchIndex = function () {
  return _baseSearch().concat([['muzik', '🎵', 'Kechy Müzik Kanalı'], ['atolye', '🎹', 'Müzik Atölyesi'], ['merak', '🧐', 'Merak Duvarı'], ['hafta', '📰', 'Haftanın Konusu: ' + weekTheme().t]].map(([g, e, t]) => ({ g, e, t, s: 'Sayfa' })),
    DATA.SONGS.map(s => ({ g: 'muzik-' + s.id, e: s.e, t: s.t, s: 'Şarkı' })),
    // every page of the real issues: its title and the start of its text
    Object.entries(DATA.PAGES).flatMap(([n, man]) => (man.idx || []).map(([p, t, snip]) => ({ g: `sayi-${n}-${p}`, e: '📖', t, s: `Kechy ${n} · sayfa ${p}${snip && snip !== t ? ' · ' + snip : ''}` }))));
};
