// NASA Astronomy Picture of the Day, cached for 6 hours.
module.exports = async (req, res) => {
  try {
    const r = await fetch('https://api.nasa.gov/planetary/apod?thumbs=true&api_key=' + (process.env.NASA_API_KEY || 'DEMO_KEY'));
    if (!r.ok) throw new Error('status ' + r.status);
    const a = await r.json();
    const image = a.media_type === 'image' ? a.url : (a.thumbnail_url || null);
    if (!image) throw new Error('no image');
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({ date: a.date, title: a.title, image, copyright: (a.copyright || '').replace(/\s+/g, ' ').trim() });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(502).json({ error: 'Fotoğraf şu an alınamadı' });
  }
};
