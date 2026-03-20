/* ─── TABS ───────────────────────────────────────────────────────────────────
   Tab switching: [data-tab] buttons ↔ [data-panel] / id panels.
   Button's data-tab value must match the target panel's id.
   ─────────────────────────────────────────────────────────────────────────── */

function initTabs() {
  var tabs   = document.querySelectorAll('[data-tab]');
  var panels = document.querySelectorAll('[data-panel]');

  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.dataset.tab;

      // Deactivate all tabs and panels
      tabs.forEach(function (t)   { t.classList.remove('is-active'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });

      // Activate clicked tab and matching panel
      tab.classList.add('is-active');
      var panel = document.getElementById(targetId);
      if (panel) panel.classList.add('is-active');
    });
  });
}
