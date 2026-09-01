document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Producten dropdown: hover handles desktop via CSS; this handles mobile taps.
  var navItem = document.querySelector('.nav-item');
  var navTrigger = document.querySelector('.nav-trigger');
  if (navItem && navTrigger) {
    navTrigger.addEventListener('click', function () {
      if (window.innerWidth <= 1000) {
        navItem.classList.toggle('open');
        var expanded = navItem.classList.contains('open');
        navTrigger.setAttribute('aria-expanded', expanded);
      }
    });
  }

  // Email addresses are stored as data attributes, not plain text/mailto,
  // so basic scrapers reading raw HTML don't harvest them. Real visitors
  // (JS enabled, the vast majority) get a normal working mailto link.
  // data-subject optionally pre-fills the email subject line.
  // data-label (presence only) keeps the element's own text instead of
  // overwriting it with the raw address - used for CTA buttons.
  document.querySelectorAll('.e-link').forEach(function (el) {
    var u = el.getAttribute('data-u');
    var d = el.getAttribute('data-d');
    var subject = el.getAttribute('data-subject');
    if (u && d) {
      el.href = 'mailto:' + u + '@' + d + (subject ? '?subject=' + encodeURIComponent(subject) : '');
      if (!el.hasAttribute('data-label')) {
        el.textContent = u + '@' + d;
      }
    }
  });

  // --- Cookie consent + Google Analytics (only loads after consent) ---
  var CONSENT_KEY = 'vbm_cookie_consent';
  var GA_ID = 'G-Q92W8MJJLL';

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  var banner = document.querySelector('.cookie-banner');
  var acceptBtn = document.querySelector('.cookie-accept');
  var declineBtn = document.querySelector('.cookie-decline');
  var reopenLinks = document.querySelectorAll('.cookie-reopen');

  function showBanner() {
    if (banner) banner.classList.add('visible');
  }
  function hideBanner() {
    if (banner) banner.classList.remove('visible');
  }

  var existingConsent = getConsent();
  if (existingConsent === 'granted') {
    loadAnalytics();
  } else if (existingConsent !== 'denied') {
    showBanner();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('granted');
      loadAnalytics();
      hideBanner();
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      setConsent('denied');
      hideBanner();
    });
  }
  reopenLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showBanner();
    });
  });
});
