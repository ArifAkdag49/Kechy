/* ============ BOOT ============ */
(function boot() {
  const logo = $('.brand .logo'), lim = new Image();
  lim.alt = ''; lim.width = 52; lim.height = 52; lim.src = 'img/logo.png';
  lim.onerror = () => { logo.innerHTML = `<svg viewBox="0 -4 100 104" aria-hidden="true">${Art.head('goat', { expr: 'wink' })}</svg>`; };
  logo.append(lim);
  $('#searchbtn').addEventListener('click', openSearch);
  $('#agebtn').addEventListener('click', () => ageModal(false));
  $('#sndbtn').addEventListener('click', () => { S.settings.sound = !S.settings.sound; save(); renderHeader(); if (S.settings.sound) sfx('ok'); toast(S.settings.sound ? 'Sesler açık' : 'Sesler kapalı'); });
  document.addEventListener('keydown', (e) => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) && !Modal.isOpen()) { e.preventDefault(); openSearch(); } });
  renderHeader();
  render();
  loadScript(LIB.confetti).catch(() => { });
  syncFeed();
  try { if ('serviceWorker' in navigator && location.protocol === 'https:' && !/claude/.test(location.hostname)) navigator.serviceWorker.register('sw.js').catch(() => { }); } catch (e) { }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); App.prompt = e; App.refresh(); });
  window.addEventListener('appinstalled', () => { App.prompt = null; App.standalone = true; App.refresh(); toast('Kechy telefonuna eklendi! 🎉'); });
  $('#installbtn')?.addEventListener('click', () => App.open());
  App.refresh();
})();
