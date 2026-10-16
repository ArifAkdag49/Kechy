/* ============ MUSIC: Kechy Müzik Kanalı + Müzik Atölyesi (all sound is synthesized in the browser) ============ */
/* Tokens: NOTE/BEATS/SYLLABLE. A syllable ending in "-" joins the next one. Chords: one root per 2 beats. */
DATA.SONGS = [
  { id: 'kechy', t: 'Kechy Küçük Dost', e: '🐐', char: 'kechy', bg: 'var(--tint-sky)', bpm: 104, meter: 4, tune: 'Ezgi: Twinkle Twinkle (halk ezgisi)',
    verses: [`C4/1/Ke- C4/1/chy, G4/1/Ke- G4/1/chy, A4/1/kü- A4/1/çük G4/2/dost
F4/1/Boy- F4/1/nuz- E4/1/la- E4/1/rı D4/1/tu- D4/1/run- C4/2/cu
G4/1/Te- G4/1/pe- F4/1/ler- F4/1/de E4/1/zıp E4/1/zıp D4/2/zıp
G4/1/Ot- G4/1/la- F4/1/rı F4/1/çok E4/1/se- E4/1/ver D4/2/o
C4/1/Ke- C4/1/chy, G4/1/Ke- G4/1/chy, A4/1/kü- A4/1/çük G4/2/dost
F4/1/Boy- F4/1/nuz- E4/1/la- E4/1/rı D4/1/tu- D4/1/run- C4/2/cu`, `C4/1/Ke- C4/1/chy, G4/1/Ke- G4/1/chy, A4/1/kü- A4/1/çük G4/2/dost
F4/1/Ki- F4/1/tap E4/1/o- E4/1/ku- D4/1/ya- D4/1/lım C4/2/mı?
G4/1/Sa- G4/1/yı F4/1/sa- F4/1/yıp E4/1/ko- E4/1/şa- D4/2/lım
G4/1/Hep G4/1/bir- F4/1/lik- F4/1/te E4/1/gü- E4/1/le- D4/2/lim
C4/1/Ke- C4/1/chy, G4/1/Ke- G4/1/chy, A4/1/kü- A4/1/çük G4/2/dost
F4/1/Kech- F4/1/y E4/1/se- E4/1/nin D4/1/dos- D4/1/tun- C4/2/dur!`],
    chords: 'C C F C F C G C C F C G C F C G C C F C F C G C' },
  { id: 'ciftlik', t: 'Kechy\'nin Çiftliği', e: '🐄', char: 'momo', bg: 'var(--tint-leaf)', bpm: 132, meter: 4, tune: 'Ezgi: Old MacDonald (halk ezgisi)',
    verses: [`G4/1/Kech- G4/1/y'- G4/1/nin D4/1/çift- E4/1/li- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/2/o R/1/ D4/1/Çift-
G4/1/lik- G4/1/te G4/1/bir D4/1/i- E4/1/ne- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/4/o
D4/1/Möö D4/1/möö G4/1/bu- G4/1/ra- G4/2/da D4/1/möö D4/1/möö G4/1/şu- G4/1/ra- G4/2/da
G4/1/Şu- G4/1/ra- G4/1/da G4/1/möö G4/1/o- G4/1/ra- G4/1/da G4/1/möö G4/1/her G4/1/yer G4/1/möö G4/1/möö
G4/1/Kech- G4/1/y'- G4/1/nin D4/1/çift- E4/1/li- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/4/o`, `G4/1/Kech- G4/1/y'- G4/1/nin D4/1/çift- E4/1/li- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/2/o R/1/ D4/1/Çift-
G4/1/lik- G4/1/te G4/1/bir D4/1/ör- E4/1/de- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/4/o
D4/1/Vak D4/1/vak G4/1/bu- G4/1/ra- G4/2/da D4/1/vak D4/1/vak G4/1/şu- G4/1/ra- G4/2/da
G4/1/Şu- G4/1/ra- G4/1/da G4/1/vak G4/1/o- G4/1/ra- G4/1/da G4/1/vak G4/1/her G4/1/yer G4/1/vak G4/1/vak
G4/1/Kech- G4/1/y'- G4/1/nin D4/1/çift- E4/1/li- E4/1/ği D4/2/var
B4/1/i- B4/1/a A4/1/i- A4/1/a G4/4/o`],
    chords: 'G G C G G D G G G G C G G D G G G G G G G G G G G G G G G G C G G D G G' },
  { id: 'uyan', t: 'Uyan Kechy', e: '⏰', char: 'luna', bg: 'var(--tint-sun)', bpm: 116, meter: 4, tune: 'Ezgi: Frère Jacques (halk ezgisi)',
    verses: [`C4/1/U- D4/1/yan E4/1/Kech- C4/1/y, C4/1/u- D4/1/yan E4/1/Kech- C4/1/y,
E4/1/Kalk F4/1/ha- G4/2/di! E4/1/Kalk F4/1/ha- G4/2/di!
G4/0.5/Kuş- A4/0.5/lar G4/0.5/ö- F4/0.5/tü- E4/1/yor- C4/1/lar, G4/0.5/kuş- A4/0.5/lar G4/0.5/ö- F4/0.5/tü- E4/1/yor- C4/1/lar,
C4/1/Cik G3/1/cik C4/2/cik, C4/1/cik G3/1/cik C4/2/cik!`, `C4/1/U- D4/1/yan E4/1/Lu- C4/1/na, C4/1/u- D4/1/yan E4/1/Lu- C4/1/na,
E4/1/Ki- F4/1/tap G4/2/aç! E4/1/Ki- F4/1/tap G4/2/aç!
G4/0.5/Ma- A4/0.5/sal- G4/0.5/lar F4/0.5/bek- E4/1/li- C4/1/yor, G4/0.5/ma- A4/0.5/sal- G4/0.5/lar F4/0.5/bek- E4/1/li- C4/1/yor,
C4/1/Hu G3/1/hu C4/2/hu, C4/1/hu G3/1/hu C4/2/hu!`],
    chords: 'C C C C C C C C C C C C C C C C' },
  { id: 'dost', t: 'Arkadaşlık Şarkısı', e: '🤝', char: 'momo', bg: 'var(--tint-berry)', bpm: 96, meter: 4, tune: 'Ezgi: Neşeye Övgü, Beethoven', issue: 12,
    verses: [`E4/1/Gel E4/1/ar- F4/1/ka- G4/1/daş G4/1/el F4/1/e- E4/1/le D4/1/ver,
C4/1/kim- C4/1/se D4/1/yal- E4/1/nız E4/1.5/kal- D4/0.5/ma- D4/2/sın.
E4/1/Hep E4/1/be- F4/1/ra- G4/1/ber G4/1/şar- F4/1/kı E4/1/söy- D4/1/le,
C4/1/dün- C4/1/ya- D4/1/mız E4/1/gü- D4/1.5/zel C4/0.5/ol- C4/2/sun!`, `E4/1/Kü- E4/1/çük F4/1/bü- G4/1/yük, G4/1/u- F4/1/zun E4/1/kı- D4/1/sa,
C4/1/zor- C4/1/ba D4/1/ol- E4/1/ma, E4/1.5/kan- D4/0.5/ka D4/2/ol!
E4/1/El E4/1/e- F4/1/le G4/1/ver, G4/1/hep F4/1/be- E4/1/ra- D4/1/ber,
C4/1/dün- C4/1/ya- D4/1/mız E4/1/gü- D4/1.5/zel C4/0.5/ol- C4/2/sun!`],
    chords: 'C C G G C C G G C C G G C C G C' },
  { id: 'mars', t: 'Kechy Marşı', e: '🎺', char: 'robo', bg: 'var(--tint-lilac)', bpm: 116, meter: 4, tune: 'Kechy\'nin kendi şarkısı',
    verses: [`G4/1/O- G4/1/ku, E4/1/oy- G4/1/na, A4/1/keş- A4/1/fet, G4/1/ü- E4/1/ret!
F4/1/Kech- F4/1/y D4/1/i- F4/1/le G4/1/her G4/1/gün E4/1/ye- C4/1/ni!
C5/1/Zıp C5/1/zıp C5/1/zıp A4/1/te- G4/1/pe- G4/1/ler- E4/2/de,
D4/1/Mer- E4/1/ha- F4/1/ba D4/1/de, E4/1/gel D4/1/sen C4/2/de!`, `G4/1/Her G4/1/me- E4/1/rak G4/1/e- A4/1/den A4/1/ka- G4/1/za- E4/1/nır!
F4/1/Ki- F4/1/ta- D4/1/bı- F4/1/nı G4/1/aç, G4/1/yo- E4/1/la C4/1/çık!
C5/1/Ha- C5/1/di C5/1/ha- A4/1/di G4/1/ar- G4/1/ka- E4/2/daş,
D4/1/Kech- E4/1/y F4/1/se- D4/1/ni E4/1/bek- D4/1/li- C4/2/yor!`],
    chords: 'C C F C F F C C F F C C G G C C' },
  { id: 'dogum', t: 'İyi ki Doğdun', e: '🎂', char: 'piko', bg: 'var(--tint-horn)', bpm: 100, meter: 3, offset: 1, tune: 'Ezgi: Happy Birthday (kamu malı)',
    verses: [`G4/0.75/İ- G4/0.25/yi A4/1/ki G4/1/doğ- C5/1/dun B4/2/{ad} R/1/
G4/0.75/İ- G4/0.25/yi A4/1/ki G4/1/doğ- D5/1/dun C5/2/{ad} R/1/
G4/0.75/İ- G4/0.25/yi G5/1/ki E5/1/doğ- C5/1/dun B4/1/{ad} A4/2/! R/1/
F5/0.75/İ- F5/0.25/yi E5/1/ki C5/1/doğ- D5/1/dun C5/3/{ad}!`] }
];
DATA.BADGES.splice(DATA.BADGES.findIndex(b => b.issue), 0,
  { id: 'muzik', name: 'Müzik Kaşifi', emoji: '🎵', color: '#E6508A', how: '3 farklı şarkıyı sonuna kadar dinle.' },
  { id: 'besteci', name: 'Küçük Besteci', emoji: '🎹', color: '#9A7FE0', how: 'Müzik Atölyesi\'nde ilk şarkını kaydet.' });
Object.assign(NAV_OF, { muzik: 'kesfet', atolye: 'uret' });

const Music = (() => {
  let ctx = null, noise = null;
  const NOTE = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
  const freq = (n) => { const m = /^([A-G]#?)(\d)$/.exec(n); return m ? 440 * Math.pow(2, (12 * (+m[2] + 1) + NOTE[m[1]] - 69) / 12) : 0; };
  const ac = () => {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  const env = (g, t, peak, dur) => { g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + dur); };
  function voice(out, kind, f, t, dur, vol = .22) {
    const c = ctx, g = c.createGain(); g.connect(out);
    const osc = (type, fr, v) => { const o = c.createOscillator(), gg = c.createGain(); o.type = type; o.frequency.setValueAtTime(fr, t); gg.gain.value = v; o.connect(gg); gg.connect(g); o.start(t); o.stop(t + dur + .1); };
    if (kind === 'piyano') { osc('triangle', f, 1); osc('sine', f * 2, .25); env(g, t, vol, Math.max(.5, dur * 1.3)); }
    else if (kind === 'oyun') { osc('square', f, .5); g.gain.setValueAtTime(vol * .45, t); g.gain.setValueAtTime(vol * .45, t + dur * .85); g.gain.linearRampToValueAtTime(.0001, t + dur * .95); }
    else { osc('sine', f, 1); osc('sine', f * 4, .28); osc('sine', f * 10, .06); env(g, t, vol, .75); }
  }
  function drum(out, kind, t) {
    const c = ctx, g = c.createGain(); g.connect(out);
    if (kind === 'kick') { const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + .14); o.connect(g); env(g, t, .55, .18); o.start(t); o.stop(t + .2); return; }
    const s = c.createBufferSource(); s.buffer = noise; const flt = c.createBiquadFilter();
    if (kind === 'hat') { flt.type = 'highpass'; flt.frequency.value = 7000; env(g, t, .09, .05); }
    else if (kind === 'clap') { flt.type = 'bandpass'; flt.frequency.value = 1500; env(g, t, .3, .12); }
    else { flt.type = 'bandpass'; flt.frequency.value = 1800; env(g, t, .22, .14); }
    s.connect(flt); flt.connect(g); s.start(t); s.stop(t + .2);
  }
  function parse(song, name) {
    const notes = [];
    song.verses.forEach((v, vi) => v.split('\n').forEach((line, li) => line.trim().split(/\s+/).forEach((tok, k) => {
      const [n, b, s = ''] = tok.split('/');
      if (!(+b > 0) || !(n === 'R' || /^[A-G]#?\d$/.test(n))) return;
      notes.push({ n, b: +b, s: s.replace('{ad}', name), br: k === 0 && (li > 0 || vi > 0), vs: vi > 0 && li === 0 && k === 0 }); })));
    return notes;
  }
  let cur = null;
  function play(song, o = {}) {
    stop();
    const c = ac(), out = c.createGain(); out.gain.value = .9; out.connect(c.destination);
    const bpm = song.bpm * (o.slow ? .8 : 1), sp = 60 / bpm, t0 = c.currentTime + .15;
    const notes = parse(song, o.name || 'Kaşif');
    let t = 0;
    notes.forEach(nt => { nt.t = t; if (nt.n !== 'R') voice(out, o.inst || 'ksilofon', freq(nt.n), t0 + t * sp, nt.b * sp * .95); t += nt.b; });
    const total = t;
    const chords = (song.chords || '').split(/\s+/).filter(Boolean);
    if (chords.length) for (let k = 0; k * 2 < total; k++) { const root = chords[k % chords.length]; voice(out, 'piyano', freq(root + '2'), t0 + k * 2 * sp, 1.8 * sp, .16); }
    const off = song.offset || 0;
    if (o.drums !== false) for (let b = 0; b < total; b++) {
      const pos = ((b - off) % song.meter + song.meter) % song.meter, tt = t0 + b * sp;
      if (pos === 0) drum(out, 'kick', tt);
      else if (song.meter === 4 && pos === 2) drum(out, 'kick', tt);
      if (song.meter === 4 && (pos === 1 || pos === 3)) drum(out, 'snare', tt);
      drum(out, 'hat', tt); if (song.meter === 4) drum(out, 'hat', tt + sp / 2);
    }
    cur = { out, t0, sp, notes, total, song, iv: 0 };
    const tick = () => {
      if (!cur) return;
      const beat = (ctx.currentTime - cur.t0) / cur.sp;
      o.onTick && o.onTick(beat, cur.total);
      if (beat >= cur.total + .5) { const done = o.onEnd; stop(); done && done(); }
    };
    cur.iv = setInterval(tick, 60);
    return { notes, total, sp };
  }
  function stop() {
    if (!cur) return;
    clearInterval(cur.iv);
    try { cur.out.gain.setTargetAtTime(0, ctx.currentTime, .02); const o = cur.out; setTimeout(() => o.disconnect(), 120); } catch (e) { }
    cur = null;
  }
  return { play, stop, parse, freq, ac, voice: (kind, n, dur = .5) => { const c = ac(); const out = c.destination; voice(out, kind, freq(n), c.currentTime + .01, dur); }, drum: (kind) => { const c = ac(); drum(c.destination, kind, c.currentTime + .01); }, isPlaying: () => !!cur };
})();

const lyricHTML = (notes) => {
  let html = '<p class="ly-line">';
  notes.forEach((nt, i) => {
    if (nt.br) html += `</p>${nt.vs ? '<p class="ly-verse">♪</p>' : ''}<p class="ly-line">`;
    if (!nt.s) return;
    const join = nt.s.endsWith('-');
    html += `<span class="syl" data-i="${i}">${esc(join ? nt.s.slice(0, -1) : nt.s)}</span>${join ? '' : ' '}`;
  });
  return html + '</p>';
};

P.muzik = (pg, param) => {
  let song = DATA.SONGS.find(s => s.id === param) || DATA.SONGS[0];
  let inst = 'ksilofon', slow = false;
  const name = (S.profile?.nick || '').split(' ')[1] || 'Kaşif';
  setLast('muzik-' + song.id, 'Kechy Müzik: ' + song.t, '🎵');
  pg.innerHTML = `<a class="crumb" href="#kesfet">← Keşfet</a>
    <header class="pagehead"><div class="art">${Art.avatar({ base: 'goat', hat: 'kulaklik', hatColor: '#E6508A', bg: 'lilac', shirt: '#1FA2B0' })}</div><div><h1>🎵 Kechy Müzik Kanalı</h1><p>Kechy'nin şarkıları. Dinle, sözleri takip et, birlikte söyle. Sonra Müzik Atölyesi'nde kendi şarkını yap!</p></div></header>
    <section class="mplayer card">
      <div class="mstage"><div class="eq">${'<i></i>'.repeat(9)}</div><div class="mchar">${Art.character(song.char, 'happy2')}</div><div class="mnotes">${'<i>♪</i><i>♫</i><i>♪</i><i>♬</i>'}</div></div>
      <div class="mbody">
        <div><span class="eyebrow mtune"></span><h2 class="mtitle"></h2></div>
        <div class="row"><button class="btn berry lg mplay">▶ Çal</button><button class="chip mslow" aria-pressed="false">🐢 Yavaş</button>
          <span class="chips minst">${[['ksilofon', '🎶 Ksilofon'], ['piyano', '🎹 Piyano'], ['oyun', '👾 8-bit']].map(([k, t]) => `<button class="chip" data-i="${k}" aria-pressed="${k === inst}">${t}</button>`).join('')}</span></div>
        <div class="prog berry"><i style="width:0"></i></div>
        <div class="lyrics" aria-live="off"></div>
      </div>
      <div class="mafter"></div>
    </section>
    <section class="sec"><div class="sec-h"><h2>Şarkılar</h2><p>Her şarkının sonunda durur. Sıradakini sen seçersin.</p></div>
      <div class="songlist">${DATA.SONGS.map(s => `<a class="card song" href="#muzik-${s.id}" data-id="${s.id}" style="background:${s.bg}"><span class="disc">${s.e}</span><span><b>${s.t}</b><span class="small muted">${S.music?.[s.id] ? 'Dinlendi ✓' : s.tune}</span></span></a>`).join('')}</div></section>
    <a class="card banner" href="#atolye" style="background:var(--tint-lilac)"><div style="font-size:3.4rem">🎹</div><div class="stack" style="gap:4px"><span class="eyebrow">Üret</span><h2>Müzik Atölyesi</h2><p>Ksilofonla kendi şarkını çal ve kaydet, ritim makinesiyle davul çal.</p></div><span class="btn lilac">Atölyeye git →</span></a>`;
  const player = $('.mplayer', pg), lyr = $('.lyrics', pg), prog = $('.prog i', pg), btn = $('.mplay', pg);
  let sylEls = [], notes = [], lastI = -1;
  const setSong = () => {
    $('.mtitle', pg).textContent = song.e + ' ' + song.t; $('.mtune', pg).textContent = song.tune;
    $('.mstage', pg).style.background = song.bg; $('.mchar', pg).innerHTML = Art.character(song.char, 'happy2');
    notes = Music.parse(song, name); { let tt = 0; notes.forEach(n => { n.t = tt; tt += n.b; }); } lyr.innerHTML = lyricHTML(notes); sylEls = $$('.syl', lyr); lastI = -1; prog.style.width = '0';
    $$('.song', pg).forEach(a => a.setAttribute('aria-current', String(a.dataset.id === song.id)));
  };
  const stopUI = () => { Music.stop(); player.classList.remove('playing'); btn.textContent = '▶ Çal'; };
  onLeave(stopUI);
  const done = (heard) => {
    stopUI(); prog.style.width = '100%';
    S.music = S.music || {};
    if (heard && isMinik() && S.ctxIssue && world(S.ctxIssue).minik.song === song.id) markStk(S.ctxIssue, 'sarki');
    if (heard && !S.music[song.id]) { S.music[song.id] = dateKey(); S.count.muzik = (S.count.muzik || 0) + 1; act('muzik', song.t, 5); reward(5, 'Şarkı: ' + song.t, btn); if (S.count.muzik >= 3) award('muzik'); save(); }
    const i = DATA.SONGS.indexOf(song), nx = DATA.SONGS[(i + 1) % DATA.SONGS.length];
    nextUp($('.mafter', pg), '🎶 Şarkı bitti!', 'Şimdi ne yapmak istersin?', [['🔁 Tekrar', () => { $('.mafter', pg).innerHTML = ''; start(); }, 'sky'], [`${nx.e} ${nx.t}`, 'muzik-' + nx.id, ''], ['🎹 Kendi şarkını yap', 'atolye', 'lilac']]);
  };
  const start = () => {
    $('.mafter', pg).innerHTML = '';
    let t0 = Date.now();
    const r = Music.play(song, {
      inst, slow, name,
      onTick: (beat, total) => {
        prog.style.width = Math.min(100, beat / total * 100) + '%';
        let k = notes.findIndex((n, j) => beat >= n.t && (j === notes.length - 1 || beat < notes[j + 1].t));
        if (k !== lastI) { lastI = k; sylEls.forEach(el => { const j = +el.dataset.i; el.classList.toggle('on', j === k); el.classList.toggle('past', j < k); }); const on = $('.syl.on', lyr); if (on) lyr.scrollTop = on.parentNode.offsetTop - lyr.offsetTop - 40; }
      },
      onEnd: () => done(Date.now() - t0 > (notes.reduce((a, n) => a + n.b, 0) * 60 / (song.bpm * (slow ? .8 : 1))) * 800)
    });
    player.style.setProperty('--beat', (r.sp) + 's');
    player.classList.add('playing'); btn.textContent = '⏹ Durdur';
  };
  btn.addEventListener('click', () => { if (Music.isPlaying()) { stopUI(); return; } start(); });
  $('.mslow', pg).addEventListener('click', (e) => { slow = !slow; e.currentTarget.setAttribute('aria-pressed', String(slow)); if (Music.isPlaying()) { stopUI(); start(); } });
  $$('.minst .chip', pg).forEach(b => b.addEventListener('click', () => { inst = b.dataset.i; $$('.minst .chip', pg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); if (Music.isPlaying()) { stopUI(); start(); } else Music.voice(inst, 'C5'); }));
  setSong();
};

const SOLFEGE = [['C4', 'Do', '#E23B3B', 'A'], ['D4', 'Re', '#F2752B', 'S'], ['E4', 'Mi', '#FFC83A', 'D'], ['F4', 'Fa', '#43AE5B', 'F'], ['G4', 'Sol', '#1FA2B0', 'G'], ['A4', 'La', '#3C7DD9', 'H'], ['B4', 'Si', '#9A7FE0', 'J'], ['C5', 'Do', '#E6508A', 'K']];
P.atolye = (pg) => {
  setLast('atolye', 'Müzik Atölyesi', '🎹');
  S.songs = S.songs || []; S.beat = S.beat || null;
  pg.innerHTML = `<a class="crumb" href="#uret">← Üret</a>
    <header class="pagehead"><div class="art">${Art.character('robo', 'happy2')}</div><div><h1>🎹 Müzik Atölyesi</h1><p>Ksilofonun tuşlarına dokun ya da klavyede A S D F G H J K tuşlarına bas. Kaydet, dinle, sakla!</p></div></header>
    <section class="card pad stack"><div class="row"><h2 style="font-size:1.4rem">Kechy Ksilofonu</h2><span class="chips xinst">${[['ksilofon', '🎶 Ksilofon'], ['piyano', '🎹 Piyano'], ['oyun', '👾 8-bit']].map(([k, t], i) => `<button class="chip" data-i="${k}" aria-pressed="${i === 0}">${t}</button>`).join('')}</span></div>
      <div class="xylo">${SOLFEGE.map(([n, l, c, k], i) => `<button class="xbar" data-n="${n}" style="--c:${c};--h:${190 - i * 10}px" aria-label="${l}"><b>${l}</b><small>${k}</small></button>`).join('')}</div>
      <div class="row"><button class="btn berry rec">⏺ Kaydet</button><button class="btn sky playrec" disabled>▶ Dinle</button><button class="btn leaf keep" disabled>💾 Şarkımı sakla</button><span class="small muted recmsg">Kaydet'e bas, sonra çal. En fazla 30 saniye.</span></div>
      <div class="mysongs stack" style="gap:6px"></div></section>
    <section class="card pad stack"><div class="row"><h2 style="font-size:1.4rem">Ritim Makinesi</h2><span class="small muted">Kutulara dokun, ritmini yap.</span></div>
      <div class="beatwrap"><div class="beatgrid"></div></div>
      <div class="row"><button class="btn berry bplay">▶ Başlat</button><button class="btn ghost brand">🎲 Karışık ritim</button><button class="btn ghost bclear">🧽 Temizle</button>
        <label class="small" for="btempo" style="font-family:var(--font-d);font-weight:700">Hız</label><input id="btempo" type="range" min="70" max="150" value="100" style="width:140px"></div></section>`;
  let inst = 'ksilofon', rec = null, recStart = 0, last = null;
  const play = (n, el) => { Music.voice(inst, n); if (el) { el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); } if (rec) { if (Date.now() - recStart > 30000 || rec.length >= 80) return stopRec(); rec.push([n, Date.now() - recStart]); $('.recmsg', pg).textContent = `Kayıt: ${rec.length} nota`; } };
  $$('.xbar', pg).forEach(b => b.addEventListener('pointerdown', (e) => { e.preventDefault(); play(b.dataset.n, b); }));
  const kh = (e) => { if (e.repeat || /INPUT|TEXTAREA/.test(document.activeElement?.tagName) || Modal.isOpen()) return; const s = SOLFEGE.find(x => x[3] === e.key.toUpperCase()); if (s) { e.preventDefault(); play(s[0], $(`.xbar[data-n="${s[0]}"]`, pg)); } };
  window.addEventListener('keydown', kh); onLeave(() => window.removeEventListener('keydown', kh));
  $$('.xinst .chip', pg).forEach(b => b.addEventListener('click', () => { inst = b.dataset.i; $$('.xinst .chip', pg).forEach(x => x.setAttribute('aria-pressed', String(x === b))); Music.voice(inst, 'C5'); }));
  const stopRec = () => { const r = rec; rec = null; $('.rec', pg).textContent = '⏺ Kaydet'; if (r && r.length) { last = r; $('.playrec', pg).disabled = false; $('.keep', pg).disabled = false; $('.recmsg', pg).textContent = `${r.length} notalık şarkın hazır. Dinle ya da sakla!`; } };
  $('.rec', pg).addEventListener('click', (e) => { if (rec) return stopRec(); Music.ac(); rec = []; recStart = Date.now(); e.currentTarget.textContent = '⏹ Durdur'; $('.recmsg', pg).textContent = 'Kayıt başladı, çal!'; });
  const playback = (notes, instr) => { let tmax = 0; notes.forEach(([n, t]) => { tmax = Math.max(tmax, t); const tm = setTimeout(() => { Music.voice(instr || inst, n); const el = $(`.xbar[data-n="${n}"]`, pg); if (el) { el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); } }, t); onLeave(() => clearTimeout(tm)); }); };
  $('.playrec', pg).addEventListener('click', () => last && playback(last));
  const listSongs = () => {
    $('.mysongs', pg).innerHTML = S.songs.length ? `<b style="font-family:var(--font-d)">Şarkılarım</b>` + S.songs.map((s, i) => `<div class="row"><button class="btn sm sky" data-p="${i}">▶ ${esc(s.name)}</button><span class="small muted">${s.notes.length} nota · ${s.date.split('-').reverse().join('.')}</span><button class="btn sm ghost" data-d="${i}" aria-label="Sil">🗑</button></div>`).join('') : '';
    $$('[data-p]', pg).forEach(b => b.addEventListener('click', () => { const s = S.songs[+b.dataset.p]; playback(s.notes, s.inst); }));
    $$('[data-d]', pg).forEach(b => b.addEventListener('click', () => { S.songs.splice(+b.dataset.d, 1); save(); listSongs(); }));
  };
  $('.keep', pg).addEventListener('click', (e) => {
    if (!last) return;
    S.songs.unshift({ name: 'Şarkım ' + ((S.count.beste || 0) + 1), notes: last, inst, date: dateKey() }); if (S.songs.length > 6) S.songs.length = 6;
    S.count.beste = (S.count.beste || 0) + 1; act('muzik', 'Kendi şarkısını yaptı', 15); reward(15, 'Kendi şarkın', e.currentTarget); award('besteci'); boom(); save();
    last = null; e.currentTarget.disabled = true; $('.playrec', pg).disabled = true; $('.recmsg', pg).textContent = 'Şarkın saklandı! 🎉'; listSongs();
  });
  listSongs();
  /* beat machine */
  const ROWS = [['kick', '🥁 Davul'], ['snare', '🪘 Trampet'], ['hat', '🔔 Zil'], ['clap', '👏 Alkış']];
  let grid = S.beat || [[1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1]];
  const bg = $('.beatgrid', pg);
  const drawGrid = () => { bg.innerHTML = ROWS.map(([k, l], r) => `<span class="blabel">${l}</span>` + grid[r].map((v, c) => `<button class="bcell ${v ? 'on' : ''}" data-r="${r}" data-c="${c}" aria-pressed="${!!v}" aria-label="${l} ${c + 1}"></button>`).join('')).join(''); };
  bg.addEventListener('click', (e) => { const b = e.target.closest('.bcell'); if (!b) return; const r = +b.dataset.r, c = +b.dataset.c; grid[r][c] = grid[r][c] ? 0 : 1; b.classList.toggle('on'); b.setAttribute('aria-pressed', String(!!grid[r][c])); if (grid[r][c]) Music.drum(ROWS[r][0]); S.beat = grid; save(); });
  let iv = null, step = 0;
  const stopBeat = () => { clearInterval(iv); iv = null; $('.bplay', pg).textContent = '▶ Başlat'; $$('.bcell', pg).forEach(x => x.classList.remove('now')); };
  const startBeat = () => {
    Music.ac(); stopBeat(); step = 0; $('.bplay', pg).textContent = '⏹ Durdur';
    const ms = 60000 / +$('#btempo').value / 2;
    iv = setInterval(() => { $$('.bcell', pg).forEach(x => x.classList.toggle('now', +x.dataset.c === step)); ROWS.forEach(([k], r) => { if (grid[r][step]) Music.drum(k); }); step = (step + 1) % 8; }, ms);
  };
  $('.bplay', pg).addEventListener('click', () => iv ? stopBeat() : startBeat());
  $('#btempo').addEventListener('change', () => { if (iv) startBeat(); });
  $('.brand', pg).addEventListener('click', () => { grid = ROWS.map((_, r) => Array.from({ length: 8 }, (_, c) => r === 0 ? +(c % 4 === 0 || Math.random() < .15) : r === 2 ? +(Math.random() < .7) : +(Math.random() < .25))); S.beat = grid; save(); drawGrid(); });
  $('.bclear', pg).addEventListener('click', () => { grid = ROWS.map(() => Array(8).fill(0)); S.beat = grid; save(); drawGrid(); });
  onLeave(stopBeat);
  drawGrid();
};
