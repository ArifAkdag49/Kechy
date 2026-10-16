/* ============ ART: all illustrations are drawn in code (SVG) ============ */
const Art = (() => {
  const INK = '#1D2E42';
  const S = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;

  function eye(x, y, r = 1, iris) {
    return `<ellipse cx="${x}" cy="${y}" rx="${5.6 * r}" ry="${6.6 * r}" fill="#fff" ${S}/>` +
      (iris ? `<circle cx="${x + .6}" cy="${y + .8}" r="${4.2 * r}" fill="${iris}"/>` : '') +
      `<circle cx="${x + .8}" cy="${y + 1}" r="${3.3 * r}" fill="${INK}"/><circle cx="${x + 2.1}" cy="${y - 1.3}" r="${1.3 * r}" fill="#fff"/>`;
  }
  function eyes(expr, y = 48, dx = 10, r = 1, iris) {
    const L = 50 - dx, R = 50 + dx;
    if (expr === 'wink') return `<g>${eye(L, y, r, iris)}</g><path d="M${R - 5} ${y + 1} q5 -5 10 0" fill="none" ${S}/>`;
    if (expr === 'sleep') return `<path d="M${L - 5} ${y} q5 5 10 0M${R - 5} ${y} q5 5 10 0" fill="none" ${S}/>`;
    if (expr === 'happy2') return `<path d="M${L - 5} ${y + 2} q5 -7 10 0M${R - 5} ${y + 2} q5 -7 10 0" fill="none" ${S} stroke-width="3"/>`;
    return `<g class="blink">${eye(L, y, r, iris)}${eye(R, y, r, iris)}</g>`;
  }
  function mouth(expr, y = 70, w = 6) {
    if (expr === 'wow') return `<ellipse cx="50" cy="${y + 1}" rx="3.6" ry="4.6" fill="#7A2E3A" ${S} stroke-width="2"/>`;
    if (expr === 'grin' || expr === 'happy2') return `<path d="M${50 - w - 1} ${y - 2} Q50 ${y + 10} ${50 + w + 1} ${y - 2} Z" fill="#7A2E3A" ${S} stroke-width="2"/><path d="M${50 - 3} ${y + 3} q3 3 6 0" fill="#F27A93"/>`;
    return `<path d="M${50 - w} ${y} Q50 ${y + 6} ${50 + w} ${y}" fill="none" ${S}/>`;
  }
  const cheeks = (y = 60, dx = 17) => `<circle cx="${50 - dx}" cy="${y}" r="5" fill="#FF8FA3" opacity=".45"/><circle cx="${50 + dx}" cy="${y}" r="5" fill="#FF8FA3" opacity=".45"/>`;
  const outlined = (d, col, w = 8) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const FACE = 'M50 22 C70 22 78 36 78 52 C78 72 66 86 50 86 C34 86 22 72 22 52 C22 36 30 22 50 22Z';

  /* head in a 100x100 box, center ~ (50,54) */
  function head(type, o = {}) {
    const e = o.expr || 'happy';
    const c = o.color;
    switch (type) {
      case 'goat': return `
        ${outlined('M38 30 C32 14 20 11 15 21', '#F2752B')}${outlined('M62 30 C68 14 80 11 85 21', '#F2752B')}
        <ellipse cx="18" cy="49" rx="13" ry="6.5" transform="rotate(-18 18 49)" fill="${c || '#FFF1DC'}" ${S}/>
        <ellipse cx="17" cy="49" rx="8" ry="3" transform="rotate(-18 18 49)" fill="#F9B8C4"/>
        <ellipse cx="82" cy="49" rx="13" ry="6.5" transform="rotate(18 82 49)" fill="${c || '#FFF1DC'}" ${S}/>
        <ellipse cx="83" cy="49" rx="8" ry="3" transform="rotate(18 82 49)" fill="#F9B8C4"/>
        <path d="M45 84 L50 95 L55 84" fill="#F3DDBB" ${S}/>
        <path d="${FACE}" fill="${c || '#FFF1DC'}" ${S}/>
        <path d="M41 26 q4 -10 9 -2 q5 -9 9 2" fill="#F6C27A" ${S}/>
        ${eyes(e, 46)}${cheeks(58, 19)}
        <ellipse cx="50" cy="68" rx="15" ry="11" fill="#FFDDBE" ${S}/>
        <ellipse cx="45" cy="65" rx="1.8" ry="2.4" fill="${INK}"/><ellipse cx="55" cy="65" rx="1.8" ry="2.4" fill="${INK}"/>
        ${mouth(e, 72, 5)}`;
      case 'panda': return `
        <circle cx="29" cy="29" r="10" fill="${INK}"/><circle cx="71" cy="29" r="10" fill="${INK}"/>
        <path d="${FACE}" fill="#FFFFFF" ${S}/>
        <ellipse cx="39" cy="49" rx="8.5" ry="10.5" transform="rotate(25 39 49)" fill="${INK}"/>
        <ellipse cx="61" cy="49" rx="8.5" ry="10.5" transform="rotate(-25 61 49)" fill="${INK}"/>
        ${e === 'happy' || e === 'wow' ? `<g class="blink"><circle cx="40" cy="48" r="3.4" fill="#fff"/><circle cx="60" cy="48" r="3.4" fill="#fff"/><circle cx="40.6" cy="48.6" r="1.8" fill="${INK}"/><circle cx="60.6" cy="48.6" r="1.8" fill="${INK}"/></g>` : `<path d="M36 49 q4 -4 8 0M56 49 q4 -4 8 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
        ${cheeks(62, 20)}
        <ellipse cx="50" cy="63" rx="5.5" ry="3.8" fill="${INK}"/>${mouth(e, 69, 5)}`;
      case 'fox': return `
        <path d="M27 38 L20 11 L45 27 Z" fill="${c || '#F28A3A'}" ${S}/><path d="M29 31 L25 18 L38 27Z" fill="#FFE0C8"/>
        <path d="M73 38 L80 11 L55 27 Z" fill="${c || '#F28A3A'}" ${S}/><path d="M71 31 L75 18 L62 27Z" fill="#FFE0C8"/>
        <path d="M50 24 C68 24 80 38 80 52 C80 66 66 82 50 84 C34 82 20 66 20 52 C20 38 32 24 50 24Z" fill="${c || '#F28A3A'}" ${S}/>
        <path d="M50 84 C40 83 26 72 23 58 C34 62 42 64 50 70 C58 64 66 62 77 58 C74 72 60 83 50 84Z" fill="#FFF4E8" ${S}/>
        ${eyes(e, 48)}<ellipse cx="50" cy="71" rx="4.5" ry="3.2" fill="${INK}"/>${e === 'wow' ? mouth('wow', 77) : `<path d="M46 77 q4 3 8 0" fill="none" ${S}/>`}`;
      case 'tiger': return `
        <circle cx="29" cy="30" r="9" fill="${c || '#F7A23B'}" ${S}/><circle cx="29" cy="30" r="4.5" fill="#FFE0B0"/>
        <circle cx="71" cy="30" r="9" fill="${c || '#F7A23B'}" ${S}/><circle cx="71" cy="30" r="4.5" fill="#FFE0B0"/>
        <path d="${FACE}" fill="${c || '#F7A23B'}" ${S}/>
        <path d="M50 23 v9M41 25 l3 7M59 25 l-3 7M22 48 l9 2M22 57 l8 0M78 48 l-9 2M78 57 l-8 0" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="50" cy="67" rx="14" ry="10" fill="#FFF6E8" ${S}/>
        ${eyes(e, 47)}${cheeks(58, 22)}
        <path d="M45.5 62 h9 l-4.5 5z" fill="#E6508A" ${S} stroke-width="1.5"/>${mouth(e, 70, 5)}`;
      case 'penguin': return `
        <path d="${FACE}" fill="${c || '#2F4466'}" ${S}/>
        <path d="M50 34 C41 25 26 32 28 50 C30 66 40 79 50 81 C60 79 70 66 72 50 C74 32 59 25 50 34Z" fill="#FFFFFF" ${S}/>
        ${eyes(e, 49)}${cheeks(62, 16)}
        <path d="M43 60 L57 60 L50 69Z" fill="#FFB23A" ${S}/>`;
      case 'bunny': return `
        <ellipse cx="37" cy="16" rx="7.5" ry="21" transform="rotate(-8 37 16)" fill="${c || '#F4EEF8'}" ${S}/>
        <ellipse cx="37" cy="17" rx="3.5" ry="14" transform="rotate(-8 37 17)" fill="#F9B8C4"/>
        <ellipse cx="63" cy="16" rx="7.5" ry="21" transform="rotate(8 63 16)" fill="${c || '#F4EEF8'}" ${S}/>
        <ellipse cx="63" cy="17" rx="3.5" ry="14" transform="rotate(8 63 17)" fill="#F9B8C4"/>
        <path d="${FACE}" fill="${c || '#F4EEF8'}" ${S}/>
        ${eyes(e, 49)}${cheeks(62, 19)}
        <path d="M46.5 62 h7 l-3.5 4z" fill="#E6508A"/><path d="M50 66 v3 M45 70 q5 4 10 0" fill="none" ${S} stroke-width="2"/>
        <rect x="46.5" y="71" width="7" height="6" rx="1.5" fill="#fff" ${S} stroke-width="1.8"/>`;
      case 'mouse': return `
        <circle cx="24" cy="30" r="15" fill="${c || '#B8C4D2'}" ${S}/><circle cx="24" cy="30" r="9" fill="#F9B8C4"/>
        <circle cx="76" cy="30" r="15" fill="${c || '#B8C4D2'}" ${S}/><circle cx="76" cy="30" r="9" fill="#F9B8C4"/>
        <path d="${FACE}" fill="${c || '#CBD5E1'}" ${S}/>
        ${eyes(e, 48)}${cheeks(60, 19)}
        <circle cx="50" cy="63" r="4" fill="#E6508A" ${S} stroke-width="1.8"/>
        <path d="M28 62 l12 1M28 69 l12 -2M72 62 l-12 1M72 69 l-12 -2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
        ${mouth(e, 70, 5)}`;
      case 'parrot': return `
        <path d="M43 26 C37 6 47 4 49 22" fill="#E6508A" ${S}/><path d="M49 24 C49 2 59 3 55 24" fill="#FFC83A" ${S}/><path d="M55 26 C62 8 70 12 60 28" fill="#1FA2B0" ${S}/>
        <path d="${FACE}" fill="${c || '#4DB35E'}" ${S}/>
        <circle cx="38" cy="47" r="10" fill="#fff" ${S}/><circle cx="62" cy="47" r="10" fill="#fff" ${S}/>
        ${eyes(e, 47, 12, .8)}
        <path d="M50 55 C64 54 68 66 58 76 C56 69 52 66 46 66 Z" fill="#FFC83A" ${S}/>
        <path d="M46 66 C51 66 55 70 54 75 C49 75 45 71 46 66Z" fill="#F2752B" ${S}/>`;
      case 'owl': return `
        <path d="M27 34 L22 10 L41 25Z" fill="${c || '#8B6BC7'}" ${S}/><path d="M73 34 L78 10 L59 25Z" fill="${c || '#8B6BC7'}" ${S}/>
        <path d="${FACE}" fill="${c || '#9E80D6'}" ${S}/>
        <circle cx="38" cy="48" r="12.5" fill="#EFE8FB" ${S}/><circle cx="62" cy="48" r="12.5" fill="#EFE8FB" ${S}/>
        ${eyes(e, 48, 12, 1.05, '#FFC83A')}
        <path d="M46 59 L54 59 L50 67Z" fill="#F2752B" ${S}/>
        <path d="M36 74 q4 3 8 0M48 77 q4 3 8 0M58 73 q4 3 8 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`;
      case 'robot': return `
        <path d="M50 24 V10" ${S}/><circle class="blink" cx="50" cy="9" r="5" fill="#E6508A" ${S}/>
        <circle cx="19" cy="52" r="6" fill="#FFC83A" ${S}/><circle cx="81" cy="52" r="6" fill="#FFC83A" ${S}/>
        <rect x="22" y="22" width="56" height="60" rx="16" fill="${c || '#A9C4D6'}" ${S}/>
        <rect x="30" y="34" width="40" height="26" rx="8" fill="${INK}"/>
        ${e === 'wink' ? `<rect x="36" y="42" width="9" height="11" rx="3" fill="#7FF0E6"/><path d="M55 48 h9" stroke="#7FF0E6" stroke-width="3" stroke-linecap="round"/>` : `<g class="blink"><rect x="36" y="41" width="9" height="12" rx="3" fill="#7FF0E6"/><rect x="55" y="41" width="9" height="12" rx="3" fill="#7FF0E6"/></g>`}
        <rect x="38" y="66" width="24" height="8" rx="3" fill="#EAF3F8" ${S} stroke-width="2"/><path d="M44 66v8M50 66v8M56 66v8" stroke="${INK}" stroke-width="1.6"/>`;
      case 'dog': return `
        <path d="${FACE}" fill="${c || '#E0B07A'}" ${S}/>
        <path d="M29 28 C13 28 10 57 19 68 C28 64 33 46 33 34Z" fill="#8A5A3B" ${S}/>
        <path d="M71 28 C87 28 90 57 81 68 C72 64 67 46 67 34Z" fill="#8A5A3B" ${S}/>
        <ellipse cx="61" cy="46" rx="9" ry="8" fill="#C38A55"/>
        ${eyes(e, 47)}${cheeks(60, 18)}
        <ellipse cx="50" cy="67" rx="13" ry="10" fill="#F6E0C4" ${S}/>
        <ellipse cx="50" cy="62" rx="5" ry="3.6" fill="${INK}"/>
        <path d="M47 71 q3 9 6 0" fill="#F27A93" ${S} stroke-width="2"/>`;
      case 'cat': return `
        <path d="M26 38 L24 12 L44 27 Z" fill="${c || '#F5F0E6'}" ${S}/><path d="M74 38 L76 12 L56 27 Z" fill="${c || '#F5F0E6'}" ${S}/>
        <path d="${FACE}" fill="${c || '#F5F0E6'}" ${S}/>
        ${eyes(e, 49, 11, 1, null)}
        <circle cx="39" cy="49" r="3.3" fill="#3C7DD9"/><circle cx="61" cy="49" r="3.3" fill="#E0A21F"/>
        <circle cx="39.8" cy="48" r="1.2" fill="#fff"/><circle cx="61.8" cy="48" r="1.2" fill="#fff"/>
        <path d="M47 60 h6 l-3 3z" fill="#E6508A"/><path d="M50 63 v3 M45 67 q5 4 10 0" fill="none" ${S} stroke-width="2"/>
        <path d="M27 60 l11 1M27 66 l11 -1M73 60 l-11 1M73 66 l-11 -1" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    return '';
  }

  const HATS = {
    none: () => '',
    kep: (c) => `<path d="M27 32 C27 12 73 12 73 32 Z" fill="${c}" ${S}/><path d="M60 29 C70 26 86 28 88 33 C77 36 66 34 60 31Z" fill="${c}" ${S}/><circle cx="50" cy="16" r="3" fill="#fff" ${S} stroke-width="1.8"/>`,
    tac: () => `<path d="M32 28 L34 10 L42 19 L50 5 L58 19 L66 10 L68 28 Z" fill="#FFC83A" ${S}/><circle cx="50" cy="20" r="3" fill="#E6508A"/><circle cx="39" cy="23" r="2" fill="#1FA2B0"/><circle cx="61" cy="23" r="2" fill="#1FA2B0"/>`,
    bere: (c) => `<path d="M27 32 C25 9 75 9 73 32 Z" fill="${c}" ${S}/><rect x="25" y="27" width="50" height="9" rx="4.5" fill="#fff" ${S}/><circle cx="50" cy="8" r="6" fill="#fff" ${S}/>`,
    sihirbaz: () => `<path d="M33 30 L52 -6 L67 30 Z" fill="#6E54C9" ${S}/><ellipse cx="50" cy="30" rx="24" ry="5" fill="#6E54C9" ${S}/><path d="M50 13 l1.5 3 3 .5-2.2 2 .6 3.2-2.9-1.5-2.9 1.5.6-3.2-2.2-2 3-.5z" fill="#FFC83A"/><circle cx="58" cy="22" r="1.6" fill="#FFC83A"/>`,
    cicek: () => [26, 38, 50, 62, 74].map((x, i) => { const y = 26 - (i === 2 ? 5 : i % 2 ? 3 : 0); const col = ['#E6508A', '#FFC83A', '#9A7FE0', '#FFC83A', '#E6508A'][i]; return `<g><circle cx="${x - 4}" cy="${y}" r="4" fill="${col}" ${S} stroke-width="1.6"/><circle cx="${x + 4}" cy="${y}" r="4" fill="${col}" ${S} stroke-width="1.6"/><circle cx="${x}" cy="${y - 4}" r="4" fill="${col}" ${S} stroke-width="1.6"/><circle cx="${x}" cy="${y + 4}" r="4" fill="${col}" ${S} stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="2.6" fill="#fff"/></g>`; }).join(''),
    kulaklik: (c) => `<path d="M24 50 C22 18 78 18 76 50" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M24 50 C22 18 78 18 76 50" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><rect x="16" y="42" width="12" height="18" rx="5" fill="${c}" ${S}/><rect x="72" y="42" width="12" height="18" rx="5" fill="${c}" ${S}/>`
  };
  const GLASSES = {
    none: () => '',
    yuvarlak: (y = 47) => `<circle cx="39" cy="${y}" r="9" fill="rgba(255,255,255,.25)" ${S}/><circle cx="61" cy="${y}" r="9" fill="rgba(255,255,255,.25)" ${S}/><path d="M48 ${y} h4M30 ${y - 1} l-7 -2M70 ${y - 1} l7 -2" fill="none" ${S}/>`,
    gunes: (y = 47) => `<rect x="28" y="${y - 7}" width="20" height="14" rx="6" fill="${INK}"/><rect x="52" y="${y - 7}" width="20" height="14" rx="6" fill="${INK}"/><path d="M48 ${y - 2} h4" ${S}/><path d="M31 ${y - 3} l5 -2M55 ${y - 3} l5 -2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,
    kalp: (y = 47) => { const h = (x) => `<path d="M${x} ${y + 8} C${x - 12} ${y} ${x - 10} ${y - 10} ${x} ${y - 4} C${x + 10} ${y - 10} ${x + 12} ${y} ${x} ${y + 8}Z" fill="rgba(230,80,138,.8)" ${S}/>`; return h(39) + h(61) + `<path d="M48 ${y - 1} h4" ${S}/>`; },
    gozluk: (y = 47) => `<circle cx="38" cy="${y}" r="11" fill="rgba(127,240,230,.35)" ${S} stroke-width="3"/><circle cx="62" cy="${y}" r="11" fill="rgba(127,240,230,.35)" ${S} stroke-width="3"/><path d="M27 ${y} C20 ${y - 6} 18 ${y - 20} 30 ${y - 22} M73 ${y} C80 ${y - 6} 82 ${y - 20} 70 ${y - 22} M30 ${y - 22} h40" fill="none" stroke="#E6508A" stroke-width="3.5" stroke-linecap="round"/>`
  };
  const BGS = { sky: '#7FD3DA', sun: '#FFE08A', berry: '#F7A9C8', leaf: '#A7DDA9', lilac: '#C9B8F2', horn: '#FFC39A', night: '#2B3F66' };

  let uid = 0;
  function avatar(av = {}, cls = '') {
    const id = 'av' + (++uid);
    const bg = BGS[av.bg] || av.bg || BGS.sky;
    const eyeY = { panda: 48, parrot: 47, owl: 48 }[av.base] || 47;
    const stars = av.bg === 'night' ? `<g fill="#FFE08A"><circle cx="24" cy="30" r="1.8"/><circle cx="96" cy="26" r="1.5"/><circle cx="100" cy="60" r="1.8"/><circle cx="18" cy="70" r="1.3"/></g>` : '';
    return `<svg class="${cls}" viewBox="0 0 120 120" role="img" aria-label="Avatar">
      <defs><clipPath id="${id}"><circle cx="60" cy="60" r="57"/></clipPath></defs>
      <circle cx="60" cy="60" r="57" fill="${bg}" ${S}/>${stars}
      <g clip-path="url(#${id})"><path d="M20 122 C22 100 40 93 60 93 C80 93 98 100 100 122Z" fill="${av.shirt || '#1FA2B0'}" ${S}/>
      <path d="M52 93 L60 103 L68 93" fill="none" ${S}/></g>
      <g transform="translate(10 6)">${head(av.base || 'goat', { expr: av.expr || 'happy' })}${(GLASSES[av.glasses] || GLASSES.none)(eyeY)}${(HATS[av.hat] || HATS.none)(av.hatColor || '#E6508A')}</g>
    </svg>`;
  }

  function kechy(expr = 'happy', cls = '') {
    return `<svg class="${cls}" viewBox="0 0 220 262" role="img" aria-label="Kechy">
      <ellipse cx="110" cy="250" rx="64" ry="8" fill="rgba(0,0,0,.14)"/>
      <path d="M86 205 v34" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M86 205 v34" stroke="#FFF1DC" stroke-width="18" stroke-linecap="round"/>
      <path d="M134 205 v34" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M134 205 v34" stroke="#FFF1DC" stroke-width="18" stroke-linecap="round"/>
      <path d="M75 236 h22 v8 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4z" fill="#6B4A3A" ${S}/><path d="M123 236 h22 v8 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4z" fill="#6B4A3A" ${S}/>
      <path d="M70 152 C50 164 46 188 54 200" stroke="${INK}" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M70 152 C50 164 46 188 54 200" stroke="#FFF1DC" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M64 150 C64 120 156 120 156 150 L158 196 C158 222 62 222 62 196 Z" fill="#FFF1DC" ${S}/>
      <ellipse cx="110" cy="182" rx="28" ry="24" fill="#FFE3C4"/>
      <path d="M160 190 q14 -4 12 -16" fill="none" ${S}/>
      <path d="M72 132 C90 146 130 146 148 132 L150 146 C130 160 90 160 70 146 Z" fill="#1FA2B0" ${S}/>
      <path d="M126 150 l10 34 l-16 -6z" fill="#1FA2B0" ${S}/>
      <path d="M129 168 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6z" fill="#FFC83A"/>
      <g class="wave"><path d="M152 150 C172 140 182 118 176 100" stroke="${INK}" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M152 150 C172 140 182 118 176 100" stroke="#FFF1DC" stroke-width="14" stroke-linecap="round" fill="none"/><ellipse cx="176" cy="96" rx="9" ry="8" fill="#6B4A3A" ${S}/></g>
      <g transform="translate(46 4) scale(1.28)">${head('goat', { expr })}</g>
    </svg>`;
  }

  const CHAR_DRAW = {
    kechy: (e) => head('goat', { expr: e }) + `<path d="M28 84 C40 92 60 92 72 84 L74 92 C60 100 40 100 26 92Z" fill="#1FA2B0" ${S}/>`,
    mino: (e) => head('mouse', { expr: e }) + GLASSES.gozluk(48),
    piko: (e) => head('parrot', { expr: e }),
    luna: (e) => head('owl', { expr: e }) + GLASSES.yuvarlak(48) + `<path d="M36 18 l28 0 l-4 -8 l-20 0z" fill="#1D2E42"/><path d="M62 12 l8 6" stroke="#FFC83A" stroke-width="2"/>`,
    robo: (e) => head('robot', { expr: e }),
    momo: (e) => head('dog', { expr: e }) + `<path d="M30 86 C42 92 58 92 70 86 L70 94 C58 98 42 98 30 94Z" fill="#E6508A" ${S}/><circle cx="50" cy="95" r="4" fill="#FFC83A" ${S} stroke-width="1.8"/>`
  };
  function character(id, expr = 'happy', cls = '') {
    const c = DATA.CHARACTERS.find(x => x.id === id) || DATA.CHARACTERS[0];
    return `<svg class="${cls}" viewBox="-6 -8 112 112" role="img" aria-label="${c.name}"><circle cx="50" cy="50" r="52" fill="${c.bg}" opacity=".55"/>${CHAR_DRAW[id](expr)}</svg>`;
  }

  function cover(is) {
    const st = [[40, 120], [262, 110], [30, 290], [250, 300], [150, 110]].map(([x, y], i) => `<path transform="translate(${x} ${y}) scale(${.8 + (i % 3) * .3})" d="M0 -9 L2.6 -2.8 9 -2.8 3.8 1.2 5.6 8 0 4 -5.6 8 -3.8 1.2 -9 -2.8 -2.6 -2.8Z" fill="#FFE08A" opacity=".85"/>`).join('');
    return `<svg viewBox="0 0 300 400" role="img" aria-label="Kechy ${is.n} kapağı">
      <rect width="300" height="400" fill="${is.color}"/>
      <circle cx="255" cy="320" r="95" fill="rgba(255,255,255,.14)"/><circle cx="40" cy="170" r="62" fill="rgba(255,255,255,.12)"/>${st}
      <rect width="300" height="92" fill="rgba(0,0,0,.10)"/>
      <text x="18" y="64" font-family="Baloo 2, sans-serif" font-weight="800" font-size="62" fill="#fff" stroke="${INK}" stroke-width="6" paint-order="stroke" letter-spacing="1">KECHY</text>
      <text x="21" y="83" font-family="Andika, sans-serif" font-weight="700" font-size="12" fill="#fff" letter-spacing="3">ÇOCUK DERGİSİ</text>
      <circle cx="258" cy="46" r="31" fill="#FFC83A" stroke="${INK}" stroke-width="4"/>
      <text x="258" y="${is.n > 9 ? 58 : 59}" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="${is.n > 9 ? 30 : 36}" fill="${INK}">${is.n}</text>
      <text x="150" y="262" text-anchor="middle" font-size="138">${is.emoji}</text>
      <g transform="translate(206 190) scale(.62) rotate(12 50 50)">${head('goat', { expr: 'wink' })}</g>
      <rect x="16" y="316" width="268" height="66" rx="14" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <text x="150" y="346" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="${is.title.length > 16 ? 19 : 25}" fill="${INK}">${is.title}</text>
      <text x="150" y="368" text-anchor="middle" font-family="Andika, sans-serif" font-size="12" fill="#4B5D70">${is.date || 'Kechy Kids'}</text>
    </svg>`;
  }

  function burst(cx, cy, n, r1, r2) {
    const p = [];
    for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2; const r = i % 2 ? r2 : r1; p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)); }
    return p.join(' ');
  }
  function badge(b) {
    return `<svg viewBox="0 0 120 132" role="img" aria-label="${b.name}">
      <path d="M42 86 L30 126 L45 118 L53 129 L60 94Z" fill="${b.c2 || '#E6508A'}" ${S}/>
      <path d="M78 86 L90 126 L75 118 L67 129 L60 94Z" fill="${b.c2 || '#E6508A'}" ${S}/>
      <polygon points="${burst(60, 58, 16, 53, 46)}" fill="${b.color}" ${S}/>
      <circle cx="60" cy="58" r="37" fill="#fff" ${S}/>
      <circle cx="60" cy="58" r="31" fill="none" stroke="${b.color}" stroke-width="2.4" stroke-dasharray="3 4"/>
      <text x="60" y="72" text-anchor="middle" font-size="36">${b.emoji}</text>
    </svg>`;
  }

  const STAMP_COLS = ['#2B59C3', '#C62F4B', '#2C8C5A', '#7A4BC2', '#D9661F'];
  function stamp(country, date, i) {
    const col = STAMP_COLS[i % STAMP_COLS.length];
    const shape = i % 3;
    const name = country.name.toLocaleUpperCase('tr');
    const fs = name.length > 11 ? 15 : name.length > 8 ? 18 : 22;
    let frame;
    if (shape === 0) frame = `<circle cx="80" cy="60" r="52" stroke-width="4"/><circle cx="80" cy="60" r="44" stroke-width="1.6"/>`;
    else if (shape === 1) frame = `<rect x="10" y="12" width="140" height="96" rx="16" stroke-width="4"/><rect x="18" y="20" width="124" height="80" rx="10" stroke-width="1.6" stroke-dasharray="5 3"/>`;
    else frame = `<ellipse cx="80" cy="60" rx="72" ry="48" stroke-width="4"/><ellipse cx="80" cy="60" rx="63" ry="40" stroke-width="1.6"/>`;
    return `<svg class="stamp" viewBox="0 0 160 120" style="--rot:${((i * 37) % 26) - 13}deg" role="img" aria-label="${country.name} damgası">
      <g filter="url(#rough)" fill="none" stroke="${col}">${frame}</g>
      <g filter="url(#rough)" fill="${col}" font-family="Baloo 2, sans-serif" text-anchor="middle">
        <text x="80" y="40" font-size="10" font-weight="700" letter-spacing="2">KECHY ✈ PASAPORT</text>
        <text x="80" y="${62 + fs / 3}" font-size="${fs}" font-weight="800">${name}</text>
        <text x="80" y="92" font-size="11" font-weight="700" letter-spacing="1">${date}</text>
      </g></svg>`;
  }

  function rng(seed) { let s = seed >>> 0; return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const KIDCOLS = ['#E6508A', '#FFC83A', '#1FA2B0', '#43AE5B', '#9A7FE0', '#F2752B', '#3C7DD9'];
  function kidArt(seed, kind) {
    const r = rng(seed); const pick = (a) => a[Math.floor(r() * a.length)];
    let s = `<rect width="240" height="180" fill="${kind === 'deniz' ? '#BFE6F5' : '#FFFDF3'}"/>`;
    if (kind === 'deniz') {
      s += `<path d="M0 150 Q60 138 120 150 T240 150 V180 H0Z" fill="#F3D9A4" stroke="${INK}" stroke-width="2"/>`;
      for (let i = 0; i < 5; i++) { const x = 20 + i * 46, h = 50 + r() * 60, c = pick(KIDCOLS); s += `<rect x="${x}" y="${150 - h}" width="30" height="${h}" rx="12" fill="${c}" stroke="${INK}" stroke-width="2.5"/><circle cx="${x + 15}" cy="${150 - h + 16}" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/>`; }
      s += `<text x="170" y="60" font-size="30">🐠</text><text x="40" y="40" font-size="26">🐙</text><circle cx="120" cy="30" r="5" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="128" cy="18" r="3" fill="none" stroke="${INK}" stroke-width="2"/>`;
    } else {
      s += `<circle cx="205" cy="32" r="18" fill="#FFC83A" stroke="${INK}" stroke-width="2.5"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<path d="M${205 + 24 * Math.cos(a)} ${32 + 24 * Math.sin(a)} L${205 + 32 * Math.cos(a)} ${32 + 32 * Math.sin(a)}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`; }).join('');
      if (kind === 'gokkusagi') { KIDCOLS.slice(0, 5).forEach((c, i) => { s += `<path d="M20 150 A${90 - i * 9} ${80 - i * 9} 0 0 1 ${200 - i * 18 + i * 18} 150" fill="none" stroke="${c}" stroke-width="8"/>`; }); }
      s += `<path d="M0 160 H240" stroke="#43AE5B" stroke-width="10"/>`;
      let x = 10;
      while (x < 225) { const w = 26 + r() * 24, h = 40 + r() * 80, c = pick(KIDCOLS); const fly = kind === 'ucan' && r() > .5 ? -20 - r() * 30 : 0;
        s += `<rect x="${x}" y="${156 - h + fly}" width="${w}" height="${h}" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`;
        if (r() > .5) s += `<path d="M${x - 3} ${156 - h + fly} L${x + w / 2} ${136 - h + fly} L${x + w + 3} ${156 - h + fly}Z" fill="${pick(KIDCOLS)}" stroke="${INK}" stroke-width="2.5"/>`;
        for (let wy = 156 - h + 10 + fly; wy < 146 + fly; wy += 16) s += `<rect x="${x + 6}" y="${wy}" width="7" height="7" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
        if (fly) s += `<text x="${x + w / 2 - 8}" y="${170 + fly + 8}" font-size="14">🎈</text>`;
        x += w + 6; }
      s += `<text x="${30 + r() * 120}" y="46" font-size="24">${pick(['🚀', '🛸', '🦄', '🐦', '🎈'])}</text>`;
    }
    return `<svg viewBox="0 0 240 180" role="img" aria-label="Çocuk çizimi"><g filter="url(#crayon)">${s}</g></svg>`;
  }

  function scenePuzzle() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BC6D1"/><stop offset="1" stop-color="#C4EEF0"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#g)"/><circle cx="250" cy="55" r="30" fill="#FFC83A" stroke="${INK}" stroke-width="3"/>
      <path d="M30 70 a14 14 0 0 1 26 -6 a18 18 0 0 1 32 8 a12 12 0 0 1 -4 22 h-50 a12 12 0 0 1 -4 -24z" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <path d="M0 230 Q80 190 160 225 T300 215 V300 H0Z" fill="#86CF6F" stroke="${INK}" stroke-width="3"/>
      <path d="M0 262 Q100 240 190 262 T300 255 V300 H0Z" fill="#62B85C" stroke="${INK}" stroke-width="3"/>
      <g transform="translate(55 40) scale(.9)">${kechy('happy').replace(/<svg[^>]*>/, '').replace('</svg>', '')}</g>
      <circle cx="40" cy="250" r="7" fill="#E6508A" stroke="${INK}" stroke-width="2"/><circle cx="265" cy="262" r="7" fill="#FFC83A" stroke="${INK}" stroke-width="2"/>
    </svg>`;
  }
  const svgURL = (svg) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

  /* planets */
  const planetCSS = (p) => `width:${p.size}px;height:${p.size}px;background:radial-gradient(circle at 32% 30%,rgba(255,255,255,.55),transparent 38%),${p.bg}`;

  const coverHTML = (is) => is.img ? `<div class="cvimg">${cover(is)}<img src="${is.img}" alt="Kechy ${is.n} kapağı" loading="lazy" onerror="this.remove()"></div>` : cover(is);
  return { coverHTML, head, avatar, kechy, character, cover, badge, stamp, kidArt, scenePuzzle, svgURL, rng, planetCSS, HATS, GLASSES, BGS, S, INK };
})();
