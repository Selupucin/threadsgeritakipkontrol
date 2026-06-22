/* TGTK arka plan servisi — içerik scriptinden gelen profilleri arka plan sekmelerinde açar. */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === 'TGTK_OPEN' && Array.isArray(msg.urls)) {
    msg.urls.slice(0, 10).forEach((u) => {
      try { chrome.tabs.create({ url: u, active: false }); } catch (e) {}
    });
  }
});
