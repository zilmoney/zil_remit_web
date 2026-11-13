// Sticky bottom disclaimer bar, shared by every page on the site.
// Slides up after the visitor scrolls past SHOW_AFTER_PX; the close button hides it for the page view.
// Included on each page with: <script src="/sticky-disclaimer.js" defer></script>
(function () {
  var DISCLAIMER_TEXT =
    'Zil Money® is a financial technology company, not a bank. Banking services provided by Citizens Bank, N.A., Member FDIC.';
  var SHOW_AFTER_PX = 300;
  var BAR_ID = 'zr-sticky-disclaimer';

  function init() {
    if (document.getElementById(BAR_ID)) return;

    var style = document.createElement('style');
    style.textContent =
      '#' + BAR_ID + '{position:fixed;left:0;right:0;bottom:0;z-index:40;' +
      'background:rgba(248,250,252,.96);border-top:1px solid #e2e8f0;' +
      '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);' +
      'padding-bottom:env(safe-area-inset-bottom);' +
      'transform:translateY(100%);transition:transform .3s ease;}' +
      '#' + BAR_ID + '.zr-visible{transform:translateY(0);}' +
      '#' + BAR_ID + ' .zr-inner{position:relative;max-width:80rem;margin:0 auto;padding:10px 44px;}' +
      '#' + BAR_ID + ' p{margin:0;font-size:12px;line-height:1.6;color:#475569;text-align:center;' +
      'font-family:inherit;}' +
      '#' + BAR_ID + ' button{position:absolute;right:12px;top:50%;transform:translateY(-50%);' +
      'background:none;border:0;padding:4px;cursor:pointer;color:#64748b;line-height:0;}' +
      '#' + BAR_ID + ' button:hover{color:#1e293b;}' +
      '#' + BAR_ID + ' button:focus-visible{outline:2px solid #00c46a;outline-offset:2px;border-radius:4px;}';
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = BAR_ID;
    bar.setAttribute('role', 'note');
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML =
      '<div class="zr-inner"><p></p>' +
      '<button type="button" aria-label="Close disclaimer" tabindex="-1">' +
      '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
      '</button></div>';
    bar.querySelector('p').textContent = DISCLAIMER_TEXT;
    document.body.appendChild(bar);

    var button = bar.querySelector('button');

    function update() {
      var visible = window.scrollY > SHOW_AFTER_PX;
      bar.classList.toggle('zr-visible', visible);
      bar.setAttribute('aria-hidden', visible ? 'false' : 'true');
      button.tabIndex = visible ? 0 : -1;
    }

    button.addEventListener('click', function () {
      window.removeEventListener('scroll', update);
      bar.parentNode.removeChild(bar);
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
