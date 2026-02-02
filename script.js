(function () {
  'use strict';

  const LOAD_DURATION = 4200; // Birds animation plays; transition after
  let birdsAnimation = null;

  function startBirdsAnimation(birdsEl) {
    if (typeof lottie === 'undefined' || !birdsEl) return;

    // Load JSON first so path works from any base URL (and we can handle errors)
    const jsonPath = new URL('assets/gray-seagulls.json', window.location.href).href;
    fetch(jsonPath)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load birds animation');
        return res.json();
      })
      .then(function (data) {
        birdsAnimation = lottie.loadAnimation({
          container: birdsEl,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        });
      })
      .catch(function () {
        // Path wrong or file:// block: try path directly
        birdsAnimation = lottie.loadAnimation({
          container: birdsEl,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'assets/gray-seagulls.json',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        });
      });
  }

  function initLoadScreen() {
    const loadScreen = document.getElementById('load-screen');
    const birdsEl = document.getElementById('load-birds');
    if (!loadScreen) return;

    loadScreen.setAttribute('aria-hidden', 'false');
    // Birds start when window loads (see bottom of script)

    const hideLoadScreen = function () {
      if (birdsAnimation) {
        birdsAnimation.destroy();
        birdsAnimation = null;
      }
      loadScreen.classList.add('load-screen--hidden');
      document.body.classList.add('card-ready');
      setTimeout(function () {
        loadScreen.setAttribute('aria-hidden', 'true');
      }, 1200);
    };

    if (document.visibilityState === 'hidden') {
      document.addEventListener('visibilitychange', function onVisible() {
        if (document.visibilityState === 'visible') {
          document.removeEventListener('visibilitychange', onVisible);
          setTimeout(hideLoadScreen, 800);
        }
      });
    } else {
      setTimeout(hideLoadScreen, LOAD_DURATION);
    }
  }

  function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const thanks = document.getElementById('rsvp-thanks');

    if (!form || !thanks) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // In production: send to Formspree or your backend
      // const formData = new FormData(form);
      // fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: formData });

      form.classList.add('hidden');
      thanks.classList.remove('hidden');
      thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function init() {
    initRSVPForm();
    initLoadScreen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Start birds after Lottie script and layout are ready
  if (document.readyState === 'complete') {
    var birdsEl = document.getElementById('load-birds');
    if (birdsEl && typeof lottie !== 'undefined' && !birdsAnimation) {
      startBirdsAnimation(birdsEl);
    }
  } else {
    window.addEventListener('load', function () {
      var birdsEl = document.getElementById('load-birds');
      if (birdsEl && typeof lottie !== 'undefined' && !birdsAnimation) {
        startBirdsAnimation(birdsEl);
      }
    });
  }
})();
