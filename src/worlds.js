/* ============ Sayı dünyaları: her şey bir Kechy sayısına bağlı; 0-7 ve 7-12 için ayrı tasarım ============ */
/* minik: { song, boya (coloring page id), game }   buyuk: { games, kesif: [route, emoji, title], uret: [route, emoji, title], gizli } */
DATA.WORLDS = {
  1: { theme: 'Çocukluk, salıncaklar ve dostluk', minik: { song: 'kechy', boya: 'ev', game: 'hafiza' }, buyuk: { games: ['ulke', 'hafiza'], kesif: [['harita', '🗺️', 'Dünya haritası ve damgalar'], ['tv-japonya', '📺', '1 Dakikada Dünya: Japonya']], uret: ['hikaye', '✍️', 'Bir yolculuk hikâyesi yaz'] } },
  2: { theme: 'Dinozorların izinde', minik: { song: 'ciftlik', boya: 'kechy', game: 'yapboz' }, buyuk: { games: ['quiz', 'fark'], kesif: [['bilgiler', '💡', 'Biliyor muydun?'], ['merak', '🧐', 'Merak Duvarı']], uret: ['cizim', '🎨', 'Kendi dinozorunu çiz'] } },
  3: { theme: 'Uzaya yolculuk', minik: { song: 'mars', boya: 'roket', game: 'uzay' }, buyuk: { games: ['uzay', 'labirent'], kesif: [['kesfet', '🔭', 'Günün uzay fotoğrafı'], ['hafta', '📰', 'Uzay yazıları']], uret: ['hikaye', '✍️', 'Uzay macerası yaz'] } },
  4: { theme: 'Küçük bilim insanları', minik: { song: 'uyan', boya: 'ev', game: 'hafiza' }, buyuk: { games: ['sudoku', 'yapboz'], kesif: [['lab', '🧪', 'Kechy Laboratuvarı'], ['tv-deney', '📺', '1 Dakikada Deney']], uret: ['cizim', '🎨', 'Deneyini çiz'] } },
  5: { theme: 'Okyanusun derinlikleri', minik: { song: 'kechy', boya: 'balik', game: 'fark' }, buyuk: { games: ['fark', 'hayvan'], kesif: [['hayvanlar', '🐙', 'İnanılmaz deniz hayvanları'], ['tv-ahtapot', '📺', 'Ahtapot bölümü']], uret: ['cizim', '🎨', 'Denizaltı şehri çiz'] } },
  6: { theme: 'Ormanın sesleri', minik: { song: 'ciftlik', boya: 'ev', game: 'hayvan' }, buyuk: { games: ['hayvan', 'kelime'], kesif: [['hayvanlar', '🦉', 'Orman hayvanları'], ['merak', '🧐', 'Merak Duvarı']], uret: ['hikaye', '✍️', 'Ormanda bir hikâye yaz'] } },
  7: { theme: 'Müzik zamanı', minik: { song: 'dost', boya: 'kechy', game: 'hafiza' }, buyuk: { games: ['bilmece', 'harf'], kesif: [['muzik', '🎵', 'Kechy Müzik Kanalı'], ['atolye', '🎹', 'Müzik Atölyesi']], uret: ['atolye', '🎼', 'Kendi şarkını yap'] } },
  8: { theme: 'Karlı kış günleri', minik: { song: 'uyan', boya: 'ev', game: 'labirent' }, buyuk: { games: ['hafiza', 'labirent'], kesif: [['hafta', '🌦️', 'Hava durumu dedektifleri'], ['lab-gokkusagi', '🌈', 'Bardakta gökkuşağı']], uret: ['cizim', '⛄', 'Kardan adamını çiz'] } },
  9: { theme: 'Hayal gücü ve anne sevgisi', minik: { song: 'mars', boya: 'kechy', game: 'boyama' }, buyuk: { games: ['boyama', 'fark'], kesif: [['galeri', '🖼️', 'Kechy Galeri'], ['tv-cizim', '📺', 'Beraber Çizelim']], uret: ['cizim', '🎨', 'Galeriye resim gönder'] } },
  10: { theme: 'Dostluk ve korkularla yüzleşmek', minik: { song: 'kechy', boya: 'ev', game: 'hayvan' }, buyuk: { games: ['kelime', 'hayvan'], kesif: [['lab-cicek', '🌼', 'Renk değiştiren çiçek'], ['tv-bal', '🐝', 'Arılar ve bal']], uret: ['cizim', '🌸', 'Bahar bahçeni çiz'] } },
  11: { theme: 'Yemeğin gücü ve yaz tatili', minik: { song: 'ciftlik', boya: 'balik', game: 'fark' }, buyuk: { games: ['fark', 'ulke'], kesif: [['hayvanlar', '🐢', 'Deniz kaplumbağası ve dostları'], ['harita', '🗺️', 'Yaz tatili haritası']], uret: ['hikaye', '✍️', 'Tatil hikâyeni yaz'] } },
  12: { theme: 'Zorba olma, kanka ol', minik: { song: 'dost', boya: 'kechy', game: 'hafiza' }, buyuk: { games: ['dedektif', 'bilmece'], kesif: [['kitap', '🛡️', 'Mini kitap: Arkadaşlık Kalkanı'], ['muzik-dost', '🎵', 'Arkadaşlık Şarkısı']], uret: ['hikaye', '✍️', 'Bir arkadaşlık hikâyesi yaz'], gizli: true } }
};
/* short picture stories for 0-7, one per issue (read aloud) */
DATA.MASAL = {
  1: [[['kechy', '🎒'], 'Kechy sırt çantasını hazırladı. Bugün dünyayı gezecek!'], [['🗺️', '✈️'], 'Uçağa bindi. Bulutların üstünden uçtu. Vıııın!'], [['🐼', '🎋'], 'Çin\'de bir pandayla tanıştı. Panda bambu yiyordu.'], [['kechy', '🏠'], 'Akşam evine döndü. Dünya ne kadar büyük ve güzel!']],
  2: [[['🥚'], 'Kechy bahçede kocaman bir yumurta buldu.'], [['🥚', '💥'], 'Çıt çıt! Yumurta kırılmaya başladı.'], [['🦕'], 'İçinden minik bir dinozor çıktı. Adı Dino!'], [['kechy', '🦕'], 'Kechy ve Dino en iyi arkadaş oldular.']],
  3: [[['kechy', '🚀'], 'Kechy bir roket yaptı. Üç, iki, bir... Uç!'], [['🌕'], 'Roket Ay\'a kondu. Ay çok sessizdi.'], [['⭐', '⭐', '⭐'], 'Yıldızlar göz kırptı: Merhaba Kechy!'], [['🌍', 'kechy'], 'Kechy Dünya\'ya el salladı ve eve döndü.']],
  4: [[['mino', '🧪'], 'Mino\'nun laboratuvarında renkli şişeler var.'], [['💧', '🎨'], 'Suya bir damla boya ekledi. Su masmavi oldu!'], [['🫧', '🫧'], 'Sonra köpük yaptı. Köpükler uçtu, uçtu.'], [['kechy', 'mino'], 'Kechy alkışladı: Bilim çok eğlenceli!']],
  5: [[['kechy', '🌊'], 'Kechy denize daldı. Blup blup!'], [['🐠', '🐠'], 'Renkli balıklar ona el salladı.'], [['🐙'], 'Ahtapot sekiz koluyla sarıldı. Ne kadar çok kol!'], [['🐳'], 'Dev balina şarkı söyledi: Uuuu!']],
  6: [[['momo', '🌳'], 'Momo ormanda yürüyüşe çıktı.'], [['🐿️', '🌰'], 'Sincap fındık topluyordu. Hop hop!'], [['luna'], 'Ağaçta Luna oturuyordu. Hu hu!'], [['🍄', '🌼', 'momo'], 'Orman sesleri çok güzeldi. Momo çok mutluydu.']],
  7: [[['piko', '🥁'], 'Piko bir davul buldu. Bum bum!'], [['robo', '🎹'], 'Robo piyano çaldı. Tiri riri!'], [['kechy', '🎺'], 'Kechy trompet üfledi. Düt düüt!'], [['piko', 'robo', 'kechy'], 'Hep birlikte bir orkestra oldular!']],
  8: [[['❄️', '❄️'], 'Kar yağıyordu. Her yer bembeyaz!'], [['kechy', '🧣'], 'Kechy atkısını taktı ve dışarı çıktı.'], [['⛄'], 'Bir kardan adam yaptı. Burnu havuçtan!'], [['☕'], 'Sonra eve girip sıcak süt içti. Mmm!']],
  9: [[['kechy', '🖍️'], 'Kechy boya kalemlerini çıkardı.'], [['🌞'], 'Önce sarı bir güneş çizdi.'], [['🌈'], 'Sonra rengârenk bir gökkuşağı!'], [['🖼️'], 'Resmini duvara astı. Ne güzel oldu!']],
  10: [[['🌱'], 'Toprakta minik bir tohum uyandı.'], [['🌧️'], 'Yağmur yağdı. Tohum su içti.'], [['☀️'], 'Güneş ısıttı. Tohum büyüdü, büyüdü.'], [['🌸', '🐝'], 'Kocaman bir çiçek açtı. Arı geldi: Vızzz!']],
  11: [[['kechy', '🏖️'], 'Yaz geldi! Kechy kumsala gitti.'], [['🧢', '🧴'], 'Şapkasını taktı, güneş kremini sürdü.'], [['🏰'], 'Kumdan kocaman bir kale yaptı.'], [['🐢'], 'Minik bir kaplumbağa denize yürüdü. Güle güle!']],
  12: [[['momo'], 'Momo bugün çok üzgündü. Kimse onunla oynamıyordu.', 'sleep'], [['kechy'], 'Kechy onu gördü: Gel, beraber oynayalım!'], [['kechy', 'momo'], 'Birlikte top oynadılar. Momo gülümsedi.', 'happy2'], [['kechy', 'momo', 'piko', 'luna'], 'Herkes oyuna katıldı. Kimse yalnız kalmadı!', 'happy2']]
};
const CHAR_IDS = ['kechy', 'mino', 'piko', 'luna', 'robo', 'momo'];
const world = (n) => DATA.WORLDS[n] || { theme: 'Yeni sayı', minik: { song: 'kechy', boya: 'kechy', game: 'hafiza' }, buyuk: { games: ['quiz', 'hafiza'], kesif: [['merak', '🧐', 'Merak Duvarı']], uret: ['cizim', '🎨', 'Resim çiz'] } };
const illHTML = (items, expr) => items.map(x => CHAR_IDS.includes(x) ? `<div class="illc">${Art.character(x, expr || 'happy')}</div>` : `<div class="ille">${x}</div>`).join('');
Object.assign(NAV_OF, { dunya: 'sayilar', sayilar: 'sayilar', sayi: 'sayilar', test: 'kechy', kitap: 'sayilar', dinle: 'sayilar', yeni: 'kechy', etkinlik: 'etkinlik', oyna: 'etkinlik', oyun: 'etkinlik', kesfet: 'etkinlik', uret: 'etkinlik',
  muzik: 'etkinlik', atolye: 'etkinlik', merak: 'etkinlik', hafta: 'etkinlik', harita: 'etkinlik', hayvanlar: 'etkinlik', bilgiler: 'etkinlik', lab: 'etkinlik', tv: 'etkinlik', hikaye: 'etkinlik', cizim: 'etkinlik', galeri: 'etkinlik', kasa: 'kechy', oku: 'sayilar',
  masallar: 'masallar', masal: 'masallar', oyunlar: 'oyunlar', cikartma: 'cikartma' });

/* ---------- navigation per age ---------- */
const NAVS = {
  buyuk: { top: [['kechy', '🏠', 'Bu Sayı'], ['sayilar', '📚', 'Sayılar'], ['etkinlik', '🎯', 'Etkinlikler'], ['koleksiyon', '🛂', 'Pasaportum'], ['ebeveyn', '👨‍👩‍👧', 'Ebeveyn']], tab: [['kechy', '🏠', 'Bu Sayı'], ['sayilar', '📚', 'Sayılar'], ['etkinlik', '🎯', 'Etkinlik'], ['koleksiyon', '🛂', 'Ben']] },
  minik: { top: [['kechy', '🏠', 'Ev'], ['masallar', '📖', 'Masallar'], ['oyunlar', '🎮', 'Oyunlar'], ['cikartma', '⭐', 'Çıkartmalar']], tab: [['kechy', '🏠', 'Ev'], ['masallar', '📖', 'Masal'], ['oyunlar', '🎮', 'Oyun'], ['cikartma', '⭐', 'Çıkartma']] }
};
function renderNav() {
  const n = NAVS[isMinik() ? 'minik' : 'buyuk'], nav = $('.nav'), tab = $('.tabbar');
  const key = (isMinik() ? 'm' : 'b');
  if (nav && nav.dataset.k !== key) { nav.dataset.k = key; nav.innerHTML = n.top.map(([h, e, t]) => `<a href="#${h}" data-nav="${h}"><span class="ic" aria-hidden="true">${e}</span><span class="lbl">${t}</span></a>`).join(''); }
  if (tab && tab.dataset.k !== key) { tab.dataset.k = key; tab.style.gridTemplateColumns = `repeat(${n.tab.length},1fr)`; tab.innerHTML = n.tab.map(([h, e, t]) => `<a href="#${h}" data-nav="${h}"><span class="ic" aria-hidden="true">${e}</span>${t}</a>`).join(''); }
  const sec = NAV_OF[currentRoute] || 'kechy';
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === sec) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
}

/* ---------- minik stickers: 4 per issue ---------- */
const STK = [['masal', '📖', 'Masal'], ['boya', '🎨', 'Boya'], ['oyun', '🎮', 'Oyun'], ['sarki', '🎵', 'Şarkı']];
function stk(n) { S.stk = S.stk || {}; return S.stk[n] || (S.stk[n] = {}); }
function markStk(n, k) {
  if (!n || !isMinik()) return; const s = stk(n); if (s[k]) return; s[k] = dateKey(); save();
  const is = DATA.ISSUES.find(i => i.n === n), got = STK.filter(x => s[x[0]]).length;
  sfx('stamp'); boom();
  Modal.later(() => { Modal.open(`<div class="reward"><div class="stkbig">${STK.find(x => x[0] === k)[1]}</div><span class="eyebrow">Kechy ${n}</span><h2>Çıkartma kazandın!</h2><div class="stkrow">${STK.map(x => `<span class="stk ${s[x[0]] ? 'on' : ''}">${s[x[0]] ? x[1] : '☆'}</span>`).join('')}</div><p>${got === 4 ? 'Bu sayının bütün çıkartmalarını topladın! 🎉' : `${4 - got} çıkartma daha var!`}</p><button class="btn lg" data-close>Yaşasın!</button></div>`); if (S.settings.voice && Voice.ok) Voice.say(got === 4 ? 'Harika! Bütün çıkartmaları topladın!' : 'Yaşasın! Çıkartma kazandın!'); });
  if (got === 4) { S.stickers.push({ e: is?.emoji || '⭐', t: `Kechy ${n} albümü`, from: 'Kechy ' + n }); reward(20, `Kechy ${n} çıkartmaları`, null); save(); }
}
const goCtx = (n, route) => { S.ctxIssue = n; save(); go(route); };

/* ---------- worlds (issue) tiles ---------- */
const worldTile = (is) => { const w = world(is.n), done = isMinik() ? STK.filter(x => stk(is.n)[x[0]]).length : missionsFor(is.n).filter(m => m.done).length, tot = isMinik() ? 4 : missionsFor(is.n).length;
  return `<a class="issue wtile" href="#dunya-${is.n}"><div class="cv">${Art.coverHTML(is)}</div><b>Kechy ${is.n}</b><span class="small muted">${esc(w.theme)}</span><span class="wprog"><i style="width:${done / tot * 100}%"></i></span></a>`; };
function missionsFor(n) {
  const w = world(n).buyuk, is = DATA.ISSUES.find(i => i.n === n) || { n }, v = S.visits || {};
  const ms = [
    { k: 'oku', e: '📖', t: `Kechy ${acc(n)} oku`, go: n === 12 && !DATA.PAGES[12] ? 'kitap' : 'sayi-' + n, done: !!S.issues[n] || (n === 12 && S.readSeen.kitap) },
    { k: 'soru', e: '🧠', t: '5 soruyu çöz', go: 'sayi-' + n, done: !!S.badges['sayi-' + n] },
    ...w.games.map(g => { const gm = DATA.GAMES.find(x => x.id === g); return { k: 'oyun-' + g, e: gm.e, t: gm.t, go: 'oyun-' + g, done: !!(S.games[g] && S.games[g].wins) }; }),
    ...w.kesif.map(([go2, e, t]) => ({ k: 'kesif-' + go2, e, t, go: go2, done: !!v[go2] })),
    { k: 'uret', e: w.uret[1], t: w.uret[2], go: w.uret[0], done: !!v[w.uret[0]] }
  ];
  if (w.gizli) ms.push({ k: 'gizli', e: '🔐', t: 'Sayıdaki gizli şifreyi bul', go: 'kasa', done: S.vault.length > 0 });
  return ms;
}

/* ---------- 0-7 HOME: Kechy'nin Oyun Odası ---------- */
function homeMinik(pg) {
  const is = latestIssue(), w = world(is.n), s = stk(is.n), nick = S.profile?.nick?.split(' ')[1] || 'minik kaşif';
  const btns = [['masal', '📖', 'Masal', 'masal-' + is.n, 'var(--tint-berry)'], ['boya', '🎨', 'Boya', 'oyun-boyama', 'var(--tint-sun)'], ['oyun', '🎮', 'Oyna', 'oyun-' + w.minik.game, 'var(--tint-leaf)'], ['sarki', '🎵', 'Şarkı', 'muzik-' + w.minik.song, 'var(--tint-sky)']];
  pg.innerHTML = `<section class="playroom">
      ${HERO_DECOR()}
      <div class="pr-in">
        <div class="pr-top"><div class="pr-kechy">${Art.kechy('happy2', 'kechy-bob')}</div>
          <div class="pr-bubble"><p>Merhaba ${esc(nick)}! Bugün <b>Kechy ${is.n}</b> ile oynayalım mı?</p>${sayBtn(`Merhaba ${nick}! Bugün Kechy ${is.n} ile oynayalım mı? Masal dinle, boya, oyna ya da şarkı söyle!`)}</div>
          <a class="pr-cover" href="#dunya-${is.n}" aria-label="Kechy ${is.n}"><span class="cvwrap">${Art.coverHTML(is)}<span class="shine"></span></span></a></div>
        <div class="bigbtns">${btns.map(([k, e, t, route, bg]) => `<button class="bigbtn ${s[k] ? 'got' : ''}" data-k="${k}" data-go2="${route}" style="background:${bg}" aria-label="${t}"><span class="be">${e}</span><b>${t}</b>${s[k] ? '<span class="bstar">⭐</span>' : ''}</button>`).join('')}</div>
        <div class="stkrow" aria-label="Kechy ${is.n} çıkartmaları">${STK.map(x => `<span class="stk ${s[x[0]] ? 'on' : ''}" title="${x[2]}">${s[x[0]] ? x[1] : '☆'}</span>`).join('')}</div>
      </div>
    </section>
    <section class="sec"><div class="sec-h"><h2>📚 Diğer sayılar</h2></div>
      <div class="scroller">${shelfIssues().filter(i => i.n !== is.n).map(i => `<div style="width:150px">${worldTile(i)}</div>`).join('')}</div></section>`;
  $$('.bigbtn', pg).forEach(b => b.addEventListener('click', () => { if (b.dataset.k === 'boya') window.__boyaPage = w.minik.boya; goCtx(is.n, b.dataset.go2); }));
  if (!S.age) setTimeout(() => { if (!S.age && currentRoute === 'kechy' && !Modal.isOpen()) ageModal(true); }, 400);
}

/* ---------- world page (both ages) ---------- */
P.dunya = (pg, param) => {
  const is = DATA.ISSUES.find(i => i.n === +param) || latestIssue(), w = world(is.n);
  setLast('dunya-' + is.n, `Kechy ${is.n} dünyası`, is.emoji);
  if (isMinik()) {
    const s = stk(is.n);
    const btns = [['masal', '📖', 'Masal', 'masal-' + is.n, 'var(--tint-berry)'], ['boya', '🎨', 'Boya', 'oyun-boyama', 'var(--tint-sun)'], ['oyun', '🎮', 'Oyna', 'oyun-' + w.minik.game, 'var(--tint-leaf)'], ['sarki', '🎵', 'Şarkı', 'muzik-' + w.minik.song, 'var(--tint-sky)']]
      .concat(DATA.PAGES[is.n] ? [['dergi', '📰', 'Dergi', 'sayi-' + is.n, 'var(--tint-lilac)']] : []);
    pg.innerHTML = `<a class="crumb" href="#masallar">← Masallar</a>
      <section class="card mworld" style="background:linear-gradient(160deg,${is.color}33,var(--card) 70%)"><div class="pr-cover static">${Art.coverHTML(is)}</div>
        <div class="stack" style="align-items:center;text-align:center"><h1>Kechy ${is.n}</h1><p class="lead">${esc(w.theme)}</p>${sayBtn(`Kechy ${is.n}. ${w.theme}. Masal dinle, boya, oyna ya da şarkı söyle!`)}</div>
        <div class="bigbtns">${btns.map(([k, e, t, route, bg]) => `<button class="bigbtn ${s[k] ? 'got' : ''}" data-k="${k}" data-go2="${route}" style="background:${bg}"><span class="be">${e}</span><b>${t}</b>${s[k] ? '<span class="bstar">⭐</span>' : ''}</button>`).join('')}</div>
        <div class="stkrow">${STK.map(x => `<span class="stk ${s[x[0]] ? 'on' : ''}">${s[x[0]] ? x[1] : '☆'}</span>`).join('')}</div></section>`;
    $$('.bigbtn', pg).forEach(b => b.addEventListener('click', () => { if (b.dataset.k === 'boya') window.__boyaPage = w.minik.boya; goCtx(is.n, b.dataset.go2); }));
    return;
  }
  const ms = missionsFor(is.n), done = ms.filter(m => m.done).length, b = DATA.BADGES.find(x => x.id === 'sayi-' + is.n);
  pg.innerHTML = `<a class="crumb" href="#sayilar">← Sayılar</a>
    <section class="card wworld" style="background:linear-gradient(135deg,${is.color}40,var(--card) 65%)">
      <div class="yol-cover live" style="max-width:220px"><span class="cvwrap">${Art.coverHTML(is)}<span class="shine"></span></span>${is.n === latestIssue().n ? '<span class="sticker">YENİ SAYI!</span>' : ''}</div>
      <div class="stack"><span class="eyebrow">${is.date || 'Kechy Kids'} · Sayı dünyası</span><h1>Kechy ${is.n}: ${esc(is.slogan || w.theme)}</h1>
        <p class="lead">Bu sayının ${ms.length} görevi var. Hepsini bitir, <b>${b ? esc(b.name) : 'sayı'}</b> rozetini ve dünyanın ustası unvanını kazan!</p>
        <div class="hero-prog"><span class="lbl">${done}/${ms.length} görev tamam</span><div class="prog"><i style="width:${done / ms.length * 100}%"></i></div></div>
        ${DATA.TEASERS[is.n] ? `<a class="tzstrip" href="#yeni-${is.n}"><span class="tzq"><i>❓</i><i>❓</i><i>❓</i><i>❓</i></span><span class="stack" style="gap:0"><b>${esc(DATA.TEASERS[is.n].hook)}</b><small>Sürprizleri aç →</small></span></a>` : ''}</div>
    </section>
    <section class="sec"><div class="sec-h"><h2>🎯 Görevler</h2><p>Sırayla gitmek zorunda değilsin, ama önce okumak en eğlencelisi!</p></div>
      <div class="missions">${ms.map((m, i) => `<a class="card mission ${m.done ? 'done' : ''}" href="#${m.go}" data-n="${is.n}"><span class="mnum">${m.done ? '✓' : i + 1}</span><span class="me">${m.e}</span><b>${esc(m.t)}</b>${m.done ? '<span class="pill leaf">Tamam</span>' : '<span class="go">Başla →</span>'}</a>`).join('')}</div></section>
    <section class="sec"><div class="sec-h"><h2>📚 Diğer sayı dünyaları</h2></div><div class="scroller">${shelfIssues().filter(i => i.n !== is.n).map(i => `<div style="width:150px">${worldTile(i)}</div>`).join('')}</div></section>`;
  $$('.mission', pg).forEach(a => a.addEventListener('click', () => { S.ctxIssue = is.n; save(); }));
};

/* ---------- shelves ---------- */
P.sayilar = (pg) => {
  const L = latestIssue();
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('luna')}</div><div><h1>📚 Kechy Sayıları</h1><p>Her sayı ayrı bir dünya: okuma, sorular, oyunlar, keşifler ve gizli görevler. Bir kapağa dokun ve içeri gir!</p></div></header>
    <a class="card banner" href="#dunya-${L.n}" style="background:var(--tint-sun)"><div class="cov">${Art.coverHTML(L)}</div><div class="stack" style="gap:6px"><span class="eyebrow">En yeni sayı</span><h2>Kechy ${L.n}: ${esc(L.slogan || world(L.n).theme)}</h2><p>${missionsFor(L.n).filter(m => m.done).length}/${missionsFor(L.n).length} görev tamam.</p></div><span class="btn lg">Dünyaya gir →</span></a>
    <div class="issues">${shelfIssues().map(worldTile).join('')}<div class="issue soon"><div class="cv">${Art.cover({ n: L.n + 1, title: 'Yakında', emoji: '🎁', color: '#8A9BAA', date: 'Hazırlanıyor' })}</div><b>Kechy ${L.n + 1}</b><span class="small muted">Hazırlanıyor…</span></div></div>`;
};
P.masallar = (pg) => {
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('luna', 'happy2')}</div><div><h1>📖 Masallar</h1><p>Her Kechy sayısının bir masalı var. Kapağa dokun, dinle!</p></div>${sayBtn('Masallar. Bir kapağa dokun ve masalı dinle!')}</header>
    <div class="mcovers">${shelfIssues().map(is => `<a class="mcover" href="#masal-${is.n}" aria-label="Kechy ${is.n} masalı"><div class="cv">${Art.coverHTML(is)}</div><b>Kechy ${is.n}</b>${stk(is.n).masal ? '<span class="bstar">⭐</span>' : ''}</a>`).join('')}</div>
    ${Object.keys(DATA.PAGES).length ? `<section class="sec"><div class="sec-h"><h2>📰 Dergiyi oku</h2><p>Kechy dergisinin gerçek sayfaları. Her sayfayı 🔊 ile dinleyebilirsin.</p></div>
      <div class="mcovers">${shelfIssues().filter(is => DATA.PAGES[is.n]).map(is => `<a class="mcover" href="#sayi-${is.n}" aria-label="Kechy ${is.n} dergisi"><div class="cv">${Art.coverHTML(is)}</div><b>Kechy ${is.n}</b></a>`).join('')}</div></section>` : ''}`;
};
P.masal = (pg, param) => {
  const is = DATA.ISSUES.find(i => i.n === +param) || latestIssue(), pages = DATA.MASAL[is.n] || DATA.MASAL[12];
  setLast('masal-' + is.n, `Kechy ${is.n} masalı`, '📖');
  let i = -1, auto = false, tm = null;
  pg.innerHTML = `<a class="crumb" href="#dunya-${is.n}">← Kechy ${is.n}</a>
    <section class="card masal" style="background:linear-gradient(180deg,${is.color}30,var(--paper) 55%)"><div class="mstage2"></div><p class="mtext"></p>
      <div class="mctl"><button class="rnav prev" aria-label="Geri">‹</button><button class="btn berry lg mplay2">▶ Masalı dinle</button><button class="rnav next" aria-label="İleri">›</button></div>
      <div class="mdots">${pages.map(() => '<i></i>').join('')}</div></section><div class="after"></div>`;
  const stage = $('.mstage2', pg), txt = $('.mtext', pg), dots = $$('.mdots i', pg);
  const show = () => {
    if (i < 0) { stage.innerHTML = `<div class="pr-cover static" style="max-width:190px">${Art.coverHTML(is)}</div>`; txt.textContent = `Kechy ${is.n} masalı`; preloadArt(`masal-${DATA.MASAL[is.n] ? is.n : 12}-1`); }
    else { const [ill, t, ex] = pages[i], src = DATA.MASAL[is.n] ? is.n : 12, spec = (DATA.MASAL_SCENES[src] || [])[i]; stage.innerHTML = spec ? `<div class="scwrap a-pop">${pageArt(`masal-${src}-${i + 1}`, spec)}</div>` : `<div class="ill a-pop">${illHTML(ill, ex)}</div>`; txt.textContent = t; preloadArt(`masal-${src}-${i + 2}`); }
    dots.forEach((d, k) => d.classList.toggle('on', k <= i));
    $('.prev', pg).disabled = i <= -1;
  };
  const finish = () => {
    clearTimeout(tm); auto = false; $('.mplay2', pg).textContent = '🔁 Tekrar dinle';
    markStk(is.n, 'masal'); readDone($('.masal', pg), `Kechy ${is.n} masalı`, 'masal' + is.n);
    nextUp($('.after', pg), '🎉 Masal bitti!', '', [['🎨 Boya', () => { window.__boyaPage = world(is.n).minik.boya; goCtx(is.n, 'oyun-boyama'); }, 'sun'], ['🎮 Oyna', () => goCtx(is.n, 'oyun-' + world(is.n).minik.game), 'leaf'], ['🏠 Ev', 'kechy', 'ghost']]);
  };
  const step = (dir) => {
    clearTimeout(tm); Voice.stop();
    i = Math.max(-1, Math.min(pages.length, i + dir));
    if (i >= pages.length) { i = pages.length - 1; show(); finish(); return; }
    show(); sfx('flip');
    if (auto && i >= 0) { const said = Voice.say(pages[i][1], { onend: () => { if (auto) tm = setTimeout(() => step(1), 900); } }); if (!said) tm = setTimeout(() => step(1), 3500); }
  };
  $('.next', pg).addEventListener('click', () => { auto = false; $('.mplay2', pg).textContent = '▶ Masalı dinle'; step(1); });
  $('.prev', pg).addEventListener('click', () => { auto = false; step(-1); });
  $('.mplay2', pg).addEventListener('click', (e) => { if (auto) { auto = false; Voice.stop(); clearTimeout(tm); e.currentTarget.textContent = '▶ Masalı dinle'; return; } auto = true; e.currentTarget.textContent = '⏸ Dur'; $('.after', pg).innerHTML = ''; if (i >= pages.length - 1) i = -1; step(1); });
  onLeave(() => { auto = false; clearTimeout(tm); });
  show();
};
P.oyunlar = (pg) => {
  const L = latestIssue(), games = DATA.GAMES.filter(g => g.minik);
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('robo', 'happy2')}</div><div><h1>🎮 Oyunlar</h1><p>Bir oyuna dokun!</p></div>${sayBtn('Oyunlar. Bir oyuna dokun!')}</header>
    <div class="mgames">${games.map(g => `<button class="bigbtn ${g.bg}" data-g="${g.id}"><span class="be">${g.e}</span><b>${g.t.replace('Kechy ile ', '').replace('Kechy ', '')}</b></button>`).join('')}</div>
    <a class="card banner" href="#muzik" style="background:var(--tint-sky)"><div style="font-size:3.4rem">🎵</div><div><h2>Şarkılar</h2><p>Kechy ile şarkı söyle!</p></div><span class="btn sky lg">Dinle →</span></a>`;
  $$('[data-g]', pg).forEach(b => b.addEventListener('click', () => { if (b.dataset.g === 'boyama') window.__boyaPage = world(L.n).minik.boya; goCtx(L.n, 'oyun-' + b.dataset.g); }));
};
P.cikartma = (pg) => {
  const all = shelfIssues(), total = all.reduce((a, is) => a + STK.filter(x => stk(is.n)[x[0]]).length, 0);
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.avatar(curAvatar())}</div><div><h1>⭐ Çıkartma Albümüm</h1><p>Her sayıdan 4 çıkartma: masal, boya, oyun, şarkı. Toplam <b>${total}</b> çıkartman var!</p></div>${sayBtn(`Çıkartma albümün. Toplam ${total} çıkartman var!`)}</header>
    <div class="album">${all.map(is => { const s = stk(is.n); return `<a class="card apage" href="#dunya-${is.n}"><div class="cv">${Art.coverHTML(is)}</div><div class="stack" style="gap:6px"><b>Kechy ${is.n}</b><div class="stkrow">${STK.map(x => `<span class="stk ${s[x[0]] ? 'on' : ''}">${s[x[0]] ? x[1] : '☆'}</span>`).join('')}</div></div></a>`; }).join('')}</div>
    ${S.stickers.length ? `<section class="sec"><div class="sec-h"><h2>Özel çıkartmalar</h2></div><div class="grid gauto">${S.stickers.map(s => `<div class="card pad center stack" style="box-shadow:none"><span style="font-size:3rem">${s.e}</span><b style="font-family:var(--font-d)">${esc(s.t)}</b></div>`).join('')}</div></section>` : ''}
    <p class="small muted center"><a href="#ebeveyn">🔒 Ebeveyn köşesi</a></p>`;
};

/* ---------- 7-12 activities hub ---------- */
P.etkinlik = (pg) => {
  const L = latestIssue();
  const groups = [
    ['🎮 Oyunlar', DATA.GAMES.map(g => [`oyun-${g.id}`, g.e, g.t, g.bg.replace('bg-', '')])],
    ['🌍 Keşfet', [['harita', '🗺️', 'Dünya haritası', 'sky'], ['hayvanlar', '🐘', 'İnanılmaz hayvanlar', 'horn'], ['lab', '🧪', 'Laboratuvar', 'lilac'], ['tv', '📺', 'Kechy TV', 'ocean'], ['bilgiler', '💡', 'Biliyor muydun?', 'sun'], ['merak', '🧐', 'Merak Duvarı', 'berry'], ['hafta', '📰', 'Haftanın konusu', 'leaf'], ['kesfet', '🔭', 'Uzay fotoğrafı', 'lilac']]],
    ['🎨 Üret ve dinle', [['hikaye', '✍️', 'Hikâye Makinesi', 'berry'], ['cizim', '🎨', 'Çizim Stüdyosu', 'sky'], ['galeri', '🖼️', 'Kechy Galeri', 'lilac'], ['muzik', '🎵', 'Müzik Kanalı', 'berry'], ['atolye', '🎹', 'Müzik Atölyesi', 'horn'], ['kasa', '🔐', 'Gizli Kasa', 'sun'], ['surpriz', '🎁', 'Pazar Sürprizi', 'berry'], ['karakterler', '👥', 'Kechy Evreni', 'leaf']]]
  ];
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('robo')}</div><div><h1>🎯 Etkinlikler</h1><p>Bütün oyunlar ve etkinlikler burada. Her biri bir Kechy sayısının dünyasına da bağlı.</p></div></header>
    <a class="card banner" href="#dunya-${L.n}" style="background:var(--tint-sun)"><div class="cov">${Art.coverHTML(L)}</div><div class="stack" style="gap:4px"><span class="eyebrow">Önce bu sayı</span><h2>Kechy ${L.n} görevleri</h2><p>${missionsFor(L.n).filter(m => m.done).length}/${missionsFor(L.n).length} görev tamam</p></div><span class="btn lg">Görevlere git →</span></a>
    ${groups.map(([t, items]) => `<section class="sec"><div class="sec-h"><h2>${t}</h2></div><div class="acts">${items.map(([h, e, tt, col]) => `<a class="card act bg-${col}" href="#${h}"><span class="ae">${e}</span><b>${esc(tt)}</b></a>`).join('')}</div></section>`).join('')}`;
};

/* ---------- home dispatcher ---------- */
const _homeBuyuk = P.kechy;
P.kechy = (pg, param, raw) => isMinik() ? homeMinik(pg) : _homeBuyuk(pg, param, raw);
