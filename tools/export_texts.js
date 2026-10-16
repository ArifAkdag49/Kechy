// Exports every fixed text the site reads aloud to tools/texts.json for the voice generator (tools/gen_voice.py).
// The strings are built with the same templates the pages pass to Voice.say / sayBtn / autoSay; texts made at
// runtime (nicknames, saved stories, editor content) are not recorded and fall back to the device voice.
// role: 'anlatici' = storyteller voice, 'kechy' = Kechy's voice (questions, tasks, TV, little phrases).
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
const ctx = { NAV_OF: {}, P: {}, Art: { rng: () => Math.random }, console, S: { settings: {} }, searchIndex: () => [] };
vm.createContext(ctx);
for (const f of ['data.js', 'age.js', 'worlds.js', 'merak.js']) {
  try { vm.runInContext(src(f), ctx, { filename: f }); } catch (e) { console.warn(f + ': ' + e.message); }
}
const D = vm.runInContext('DATA', ctx), out = new Map();
const add = (role, t, words) => { if (typeof t !== 'string' || !t.trim()) return; t = t.replace(/\s+/g, ' ').trim(); const o = out.get(t); if (!o) out.set(t, { text: t, role, words: !!words }); else if (words) o.words = true; };
const quiz = (q, role) => { add(role, q[0] + ' ' + q[1].map((o, i) => 'ABCD'[i] + ': ' + o).join('. ')); };

Object.values(D.MASAL || {}).forEach((pages) => pages.forEach((p) => add('anlatici', p[1])));
(D.BOOK || []).forEach((p) => add('anlatici', p.t));
(D.AUDIO_STORIES || []).forEach((s) => add('anlatici', s.text, true));
(D.VAULT || []).forEach((v) => add('anlatici', v.title + '. ' + v.text));
(D.WEEKLY || []).forEach((w) => (w.posts || []).forEach((p) => add('anlatici', p.t + '. ' + p.text)));
(D.FACTS || []).forEach((f) => add('anlatici', f[1]));
(D.ANIMALS || []).forEach((a) => { add('anlatici', `${a.name}. Süper gücü: ${a.power}. ${a.fact}`); add('anlatici', a.name + '. ' + a.power + '. ' + a.fact); });
(D.COUNTRIES || []).forEach((c) => add('anlatici', `${c.name}. Başkenti ${c.cap}. ${c.fact}`));
(D.EXPERIMENTS || []).forEach((ex) => add('anlatici', ex.steps.map((s, k) => (k + 1) + '. ' + s).join(' ')));
(D.CASES || []).forEach((c) => { add('anlatici', c.intro); add('anlatici', c.solve); });
Object.keys(D.WORLDS || {}).forEach((n) => add('anlatici', `Kechy ${n}. ${D.WORLDS[n].theme}. Masal dinle, boya, oyna ya da şarkı söyle!`));

(D.QUESTIONS || []).forEach((q) => quiz(q, 'kechy'));
(D.QUESTIONS_MINIK || []).forEach((q) => { quiz(q, 'kechy'); add('kechy', q[0] + '. ' + q[1].join('. ')); });
Object.values(D.ISSUE_QUIZ || {}).forEach((l) => l.forEach((q) => quiz(q, 'kechy')));
Object.values(D.STORY_QUIZ || {}).forEach((l) => l.forEach((q) => quiz(q, 'kechy')));
(D.TASKS || []).forEach((t) => add('kechy', t[1]));
(D.TASKS_MINIK || []).forEach((t) => { add('kechy', t[1]); add('kechy', 'Bugünün görevi: ' + t[1]); });
(D.NOTES || []).forEach((n) => add('kechy', 'Kechy diyor ki: ' + n));
(D.RIDDLES || []).forEach((r) => add('kechy', 'Bilmece: ' + r[0]));
(D.TV || []).forEach((ep) => ep.scenes.forEach((sc) => add('kechy', sc[1])));
['Merhaba minik kaşif! Hadi oynayalım!', 'Harika! Bütün çıkartmaları topladın!', 'Yaşasın! Çıkartma kazandın!',
  'Masallar. Bir kapağa dokun ve masalı dinle!', 'Oyunlar. Bir oyuna dokun!'].forEach((t) => add('kechy', t));

// pages of the real issues (kechy-dunyasi/sayi/<n>/metin.json, made by build.py), same string as the reader's 🔊 button
const sayi = path.join(__dirname, '..', 'kechy-dunyasi', 'sayi');
if (fs.existsSync(sayi)) for (const n of fs.readdirSync(sayi)) {
  const f = path.join(sayi, n, 'metin.json');
  if (fs.existsSync(f)) JSON.parse(fs.readFileSync(f, 'utf8')).forEach(([, title, text]) => { if (text) add('anlatici', (title && !text.startsWith(title) ? title + '. ' : '') + text); });
}

const list = [...out.values()];
fs.writeFileSync(path.join(__dirname, 'texts.json'), JSON.stringify(list, null, 1));
console.log(list.length + ' texts, ' + list.reduce((a, t) => a + t.text.length, 0) + ' characters (' + list.filter((t) => t.role === 'kechy').length + ' in Kechy\'s voice)');
