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
});
