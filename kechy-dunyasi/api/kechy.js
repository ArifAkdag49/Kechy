// Pulls the newest Kechy posts from Substack so new issues appear on the site automatically.
module.exports = async (req, res) => {
  try {
    const r = await fetch('https://kechykid.substack.com/api/v1/archive?sort=new&limit=30', { headers: { 'User-Agent': 'Mozilla/5.0 (KechyDunyasi)' } });
    if (!r.ok) throw new Error('status ' + r.status);
    const list = await r.json();
    const posts = list.map((p) => {
      const m = /kechy\s*(\d{1,3})/i.exec(p.title || '');
      return { n: m ? +m[1] : null, title: p.title, sub: p.subtitle || '', date: p.post_date, url: p.canonical_url, cover: p.cover_image || null };
    });
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({ updated: new Date().toISOString(), posts });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=60');
    res.status(502).json({ error: 'Kaynak şu an alınamadı' });
  }
};
