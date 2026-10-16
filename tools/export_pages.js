// Exports every illustrated page (text + scene) to tools/pages.json for the image generator.
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const ctx = { NAV_OF: {}, P: {}, Art: { rng: () => Math.random }, console };
vm.createContext(ctx);
vm.runInContext(src('data.js') + '\n' + src('worlds.js') + '\n' + src('scenes.js') + '\n;this.DATA = DATA;', ctx);
const D = ctx.DATA, pages = [];
for (const [n, list] of Object.entries(D.MASAL)) list.forEach((p, i) => pages.push({ key: `masal-${n}-${i + 1}`, text: p[1], spec: (D.MASAL_SCENES[n] || [])[i] || '' }));
D.BOOK.forEach((p, i) => pages.push({ key: `book-${i + 1}`, text: p.t, spec: D.BOOK_SCENES[i] || '' }));
D.AUDIO_STORIES.forEach((s) => pages.push({ key: `story-${s.id}`, text: s.text.split('. ').slice(0, 3).join('. ') + '.', spec: D.STORY_SCENES[s.id] || '' }));
fs.writeFileSync(path.join(__dirname, 'pages.json'), JSON.stringify(pages, null, 1));
console.log(pages.length + ' pages exported');
