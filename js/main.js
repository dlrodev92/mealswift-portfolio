/* ─── MAIN ───────────────────────────────────────────────────────────────────
   App init on DOMContentLoaded:
   1. IntersectionObserver scroll reveals on .reveal elements
   2. initTabs()     — hi-fi tab switching
   3. initLightbox() — fullscreen image viewer
   ─────────────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Scroll reveals ── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Downloads dropdown ── */
  var navDl     = document.getElementById('navDl');
  var navToggle = document.getElementById('navDlToggle');

  if (navDl && navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = navDl.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', function () {
      navDl.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        navDl.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Module init ── */
  if (typeof initTabs      === 'function') initTabs();
  if (typeof initLightbox  === 'function') initLightbox();

});
