/* ============ GAMES ============ */
const Games = {};
const fmtT = (ms) => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + pad2(s % 60); };
function shell(pg, g) {
  const daily = todayGame() === g.id;
  pg.innerHTML = `<div class="gshell"><div class="ghead"><a class="crumb" href="#oyna">← Oyunlar</a><h1>${g.e} ${g.t}</h1>${daily ? `<span class="pill leaf">${day().oyun ? 'Günün puzzle\'ı ✓' : 'Günün puzzle\'ı · +20 ⭐'}</span>` : ''}<div class="stats"></div></div><div class="card gbox"></div><div class="after"></div></div>`;
  const box = $('.gbox', pg), statsEl = $('.stats', pg), after = $('.after', pg);
  return {
    box, after,
    stat(k, v) { let el = statsEl.querySelector(`[data-k="${k}"]`); if (!el) { el = h(`<span class="pill sky tnum" data-k="${k}"></span>`); statsEl.append(el); } el.textContent = `${k}: ${v}`; },
    clear() { after.innerHTML = ''; statsEl.innerHTML = ''; },
    win(o = {}) {
      const rec = S.games[g.id] || (S.games[g.id] = { plays: 1, wins: 0, best: null }); rec.wins++;
      let best = false;
      if (o.score != null && (rec.best == null || (o.lower ? o.score < rec.best : o.score > rec.best))) { best = rec.best != null; rec.best = o.score; }
      S.count.oyun++; act('oyun', g.t, o.stars || 10);
      sfx('win'); boom();
      reward(o.stars || 10, g.t, o.src || box);
      if (g.id === todayGame() && (S.settings.seq === false || isMinik() || (day().oku && day().sayisoru))) markDaily('oyun', box);
      if (isMinik() && S.ctxIssue) { const wm = world(S.ctxIssue).minik; if (g.id === 'boyama') markStk(S.ctxIssue, 'boya'); else if (g.id === wm.game) markStk(S.ctxIssue, 'oyun'); }
      if (o.badge) award(o.badge);
      checkBadges(); save();
      nextUp(after, `🎉 ${o.msg || 'Harika!'}`, best ? '🏆 Yeni rekor!' : (o.sub || ''), [['🔁 Tekrar oyna', o.again || (() => render()), 'sky'], ['🎮 Başka oyun', 'oyna', ''], ['🏠 Ana sayfa', 'kechy', 'ghost']]);
    }
  };
}
function clock(A) {
  const t0 = Date.now(); A.stat('Süre', '0:00');
  const iv = setInterval(() => A.stat('Süre', fmtT(Date.now() - t0)), 1000); onLeave(() => clearInterval(iv));
  return { stop() { clearInterval(iv); return Date.now() - t0; } };
}
function flyTo(el, target) {
  if (!el || !target || reduced()) return;
  const a = el.getBoundingClientRect(), b = target.getBoundingClientRect(), c = el.cloneNode(true);
  c.style.cssText = `position:fixed;left:${a.left}px;top:${a.top}px;z-index:95;pointer-events:none;font-size:${getComputedStyle(el).fontSize};margin:0`;
  document.body.append(c);
  c.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${b.left + b.width / 2 - a.left - a.width / 2}px,${b.top + b.height / 2 - a.top - a.height / 2}px) scale(.3)`, opacity: .2 }], { duration: 550, easing: 'ease-in' }).onfinish = () => c.remove();
}
const levelChips = (levels, cur, attr = 'lv') => `<div class="levels">${levels.map(([k, t]) => `<button class="chip" data-${attr}="${k}" aria-pressed="${String(k) === String(cur)}">${t}</button>`).join('')}</div>`;

/* 1. memory */
Games.hafiza = (pg, g) => {
  const A = shell(pg, g), EM = ['🐐', '🐼', '🦊', '🐯', '🐧', '🐰', '🦉', '🐙', '🦒', '🐢', '🦋', '🐬', '🐝', '🐘'];
  const LV = { kolay: [6, 4], orta: [8, 4], zor: [12, 6] };
  let tm = null;
  const start = (lv) => {
    A.clear(); tm && tm.stop();
    const [n, cols] = LV[lv], cards = shuffle(shuffle(EM).slice(0, n).flatMap(e => [e, e]));
    A.box.innerHTML = levelChips([['kolay', 'Kolay'], ['orta', 'Orta'], ['zor', 'Zor']], lv) + `<div class="mem-grid" style="grid-template-columns:repeat(${cols},minmax(0,1fr));max-width:${cols * 110}px">${cards.map((e, i) => `<button class="mcard" data-i="${i}" aria-label="Kapalı kart ${i + 1}"><div class="in"><div class="f">K</div><div class="b">${e}</div></div></button>`).join('')}</div>`;
    $$('[data-lv]', A.box).forEach(b => b.addEventListener('click', () => start(b.dataset.lv)));
    let open = [], got = 0, moves = 0, lock = false; A.stat('Hamle', 0); tm = clock(A);
    $$('.mcard', A.box).forEach(c => c.addEventListener('click', () => {
      if (lock || c.classList.contains('open') || c.classList.contains('got')) return;
      c.classList.add('open'); c.setAttribute('aria-label', cards[c.dataset.i]); sfx('flip'); open.push(c);
      if (open.length < 2) return;
      moves++; A.stat('Hamle', moves); const [a, b] = open; open = [];
      if (cards[a.dataset.i] === cards[b.dataset.i]) {
        got++; setTimeout(() => { a.classList.add('got'); b.classList.add('got'); sfx('ok'); }, 250);
        if (got === n) { const ms = tm.stop(); setTimeout(() => A.win({ stars: lv === 'zor' ? 20 : lv === 'orta' ? 15 : 10, msg: `${moves} hamlede, ${fmtT(ms)} sürede bitirdin!`, score: moves, lower: true, badge: lv === 'zor' ? 'hafiza' : null, again: () => start(lv) }), 650); }
      } else { lock = true; setTimeout(() => { a.classList.remove('open'); b.classList.remove('open'); a.setAttribute('aria-label', 'Kapalı kart'); b.setAttribute('aria-label', 'Kapalı kart'); lock = false; }, 850); }
    }));
  };
  start(todayGame() === 'hafiza' && !isMinik() ? 'orta' : 'kolay');
};

/* 2. quiz */
Games.quiz = (pg, g) => {
  const A = shell(pg, g); A.box.style.alignItems = 'stretch';
  runQuiz(A.box, shuffle(DATA.QUESTIONS).slice(0, 8), {
    onFinish: (score, total) => {
      A.box.innerHTML = `<div class="center stack" style="align-items:center"><div style="font-size:4rem">${score >= 6 ? '🏆' : score >= 4 ? '🌟' : '💪'}</div><h2>${total} sorudan ${score} doğru!</h2><p class="muted">Her soruda yeni bir şey öğrendin.</p></div>`;
      A.win({ stars: Math.max(5, score * 2), msg: `${score}/${total} doğru!`, score });
    }
  });
};

/* 3. word search */
Games.kelime = (pg, g) => {
  const A = shell(pg, g), themes = Object.keys(DATA.WORDS), N = 9, ALPHA = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
  let theme = themes[dayIndex() % themes.length];
  const build = () => {
    A.clear();
    const words = DATA.WORDS[theme].slice().sort((a, b) => [...b].length - [...a].length);
    const grid = Array.from({ length: N }, () => Array(N).fill(null)), placed = [], dirs = [[0, 1], [1, 0], [1, 1]];
    for (const w of words) {
      const L = [...w]; let ok = false;
      for (let t = 0; t < 400 && !ok; t++) {
        const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
        const r0 = Math.floor(Math.random() * (N - dr * (L.length - 1))), c0 = Math.floor(Math.random() * (N - dc * (L.length - 1)));
        if (L.every((ch, k) => { const cell = grid[r0 + dr * k][c0 + dc * k]; return cell === null || cell === ch; })) {
          const cells = []; L.forEach((ch, k) => { grid[r0 + dr * k][c0 + dc * k] = ch; cells.push((r0 + dr * k) * N + c0 + dc * k); }); placed.push({ w, cells }); ok = true;
        }
      }
    }
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) grid[r][c] = ALPHA[Math.floor(Math.random() * ALPHA.length)];
    A.box.innerHTML = `<div class="chips">${themes.map(t => `<button class="chip" data-t="${t}" aria-pressed="${t === theme}">${t}</button>`).join('')}</div>
      <div class="ws"><div class="ws-grid" style="grid-template-columns:repeat(${N},minmax(0,1fr))">${grid.flat().map((ch, i) => `<div class="ws-cell" data-i="${i}">${ch}</div>`).join('')}</div>
      <div class="ws-list"><p class="small muted">İlk harften son harfe kaydır ya da iki harfe sırayla dokun.</p><ul>${placed.map(p => `<li data-w="${p.w}">${p.w}</li>`).join('')}</ul></div></div>`;
    $$('[data-t]', A.box).forEach(b => b.addEventListener('click', () => { theme = b.dataset.t; build(); }));
    const cells = $$('.ws-cell', A.box), gridEl = $('.ws-grid', A.box);
    let start = null, anchor = null, found = 0; A.stat('Bulunan', `0/${placed.length}`);
    const line = (a, b) => {
      const r1 = Math.floor(a / N), c1 = a % N, r2 = Math.floor(b / N), c2 = b % N;
      if (!(r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1))) return [a];
      const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1), len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
      return Array.from({ length: len + 1 }, (_, k) => (r1 + dr * k) * N + (c1 + dc * k));
    };
    const paint = (arr) => { cells.forEach(c => c.classList.remove('sel')); arr.forEach(i => cells[i].classList.add('sel')); };
    const cellAt = (e) => { const el = document.elementFromPoint(e.clientX, e.clientY); return el && el.classList.contains('ws-cell') && gridEl.contains(el) ? +el.dataset.i : null; };
    const check = (path) => {
      const word = path.map(i => cells[i].textContent).join(''), rev = [...word].reverse().join('');
      const p = placed.find(x => !x.done && (x.w === word || x.w === rev));
      if (p) {
        p.done = true; path.forEach(i => cells[i].classList.add('found')); $(`li[data-w="${p.w}"]`, A.box).classList.add('found'); sfx('ok'); found++;
        A.stat('Bulunan', `${found}/${placed.length}`);
        if (found === placed.length) A.win({ stars: 15, msg: `${theme} kelimelerinin hepsini buldun!`, again: build });
      } else if (path.length > 1) sfx('no');
      paint([]);
    };
    gridEl.addEventListener('pointerdown', (e) => { const i = cellAt(e); if (i == null) return; e.preventDefault(); try { gridEl.setPointerCapture(e.pointerId); } catch (x) { } start = i; paint(anchor != null ? line(anchor, i) : [i]); });
    gridEl.addEventListener('pointermove', (e) => { if (start == null) return; const i = cellAt(e); if (i != null) paint(line(anchor != null ? anchor : start, i)); });
    gridEl.addEventListener('pointerup', (e) => {
      if (start == null) return; const i = cellAt(e) ?? start;
      if (anchor == null && i === start) { anchor = start; start = null; paint([anchor]); return; }
      const from = anchor != null ? anchor : start; start = null; anchor = null; check(line(from, i));
    });
  };
  build();
};

/* 4. maze */
Games.labirent = (pg, g) => {
  const A = shell(pg, g), LV = { kolay: 8, orta: 11, zor: 15 };
  let lvl = todayGame() === 'labirent' && !isMinik() ? 'orta' : 'kolay', kh = null;
  onLeave(() => kh && window.removeEventListener('keydown', kh));
  const start = () => {
    A.clear(); if (kh) window.removeEventListener('keydown', kh);
    const n = LV[lvl], W = Array.from({ length: n * n }, () => ({ n: 1, e: 1, s: 1, w: 1, v: 0 })), stack = [0]; W[0].v = 1;
    while (stack.length) {
      const cur = stack[stack.length - 1], r = Math.floor(cur / n), c = cur % n, nb = [];
      if (r > 0 && !W[cur - n].v) nb.push(['n', cur - n, 's']); if (c < n - 1 && !W[cur + 1].v) nb.push(['e', cur + 1, 'w']);
      if (r < n - 1 && !W[cur + n].v) nb.push(['s', cur + n, 'n']); if (c > 0 && !W[cur - 1].v) nb.push(['w', cur - 1, 'e']);
      if (!nb.length) { stack.pop(); continue; }
      const [d, nx, od] = nb[Math.floor(Math.random() * nb.length)]; W[cur][d] = 0; W[nx][od] = 0; W[nx].v = 1; stack.push(nx);
    }
    A.box.innerHTML = levelChips([['kolay', 'Kolay'], ['orta', 'Orta'], ['zor', 'Zor']], lvl) + `<div class="maze-wrap"><canvas aria-label="Labirent. Ok tuşlarıyla oyna."></canvas>
      <div class="dpad"><button class="btn ghost u" data-d="n" aria-label="Yukarı">⬆️</button><button class="btn ghost l" data-d="w" aria-label="Sol">⬅️</button><button class="btn ghost d" data-d="s" aria-label="Aşağı">⬇️</button><button class="btn ghost r" data-d="e" aria-label="Sağ">➡️</button></div>
      <p class="small muted">Ok tuşları, kaydırma ya da düğmelerle Kechy'yi 🌿 otlara ulaştır.</p></div>`;
    $$('[data-lv]', A.box).forEach(b => b.addEventListener('click', () => { lvl = b.dataset.lv; start(); }));
    const cv = $('canvas', A.box), size = 520, dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = size * dpr; cv.height = size * dpr; const ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
    const cs = size / n, goal = n * n - 1, trail = new Set([0]); let pos = 0, moves = 0;
    const cssv = (v, f) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || f;
    const draw = () => {
      ctx.fillStyle = cssv('--paper', '#FFFDF7'); ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = 'rgba(255,200,58,.55)'; trail.forEach(i => { ctx.beginPath(); ctx.arc((i % n) * cs + cs / 2, Math.floor(i / n) * cs + cs / 2, cs * .15, 0, 7); ctx.fill(); });
      ctx.strokeStyle = cssv('--ink', '#1D2E42'); ctx.lineWidth = Math.max(3, cs * .09); ctx.lineCap = 'round'; ctx.beginPath();
      W.forEach((w, i) => { const x = (i % n) * cs, y = Math.floor(i / n) * cs; if (w.n) { ctx.moveTo(x, y); ctx.lineTo(x + cs, y); } if (w.e) { ctx.moveTo(x + cs, y); ctx.lineTo(x + cs, y + cs); } if (w.s) { ctx.moveTo(x, y + cs); ctx.lineTo(x + cs, y + cs); } if (w.w) { ctx.moveTo(x, y); ctx.lineTo(x, y + cs); } });
      ctx.stroke();
      ctx.font = `${cs * .66}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🌿', (goal % n) * cs + cs / 2, Math.floor(goal / n) * cs + cs / 2);
      ctx.fillText('🐐', (pos % n) * cs + cs / 2, Math.floor(pos / n) * cs + cs / 2 + 1);
    };
    const move = (d) => {
      if (pos === goal) return;
      if (W[pos][d]) { sfx('no'); return; }
      pos += { n: -n, s: n, e: 1, w: -1 }[d]; moves++; trail.add(pos); A.stat('Adım', moves); draw();
      if (pos === goal) A.win({ stars: lvl === 'zor' ? 20 : lvl === 'orta' ? 15 : 10, msg: `${moves} adımda çıkışı buldun!`, again: start });
    };
    $$('.dpad button', A.box).forEach(b => b.addEventListener('click', () => move(b.dataset.d)));
    kh = (e) => { const d = { ArrowUp: 'n', ArrowDown: 's', ArrowLeft: 'w', ArrowRight: 'e' }[e.key]; if (d && !Modal.isOpen() && currentRoute === 'oyun') { e.preventDefault(); move(d); } };
    window.addEventListener('keydown', kh);
    let p0 = null;
    cv.addEventListener('pointerdown', (e) => { p0 = { x: e.clientX, y: e.clientY }; });
    cv.addEventListener('pointerup', (e) => {
      if (!p0) return; let dx = e.clientX - p0.x, dy = e.clientY - p0.y; p0 = null;
      if (Math.hypot(dx, dy) < 18) { const r = cv.getBoundingClientRect(), sc = size / r.width; dx = (e.clientX - r.left) * sc - ((pos % n) * cs + cs / 2); dy = (e.clientY - r.top) * sc - (Math.floor(pos / n) * cs + cs / 2); }
      move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'e' : 'w') : (dy > 0 ? 's' : 'n'));
    });
    A.stat('Adım', 0); draw();
  };
  start();
};

/* 5. sliding puzzle */
Games.yapboz = (pg, g) => {
  const A = shell(pg, g), url = Art.svgURL(Art.scenePuzzle());
  let n = 3, nums = false;
  const start = () => {
    A.clear();
    const T = n * n, cells = [...Array(T).keys()]; let blank = T - 1;
    const nbrs = (p) => { const r = Math.floor(p / n), c = p % n, a = []; if (r > 0) a.push(p - n); if (r < n - 1) a.push(p + n); if (c > 0) a.push(p - 1); if (c < n - 1) a.push(p + 1); return a; };
    let prev = -1;
    for (let k = 0; k < (n === 3 ? 140 : 300); k++) { const o = nbrs(blank).filter(x => x !== prev), q = o[Math.floor(Math.random() * o.length)]; [cells[blank], cells[q]] = [cells[q], cells[blank]]; prev = blank; blank = q; }
    A.box.innerHTML = levelChips([[3, '3 × 3'], [4, '4 × 4']], n, 'n') + `<div class="row" style="justify-content:center;align-items:flex-start;gap:18px;width:100%"><div class="sp-grid"></div>
      <div class="stack" style="align-items:center"><img class="sp-ref" src="${url}" alt="Tamamlanmış resim"><span class="small muted">Hedef resim</span><button class="chip nums" aria-pressed="${nums}">🔢 Numaralar</button></div></div>`;
    $$('[data-n]', A.box).forEach(b => b.addEventListener('click', () => { n = +b.dataset.n; start(); }));
    const gridEl = $('.sp-grid', A.box), tiles = []; let moves = 0; A.stat('Hamle', 0);
    for (let id = 0; id < T - 1; id++) {
      const hr = Math.floor(id / n), hc = id % n;
      const el = h(`<button class="sp-tile" aria-label="Parça ${id + 1}" style="width:${100 / n}%;height:${100 / n}%;background-image:url(&quot;${url}&quot;);background-size:${n * 100}% ${n * 100}%;background-position:${hc / (n - 1) * 100}% ${hr / (n - 1) * 100}%"><span ${nums ? '' : 'hidden'}>${id + 1}</span></button>`);
      el.dataset.id = id; gridEl.append(el); tiles[id] = el;
    }
    const place = () => cells.forEach((t, p) => { if (t !== T - 1) tiles[t].style.transform = `translate(${(p % n) * 100}%,${Math.floor(p / n) * 100}%)`; });
    place();
    $('.nums', A.box).addEventListener('click', (e) => { nums = !nums; e.currentTarget.setAttribute('aria-pressed', String(nums)); $$('.sp-tile span', A.box).forEach(s => s.hidden = !nums); });
    let done = false;
    gridEl.addEventListener('click', (e) => {
      const el = e.target.closest('.sp-tile'); if (!el || done) return;
      const p = cells.indexOf(+el.dataset.id);
      if (!nbrs(p).includes(blank)) { sfx('no'); return; }
      [cells[p], cells[blank]] = [cells[blank], cells[p]]; blank = p; moves++; A.stat('Hamle', moves); sfx('flip'); place();
      if (cells.every((t, i) => t === i)) { done = true; setTimeout(() => A.win({ stars: n === 4 ? 20 : 12, msg: `${moves} hamlede tamamladın!`, score: moves, lower: true, again: start }), 300); }
    });
  };
  start();
};

/* 6. sudoku */
Games.sudoku = (pg, g) => {
  const A = shell(pg, g), SYM = { meyve: ['🍎', '🍌', '🍇', '🍊'], hayvan: ['🐐', '🐼', '🦊', '🐧'], sayi: ['1', '2', '3', '4'] };
  let set = 'meyve', lvl = 'kolay';
  const start = () => {
    A.clear();
    let b = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]];
    const perm = shuffle([0, 1, 2, 3]); b = b.map(r => r.map(v => perm[v]));
    if (Math.random() < .5) [b[0], b[1]] = [b[1], b[0]]; if (Math.random() < .5) [b[2], b[3]] = [b[3], b[2]]; if (Math.random() < .5) b = [b[2], b[3], b[0], b[1]];
    const swC = (x, y) => b.forEach(r => { [r[x], r[y]] = [r[y], r[x]]; }); if (Math.random() < .5) swC(0, 1); if (Math.random() < .5) swC(2, 3); if (Math.random() < .5) { swC(0, 2); swC(1, 3); }
    const sol = b.flat(), holes = shuffle([...Array(16).keys()]).slice(0, lvl === 'kolay' ? 6 : 9);
    const cur = sol.map((v, i) => holes.includes(i) ? null : v), given = cur.map(v => v !== null);
    let selI = holes[0];
    A.box.innerHTML = levelChips([['kolay', 'Kolay'], ['zor', 'Zor']], lvl) + levelChips([['meyve', '🍎 Meyve'], ['hayvan', '🐐 Hayvan'], ['sayi', '🔢 Sayı']], set, 'set') +
      `<p class="center small muted">Her satırda, her sütunda ve her kalın karede 4 farklı şekil olmalı.</p><div class="sd-grid">${cur.map((v, i) => `<button class="sd-cell ${given[i] ? 'given' : ''}" data-i="${i}" aria-label="Kare ${i + 1}">${v == null ? '' : SYM[set][v]}</button>`).join('')}</div>
      <div class="sd-pick">${SYM[set].map((s, k) => `<button class="btn ghost" data-v="${k}">${s}</button>`).join('')}<button class="btn ghost" data-v="x" aria-label="Sil">⌫</button></div>`;
    $$('[data-lv]', A.box).forEach(x => x.addEventListener('click', () => { lvl = x.dataset.lv; start(); }));
    $$('[data-set]', A.box).forEach(x => x.addEventListener('click', () => { set = x.dataset.set; start(); }));
    const cells = $$('.sd-cell', A.box);
    const mark = () => {
      cells.forEach((c, i) => { c.classList.toggle('sel', i === selI); c.classList.remove('bad'); c.textContent = cur[i] == null ? '' : SYM[set][cur[i]]; });
      const bad = new Set();
      const groups = [];
      for (let r = 0; r < 4; r++) groups.push([0, 1, 2, 3].map(c => r * 4 + c));
      for (let c = 0; c < 4; c++) groups.push([0, 1, 2, 3].map(r => r * 4 + c));
      [[0, 1, 4, 5], [2, 3, 6, 7], [8, 9, 12, 13], [10, 11, 14, 15]].forEach(x => groups.push(x));
      groups.forEach(gr => { const seen = {}; gr.forEach(i => { if (cur[i] == null) return; (seen[cur[i]] = seen[cur[i]] || []).push(i); }); Object.values(seen).forEach(a => { if (a.length > 1) a.forEach(i => { if (!given[i]) bad.add(i); }); }); });
      bad.forEach(i => cells[i].classList.add('bad'));
      if (cur.every(v => v != null) && !bad.size) { selI = -1; cells.forEach(c => c.classList.remove('sel')); A.win({ stars: lvl === 'zor' ? 18 : 12, msg: 'Sudoku tamam!', again: start }); }
    };
    cells.forEach((c, i) => c.addEventListener('click', () => { if (given[i]) return; selI = i; sfx('pop'); mark(); }));
    $$('.sd-pick button', A.box).forEach(x => x.addEventListener('click', () => { if (selI < 0 || given[selI]) return; cur[selI] = x.dataset.v === 'x' ? null : +x.dataset.v; sfx('flip'); mark(); }));
    mark();
  };
  start();
};

/* 7. spot the difference */
const DIFFS = [
  { t: 'Kechy\'nin Çiftliği', d: [[250, 40, 27], [60, 38, 27], [70, 151, 17], [240, 93, 10], [150, 178, 10]], draw: (b) => {
    const s = 'stroke="#1D2E42" stroke-width="2"';
    const cloud = (x, y) => `<path d="M${x - 24} ${y + 8} a10 10 0 0 1 4 -18 a14 14 0 0 1 26 -5 a11 11 0 0 1 20 9 a9 9 0 0 1 -2 14z" fill="#fff" ${s}/>`;
    return `<rect width="300" height="200" fill="#BFEFF3"/>${b ? '' : Array.from({ length: 8 }, (_, i) => `<path d="M250 40 L${250 + 26 * Math.cos(i * Math.PI / 4)} ${40 + 26 * Math.sin(i * Math.PI / 4)}" stroke="#F2A900" stroke-width="3" stroke-linecap="round"/>`).join('')}
      <circle cx="250" cy="40" r="15" fill="#FFC83A" ${s}/>${b ? '' : cloud(60, 40)}${cloud(160, 26)}
      <path d="M108 60 q6 -6 12 0 q6 -6 12 0" fill="none" ${s}/>
      <rect x="-2" y="165" width="304" height="40" fill="#86CF6F" ${s}/>
      <rect x="30" y="105" width="80" height="62" fill="#E6508A" ${s}/><path d="M24 108 L70 74 L116 108Z" fill="#C43D72" ${s}/><rect x="58" y="135" width="24" height="32" fill="${b ? '#3C7DD9' : '#FFC83A'}" ${s}/>
      <rect x="220" y="115" width="14" height="52" fill="#8A5A3B" ${s}/><circle cx="227" cy="100" r="28" fill="#43AE5B" ${s}/>
      <circle cx="213" cy="95" r="5" fill="#E23B3B" ${s}/><circle cx="230" cy="113" r="5" fill="#E23B3B" ${s}/>${b ? '' : `<circle cx="240" cy="93" r="5" fill="#E23B3B" ${s}/>`}
      ${[[130, '#E6508A'], [150, b ? '#FFC83A' : '#E6508A'], [170, '#E6508A']].map(([x, c]) => `<path d="M${x} 190 V179" ${s}/><circle cx="${x}" cy="178" r="6" fill="${c}" ${s}/>`).join('')}
      <g transform="translate(150 112) scale(.44)">${Art.head('goat')}</g>`;
  } },
  { t: 'Deniz Altı', d: [[80, 70, 24], [225, 55, 26], [148, 16, 9], [60, 178, 15], [200, 146, 20]], draw: (b) => {
    const s = 'stroke="#1D2E42" stroke-width="2"';
    const fish = (x, y, col, stripe) => `<path d="M${x + 18} ${y} L${x + 34} ${y - 11} L${x + 34} ${y + 11}Z" fill="${col}" ${s}/><ellipse cx="${x}" cy="${y}" rx="22" ry="13" fill="${col}" ${s}/>${stripe ? `<path d="M${x - 4} ${y - 12} v24M${x + 6} ${y - 11} v22" stroke="${stripe}" stroke-width="3"/>` : ''}<circle cx="${x - 12}" cy="${y - 3}" r="3" fill="#1D2E42"/>`;
    return `<rect width="300" height="200" fill="#6EC3E6"/><path d="M0 176 Q75 164 150 176 T300 172 V200 H0Z" fill="#F3D9A4" ${s}/>
      <path d="M268 176 C258 150 280 140 268 112 C262 140 250 150 262 176Z" fill="#43AE5B" ${s}/>
      ${fish(80, 70, '#F2752B', b ? '#3C7DD9' : '#fff')}${b ? '' : fish(225, 55, '#FFC83A', null)}
      <circle cx="150" cy="44" r="5" fill="none" ${s}/><circle cx="157" cy="30" r="4" fill="none" ${s}/>${b ? '' : `<circle cx="148" cy="16" r="3" fill="none" ${s}/>`}
      <path d="M60 164 L64 174 L75 175 L66 181 L69 192 L60 186 L51 192 L54 181 L45 175 L56 174Z" fill="${b ? '#F2752B' : '#E6508A'}" ${s}/>
      <rect x="182" y="152" width="38" height="24" rx="3" fill="#B7793F" ${s}/>${b ? `<path d="M182 152 L186 128 L224 132 L220 152Z" fill="#C88A4C" ${s}/><circle cx="201" cy="150" r="5" fill="#FFC83A"/>` : `<path d="M182 152 Q201 136 220 152Z" fill="#C88A4C" ${s}/>`}
      <circle cx="120" cy="128" r="16" fill="#9A7FE0" ${s}/>${[104, 112, 120, 128, 136].map(x => `<path d="M${x} 140 q-4 10 2 18" fill="none" stroke="#9A7FE0" stroke-width="5" stroke-linecap="round"/>`).join('')}<circle cx="114" cy="126" r="3" fill="#1D2E42"/><circle cx="126" cy="126" r="3" fill="#1D2E42"/>`;
  } }
];
Games.fark = (pg, g) => {
  const A = shell(pg, g); let si = dayIndex() % DIFFS.length;
  const start = () => {
    A.clear(); const sc = DIFFS[si], found = new Set(); let misses = 0, streak = 0, cool = false; A.stat('Bulunan', `0/${sc.d.length}`);
    A.box.innerHTML = levelChips(DIFFS.map((x, i) => [i, x.t]), si, 'sc') + `<p class="center small muted">Sağdaki resimde soldakinden farklı 5 şey var. Farkı gördüğün yere dokun!</p>
      <div class="diff"><div><div class="lbl">Birinci resim</div><svg viewBox="0 0 300 200" class="da">${sc.draw(false)}<g class="marks"></g></svg></div><div><div class="lbl">İkinci resim</div><svg viewBox="0 0 300 200" class="db">${sc.draw(true)}<g class="marks"></g></svg></div></div>
      <button class="btn sm ghost hint">💡 İpucu</button>`;
    $$('[data-sc]', A.box).forEach(b => b.addEventListener('click', () => { si = +b.dataset.sc; start(); }));
    const svgs = $$('.diff svg', A.box);
    const markAt = (k, cls = 'mark') => svgs.forEach(sv => { const [x, y, r] = sc.d[k]; $('.marks', sv).insertAdjacentHTML('beforeend', `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`); });
    svgs.forEach(sv => sv.addEventListener('click', (e) => {
      if (cool) return;
      const pt = sv.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(sv.getScreenCTM().inverse());
      const k = sc.d.findIndex(([x, y, r], j) => !found.has(j) && Math.hypot(p.x - x, p.y - y) <= r);
      if (k < 0) {
        sfx('no'); misses++; streak++; A.stat('Yanlış', misses);
        if (streak >= 3) { streak = 0; cool = true; toast('👀 Rastgele dokunma, dikkatle bak! 2 saniye mola.'); setTimeout(() => { cool = false; }, 2000); }
        return;
      }
      streak = 0;
      found.add(k); markAt(k); sfx('ok'); A.stat('Bulunan', `${found.size}/${sc.d.length}`);
      if (found.size === sc.d.length) A.win({ stars: Math.max(5, 15 - misses), msg: misses ? `Bütün farkları buldun! (${misses} yanlış dokunuş)` : 'Hiç yanlış yapmadan buldun!', again: start });
    }));
    $('.hint', A.box).addEventListener('click', () => { const k = sc.d.findIndex((_, j) => !found.has(j)); if (k < 0) return; markAt(k, 'miss'); setTimeout(() => $$('.miss', A.box).forEach(m => m.remove()), 1500); });
  };
  start();
};

/* 8. coloring */
const CZ = 'class="cz" fill="#fff" stroke="#1D2E42" stroke-width="3" stroke-linejoin="round"';
const COLOR_PAGES = [
  { id: 'kechy', t: 'Kechy', e: '🐐', vb: '0 0 200 200', svg: `<rect class="cz" fill="#fff" x="0" y="0" width="200" height="200"/>
    <path ${CZ} d="M74 60 C62 26 36 18 26 40 C36 34 52 40 62 66Z"/><path ${CZ} d="M126 60 C138 26 164 18 174 40 C164 34 148 40 138 66Z"/>
    <ellipse ${CZ} cx="36" cy="100" rx="26" ry="13" transform="rotate(-18 36 100)"/><ellipse ${CZ} cx="164" cy="100" rx="26" ry="13" transform="rotate(18 164 100)"/>
    <path ${CZ} d="M90 168 L100 192 L110 168Z"/>
    <path ${CZ} d="M100 44 C140 44 156 72 156 104 C156 144 132 172 100 172 C68 172 44 144 44 104 C44 72 60 44 100 44Z"/>
    <path ${CZ} d="M80 52 q9 -22 20 -4 q11 -20 20 4Z"/><ellipse ${CZ} cx="100" cy="136" rx="30" ry="22"/>
    <circle cx="80" cy="96" r="9" fill="#1D2E42"/><circle cx="120" cy="96" r="9" fill="#1D2E42"/><circle cx="83" cy="93" r="3" fill="#fff"/><circle cx="123" cy="93" r="3" fill="#fff"/>
    <ellipse cx="90" cy="132" rx="3.5" ry="5" fill="#1D2E42"/><ellipse cx="110" cy="132" rx="3.5" ry="5" fill="#1D2E42"/><path d="M90 146 Q100 154 110 146" fill="none" stroke="#1D2E42" stroke-width="3" stroke-linecap="round"/>
    <path ${CZ} d="M22 150 l5 10 11 1 -8 7 3 11 -11 -6 -11 6 3 -11 -8 -7 11 -1z"/><path ${CZ} d="M178 20 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z"/>` },
  { id: 'ev', t: 'Ev ve Bahçe', e: '🏠', vb: '0 0 300 220', svg: `<rect class="cz" fill="#fff" x="0" y="0" width="300" height="220"/>
    <circle ${CZ} cx="250" cy="42" r="22"/><path ${CZ} d="M40 60 a14 14 0 0 1 8 -24 a20 20 0 0 1 36 -6 a16 16 0 0 1 28 12 a12 12 0 0 1 -2 18z"/>
    <rect ${CZ} x="-3" y="170" width="306" height="53"/><rect ${CZ} x="150" y="70" width="18" height="40"/>
    <rect ${CZ} x="70" y="110" width="120" height="80"/><path ${CZ} d="M58 114 L130 58 L202 114Z"/>
    <rect ${CZ} x="116" y="140" width="30" height="50"/><rect ${CZ} x="82" y="126" width="24" height="24"/><rect ${CZ} x="156" y="126" width="24" height="24"/>
    <path ${CZ} d="M116 190 L146 190 L160 223 L100 223Z"/><rect ${CZ} x="236" y="130" width="14" height="50"/><circle ${CZ} cx="243" cy="112" r="30"/>
    <circle ${CZ} cx="30" cy="186" r="9"/><circle ${CZ} cx="54" cy="192" r="9"/><circle ${CZ} cx="276" cy="196" r="9"/>` },
  { id: 'balik', t: 'Balık', e: '🐟', vb: '0 0 300 220', svg: `<rect class="cz" fill="#fff" x="0" y="0" width="300" height="220"/>
    <path ${CZ} d="M0 190 Q75 176 150 190 T300 186 V223 H0Z"/><path ${CZ} d="M40 190 C30 160 54 150 40 118 C60 140 64 160 56 190Z"/><path ${CZ} d="M262 188 C252 158 276 148 262 116 C282 138 286 158 278 188Z"/>
    <path ${CZ} d="M196 104 L246 70 L246 140Z"/><path ${CZ} d="M120 70 C130 40 170 40 180 72Z"/>
    <ellipse ${CZ} cx="140" cy="106" rx="66" ry="42"/><path ${CZ} d="M120 66 C112 90 112 122 120 146 L136 148 C128 122 128 90 136 64Z"/><path ${CZ} d="M156 66 C148 90 148 122 156 146 L170 142 C162 120 162 92 170 70Z"/>
    <circle cx="100" cy="96" r="8" fill="#1D2E42"/><circle cx="102" cy="93" r="3" fill="#fff"/><path d="M80 116 q8 6 16 0" fill="none" stroke="#1D2E42" stroke-width="3" stroke-linecap="round"/>
    <circle ${CZ} cx="70" cy="50" r="10"/><circle ${CZ} cx="54" cy="26" r="7"/><circle ${CZ} cx="80" cy="18" r="5"/><path ${CZ} d="M200 196 q14 -22 28 0z"/>` },
  { id: 'roket', t: 'Roket', e: '🚀', vb: '0 0 300 220', svg: `<rect class="cz" fill="#fff" x="0" y="0" width="300" height="220"/>
    <ellipse ${CZ} cx="232" cy="64" rx="52" ry="12" transform="rotate(-12 232 64)"/><circle ${CZ} cx="232" cy="64" r="30"/>
    <path ${CZ} d="M40 40 l5 10 11 1 -8 7 3 11 -10 -6 -10 6 3 -11 -8 -7 11 -1z"/><path ${CZ} d="M70 150 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z"/><path ${CZ} d="M262 160 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z"/>
    <path ${CZ} d="M130 186 C124 200 140 216 150 214 C160 216 176 200 170 186Z"/><path ${CZ} d="M120 150 L96 186 L124 180Z"/><path ${CZ} d="M180 150 L204 186 L176 180Z"/>
    <path ${CZ} d="M124 70 C124 40 176 40 176 70 L176 182 L124 182Z"/><path ${CZ} d="M124 72 C126 36 150 16 150 16 C150 16 174 36 176 72Z"/><circle ${CZ} cx="150" cy="104" r="16"/>` }
];
Games.boyama = (pg, g) => {
  const A = shell(pg, g), COLS = ['#E23B3B', '#F2752B', '#FFC83A', '#FFE08A', '#43AE5B', '#A7DDA9', '#1FA2B0', '#7FD3DA', '#3C7DD9', '#9A7FE0', '#E6508A', '#F7A9C8', '#8A5A3B', '#F3D9A4', '#1D2E42', '#FFFFFF'];
  let pi = Math.max(0, COLOR_PAGES.findIndex(p => p.id === window.__boyaPage)), col = COLS[2];
  const start = () => {
    A.clear(); const pgd = COLOR_PAGES[pi];
    A.box.innerHTML = levelChips(COLOR_PAGES.map((p, i) => [i, p.e + ' ' + p.t]), pi, 'p') + `<div class="color-wrap"><svg viewBox="${pgd.vb}" role="img" aria-label="Boyama sayfası: ${pgd.t}">${pgd.svg}</svg>
      <div class="stack"><div class="palette">${COLS.map(c => `<button class="sw" style="background:${c}" data-c="${c}" aria-label="Renk" aria-pressed="${c === col}"></button>`).join('')}</div>
      <div class="row"><button class="btn sm ghost clr">🧽 Temizle</button><button class="btn sm ghost magic">🪄 Sihirli boya (3)</button></div><button class="btn leaf done">✓ Bitti!</button></div></div>`;
    $$('[data-p]', A.box).forEach(b => b.addEventListener('click', () => { pi = +b.dataset.p; start(); }));
    const zones = $$('.cz', A.box), done = new Set(), magicSet = new Set(); let magic = 3;
    A.stat('Boyanan', `0/${zones.length}`);
    const fill = (z, c) => { z.setAttribute('fill', c); done.add(z); A.stat('Boyanan', `${done.size}/${zones.length}`); };
    zones.forEach(z => z.addEventListener('click', () => { fill(z, col); magicSet.delete(z); sfx('pop'); }));
    $$('.sw', A.box).forEach(b => b.addEventListener('click', () => { col = b.dataset.c; $$('.sw', A.box).forEach(x => x.setAttribute('aria-pressed', String(x === b))); }));
    $('.clr', A.box).addEventListener('click', () => { zones.forEach(z => z.setAttribute('fill', '#fff')); done.clear(); magicSet.clear(); A.stat('Boyanan', `0/${zones.length}`); });
    $('.magic', A.box).addEventListener('click', (e) => {
      if (magic <= 0) return toast('Sihirli boya bitti, gerisini sen boya! 🖍️');
      const left = zones.filter(z => !done.has(z)); if (!left.length) return;
      const z = left[Math.floor(Math.random() * left.length)]; fill(z, COLS[Math.floor(Math.random() * 14)]); magicSet.add(z); magic--;
      e.currentTarget.textContent = `🪄 Sihirli boya (${magic})`; sfx('ok');
    });
    let won = false;
    $('.done', A.box).addEventListener('click', (e) => {
      const hand = [...done].filter(z => !magicSet.has(z)).length;
      if (hand < Math.ceil(zones.length * .6)) return toast(`Biraz daha boya! Resmin çoğunu kendin boyamalısın (${hand}/${Math.ceil(zones.length * .6)}).`);
      if (won) return toast('Çok güzel olmuş!'); won = true;
      A.win({ stars: 10, msg: `${pgd.t} boyaman harika oldu!`, src: e.currentTarget, again: start });
    });
  };
  start();
};

/* 9. riddles */
Games.bilmece = (pg, g) => {
  const A = shell(pg, g); A.box.style.alignItems = 'stretch';
  const round = shuffle(DATA.RIDDLES).slice(0, 5); let i = 0, score = 0;
  const step = () => {
    if (i >= round.length) {
      A.box.innerHTML = `<div class="center stack" style="align-items:center"><div style="width:120px">${Art.character('piko', 'happy2')}</div><h2>${round.length} bilmeceden ${score} tanesini bildin!</h2><p class="muted">Piko diyor ki: “Bu bilmeceleri akşam ailene sor!”</p></div>`;
      return A.win({ stars: Math.max(5, score * 3), msg: `${score}/${round.length} bilmece!`, score });
    }
    const r = round[i], opts = shuffle([r[1], ...r[2]]);
    A.box.innerHTML = `<div class="stack"><span class="pill sky" style="align-self:flex-start">Bilmece ${i + 1}/${round.length}</span>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div style="width:70px;flex-shrink:0">${Art.character('piko', 'wink')}</div><p class="qtext" style="flex:1">“${esc(r[0])}”</p>${sayBtn('Bilmece: ' + r[0])}</div>
      <div class="qopts three">${opts.map(o => `<button class="qopt" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="qres"></div></div>`;
    $$('.qopt', A.box).forEach(b => b.addEventListener('click', () => {
      const ok = b.dataset.o === r[1]; if (ok) { score++; S.count.bilmece++; save(); }
      sfx(ok ? 'ok' : 'no');
      $$('.qopt', A.box).forEach(x => { x.disabled = true; if (x.dataset.o === r[1]) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      $('.qres', A.box).innerHTML = `<div class="explain ${ok ? '' : 'no'}"><span style="font-size:1.6rem">${ok ? '🎉' : '💡'}</span><div><b>${ok ? 'Bildin!' : 'Cevap: ' + esc(r[1])}</b></div></div>
        <div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn sky next">${i + 1 < round.length ? 'Sonraki bilmece →' : 'Sonuç 🎉'}</button></div>`;
      $('.next', A.box).addEventListener('click', () => { i++; step(); });
    }));
  };
  step();
};

/* 10. flags */
Games.ulke = (pg, g) => {
  const A = shell(pg, g); A.box.style.alignItems = 'stretch';
  const round = shuffle(DATA.COUNTRIES).slice(0, 8); let i = 0, score = 0;
  const step = () => {
    A.stat('Soru', `${Math.min(i + 1, 8)}/8`);
    if (i >= round.length) {
      A.box.innerHTML = `<div class="center stack" style="align-items:center"><div style="font-size:4rem">🗺️</div><h2>8 bayraktan ${score} tanesini bildin!</h2><p class="muted">Haritada bu ülkeleri keşfedip pasaportuna damga alabilirsin.</p><a class="btn sky" href="#harita">🗺️ Haritaya git</a></div>`;
      return A.win({ stars: Math.max(5, score * 2), msg: `${score}/8 bayrak!`, score });
    }
    const c = round[i], opts = shuffle([c, ...shuffle(DATA.COUNTRIES.filter(x => x !== c)).slice(0, 3)]);
    A.box.innerHTML = `<div class="stack"><div class="center"><span class="flag" style="font-size:clamp(5rem,20vw,8rem);line-height:1.1" role="img" aria-label="Bayrak">${c.flag}</span></div><p class="qtext center">Bu hangi ülkenin bayrağı?</p>
      <div class="qopts">${opts.map(o => `<button class="qopt" data-c="${o.code}">${o.name}</button>`).join('')}</div><div class="qres"></div></div>`;
    $$('.qopt', A.box).forEach(b => b.addEventListener('click', () => {
      const ok = b.dataset.c === c.code; if (ok) score++; sfx(ok ? 'ok' : 'no');
      $$('.qopt', A.box).forEach(x => { x.disabled = true; if (x.dataset.c === c.code) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      $('.qres', A.box).innerHTML = `<div class="explain ${ok ? '' : 'no'}"><span style="font-size:1.6rem">${ok ? '🎉' : '💡'}</span><div><b>${ok ? 'Doğru!' : 'Bu, ' + c.name + ' bayrağı.'}</b><p>Başkenti ${c.cap}. ${esc(c.fact)}</p></div></div>
        <div class="row" style="justify-content:flex-end;margin-top:10px"><button class="btn sky next">${i + 1 < round.length ? 'Sonraki bayrak →' : 'Sonuç 🎉'}</button></div>`;
      $('.next', A.box).addEventListener('click', () => { i++; step(); });
    }));
  };
  step();
};

/* 11. planets */
Games.uzay = (pg, g) => {
  const A = shell(pg, g);
  const start = () => {
    A.clear(); let next = 0, miss = 0;
    const tw = Array.from({ length: 30 }, (_, k) => `<i class="twk" style="left:${(k * 29) % 100}%;top:${(k * 47) % 100}%;animation-delay:${(k % 5) * .5}s"></i>`).join('');
    A.box.innerHTML = `<p class="center">Güneş'ten başlayarak gezegenleri sırayla seç. İlki Güneş'e en yakın olan!</p>
      <div class="space">${tw}<div class="sunball"></div><div class="orbit" aria-label="Yörünge"></div><div class="pool"></div></div><p class="pfact center" aria-live="polite"></p>`;
    const pool = $('.pool', A.box), orbit = $('.orbit', A.box); A.stat('Sıra', '0/8');
    shuffle(DATA.PLANETS.map((p, k) => ({ ...p, k }))).forEach(p => { const el = h(`<button class="planet" style="${Art.planetCSS(p)}" aria-label="${p.n}">${p.ring ? '<i class="ring"></i>' : ''}<label>${p.n}</label></button>`); el.dataset.k = p.k; pool.append(el); });
    pool.addEventListener('click', (e) => {
      const el = e.target.closest('.planet'); if (!el) return; const k = +el.dataset.k, p = DATA.PLANETS[k];
      if (k === next) {
        sfx('ok'); orbit.append(el); el.style.transform = 'scale(.8)'; next++; $('.pfact', A.box).innerHTML = `<b>${p.n}:</b> ${p.f}`; A.stat('Sıra', `${next}/8`);
        if (next === 8) A.win({ stars: Math.max(5, 15 - miss * 2), msg: miss ? 'Gezegenleri doğru sıraladın!' : 'Hiç hata yapmadan sıraladın!', badge: 'uzay', again: start });
      } else { miss++; sfx('no'); el.classList.remove('no'); void el.offsetWidth; el.classList.add('no'); $('.pfact', A.box).textContent = `${p.n} değil. Güneş'e en yakın ${next === 0 ? 'gezegeni' : 'sıradaki gezegeni'} düşün!`; }
    });
  };
  start();
};

/* 12. animal rescue */
Games.hayvan = (pg, g) => {
  const A = shell(pg, g);
  const start = () => {
    A.clear();
    const all = DATA.HABITATS.flatMap(hb => hb.a.map(([e, n]) => ({ e, n, h: hb.id }))), round = shuffle(all).slice(0, 8), counts = {};
    let i = 0, wrong = 0;
    A.box.innerHTML = `<div class="rescue"><p class="qtext center now-name"></p><div class="animal-now" aria-live="polite"></div>
      <div class="habitats">${DATA.HABITATS.map(hb => `<button class="hab" data-h="${hb.id}" style="background:${hb.c}"><span class="e">${hb.e}</span>${hb.n}<span class="small cnt tnum">0</span></button>`).join('')}</div>
      <p class="small muted msg center">Hayvanı evine götürmek için doğru yere dokun.</p></div>`;
    const show = () => { const a = round[i]; $('.animal-now', A.box).innerHTML = `<span class="a-pop" style="display:inline-block">${a.e}</span>`; $('.now-name', A.box).textContent = `${a.n} nerede yaşar?`; A.stat('Kurtarılan', `${i}/${round.length}`); };
    $$('.hab', A.box).forEach(b => b.addEventListener('click', () => {
      const a = round[i]; if (!a) return;
      if (b.dataset.h === a.h) {
        sfx('ok'); counts[a.h] = (counts[a.h] || 0) + 1; $('.cnt', b).textContent = counts[a.h]; flyTo($('.animal-now span', A.box), b); i++;
        $('.msg', A.box).textContent = `${a.e} ${a.n} evine döndü!`;
        if (i < round.length) setTimeout(show, 420);
        else { A.stat('Kurtarılan', `${i}/${round.length}`); $('.animal-now', A.box).textContent = '🏡'; $('.now-name', A.box).textContent = 'Herkes evinde!'; A.win({ stars: Math.max(5, 15 - wrong * 2), msg: wrong ? `Bütün hayvanları evine götürdün! (${wrong} yanlış)` : 'Hiç yanlış yapmadan hepsini kurtardın!', badge: 'hayvan', again: start }); }
      } else { wrong++; sfx('no'); b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); $('.msg', A.box).textContent = `Hmm, ${a.n} orada rahat edemez. Tekrar dene!`; }
    }));
    show();
  };
  start();
};

/* 13. detective */
Games.dedektif = (pg, g) => {
  const A = shell(pg, g); A.box.style.alignItems = 'stretch';
  const menu = () => {
    A.clear();
    A.box.innerHTML = `<p>Bir vaka seç, odadaki ipuçlarını topla ve kilidin şifresini çöz!</p><div class="grid g3">${DATA.CASES.map((c, i) => `<button class="card fcard ${['sun', 'lilac', 'sky'][i]}" data-c="${i}" style="text-align:left;font:inherit;color:inherit;cursor:pointer"><span class="big">${c.e}</span><h3>${c.title}</h3><p class="small">${S.cases[c.id] ? 'Çözüldü ✓' : 'Vaka ' + (i + 1)}</p></button>`).join('')}</div>`;
    $$('[data-c]', A.box).forEach(b => b.addEventListener('click', () => play(DATA.CASES[+b.dataset.c])));
  };
  const play = (c) => {
    A.clear(); const got = []; let code = [];
    A.box.innerHTML = `<div class="row"><button class="btn sm ghost back">← Vakalar</button><h2 style="font-size:1.5rem">${c.e} ${c.title}</h2></div>
      <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><p style="flex:1">${esc(c.intro)}</p>${sayBtn(c.intro)}</div>
      <div class="room" style="background:${c.bg};margin:0 auto">${c.spots.map((s, i) => `<button class="spot" data-s="${i}" style="left:${s[1]}%;top:${s[2]}%" aria-label="İncele">${s[0]}</button>`).join('')}</div>
      <div class="notebook stack" style="margin:0 auto"><b style="font-family:var(--font-d)">🕵️ Dedektif defteri</b><p class="small nb-msg">Odadaki eşyalara dokun ve incele.</p><div class="clues">${c.code.map(() => '<span class="clue">?</span>').join('')}</div><p class="small"><b>Şifre sırası:</b> ${esc(c.order)}</p></div>
      <div class="lockbox stack" style="align-items:center" hidden><h3>🔒 Kilidi aç</h3><div class="slots">${c.code.map(() => '<span class="slot"></span>').join('')}</div>
        <div class="keypad">${DATA.KEYPAD.map(k => `<button class="btn ghost sm key" data-k="${k}">${k}</button>`).join('')}</div><div class="row"><button class="btn ghost del">⌫ Sil</button><button class="btn lg opn">🔓 Aç</button></div></div>`;
    $('.back', A.box).addEventListener('click', menu);
    const clues = $$('.clue', A.box), slots = $$('.slot', A.box), lock = $('.lockbox', A.box);
    A.stat('İpucu', `0/${c.code.length}`);
    $$('.spot', A.box).forEach(b => b.addEventListener('click', () => {
      const s = c.spots[+b.dataset.s]; b.classList.add('seen'); sfx('pop');
      const lens = h('<span class="lens">🔍</span>'); lens.style.left = `calc(${s[1]}% - 16px)`; lens.style.top = `calc(${s[2]}% - 20px)`; $('.room', A.box).append(lens); setTimeout(() => lens.remove(), 650);
      $('.nb-msg', A.box).textContent = s[0] + ' ' + s[4];
      if (s[3] && !got.includes(s[3])) {
        got.push(s[3]); const cl = clues[got.length - 1]; cl.textContent = s[3]; cl.classList.add('got'); sfx('ok'); A.stat('İpucu', `${got.length}/${c.code.length}`);
        if (got.length === c.code.length) { lock.hidden = false; $('.nb-msg', A.box).textContent = 'Bütün ipuçlarını buldun! Şimdi şifre sırasına göre kilidi aç.'; if (!reduced()) lock.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }
    }));
    const drawSlots = () => slots.forEach((s, i) => { s.textContent = code[i] || ''; });
    $$('.key', A.box).forEach(b => b.addEventListener('click', () => { if (code.length < c.code.length) { code.push(b.dataset.k); drawSlots(); sfx('flip'); } }));
    $('.del', A.box).addEventListener('click', () => { code.pop(); drawSlots(); });
    $('.opn', A.box).addEventListener('click', (e) => {
      if (code.join('|') !== c.code.join('|')) { sfx('no'); const sl = $('.slots', A.box); sl.style.animation = 'none'; void sl.offsetWidth; sl.style.animation = 'shake .4s'; toast('Şifre açmadı. Şifre sırasını tekrar oku!'); return; }
      S.cases[c.id] = dateKey(); save();
      Modal.later(() => Modal.open(`<div class="reward"><div style="font-size:4rem">🔓</div><span class="eyebrow">Vaka çözüldü!</span><h2>${c.title}</h2><p style="font-size:1.1rem">${esc(c.solve)}</p><div class="row" style="justify-content:center">${sayBtn(c.solve)}<button class="btn" data-close>Süper!</button></div></div>`));
      A.win({ stars: 20, msg: 'Vakayı çözdün, dedektif!', badge: 'dedektif', again: menu, src: e.currentTarget });
    });
  };
  menu();
};

/* 14. letter hunt */
Games.harf = (pg, g) => {
  const A = shell(pg, g), LET = 'ABDEGKMST';
  let letter = LET[dayIndex() % LET.length], iv = null;
  onLeave(() => clearInterval(iv));
  const start = () => {
    A.clear(); clearInterval(iv);
    A.box.innerHTML = `<div class="center stack" style="align-items:center"><span class="eyebrow">Bugünün harfi</span>
      <div style="font-family:var(--font-d);font-weight:800;font-size:6rem;line-height:1;color:var(--horn);-webkit-text-stroke:3px var(--line)">${letter}</div>
      <p>3 dakikada <b>${letter}</b> harfiyle başlayan 10 kelime yaz!</p>${levelChips([...LET].map(l => [l, l]), letter, 'l')}<button class="btn lg go">▶ Başla</button></div>`;
    $$('[data-l]', A.box).forEach(b => b.addEventListener('click', () => { letter = b.dataset.l; start(); }));
    $('.go', A.box).addEventListener('click', play);
  };
  const play = () => {
    let left = 180; const words = [], L = trLower(letter);
    A.box.innerHTML = `<div class="center stack" style="align-items:center;width:100%"><div style="font-family:var(--font-d);font-weight:800;font-size:3.4rem;line-height:1;color:var(--horn);-webkit-text-stroke:2px var(--line)">${letter}</div>
      <form class="row hform" style="justify-content:center;width:100%"><input class="txt" id="hw" autocomplete="off" autocapitalize="off" placeholder="${letter} ile başlayan bir kelime" style="max-width:320px" aria-label="Kelime"><button class="btn sky">Ekle</button></form>
      <p class="small hmsg muted" aria-live="polite">Kelimeyi yaz ve Ekle'ye bas.</p><div class="prog leaf" style="width:min(420px,100%)"><i style="width:0"></i></div><div class="chips words" style="justify-content:center"></div></div>`;
    const inp = $('#hw', A.box), msg = $('.hmsg', A.box);
    const finish = () => {
      clearInterval(iv); inp.disabled = true;
      if (words.length >= 5) A.win({ stars: words.length >= 10 ? 20 : 10, msg: `${words.length} kelime buldun!`, score: words.length, again: start });
      else nextUp(A.after, '⏰ Süre bitti!', `${words.length} kelime buldun. Bir daha denemeye ne dersin?`, [['🔁 Tekrar dene', start, 'sky'], ['🎮 Başka oyun', 'oyna', ''], ['🏠 Ana sayfa', 'kechy', 'ghost']]);
    };
    A.stat('Süre', fmtT(left * 1000)); A.stat('Kelime', '0/10');
    iv = setInterval(() => { left--; A.stat('Süre', fmtT(left * 1000)); if (left <= 0) finish(); }, 1000);
    $('.hform', A.box).addEventListener('submit', (e) => {
      e.preventDefault(); const w = trLower(inp.value.trim());
      if (!w) return;
      if (!/^[a-zçğıöşüâîû]+$/.test(w)) msg.textContent = 'Sadece harf kullan, boşluk olmasın.';
      else if (!w.startsWith(L)) msg.textContent = `Kelime “${letter}” harfiyle başlamalı.`;
      else if (w.length < 2) msg.textContent = 'Biraz daha uzun bir kelime dene.';
      else if (words.includes(w)) msg.textContent = 'Bu kelimeyi zaten yazdın!';
      else {
        words.push(w); sfx('ok'); msg.textContent = 'Süper! 👏';
        $('.words', A.box).insertAdjacentHTML('beforeend', `<span class="chip" style="cursor:default">${esc(w)}</span>`);
        $('.prog i', A.box).style.width = Math.min(100, words.length * 10) + '%'; A.stat('Kelime', `${words.length}/10`);
        if (words.length >= 10) finish();
      }
      inp.value = ''; inp.focus();
    });
    inp.focus();
  };
  start();
};
