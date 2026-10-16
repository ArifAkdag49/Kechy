/* ============ PAGES 1: home, read, explore ============ */
const refreshHome = () => { if (currentRoute === 'kechy') render(); };
const HERO_DECOR = () => {
  const stars = Array.from({ length: 34 }, (_, i) => `<i style="left:${(i * 37) % 100}%;top:${(i * 53) % 70}%;animation-delay:${(i % 7) * .4}s"></i>`).join('');
  const rays = Array.from({ length: 12 }, (_, i) => `<rect x="46.5" y="2" width="7" height="17" rx="3.5" fill="#FFC83A" stroke="#1D2E42" stroke-width="2.2" transform="rotate(${i * 30} 50 50)"/>`).join('');
  const cloud = (top, dur, delay, s) => `<div class="cloud" style="top:${top}px;animation-duration:${dur}s;animation-delay:${delay}s"><svg width="${120 * s}" height="${60 * s}" viewBox="0 0 120 60"><path d="M20 52 a16 16 0 0 1 6 -30 a22 22 0 0 1 40 -9 a18 18 0 0 1 32 13 a14 14 0 0 1 2 26z" fill="#fff" stroke="#1D2E42" stroke-width="3"/></svg></div>`;
  return `<div class="stars-bg" aria-hidden="true">${stars}</div>
    <svg class="hsun" viewBox="0 0 100 100" aria-hidden="true"><g class="rays">${rays}</g><circle cx="50" cy="50" r="26" fill="#FFC83A" stroke="#1D2E42" stroke-width="3"/><circle cx="41" cy="46" r="3" fill="#1D2E42"/><circle cx="59" cy="46" r="3" fill="#1D2E42"/><path d="M41 56 q9 8 18 0" fill="none" stroke="#1D2E42" stroke-width="3" stroke-linecap="round"/></svg>
    <svg class="moon" viewBox="0 0 100 100" aria-hidden="true" style="position:absolute;right:28px;top:22px;width:76px;height:76px;z-index:1"><path d="M62 12 A40 40 0 1 0 88 66 A32 32 0 1 1 62 12Z" fill="#FFE08A" stroke="#06101B" stroke-width="3"/></svg>
    ${cloud(26, 80, -10, 1)}${cloud(90, 110, -60, .7)}${cloud(46, 95, -85, .55)}
    <svg class="hills" viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 52 Q160 6 330 46 T660 40 T980 52 T1200 30 V110 H0Z" fill="var(--hill)" stroke="var(--line)" stroke-width="3" vector-effect="non-scaling-stroke"/><path d="M0 86 Q220 56 440 82 T860 78 T1200 70 V110 H0Z" fill="var(--hill-2)" stroke="var(--line)" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>`;
};
function countdownTo(target) {
  const ms = Math.max(0, target - Date.now());
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60 };
}
function nextSunday() { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); return d; }
const isSunday = () => new Date().getDay() === 0;
const weekSurprise = () => DATA.SURPRISES[weekIndex() % DATA.SURPRISES.length];
const cdHTML = (c) => `<div class="countdown tnum"><div><b>${c.d}</b><small>gün</small></div><div><b>${c.h}</b><small>saat</small></div><div><b>${c.m}</b><small>dakika</small></div></div>`;

/* reading target for step 1 of the Kechy path */
function readTarget() {
  if (DATA.PAGES[12] && !S.issues[12]) return { key: 'sayi12', go: 'sayi-12', e: '📖', t: 'Kechy 12\'yi oku', sub: S.pages[12] ? `Kaldığın sayfa: ${S.pages[12] + 1}` : 'Sayfaları çevir, oku' };
  if (!S.readSeen.kitap) return { key: 'kitap', go: 'kitap', e: '📖', t: 'Kechy 12\'den oku', sub: 'Mini kitap: Arkadaşlık Kalkanı' };
  const st = DATA.AUDIO_STORIES[dayIndex() % DATA.AUDIO_STORIES.length];
  return { key: st.id, go: 'dinle-' + st.id, e: st.e, t: 'Bugünün hikâyesini oku', sub: st.title };
}
function quizFor(key) {
  if (key === 'kitap' || key === 'sayi12') return { qs: DATA.ISSUE_QUIZ[12], title: 'Kechy 12 soruları', badge: 'sayi-12', issue: 12 };
  if (/^sayi\d+$/.test(key)) { const n = +key.slice(4); return DATA.ISSUE_QUIZ[n] ? { qs: DATA.ISSUE_QUIZ[n], title: `Kechy ${n} soruları`, badge: 'sayi-' + n, issue: n } : null; }
  const st = DATA.AUDIO_STORIES.find(s => s.id === key);
  return st ? { qs: DATA.STORY_QUIZ[key], title: st.title + ' soruları' } : null;
}
function pathSteps() {
  const d = day(), rt = readTarget(), qk = d.readItem || rt.key, qf = quizFor(qk), gid = todayGame(), gm = DATA.GAMES.find(x => x.id === gid);
  const steps = [
    { k: 'oku', e: rt.e, t: rt.t, sub: rt.sub, pts: '+10 ⭐', fn: () => go(rt.go) },
    { k: 'sayisoru', e: '🧠', t: 'Okuduğunun soruları', sub: qf ? qf.title : 'Okuduğun hikâyenin soruları', pts: '+10 ⭐ ve doğru başına +4', fn: () => go('test-' + qk) },
    { k: 'oyun', e: gm.e, t: 'Günün oyunu', sub: gm.t, pts: '+20 ⭐', fn: () => go('oyun-' + gid) },
    { k: 'soru', e: '🌍', t: 'Genel sorular', sub: 'Günün sorusu ve bilgi yarışması', pts: '+10 ⭐', fn: () => openQuestion() }
  ];
  const seq = S.settings.seq !== false;
  steps.forEach((s, i) => { s.state = d[s.k] ? 'done' : (seq && steps.slice(0, i).some(p => !d[p.k])) ? 'locked' : 'open'; });
  return steps;
}

P.kechy = (pg) => {
  const d = day(), nick = S.profile?.nick || 'Kaşif', hr = new Date().getHours();
  const [greet, icon] = hr < 5 ? ['İyi geceler', '🌙'] : hr < 12 ? ['Günaydın', '☀️'] : hr < 17 ? ['İyi günler', '🌤️'] : hr < 21 ? ['İyi akşamlar', '🌇'] : ['İyi geceler', '🌙'];
  const note = pickDay(DATA.NOTES, 3), task = todayTask(), is12 = latestIssue(), tz = DATA.TEASERS[is12.n], tzOpen = ((S.teaser || {})[is12.n] || []).length;
  const w = weekTheme(), wDone = ((S.weekly || {})[weekIndex() + ':' + w.id] || []).length, mItems = merakItems(), mSeen = merakSeen();
  const steps = pathSteps(), n = steps.filter(s => s.state === 'done').length, cur = steps.findIndex(s => s.state === 'open');
  const progTxt = n === 0 ? 'Yolun hazır! İlk adım: okumak.' : n === 4 ? 'Bugünkü yolun tamam! 🏁' : `Yolun 4 adımından ${{ 1: "1'i", 2: "2'si", 3: "3'ü" }[n]} tamam.`;
  const c = todayCountry(), ex = weekExperiment(), sp = weekSurprise(), fact = pickDay(DATA.FACTS, 9);
  const spOpened = S.surprise[weekIndex()];
  const team = DATA.CHARACTERS.find(x => x.id === (S.profile?.team || S.team));
  const gpool = DATA.GAMES.filter(g => !isMinik() || g.minik), newGames = gpool.filter(g => g.isNew).concat(gpool.filter(g => !g.isNew)).slice(0, 8);

  pg.innerHTML = `
  <section class="yol" aria-label="Bugünkü Kechy yolu">
    ${HERO_DECOR()}
    <div class="yol-in">
      <div class="yol-head">
        <a class="yol-cover live" href="#yeni-${is12.n}" aria-label="Kechy ${is12.n}: sürprizleri aç"><span class="cvwrap">${Art.coverHTML(is12)}<span class="shine"></span></span><span class="sticker">YENİ SAYI!</span><span class="spark s1">✨</span><span class="spark s2">⭐</span><span class="spark s3">✨</span></a>
        <div class="yol-txt">
          <span class="eyebrow" style="color:var(--ink)">${cap(fmtDate())} · ${icon} ${greet}, ${esc(nick)}!</span>
          <h1>Kechy ${is12.n} geldi: <span class="hl2">${esc(is12.slogan || 'Yeni sayı!')}</span></h1>
          <p class="lead">Bugünkü yolun hazır: önce oku, sonra okuduğunun sorularını çöz, ardından oyna ve genel sorularla bitir.</p>
          <a class="tzstrip" href="#yeni-${is12.n}"><span class="tzq">${(tz ? tz.items : [0, 1, 2, 3]).map((x, i) => `<i class="${i < tzOpen ? 'op' : ''}">${i < tzOpen && tz ? x[0] : '❓'}</i>`).join('')}</span><span class="stack" style="gap:0"><b>${esc(tz ? tz.hook : 'Yeni sayıda sürprizler var!')}</b><small>${tz && tzOpen >= tz.items.length ? 'Hepsini açtın, okumaya hazırsın!' : 'Dokun, sürprizleri tek tek aç →'}</small></span></a>
          <div class="hero-prog"><span class="lbl">${progTxt}</span><div class="prog"><i style="width:${n * 25}%"></i></div></div>
          ${S.profile ? '' : '<div class="row"><a class="btn berry" href="#pasaport">🛂 Kechy Pasaportunu oluştur</a><span class="small" style="color:var(--ink)">Gerçek adın gerekmez.</span></div>'}
        </div>
        <div class="yol-kechy">${Art.kechy(n === 4 ? 'happy2' : 'happy', 'kechy-bob')}</div>
      </div>
      <ol class="path">
        ${steps.map((s, i) => `<li class="step ${s.state} ${i === cur ? 'current' : ''}"><button class="card stepcard" data-i="${i}" aria-label="${i + 1}. adım: ${esc(s.t)}${s.state === 'locked' ? ' (kilitli)' : s.state === 'done' ? ' (tamamlandı)' : ''}">
          <span class="num">${s.state === 'done' ? '✓' : i + 1}</span>${i === cur ? '<span class="here">Buradasın!</span>' : ''}
          <span class="se">${s.state === 'locked' ? '🔒' : s.e}</span><b>${s.t}</b><small>${esc(s.sub)}</small>
          <span class="sfoot"><span class="pill">${s.pts}</span>${s.state === 'locked' ? `<span class="lk">Önce ${i}. adım</span>` : s.state === 'done' ? '<span class="ok">Tamam!</span>' : '<span class="go">Başla →</span>'}</span>
        </button></li>`).join('')}
        <li class="step finish ${n === 4 ? 'done' : ''}" aria-label="Bitiş"><span class="flag">🏁</span><small>${n === 4 ? 'Günün kahramanı!' : 'Bitiş'}</small></li>
      </ol>
    </div>
  </section>

  <section class="grid g2">
    <button class="card fcard berry bonus" style="text-align:left;font:inherit;color:inherit;cursor:pointer"><span class="corner">🎯</span><span class="eyebrow">Bonus · Günün görevi · +20 ⭐</span>
      <div class="row" style="flex-wrap:nowrap"><span class="big">${task[0]}</span><h3>${esc(task[1])}</h3></div>${d.gorev ? '<span><span class="pill leaf">Tamamladın ✓</span></span>' : '<span class="go" style="font-family:var(--font-d);font-weight:800">Göreve bak →</span>'}</button>
    <div class="card fcard sun"><span class="corner">🐐</span><span class="eyebrow">Kechy'den</span>
      <div class="row" style="flex-wrap:nowrap"><div style="width:56px;flex-shrink:0">${Art.character('kechy', 'happy')}</div><p class="qtext" style="font-size:1.25rem;flex:1">“${esc(note)}”</p>${sayBtn('Kechy diyor ki: ' + note)}</div></div>
  </section>

  <section class="grid g2">
    <a class="card fcard weekcard only-buyuk" href="#hafta" style="background:${w.bg}"><span class="corner">${w.e}</span><span class="eyebrow">Haftanın konusu · kısa yazılar</span><div class="row" style="flex-wrap:nowrap"><span class="big">${w.e}</span><h3>${esc(w.t)}</h3></div><p>3 kısa yazı, her biri 1 dakikada okunur. ${wDone}/3 okundu.</p><div class="prog sky"><i style="width:${wDone / 3 * 100}%"></i></div></a>
    <a class="card fcard berry" href="#muzik"><span class="corner">🎵</span><span class="eyebrow">Kechy Müzik Kanalı</span><div class="row" style="flex-wrap:nowrap"><span class="big">🎶</span><h3>${DATA.SONGS.length} şarkı, karaoke ve müzik atölyesi</h3></div><p>Dinle, birlikte söyle, sonra kendi şarkını yap!</p></a>
  </section>

  <section class="sec"><div class="sec-h"><h2>🧐 Bugünün Merak Duvarı</h2><span class="pill tnum">${mSeen.length}/12</span><a class="more" href="#merak">Hepsini aç →</a><p>Ona da bak, buna da bak! 12 kutu, yarın hepsi yenilenir.</p></div>
    <div class="scroller mscroll">${mItems.map((it, i) => `<div style="width:176px;display:flex">${merakTile(it, i, mSeen.includes(i))}</div>`).join('')}</div></section>

  <section class="sec"><div class="sec-h"><h2>${is12.emoji} Kechy ${is12.n} görevleri</h2><span class="pill tnum">${missionsFor(is12.n).filter(m => m.done).length}/${missionsFor(is12.n).length}</span><a class="more" href="#dunya-${is12.n}">Sayı dünyasına gir →</a><p>Bu sayının oyunları, keşifleri ve gizli görevleri.</p></div>
    <div class="missions">${missionsFor(is12.n).map((m, i) => `<a class="card mission ${m.done ? 'done' : ''}" href="#${m.go}"><span class="mnum">${m.done ? '✓' : i + 1}</span><span class="me">${m.e}</span><b>${esc(m.t)}</b>${m.done ? '<span class="pill leaf">Tamam</span>' : '<span class="go">Başla →</span>'}</a>`).join('')}</div></section>

  <section class="grid g2">
    ${S.last ? `<a class="card fcard sun" href="#${esc(S.last.hash)}"><span class="corner">↩️</span><span class="eyebrow">Kaldığın yerden devam et</span><div class="row"><span class="big">${S.last.e}</span><h3>${esc(S.last.title)}</h3></div><span class="go" style="font-family:var(--font-d);font-weight:800">Devam et →</span></a>`
      : `<div class="card fcard sun"><span class="corner">💡</span><span class="eyebrow">Biliyor muydun?</span><div class="row" style="flex-wrap:nowrap"><span class="big">${fact[0]}</span><p>${esc(fact[1])}</p></div><a class="btn sm ghost" href="#bilgiler" style="align-self:flex-start">Daha fazlası →</a></div>`}
    <a class="card fcard berry" href="#surpriz"><span class="corner">🎁</span><span class="eyebrow">Pazar sürprizi</span>
      <div class="row"><span class="big">${sp.e}</span><div><h3>${spOpened ? 'Açtın!' : isSunday() ? 'Bugün açılıyor!' : 'Pazar açılıyor'}</h3><p class="small muted">İçinde: ${sp.t}</p></div></div>
      ${isSunday() || spOpened ? `<span><span class="pill">${spOpened ? 'Gelecek Pazar yenisi' : 'Hemen aç →'}</span></span>` : `<div class="cd">${cdHTML(countdownTo(nextSunday()))}</div>`}</a>
  </section>

  <section class="sec"><div class="sec-h"><h2>📚 Sayı dünyaları</h2><a class="more" href="#sayilar">Hepsi →</a></div>
    <div class="scroller">${shelfIssues().map(i => `<div style="width:140px">${worldTile(i)}</div>`).join('')}</div></section>

  <section class="sec"><div class="sec-h"><h2>Kechy Evreni</h2>${team ? `<span class="teamtag">${Art.character(team.id)}${team.name} takımındasın</span>` : ''}<a class="more" href="#karakterler">Takımını seç →</a></div>
    <div class="charstrip">${DATA.CHARACTERS.map(ch => `<a href="#${ch.link}" title="${ch.name}: ${ch.role}">${Art.character(ch.id)}${ch.name}<span class="small muted" style="font-weight:700">${ch.role}</span></a>`).join('')}</div></section>`;

  $$('.stepcard', pg).forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i, s = steps[i];
    if (s.state === 'locked') {
      sfx('no'); b.classList.remove('nudge'); void b.offsetWidth; b.classList.add('nudge');
      const k = steps.findIndex(x => x.state !== 'done'), nx = steps[k];
      const m = Modal.open(`<div class="reward"><div style="font-size:3.4rem">🔒</div><span class="eyebrow">Kechy Yolu sırayla ilerler</span><h2>${i + 1}. adım biraz sonra açılacak</h2>
        <p>Önce oku, sonra okuduğunun sorularını çöz, sonra oyna. Şu an ${k + 1}. adımdasın: <b>${esc(nx.t)}</b>.</p>
        <div class="row" style="justify-content:center"><button class="btn berry lg gostep">${nx.e} ${k + 1}. adıma git</button>${s.k === 'oyun' ? '<a class="btn ghost" href="#oyna" data-close>🎮 Oyun Merkezi\'nde serbest oyna</a>' : ''}</div></div>`);
      $('.gostep', m).addEventListener('click', () => { Modal.close(true); nx.fn(); });
      return;
    }
    s.fn();
  }));
  $('.bonus', pg).addEventListener('click', openTask);
  if (!S.age) setTimeout(() => { if (!S.age && currentRoute === 'kechy' && !Modal.isOpen()) ageModal(true); }, 400);
  $$('.mscroll .mtile', pg).forEach(b => b.addEventListener('click', () => openMerak(+b.dataset.m, mItems, () => render())));
  const cd = $('.cd', pg);
  if (cd) { const iv = setInterval(() => { cd.innerHTML = cdHTML(countdownTo(nextSunday())); }, 30000); onLeave(() => clearInterval(iv)); }
};

function openQuestion() {
  const q = todayQuestion(), d = day();
  const m = Modal.open(`<span class="eyebrow">Günün sorusu · +10 ⭐</span><h2>🧠 Bugün biliyor musun?</h2>
    <div class="row" style="flex-wrap:nowrap;align-items:flex-start;margin-top:12px"><p class="qtext" style="flex:1">${esc(q[0])}</p>${sayBtn(q[0] + ' ' + q[1].map((o, i) => 'ABCD'[i] + ': ' + o).join('. '))}</div>
    <div class="qopts" style="margin-top:14px">${q[1].map((o, i) => `<button class="qopt" data-i="${i}"><span class="k">${'ABCD'[i]}</span>${esc(o)}</button>`).join('')}</div>
    <div class="qres" style="margin-top:14px"></div>`, { onClose: refreshHome });
  autoSay(q[0] + '. ' + q[1].join('. '));
  const show = (pick, fresh) => {
    $$('.qopt', m).forEach((b, i) => { b.disabled = true; if (i === q[2]) b.classList.add('right'); else if (i === pick) b.classList.add('wrong'); });
    const ok = pick === q[2];
    $('.qres', m).innerHTML = `<div class="explain ${ok ? '' : 'no'}"><span style="font-size:1.8rem">${ok ? '🎉' : '💡'}</span><div><b>${ok ? 'Doğru!' : `Doğru cevap: ${'ABCD'[q[2]]} — ${esc(q[1][q[2]])}.`}</b><p>${esc(q[3])}</p>${fresh ? '<p><b>+10 ⭐</b> Yeni bir şey öğrendin!</p>' : ''}</div></div>
      <div class="row" style="margin-top:14px;justify-content:center"><button class="btn berry" data-next>🎯 Günün görevi</button><a class="btn ghost" href="#oyun-quiz" data-close>🧠 Daha fazla soru</a></div>`;
    $('[data-next]', m).addEventListener('click', () => { Modal.close(true); openTask(); });
  };
  if (d.soruAns != null) show(d.soruAns, false);
  $$('.qopt', m).forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i; d.soruAns = i; S.count.soru++; act('soru', 'Günün sorusu', 10);
    sfx(i === q[2] ? 'ok' : 'no'); if (i === q[2]) boom();
    reward(10, 'Günün sorusu', b); markDaily('soru'); checkBadges(); show(i, true);
  }));
}
function openTask() {
  const t = todayTask(), d = day();
  const helper = t[2] ? { 'oyun-harf': 'Harf Avı oyununu aç', cizim: 'Çizim Stüdyosunu aç', tv: 'Kechy TV\'yi aç' }[t[2]] : '';
  const m = Modal.open(`<span class="eyebrow">Günün görevi · +20 ⭐</span><h2>🎯 Bugünün görevi</h2>
    <div class="card pad bg-berry" style="display:flex;gap:14px;align-items:center;margin-top:12px;box-shadow:none"><span style="font-size:3.2rem">${t[0]}</span><p class="qtext" style="flex:1">${esc(t[1])}</p>${sayBtn(t[1])}</div>
    ${helper ? `<p style="margin-top:12px"><a class="btn sm sky" href="#${t[2]}" data-close>${helper} →</a></p>` : ''}
    <div class="tres" style="margin-top:16px"></div>`, { onClose: refreshHome });
  autoSay('Bugünün görevi: ' + t[1]);
  const res = $('.tres', m);
  const doneView = () => { res.innerHTML = `<div class="explain"><span style="font-size:1.8rem">🏅</span><div><b>Görev tamam!</b><p>Yarın yepyeni bir görev gelecek. Bugün yaptığını bir büyüğüne anlatmayı unutma.</p></div></div>`; };
  if (d.gorev) return doneView();
  res.innerHTML = `<div class="row" style="justify-content:center"><button class="btn leaf lg">Yaptım! ✓</button><button class="btn ghost" data-close>Sonra yaparım</button></div><p class="muted small center" style="margin-top:8px">Acele yok. Görev gün boyunca burada seni bekler.</p>`;
  $('.btn.leaf', res).addEventListener('click', (e) => { sfx('stamp'); S.count.gorev++; act('gorev', t[1], 20); reward(20, 'Günün görevi', e.currentTarget); markDaily('gorev'); checkBadges(); boom(); doneView(); });
}

/* ---------- quiz engine ---------- */
function runQuiz(box, qs, o = {}) {
  let i = 0, score = 0;
  const step = () => {
    if (i >= qs.length) { o.onFinish && o.onFinish(score, qs.length, box); return; }
    const q = qs[i];
    box.innerHTML = `<div class="stack"><div class="row"><span class="pill sky">Soru ${i + 1}/${qs.length}</span><div class="prog sky" style="flex:1;min-width:120px"><i style="width:${i / qs.length * 100}%"></i></div></div>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><p class="qtext" style="flex:1">${esc(q[0])}</p>${sayBtn(q[0] + ' ' + q[1].map((x, k) => 'ABCD'[k] + ': ' + x).join('. '))}</div>
      <div class="qopts">${q[1].map((x, k) => `<button class="qopt" data-i="${k}"><span class="k">${'ABCD'[k]}</span>${esc(x)}</button>`).join('')}</div><div class="qres"></div></div>`;
    autoSay(q[0] + '. ' + q[1].join('. '));
    $$('.qopt', box).forEach(b => b.addEventListener('click', () => {
      const k = +b.dataset.i, ok = k === q[2]; if (ok) score++;
      sfx(ok ? 'ok' : 'no');
      $$('.qopt', box).forEach((x, j) => { x.disabled = true; if (j === q[2]) x.classList.add('right'); else if (j === k) x.classList.add('wrong'); });
      $('.qres', box).innerHTML = `<div class="explain ${ok ? '' : 'no'}"><span style="font-size:1.6rem">${ok ? '🎉' : '💡'}</span><div><b>${ok ? 'Doğru!' : 'Doğru cevap: ' + esc(q[1][q[2]])}</b><p>${esc(q[3])}</p></div></div>
        <div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn sky next">${i + 1 < qs.length ? 'Sonraki soru →' : 'Sonucu gör 🎉'}</button></div>`;
      const nx = $('.next', box); nx.addEventListener('click', () => { i++; step(); }); nx.focus({ preventScroll: true });
    }));
  };
  step();
}
function nextUp(box, title, sub, items) {
  box.innerHTML = `<div class="card nextup"><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}<p class="muted small">Şimdi ne yapmak istersin?</p><div class="row" style="justify-content:center">${items.map((it, i) => typeof it[1] === 'string' ? `<a class="btn ${it[2] || 'ghost'}" href="#${it[1]}">${it[0]}</a>` : `<button class="btn ${it[2] || 'ghost'}" data-k="${i}">${it[0]}</button>`).join('')}</div></div>`;
  items.forEach((it, i) => { if (typeof it[1] === 'function') $(`[data-k="${i}"]`, box).addEventListener('click', it[1]); });
  if (!reduced()) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------- OKU ---------- */
const issueTile = (i) => `<a class="issue" href="#sayi-${i.n}">${S.badges['sayi-' + i.n] ? '<span class="ok" title="Rozet kazanıldı">✓</span>' : ''}<div class="cv">${Art.coverHTML(i)}</div><b>Kechy ${i.n}</b><span class="small muted">${i.date || i.title + ' rozeti'}</span></a>`;
P.oku = (pg) => {
  const read = DATA.ISSUES.filter(i => S.issues[i.n]).length;
  const topics = ['🤖 Robotlar', '🦕 Dinozorlar', '🚀 Uzay yolculuğu', '🐾 Hayvan dostlarımız', '⚽ Spor ve oyun', '🧚 Masallar'];
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('luna')}</div><div><h1>Oku</h1><p>Kechy'nin bütün sayıları, sesli hikâyeler ve mini kitaplar. Her sayının 5 sorusunu cevapla, rozetini koleksiyonuna ekle.</p></div></header>
  <section class="sec"><div class="sec-h"><h2>Kechy Rafı</h2><span class="more" style="color:var(--ink)">${read}/${DATA.ISSUES.length} sayı okundu</span></div>
    <div class="prog sky" style="max-width:460px"><i style="width:${read / DATA.ISSUES.length * 100}%"></i></div>
    <div class="issues"><div class="issue soon" aria-label="Sıradaki sayı yakında"><div class="cv">${Art.cover({ n: latestIssue().n + 1, title: 'Yakında', emoji: '🎁', color: '#8A9BAA', date: 'Hazırlanıyor' })}</div><b>Kechy ${latestIssue().n + 1}</b><span class="small muted">Hazırlanıyor…</span></div>${shelfIssues().map(issueTile).join('')}</div></section>
  <section class="grid g2">
    <a class="card fcard weekcard" href="#hafta" style="background:${weekTheme().bg}"><span class="corner">${weekTheme().e}</span><span class="eyebrow">Haftanın konusu</span><div class="row" style="flex-wrap:nowrap"><span class="big">${weekTheme().e}</span><h3>${esc(weekTheme().t)}</h3></div><p>Aylık sayıyı beklerken her hafta yeni bir konu ve 3 kısa yazı.</p></a>
    ${DATA.NEWS.length ? `<div class="card fcard sun"><span class="eyebrow">Kechy'den haberler · kendiliğinden güncellenir</span><div class="stack news" style="gap:8px">${DATA.NEWS.slice(0, 4).map(n => `<a ${n.n ? `href="#sayi-${n.n}"` : `href="${esc(n.url)}" target="_blank" rel="noopener"`}><b>${esc(n.title)}</b><span class="small muted"> · ${n.date ? new Date(n.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span></a>`).join('')}</div></div>` : `<a class="card fcard sun" href="#merak"><span class="corner">🧐</span><span class="eyebrow">Merak Duvarı</span><h3>Bugün 12 merak kutusu</h3><p>Ona da bak, buna da bak!</p></a>`}
  </section>
  <section class="sec"><div class="sec-h"><h2>Sesli hikâyeler ve mini kitap</h2><p>Dinle ya da kendin oku. Kelimeler okundukça parlar.</p></div>
    <div class="grid g4">
      <a class="card fcard berry" href="#kitap"><span class="eyebrow">Mini kitap · Kechy 12</span><div style="width:90px">${Art.character('momo', 'happy2')}</div><h3>Arkadaşlık Kalkanı</h3><p class="small">Sayfaları çevir, hikâyeyi keşfet.</p>${S.badges.kalkan ? '<span><span class="pill leaf">Okundu ✓</span></span>' : ''}</a>
      ${DATA.AUDIO_STORIES.map(s => `<a class="card fcard sun" href="#dinle-${s.id}"><span class="eyebrow">Sesli hikâye</span><div style="width:90px">${Art.character(s.char)}</div><h3>${s.title}</h3>${S.readSeen[s.id] ? '<span><span class="pill leaf">Okundu ✓</span></span>' : '<span><span class="pill">+10 ⭐</span></span>'}</a>`).join('')}
    </div></section>
  <section class="card pad stack" style="background:var(--tint-sky)"><div class="sec-h"><h2>Kechy 13'ün konusu ne olsun?</h2><p>Oyunu kullan, editörler çocukların fikirlerini dinliyor.</p></div>
    <div class="chips vote">${topics.map(t => `<button class="chip" aria-pressed="${S.vote === t}">${t}</button>`).join('')}</div>
    <p class="small muted votemsg">${S.vote ? 'Senin oyun: ' + S.vote : 'Bir konu seç.'}</p></section>`;
  $$('.vote .chip', pg).forEach(b => b.addEventListener('click', () => {
    S.vote = b.textContent; save(); $$('.vote .chip', pg).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    $('.votemsg', pg).textContent = 'Senin oyun: ' + S.vote + '. Teşekkürler!'; sfx('ok');
  }));
};
const ISSUE_LINKS = { 1: [['harita', '🌍 Dünya haritası']], 2: [['bilgiler', '💡 Biliyor muydun?']], 3: [['oyun-uzay', '🚀 Uzay oyunu']], 4: [['lab', '🧪 Laboratuvar']], 5: [['hayvanlar', '🐙 Deniz hayvanları']],
  6: [['oyun-hayvan', '🐾 Hayvan Kurtarma']], 7: [['tv', '📺 Kechy TV']], 8: [['oyun-hafiza', '🃏 Hafıza oyunu']], 9: [['oyun-boyama', '🖍️ Boyama'], ['cizim', '🎨 Çizim Stüdyosu']], 10: [['lab-cicek', '🌼 Çiçek deneyi']], 11: [['oyun-fark', '🔍 Farkı bul']], 12: [['kitap', '🛡️ Mini kitap'], ['kasa', '🔐 Gizli kasa']] };
const pageSrc = (man, i) => man.dir + 'p' + String(i + 1).padStart(3, '0') + (man.ext || '.webp') + (man.v ? '?v=' + man.v : '');
const KIND_LABEL = { kapak: '📕 Kapak', icindekiler: '📑 İçindekiler', hikaye: '📖 Hikâye', siir: '🎶 Şiir', bilgi: '💡 Bilgi', roportaj: '🎤 Röportaj', etkinlik: '✂️ Etkinlik', boyama: '🖍️ Boyama', oyun: '🧩 Oyun', mektup: '✉️ Mektup', diger: '📄 Sayfa' };
const issueText = {};
const loadIssueText = (n, man) => issueText[n] || (issueText[n] = man.text ? fetch(`${man.dir}metin.json?v=${man.text}`).then(r => r.ok ? r.json() : []).catch(() => []) : Promise.resolve([]));

/* in-site magazine reader: page images, one page at a time, turn effect, zoom, resume; the page's text below it */
function issueReader(root, is, man, onRead, start) {
  let cur = Math.min(start != null ? start : (S.pages[is.n] || 0), man.count - 1), shownAt = Date.now(), readToday = 0, done = false, texts = [];
  const seen = new Set();
  root.innerHTML = `<div class="reader">
    <div class="rstage"><button class="rnav prev" aria-label="Önceki sayfa">‹</button>
      <div class="rpage"><img alt="" draggable="false"></div>
      <button class="rnav next" aria-label="Sonraki sayfa">›</button></div>
    <div class="rbar"><span class="pill sky tnum pno"></span><div class="prog sky" style="flex:1;min-width:100px"><i></i></div><button class="btn sm ghost zoom">🔍 Büyüt</button></div>
    <article class="rtext card" hidden aria-live="polite"></article></div>`;
  const img = $('.rpage img', root), page = $('.rpage', root), rt = $('.rtext', root);
  const fillText = () => {
    const [kind, title, full] = texts[cur] || [];
    rt.hidden = !full && !title;
    if (rt.hidden) return;
    // the heading is shown once: drop it from the start of the body when the page repeats it there
    // (the spoken text keeps tools/export_texts.js's formula so it matches the recording)
    const spoken = (title && !full.startsWith(title) ? title + '. ' : '') + full;
    const text = title && fold(full).startsWith(fold(title)) ? full.slice(title.length).replace(/^[\s.:!—-]+/, '') : full;
    rt.innerHTML = `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div class="stack" style="gap:2px;flex:1"><span class="eyebrow">${KIND_LABEL[kind] || KIND_LABEL.diger} · Sayfa ${cur + 1}</span>${title ? `<h3>${esc(title)}</h3>` : ''}</div>${full ? sayBtn(spoken, 'Bu sayfayı oku') : ''}</div>
      ${text ? `<div class="rbody${kind === 'siir' ? ' poem' : ''}">${text.split(/\n{2,}/).map(par => `<p>${esc(par).replace(/\n/g, '<br>')}</p>`).join('')}</div>` : ''}`;
  };
  loadIssueText(is.n, man).then((t) => { texts = t || []; fillText(); });
  const show = (dir) => {
    Voice.stop(); fillText();
    img.src = pageSrc(man, cur); img.alt = `Kechy ${is.n}, sayfa ${cur + 1}` + (texts[cur] && texts[cur][1] ? ': ' + texts[cur][1] : '');
    if (dir && !reduced()) { page.classList.remove('turn-l', 'turn-r'); void page.offsetWidth; page.classList.add(dir > 0 ? 'turn-r' : 'turn-l'); }
    $('.pno', root).textContent = `Sayfa ${cur + 1} / ${man.count}`;
    $('.prog i', root).style.width = ((cur + 1) / man.count * 100) + '%';
    $('.prev', root).disabled = cur === 0; $('.next', root).disabled = cur >= man.count - 1;
    if (cur + 1 < man.count) { const p = new Image(); p.src = pageSrc(man, cur + 1); }
    S.pages[is.n] = Math.max(S.pages[is.n] || 0, cur); save();
    shownAt = Date.now();
  };
  const leave = () => {
    if (Date.now() - shownAt >= 3000 && !seen.has(cur)) { seen.add(cur); readToday++; }
    if (!done && (readToday >= 6 || (cur >= man.count - 1 && readToday >= Math.min(6, man.count)))) { done = true; onRead(); }
    if (cur >= man.count - 1 && readToday >= Math.min(6, man.count) && !S.issues[is.n]) { S.issues[is.n] = true; save(); }
  };
  const next = () => { if (cur >= man.count - 1) return; leave(); cur++; sfx('flip'); show(1); if (cur === man.count - 1) setTimeout(leave, 3100); };
  const prev = () => { if (cur <= 0) return; leave(); cur--; sfx('flip'); show(-1); };
  $('.next', root).addEventListener('click', next); $('.prev', root).addEventListener('click', prev);
  let x0 = null;
  page.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  page.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (dx < -40) next(); else if (dx > 40) prev(); });
  const kh = (e) => { if (Modal.isOpen()) return; if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
  window.addEventListener('keydown', kh); onLeave(() => { window.removeEventListener('keydown', kh); leave(); });
  $('.zoom', root).addEventListener('click', () => Modal.open(`<div class="zoomview"><img src="${pageSrc(man, cur)}" alt="Kechy ${is.n}, sayfa ${cur + 1}"></div>`, { cls: 'wide' }));
  show(0);
}

P.sayi = (pg, param) => {
  const [num, at] = String(param || '').split('-').map(Number);
  const is = DATA.ISSUES.find(x => x.n === num) || DATA.ISSUES[11];
  setLast('sayi-' + is.n, 'Kechy ' + is.n, is.emoji);
  const b = DATA.BADGES.find(x => x.id === 'sayi-' + is.n), man = DATA.PAGES[is.n];
  pg.innerHTML = `${isMinik() ? `<a class="crumb" href="#dunya-${is.n}">← Kechy ${is.n}</a>` : '<a class="crumb" href="#oku">← Kechy Rafı</a>'}
    <header class="pagehead"><div><span class="eyebrow">${is.date || 'Kechy Kids'} · ${is.title} sayısı</span><h1>Kechy ${is.n}${is.slogan ? ': ' + is.slogan : ''}</h1>
      <p>${is.topic ? 'Bu sayının konusu akran zorbalığı: arkadaşını korumak, farklılıkları sevmek ve yardım istemek.' : is.theme ? esc(is.theme) : `Oku, sonra 5 soruyu cevapla ve <b>${is.title}</b> rozetini kazan.`}</p></div></header>
    <section class="readwrap"></section>
    <div class="row">${(ISSUE_LINKS[is.n] || []).map(([hh, t]) => `<a class="btn sm ghost" href="#${hh}">${t}</a>`).join('')}</div>
    <section class="sec card pad" id="quiz"><div class="sec-h"><h2>Kechy ${is.n} · 5 soru</h2><div class="row" style="flex-wrap:nowrap"><div style="width:54px">${Art.badge(b)}</div><span class="small muted bmsg">${S.badges[b.id] ? 'Rozet koleksiyonunda! 🎉' : 'Cevapla, rozeti kazan.'}</span></div></div><div class="quizbox"></div></section>`;
  const wrap = $('.readwrap', pg);
  if (man) {
    issueReader(wrap, is, man, () => { S.issues[is.n] = S.issues[is.n] || (S.pages[is.n] >= man.count - 1); readDone(wrap, 'Kechy ' + is.n + ' okundu', 'sayi' + is.n); toast('📖 Bugünkü okuman tamam! Şimdi soruları çözebilirsin.'); }, at > 0 ? at - 1 : null);
  } else {
    wrap.innerHTML = `<div class="issue-hero"><div class="cvbig">${Art.coverHTML(is)}</div><div class="stack">
      <div class="note" style="background:var(--tint-sky)"><span style="font-size:1.6rem">📖</span><div class="stack" style="gap:6px"><b style="font-family:var(--font-d);font-size:1.15rem">Bu sayının sayfaları çok yakında burada açılacak.</b><p>Dergiyi basılı olarak okuduysan aşağıdaki düğmeye bas ve soruları çöz.</p></div></div>
      ${is.n === 12 ? '<a class="btn berry lg" href="#kitap">🛡️ Şimdilik Kechy 12\'den mini kitabı oku</a>' : ''}
      <button class="btn ghost readbtn">${S.issues[is.n] ? 'Okundu ✓' : '✓ Basılı dergiyi okudum'}</button></div></div>`;
    const rb = $('.readbtn', wrap);
    rb.addEventListener('click', () => { if (S.issues[is.n]) return; S.issues[is.n] = true; readDone(rb, 'Kechy ' + is.n, 'sayi' + is.n); rb.textContent = 'Okundu ✓'; sfx('stamp'); });
  }
  if (isMinik()) { $('#quiz', pg).remove(); return; } // little ones listen to the pages; the 5 questions are for 7-12
  if (!(DATA.ISSUE_QUIZ[is.n] || []).length) $('.quizbox', pg).innerHTML = '<p class="muted">Bu sayının soruları editörler tarafından hazırlanıyor.</p>';
  else runQuiz($('.quizbox', pg), DATA.ISSUE_QUIZ[is.n], { onFinish: (score, total, box) => finishQuiz(quizFor('sayi' + is.n), score, total, box) });
};

function finishQuiz(q, score, total, box) {
  const first = q.badge && !S.badges[q.badge];
  act('quiz', q.title, score * 4); reward(Math.max(2, score * 4), q.title, box);
  markDaily('sayisoru', box);
  if (q.issue) S.issues[q.issue] = true;
  if (q.badge) award(q.badge);
  save(); if (score >= Math.ceil(total / 2)) boom();
  const gid = todayGame();
  nextUp(box, `🎉 ${total} sorudan ${score} doğru!`, first ? 'Rozetin koleksiyonuna eklendi.' : 'Sıradaki adım: günün oyunu!',
    [['🎮 Günün oyunu', 'oyun-' + gid, 'leaf'], ['🔁 Tekrar çöz', () => render(), 'ghost'], ['🏠 Kechy Yolu', 'kechy', 'ghost']]);
}

P.test = (pg, key) => {
  const q = quizFor(key);
  if (!q) { location.hash = 'kechy'; return; }
  const d = day(), readOk = d.readItem === key || d.oku || S.settings.seq === false;
  pg.innerHTML = `<a class="crumb" href="#kechy">← Kechy Yolu</a>
    <header class="pagehead"><div class="art">${Art.character('luna', 'happy2')}</div><div><span class="eyebrow">Yolun 2. adımı</span><h1>🧠 ${esc(q.title)}</h1><p>Okuduğunu hatırlıyor musun? Her doğru cevap +4 ⭐.</p></div></header>
    <section class="card pad"><div class="quizbox"></div></section>`;
  const box = $('.quizbox', pg);
  if (!readOk) {
    const rt = readTarget();
    box.innerHTML = `<div class="empty"><span style="font-size:2.6rem">📖</span><b style="font-family:var(--font-d);font-size:1.2rem">Önce okuyalım!</b><p>Bu sorular okuduğun sayfalardan geliyor. Önce 1. adımı bitir.</p><a class="btn berry" href="#${rt.go}">📖 ${esc(rt.t)}</a></div>`;
    return;
  }
  runQuiz(box, q.qs, { onFinish: (score, total) => finishQuiz(q, score, total, box) });
};

P.dinle = (pg, param) => {
  const st = DATA.AUDIO_STORIES.find(x => x.id === param) || DATA.AUDIO_STORIES[0];
  setLast('dinle-' + st.id, st.title, st.e);
  let off = 0; const spans = [];
  const html = st.text.split(/(\s+)/).map(w => { const s0 = off; off += w.length; if (!w.trim()) return w; spans.push([s0, off]); return `<span class="w">${esc(w)}</span>`; }).join('');
  const minSec = S.readSeen[st.id] ? 0 : Math.round(spans.length * .3);
  pg.innerHTML = `<a class="crumb" href="#oku">← Oku</a>
    <section class="twocol"><article class="card storycard">
      <div class="row" style="flex-wrap:nowrap"><div style="width:84px;flex-shrink:0">${Art.character(st.char)}</div><div><span class="eyebrow">Hikâye</span><h1 style="font-size:2rem">${st.title}</h1></div></div>
      <div class="row">${Voice.ok ? '<button class="btn sky play">▶ Dinle</button><button class="chip slow" aria-pressed="false">🐢 Yavaş oku</button>' : ''}<button class="btn leaf done" ${minSec ? 'disabled' : ''}>✓ Okudum</button></div>
      ${DATA.STORY_SCENES[st.id] ? `<div class="scwrap">${pageArt('story-' + st.id, DATA.STORY_SCENES[st.id])}</div>` : ''}
      <p class="readalong">${html}</p><div class="after"></div></article>
      <aside class="stack"><h2 style="font-size:1.4rem">Diğer hikâyeler</h2>${DATA.AUDIO_STORIES.filter(x => x !== st).map(s => `<a class="card ep" href="#dinle-${s.id}"><span class="e bg-sun">${s.e}</span><span><b>${s.title}</b><span class="small muted">${S.readSeen[s.id] ? 'Okundu ✓' : 'Hikâye'}</span></span></a>`).join('')}
      <a class="card ep" href="#kitap"><span class="e bg-berry">🛡️</span><span><b>Arkadaşlık Kalkanı</b><span class="small muted">Mini kitap</span></span></a></aside></section>`;
  const ws = $$('.readalong .w', pg), doneBtn = $('.done', pg);
  let playing = false, fallback = null, gotBoundary = false, left = minSec;
  if (left) {
    doneBtn.textContent = `✓ Okudum (${left} sn)`;
    const iv = setInterval(() => { left--; if (left <= 0) { clearInterval(iv); doneBtn.disabled = false; doneBtn.textContent = '✓ Okudum'; } else doneBtn.textContent = `✓ Okudum (${left} sn)`; }, 1000);
    onLeave(() => clearInterval(iv));
  }
  const mark = (k) => { ws.forEach((w, j) => w.classList.toggle('on', j === k)); };
  const complete = (src) => {
    const fresh = !S.readSeen[st.id];
    if (fresh) { S.readSeen[st.id] = true; reward(10, st.title, src); boom(); }
    readDone(src, st.title, st.id);
    doneBtn.disabled = true; doneBtn.textContent = 'Okundu ✓';
    nextUp($('.after', pg), '🎉 Hikâye bitti!', 'Sıradaki adım: okuduğunun soruları.', [['🧠 Soruları çöz', 'test-' + st.id, 'berry'], ['📚 Başka hikâye', 'oku', 'ghost'], ['🏠 Kechy Yolu', 'kechy', 'ghost']]);
  };
  const stop = () => { playing = false; clearInterval(fallback); Voice.stop(); mark(-1); const p = $('.play', pg); if (p) p.textContent = '▶ Dinle'; };
  onLeave(stop);
  $('.play', pg)?.addEventListener('click', (e) => {
    if (playing) return stop();
    if (!S.settings.voice) return toast('Sesli okuma kapalı (Ebeveyn ayarları)');
    playing = true; gotBoundary = false; e.currentTarget.textContent = '⏸ Durdur';
    const slow = $('.slow', pg).getAttribute('aria-pressed') === 'true', rate = slow ? .75 : .95;
    Voice.say(st.text, {
      rate,
      onboundary: (ev) => { if (ev.name && ev.name !== 'word') return; gotBoundary = true; clearInterval(fallback); const k = spans.findIndex(([a, b]) => ev.charIndex >= a && ev.charIndex < b); if (k >= 0) mark(k); },
      onend: () => { const was = playing; stop(); if (was) complete(doneBtn); }
    });
    let k = 0; const per = 420 / rate;
    setTimeout(() => { if (playing && !gotBoundary) fallback = setInterval(() => { if (k < ws.length) mark(k++); }, per); }, 900);
  });
  $('.slow', pg)?.addEventListener('click', (e) => { const b = e.currentTarget; b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); });
  doneBtn.addEventListener('click', (e) => { stop(); complete(e.currentTarget); });
};

P.kitap = (pg) => {
  setLast('kitap', 'Mini Kitap: Arkadaşlık Kalkanı', '🛡️');
  const pages = DATA.BOOK, N = pages.length + 1;
  const cover = `<div class="bookpage" style="background:var(--tint-sky);align-items:center;text-align:center;justify-content:center"><span class="eyebrow">Kechy 12'den bir mini kitap</span><h2 style="font-size:2.2rem">Arkadaşlık Kalkanı</h2><div class="ill" style="max-height:170px">${['kechy', 'momo'].map(c => `<div class="illc">${Art.character(c, 'happy2')}</div>`).join('')}</div><p class="small muted">Sayfayı çevirmek için dokun →</p></div>`;
  const leaf = (p, i) => `<div class="bookpage">${sayBtn(p.t, 'Bu sayfayı oku').replace('class="say"', 'class="say" style="position:absolute;top:12px;right:12px;z-index:2"')}<div class="ill scill">${DATA.BOOK_SCENES[i - 1] ? pageArt('book-' + i, DATA.BOOK_SCENES[i - 1]) : p.ill.map(c => `<div class="illc">${Art.character(c, p.expr || 'happy')}</div>`).join('')}</div><p>${esc(p.t)}</p><span class="pno">${i}/${pages.length}</span></div>`;
  pg.innerHTML = `<a class="crumb" href="#oku">← Oku</a>
    <header class="pagehead"><div><span class="eyebrow">Kechy 12 · Zorba olma, kanka ol!</span><h1>Arkadaşlık Kalkanı</h1><p>Kechy, arkadaşı Momo'ya nasıl yardım ettiğini anlatıyor. Her sayfayı okumaya zaman ver.</p></div></header>
    <div class="book">
      <div class="bleaf-end face" style="position:absolute;inset:0;border-radius:6px 18px 18px 6px;border:var(--bw) solid var(--line);background:var(--tint-sun);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:20px">
        <div style="font-size:4rem">🛡️</div><h2>Sen de bir Arkadaşlık Kalkanısın!</h2><p>Yalnız kalanı oyuna çağır. Kötü söze “Bu doğru değil” de. Güvendiğin bir büyüğe anlat.</p></div>
      ${[cover, ...pages.map((p, i) => leaf(p, i + 1))].map((c, i) => `<div class="bleaf" data-i="${i}" style="z-index:${N - i}"><div class="face">${c}</div><div class="face back"></div></div>`).join('')}
    </div>
    <div class="row" style="justify-content:center"><button class="btn ghost prev">◀ Önceki</button><span class="pill sky tnum pgno">Kapak</span><button class="btn sky next">Sonraki ▶</button></div>
    <div class="after"></div>`;
  const leaves = $$('.bleaf', pg); let cur = 0, shownAt = Date.now(), fast = 0;
  const upd = () => { $('.pgno', pg).textContent = cur === 0 ? 'Kapak' : cur >= N ? 'Son' : `Sayfa ${cur}/${pages.length}`; $('.prev', pg).disabled = cur === 0; $('.next', pg).disabled = cur >= N; };
  const finish = () => {
    if (fast > Math.floor(pages.length / 2)) {
      nextUp($('.after', pg), '🙂 Çok hızlı çevirdin!', 'Hikâyeyi okumak için her sayfaya biraz zaman ver. Baştan okumaya ne dersin?', [['📖 Baştan oku', () => render(), 'sky'], ['🏠 Kechy Yolu', 'kechy', 'ghost']]);
      return;
    }
    const fresh = !S.readSeen.kitap;
    S.readSeen.kitap = true;
    if (fresh) reward(15, 'Mini kitap', $('.book', pg));
    readDone($('.book', pg), 'Arkadaşlık Kalkanı', 'kitap'); award('kalkan'); boom();
    nextUp($('.after', pg), '🛡️ Kitap bitti!', 'Sıradaki adım: okuduğunun soruları.', [['🧠 Kechy 12 soruları', 'test-kitap', 'berry'], ['📚 Başka hikâye', 'oku', 'sky'], ['🏠 Kechy Yolu', 'kechy', 'ghost']]);
  };
  const next = () => {
    if (cur >= N) return; Voice.stop();
    if (cur > 0 && Date.now() - shownAt < 2500) fast++;
    leaves[cur].classList.add('flipped'); cur++; sfx('flip'); upd(); shownAt = Date.now();
    if (cur === N) finish();
  };
  const prev = () => { if (cur <= 0) return; Voice.stop(); cur--; leaves[cur].classList.remove('flipped'); sfx('flip'); upd(); shownAt = Date.now(); };
  $('.next', pg).addEventListener('click', next); $('.prev', pg).addEventListener('click', prev);
  const book = $('.book', pg); let x0 = null;
  book.addEventListener('pointerdown', (e) => { if (e.target.closest('.say')) return; x0 = e.clientX; });
  book.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (dx > 40) prev(); else next(); });
  const kh = (e) => { if (Modal.isOpen()) return; if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
  window.addEventListener('keydown', kh); onLeave(() => window.removeEventListener('keydown', kh));
  upd();
};

/* ---------- KEŞFET ---------- */
P.kesfet = (pg) => {
  const c = todayCountry(), ex = weekExperiment(), fact = pickDay(DATA.FACTS, 9);
  const tiles = [
    ['harita', '🗺️', 'Dünya Haritası', `${Object.keys(S.stamps).length}/${DATA.COUNTRIES.length} ülke keşfettin. Bugün: ${c.name}.`, 'sky'],
    ['hayvanlar', '🐘', 'İnanılmaz Hayvanlar', 'Kartı çevir, süper güçlerini öğren.', 'horn'],
    ['lab', '🧪', 'Kechy Laboratuvarı', `Bu hafta: ${ex.title}.`, 'lilac'],
    ['tv', '📺', 'Kechy TV', 'Kısa bölümler, uzun merak.', 'ocean'],
    ['bilgiler', '💡', 'Biliyor muydun?', `${DATA.FACTS.length} şaşırtıcı bilgi kartı.`, 'sun'],
    ['oyun-uzay', '🚀', 'Uzaya Git', 'Gezegenleri doğru sıraya koy.', 'berry'],
    ['muzik', '🎵', 'Kechy Müzik', 'Şarkılar, karaoke ve müzik atölyesi.', 'lilac'], ['merak', '🧐', 'Merak Duvarı', 'Bugün 12 merak kutusu seni bekliyor.', 'horn']
  ];
  pg.innerHTML = `<header class="pagehead"><div class="art">${Art.character('kechy', 'wow')}</div><div><h1>Keşfet</h1><p>Ülkeler, hayvanlar, uzay ve deneyler. Merak ettiğin her şey burada.</p></div></header>
    <div class="grid g4">${tiles.map(([hh, e, t, dsc, col]) => `<a class="card fcard ${col}" href="#${hh}"><span class="corner">${e}</span><span class="big">${e}</span><h3>${t}</h3><p>${dsc}</p></a>`).join('')}</div>
    <section class="apodbox"></section>
    <section class="card pad row" style="background:var(--tint-leaf);flex-wrap:nowrap"><span style="font-size:3rem">${fact[0]}</span><div class="stack" style="gap:4px"><span class="eyebrow">Günün bilgisi</span><p class="qtext" style="font-size:1.2rem">${esc(fact[1])}</p></div>${sayBtn(fact[1])}</section>`;
  loadApod().then(a => {
    const bx = $('.apodbox', pg); if (!a || !bx || currentRoute !== 'kesfet') return;
    bx.innerHTML = `<div class="card apod"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy"><div class="stack" style="gap:6px"><span class="eyebrow">Kendiliğinden güncellenir · NASA</span><h3>🔭 Günün uzay fotoğrafı</h3><p><b>${esc(a.title)}</b></p><p class="small muted">Her gün yeni bir fotoğraf gelir. ${a.copyright ? '© ' + esc(a.copyright) : 'Kaynak: NASA APOD'}</p></div></div>`;
  });
};

P.harita = (pg, param) => {
  const byCode = Object.fromEntries(DATA.COUNTRIES.map(c => [c.code, c]));
  let sel = byCode[param] || todayCountry();
  setLast('harita', 'Dünya Haritası', '🗺️');
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.character('kechy')}</div><div><h1>Kechy'nin Dünya Haritası</h1><p>Bir ülkeye dokun, bilgi kartını aç ve pasaportuna damga kazan. <b class="cnt">${Object.keys(S.stamps).length}/${DATA.COUNTRIES.length}</b> ülke keşfettin.</p></div></header>
    <div class="mapwrap"><div id="world" aria-label="Dünya haritası"><div class="empty" style="border:0;height:100%;justify-content:center">🌍 Harita yükleniyor…</div></div><aside class="card cinfo" aria-live="polite"></aside></div>
    <section class="sec"><div class="sec-h"><h2>Ülke listesi</h2><p>Mavi ülkelerin bilgi kartı var, yeşiller pasaportunda.</p></div>
      <div class="clist">${DATA.COUNTRIES.map(c => `<button class="cbtn ${S.stamps[c.code] ? 'got' : ''}" data-c="${c.code}"><span class="flag">${c.flag}</span>${c.name}</button>`).join('')}</div></section>`;
  const info = $('.cinfo', pg);
  let mapObj = null;
  const paint = () => {
    $$('#world path[data-code]').forEach(p => {
      const code = p.getAttribute('data-code');
      p.classList.toggle('rg-card', !!byCode[code]); p.classList.toggle('rg-got', !!S.stamps[code]); p.classList.toggle('rg-sel', sel && code === sel.code);
    });
  };
  const show = (c, fromMap) => {
    if (!c) return;
    sel = c; paint();
    const got = S.stamps[c.code], idx = Object.keys(S.stamps).indexOf(c.code);
    info.innerHTML = `<span class="eyebrow">${c === todayCountry() ? 'Bugünün ülkesi' : c.cont}</span>
      <div class="row" style="flex-wrap:nowrap"><span class="flag fl">${c.flag}</span><div><h2 style="font-size:1.8rem">${c.name}</h2><p class="muted">“${esc(c.hello)}!” diye selamlaşırlar.</p></div></div>
      <dl><dt>Başkent</dt><dd>${c.cap}</dd><dt>Dil</dt><dd>${c.lang}</dd><dt>Kıta</dt><dd>${c.cont}</dd></dl>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><p style="flex:1">💡 ${esc(c.fact)}</p>${sayBtn(`${c.name}. Başkenti ${c.cap}. ${c.fact}`)}</div>
      <div class="stampzone">${got ? Art.stamp(c, got, idx) : '<button class="btn leaf block stampbtn">🛂 Keşfettim! Damga al (+5 ⭐)</button>'}</div>`;
    $('.stampbtn', info)?.addEventListener('click', (e) => {
      S.stamps[c.code] = shortDate(); S.count.ulke++; act('ulke', c.name + ' keşfedildi', 5); save();
      sfx('stamp'); reward(5, c.name, e.currentTarget);
      $('.stampzone', info).innerHTML = Art.stamp(c, S.stamps[c.code], Object.keys(S.stamps).length - 1).replace('class="stamp"', 'class="stamp new"');
      $(`.cbtn[data-c="${c.code}"]`, pg)?.classList.add('got'); $('.cnt', pg).textContent = `${Object.keys(S.stamps).length}/${DATA.COUNTRIES.length}`;
      paint(); checkBadges();
    });
    if (!fromMap && window.innerWidth < 900) info.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' });
  };
  show(sel, true);
  $$('.cbtn', pg).forEach(b => b.addEventListener('click', () => show(byCode[b.dataset.c])));
  loadScript(LIB.map).then(() => loadScript(LIB.world)).then(() => {
    if (currentRoute !== 'harita') return;
    const el = $('#world'); el.innerHTML = '';
    mapObj = new jsVectorMap({
      selector: '#world', map: 'world', zoomButtons: true, zoomOnScroll: false, backgroundColor: 'transparent',
      regionStyle: { initial: { fill: '#D5E3DC', stroke: '#1D2E42', strokeWidth: .5, fillOpacity: 1 }, hover: { fillOpacity: 1, cursor: 'pointer' }, selected: {} },
      onRegionClick: (ev, code) => {
        if (byCode[code]) return show(byCode[code], true);
        const nm = (window.jsVectorMap?.maps?.world?.paths?.[code]?.name) || code;
        info.innerHTML = `<span class="eyebrow">Yakında</span><h2 style="font-size:1.6rem">🌐 ${esc(nm)}</h2><p>Bu ülkenin bilgi kartını Kechy hazırlıyor. Şimdilik mavi renkli ${DATA.COUNTRIES.length} ülkeyi keşfedebilirsin.</p>`;
      },
      onRegionTooltipShow: (ev, tip, code) => { try { if (byCode[code]) tip.text(byCode[code].name + (S.stamps[code] ? ' ✓' : '')); } catch (e) { } }
    });
    paint();
    onLeave(() => { try { mapObj.destroy && mapObj.destroy(); } catch (e) { } $$('.jvm-tooltip').forEach(t => t.remove()); });
  }).catch(() => { const el = $('#world'); if (el) el.innerHTML = '<div class="empty" style="border:0;height:100%;justify-content:center">Harita şu an yüklenemedi. Aşağıdaki listeden ülke seçebilirsin.</div>'; });
};

P.hayvanlar = (pg) => {
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.character('momo')}</div><div><h1>İnanılmaz Hayvanlar</h1><p>Momo'nun hayvan kartları. Karta dokun, arkasını çevir, süper gücünü öğren.</p></div></header>
    <div class="grid gauto">${DATA.ANIMALS.map((a, i) => `<button class="flipcard" data-i="${i}" aria-label="${a.name} kartını çevir"><div class="in">
      <div class="f ${['bg-sky', 'bg-sun', 'bg-leaf', 'bg-berry', 'bg-lilac', 'bg-horn'][i % 6]}"><span class="e">${a.e}</span><b>${a.name}</b><span class="small muted">Çevirmek için dokun</span></div>
      <div class="b"><h4>${a.e} ${a.name}</h4><p><b>Yaşadığı yer:</b> ${a.home}</p><p><b>Besini:</b> ${a.food}</p><p><b>Süper gücü:</b> ${a.power}</p><p>💡 ${a.fact}</p></div></div></button>`).join('')}</div>
    <a class="card banner" href="#oyun-hayvan" style="background:var(--tint-horn)"><div style="font-size:3.5rem">🐾</div><div><span class="eyebrow">Oyun</span><h2>Hayvan Kurtarma</h2><p>Her hayvanı kendi evine götür.</p></div><span class="btn horn">Oyna →</span></a>`;
  $$('.flipcard', pg).forEach(b => b.addEventListener('click', () => {
    b.classList.toggle('on'); sfx('flip');
    if (b.classList.contains('on')) { const a = DATA.ANIMALS[+b.dataset.i]; if (S.settings.voice && Voice.ok) Voice.say(`${a.name}. Süper gücü: ${a.power}. ${a.fact}`); }
  }));
};

P.bilgiler = (pg) => {
  let i = DATA.FACTS.indexOf(pickDay(DATA.FACTS, 9));
  const cols = ['var(--tint-sun)', 'var(--tint-sky)', 'var(--tint-berry)', 'var(--tint-leaf)', 'var(--tint-lilac)', 'var(--tint-horn)'];
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.character('piko')}</div><div><h1>Biliyor muydun?</h1><p>Piko'nun şaşırtıcı bilgi kartları. Birini öğren, akşam yemeğinde ailene anlat!</p></div></header>
    <div class="factdeck"></div>
    <div class="row" style="justify-content:center"><button class="btn ghost prev">◀</button><span class="pill sky tnum no"></span><button class="btn sun next">Sonraki bilgi ▶</button></div>`;
  const deck = $('.factdeck', pg);
  const draw = (dir) => {
    const f = DATA.FACTS[i];
    const old = $('.fact', deck); if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 450); }
    const card = h(`<div class="fact" style="background:${cols[i % cols.length]}"><span class="e">${f[0]}</span><p>${esc(f[1])}</p>${sayBtn(f[1])}</div>`);
    if (dir && !reduced()) { card.style.transform = 'translateX(-40px) rotate(-6deg)'; card.style.opacity = '0'; requestAnimationFrame(() => requestAnimationFrame(() => { card.style.transform = ''; card.style.opacity = ''; })); }
    deck.append(card); $('.no', pg).textContent = `${i + 1} / ${DATA.FACTS.length}`;
  };
  $('.next', pg).addEventListener('click', () => { i = (i + 1) % DATA.FACTS.length; draw(1); sfx('flip'); });
  $('.prev', pg).addEventListener('click', () => { i = (i - 1 + DATA.FACTS.length) % DATA.FACTS.length; draw(-1); sfx('flip'); });
  draw(0);
};

P.lab = (pg, param) => {
  const ex = DATA.EXPERIMENTS.find(x => x.id === param) || weekExperiment();
  const isWeek = ex === weekExperiment();
  setLast('lab-' + ex.id, 'Deney: ' + ex.title, ex.e);
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.character('mino', 'wow')}</div><div><span class="eyebrow">${isWeek ? 'Bu haftanın deneyi' : 'Deney arşivi'}</span><h1>🧪 ${ex.title}</h1><p>Mino'nun laboratuvarı. Her deneyi bir büyüğünle birlikte yap.</p></div></header>
    <section class="twocol"><div class="stack">
      <div class="card pad stack"><h2 style="font-size:1.4rem">Malzemeler</h2><div class="mats">${ex.mats.map(m => `<div class="mat"><span class="e">${m[0]}</span>${m[1]}</div>`).join('')}</div></div>
      <div class="card pad stack"><div class="row"><h2 style="font-size:1.4rem">Adımlar</h2>${sayBtn(ex.steps.map((s, k) => (k + 1) + '. ' + s).join(' '))}</div><p class="small muted">Yaptığın adıma dokun, işaretlensin.</p>
        <ol class="steps">${ex.steps.map(s => `<li tabindex="0">${esc(s)}</li>`).join('')}</ol></div>
      <div class="note"><span style="font-size:1.5rem">⚠️</span><p>${ex.safe ? esc(ex.safe) + ' ' : ''}Deneyi mutlaka bir büyüğünle birlikte yap. Malzemeleri ağzına götürme.</p></div>
    </div><div class="stack">
      <div class="card pad stack" style="background:var(--tint-lilac)"><h2 style="font-size:1.4rem">🤔 Neden oldu?</h2><button class="btn lilac whybtn">Cevabı göster</button><p class="why" hidden>${esc(ex.why)}</p></div>
      <div class="card pad stack center"><div style="font-size:3rem">${ex.e}</div><button class="btn leaf lg donebtn">${S.labs[ex.id] ? 'Bu deneyi yaptın ✓' : 'Deneyi yaptım ✓ (+30 ⭐)'}</button><p class="small muted">Deneyin fotoğrafını çekme; onun yerine çizimini yapabilirsin!</p><a class="btn sm ghost" href="#cizim">🎨 Deneyimi çiz</a></div>
      <div class="card pad stack"><h2 style="font-size:1.3rem">Deney arşivi</h2><div class="stack" style="gap:6px">${DATA.EXPERIMENTS.map(x => `<a class="row" style="text-decoration:none;gap:8px" href="#lab-${x.id}"><span style="font-size:1.4rem">${x.e}</span><b style="font-family:var(--font-d)">${x.title}</b>${S.labs[x.id] ? '<span class="pill leaf">✓</span>' : ''}${x === weekExperiment() ? '<span class="pill">Bu hafta</span>' : ''}</a>`).join('')}</div></div>
    </div></section>`;
  $$('.steps li', pg).forEach(li => { const t = () => { li.classList.toggle('ok'); sfx('pop'); }; li.addEventListener('click', t); li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } }); });
  $('.whybtn', pg).addEventListener('click', (e) => { $('.why', pg).hidden = false; e.currentTarget.remove(); sfx('ok'); });
  $('.donebtn', pg).addEventListener('click', (e) => {
    if (S.labs[ex.id]) return;
    S.labs[ex.id] = dateKey(); S.count.deney++; act('deney', ex.title, 30); reward(30, 'Deney: ' + ex.title, e.currentTarget); checkBadges(); boom(); sfx('win');
    e.currentTarget.textContent = 'Bu deneyi yaptın ✓';
  });
};

const DRAW_STEPS = ['<ellipse cx="50" cy="56" rx="27" ry="31"/>', '<path d="M39 30 C33 13 20 10 15 20"/><path d="M61 30 C67 13 80 10 85 20"/>',
  '<ellipse cx="17" cy="50" rx="12" ry="6" transform="rotate(-18 17 50)"/><ellipse cx="83" cy="50" rx="12" ry="6" transform="rotate(18 83 50)"/>',
  '<circle cx="40" cy="48" r="5.5"/><circle cx="60" cy="48" r="5.5"/>', '<ellipse cx="50" cy="69" rx="13" ry="9"/><path d="M45 74 Q50 78 55 74"/>'];
function drawStep(n) {
  if (n >= 6) return `<svg viewBox="0 0 100 100">${Art.head('goat', { expr: 'happy2' })}</svg>`;
  return `<svg viewBox="0 0 100 100" fill="none" stroke="#1D2E42" stroke-width="3" stroke-linecap="round">${DRAW_STEPS.slice(0, n - 1).join('')}<g class="draw">${DRAW_STEPS[n - 1]}</g></svg>`;
}
P.tv = (pg, param) => {
  let ep = DATA.TV.find(x => x.id === param) || DATA.TV[0];
  setLast('tv-' + ep.id, 'Kechy TV: ' + ep.title, ep.cat);
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div><h1>📺 Kechy TV</h1><p>30-90 saniyelik bölümler. Bölüm bitince otomatik başka bölüm başlamaz; ne yapacağına sen karar verirsin.</p></div></header>
    <div class="player"></div>
    <div class="ytbox"></div>
    <section class="sec"><div class="sec-h"><h2>Bölümler</h2></div><div class="eplist">${DATA.TV.map(x => `<a class="card ep" href="#tv-${x.id}" ${x === ep ? 'aria-current="true"' : ''}><span class="e" style="background:${x.bg}">${x.cat}</span><span><b>${x.title}</b><span class="small muted">${S.tvSeen[x.id] ? 'İzlendi ✓' : x.scenes.length + ' sahne'}</span></span></a>`).join('')}</div></section>`;
  const root = $('.player', pg);
  let i = 0, playing = false, timer = null, ended = false, natural = 0;
  root.innerHTML = `<div class="tvset"><div class="screen" style="background:${ep.bg}"><span class="ttl">${ep.cat} ${ep.title}</span><div class="vis"></div><div class="cap"></div><div class="endov" hidden></div></div>
    <div class="tvbar"><button class="iconbtn prev" aria-label="Önceki sahne">⏮</button><button class="iconbtn pp" aria-label="Oynat">▶</button><button class="iconbtn nx" aria-label="Sonraki sahne">⏭</button><div class="segs">${ep.scenes.map(() => '<i><b></b></i>').join('')}</div></div></div>`;
  const vis = $('.vis', root), capEl = $('.cap', root), segs = $$('.segs b', root), pp = $('.pp', root), endov = $('.endov', root);
  const clear = () => { clearTimeout(timer); Voice.stop(); };
  const setSeg = (k, dur) => segs.forEach((b, j) => { b.style.transition = 'none'; b.style.width = j < k ? '100%' : '0'; if (j === k && dur) { void b.offsetWidth; b.style.transition = `width ${dur}ms linear`; b.style.width = '100%'; } });
  const showScene = () => {
    const sc = ep.scenes[i];
    const cls = sc[2] || 'a-pop';
    vis.innerHTML = sc[0].startsWith('draw:') ? drawStep(+sc[0].split(':')[1]) : `<span class="${cls}" style="display:inline-block">${sc[0].startsWith('🇯') ? `<span class="flag">${sc[0]}</span>` : sc[0]}</span>`;
    capEl.textContent = sc[1];
    if (!playing) { setSeg(i, 0); return; }
    const words = sc[1].split(/\s+/).length, dur = Math.max(3200, words * 430) + (ep.draw ? 2200 : 0);
    setSeg(i, dur);
    let spoke = false, timeUp = false;
    const adv = () => { if (spoke && timeUp && playing) { natural++; next(); } };
    timer = setTimeout(() => { timeUp = true; if (!S.settings.voice || !Voice.ok) spoke = true; adv(); }, dur);
    if (S.settings.voice && Voice.ok) Voice.say(sc[1], { onend: () => { spoke = true; adv(); }, onerror: () => { spoke = true; adv(); } });
  };
  const next = () => { clear(); if (i < ep.scenes.length - 1) { i++; showScene(); } else end(); };
  const end = () => {
    playing = false; ended = true; pp.textContent = '▶'; setSeg(ep.scenes.length, 0);
    endov.hidden = false;
    endov.innerHTML = `<div style="font-size:3rem">🎉</div><h3 style="font-size:1.6rem">Tamamladın!</h3><p>Şimdi ne yapmak istersin?</p><div class="row" style="justify-content:center"><a class="btn" href="#oyna">🎮 Oyna</a><a class="btn sky" href="#oku">📖 Oku</a><a class="btn ghost" href="#kechy">🏠 Ana sayfa</a><button class="btn ghost again">🔁 Tekrar izle</button></div>`;
    $('.again', endov).addEventListener('click', () => { endov.hidden = true; ended = false; i = 0; natural = 0; playing = true; pp.textContent = '⏸'; showScene(); });
    if (natural < Math.ceil(ep.scenes.length * .6)) { $('p', endov).textContent = 'Bölümü atlayarak bitirdin. Ödül için bölümü baştan sona izle!'; }
    else if (!S.tvSeen[ep.id]) { S.tvSeen[ep.id] = dateKey(); S.count.tv++; act('tv', ep.title, 5); reward(5, 'Kechy TV', root); checkBadges(); }
  };
  pp.addEventListener('click', () => {
    if (ended) { endov.hidden = true; ended = false; i = 0; natural = 0; }
    playing = !playing; pp.textContent = playing ? '⏸' : '▶'; pp.setAttribute('aria-label', playing ? 'Duraklat' : 'Oynat');
    clear(); showScene();
  });
  $('.nx', root).addEventListener('click', () => { if (!ended) next(); });
  $('.prev', root).addEventListener('click', () => { if (ended) return; clear(); i = Math.max(0, i - 1); showScene(); });
  onLeave(clear);
  showScene();
  const big = h(`<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3"><button class="btn lg">▶ İzle</button></div>`);
  $('.screen', root).append(big);
  $('button', big).addEventListener('click', () => { big.remove(); pp.click(); });
  pp.addEventListener('click', () => big.remove(), { once: true });
  renderYT($('.ytbox', pg), ep);
};
function renderYT(box, ep) {
  const y = ep.yt;
  if (!box || !y || !y.id || S.settings.yt === false || /claude/.test(location.hostname)) { if (box) box.innerHTML = ''; return; }
  box.innerHTML = `<div class="card ytcard"><div class="ytthumb"><img src="https://i.ytimg.com/vi/${y.id}/hqdefault.jpg" alt="${esc(y.t)}" loading="lazy"><button class="btn lg ytplay">▶ Gerçek videoyu izle</button></div>
    <div class="stack" style="gap:6px"><span class="eyebrow">🎬 Bu konuda gerçek bir video · YouTube</span><h3>${esc(y.t)}</h3><p class="small muted">Kanal: ${esc(y.ch)}. Video YouTube'dan gelir, sadece sen dokununca açılır. YouTube kendi kurallarına göre reklam gösterebilir.</p></div></div>`;
  $('.ytplay', box).addEventListener('click', () => {
    Voice.stop();
    $('.ytthumb', box).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${y.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${esc(y.t)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    act('tv', 'YouTube: ' + y.t, 0);
  });
}
