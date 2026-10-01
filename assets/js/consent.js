(() => {
  'use strict';
  const key = 'dana-analytics-consent-v1';
  const tag = 'G-XE5BMKL7G5';
  const ttl = 180 * 86400000;
  const banner = document.getElementById('cookie-banner');
  let loaded = false;
  let returnFocus;
  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved && saved.expires > Date.now() && ['accepted', 'rejected'].includes(saved.choice) ? saved.choice : null;
    } catch (_) { return null; }
  }
  function clearCookies() {
    const host = location.hostname.split('.');
    const domains = ['', ...host.map((_, i) => host.slice(i).join('.'))];
    document.cookie.split(';').forEach(pair => {
      const name = pair.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
        domains.forEach(domain => {
          document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
        });
      }
    });
  }
  function start() {
    if (loaded || location.protocol !== 'https:') return;
    loaded = true;
    window['ga-disable-' + tag] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', tag, {allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + tag;
    document.head.appendChild(script);
  }
  function stop() {
    window['ga-disable-' + tag] = true;
    clearCookies();
    // Unload an already running tag so it cannot continue automatic measurement.
    if (loaded) location.reload();
  }
  function choose(choice) {
    try { localStorage.setItem(key, JSON.stringify({choice, expires: Date.now() + ttl})); } catch (_) {}
    banner.hidden = true;
    if (returnFocus) returnFocus.focus();
    if (choice === 'accepted') start(); else stop();
  }
  document.querySelectorAll('[data-cookie-settings]').forEach(button => {
    button.addEventListener('click', () => {
      returnFocus = button;
      banner.hidden = false;
      document.getElementById('cookie-reject').focus();
    });
  });
  document.getElementById('cookie-accept').addEventListener('click', () => choose('accepted'));
  document.getElementById('cookie-reject').addEventListener('click', () => choose('rejected'));
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    const choice = read();
    banner.hidden = !!choice;
    if (choice === 'accepted') start(); else stop();
  });
  const choice = read();
  banner.hidden = !!choice;
  if (choice === 'accepted') start(); else stop();
})();
