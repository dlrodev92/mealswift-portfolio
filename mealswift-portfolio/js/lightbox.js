/* ─── LIGHTBOX ───────────────────────────────────────────────────────────────
   Click any .img-card img → fullscreen overlay.
   ESC key or click outside image → close.
   ─────────────────────────────────────────────────────────────────────────── */

function initLightbox() {
  var overlay = null;
  var lbImg   = null;

  /* ── Build overlay element once ── */
  function buildOverlay() {
    var el = document.createElement('div');
    el.className  = 'lightbox-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Image viewer');

    var img = document.createElement('img');
    img.alt = '';
    // Prevent overlay-close when clicking the image itself
    img.addEventListener('click', function (e) { e.stopPropagation(); });

    var btn = document.createElement('button');
    btn.className = 'lightbox-close';
    btn.innerHTML = '&times;';
    btn.setAttribute('aria-label', 'Close image viewer');
    btn.addEventListener('click', close);

    el.appendChild(img);
    el.appendChild(btn);
    // Click on backdrop (overlay itself) → close
    el.addEventListener('click', close);

    document.body.appendChild(el);
    return { el: el, img: img };
  }

  /* ── Open ── */
  function open(src, alt) {
    if (!overlay) {
      var built = buildOverlay();
      overlay = built.el;
      lbImg   = built.img;
    }

    lbImg.src = src;
    lbImg.alt = alt || '';

    // Force reflow before adding is-open so opacity transition fires
    overlay.style.display = 'flex'; // ensure flex even if previously none
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('is-open');
      });
    });

    document.addEventListener('keydown', handleKey);
  }

  /* ── Close ── */
  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.removeEventListener('keydown', handleKey);
  }

  /* ── ESC handler ── */
  function handleKey(e) {
    if (e.key === 'Escape') close();
  }

  /* ── Bind to all .img-card img elements ── */
  document.querySelectorAll('.img-card img').forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent double-fire if card also has listener
      open(img.src, img.alt);
    });
  });
}
