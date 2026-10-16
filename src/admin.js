/* ============ Editör paneli (#admin) ============
   Local preview mode: edits are stored in this browser and applied on this device.
   Live publishing needs a database (see the "Yayın" tab). */
Object.assign(NAV_OF, { admin: 'ebeveyn' });
DATA.ASSIGN = {};
DATA.SHELF = null;
DATA.DRAFTS = [
  { id: 'd1', type: 'soru', src: 'Claude', data: ['Kutup ayısının derisi ne renktir?', ['Beyaz', 'Siyah', 'Pembe', 'Sarı'], 1, 'Kürkü şeffaftır, derisi ise siyahtır. Siyah deri güneşin ısısını tutar.'] },
  { id: 'd2', type: 'soru', src: 'Claude', data: ['Hangisi bir dinozor değildir?', ['T-Rex', 'Triceratops', 'Mamut', 'Stegozor'], 2, 'Mamut, filin akrabası olan tüylü bir memeliydi. Dinozor değildi.'] },
  { id: 'd3', type: 'soru', src: 'Claude', data: ['Bir yılda kaç mevsim vardır?', ['2', '3', '4', '6'], 2, 'İlkbahar, yaz, sonbahar ve kış.'] },
  { id: 'd4', type: 'gorev', src: 'Claude', data: ['📏', 'Evdeki en uzun ve en kısa eşyayı bul, karşılaştır.'] },
  { id: 'd5', type: 'gorev', src: 'Claude', data: ['🧦', 'Çoraplarını eşleştir ve katla.'] },
  { id: 'd6', type: 'gorev', src: 'Claude', data: ['🙌', 'Bugün kimseyi dışarıda bırakmadan bir oyun oyna.'] },
  { id: 'd7', type: 'hafta', src: 'Claude', data: { id: 'dino', t: 'Dinozorlar Haftası', e: '🦕', bg: 'var(--tint-horn)', posts: [
    { e: '🦖', t: 'T-Rex\'in minik kolları', text: 'T-Rex kocaman bir dinozordu ama kolları çok kısaydı. Bilim insanları bu kolların avını tutmaya ya da yerden kalkarken destek almaya yaradığını düşünüyor. Dişleri ise muz büyüklüğündeydi!', q: ['T-Rex\'in dişleri yaklaşık neyin büyüklüğündeydi?', ['Pirinç tanesi', 'Muz', 'Karpuz'], 1, 'En büyük dişleri 30 santimi bulabiliyordu.'] },
    { e: '🦕', t: 'Uzun boyunlu devler', text: 'Brakiyozor gibi uzun boyunlu dinozorlar ağaçların en tepesindeki yaprakları yiyebiliyordu. Günde yüzlerce kilo bitki yemeleri gerekiyordu. Uzun boyunları sayesinde yürümeden geniş bir alanda yemek bulabiliyorlardı.', q: ['Uzun boyunlu dinozorlar ne yerdi?', ['Balık', 'Bitki', 'Et'], 1, 'Onlar otçul, yani bitki yiyen dinozorlardı.'] },
    { e: '🐦', t: 'Dinozorlar hâlâ aramızda mı?', text: 'Evet, bir bakıma! Kuşlar dinozorların torunlarıdır. Bazı dinozorların tüyleri vardı ve kuşlar gibi yumurtlarlardı. Bir dahaki sefere bir serçe gördüğünde, minik bir dinozorun akrabasına baktığını hatırla!', q: ['Hangi hayvanlar dinozorların torunudur?', ['Kuşlar', 'Kediler', 'Balıklar'], 0, 'Kuşlar yaşayan dinozorlardır.'] }] } },
  { id: 'd8', type: 'tanitim', src: 'Claude', data: { n: 11, hook: 'Kechy 11\'de yaz macerası başlıyor!', guess: ['Sence yazın en önemli arkadaşımız hangisi?', ['Şapka ve su', 'Kalın mont', 'Şemsiye']],
    items: [['☀️', 'Güneşli bir sır', 'Güneşten korunmanın 3 kolay yolu bu sayıda!'], ['🐢', 'Kumsalda bir misafir', 'Caretta caretta yumurtalarını nereye bırakır?'], ['🏖️', 'Kumdan kale ustası', 'Kumdan kaleni sağlam yapmanın sırrı'], ['🏅', 'Yaz rozeti', 'Soruları çöz, Yaz rozetini kazan!']] } }
];

/* real videos for Kechy TV topics (chosen from children's education channels; editable in the editor panel) */
[['deney', 'Gi1RCPM41hw', 'Yüzen Yumurta Deneyi', 'Çocuk Gelişimi Fen ve Matematik Etkinlikleri'], ['japonya', 'f5eZ_Yg2z8M', 'Çocuklar için Japonya Tanıtım Videosu', 'ozurutti cozurutti'],
 ['ahtapot', 'XEEHtQnbHqU', 'Ahtapotların Gizemli Dünyası', 'Havuç ile Çilek'], ['bal', 'Rwqg3-AvlnE', 'Arılar Nasıl Bal Yapar?', 'Anne Bu Ne?'], ['cizim', 'JG3vj5TIKHI', 'Nasıl Çizilir? Keçi', 'Rüya Okulu']]
  .forEach(([ep, id, t, ch]) => { const e = DATA.TV.find(x => x.id === ep); if (e) e.yt = { id, t, ch }; });
const ytId = (s) => { s = (s || '').trim(); const m = /(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/.exec(s); return m ? m[1] : (/^[\w-]{11}$/.test(s) ? s : ''); };
const EKEY = 'kechy-editor-v1';
const Editor = {
  load() { try { return JSON.parse(localStorage.getItem(EKEY)); } catch (e) { return null; } },
  save() {
    const c = { v: 1, updated: Date.now(), questions: DATA.QUESTIONS, questionsMinik: DATA.QUESTIONS_MINIK, tasksMinik: DATA.TASKS_MINIK, quizzes: DATA.ISSUE_QUIZ, tasks: DATA.TASKS, assign: DATA.ASSIGN, weekly: DATA.WEEKLY, teasers: DATA.TEASERS, shelf: DATA.SHELF, drafts: DATA.DRAFTS,
      issues: DATA.ISSUES.map(i => ({ n: i.n, title: i.title, date: i.date, slogan: i.slogan || '', hidden: !!i.hidden })), tvyt: Object.fromEntries(DATA.TV.map(e => [e.id, e.yt || null])) };
    try { localStorage.setItem(EKEY, JSON.stringify(c)); } catch (e) { toast('Tarayıcı kaydetmeye izin vermedi'); }
    return c;
  },
  apply(c) {
    if (!c) return;
    ['questionsMinik:QUESTIONS_MINIK', 'tasksMinik:TASKS_MINIK', 'questions:QUESTIONS', 'quizzes:ISSUE_QUIZ', 'tasks:TASKS', 'assign:ASSIGN', 'weekly:WEEKLY', 'teasers:TEASERS', 'shelf:SHELF', 'drafts:DRAFTS'].forEach(p => { const [k, d] = p.split(':'); if (c[k] != null) DATA[d] = c[k]; });
    if (c.tvyt) DATA.TV.forEach(e => { if (e.id in c.tvyt) e.yt = c.tvyt[e.id]; });
    (c.issues || []).forEach(x => { const is = DATA.ISSUES.find(i => i.n === x.n); if (is) Object.assign(is, { title: x.title, date: x.date, slogan: x.slogan, hidden: x.hidden }); });
  },
  reset() { try { localStorage.removeItem(EKEY); } catch (e) { } location.reload(); }
};
Editor.apply(Editor.load());

function todayTask() { const a = DATA.ASSIGN[dateKey()]; return a && a.task ? a.task : pickDay(isMinik() ? DATA.TASKS_MINIK : DATA.TASKS, 2); }
function todayQuestion() { const a = DATA.ASSIGN[dateKey()]; return a && a.q ? a.q : pickDay(isMinik() ? DATA.QUESTIONS_MINIK : DATA.QUESTIONS, 1); }
function shelfIssues() {
  const vis = DATA.ISSUES.filter(i => !i.hidden);
  if (DATA.SHELF && DATA.SHELF.length) { const o = DATA.SHELF; return vis.slice().sort((a, b) => ((o.indexOf(a.n) + 1) || 999) - ((o.indexOf(b.n) + 1) || 999)); }
  return vis.slice().sort((a, b) => b.n - a.n);
}

let editorOk = false;
const inp = (v, cls = '', ph = '') => `<input class="txt ${cls}" value="${esc(v)}" placeholder="${esc(ph)}">`;
const qEditor = (q, i) => `<div class="ed-row card" data-i="${i}"><div class="row" style="flex-wrap:nowrap"><b class="ed-no">${i + 1}</b>${inp(q[0], 'q-t', 'Soru')}<button class="btn sm ghost ed-del" aria-label="Sil">🗑</button></div>
  <div class="ed-opts">${[0, 1, 2, 3].map(k => `<label class="ed-opt"><input type="radio" name="c${i}-${Math.random().toString(36).slice(2, 6)}" class="q-c" value="${k}" ${q[2] === k ? 'checked' : ''}>${inp(q[1][k] || '', 'q-o', 'Seçenek ' + 'ABCD'[k])}</label>`).join('')}</div>
  ${inp(q[3] || '', 'q-w', 'Açıklama (doğru cevaptan sonra gösterilir)')}</div>`;
const readQs = (box) => $$('.ed-row', box).map(r => [$('.q-t', r).value.trim(), $$('.q-o', r).map(x => x.value.trim()).filter(Boolean), +(($('.q-c:checked', r) || {}).value || 0), $('.q-w', r).value.trim()]).filter(q => q[0] && q[1].length >= 2);

P.admin = (pg, param) => {
  if (!editorOk) {
    pg.innerHTML = `<div class="card gate"><div style="font-size:3rem">🗝️</div><h2>Editör girişi</h2><p class="muted">Kechy editörleri için içerik paneli.</p>
      <label for="ep" class="small">Editör şifresi</label><input id="ep" class="gate-in" type="password" style="width:220px" autocomplete="off"><p class="gate-msg muted small" aria-live="polite"></p><button class="btn sky go">Giriş</button></div>`;
    const tryIn = () => { if ($('#ep').value === 'kechy2026') { editorOk = true; render(); } else $('.gate-msg', pg).textContent = 'Şifre yanlış.'; };
    $('.go', pg).addEventListener('click', tryIn); $('#ep').addEventListener('keydown', e => { if (e.key === 'Enter') tryIn(); }); setTimeout(() => $('#ep')?.focus(), 50);
    return;
  }
  const waiting = DATA.DRAFTS.filter(d => !d.status).length;
  const tabs = [['taslak', `🤖 Taslaklar${waiting ? ' (' + waiting + ')' : ''}`], ['sayilar', '📚 Sayılar ve raf'], ['sorular', '❓ Günün soruları'], ['sayisoru', '🧠 Sayı soruları'], ['gorev', '🎯 Görevler'], ['hafta', '📰 Haftanın konusu'], ['tv', '🎬 TV videoları'], ['yayin', '🚀 Yayın']];
  const tab = tabs.some(t => t[0] === param) ? param : 'taslak';
  pg.innerHTML = `<header class="pagehead"><div><span class="eyebrow">Kechy Editör Paneli</span><h1>🗂️ İçerik yönetimi</h1><p>Soruları, görevleri, sayıları ve haftalık yazıları buradan düzenle. Yapay zekânın ürettiği içerikler önce Taslaklar'a düşer, onaylamadan yayına girmez.</p></div></header>
    <div class="note" style="background:var(--tint-sun)"><span>ℹ️</span><p><b>Önizleme modu:</b> Değişiklikler şimdilik sadece bu tarayıcıda görünür. Herkese yayınlamak için "Yayın" sekmesine bak.</p></div>
    <div class="tabs" role="tablist">${tabs.map(([k, t]) => `<a class="tab" role="tab" href="#admin-${k}" aria-selected="${k === tab}">${t}</a>`).join('')}</div>
    <section class="card pad stack edbody" style="border-top-left-radius:0"></section>`;
  const body = $('.edbody', pg);
  const saved = (msg = 'Kaydedildi ✓') => { Editor.save(); toast(msg); sfx('ok'); };
  ED[tab](body, saved);
};

const ED = {
  taslak(b, saved) {
    const label = { soru: '❓ Günün sorusu', gorev: '🎯 Görev', hafta: '📰 Haftanın konusu', tanitim: '🎁 Sayı tanıtımı' };
    const preview = (d) => d.type === 'soru' ? `<b>${esc(d.data[0])}</b><p class="small">${d.data[1].map((o, k) => (k === d.data[2] ? '✅ ' : '▫️ ') + esc(o)).join(' · ')}</p><p class="small muted">${esc(d.data[3])}</p>`
      : d.type === 'gorev' ? `<b>${d.data[0]} ${esc(d.data[1])}</b>`
      : d.type === 'hafta' ? `<b>${d.data.e} ${esc(d.data.t)}</b><ul class="small">${d.data.posts.map(p => `<li>${p.e} ${esc(p.t)}: ${esc(p.text.slice(0, 90))}…</li>`).join('')}</ul>`
      : `<b>Kechy ${d.data.n}: ${esc(d.data.hook)}</b><ul class="small">${d.data.items.map(x => `<li>${x[0]} ${esc(x[1])}: ${esc(x[2])}</li>`).join('')}</ul>`;
    const list = DATA.DRAFTS.filter(d => !d.status), doneL = DATA.DRAFTS.filter(d => d.status);
    b.innerHTML = `<p>Bu içerikler yapay zekâ tarafından önerildi ve <b>onay bekliyor</b>. Onayladığın içerik siteye eklenir, reddettiğin eklenmez.</p>
      ${list.length ? list.map(d => `<div class="card pad draft" data-id="${d.id}" style="box-shadow:none"><div class="row"><span class="pill">${label[d.type]}</span><span class="pill sky">${d.src} taslağı</span><span class="spacer"></span><button class="btn sm leaf ok">✓ Onayla</button><button class="btn sm ghost no">✕ Reddet</button></div><div class="dprev">${preview(d)}</div></div>`).join('') : '<div class="empty">Bekleyen taslak yok. 🎉</div>'}
      ${doneL.length ? `<details><summary class="small muted">Geçmiş (${doneL.length})</summary>${doneL.map(d => `<p class="small">${d.status === 'onay' ? '✅' : '✕'} ${label[d.type]} · ${esc(d.type === 'soru' ? d.data[0] : d.type === 'gorev' ? d.data[1] : d.type === 'hafta' ? d.data.t : d.data.hook)}</p>`).join('')}</details>` : ''}`;
    $$('.draft', b).forEach(el => {
      const d = DATA.DRAFTS.find(x => x.id === el.dataset.id);
      $('.ok', el).addEventListener('click', () => {
        if (d.type === 'soru') DATA.QUESTIONS.push(d.data); else if (d.type === 'gorev') DATA.TASKS.push(d.data);
        else if (d.type === 'hafta') DATA.WEEKLY.push(d.data); else if (d.type === 'tanitim') DATA.TEASERS[d.data.n] = { hook: d.data.hook, guess: d.data.guess, items: d.data.items };
        d.status = 'onay'; saved('Onaylandı, içeriğe eklendi ✓'); render();
      });
      $('.no', el).addEventListener('click', () => { d.status = 'red'; saved('Reddedildi'); render(); });
    });
  },
  sayilar(b, saved) {
    const order = shelfIssues().concat(DATA.ISSUES.filter(i => i.hidden));
    b.innerHTML = `<p>Raf sırasını oklarla değiştir, gizlemek istediğin sayının işaretini kaldır. Başlık ve sloganlar sitede görünür.</p>
      <div class="stack ed-issues">${order.map(is => `<div class="ed-issue card" data-n="${is.n}"><div class="ed-cv">${Art.coverHTML(is)}</div>
        <div class="stack" style="gap:6px;flex:1;min-width:0"><div class="row"><b style="font-family:var(--font-d)">Kechy ${is.n}</b><label class="small"><input type="checkbox" class="vis" ${is.hidden ? '' : 'checked'}> Rafta göster</label><span class="spacer"></span><button class="btn sm ghost up" aria-label="Yukarı">↑</button><button class="btn sm ghost down" aria-label="Aşağı">↓</button><button class="btn sm sky tz">🎁 Sürprizler</button></div>
        <div class="row">${inp(is.title, 'e-title', 'Başlık')}${inp(is.date || '', 'e-date', 'Tarih')}</div>${inp(is.slogan || '', 'e-slogan', 'Slogan (ana sayfada görünür)')}</div></div>`).join('')}</div>
      <div class="row"><button class="btn leaf savebtn">💾 Kaydet</button><button class="btn ghost resetorder">Sırayı sıfırla (yeniden eskiye)</button></div><div class="tzedit"></div>`;
    const box = $('.ed-issues', b);
    const move = (el, dir) => { const sib = dir < 0 ? el.previousElementSibling : el.nextElementSibling; if (!sib) return; dir < 0 ? box.insertBefore(el, sib) : box.insertBefore(sib, el); };
    $$('.ed-issue', b).forEach(el => { $('.up', el).addEventListener('click', () => move(el, -1)); $('.down', el).addEventListener('click', () => move(el, 1)); $('.tz', el).addEventListener('click', () => teaserEd($('.tzedit', b), +el.dataset.n, saved)); });
    $('.savebtn', b).addEventListener('click', () => {
      DATA.SHELF = $$('.ed-issue', b).map(el => +el.dataset.n);
      $$('.ed-issue', b).forEach(el => { const is = DATA.ISSUES.find(i => i.n === +el.dataset.n); is.title = $('.e-title', el).value.trim() || is.title; is.date = $('.e-date', el).value.trim(); is.slogan = $('.e-slogan', el).value.trim(); is.hidden = !$('.vis', el).checked; });
      saved('Raf ve sayılar kaydedildi ✓');
    });
    $('.resetorder', b).addEventListener('click', () => { DATA.SHELF = null; saved('Raf sırası sıfırlandı'); render(); });
  },
  sorular(b, saved) {
    let pool = 'buyuk';
    const draw = () => {
      b.innerHTML = `<div class="row"><label for="qp" class="small">Yaş grubu</label><select id="qp" class="sel"><option value="buyuk" ${pool === 'buyuk' ? 'selected' : ''}>🎒 7-12 yaş</option><option value="minik" ${pool === 'minik' ? 'selected' : ''}>🧸 0-7 yaş (kısa, emojili, 3 seçenek)</option></select></div><div class="qsbox"></div>`;
      $('#qp').addEventListener('change', (e) => { pool = e.target.value; draw(); });
      const key = pool === 'minik' ? 'QUESTIONS_MINIK' : 'QUESTIONS';
      listQs($('.qsbox', b), DATA[key], (qs) => { DATA[key] = qs; saved(`${qs.length} soru kaydedildi ✓`); }, 'Günün sorusu her gün bu listeden seçilir. Belirli bir güne soru atamak için "Görevler" sekmesini kullan.');
    };
    draw();
  },
  sayisoru(b, saved) {
    const ns = DATA.ISSUES.map(i => i.n); let n = 12;
    const draw = () => {
      b.innerHTML = `<div class="row"><label for="qs-n" class="small">Sayı</label><select id="qs-n" class="sel">${ns.map(x => `<option value="${x}" ${x === n ? 'selected' : ''}>Kechy ${x}</option>`).join('')}</select><span class="small muted">Okuma sonrası sorulan sorular.</span></div><div class="qsbox"></div>`;
      $('#qs-n').addEventListener('change', (e) => { n = +e.target.value; draw(); });
      listQs($('.qsbox', b), DATA.ISSUE_QUIZ[n] || [], (qs) => { DATA.ISSUE_QUIZ[n] = qs; saved(`Kechy ${n}: ${qs.length} soru kaydedildi ✓`); });
    };
    draw();
  },
  gorev(b, saved) {
    const up = Object.entries(DATA.ASSIGN).filter(([d]) => d >= dateKey()).sort();
    b.innerHTML = `<h3>📅 Görev ver: belirli bir güne görev ata</h3>
      <div class="row"><input id="as-d" class="txt" type="date" value="${dateKey()}" style="max-width:180px"><input id="as-e" class="txt" value="🎯" style="max-width:70px" aria-label="Emoji"><input id="as-t" class="txt" placeholder="Görev metni, ör: Bugün bir ağaç resmi çiz." style="flex:1;min-width:200px"><button class="btn berry as-go">Görevi ata</button></div>
      <div class="stack" style="gap:6px">${up.length ? up.map(([d, a]) => `<div class="row"><span class="pill tnum">${d.split('-').reverse().join('.')}</span><span>${a.task ? a.task[0] + ' ' + esc(a.task[1]) : ''}${a.q ? ' · ❓ ' + esc(a.q[0]) : ''}</span><button class="btn sm ghost as-del" data-d="${d}">Kaldır</button></div>`).join('') : '<p class="small muted">Atanmış görev yok. Atanmayan günlerde görev listeden otomatik seçilir.</p>'}</div>
      <h3 style="margin-top:12px">🎯 Görev listesi</h3><div class="stack tlist" style="gap:6px">${DATA.TASKS.map((t, i) => `<div class="row t-row" style="flex-wrap:nowrap">${inp(t[0], 't-e').replace('class="txt', 'style="max-width:64px" class="txt')}${inp(t[1], 't-t')}<button class="btn sm ghost t-del" aria-label="Sil">🗑</button></div>`).join('')}</div>
      <div class="row"><button class="btn ghost t-add">+ Yeni görev</button><button class="btn leaf t-save">💾 Listeyi kaydet</button></div>`;
    $('.as-go', b).addEventListener('click', () => { const d = $('#as-d').value, t = $('#as-t').value.trim(); if (!d || !t) return toast('Tarih ve görev metni gerekli'); DATA.ASSIGN[d] = Object.assign(DATA.ASSIGN[d] || {}, { task: [$('#as-e').value.trim() || '🎯', t] }); saved('Görev atandı ✓'); render(); });
    $$('.as-del', b).forEach(x => x.addEventListener('click', () => { delete DATA.ASSIGN[x.dataset.d]; saved('Kaldırıldı'); render(); }));
    const bindDel = () => $$('.t-del', b).forEach(x => x.onclick = () => x.closest('.t-row').remove());
    $('.t-add', b).addEventListener('click', () => { $('.tlist', b).insertAdjacentHTML('beforeend', `<div class="row t-row" style="flex-wrap:nowrap"><input class="txt t-e" style="max-width:64px" value="⭐"><input class="txt t-t" placeholder="Yeni görev"><button class="btn sm ghost t-del">🗑</button></div>`); bindDel(); });
    $('.t-save', b).addEventListener('click', () => { DATA.TASKS = $$('.t-row', b).map(r => [$('.t-e', r).value.trim() || '⭐', $('.t-t', r).value.trim()]).filter(t => t[1]); saved(`${DATA.TASKS.length} görev kaydedildi ✓`); });
    bindDel();
  },
  hafta(b, saved) {
    let k = weekIndex() % DATA.WEEKLY.length;
    const draw = () => {
      const w = DATA.WEEKLY[k];
      b.innerHTML = `<div class="row"><label for="w-k" class="small">Konu</label><select id="w-k" class="sel">${DATA.WEEKLY.map((x, i) => `<option value="${i}" ${i === k ? 'selected' : ''}>${x.e} ${esc(x.t)}${i === weekIndex() % DATA.WEEKLY.length ? ' (bu hafta)' : ''}</option>`).join('')}</select><span class="small muted">Konular her hafta sırayla döner.</span></div>
        <div class="row">${inp(w.e, 'w-e').replace('class="txt', 'style="max-width:70px" class="txt')}${inp(w.t, 'w-t', 'Konu başlığı')}</div>
        ${w.posts.map((p, i) => `<div class="card pad stack w-post" style="box-shadow:none;gap:6px"><div class="row" style="flex-wrap:nowrap">${inp(p.e, 'p-e').replace('class="txt', 'style="max-width:64px" class="txt')}${inp(p.t, 'p-t', 'Yazı başlığı')}</div><textarea class="txt p-x" rows="4">${esc(p.text)}</textarea>${qEditor([p.q[0], p.q[1], p.q[2], p.q[3]], i).replace('ed-row card', 'ed-row')}</div>`).join('')}
        <div class="row"><button class="btn leaf w-save">💾 Kaydet</button></div>`;
      $('#w-k').addEventListener('change', (e) => { k = +e.target.value; draw(); });
      $('.w-save', b).addEventListener('click', () => {
        w.e = $('.w-e', b).value.trim() || w.e; w.t = $('.w-t', b).value.trim() || w.t;
        $$('.w-post', b).forEach((el, i) => { const r = $('.ed-row', el); Object.assign(w.posts[i], { e: $('.p-e', el).value.trim(), t: $('.p-t', el).value.trim(), text: $('.p-x', el).value.trim(), q: [$('.q-t', r).value.trim(), $$('.q-o', r).map(x => x.value.trim()).filter(Boolean), +(($('.q-c:checked', r) || {}).value || 0), $('.q-w', r).value.trim()] }); });
        saved('Haftanın konusu kaydedildi ✓');
      });
    };
    draw();
  },
  tv(b, saved) {
    b.innerHTML = `<p>Her Kechy TV bölümünün altında konuyla ilgili gerçek bir YouTube videosu gösterilir. YouTube linkini yapıştır; boş bırakırsan o bölümde video gösterilmez.</p>
      ${DATA.TV.map(e => `<div class="card pad stack tv-row" data-id="${e.id}" style="box-shadow:none;gap:6px"><b style="font-family:var(--font-d)">${e.cat} ${esc(e.title)}</b>
        <div class="row">${inp(e.yt ? 'https://www.youtube.com/watch?v=' + e.yt.id : '', 'tv-l', 'YouTube linki')}${e.yt ? `<img src="https://i.ytimg.com/vi/${e.yt.id}/default.jpg" alt="" style="width:80px;border-radius:8px;border:2px solid var(--line)">` : ''}</div>
        <div class="row">${inp(e.yt ? e.yt.t : '', 'tv-t', 'Video başlığı')}${inp(e.yt ? e.yt.ch : '', 'tv-c', 'Kanal adı')}</div></div>`).join('')}
      <p class="small muted">İpucu: Çocuklara yönelik, reklamsız ya da az reklamlı eğitim kanallarını seç. Videoyu yayına almadan önce baştan sona izle.</p>
      <button class="btn leaf tv-save">💾 Kaydet</button>`;
    $('.tv-save', b).addEventListener('click', () => {
      let bad = 0;
      $$('.tv-row', b).forEach(r => { const e = DATA.TV.find(x => x.id === r.dataset.id), raw = $('.tv-l', r).value.trim(), id = ytId(raw); if (raw && !id) bad++; e.yt = id ? { id, t: $('.tv-t', r).value.trim() || e.title, ch: $('.tv-c', r).value.trim() || 'YouTube' } : null; });
      saved(bad ? `${bad} link tanınmadı, onlar boş bırakıldı` : 'TV videoları kaydedildi ✓'); render();
    });
  },
  yayin(b) {
    const c = Editor.load();
    b.innerHTML = `<h3>Durum</h3><p>${c ? `Bu tarayıcıda kaydedilmiş düzenlemeler var (son: ${new Date(c.updated).toLocaleString('tr-TR')}).` : 'Henüz bir düzenleme yapılmadı.'}</p>
      <div class="note"><span>🔌</span><div class="stack" style="gap:6px"><b style="font-family:var(--font-d)">Herkese yayınlamak için veritabanı gerekiyor</b><p>Bu panel şu an önizleme modunda. Bir veritabanı (örneğin Supabase) bağlanınca editörler kendi hesaplarıyla girer, "Canlıya al" deyince değişiklikler bütün ziyaretçilerde görünür.</p></div></div>
      <div class="row"><button class="btn berry" disabled>🚀 Canlıya al (veritabanı bekleniyor)</button><button class="btn ghost exp">⬇️ İçeriği dışa aktar (JSON)</button><label class="btn ghost" for="imp">⬆️ İçe aktar<input id="imp" type="file" accept="application/json" hidden></label><button class="btn ghost rst">Yerel düzenlemeleri sıfırla</button></div>
      <textarea class="txt expbox" rows="6" readonly hidden></textarea>`;
    $('.exp', b).addEventListener('click', () => {
      const data = JSON.stringify(Editor.save(), null, 1), box = $('.expbox', b);
      try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = 'kechy-icerik.json'; a.click(); } catch (e) { }
      box.hidden = false; box.value = data; box.select();
    });
    $('#imp').addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const c2 = JSON.parse(r.result); Editor.apply(c2); Editor.save(); toast('İçerik içe aktarıldı ✓'); render(); } catch (x) { toast('Dosya okunamadı'); } }; r.readAsText(f); });
    $('.rst', b).addEventListener('click', (e) => { if (e.currentTarget.dataset.sure) return Editor.reset(); e.currentTarget.dataset.sure = 1; e.currentTarget.textContent = 'Emin misin? Tekrar bas'; });
  }
};
function listQs(b, qs, onSave, note) {
  b.innerHTML = `${note ? `<p class="small muted">${note}</p>` : ''}<div class="stack qlist" style="gap:10px">${qs.map((q, i) => qEditor(q, i)).join('')}</div><div class="row"><button class="btn ghost q-add">+ Yeni soru</button><button class="btn leaf q-save">💾 Kaydet</button></div>`;
  const bind = () => $$('.ed-del', b).forEach(x => x.onclick = () => x.closest('.ed-row').remove());
  $('.q-add', b).addEventListener('click', () => { $('.qlist', b).insertAdjacentHTML('beforeend', qEditor(['', ['', '', '', ''], 0, ''], $$('.ed-row', b).length)); bind(); });
  $('.q-save', b).addEventListener('click', () => onSave(readQs(b)));
  bind();
}
function teaserEd(box, n, saved) {
  const t = DATA.TEASERS[n] || { hook: `Kechy ${gen(n)} içinde 4 sürpriz saklı!`, guess: ['', ['', '', '']], items: [['🎁', '', ''], ['🔐', '', ''], ['🎵', '', ''], ['🏅', '', '']] };
  box.innerHTML = `<div class="card pad stack" style="box-shadow:none;background:var(--tint-sky)"><h3>🎁 Kechy ${n} tanıtım sürprizleri</h3><p class="small muted">Ana sayfada yeni sayıya basınca açılan merak sayfası.</p>
    ${inp(t.hook, 'z-h', 'Çağrı cümlesi')}
    ${t.items.map((x, i) => `<div class="row z-i" style="flex-wrap:nowrap">${inp(x[0], 'z-e').replace('class="txt', 'style="max-width:64px" class="txt')}${inp(x[1], 'z-t', 'Sürpriz başlığı')}${inp(x[2], 'z-d', 'Kısa açıklama')}</div>`).join('')}
    ${inp(t.guess?.[0] || '', 'z-g', 'Tahmin sorusu')}<div class="row">${[0, 1, 2].map(k => inp(t.guess?.[1]?.[k] || '', 'z-go', 'Seçenek ' + (k + 1))).join('')}</div>
    <button class="btn leaf z-save">💾 Sürprizleri kaydet</button></div>`;
  $('.z-save', box).addEventListener('click', () => {
    DATA.TEASERS[n] = { hook: $('.z-h', box).value.trim(), items: $$('.z-i', box).map(r => [$('.z-e', r).value.trim(), $('.z-t', r).value.trim(), $('.z-d', r).value.trim()]).filter(x => x[1]), guess: $('.z-g', box).value.trim() ? [$('.z-g', box).value.trim(), $$('.z-go', box).map(x => x.value.trim()).filter(Boolean)] : null };
    saved(`Kechy ${n} sürprizleri kaydedildi ✓`);
  });
  box.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
}
