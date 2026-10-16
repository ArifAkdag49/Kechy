/* ============ PAGES 2: create, passport, universe, vault, parents ============ */
const trAscii = (s) => s.replace(/[ÇçĞğİıÖöŞşÜü]/g, c => ({ Ç: 'C', ç: 'c', Ğ: 'G', ğ: 'g', İ: 'I', ı: 'i', Ö: 'O', ö: 'o', Ş: 'S', ş: 's', Ü: 'U', ü: 'u' }[c]));
const THEME_OF_MONTH = 'Hayalimdeki şehir';

/* ---------- ÜRET ---------- */
P.uret = (pg) => {
  const mine = S.drawings.length + S.stories.length;
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('piko', 'happy2')}</div><div><h1>Üret</h1><p>Sadece izleme, yarat! Hikâye yaz, resim çiz, boya ve eserini Kechy Galeri'de sergile.</p></div></header>
    <a class="card banner" href="#cizim" style="background:var(--tint-sun)"><div style="font-size:3.6rem">🏙️</div><div><span class="eyebrow">Bu ayın konusu</span><h2>${THEME_OF_MONTH}</h2><p>Hayalindeki şehri çiz. Editörlerin seçtiği çizimler galeride ve dergide yer alabilir.</p></div><span class="btn lg">🎨 Çizmeye başla</span></a>
    <div class="grid gauto">
      <a class="card fcard berry" href="#hikaye"><span class="corner">✍️</span><span class="big">✍️</span><h3>Hikâye Makinesi</h3><p>Kahramanını, yerini ve hazineyi seç. Hikâyen hazır!</p></a>
      <a class="card fcard sky" href="#cizim"><span class="corner">🎨</span><span class="big">🎨</span><h3>Çizim Stüdyosu</h3><p>Fırçalar, renkler ve çıkartmalar.</p></a>
      <a class="card fcard leaf" href="#oyun-boyama"><span class="corner">🖍️</span><span class="big">🖍️</span><h3>Boyama Kitabı</h3><p>Dokun ve boya. Taşma derdi yok!</p></a>
      <a class="card fcard horn" href="#atolye"><span class="corner">🎹</span><span class="big">🎹</span><h3>Müzik Atölyesi</h3><p>Ksilofon ve ritim makinesiyle kendi şarkını yap.</p></a>
      <a class="card fcard lilac" href="#galeri"><span class="corner">🖼️</span><span class="big">🖼️</span><h3>Kechy Galeri</h3><p>Çocukların eserleri, editör onaylı.</p></a>
    </div>
    <section class="sec"><div class="sec-h"><h2>Eserlerim</h2><a class="more" href="#koleksiyon-eserler">Hepsi →</a></div>
      ${mine ? `<div class="gallery">${S.drawings.slice(0, 3).map(d => drawingFrame(d)).join('')}${S.stories.slice(0, 3).map(s => `<div class="card frame storyout" style="--r:0deg"><span class="ill">${s.ill}</span><b style="font-family:var(--font-d);font-size:1.2rem">${esc(s.title)}</b><span class="small muted">${s.date.split('-').reverse().join('.')}</span></div>`).join('')}</div>`
      : `<div class="empty"><span style="font-size:2.4rem">🖌️</span><p>Henüz bir eserin yok. İlk hikâyeni yaz ya da ilk resmini çiz!</p></div>`}</section>`;
};
const STATUS = { kayit: ['Kaydedildi', ''], onay: ['Ebeveyn onayı bekliyor', 'wait'], editor: ['Editörde', 'ok'], geri: ['Gönderilmedi', 'no'] };
const drawingFrame = (d, i = 0) => `<figure class="card frame" style="--r:${[-2, 1.5, -1, 2][i % 4]}deg;margin:0;position:relative"><span class="tape"></span><img src="${d.img}" alt="Çizimim: ${esc(d.title)}"><figcaption class="cap"><span>${esc(d.title)}</span><span class="status ${STATUS[d.status][1]}">${STATUS[d.status][0]}</span></figcaption></figure>`;

P.hikaye = (pg) => {
  setLast('hikaye', 'Hikâye Makinesi', '✍️');
  const D = DATA.STORY, sel = { heroes: 0, places: 0, items: 0, friends: 0, lessons: 0 };
  let variant = 0, current = null;
  const groups = [['heroes', 'Kahramanını seç'], ['places', 'Nereye gitsin?'], ['items', 'Ne bulsun?'], ['friends', 'Yol arkadaşı kim?'], ['lessons', 'Hikâyenin mesajı ne olsun?']];
  pg.innerHTML = `<a class="crumb" href="#uret">← Üret</a>
    <header class="pagehead"><div class="art">${Art.character('luna', 'happy2')}</div><div><h1>✍️ Kechy Hikâye Makinesi</h1><p>Seçimlerini yap, sihirli düğmeye bas. Her seferinde biraz farklı bir hikâye çıkar!</p></div></header>
    <section class="twocol"><div class="card pad stack">${groups.map(([k, t], gi) => `<div class="stack" style="gap:8px"><h2 style="font-size:1.25rem">${gi + 1}. ${t}</h2><div class="pick" data-g="${k}">${D[k].map((o, i) => `<button aria-pressed="${i === 0}" data-i="${i}"><span class="e">${o.e}</span>${esc(cap(o.n))}</button>`).join('')}</div></div>`).join('')}
      <button class="btn berry lg gen">✨ Hikâyemi yaz</button><p class="small muted">Hikâyeler hazır cümle kalıplarıyla, senin seçimlerinle oluşturulur. Kişisel bilgi istenmez.</p></div>
      <div class="stack"><div class="out"><div class="empty"><span style="font-size:2.6rem">📜</span><p>Seçimlerini yap ve “Hikâyemi yaz” düğmesine bas.</p></div></div>
      <div class="card pad stack"><h2 style="font-size:1.2rem">Hikâyelerim</h2><div class="mystories stack" style="gap:6px"></div></div></div></section>`;
  const listMine = () => { $('.mystories', pg).innerHTML = S.stories.length ? S.stories.map((s, i) => `<button class="card ep" data-s="${i}" style="box-shadow:none"><span class="e bg-sun" style="font-size:1.3rem">${s.ill.slice(0, 2)}</span><span><b>${esc(s.title)}</b><span class="small muted">${s.date.split('-').reverse().join('.')}</span></span></button>`).join('') : '<p class="small muted">Kaydettiğin hikâyeler burada durur.</p>';
    $$('[data-s]', pg).forEach(b => b.addEventListener('click', () => { const s = S.stories[+b.dataset.s]; Modal.open(`<span class="eyebrow">Hikâyem</span><h2>${esc(s.title)}</h2><p style="font-size:2rem">${s.ill}</p><div class="row" style="margin-bottom:8px">${sayBtn(s.text)}</div><p style="font-size:1.1rem;line-height:1.7">${esc(s.text)}</p>`); })); };
  listMine();
  $$('.pick', pg).forEach(g => g.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; sel[g.dataset.g] = +b.dataset.i; $$('button', g).forEach(x => x.setAttribute('aria-pressed', String(x === b))); }));
  const make = () => {
    const H = D.heroes[sel.heroes], PL = D.places[sel.places], I = D.items[sel.items], F = D.friends[sel.friends], L = D.lessons[sel.lessons];
    const r = Art.rng(sel.heroes * 7 + sel.places * 13 + sel.items * 17 + sel.friends * 19 + sel.lessons * 23 + variant * 31);
    const pk = (a) => a[Math.floor(r() * a.length)];
    const title = pk([`${H.n} ve ${cap(I.n)}`, `${cap(PL.loc)} Büyük Macera`, `${H.n} ve Kayıp Hazine`, `${cap(I.n)} Nerede?`]);
    const problem = pk([`Ama ${I.acc} almak için kocaman bir kayanın üstüne tırmanmaları gerekiyordu.`, `Ama birden rüzgâr çıktı ve ${I.acc} uzaklara savurdu!`, `Ama ${I.acc} alacakları sırada yol ikiye ayrıldı ve hangisinin doğru olduğunu bilmiyorlardı.`]);
    const solve = { 'Yardımlaşma': `${cap(F.n)} bir fikir buldu, ${H.n} da gücünü ekledi. Birlikte çalışınca sorunu çözdüler.`, 'Cesaret': `${H.n} biraz korktu. Sonra derin bir nefes aldı ve ilk adımı attı. Adım adım ilerledi ve başardı!`, 'Paylaşmak': `Sonunda ${I.acc} buldular. ${H.n} onu ${F.n} ile paylaşmaya karar verdi ve ikisi de çok mutlu oldu.`, 'Merak': `${H.n} etrafı dikkatle inceledi, sorular sordu ve sonunda gizli ipucunu buldu. Sorun çözülmüştü!` }[L.n];
    const opening = pk([`Bir varmış bir yokmuş, ${H.n} adında meraklı bir kahraman varmış.`, `Güneşli bir sabah ${H.n} pencereden dışarı baktı ve heyecanla zıpladı.`, `${H.n} o gün kendini çok maceracı hissediyordu.`]);
    const text = [opening, `Bir kuş, ${H.gen} kapısına bir not bıraktı: “${cap(PL.dat)} gel, seni bir sürpriz bekliyor!”`, `${H.n} hemen yola çıktı. ${cap(PL.loc)} her şey çok farklıydı: ${PL.desc}.`,
      `Orada ${F.n} ile tanıştı. İkisi birlikte bir ${I.n} buldular.`, problem, solve, `Eve dönerken ${H.n} gülümsedi. ${L.end}`];
    current = { title, text: text.join(' '), ill: H.e + PL.e + I.e + F.e, paras: text };
    $('.out', pg).innerHTML = `<article class="card storyout"><span class="eyebrow">Senin hikâyen</span><h3>${esc(title)}</h3><span class="ill">${current.ill}</span>${text.map(p => `<p>${esc(p)}</p>`).join('')}
      <div class="row">${sayBtn(current.text, 'Hikâyeyi dinle')}<button class="btn leaf savest">💾 Kaydet (+15 ⭐)</button><button class="btn ghost again">🔁 Başka türlü yaz</button></div></article>`;
    $('.again', pg).addEventListener('click', () => { variant++; make(); sfx('pop'); });
    $('.savest', pg).addEventListener('click', (e) => {
      S.stories.unshift({ title: current.title, text: current.text, ill: current.ill, date: dateKey() }); if (S.stories.length > 12) S.stories.length = 12;
      S.count.hikaye++; act('hikaye', current.title, 15); reward(15, 'Hikâye yazdın', e.currentTarget); checkBadges(); listMine();
      e.currentTarget.disabled = true; e.currentTarget.textContent = 'Kaydedildi ✓'; boom();
    });
    if (window.innerWidth < 860) $('.out', pg).scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
  };
  $('.gen', pg).addEventListener('click', () => { variant = 0; make(); sfx('open'); });
};

P.cizim = (pg) => {
  setLast('cizim', 'Çizim Stüdyosu', '🎨');
  const COLS = ['#1D2E42', '#FFFFFF', '#E6508A', '#F2752B', '#FFC83A', '#43AE5B', '#1FA2B0', '#3C7DD9', '#9A7FE0', '#8A5A3B', '#F7A9C8', '#A7DDA9'];
  const STK = ['🐐', '⭐', '🌈', '🌸', '🚀', '🐟', '☀️', '🏠', '🌳', '❤️', '🎈', '🦋'];
  pg.innerHTML = `<a class="crumb" href="#uret">← Üret</a>
    <header class="pagehead"><div><h1>🎨 Çizim Stüdyosu</h1><p>Bu ayın konusu: <b>${THEME_OF_MONTH}</b>. Serbest de çizebilirsin!</p></div></header>
    <div class="studio"><div class="toolcol card pad">
      <div class="chips"><button class="chip tool" data-t="pen" aria-pressed="true">✏️ Kalem</button><button class="chip tool" data-t="eraser" aria-pressed="false">🧽 Silgi</button><button class="chip tool" data-t="sticker" aria-pressed="false">⭐ Çıkartma</button></div>
      <div class="palette">${COLS.map((c, i) => `<button class="sw" style="background:${c}" data-c="${c}" aria-label="Renk" aria-pressed="${i === 0}"></button>`).join('')}</div>
      <div class="sizes">${[5, 12, 26].map((s, i) => `<button data-s="${s}" aria-label="Fırça ${i + 1}" aria-pressed="${i === 1}"><i style="width:${6 + i * 7}px;height:${6 + i * 7}px"></i></button>`).join('')}</div>
      <div class="stickers">${STK.map((s, i) => `<button data-k="${s}" aria-pressed="${i === 0}">${s}</button>`).join('')}</div>
      <div class="row"><button class="btn sm ghost undo">↩️ Geri al</button><button class="btn sm ghost clear">🗑️ Temizle</button></div>
    </div><div class="stack"><canvas width="900" height="600" aria-label="Çizim alanı"></canvas>
      <div class="row"><button class="btn leaf savebtn">💾 Kaydet (+15 ⭐)</button><button class="btn berry sendbtn">🖼️ Galeriye gönder</button></div>
      <p class="small muted">Galeriye gönderilen çizimler önce ebeveyn, sonra editör onayından geçer. Galeride sadece ilk adın ve yaşın görünür.</p></div></div>`;
  const cv = $('canvas', pg), ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  let tool = 'pen', color = COLS[0], size = 12, sticker = STK[0], drawing = false, last = null, dirty = false, savedId = null;
  const undo = [];
  const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height }; };
  const snap = () => { try { undo.push(ctx.getImageData(0, 0, cv.width, cv.height)); if (undo.length > 6) undo.shift(); } catch (e) { } };
  cv.addEventListener('pointerdown', (e) => {
    e.preventDefault(); cv.setPointerCapture(e.pointerId); snap(); dirty = true; savedId = null;
    const p = pos(e);
    if (tool === 'sticker') { ctx.font = `${size * 5 + 30}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sticker, p.x, p.y); sfx('pop'); return; }
    drawing = true; last = p; ctx.beginPath(); ctx.arc(p.x, p.y, (tool === 'eraser' ? size * 2 : size) / 2, 0, Math.PI * 2); ctx.fillStyle = tool === 'eraser' ? '#fff' : color; ctx.fill();
  });
  cv.addEventListener('pointermove', (e) => {
    if (!drawing) return; const p = pos(e);
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : color; ctx.lineWidth = tool === 'eraser' ? size * 2 : size;
    ctx.beginPath(); ctx.moveTo(last.x, last.y); const mx = (last.x + p.x) / 2, my = (last.y + p.y) / 2; ctx.quadraticCurveTo(last.x, last.y, mx, my); ctx.lineTo(p.x, p.y); ctx.stroke(); last = p;
  });
  const up = () => { drawing = false; last = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  const press = (sel, attr, fn) => $$(sel, pg).forEach(b => b.addEventListener('click', () => { $$(sel, pg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); fn(b.dataset[attr]); }));
  press('.tool', 't', (v) => tool = v); press('.sw', 'c', (v) => { color = v; if (tool === 'eraser' || tool === 'sticker') { tool = 'pen'; $$('.tool', pg).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.t === 'pen'))); } });
  press('.sizes button', 's', (v) => size = +v); press('.stickers button', 'k', (v) => { sticker = v; tool = 'sticker'; $$('.tool', pg).forEach(x => x.setAttribute('aria-pressed', String(x.dataset.t === 'sticker'))); });
  $('.undo', pg).addEventListener('click', () => { const d = undo.pop(); if (d) ctx.putImageData(d, 0, 0); });
  $('.clear', pg).addEventListener('click', () => { snap(); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); });
  const doSave = (src) => {
    if (!dirty && savedId) return S.drawings.find(d => d.id === savedId);
    const t = document.createElement('canvas'); t.width = 360; t.height = 240; t.getContext('2d').drawImage(cv, 0, 0, 360, 240);
    const d = { id: Date.now(), img: t.toDataURL('image/jpeg', .72), date: dateKey(), status: 'kayit', title: THEME_OF_MONTH };
    S.drawings.unshift(d); if (S.drawings.length > 6) { S.drawings.length = 6; toast('En eski çizimin yer açmak için kaldırıldı'); }
    S.count.cizim++; act('cizim', 'Çizim: ' + d.title, 15); reward(15, 'Çizimin kaydedildi', src); checkBadges();
    dirty = false; savedId = d.id; save(); return d;
  };
  $('.savebtn', pg).addEventListener('click', (e) => { if (!dirty) return toast('Önce bir şeyler çiz!'); doSave(e.currentTarget); boom(); });
  $('.sendbtn', pg).addEventListener('click', (e) => {
    if (!dirty && !savedId) return toast('Önce bir şeyler çiz!');
    const d = doSave(e.currentTarget); if (!d) return; d.status = 'onay'; save();
    Modal.open(`<div class="reward"><div style="font-size:4rem">📨</div><h2>Ebeveyn onayına gönderildi</h2><p class="muted">Ailen Ebeveyn Köşesi'nden onaylayınca çizimin editörlere gider. Seçilirse Kechy Galeri'de ve belki dergide yer alır!</p><div class="row" style="justify-content:center"><a class="btn" href="#galeri" data-close>🖼️ Galeriye bak</a><button class="btn ghost" data-close>Çizmeye devam</button></div></div>`);
  });
};

P.galeri = (pg) => {
  const top = DATA.GALLERY.slice(0, 3), mine = S.drawings.filter(d => d.status !== 'kayit');
  pg.innerHTML = `<a class="crumb" href="#uret">← Üret</a>
    <header class="pagehead"><div class="art">${Art.character('luna', 'happy2')}</div><div><span class="eyebrow">Bu ayın konusu</span><h1>🖼️ Kechy Galeri: ${THEME_OF_MONTH}</h1><p>Çocukların eserleri, editör onayından sonra burada sergilenir.</p></div></header>
    <section class="sec"><div class="sec-h"><h2>🏅 Haftanın çizimleri</h2><p class="small">Aşağıdaki eserler tasarım örnekleridir; gerçek sitede editörlerin seçtiği çizimler görünür.</p></div>
      <div class="gallery">${top.map((g, i) => `<figure class="card frame" style="--r:${[-2, 1.5, -1][i]}deg;margin:0;position:relative"><span class="tape"></span>${Art.kidArt(g.seed, g.kind)}<figcaption class="cap"><span>🏅 ${g.n}, ${g.age} yaş</span><span class="small muted">${g.t}</span></figcaption></figure>`).join('')}</div></section>
    <section class="sec"><div class="sec-h"><h2>Diğer eserler</h2></div>
      <div class="gallery">${DATA.GALLERY.slice(3).map((g, i) => `<figure class="card frame" style="--r:${[1, -1.5, 2][i]}deg;margin:0;position:relative">${Art.kidArt(g.seed, g.kind)}<figcaption class="cap"><span>${g.n}, ${g.age} yaş</span><span class="small muted">${g.t}</span></figcaption></figure>`).join('')}</div></section>
    ${mine.length ? `<section class="sec"><div class="sec-h"><h2>Gönderdiğin çizimler</h2></div><div class="gallery">${mine.map(drawingFrame).join('')}</div></section>` : ''}
    <section class="card pad row" style="background:var(--tint-sky)"><span style="font-size:2.4rem">🛡️</span><div class="stack" style="flex:1;gap:4px"><b style="font-family:var(--font-d);font-size:1.2rem">Galeri kuralları</b><p>Galeride yorum ve mesajlaşma yok. Sadece ilk isim ve yaş görünür. Her çizim önce ebeveyn, sonra editör onayından geçer.</p></div><a class="btn" href="#cizim">🎨 Sen de çiz</a></section>`;
};

/* ---------- PASAPORT / KOLEKSİYON ---------- */
function stats() {
  return [['📖', 'Okuduğum sayılar', `${DATA.ISSUES.filter(i => S.issues[i.n]).length}/${DATA.ISSUES.length}`], ['❓', 'Çözdüğüm bilmeceler', fmtNum(S.count.bilmece)], ['🎯', 'Tamamladığım görevler', fmtNum(S.count.gorev)],
    ['🏅', 'Topladığım rozetler', `${Object.keys(S.badges).length}/${DATA.BADGES.length}`], ['🌍', 'Keşfettiğim ülkeler', fmtNum(Object.keys(S.stamps).length)], ['⭐', 'Kechy puanım', fmtNum(S.stars)]];
}
function weekActs(offset = 0) { let n = 0; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i - offset * 7); n += S.days[dateKey(d)]?.n || 0; } return n; }
P.koleksiyon = (pg, param) => {
  const lv = levelOf(S.stars), av = curAvatar(), prof = S.profile, nick = prof?.nick || 'Misafir Kaşif';
  const team = DATA.CHARACTERS.find(x => x.id === (prof?.team || S.team));
  const ppNo = 'KCH-' + new Date(S.created).getFullYear() + '-' + String(Math.floor(S.created / 1000) % 9973).padStart(4, '0');
  const issued = prof?.created ? prof.created.split('-').reverse().join('.') : shortDate(new Date(S.created));
  const mrz1 = ('P<KECHY<<' + trAscii(nick).toUpperCase().replace(/[^A-Z0-9]+/g, '<') + '<'.repeat(40)).slice(0, 40);
  const mrz2 = (ppNo.replace(/-/g, '') + '<' + trAscii(lv.name).toUpperCase().replace(/[^A-Z]+/g, '<') + '<<' + String(S.stars).padStart(6, '0') + '<'.repeat(40)).slice(0, 40);
  const tabs = [['rozetler', '🏅 Rozetler'], ['damgalar', '🛂 Damgalar'], ['dergiler', '📖 Dergilerim'], ['gunluk', '📅 Günlüğüm'], ['eserler', '🎨 Eserlerim'], ['cikartma', '✨ Çıkartmalar']];
  const tab = tabs.find(t => t[0] === param) ? param : 'rozetler';
  pg.innerHTML = `
    ${prof ? '' : `<div class="card pad row" style="background:var(--tint-berry)"><span style="font-size:2.4rem">🛂</span><div style="flex:1"><b style="font-family:var(--font-d);font-size:1.2rem">Henüz pasaportun yok</b><p>Takma adını ve avatarını seç, pasaportun hazır olsun. Gerçek adın gerekmez.</p></div><a class="btn berry" href="#pasaport">Pasaportumu oluştur</a></div>`}
    <header class="pagehead"><div><h1>🛂 Kechy Pasaportu</h1><p>Okuduğun sayılar, kazandığın rozetler, gezdiğin ülkeler. Kazandıkların hep burada kalır; ara verdiğinde hiçbir şey kaybolmaz.</p></div></header>
    <section class="passport" aria-label="Pasaport">
      <div class="pp-page"><div class="pp-top"><span>KECHY PASAPORTU</span><span>${ppNo}</span></div>
        <div class="pp-id"><div class="photo">${Art.avatar(av)}</div><div class="stack" style="gap:8px">
          <div class="pp-field"><small>Takma ad</small><b>${esc(nick)}</b></div>
          <div class="pp-field"><small>Seviye</small><b>${lv.e} ${lv.name}</b></div>
          <div class="pp-field"><small>Yaş grubu</small><b>${AGES[S.age || 'buyuk'].e} ${AGES[S.age || 'buyuk'].n}</b></div>
          <div class="pp-field"><small>Takım</small><b>${team ? team.name + ' · ' + team.team : 'Seçilmedi'}</b></div>
          <div class="pp-field"><small>Veriliş</small><b class="tnum">${issued}</b></div></div></div>
        <div class="stack" style="gap:6px"><div class="row" style="justify-content:space-between"><span class="small" style="font-family:var(--font-d);font-weight:700">${lv.next ? `${lv.next.name} seviyesine ${fmtNum(lv.next.min - S.stars)} ⭐ kaldı` : 'En yüksek seviyedesin!'}</span><span class="pill tnum">${fmtNum(S.stars)} ⭐</span></div><div class="prog"><i style="width:${lv.pct}%"></i></div>
          <div class="leveltrack">${DATA.LEVELS.map((l, i) => `<div class="${i <= lv.i ? 'on' : ''}"><span class="e">${l.e}</span>${l.name}</div>`).join('')}</div></div>
        <div class="mrz" aria-hidden="true">${esc(mrz1)}<br>${esc(mrz2)}</div>
        <div class="row"><a class="btn sm ghost" href="#avatar">🎭 Avatarımı değiştir</a><a class="btn sm ghost" href="#karakterler">👥 Takımımı seç</a></div>
      </div>
      <div class="pp-page"><div class="pp-top"><span>İSTATİSTİKLERİM</span><span>${shortDate()}</span></div>
        <div class="statlist">${stats().map(([e, t, v]) => `<div class="statrow"><span class="e">${e}</span><span>${t}</span><b>${v}</b></div>`).join('')}</div>
        <div class="card pad" style="box-shadow:none;background:var(--tint-leaf)"><b style="font-family:var(--font-d)">Kendinle yarış</b><p class="small">${selfCompare()}</p></div>
      </div>
    </section>
    <section class="sec"><div class="tabs" role="tablist">${tabs.map(([k, t]) => `<button class="tab" role="tab" aria-selected="${k === tab}" data-t="${k}">${t}</button>`).join('')}</div><div class="card pad tabbody" style="border-top-left-radius:0"></div></section>`;
  const body = $('.tabbody', pg);
  const draw = (t) => { body.innerHTML = TABS[t](); bindTab(t, body); };
  $$('.tab', pg).forEach(b => b.addEventListener('click', () => { $$('.tab', pg).forEach(x => x.setAttribute('aria-selected', String(x === b))); draw(b.dataset.t); }));
  draw(tab);
};
function selfCompare() {
  const a = weekActs(0), b = weekActs(1);
  if (!a && !b) return 'Bu hafta ilk etkinliğini yap, burada kendi gelişimini göreceksin. Burada kimseyle yarışmıyorsun!';
  if (a > b) return `Geçen hafta ${b} etkinlik yaptın. Bu hafta ${a} oldu! 🎉`;
  if (a === b) return `Bu hafta da geçen hafta kadar, ${a} etkinlik yaptın. İstikrarlısın!`;
  return `Bu hafta ${a} etkinlik yaptın. Kendi hızında devam et; geçen haftaki ${b} etkinliğe yaklaşıyorsun.`;
}
const TABS = {
  rozetler: () => {
    const gen = DATA.BADGES.filter(b => !b.issue), iss = DATA.BADGES.filter(b => b.issue);
    const shelf = (arr) => `<div class="shelf">${arr.map(b => `<button class="bdg ${S.badges[b.id] ? '' : 'locked'}" data-b="${b.id}">${Art.badge(b)}<b>${esc(b.name)}</b></button>`).join('')}</div>`;
    return `<div class="stack" style="gap:22px"><div><h3 style="margin-bottom:6px">Kechy rozetleri</h3>${shelf(gen)}</div><div><h3 style="margin-bottom:6px">Dergi koleksiyonu · Kechy 1 → 12</h3>${shelf(iss)}</div></div>`;
  },
  damgalar: () => {
    const codes = Object.keys(S.stamps);
    if (!codes.length) return `<div class="empty"><span style="font-size:2.4rem">🛂</span><p>Pasaportunda henüz damga yok. Haritada bir ülke keşfet!</p><a class="btn sky" href="#harita">🗺️ Haritayı aç</a></div>`;
    return `<div class="stamps">${codes.map((c, i) => Art.stamp(DATA.COUNTRIES.find(x => x.code === c), S.stamps[c], i)).join('')}</div><p class="small muted">${codes.length}/${DATA.COUNTRIES.length} ülke. <a href="#harita">Haritaya git →</a></p>`;
  },
  dergiler: () => `<div class="issues">${DATA.ISSUES.map(issueTile).join('')}</div>`,
  gunluk: () => {
    const now = new Date(), y = now.getFullYear(), m = now.getMonth(), first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7, stk = ['⭐', '🌈', '🐐', '🎈', '🌸', '🚀', '🍀'];
    let cells = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => `<div class="h">${d}</div>`).join('') + '<div class="e"></div>'.repeat(lead);
    let visited = 0;
    for (let d = 1; d <= days; d++) { const k = y + '-' + pad2(m + 1) + '-' + pad2(d), v = S.days[k]?.n > 0; if (v) visited++; cells += `<div class="${v ? 'v' : ''} ${d === now.getDate() ? 't' : ''}" ${v ? `data-s="${stk[d % stk.length]}"` : ''}>${d}</div>`; }
    const bars = []; let mx = 1;
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const n = S.days[dateKey(d)]?.n || 0; mx = Math.max(mx, n); bars.push([d, n, i === 0]); }
    return `<div class="twocol"><div class="stack"><h3>${fmtDate(now, { month: 'long', year: 'numeric' })}</h3><div class="cal">${cells}</div><p class="small muted">Bu ay ${visited} gün Kechy'deydin. Gelmediğin günler için hiçbir şey kaybetmezsin.</p></div>
      <div class="stack"><h3>Son 7 gün · etkinlik</h3><div class="bars">${bars.map(([d, n, t]) => `<div class="b ${t ? 'today' : ''}"><small class="tnum">${n}</small><i style="height:${Math.round(n / mx * 100)}%"></i></div>`).join('')}</div>
      <div class="bars-x">${bars.map(([d]) => `<span>${d.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>`).join('')}</div><p>${selfCompare()}</p></div></div>`;
  },
  eserler: () => {
    if (!S.drawings.length && !S.stories.length) return `<div class="empty"><span style="font-size:2.4rem">🖌️</span><p>Henüz bir eserin yok.</p><div class="row" style="justify-content:center"><a class="btn berry" href="#hikaye">✍️ Hikâye yaz</a><a class="btn sky" href="#cizim">🎨 Resim çiz</a></div></div>`;
    return `${S.drawings.length ? `<h3>Çizimlerim</h3><div class="gallery" style="margin:10px 0 20px">${S.drawings.map(drawingFrame).join('')}</div>` : ''}
      ${S.stories.length ? `<h3>Hikâyelerim</h3><div class="stack" style="gap:8px;margin-top:10px">${S.stories.map((s, i) => `<details class="card pad" style="box-shadow:none"><summary style="cursor:pointer;font-family:var(--font-d);font-weight:800;font-size:1.1rem">${s.ill.slice(0, 2)} ${esc(s.title)} <span class="small muted">· ${s.date.split('-').reverse().join('.')}</span></summary><p style="margin-top:8px;line-height:1.7">${esc(s.text)}</p>${sayBtn(s.text)}</details>`).join('')}</div>` : ''}`;
  },
  cikartma: () => {
    if (!S.stickers.length) return `<div class="empty"><span style="font-size:2.4rem">✨</span><p>Çıkartmalar Pazar Sürprizi'nden ve Gizli Kasa'dan gelir.</p><div class="row" style="justify-content:center"><a class="btn berry" href="#surpriz">🎁 Pazar Sürprizi</a><a class="btn" href="#kasa">🔐 Gizli Kasa</a></div></div>`;
    return `<div class="grid gauto">${S.stickers.map((s, i) => `<div class="card pad center stack" style="box-shadow:none;transform:rotate(${[-3, 2, -1, 3][i % 4]}deg)"><span style="font-size:3.4rem;filter:drop-shadow(0 3px 0 var(--line))">${s.e}</span><b style="font-family:var(--font-d)">${esc(s.t)}</b><span class="small muted">${esc(s.from)}</span></div>`).join('')}</div>`;
  }
};
function bindTab(t, body) {
  if (t === 'rozetler') $$('.bdg', body).forEach(b => b.addEventListener('click', () => badgeModal(DATA.BADGES.find(x => x.id === b.dataset.b), false)));
}

/* avatar builder */
function builder(root, av, onChange) {
  const groups = [['base', 'Hayvan', DATA.AV_BASES], ['hat', 'Şapka', DATA.AV_HATS], ['glasses', 'Gözlük', DATA.AV_GLASSES], ['shirt', 'Tişört', DATA.AV_SHIRTS.map(c => [c, c])], ['bg', 'Arka plan', Object.keys(Art.BGS).map(k => [k, k])]];
  const draw = () => {
    root.innerHTML = groups.map(([k, t, opts]) => `<div class="stack" style="gap:8px"><h3 style="font-size:1.15rem">${t}</h3><div class="opts">${opts.map(([v, l]) => {
      const on = av[k] === v || (!av[k] && (v === 'none'));
      if (k === 'shirt') return `<button class="opt col" style="background:${v}" data-k="${k}" data-v="${v}" aria-pressed="${on}" aria-label="Tişört rengi"></button>`;
      if (k === 'bg') return `<button class="opt col" style="background:${Art.BGS[v]}" data-k="${k}" data-v="${v}" aria-pressed="${on}" aria-label="Arka plan ${v}"></button>`;
      return `<button class="opt" data-k="${k}" data-v="${v}" aria-pressed="${on}" title="${l}" aria-label="${l}">${Art.avatar({ ...av, [k]: v })}</button>`;
    }).join('')}</div></div>`).join('');
    $$('.opt', root).forEach(b => b.addEventListener('click', () => { av[b.dataset.k] = b.dataset.v; sfx('pop'); onChange(av); draw(); }));
  };
  draw();
}
const randNick = () => `${DATA.NICK_A[Math.floor(Math.random() * DATA.NICK_A.length)]} ${DATA.NICK_B[Math.floor(Math.random() * DATA.NICK_B.length)]} ${10 + Math.floor(Math.random() * 90)}`;
P.pasaport = (pg) => {
  if (S.profile) { location.hash = 'koleksiyon'; return; }
  const st = { step: 1, nick: 'Kechy Panda 27', av: { base: 'panda', bg: 'sky', shirt: '#1FA2B0', hat: 'kep', hatColor: '#E6508A', glasses: 'none' }, team: S.team || null };
  const drawStep = () => {
    pg.innerHTML = `<header class="pagehead"><div><span class="eyebrow">Adım ${st.step}/3</span><h1>🛂 Kechy Pasaportunu oluştur</h1><div class="steps-dots">${[1, 2, 3].map(i => `<i class="${i <= st.step ? 'on' : ''}"></i>`).join('')}</div></div></header>
      <div class="builder"><div class="card preview"><div class="pv">${Art.avatar(st.av)}</div><output class="pill" style="font-size:1.1rem">${esc(st.nick)}</output></div><div class="card pad stack body"></div></div>`;
    const body = $('.body', pg), pv = $('.pv', pg);
    if (st.step === 1) {
      body.innerHTML = `<h2>Takma adını seç</h2><p>Gerçek adını yazma. Takma adın seni internette korur.</p>
        <div class="nick"><output>${esc(st.nick)}</output><button class="btn sky dice">🎲 Başka isim</button></div>
        <div class="row"><label class="small" for="na">Kelime</label><select id="na" class="sel">${DATA.NICK_A.map(a => `<option ${st.nick.startsWith(a + ' ') ? 'selected' : ''}>${a}</option>`).join('')}</select>
        <label class="small" for="nb">Hayvan</label><select id="nb" class="sel">${DATA.NICK_B.map(b => `<option ${st.nick.split(' ')[1] === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
        <div class="row" style="justify-content:flex-end"><button class="btn berry lg nx">Devam →</button></div>`;
      const setN = (n) => { st.nick = n; $$('output', pg).forEach(o => o.textContent = n); };
      $('.dice', body).addEventListener('click', () => { setN(randNick()); const [a, b] = st.nick.split(' '); $('#na').value = a; $('#nb').value = b; });
      const fromSel = () => setN(`${$('#na').value} ${$('#nb').value} ${st.nick.split(' ')[2] || 27}`);
      $('#na').addEventListener('change', fromSel); $('#nb').addEventListener('change', fromSel);
    } else if (st.step === 2) {
      body.innerHTML = `<h2>Avatarını yap</h2><div class="bb stack" style="gap:16px"></div><div class="row" style="justify-content:space-between"><button class="btn ghost bk">← Geri</button><button class="btn berry lg nx">Devam →</button></div>`;
      builder($('.bb', body), st.av, (av) => { pv.innerHTML = Art.avatar(av); });
    } else {
      body.innerHTML = `<h2>Takımını seç</h2><p>Kechy Evreni'ndeki hangi karakterin takımındasın? Sonra değiştirebilirsin.</p>
        <div class="chars">${DATA.CHARACTERS.map(c => `<button class="card char" data-c="${c.id}" aria-pressed="${st.team === c.id}" style="box-shadow:none">${Art.character(c.id)}<b>${c.name}</b><span class="role">${c.role}</span></button>`).join('')}</div>
        <div class="row" style="justify-content:space-between"><button class="btn ghost bk">← Geri</button><button class="btn leaf lg fin">🛂 Pasaportumu bas!</button></div>`;
      $$('.char', body).forEach(b => b.addEventListener('click', () => { st.team = b.dataset.c; $$('.char', body).forEach(x => x.setAttribute('aria-pressed', String(x === b))); sfx('pop'); }));
      $('.fin', body).addEventListener('click', (e) => {
        S.profile = { nick: st.nick, avatar: st.av, team: st.team || 'kechy', created: dateKey() }; save();
        sfx('stamp'); act('profil', 'Pasaport oluşturuldu'); go('koleksiyon');
        setTimeout(() => { reward(50, 'Hoş geldin!', $('.photo') || $('#main')); award('hosgeldin'); boom(true); }, 500);
      });
    }
    $('.nx', body)?.addEventListener('click', () => { st.step++; drawStep(); });
    $('.bk', body)?.addEventListener('click', () => { st.step--; drawStep(); });
  };
  drawStep();
};
P.avatar = (pg) => {
  if (!S.profile) { location.hash = 'pasaport'; return; }
  const av = JSON.parse(JSON.stringify(S.profile.avatar));
  let nick = S.profile.nick;
  pg.innerHTML = `<a class="crumb" href="#koleksiyon">← Pasaportum</a><header class="pagehead"><h1>🎭 Avatarımı değiştir</h1></header>
    <div class="builder"><div class="card preview"><div class="pv">${Art.avatar(av)}</div><output class="pill" style="font-size:1.1rem">${esc(nick)}</output><button class="btn sm sky dice">🎲 Yeni takma ad</button><button class="btn leaf block savebtn">💾 Kaydet</button></div><div class="card pad stack bb" style="gap:16px"></div></div>`;
  builder($('.bb', pg), av, (a) => { $('.pv', pg).innerHTML = Art.avatar(a); });
  $('.dice', pg).addEventListener('click', () => { nick = randNick(); $('output', pg).textContent = nick; });
  $('.savebtn', pg).addEventListener('click', () => { S.profile.avatar = av; S.profile.nick = nick; save(); renderHeader(); toast('Avatarın kaydedildi ✓'); sfx('ok'); go('koleksiyon'); });
};

/* ---------- KARAKTERLER ---------- */
P.karakterler = (pg) => {
  const myTeam = S.profile?.team || S.team;
  pg.innerHTML = `<header class="pagehead"><div><h1>👥 Kechy Evreni</h1><p>Kechy tek başına değil! Her karakterin bir süper gücü ve bir köşesi var. Takımını seç, pasaportuna işlensin.</p></div></header>
    <div class="chars">${DATA.CHARACTERS.map(c => `<button class="card char" data-c="${c.id}" aria-pressed="${myTeam === c.id}" style="background:color-mix(in srgb, ${c.bg} 30%, var(--card))">${myTeam === c.id ? '<span class="pill team">Takımın ✓</span>' : ''}${Art.character(c.id)}<b>${c.name}</b><span class="role">${c.role}</span><p>${c.text}</p></button>`).join('')}</div>`;
  $$('.char', pg).forEach(b => b.addEventListener('click', () => {
    const c = DATA.CHARACTERS.find(x => x.id === b.dataset.c);
    const m = Modal.open(`<div class="reward"><div style="width:180px">${Art.character(c.id, 'happy2', 'kechy-bob')}</div><span class="eyebrow">${c.team}</span><h2>${c.name} · ${c.role}</h2><p>${c.text}</p>
      <div class="row" style="justify-content:center"><button class="btn berry jt">${myTeam === c.id ? 'Zaten takımındasın ✓' : `Ben ${c.name} takımındayım!`}</button><a class="btn ghost" href="#${c.link}" data-close>${c.name}'nun köşesi →</a></div></div>`);
    $('.jt', m).addEventListener('click', () => { if (S.profile) S.profile.team = c.id; else S.team = c.id; save(); sfx('ok'); boom(); toast(`${c.name} takımına katıldın!`); Modal.close(true); render(); });
  }));
};

/* ---------- GİZLİ KASA ---------- */
P.kasa = (pg) => {
  setLast('kasa', 'Gizli Kasa', '🔐');
  let code = [];
  pg.innerHTML = `<header class="pagehead"><div><h1>🔐 Kechy'nin Gizli Kasası</h1><p>Kechy dergisinin sayfalarına gizli semboller saklandı. Bulduğun şifreyi gir, gizli bölümü aç!</p></div></header>
    <section class="vault-scene"><div class="vault"><div class="inside">✨</div><div class="door"><div class="dial"></div>${[[8, 50], [92, 50], [50, 8], [50, 92]].map(([x, y]) => `<span class="bolt" style="left:calc(${x}% - 9px);top:calc(${y}% - 9px)"></span>`).join('')}</div></div>
      <div class="card pad stack"><h2 style="font-size:1.4rem">Şifreyi gir</h2><div class="codebox" aria-live="polite"></div>
        <div class="keypad">${DATA.KEYPAD.map(k => `<button class="btn ghost sm key" data-k="${k}">${k}</button>`).join('')}</div>
        <div class="row"><button class="btn ghost del">⌫ Sil</button><button class="btn ghost clr">Temizle</button><button class="btn horn lg opn" style="margin-left:auto">🗝️ Aç</button></div>
        <p class="small muted msg">İpucu: Deneme şifresi <b>K E C H Y</b>. Diğer şifreler Kechy dergisinin sayfalarında!</p></div></section>
    <section class="sec"><div class="sec-h"><h2>Açtığın gizli bölümler</h2></div><div class="grid g3 opened"></div></section>`;
  const box = $('.codebox', pg), vault = $('.vault', pg), dial = $('.dial', pg);
  let rot = 0;
  const drawCode = () => { box.innerHTML = code.length ? code.map(k => `<span>${k}</span>`).join('') : '<p class="muted">Sembollere dokun…</p>'; };
  const listOpened = () => { $('.opened', pg).innerHTML = S.vault.length ? S.vault.map(i => { const v = DATA.VAULT[i]; return `<button class="card fcard sun" data-v="${i}" style="text-align:left;font:inherit;color:inherit;cursor:pointer"><span class="big">${v.e}</span><h3>${v.title}</h3><p class="small muted">Tekrar açmak için dokun</p></button>`; }).join('') : '<p class="muted">Henüz gizli bölüm açmadın.</p>';
    $$('[data-v]', pg).forEach(b => b.addEventListener('click', () => secret(DATA.VAULT[+b.dataset.v], false))); };
  const secret = (v, fresh) => Modal.open(`<div class="reward"><div style="font-size:4.4rem" class="a-pop">${v.e}</div><span class="eyebrow">${fresh ? '🎉 Gizli bölüm açıldı!' : 'Gizli bölüm'}</span><h2>${v.title}</h2><p style="font-size:1.1rem;line-height:1.6;text-align:left">${esc(v.text)}</p><div class="row" style="justify-content:center">${sayBtn(v.title + '. ' + v.text)}<button class="btn" data-close>Harika!</button></div></div>`);
  $$('.key', pg).forEach(b => b.addEventListener('click', () => { if (code.length >= 6) return; code.push(b.dataset.k); rot += 36; dial.style.transform = `rotate(${rot}deg)`; sfx('flip'); drawCode(); }));
  $('.del', pg).addEventListener('click', () => { code.pop(); rot -= 36; dial.style.transform = `rotate(${rot}deg)`; drawCode(); });
  $('.clr', pg).addEventListener('click', () => { code = []; drawCode(); });
  $('.opn', pg).addEventListener('click', (e) => {
    const idx = DATA.VAULT.findIndex(v => v.code.join('|') === code.join('|'));
    if (idx < 0) { box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad'); sfx('no'); $('.msg', pg).innerHTML = 'Şifre açmadı. Dergideki sembollere tekrar bak! Deneme şifresi: <b>K E C H Y</b>'; return; }
    const v = DATA.VAULT[idx], fresh = !S.vault.includes(idx);
    vault.classList.add('open'); $('.inside', pg).textContent = v.e; sfx('open');
    setTimeout(() => {
      if (fresh) { S.vault.push(idx); S.stickers.push({ e: v.e, t: v.title, from: 'Gizli Kasa' }); act('kasa', v.title, 40); reward(40, 'Gizli kasa açıldı', e.target); award('sifre'); boom(true); listOpened(); }
      secret(v, fresh);
      setTimeout(() => { vault.classList.remove('open'); code = []; drawCode(); }, 1600);
    }, 1300);
  });
  drawCode(); listOpened();
};

/* ---------- PAZAR SÜRPRİZİ ---------- */
let previewSunday = false;
P.surpriz = (pg) => {
  const wk = weekIndex(), sp = weekSurprise(), opened = S.surprise[wk], sun = isSunday() || previewSunday;
  pg.innerHTML = `<header class="pagehead"><div><h1>🎁 Pazar Sürprizi</h1><p>Her Pazar yeni bir sürpriz açılır. İçinde ne olduğu önceden bellidir: şans kutusu yok, herkes aynı hediyeyi alır.</p></div></header>
    <section class="twocol"><div class="card pad stack center" style="background:var(--tint-berry);align-items:center">
      <span class="eyebrow">Bu haftanın sürprizi</span><h2 style="font-size:2rem">${sp.e} ${sp.t}</h2><p>${sp.d}</p>
      <div class="gift ${sun && !opened ? 'shake' : ''} ${opened ? 'open' : ''}" role="img" aria-label="Hediye kutusu"><div class="lid"></div><div class="bow">🎀</div><div class="box"></div><div class="prize">${sp.e}</div></div>
      <div class="gstate stack" style="align-items:center"></div></div>
      <div class="stack"><div class="card pad stack"><h2 style="font-size:1.3rem">Sıradaki Pazarlar</h2>${[1, 2, 3].map(k => { const s = DATA.SURPRISES[(wk + k) % DATA.SURPRISES.length]; const d = nextSunday(); d.setDate(d.getDate() + 7 * (k - (isSunday() ? 0 : 1))); return `<div class="row"><span style="font-size:1.8rem">${s.e}</span><div><b style="font-family:var(--font-d)">${s.t}</b><p class="small muted">${fmtDate(d, { day: 'numeric', month: 'long' })}</p></div></div>`; }).join('')}</div>
      <div class="note" style="background:var(--tint-sky)"><span style="font-size:1.4rem">💙</span><p>Sürprizi kaçırırsan üzülme. Hediyeler yarışma değil; Kechy'ye uğradığın bir Pazar yenisi seni bekler.</p></div></div></section>`;
  const gs = $('.gstate', pg), gift = $('.gift', pg);
  if (opened) gs.innerHTML = `<p><b>Açtın!</b> Çıkartman pasaportunda.</p><a class="btn" href="#koleksiyon-cikartma">✨ Çıkartmalarım</a>`;
  else if (sun) {
    gs.innerHTML = `<button class="btn berry lg">🎁 Kutuyu aç!</button>`;
    const openIt = (src) => {
      if (S.surprise[wk]) return;
      gift.classList.remove('shake'); gift.classList.add('open'); sfx('open');
      S.surprise[wk] = dateKey(); S.stickers.push({ e: sp.e, t: sp.t, from: 'Pazar Sürprizi' }); act('surpriz', sp.t, 15);
      setTimeout(() => { reward(15, 'Pazar sürprizi', src); award('pazar'); boom(true); gs.innerHTML = `<p><b>Tebrikler!</b> ${sp.t} pasaportuna eklendi.</p><a class="btn" href="#koleksiyon-cikartma">✨ Çıkartmalarım</a>`; }, 900);
    };
    $('button', gs).addEventListener('click', (e) => openIt(e.currentTarget)); gift.addEventListener('click', () => openIt(gift));
  } else {
    gs.innerHTML = `<p>Açılmasına kalan süre:</p><div class="cd">${cdHTML(countdownTo(nextSunday()))}</div>`;
    const iv = setInterval(() => { const c = $('.cd', pg); if (c) c.innerHTML = cdHTML(countdownTo(nextSunday())); }, 30000); onLeave(() => clearInterval(iv));
  }
};

/* ---------- EBEVEYN ---------- */
const SKILL_OF = { soru: 'Genel kültür', quiz: 'Genel kültür', tv: 'Genel kültür', gorev: 'Hayat becerileri', ulke: 'Coğrafya', deney: 'Bilim', okuma: 'Okuma', hikaye: 'Yazma', cizim: 'Sanat' };
const ACT_ICON = { soru: '🧠', quiz: '📖', tv: '📺', gorev: '🎯', ulke: '🌍', deney: '🧪', okuma: '📚', hikaye: '✍️', cizim: '🎨', oyun: '🎮', rozet: '🏅', kasa: '🔐', surpriz: '🎁', profil: '🛂' };
P.ebeveyn = (pg) => {
  if (!parentOk) {
    const g = gateHTML();
    pg.innerHTML = `<div class="card">${g.html}</div><p class="center small muted">Bu kapı çocukların ayarları yanlışlıkla değiştirmesini önler.</p>`;
    bindGate(pg, g.a, g.b, () => render()); return;
  }
  const st = S.settings, d = day();
  const mins = []; let mx = 1;
  for (let i = 6; i >= 0; i--) { const dt = new Date(); dt.setDate(dt.getDate() - i); const m = Math.round((S.days[dateKey(dt)]?.sec || 0) / 60); mx = Math.max(mx, m); mins.push([dt, m, i === 0]); }
  const skills = {}; S.acts.forEach(a => { let s = SKILL_OF[a.type]; if (a.type === 'oyun') s = (DATA.GAMES.find(g => g.t === a.label)?.skill) || 'Mantık'; if (s) skills[s] = (skills[s] || 0) + 1; });
  const smax = Math.max(1, ...Object.values(skills));
  const pending = S.drawings.filter(x => x.status === 'onay');
  const sel = (id, val, opts) => `<select id="${id}" class="sel">${opts.map(([v, l]) => `<option value="${v}" ${String(val) === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const sw = (id, on) => `<button class="switch" id="${id}" role="switch" aria-checked="${on}" aria-label="${id}"></button>`;
  pg.innerHTML = `<header class="pagehead"><div><h1>👨‍👩‍👧 Ebeveyn Köşesi</h1><p>Çocuğunuzun Kechy'de ne yaptığını görün, süreyi ve ayarları belirleyin. Kechy'de reklam, sohbet ve sıralama tablosu yoktur.</p></div></header>
    <div class="kpi"><div><small>Bugün Kechy'de</small><b>${Math.round((d.sec || 0) / 60)} dk</b></div><div><small>Bu hafta etkinlik</small><b>${weekActs(0)}</b></div><div><small>Toplam puan</small><b>${fmtNum(S.stars)} ⭐</b></div><div><small>Rozetler</small><b>${Object.keys(S.badges).length}/${DATA.BADGES.length}</b></div></div>
    <section class="twocol"><div class="card pad stack"><h2 style="font-size:1.3rem">Son 7 gün · dakika</h2><div class="bars">${mins.map(([dt, m, t]) => `<div class="b ${t ? 'today' : ''}"><small class="tnum">${m}</small><i style="height:${Math.round(m / mx * 100)}%"></i></div>`).join('')}</div><div class="bars-x">${mins.map(([dt]) => `<span>${dt.toLocaleDateString('tr-TR', { weekday: 'short' })}</span>`).join('')}</div></div>
      <div class="card pad stack"><h2 style="font-size:1.3rem">Beceriler</h2>${Object.keys(skills).length ? Object.entries(skills).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="skill"><span>${k}</span><div class="prog sky"><i style="width:${v / smax * 100}%"></i></div><span class="tnum">${v}</span></div>`).join('') : '<p class="muted">Etkinlik yapıldıkça burada beceri dağılımı görünür.</p>'}</div></section>
    <section class="twocol"><div class="card pad stack"><h2 style="font-size:1.3rem">Son etkinlikler</h2><div class="actlist">${S.acts.slice(0, 40).map(a => `<div><span>${ACT_ICON[a.type] || '•'}</span><span>${esc(a.label)}</span><time>${new Date(a.t).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</time></div>`).join('') || '<p class="muted">Henüz etkinlik yok.</p>'}</div></div>
      <div class="card pad stack"><h2 style="font-size:1.3rem">Onay bekleyen çizimler</h2>${pending.length ? pending.map(x => `<div class="row" style="flex-wrap:nowrap"><img src="${x.img}" alt="Çizim" style="width:120px;border-radius:10px;border:2px solid var(--line)"><div class="stack" style="gap:6px"><span class="small">${x.date.split('-').reverse().join('.')} · ${esc(x.title)}</span><div class="row"><button class="btn sm leaf" data-ok="${x.id}">Onayla</button><button class="btn sm ghost" data-no="${x.id}">Gönderme</button></div></div></div>`).join('') : '<p class="muted">Onay bekleyen çizim yok. Çocuğunuz galeriye çizim gönderdiğinde burada görünür.</p>'}</div></section>
    <section class="card pad"><h2 style="font-size:1.3rem;margin-bottom:6px">Ayarlar</h2>
      <div class="setting"><div class="t"><b>Günlük süre sınırı</b><small>Süre dolunca Kechy nazikçe “yarın görüşürüz” der.</small></div>${sel('s-limit', st.limit, [[0, 'Kapalı'], [20, '20 dk'], [30, '30 dk'], [45, '45 dk'], [60, '60 dk']])}</div>
      <div class="setting"><div class="t"><b>Mola hatırlatıcı</b><small>Belirli aralıklarla 20 saniyelik göz molası.</small></div>${sel('s-break', st.breakEvery, [[0, 'Kapalı'], [10, 'Her 10 dk'], [15, 'Her 15 dk'], [20, 'Her 20 dk'], [30, 'Her 30 dk']])}</div>
      <div class="setting"><div class="t"><b>Yaş grubu</b><small>Site seçilen yaşa göre düzenlenir: sorular, görevler, oyunlar ve yazı boyutu.</small></div>${sel('s-age', S.age || 'buyuk', [['minik', '🧸 0-7 yaş'], ['buyuk', '🎒 7-12 yaş']])}</div>
      <div class="setting"><div class="t"><b>Sıralı Kechy Yolu</b><small>Açıkken çocuk önce okur, sonra okuduğunun sorularını çözer, sonra oynar.</small></div>${sw('s-seq', st.seq !== false)}</div>
      <div class="setting"><div class="t"><b>Ses efektleri</b><small>Tıklama ve kutlama sesleri.</small></div>${sw('s-sound', st.sound)}</div>
      <div class="setting"><div class="t"><b>Sesli okuma</b><small>Metinleri tarayıcının Türkçe sesiyle okur. Yeni okuyucular için.</small></div>${sw('s-voice', st.voice)}</div>
      <div class="setting"><div class="t"><b>YouTube videoları</b><small>Kechy TV bölümlerinin altında konuyla ilgili gerçek videolar. Sadece dokununca açılır.</small></div>${sw('s-yt', st.yt !== false)}</div>
      <div class="setting"><div class="t"><b>Hareketleri azalt</b><small>Animasyonları ve konfetiyi kapatır.</small></div>${sw('s-motion', st.motion === 'off')}</div>
      <div class="setting"><div class="t"><b>Büyük yazı</b><small>Tüm yazıları büyütür.</small></div>${sw('s-size', st.size === 'big')}</div>
      <div class="setting"><div class="t"><b>Mola ekranını şimdi dene</b><small>Çocuğunuzun göreceği mola ekranı.</small></div><button class="btn sm ghost try-break">Göster</button></div>
    </section>
    <section class="sec"><div class="sec-h"><h2>Kechy Güvenlik Sözü</h2><p>Bu tasarım, çocuklar için Avrupa'daki yaş uygun tasarım ilkeleri gözetilerek hazırlandı. Kechy'de şunlar yoktur:</p></div>
      <div class="promise">${['Reklam', 'Sohbet ve özel mesaj', 'Açık yorumlar', 'Sıralama tablosu', 'Sonsuz kaydırma', 'Otomatik sonraki video', 'Seri kaybetme cezası', 'Şans kutusu, rastgele ödül', 'Konum, kamera, mikrofon', 'Gerçek isim zorunluluğu'].map(t => `<div><span class="x">✕</span>${t}</div>`).join('')}</div></section>
    <section class="card pad stack" id="uygulama"><div class="sec-h"><h2 style="font-size:1.4rem">📲 Telefona uygulama olarak ekle</h2><p>${App.standalone ? 'Kechy Dünyası şu an uygulama olarak açık. ✓' : 'Kechy Dünyası telefonda kendi ikonuyla, tam ekran ve internet zayıfken bile açılır. Mağaza gerekmez.'}</p></div>${App.standalone ? '' : App.guideHTML()}</section>
    <section class="card pad stack"><div class="sec-h"><h2 style="font-size:1.4rem">Dergi Köprüsü · QR kodlar</h2><p>Editörler için: dergideki sayfalara basılacak QR kodlar ve Gizli Kasa şifreleri. Böylece dergi ↔ web ↔ oyun döngüsü kurulur.</p><a class="btn berry" href="#admin">🗂️ Editör paneli</a></div>
      <div class="row"><label for="qrbase" class="small" style="font-family:var(--font-d);font-weight:700">Sitenin adresi</label><input id="qrbase" class="txt" style="max-width:380px" value="https://kechy.example"></div>
      <div class="qrgrid"></div>
      <div class="card pad" style="box-shadow:none;background:var(--tint-sun)"><b style="font-family:var(--font-d)">Gizli Kasa şifreleri</b><ul style="margin:6px 0 0;padding-left:20px">${DATA.VAULT.map(v => `<li><b>${v.code.join(' ')}</b> → ${v.title}</li>`).join('')}</ul></div></section>
    <section class="card pad stack"><h2 style="font-size:1.3rem">Veri ve gizlilik</h2><p>Bu prototipte tüm ilerleme yalnızca bu cihazda, tarayıcıda saklanır. Hiçbir veri sunucuya gönderilmez. Canlı sitede ilerleme, ebeveyn hesabına bağlı olarak saklanmalıdır.</p>
      <div class="row"><button class="btn sky demo">Örnek ilerleme yükle</button><button class="btn ghost sunprev">Pazar sürprizini önizle</button><button class="btn ghost reset">Tüm ilerlemeyi sil</button></div><div class="resetzone"></div></section>`;
  const setS = (k, v) => { S.settings[k] = v; save(); renderHeader(); toast('Ayar kaydedildi'); };
  $('#s-limit').addEventListener('change', (e) => { setS('limit', +e.target.value); limitShown = false; });
  $('#s-break').addEventListener('change', (e) => { setS('breakEvery', +e.target.value); sessionSec = 0; });
  const bindSw = (id, fn) => $('#' + id).addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-checked') !== 'true'; e.currentTarget.setAttribute('aria-checked', String(on)); fn(on); });
  $('#s-age').addEventListener('change', (e) => { S.age = e.target.value; save(); applyAge(); toast('Yaş grubu değişti ✓'); });
  bindSw('s-seq', (on) => setS('seq', on));
  bindSw('s-yt', (on) => setS('yt', on));
  bindSw('s-sound', (on) => setS('sound', on)); bindSw('s-voice', (on) => { setS('voice', on); if (!on) Voice.stop(); });
  bindSw('s-motion', (on) => setS('motion', on ? 'off' : 'auto')); bindSw('s-size', (on) => setS('size', on ? 'big' : 'normal'));
  $('.try-break', pg).addEventListener('click', showBreak);
  $$('[data-ok]', pg).forEach(b => b.addEventListener('click', () => { S.drawings.find(x => x.id === +b.dataset.ok).status = 'editor'; save(); toast('Onaylandı, editörlere gönderildi (demo)'); render(); }));
  $$('[data-no]', pg).forEach(b => b.addEventListener('click', () => { S.drawings.find(x => x.id === +b.dataset.no).status = 'geri'; save(); render(); }));
  $('.demo', pg).addEventListener('click', () => { loadDemo(); toast('Örnek ilerleme yüklendi'); render(); });
  $('.sunprev', pg).addEventListener('click', () => { previewSunday = true; go('surpriz'); });
  $('.reset', pg).addEventListener('click', () => {
    $('.resetzone', pg).innerHTML = `<div class="note"><span>⚠️</span><div class="stack" style="gap:8px"><p>Pasaport, rozetler, damgalar ve eserler bu cihazdan silinecek. Emin misiniz?</p><div class="row"><button class="btn berry sm yes">Evet, hepsini sil</button><button class="btn ghost sm no">Vazgeç</button></div></div></div>`;
    $('.yes', pg).addEventListener('click', () => { const keep = S.settings; S = fresh(); S.settings = keep; save(); toast('Tüm ilerleme silindi'); go('kechy'); });
    $('.no', pg).addEventListener('click', () => { $('.resetzone', pg).innerHTML = ''; });
  });
  const QR = [['kasa', '🔐 Gizli Kasa'], ['sayi-12', '📖 Kechy 12 soruları'], ['kitap', '🛡️ Mini kitap'], ['lab', '🧪 Bu haftanın deneyi'], ['tv', '📺 Kechy TV'], ['harita', '🗺️ Dünya haritası'], ['oyun-uzay', '🚀 Uzay oyunu'], ['oyun-hayvan', '🐾 Hayvan Kurtarma'], ['oyun-dedektif', '🕵️ Kechy Dedektif'], ['cizim', '🎨 Çizim Stüdyosu']];
  const drawQR = () => {
    const base = ($('#qrbase').value || '').trim().replace(/\/+$/, '');
    $('.qrgrid', pg).innerHTML = QR.map(([hh, t]) => { let svg = ''; try { const q = qrcode(0, 'M'); q.addData(base + '/#' + hh); q.make(); svg = q.createSvgTag(4, 2); } catch (e) { svg = '<p class="small">QR oluşturulamadı</p>'; } return `<div class="card qr" style="box-shadow:none">${svg}<b>${t}</b><code>${esc(base + '/#' + hh)}</code></div>`; }).join('');
  };
  loadScript(LIB.qr).then(() => { drawQR(); $('#qrbase').addEventListener('input', drawQR); }).catch(() => { $('.qrgrid', pg).innerHTML = '<p class="muted">QR kütüphanesi yüklenemedi.</p>'; });
};

function loadDemo() {
  const keep = S.settings; S = fresh(); S.settings = keep;
  S.profile = { nick: 'Kechy Panda 27', avatar: { base: 'panda', bg: 'sky', shirt: '#1FA2B0', hat: 'kep', hatColor: '#E6508A', glasses: 'none' }, team: 'luna', created: '2026-06-02' };
  S.created = new Date('2026-06-02').getTime();
  S.stars = 1280;
  [1, 2, 3, 4, 5, 6].forEach(n => { S.issues[n] = true; S.badges['sayi-' + n] = '2026-07-0' + n; });
  ['hosgeldin', 'ilk-soru', 'soru-10', 'ilk-gorev', 'gorev-10', 'kasif-5', 'sanatci', 'hikayeci', 'bilimci', 'kahraman', 'okur'].forEach((b, i) => S.badges[b] = '2026-08-' + pad2(i + 1));
  ['TR', 'JP', 'EG', 'KE', 'BR', 'IT', 'AZ', 'NZ'].forEach((c, i) => S.stamps[c] = pad2(i + 3) + '.09.2026');
  Object.assign(S.count, { soru: 31, gorev: 14, bilmece: 23, oyun: 42, deney: 3, hikaye: 2, cizim: 2, tv: 2, okuma: 9, ulke: 8 });
  ['hafiza', 'kelime', 'labirent', 'yapboz', 'bilmece', 'quiz'].forEach(g => S.games[g] = { plays: 6, wins: 4, best: null });
  S.labs = { yumurta: '2026-08-10', uzum: '2026-08-24', cicek: '2026-09-07' };
  S.stickers = [{ e: '🚀', t: 'Uzay Çıkartması', from: 'Pazar Sürprizi' }, { e: '🌈', t: 'Gökkuşağı Çıkartması', from: 'Pazar Sürprizi' }];
  S.stories = [{ title: 'Kaplan Kiko ve Altın Anahtar', text: 'Bir varmış bir yokmuş, Kaplan Kiko adında meraklı bir kahraman varmış. Bir kuş, Kaplan Kiko\'nun kapısına bir not bıraktı: “Sihirli ormana gel, seni bir sürpriz bekliyor!” Kaplan Kiko hemen yola çıktı ve baykuş Luna ile tanıştı. İkisi birlikte altın anahtarı buldular ve paylaştılar.', ill: '🐯🌳🗝️🦉', date: '2026-09-12' }];
  const types = ['soru', 'gorev', 'oyun', 'okuma', 'ulke', 'cizim', 'deney'];
  for (let i = 1; i <= 20; i++) {
    if (i % 3 === 2) continue;
    const dt = new Date(); dt.setDate(dt.getDate() - i); const k = dateKey(dt), n = 2 + (i * 7) % 6;
    S.days[k] = { sec: (10 + (i * 13) % 25) * 60, n, stars: n * 15, soru: true, gorev: i % 2 === 0, oyun: true, oku: i % 4 === 0 };
    for (let j = 0; j < Math.min(n, 3); j++) { const ty = types[(i + j) % types.length]; S.acts.push({ t: dt.getTime() - j * 36e5, type: ty, label: { soru: 'Günün sorusu', gorev: 'Günün görevi', oyun: 'Hafıza Kartları', okuma: 'Sesli hikâye', ulke: 'Ülke keşfi', cizim: 'Çizim', deney: 'Deney' }[ty], s: 10 }); }
  }
  S.drawings = []; S.last = { hash: 'oyun-kelime', title: 'Kelime Avı', e: '🔤', t: Date.now() };
  save(); renderHeader();
}

/* ---------- SEARCH ---------- */
function searchIndex() {
  const pages = [['kechy', '🏠', 'Ana sayfa · Bugün Kechy'], ['oku', '📖', 'Oku · Kechy Rafı'], ['oyna', '🎮', 'Oyun Merkezi'], ['kesfet', '🌍', 'Keşfet'], ['uret', '🎨', 'Üret'], ['koleksiyon', '🛂', 'Kechy Pasaportu'],
    ['karakterler', '👥', 'Kechy Evreni · Karakterler'], ['kasa', '🔐', 'Gizli Kasa'], ['surpriz', '🎁', 'Pazar Sürprizi'], ['galeri', '🖼️', 'Kechy Galeri'], ['hikaye', '✍️', 'Hikâye Makinesi'], ['cizim', '🎨', 'Çizim Stüdyosu'],
    ['tv', '📺', 'Kechy TV'], ['lab', '🧪', 'Kechy Laboratuvarı'], ['bilgiler', '💡', 'Biliyor muydun?'], ['kitap', '🛡️', 'Mini Kitap: Arkadaşlık Kalkanı'], ['ebeveyn', '👨‍👩‍👧', 'Ebeveyn Köşesi']];
  return [...pages.map(([g, e, t]) => ({ g, e, t, s: 'Sayfa' })),
    ...DATA.GAMES.map(x => ({ g: 'oyun-' + x.id, e: x.e, t: x.t, s: 'Oyun' })), ...DATA.ISSUES.map(i => ({ g: 'sayi-' + i.n, e: i.emoji, t: 'Kechy ' + i.n + ' · ' + i.title, s: 'Dergi' })),
    ...DATA.COUNTRIES.map(c => ({ g: 'harita-' + c.code, e: c.flag, t: c.name, s: 'Ülke · ' + c.cap, flag: true })), ...DATA.ANIMALS.map(a => ({ g: 'hayvanlar', e: a.e, t: a.name, s: 'Hayvan' })),
    ...DATA.EXPERIMENTS.map(x => ({ g: 'lab-' + x.id, e: x.e, t: x.title, s: 'Deney' })), ...DATA.AUDIO_STORIES.map(x => ({ g: 'dinle-' + x.id, e: x.e, t: x.title, s: 'Sesli hikâye' })),
    ...DATA.TV.map(x => ({ g: 'tv-' + x.id, e: x.cat, t: x.title, s: 'Kechy TV' })), ...DATA.CHARACTERS.map(c => ({ g: 'karakterler', e: '⭐', t: c.name, s: 'Karakter · ' + c.role }))];
}
const fold = (s) => trAscii(trLower(s));
function openSearch() {
  const idx = searchIndex();
  const m = Modal.open(`<h2>🔍 Ne arıyorsun?</h2><div class="stack" style="margin-top:12px"><input id="q-in" class="txt" style="font-family:var(--font-d);font-weight:700;font-size:1.25rem;padding:12px 16px" placeholder="Örneğin: panda, uzay, Japonya" autocomplete="off" aria-label="Ara"><div class="results" role="listbox"></div></div>`, { cls: 'wide' });
  const inp = $('#q-in', m), res = $('.results', m);
  const draw = () => {
    const q = fold(inp.value.trim());
    const list = q ? idx.filter(x => fold(x.t + ' ' + x.s).includes(q)).slice(0, 14) : idx.slice(0, 8);
    res.innerHTML = list.length ? list.map(x => `<a href="#${x.g}" data-close><span class="e ${x.flag ? 'flag' : ''}">${x.e}</span><span><b>${esc(x.t)}</b><br><span class="small muted">${esc(x.s)}</span></span></a>`).join('') : '<p class="muted">Bulamadım. Başka bir kelime dene!</p>';
  };
  inp.addEventListener('input', draw);
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const a = $('a', res); if (a) { Modal.close(true); location.hash = a.getAttribute('href').slice(1); } } });
  draw(); setTimeout(() => inp.focus(), 60);
}

P.oyna = (pg) => {
  const gid = todayGame(), g = DATA.GAMES.find(x => x.id === gid), d = day();
  const ready = S.settings.seq === false || (d.oku && d.sayisoru);
  const cats = [['all', 'Tümü'], ['yeni', 'Yeni'], ['beyin', 'Beyin'], ['kelime', 'Kelime'], ['kesif', 'Keşif'], ['sanat', 'Sanat']];
  let cat = 'all';
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('robo')}</div><div><h1>Oyna</h1><p>Beyin oyunları, kelime avları, keşif oyunları ve boyama. Her oyunun sonunda bir durak var: istersen devam, istersen mola.</p></div></header>
    <a class="card banner" href="#oyun-${gid}" style="background:var(--tint-leaf)"><div style="font-size:4rem">${g.e}</div>
      <div class="stack" style="gap:6px"><span class="eyebrow">Günün oyunu · Kechy Yolu 3. adım · +20 ⭐</span><h2>${g.t}</h2>
      <p>${d.oyun ? 'Bugünkü oyunu bitirdin! İstersen tekrar oyna.' : ready ? esc(g.d) : 'Şimdi de oynayabilirsin. Kechy Yolu\'nda sayılması için önce okuma ve soruları bitir.'}</p></div>
      <span class="btn leaf lg">${d.oyun ? 'Tekrar oyna' : 'Hemen oyna'} →</span></a>
    <section class="sec"><div class="sec-h"><h2>Oyun Merkezi</h2><p>${DATA.GAMES.filter(x => !isMinik() || x.minik).length} oyun${isMinik() ? ', 0-7 yaş için seçildi' : ''}. İstediğin zaman, istediğin kadar oyna.</p></div>
      <div class="chips" role="toolbar" aria-label="Oyun türü">${cats.map(([k, t]) => `<button class="chip" data-c="${k}" aria-pressed="${k === 'all'}">${t}</button>`).join('')}</div>
      <div class="grid gauto games"></div></section>`;
  const draw = () => {
    $('.games', pg).innerHTML = DATA.GAMES.filter(x => (!isMinik() || x.minik)).filter(x => cat === 'all' || (cat === 'yeni' ? x.isNew : x.cat === cat)).map(x => `<a class="card gcard" href="#oyun-${x.id}">${x.isNew ? '<span class="ribbon">YENİ</span>' : ''}${S.games[x.id]?.wins ? `<span class="pill leaf best">✓ ${S.games[x.id].wins}</span>` : ''}<div class="art ${x.bg}"><span>${x.e}</span></div><div class="body"><h3>${x.t}</h3><p>${x.d}</p></div></a>`).join('');
  };
  $$('[data-c]', pg).forEach(b => b.addEventListener('click', () => { cat = b.dataset.c; $$('[data-c]', pg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); draw(); }));
  draw();
};

P.oyun = (pg, id) => {
  const g = DATA.GAMES.find(x => x.id === id);
  if (!g || !Games[id]) { location.hash = 'oyna'; return; }
  setLast('oyun-' + id, g.t, g.e);
  const rec = S.games[id] || (S.games[id] = { plays: 0, wins: 0, best: null }); rec.plays++; save();
  Games[id](pg, g);
};
