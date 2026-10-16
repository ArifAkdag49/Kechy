/* ============ Sahne çizici: her sayfaya metinle aynı sahneyi çizer ============
   Spec: "arka-plan; öğe x y boyut [ifade|hareket]; ..."  (tuval 400x300)
   Öğe bir karakter (kechy, momo, mino, piko, luna, robo) ya da bir emoji olabilir. Karakterlerde x=orta, y=ayak hizası, boyut=ölçek. */
const Scene = (() => {
  const INK = '#1D2E42', S = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
  let uid = 0;
  const grad = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const sun = (x, y, r = 26) => `<g>${Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return `<path d="M${x + (r + 6) * Math.cos(a)} ${y + (r + 6) * Math.sin(a)} L${x + (r + 16) * Math.cos(a)} ${y + (r + 16) * Math.sin(a)}" stroke="#F2A900" stroke-width="4" stroke-linecap="round"/>`; }).join('')}<circle cx="${x}" cy="${y}" r="${r}" fill="#FFC83A" ${S}/></g>`;
  const cloud = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-40 12 a16 16 0 0 1 8 -28 a22 22 0 0 1 40 -8 a18 18 0 0 1 32 14 a14 14 0 0 1 0 22z" fill="#fff" ${S}/>`;
  const hills = (a = '#9ED98A', b = '#7FC76E', y = 225) => `<path d="M-5 ${y + 10} Q90 ${y - 30} 200 ${y + 5} T405 ${y - 10} V305 H-5Z" fill="${a}" ${S}/><path d="M-5 ${y + 40} Q120 ${y + 15} 240 ${y + 38} T405 ${y + 30} V305 H-5Z" fill="${b}" ${S}/>`;
  const tree = (x, y, s = 1, c = '#43AE5B') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-8" y="-60" width="16" height="62" rx="4" fill="#8A5A3B" ${S}/><circle cx="0" cy="-78" r="34" fill="${c}" ${S}/><circle cx="-24" cy="-58" r="20" fill="${c}" ${S}/><circle cx="24" cy="-58" r="20" fill="${c}" ${S}/></g>`;
  const pine = (x, y, s = 1, snow) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-18" width="12" height="20" fill="#8A5A3B" ${S}/><path d="M0 -110 L34 -50 L20 -50 L42 -16 L-42 -16 L-20 -50 L-34 -50Z" fill="#2E8B57" ${S}/>${snow ? '<path d="M0 -110 L14 -84 L4 -88 L-4 -80 L-14 -84Z" fill="#fff"/><path d="M-22 -50 L22 -50 L16 -44 L-16 -44Z" fill="#fff"/>' : ''}</g>`;
  const flower = (x, y, c) => `<g><path d="M${x} ${y} v22" stroke="#2E8B57" stroke-width="3"/><circle cx="${x - 6}" cy="${y}" r="6" fill="${c}" ${S} stroke-width="1.5"/><circle cx="${x + 6}" cy="${y}" r="6" fill="${c}" ${S} stroke-width="1.5"/><circle cx="${x}" cy="${y - 6}" r="6" fill="${c}" ${S} stroke-width="1.5"/><circle cx="${x}" cy="${y + 6}" r="6" fill="${c}" ${S} stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="4" fill="#FFC83A"/></g>`;
  const stars = (n, seed, h = 220) => { const r = Art.rng(seed); return Array.from({ length: n }, () => `<circle cx="${(r() * 400).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(1 + r() * 2).toFixed(1)}" fill="#FFF6C8"/>`).join(''); };
  const BG = {
    sky: (id) => `<defs>${grad(id, '#8FDDE2', '#E9F9F4')}</defs><rect width="400" height="300" fill="url(#${id})"/>${sun(340, 60)}${cloud(90, 70, 1)}${cloud(230, 45, .7)}${hills()}`,
    meadow: (id) => BG.sky(id) + flower(60, 262, '#E6508A') + flower(340, 270, '#FFC83A') + flower(300, 280, '#9A7FE0'),
    garden: (id) => `<defs>${grad(id, '#9EE0E6', '#F2FBF5')}</defs><rect width="400" height="300" fill="url(#${id})"/>${sun(60, 55, 22)}${cloud(300, 60, .8)}<rect x="-5" y="228" width="410" height="80" fill="#8FD17A" ${S}/>` + Array.from({ length: 11 }, (_, i) => `<path d="M${i * 38 + 6} 232 v-44 l8 -10 l8 10 v44z" fill="#fff" ${S} stroke-width="2"/>`).join('') + `<rect x="-5" y="206" width="410" height="8" fill="#fff" ${S} stroke-width="2"/>` + [30, 110, 290, 370].map((x, i) => flower(x, 258, ['#E6508A', '#FFC83A', '#F2752B', '#9A7FE0'][i])).join(''),
    forest: (id) => `<defs>${grad(id, '#BFE8C8', '#EAF7E6')}</defs><rect width="400" height="300" fill="url(#${id})"/>${tree(40, 236, 1.1, '#2E8B57')}${tree(360, 240, 1.2, '#2E8B57')}${tree(120, 226, .8, '#43AE5B')}${tree(290, 222, .75, '#43AE5B')}<path d="M-5 236 Q200 220 405 238 V305 H-5Z" fill="#7FC76E" ${S}/>`,
    sea: (id) => `<defs>${grad(id, '#7FD3F0', '#1C6FB4')}</defs><rect width="400" height="300" fill="url(#${id})"/><path d="M60 0 L120 0 L60 300 L20 300Z" fill="#fff" opacity=".12"/><path d="M230 0 L270 0 L230 300 L200 300Z" fill="#fff" opacity=".1"/><path d="M-5 262 Q100 244 200 262 T405 256 V305 H-5Z" fill="#F3D9A4" ${S}/><path d="M30 270 C20 240 44 228 30 196 C50 222 52 244 44 270Z" fill="#43AE5B" ${S}/><path d="M370 268 C360 236 384 226 372 190 C392 220 392 244 384 268Z" fill="#43AE5B" ${S}/>`,
    space: (id) => `<rect width="400" height="300" fill="#0E1A3A"/><circle cx="330" cy="70" r="90" fill="#3D4FA8" opacity=".25"/>${stars(46, 7, 300)}<g transform="translate(70 70)"><ellipse cx="0" cy="0" rx="48" ry="12" fill="none" stroke="#E9CD8B" stroke-width="5" transform="rotate(-15)"/><circle r="26" fill="#E9CD8B" ${S}/></g>`,
    moon: (id) => BG.space(id) + `<path d="M-5 240 Q200 205 405 240 V305 H-5Z" fill="#C9CFD8" ${S}/><ellipse cx="90" cy="262" rx="26" ry="8" fill="#AEB6C2"/><ellipse cx="300" cy="258" rx="34" ry="9" fill="#AEB6C2"/><ellipse cx="200" cy="284" rx="18" ry="5" fill="#AEB6C2"/>`,
    night: (id) => `<defs>${grad(id, '#0A1B38', '#2B4F7C')}</defs><rect width="400" height="300" fill="url(#${id})"/>${stars(36, 3, 200)}<path d="M340 32 A34 34 0 1 0 366 86 A27 27 0 1 1 340 32Z" fill="#FFE08A" ${S}/>${hills('#2E6B4A', '#245A3D', 230)}`,
    room: (id) => `<rect width="400" height="300" fill="#FFE9C7"/><rect x="0" y="228" width="400" height="80" fill="#D9A066" ${S}/>${[40, 120, 200, 280, 360].map(x => `<path d="M${x} 228 v80" stroke="#B9834F" stroke-width="2"/>`).join('')}<rect x="250" y="40" width="110" height="90" rx="6" fill="#BFEFF3" ${S}/><path d="M305 40 v90 M250 85 h110" ${S}/>${cloud(300, 70, .4)}<path d="M244 36 q30 60 0 110 M366 36 q-30 60 0 110" fill="#E6508A" ${S}/><rect x="36" y="80" width="120" height="10" fill="#B9834F" ${S}/>${['#E6508A', '#1FA2B0', '#FFC83A', '#43AE5B'].map((c, i) => `<rect x="${46 + i * 22}" y="${50 + (i % 2) * 6}" width="16" height="${30 - (i % 2) * 6}" fill="${c}" ${S} stroke-width="2"/>`).join('')}<ellipse cx="200" cy="270" rx="120" ry="20" fill="#9A7FE0" opacity=".45"/>`,
    school: (id) => `<rect width="400" height="300" fill="#DCEFF7"/><rect x="0" y="230" width="400" height="80" fill="#C9A27A" ${S}/><rect x="90" y="36" width="220" height="110" rx="6" fill="#2E5E4E" ${S} stroke-width="4"/><text x="120" y="100" font-family="Fredoka, Baloo 2, sans-serif" font-size="34" fill="#fff" opacity=".85">A B C 1 2 3</text><rect x="330" y="60" width="50" height="70" rx="4" fill="#FFC83A" ${S}/><circle cx="355" cy="95" r="14" fill="#fff" ${S}/><path d="M355 95 v-9 M355 95 h7" ${S}/>`,
    lab: (id) => `<rect width="400" height="300" fill="#EDE6FA"/><rect x="20" y="70" width="140" height="10" fill="#B9834F" ${S}/>${['#43AE5B', '#E6508A', '#1FA2B0'].map((c, i) => `<g transform="translate(${40 + i * 45} 70)"><path d="M-8 -40 h16 v14 l12 22 a4 4 0 0 1 -4 4 h-32 a4 4 0 0 1 -4 -4 l12 -22z" fill="#fff" ${S} stroke-width="2"/><path d="M-14 -10 h28 l6 8 a3 3 0 0 1 -3 2 h-34 a3 3 0 0 1 -3 -2z" fill="${c}"/></g>`).join('')}<rect x="0" y="232" width="400" height="80" fill="#B9834F" ${S}/><rect x="250" y="40" width="120" height="80" rx="8" fill="#fff" ${S}/><path d="M262 100 l20 -24 l18 12 l22 -30 l24 20" fill="none" stroke="#E6508A" stroke-width="4" stroke-linecap="round"/>`,
    stage: (id) => `<rect width="400" height="300" fill="#2A1B3D"/><path d="M130 0 L270 0 L340 240 L60 240Z" fill="#FFE08A" opacity=".22"/><rect x="0" y="232" width="400" height="80" fill="#8A5A3B" ${S}/><path d="M0 0 h70 q-20 120 0 240 h-70z" fill="#C43D72" ${S}/><path d="M400 0 h-70 q20 120 0 240 h70z" fill="#C43D72" ${S}/><path d="M0 0 h400 v30 q-50 20 -100 0 q-50 20 -100 0 q-50 20 -100 0 q-50 20 -100 0z" fill="#E6508A" ${S}/>`,
    snow: (id) => `<defs>${grad(id, '#CFE7F7', '#F7FBFF')}</defs><rect width="400" height="300" fill="url(#${id})"/>${cloud(80, 60, .9)}${cloud(300, 40, .6)}${pine(50, 250, 1, true)}${pine(360, 246, .9, true)}${hills('#FFFFFF', '#EEF6FC', 228)}` + Array.from({ length: 18 }, (_, i) => `<circle cx="${(i * 71) % 400}" cy="${(i * 37) % 220}" r="3" fill="#fff" ${S} stroke-width="1"/>`).join(''),
    beach: (id) => `<defs>${grad(id, '#8FDDE2', '#E9F9F4')}</defs><rect width="400" height="300" fill="url(#${id})"/>${sun(330, 60)}${cloud(120, 55, .8)}<path d="M-5 190 Q100 182 200 192 T405 186 V230 H-5Z" fill="#4CC3CF" ${S}/><path d="M20 200 q14 -8 28 0 M160 204 q14 -8 28 0 M300 198 q14 -8 28 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M-5 224 Q200 210 405 226 V305 H-5Z" fill="#F7E0A8" ${S}/><path d="M60 250 L66 140" ${S} stroke-width="4"/><path d="M6 150 Q66 96 126 150Z" fill="#E6508A" ${S}/><path d="M36 150 Q66 100 66 150 Z" fill="#fff"/><path d="M96 150 Q66 100 66 150 Z" fill="#FFC83A"/>`
  };
  const FIG = { momo: '#E0B07A', mino: '#CBD5E1', piko: '#4DB35E', luna: '#9E80D6', robo: '#A9C4D6' };
  function figure(id, expr) {
    if (id === 'kechy') return { w: 220, h: 262, svg: Art.kechy(expr || 'happy').replace(/<svg[^>]*>/, '').replace('</svg>', '') };
    const c = FIG[id] || '#E0B07A', light = 'rgba(255,255,255,.45)';
    const limb = (d, w = 12) => `<path d="${d}" stroke="${INK}" stroke-width="${w + 5}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
    const body = id === 'robo' ? `<rect x="30" y="92" width="60" height="58" rx="12" fill="${c}" ${S}/><circle cx="60" cy="118" r="9" fill="#FFC83A" ${S}/>` : `<path d="M30 104 C30 86 90 86 90 104 L92 138 C92 158 28 158 28 138Z" fill="${c}" ${S}/><ellipse cx="60" cy="128" rx="18" ry="16" fill="${light}"/>`;
    const head = Art.character(id, expr || 'happy').replace(/<svg[^>]*>/, '').replace('</svg>', '').replace(/<circle cx="50" cy="50" r="52"[^>]*\/>/, '');
    return { w: 120, h: 172, svg: `${limb('M46 150 v16')}${limb('M74 150 v16')}${limb('M34 108 C20 116 18 132 22 142', 11)}${limb('M86 108 C100 116 102 132 98 142', 11)}${body}<g transform="translate(14 -2) scale(.92)">${head}</g>` };
  }
  function render(spec, cls = '') {
    if (!spec) return '';
    const parts = spec.split(';').map(s => s.trim()).filter(Boolean), id = 'sc' + (++uid);
    let out = (BG[parts[0]] || BG.sky)(id);
    parts.slice(1).forEach(p => {
      const [name, x, y, size, extra] = p.split(/\s+/); const X = +x, Y = +y, Z = +size;
      if (FIG[name] || name === 'kechy') {
        const f = figure(name, extra); const s = Z || 1;
        out += `<g transform="translate(${X - f.w * s / 2} ${Y - f.h * s}) scale(${s})"><g class="bobfig">${f.svg}</g></g>`;
      } else out += `<text x="${X}" y="${Y}" font-size="${Z || 48}" text-anchor="middle" dominant-baseline="central" class="${extra ? 'a-' + extra : ''}">${name}</text>`;
    });
    return `<svg class="scene ${cls}" viewBox="0 0 400 300" role="img" aria-hidden="true">${out}</svg>`;
  }
  return { render };
})();

DATA.MASAL_SCENES = {
  1: ['room; kechy 165 290 .78 happy2; 🎒 300 245 64 pop; 🗺️ 320 175 46', 'sky; ✈️ 200 140 96 float; 🐐 165 128 30', 'forest; 🐼 250 238 92 sway; 🎋 335 220 80; kechy 110 292 .58 wow', 'night; kechy 190 292 .78 happy2; 🏠 320 238 84; 🌍 80 90 46 float'],
  2: ['garden; kechy 120 292 .72 wow; 🥚 285 245 96 sway', 'garden; 🥚 210 225 116 sway; 💥 262 140 64 pop; kechy 80 292 .55 wow', 'garden; 🦕 240 235 128 pop; kechy 95 292 .6 happy2', 'meadow; kechy 130 292 .75 happy2; 🦕 290 235 116; ❤️ 205 110 44 float'],
  3: ['meadow; kechy 120 292 .72 happy2; 🚀 290 200 116 float', 'moon; 🚀 250 190 100; kechy 130 292 .58 wow; 🌍 330 70 44', 'space; ⭐ 90 80 52 float; ⭐ 310 70 42 float; ⭐ 205 140 64 pop; kechy 200 298 .55 happy2', 'space; 🌍 110 115 96 float; kechy 265 292 .62 happy2; 🚀 350 200 56 sway'],
  4: ['lab; mino 205 292 1.05 wow; 🧪 95 205 50 sway', 'lab; 💧 150 150 64 float; 🎨 250 160 60 pop; mino 330 292 .85 happy2', 'lab; 🫧 100 110 52 float; 🫧 205 80 42 float; 🫧 300 120 56 float; mino 200 296 .9 happy2', 'lab; kechy 125 292 .68 happy2; mino 285 292 .95 happy2; 👏 205 110 50 pop'],
  5: ['sea; kechy 200 285 .72 wow; 🫧 120 90 32 float; 🫧 300 60 26 float; 🫧 250 120 20 float', 'sea; 🐠 110 110 64 float; 🐠 300 90 52 float; 🐡 210 180 54 sway; kechy 335 294 .5 happy2', 'sea; 🐙 205 185 136 sway; kechy 75 294 .5 happy2', 'sea; 🐳 205 145 160 float; 🎵 330 60 42 pop; 🎶 80 70 36 float'],
  6: ['forest; momo 205 292 1.1 happy2', 'forest; 🐿️ 185 230 84 pop; 🌰 262 262 40; momo 325 294 .85 wow', 'forest; luna 215 200 .95 happy; 🌿 215 210 70; momo 95 294 .85 happy', 'forest; momo 205 292 1.05 happy2; 🍄 85 262 50; 🌼 330 266 44; 🐦 300 80 42 float'],
  7: ['stage; piko 190 292 1.05 happy2; 🥁 295 258 72 pop', 'stage; robo 190 292 1.05 happy2; 🎹 300 255 72', 'stage; kechy 190 292 .78 wow; 🎺 300 185 64 sway', 'stage; piko 85 292 .85 happy2; kechy 200 294 .7 happy2; robo 318 292 .85 happy2; 🎵 200 70 42 float; 🎶 110 90 36 float'],
  8: ['snow; ❄️ 110 90 46 spin; ❄️ 300 70 38 float; ❄️ 205 130 54 float', 'snow; kechy 190 292 .78 happy2; 🧣 290 170 52 pop', 'snow; ⛄ 245 230 136; kechy 95 292 .62 happy2', 'room; kechy 170 292 .78 happy2; ☕ 305 225 64 pop'],
  9: ['room; kechy 145 292 .78 happy2; 🖍️ 300 225 64 sway', 'room; 🌞 200 150 116 spin; kechy 335 294 .5 happy2', 'meadow; 🌈 210 150 190 pop; kechy 85 294 .55 wow', 'room; 🖼️ 200 140 116; kechy 100 294 .6 happy2; ⭐ 315 90 42 float'],
  10: ['garden; 🌱 200 245 80 pop', 'garden; 🌧️ 200 90 100 float; 🌱 200 250 70', 'garden; ☀️ 320 80 84 spin; 🌿 200 235 110 sway', 'garden; 🌸 195 215 128 pop; 🐝 305 110 52 float; kechy 70 294 .45 happy2'],
  11: ['beach; kechy 200 292 .78 happy2', 'beach; kechy 165 292 .78 happy2; 🧢 290 160 52 pop; 🧴 310 250 50', 'beach; 🏰 250 235 124 pop; kechy 110 292 .62 happy2', 'beach; 🐢 230 258 84 sway; 🌊 340 230 60; kechy 95 292 .55 happy2'],
  12: ['school; momo 200 292 1.1 sleep', 'school; kechy 140 292 .78 happy; momo 295 292 .95 sleep; 💬 215 110 52 pop', 'meadow; kechy 125 292 .72 happy2; momo 285 292 .95 happy2; ⚽ 205 258 52 pop', 'meadow; kechy 70 294 .55 happy2; momo 160 292 .78 happy2; piko 250 292 .78 happy2; luna 340 292 .78 happy2; ❤️ 205 70 52 float']
};
DATA.BOOK_SCENES = ['school; kechy 130 292 .72 happy; momo 285 292 .95 sleep', 'school; momo 195 292 1.1 sleep; 💧 250 120 30 float', 'school; kechy 190 292 .82 wow; 💭 300 90 56 pop', 'school; kechy 100 292 .62 happy; momo 205 292 .85 happy; luna 320 292 .9 happy',
  'meadow; piko 90 292 .8 happy2; robo 205 292 .8 happy2; mino 320 292 .8 happy2; ⚽ 205 110 44 float', 'meadow; kechy 50 294 .45 happy2; momo 115 292 .62 happy2; piko 180 292 .62 happy2; luna 245 292 .62 happy2; robo 310 292 .62 happy2; mino 370 292 .58 happy2; 🛡️ 205 60 52 pop'];
DATA.STORY_SCENES = { yildiz: 'night; kechy 170 292 .8 wow; ⭐ 285 150 56 float', luna: 'night; luna 210 200 1 happy; 🌳 90 230 120; 📖 300 250 52; 🦔 350 268 44', robo: 'night; robo 190 292 1.05 sleep; 💤 280 120 44 float' };

/* AI illustration for a page when it exists (img/ai/<key>.webp), otherwise the drawn scene.
   AI_IMG maps key -> file version, so a regenerated picture gets a new URL and never comes from an old cache. */
const aiSrc = (key) => typeof AI_IMG !== 'undefined' && AI_IMG[key] && !/claude/.test(location.hostname) ? `img/ai/${key}.webp?v=${AI_IMG[key]}` : '';
function pageArt(key, spec) {
  const src = aiSrc(key);
  return src ? `<img class="aiimg" src="${src}" alt="" draggable="false" data-spec="${esc(spec || '')}" onerror="this.outerHTML = Scene.render(this.dataset.spec)">` : Scene.render(spec);
}
function preloadArt(key) { const src = aiSrc(key); if (src) new Image().src = src; }
