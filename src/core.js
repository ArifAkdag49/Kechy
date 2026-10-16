/* ============ CORE: state, effects, rewards, router ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad2 = (n) => String(n).padStart(2, '0');
const dateKey = (d = new Date()) => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
const dayIndex = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
const pickDay = (arr, salt = 0) => arr[((dayIndex() * 7919 + salt * 104729) % arr.length + arr.length) % arr.length];
const weekIndex = (d = new Date()) => Math.floor((dayIndex(d) + 3) / 7);
const fmtNum = (n) => Number(n).toLocaleString('tr-TR');
const fmtDate = (d = new Date(), o = { weekday: 'long', day: 'numeric', month: 'long' }) => d.toLocaleDateString('tr-TR', o);
const shortDate = (d = new Date()) => pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
const shuffle = (a, r = Math.random) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cap = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
const trLower = (s) => s.toLocaleLowerCase('tr');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches || S.settings.motion === 'off';

/* ---------- state ---------- */
const KEY = 'kechy-dunyasi-v1';
const DAILY = ['oku', 'sayisoru', 'oyun', 'soru'];
function fresh() {
  return {
    v: 1, profile: null, team: null, stars: 0, days: {}, issues: {}, badges: {}, stamps: {}, games: {},
    count: { soru: 0, gorev: 0, bilmece: 0, oyun: 0, deney: 0, hikaye: 0, cizim: 0, tv: 0, okuma: 0, ulke: 0 },
    stories: [], drawings: [], vault: [], stickers: [], surprise: {}, acts: [], labs: {}, tvSeen: {}, readSeen: {}, cases: {},
    settings: { sound: true, voice: true, limit: 0, breakEvery: 20, motion: 'auto', size: 'normal', seq: true }, pages: {},
    last: null, vote: null, created: Date.now()
  };
}
let memStore = null;
function loadState() {
  let raw = null;
  try { raw = localStorage.getItem(KEY); } catch (e) { raw = memStore; }
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch (e) { data = null; }
  const f = fresh();
  if (!data) return f;
  return Object.assign(f, data, { count: Object.assign(f.count, data.count || {}), settings: Object.assign(f.settings, data.settings || {}) });
}
let S = loadState();
function save() {
  const raw = JSON.stringify(S);
  try { localStorage.setItem(KEY, raw); } catch (e) { memStore = raw; }
}
function day(k = dateKey()) { return S.days[k] || (S.days[k] = { sec: 0, n: 0, stars: 0 }); }
function act(type, label, stars = 0) {
  S.acts.unshift({ t: Date.now(), type, label, s: stars });
  if (S.acts.length > 300) S.acts.length = 300;
  day().n++;
  save();
}
function levelOf(stars) {
  let i = 0;
  DATA.LEVELS.forEach((l, j) => { if (stars >= l.min) i = j; });
  const next = DATA.LEVELS[i + 1];
  return { i, ...DATA.LEVELS[i], next, pct: next ? Math.round((stars - DATA.LEVELS[i].min) / (next.min - DATA.LEVELS[i].min) * 100) : 100 };
}
const todayGame = () => { const w = world(latestIssue().n); return isMinik() ? w.minik.game : w.buyuk.games[dayIndex() % w.buyuk.games.length]; };
const todayCountry = () => pickDay(DATA.COUNTRIES, 5);
const weekExperiment = () => DATA.EXPERIMENTS[weekIndex() % DATA.EXPERIMENTS.length];
function todayRead() {
  const opts = [
    { go: 'kitap', t: 'Mini Kitap: Arkadaşlık Kalkanı', e: '🛡️' },
    ...DATA.AUDIO_STORIES.map(s => ({ go: 'dinle-' + s.id, t: 'Sesli Hikâye: ' + s.title, e: s.e })),
    { go: 'sayi-12', t: 'Kechy 12 · 5 soru', e: '🤝' }
  ];
  return opts[dayIndex() % opts.length];
}

/* ---------- sound ---------- */
const sfx = (() => {
  let ctx;
  const ac = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } } return ctx; };
  function tone(f, t0, dur, type = 'sine', vol = .14, f2) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .05);
  }
  const P = {
    pop: () => tone(520, 0, .12, 'sine', .12, 880),
    ok: () => { tone(660, 0, .12, 'triangle'); tone(880, .1, .2, 'triangle'); },
    no: () => tone(240, 0, .25, 'triangle', .1, 150),
    flip: () => tone(420, 0, .08, 'triangle', .08, 720),
    coin: () => { tone(988, 0, .08, 'square', .04); tone(1319, .08, .22, 'square', .04); },
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .12, .32, 'triangle', .12)),
    stamp: () => { tone(140, 0, .18, 'sine', .35, 55); tone(90, .02, .12, 'square', .03); },
    level: () => [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .09, .26, 'square', .045)),
    open: () => [300, 400, 520, 700, 900].forEach((f, i) => tone(f, i * .1, .3, 'sine', .1))
  };
  return (n) => { if (!S.settings.sound) return; try { const c = ac(); if (c && c.state === 'suspended') c.resume(); P[n] && P[n](); } catch (e) { } };
})();

/* ---------- speech (read aloud) ----------
   Fixed texts have studio recordings (audio/tts/<hash>.mp3, made by tools/gen_voice.py, listed in TTS_FILES);
   anything else falls back to the device voice. One shared <audio> element, unlocked on the first touch, so
   iPhone Safari also lets later recordings (auto page turns, spoken questions) play. */
const TTS_ON = typeof TTS_FILES !== 'undefined' && !/claude/.test(location.hostname);
const Voice = {
  tts: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
  ok: true,
  btn: null, el: null, tick: null,
  hash(t) { let h = 0x811C9DC5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); },
  file(text) { if (!TTS_ON) return null; const k = this.hash(String(text).replace(/\s+/g, ' ').trim()); return TTS_FILES[k] ? [k, TTS_FILES[k]] : null; },
  audio() { if (!this.el) { this.el = new Audio(); this.el.preload = 'auto'; } return this.el; },
  unlocked: false,
  unlock() {
    if (this.unlocked) return; this.unlocked = true;
    const a = this.audio();
    if (a.src && !a.paused) { a.play().catch(() => { }); return; }
    const n = 400, b = new ArrayBuffer(44 + n * 2), d = new DataView(b), w = (o, s) => [...s].forEach((c, i) => d.setUint8(o + i, c.charCodeAt(0)));
    w(0, 'RIFF'); d.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true);
    d.setUint32(24, 8000, true); d.setUint32(28, 16000, true); d.setUint16(32, 2, true); d.setUint16(34, 16, true); w(36, 'data'); d.setUint32(40, n * 2, true);
    a.src = URL.createObjectURL(new Blob([b], { type: 'audio/wav' })); a.play().catch(() => { });
  },
  session() { try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { } },
  say(text, o = {}) {
    if (!S.settings.voice) { o.onend && o.onend(); return null; }
    this.halt();
    const f = this.file(text);
    if (f) return this.play(f, text, o);
    return this.speak(text, o);
  },
  play([k, v], text, o) {
    const a = this.audio(), url = `audio/tts/${k}.mp3?v=${v}`;
    let fell = false;
    const fallback = () => { if (fell) return; fell = true; this.release(); this.speak(text, o); };
    a.onended = () => { this.release(); this.clearBtn(); o.onend && o.onend(); };
    a.onerror = fallback;
    a.src = url;
    a.playbackRate = o.rate ? Math.max(.6, o.rate / .95) : 1;
    try { a.preservesPitch = a.webkitPreservesPitch = true; } catch (e) { }
    this.session();
    const p = a.play(); if (p && p.catch) p.catch((e) => { if (e && e.name !== 'AbortError') fallback(); });
    if (o.onboundary && String(v).endsWith('w')) {
      fetch(`audio/tts/${k}.json?v=${v}`).then(r => r.json()).then((ws) => {
        if (this.el !== a || !a.src.includes(k)) return;
        let j = 0;
        clearInterval(this.tick);
        this.tick = setInterval(() => { const ms = a.currentTime * 1000; while (j < ws.length && ws[j][0] <= ms) { o.onboundary({ name: 'word', charIndex: ws[j][1] }); j++; } }, 60);
      }).catch(() => { });
    }
    return { audio: a };
  },
  release() { clearInterval(this.tick); const a = this.el; if (a) { a.onended = a.onerror = null; } },
  speak(text, o) {
    if (!this.tts) { o.onend && o.onend(); return null; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'tr-TR'; const v = this.pick(); if (v) u.voice = v;
    u.rate = o.rate || .95; u.pitch = 1.08;
    u.onend = () => { this.clearBtn(); o.onend && o.onend(); };
    u.onerror = () => { this.clearBtn(); o.onerror ? o.onerror() : (o.onend && o.onend()); };
    if (o.onboundary) u.onboundary = o.onboundary;
    try { speechSynthesis.speak(u); } catch (e) { o.onend && o.onend(); }
    return u;
  },
  pick() { try { const vs = speechSynthesis.getVoices(); return vs.find(v => /^tr/i.test(v.lang)) || null; } catch (e) { return null; } },
  // halt() silences without touching the 🔊 button, so a button that just started a reading keeps its ⏹ state
  halt() { this.release(); if (this.el && !this.el.paused) try { this.el.pause(); } catch (e) { } if (this.tts) try { speechSynthesis.cancel(); } catch (e) { } },
  stop() { this.halt(); this.clearBtn(); },
  clearBtn() { if (this.btn) { this.btn.classList.remove('on'); this.btn.textContent = '🔊'; this.btn = null; } }
};
if (Voice.tts) try { speechSynthesis.onvoiceschanged = () => { }; speechSynthesis.getVoices(); } catch (e) { }
['pointerdown', 'touchend', 'keydown'].forEach((ev) => document.addEventListener(ev, () => Voice.unlock(), { once: true, capture: true, passive: true }));

/* ---------- home-screen app (Android install prompt, iPhone "Ana Ekrana Ekle" guide) ---------- */
const App = {
  ios: /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  standalone: navigator.standalone === true || !!(window.matchMedia && matchMedia('(display-mode: standalone)').matches),
  prompt: null,
  can() { return !this.standalone && !/claude/.test(location.hostname) && (this.ios || !!this.prompt); },
  guideHTML() {
    const ios = `<div class="a2hs"><h3>🍏 iPhone / iPad</h3><ol><li>Bu sayfayı <b>Safari</b>'de aç.</li><li><b>Paylaş</b> <span class="kbd">⬆️</span> düğmesine dokun (Safari'de altta, Chrome'da sağ üstte).</li><li>Listeyi kaydır, <b>Ana Ekrana Ekle</b> <span class="kbd">➕</span> seç.</li><li>Sağ üstteki <b>Ekle</b>'ye dokun. Kechy ikonu ana ekranında!</li></ol></div>`;
    const android = `<div class="a2hs"><h3>🤖 Android</h3>${this.prompt ? '<button class="btn leaf" type="button" data-install>📲 Şimdi yükle</button>' : ''}<ol><li>Bu sayfayı <b>Chrome</b>'da aç.</li><li>Sağ üstteki <b>⋮</b> menüsüne dokun.</li><li><b>Uygulamayı yükle</b> ya da <b>Ana ekrana ekle</b> seç.</li></ol></div>`;
    return `<div class="a2hsgrid">${this.ios ? ios + android : android + ios}</div>`;
  },
  open() {
    if (this.prompt && !this.ios) return this.install();
    Modal.open(`<div class="stack" style="gap:12px"><h2>📲 Kechy'yi telefona ekle</h2><p class="muted">Kendi ikonuyla, tam ekran açılır. Mağaza ve hesap gerekmez.</p>${this.guideHTML()}<button class="btn" type="button" data-close>Tamam</button></div>`);
  },
  async install() { const e = this.prompt; if (!e) return; e.prompt(); try { await e.userChoice; } catch (x) { } this.prompt = null; this.refresh(); },
  wants() { let quiet = 0; try { quiet = +localStorage.getItem('kechy-a2hs') || 0; } catch (e) { } return this.can() && Date.now() - quiet > 10 * 864e5; },
  // A small invitation after 25 s of use, only on the home page so it never covers a story or a game
  refresh() {
    const ib = $('#installbtn'); if (ib) ib.hidden = !this.can();
    if (!this.wants()) return this.place();
    if (!this.ready && !this.timer) this.timer = setTimeout(() => { this.timer = null; this.ready = true; this.place(); }, 25000);
    this.place();
  },
  place() {
    let bar = $('.a2hsbar');
    if (!this.ready || !this.wants() || !/^#?(kechy)?$/.test(location.hash)) { bar && bar.remove(); return; }
    if (bar) return;
    bar = h(`<div class="a2hsbar" role="dialog" aria-label="Uygulama olarak ekle"><span style="font-size:1.8rem">📲</span><p>Kechy'yi ana ekranına ekle, uygulama gibi açılsın!</p><button class="btn sm leaf" type="button">Nasıl?</button><button class="x" type="button" aria-label="Kapat">✕</button></div>`);
    const hush = () => { try { localStorage.setItem('kechy-a2hs', Date.now()); } catch (e) { } bar.remove(); };
    $('.btn', bar).addEventListener('click', () => { hush(); this.open(); });
    $('.x', bar).addEventListener('click', hush);
    document.body.append(bar);
  }
};
document.documentElement.classList.toggle('standalone', App.standalone);
window.addEventListener('hashchange', () => App.place());
document.addEventListener('click', (e) => { if (e.target.closest('[data-install]')) App.install(); });
const sayBtn = (text, label = 'Sesli oku') => Voice.ok ? `<button class="say" type="button" data-say="${esc(text)}" aria-label="${label}" title="${label}">🔊</button>` : '';

/* ---------- libs (lazy) ---------- */
const libs = {};
function loadScript(src) {
  if (libs[src]) return libs[src];
  libs[src] = new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.append(s); });
  return libs[src];
}
const LIB = {
  confetti: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.js',
  map: 'https://cdnjs.cloudflare.com/ajax/libs/jsvectormap/1.5.3/js/jsvectormap.min.js',
  world: 'https://cdnjs.cloudflare.com/ajax/libs/jsvectormap/1.5.3/maps/world.js',
  qr: 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'
};

/* ---------- effects ---------- */
const COLORS = ['#FFC83A', '#1FA2B0', '#E6508A', '#43AE5B', '#F2752B', '#9A7FE0'];
function boom(big = false) {
  if (reduced()) return;
  if (window.confetti) {
    window.confetti({ particleCount: big ? 160 : 90, spread: big ? 100 : 70, origin: { y: .6 }, colors: COLORS, disableForReducedMotion: true, zIndex: 120 });
    if (big) setTimeout(() => { window.confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0 }, colors: COLORS, zIndex: 120 }); window.confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1 }, colors: COLORS, zIndex: 120 }); }, 250);
    return;
  }
  for (let i = 0; i < (big ? 70 : 40); i++) {
    const el = h(`<i class="confetti-dom"></i>`);
    el.style.left = Math.random() * 100 + 'vw'; el.style.background = COLORS[i % COLORS.length];
    el.style.animationDuration = (1.6 + Math.random() * 1.6) + 's'; el.style.animationDelay = Math.random() * .4 + 's';
    document.body.append(el); setTimeout(() => el.remove(), 3800);
  }
}
function toast(msg, ms = 2400) {
  let box = $('.toasts'); if (!box) { box = h('<div class="toasts" role="status" aria-live="polite"></div>'); document.body.append(box); }
  const t = h(`<div class="toast">${msg}</div>`); box.append(t);
  setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, ms);
}
function flyStar(src, pts) {
  const target = $('#starchip .st');
  if (!src || !target || reduced()) return bumpStar();
  const a = src.getBoundingClientRect(), b = target.getBoundingClientRect();
  if (!a.width) return bumpStar();
  const x0 = a.left + a.width / 2, y0 = a.top + Math.min(a.height / 2, 60), x1 = b.left + b.width / 2 - 14, y1 = b.top + b.height / 2 - 16;
  const fp = h(`<div class="floatpts">+${pts}</div>`); fp.style.left = (x0 - 20) + 'px'; fp.style.top = (y0 - 30) + 'px'; document.body.append(fp); setTimeout(() => fp.remove(), 1200);
  const n = Math.min(5, Math.max(1, Math.round(pts / 10)));
  for (let i = 0; i < n; i++) {
    const el = h('<div class="flystar">⭐</div>'); document.body.append(el);
    const mx = (x0 + x1) / 2 + (Math.random() - .5) * 160, my = Math.min(y0, y1) - 60 - Math.random() * 80;
    const an = el.animate([
      { transform: `translate(${x0 - 14}px,${y0 - 16}px) scale(.4)`, opacity: 0 },
      { transform: `translate(${mx}px,${my}px) scale(1.5)`, opacity: 1, offset: .45 },
      { transform: `translate(${x1}px,${y1}px) scale(.6)`, opacity: 1 }
    ], { duration: 900 + i * 110, easing: 'cubic-bezier(.45,0,.4,1)', delay: i * 70 });
    an.onfinish = () => { el.remove(); bumpStar(); if (i === 0) sfx('coin'); };
  }
}
function bumpStar() { const c = $('#starchip'); if (!c) return; renderHeader(); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }

/* ---------- modal ---------- */
const Modal = {
  el: null, onClose: null, queue: [],
  open(html, o = {}) {
    this.close(true);
    const back = h(`<div class="modal-back" role="dialog" aria-modal="true"><div class="modal card ${o.cls || ''}">${o.noX ? '' : '<button class="iconbtn x" data-close aria-label="Kapat">✕</button>'}${html}</div></div>`);
    back.addEventListener('click', (e) => { if (e.target === back && !o.sticky) this.close(); if (e.target.closest('[data-close]')) this.close(); });
    document.body.append(back); this.el = back; this.onClose = o.onClose || null;
    const f = back.querySelector('.modal [autofocus], .modal button:not(.x), .modal a'); (f || back.querySelector('.modal')).focus?.({ preventScroll: true });
    return back.querySelector('.modal');
  },
  close(silent) {
    if (!this.el) return;
    Voice.stop();
    this.el.remove(); this.el = null;
    const cb = this.onClose; this.onClose = null;
    if (!silent) { cb && cb(); setTimeout(() => this.flush(), 120); }
  },
  isOpen() { return !!this.el; },
  later(fn) { this.queue.push(fn); if (!this.isOpen()) this.flush(); },
  flush() { if (this.isOpen() || !this.queue.length) return; const fn = this.queue.shift(); fn(); }
};
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && Modal.isOpen()) Modal.close(); });

/* ---------- rewards ---------- */
function reward(pts, label, src) {
  const before = levelOf(S.stars).i;
  S.stars += pts; day().stars += pts; save();
  flyStar(src, pts);
  toast(`+${pts} ⭐ ${esc(label)}`);
  const after = levelOf(S.stars);
  if (after.i > before) Modal.later(() => levelModal(after));
}
function levelModal(l) {
  sfx('level'); boom(true);
  Modal.open(`<div class="reward"><div class="medal"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#FFC83A" stroke="#1D2E42" stroke-width="3"/><text x="60" y="78" text-anchor="middle" font-size="52">${l.e}</text></svg></div>
    <span class="eyebrow">Yeni seviye</span><h2>Artık bir ${l.name}sin!</h2>
    <p class="muted">Kechy puanın ${fmtNum(S.stars)} ⭐ oldu. Pasaportuna yeni seviye işlendi.</p>
    <div class="row" style="justify-content:center"><a class="btn" href="#koleksiyon" data-close>🛂 Pasaportuma bak</a><button class="btn ghost" data-close>Devam</button></div></div>`);
}
function award(id) {
  if (S.badges[id]) return false;
  const b = DATA.BADGES.find(x => x.id === id); if (!b) return false;
  S.badges[id] = dateKey(); save();
  act('rozet', b.name + ' rozeti');
  Modal.later(() => badgeModal(b, true));
  return true;
}
function badgeModal(b, fresh) {
  if (fresh) { sfx('win'); boom(true); }
  const got = S.badges[b.id];
  Modal.open(`<div class="reward"><div class="medal">${Art.badge(b)}</div>
    <span class="eyebrow">${got ? (fresh ? 'Yeni rozet!' : 'Rozetin') : 'Kilitli rozet'}</span>
    <h2>${fresh ? '🏅 ' + esc(b.name).toLocaleUpperCase('tr') + ' ROZETİ KAZANDIN!' : esc(b.name)}</h2>
    <p class="muted">${got ? 'Kazandığın gün: ' + got.split('-').reverse().join('.') + '. Rozetin koleksiyon rafında.' : 'Nasıl kazanılır: ' + esc(b.how)}</p>
    <div class="row" style="justify-content:center">${fresh ? '<a class="btn" href="#koleksiyon" data-close>🏆 Rafıma git</a>' : ''}<button class="btn ghost" data-close>Tamam</button></div></div>`);
}
function checkBadges() {
  const c = S.count, won = Object.keys(S.games).filter(k => S.games[k].wins > 0).length;
  const rules = [['ilk-soru', c.soru >= 1], ['soru-10', c.soru >= 10], ['ilk-gorev', c.gorev >= 1], ['gorev-10', c.gorev >= 10],
    ['kasif-5', Object.keys(S.stamps).length >= 5], ['dunya-15', Object.keys(S.stamps).length >= 15], ['oyuncu-5', won >= 5],
    ['labirent', (S.games.labirent?.wins || 0) >= 3], ['bilmece', c.bilmece >= 10], ['okur', c.okuma >= 3], ['izleyici', c.tv >= 3],
    ['sanatci', c.cizim >= 1], ['hikayeci', c.hikaye >= 1], ['bilimci', c.deney >= 1]];
  rules.forEach(([id, ok]) => { if (ok) award(id); });
}
const DAILY_PTS = { soru: 10, gorev: 20, oyun: 20, oku: 10, sayisoru: 10 };
function markDaily(k, src) {
  const d = day(); if (d[k]) return false;
  d[k] = true; save();
  const n = DAILY.filter(x => d[x]).length;
  if (k !== 'soru' && k !== 'gorev') reward(DAILY_PTS[k], { oyun: 'Günün oyunu', oku: 'Bugün okudun', sayisoru: 'Okuduğunun soruları' }[k], src);
  if (n === 4) { award('kahraman'); Modal.later(dayDoneModal); }
  if (currentRoute === 'kechy') setTimeout(() => { if (currentRoute === 'kechy' && !Modal.isOpen()) render(); }, 1400);
  return true;
}
function dayDoneModal() {
  boom(true); sfx('win');
  Modal.open(`<div class="reward"><div style="width:180px">${Art.kechy('happy2', 'kechy-bob')}</div>
    <span class="eyebrow">Bugün Kechy · 4/4</span><h2>Bugünlük hepsi tamam! 🏁</h2>
    <p class="muted">Harika bir gündü. Yarın yeni bir soru, yeni bir görev ve yeni bir puzzle seni bekliyor. Şimdi ekrana mola verip dışarıda bir kuş aramaya ne dersin?</p>
    <button class="btn leaf lg" data-close>Görüşürüz Kechy! 👋</button></div>`);
}
function readDone(src, label, key) {
  if (key) day().readItem = key;
  S.count.okuma++; act('okuma', label, 10); markDaily('oku', src); checkBadges(); save();
}

/* ---------- parent gate ---------- */
let parentOk = false;
function gateHTML() {
  const a = 6 + Math.floor(Math.random() * 7), b = 3 + Math.floor(Math.random() * 7);
  return { a, b, html: `<div class="gate"><div style="font-size:3rem">👨‍👩‍👧</div><h2>Ebeveyn kapısı</h2><p class="muted">Bu bölüm yetişkinler içindir. Devam etmek için işlemi çöz:</p>
    <label for="gate-in" class="qtext">${a} × ${b} = ?</label><input id="gate-in" class="gate-in" inputmode="numeric" autocomplete="off" maxlength="3">
    <p class="gate-msg muted small" aria-live="polite"></p><button class="btn sky gate-go">Devam</button></div>` };
}
function bindGate(root, a, b, onPass) {
  const inp = $('.gate-in', root), msg = $('.gate-msg', root);
  const go = () => { if (parseInt(inp.value, 10) === a * b) { parentOk = true; onPass(); } else { msg.textContent = 'Sonuç doğru değil. Tekrar deneyin.'; inp.select(); } };
  $('.gate-go', root).addEventListener('click', go);
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  setTimeout(() => inp.focus(), 50);
}

/* ---------- time, breaks, limits ---------- */
let sessionSec = 0, limitShown = false;
setInterval(() => {
  if (document.hidden) return;
  const d = day(); d.sec = (d.sec || 0) + 15; sessionSec += 15;
  if (d.sec % 60 === 0) save();
  const st = S.settings;
  if (st.limit > 0 && d.sec >= st.limit * 60 && !limitShown && !$('.breakov')) { limitShown = true; showLimit(); return; }
  if (st.breakEvery > 0 && sessionSec >= st.breakEvery * 60 && !$('.breakov')) { sessionSec = 0; showBreak(); }
}, 15000);
function showBreak() {
  Voice.stop();
  const ov = h(`<div class="breakov" role="dialog" aria-modal="true" aria-label="Mola"><div class="inner card pad">
    <div class="kechy">${Art.kechy('happy2', 'kechy-bob')}</div><h2>Mola zamanı!</h2>
    <p>Gözlerini ekrandan ayır ve pencereden uzağa bak. Kechy ile birlikte 20'ye kadar say.</p>
    <svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="var(--ground-dot)" stroke-width="12"/><circle class="arc" cx="60" cy="60" r="50" fill="none" stroke="var(--leaf)" stroke-width="12" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="0" transform="rotate(-90 60 60)"/><text x="60" y="72" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="36" fill="var(--ink)">20</text></svg>
    <p class="muted small">Esneme fikri: kollarını yukarı uzat, sonra ayak parmaklarına dokun. 🙆</p>
    <div class="row" style="justify-content:center"><button class="btn leaf" disabled>Devam et</button><button class="btn ghost bye">Bugünlük bu kadar</button></div></div></div>`);
  document.body.append(ov);
  let t = 20; const txt = $('text', ov), arc = $('.arc', ov), btn = $('.btn.leaf', ov);
  const iv = setInterval(() => { t--; txt.textContent = t; arc.setAttribute('stroke-dashoffset', String(314 * (1 - t / 20))); if (t <= 0) { clearInterval(iv); btn.disabled = false; txt.textContent = '✓'; sfx('ok'); } }, 1000);
  btn.addEventListener('click', () => { clearInterval(iv); ov.remove(); });
  $('.bye', ov).addEventListener('click', () => { clearInterval(iv); ov.remove(); goodbye(); });
}
function goodbye() {
  Modal.open(`<div class="reward"><div style="width:170px">${Art.kechy('wink', 'kechy-bob')}</div><h2>Görüşürüz!</h2><p class="muted">Bugün ${fmtNum(day().stars)} ⭐ topladın. Kechy yarın yeni şeylerle burada olacak.</p><button class="btn" data-close>Tamam</button></div>`);
}
function showLimit() {
  Voice.stop();
  const g = gateHTML();
  const ov = h(`<div class="breakov" role="dialog" aria-modal="true" aria-label="Süre doldu"><div class="inner card pad">
    <div class="kechy">${Art.kechy('sleep')}</div><h2>Bugünkü Kechy zamanın doldu</h2>
    <p>Bugün ${fmtNum(day().stars)} ⭐ topladın. Yarın yeni görevlerle görüşürüz! Şimdi oyun, kitap ya da dışarıda bir yürüyüş zamanı.</p>
    <details><summary class="muted small" style="cursor:pointer">Ebeveyn: 15 dakika ekle</summary>${g.html}</details></div></div>`);
  document.body.append(ov);
  bindGate(ov, g.a, g.b, () => { S.settings.limit += 15; save(); ov.remove(); limitShown = false; toast('15 dakika eklendi'); });
}

/* ---------- header ---------- */
function curAvatar() { return S.profile?.avatar || { base: 'goat', bg: 'sky', shirt: '#1FA2B0', hat: 'none', glasses: 'none' }; }
function renderHeader() {
  const sc = $('#starcount'); if (sc) sc.textContent = fmtNum(S.stars);
  const me = $('#mechip');
  if (me) { me.innerHTML = `${Art.avatar(curAvatar(), 'av')}<b>${esc(S.profile?.nick || 'Pasaport oluştur')}</b>`; me.href = S.profile ? '#koleksiyon' : '#pasaport'; }
  const snd = $('#sndbtn'); if (snd) { snd.textContent = S.settings.sound ? '🔔' : '🔕'; snd.setAttribute('aria-pressed', String(S.settings.sound)); snd.title = S.settings.sound ? 'Sesleri kapat' : 'Sesleri aç'; }
  document.documentElement.dataset.size = S.settings.size;
  document.documentElement.dataset.motion = S.settings.motion;
  applyAge();
}

/* ---------- router ---------- */
const P = {};
let currentRoute = 'kechy', leaveFns = [];
const onLeave = (fn) => leaveFns.push(fn);
const NAV_OF = { kechy: 'kechy', oku: 'oku', sayi: 'oku', dinle: 'oku', kitap: 'oku', oyna: 'oyna', oyun: 'oyna', kesfet: 'kesfet', harita: 'kesfet', hayvanlar: 'kesfet', bilgiler: 'kesfet', lab: 'kesfet', tv: 'kesfet',
  uret: 'uret', hikaye: 'uret', cizim: 'uret', galeri: 'uret', koleksiyon: 'koleksiyon', avatar: 'koleksiyon', pasaport: 'koleksiyon', karakterler: 'koleksiyon', kasa: 'kechy', surpriz: 'kechy', ebeveyn: 'ebeveyn', test: 'kechy' };
function parseHash() {
  const raw = decodeURIComponent((location.hash || '').slice(1)) || 'kechy';
  const i = raw.indexOf('-');
  return { name: i < 0 ? raw : raw.slice(0, i), param: i < 0 ? '' : raw.slice(i + 1), raw };
}
function go(hash) { if (location.hash.slice(1) === hash) render(); else location.hash = hash; }
function render() {
  leaveFns.forEach(f => { try { f(); } catch (e) { } }); leaveFns = [];
  Voice.stop();
  if (Modal.isOpen()) Modal.close(true);
  let { name, param, raw } = parseHash();
  if (!P[name]) { name = 'kechy'; param = ''; }
  currentRoute = name;
  S.visits = S.visits || {}; if (!S.visits[raw]) { S.visits[raw] = 1; save(); }
  const main = $('#main');
  const pg = h('<div class="page"></div>');
  main.innerHTML = ''; main.append(pg);
  try { P[name](pg, param, raw); } catch (e) { console.error(e); pg.innerHTML = `<div class="empty"><b>Bir şeyler ters gitti.</b><a class="btn" href="#kechy">Ana sayfaya dön</a></div>`; }
  const sec = NAV_OF[name] || 'kechy';
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === sec) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
  renderHeader();
  setTimeout(() => Modal.flush(), 450);
}
function setLast(hash, title, e) { S.last = { hash, title, e, t: Date.now() }; save(); }

/* ---------- global delegation ---------- */
document.addEventListener('click', (e) => {
  const say = e.target.closest('[data-say]');
  if (say) {
    e.preventDefault();
    if (say.classList.contains('on')) { Voice.stop(); return; }
    if (!S.settings.voice) { toast('Sesli okuma kapalı (Ebeveyn ayarları)'); return; }
    Voice.stop(); Voice.btn = say; say.classList.add('on'); say.textContent = '⏹';
    Voice.say(say.dataset.say);
    return;
  }
  const g = e.target.closest('[data-go]');
  if (g) { e.preventDefault(); go(g.dataset.go); return; }
  const b = e.target.closest('.btn, a.card, .tcard, .chip, .nav a, .tabbar a');
  if (b && !b.disabled) sfx('pop');
});
window.addEventListener('hashchange', render);
document.addEventListener('visibilitychange', () => { if (document.hidden) { save(); Voice.stop(); } });
