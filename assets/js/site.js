/* ==========================================================================
   Mars Sign & Craft — site.js
   Loaded with `defer`. Nothing here is required to render or index the page:
   all content is already in the HTML. This only adds behaviour.
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var on = function (el, ev, fn, o) { el && el.addEventListener(ev, fn, o || false); };
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ======================================================================
     1. LQIP BLUR-UP
     Remove the blur once the real bitmap has decoded.
     ====================================================================== */
  function unblur(img) {
    img.classList.add('is-loaded');
    // free the base64 placeholder from memory once it is no longer visible
    setTimeout(function () { img.style.backgroundImage = ''; }, 600);
  }
  $$('.ms-blur').forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) unblur(img);
    else {
      on(img, 'load', function () { unblur(img); });
      on(img, 'error', function () { unblur(img); });
    }
  });

  /* ======================================================================
     2. HEADER — sticky state
     ====================================================================== */
  var header = $('#main-header');
  if (header) {
    var stuck = false;
    var onScroll = function () {
      var s = window.scrollY > 60;
      if (s !== stuck) { stuck = s; header.classList.toggle('is-stuck', s); }
    };
    onScroll();
    on(window, 'scroll', function () { window.requestAnimationFrame(onScroll); }, { passive: true });
  }

  /* ======================================================================
     3. NAVIGATION — mobile drawer + dropdown accordions
     ====================================================================== */
  var toggle = $('.mobile-menu-toggle');
  var navEl  = $('#primary-nav');

  function closeNav() {
    if (!navEl) return;
    navEl.classList.remove('is-open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    $$('.has-drop.is-open', navEl).forEach(function (d) {
      d.classList.remove('is-open');
      var a = $('.nav-link', d), b = $('.nav-drop-toggle', d);
      a && a.setAttribute('aria-expanded', 'false');
      b && b.setAttribute('aria-expanded', 'false');
    });
  }

  if (toggle && navEl) {
    on(toggle, 'click', function () {
      var open = navEl.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeNav();
    });
  }

  // Accordion carets (mobile). The parent <a> still navigates to the hub page.
  $$('.nav-drop-toggle').forEach(function (btn) {
    on(btn, 'click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var item = btn.closest('.has-drop');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var link = $('.nav-link', item);
      link && link.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Keyboard: Escape closes, click-outside closes
  on(document, 'keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  on(document, 'click', function (e) {
    if (header && !header.contains(e.target)) closeNav();
  });
  $$('.nav-drop-link, .nav-cta').forEach(function (a) { on(a, 'click', closeNav); });

  /* ======================================================================
     4. HERO CAROUSEL
     ====================================================================== */
  (function heroCarousel() {
    var hero = $('.hero');
    if (!hero) return;
    var slides = $$('.hero-slide', hero);
    var dots   = $$('.hero-dot', hero);
    if (slides.length < 2) return;

    var i = 0, timer = null;
    var DELAY = 6000;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function go(n) {
      slides[i].classList.remove('is-active');
      slides[i].setAttribute('aria-hidden', 'true');
      dots[i] && dots[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      slides[i].removeAttribute('aria-hidden');
      dots[i] && dots[i].classList.add('is-active');
    }
    function start() { if (!reduce) { stop(); timer = setInterval(function () { go(i + 1); }, DELAY); } }
    function stop()  { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, n) {
      on(d, 'click', function () { go(n); start(); });
    });
    on(hero, 'mouseenter', stop);
    on(hero, 'mouseleave', start);
    on(document, 'visibilitychange', function () { document.hidden ? stop() : start(); });

    // swipe
    var x0 = null;
    on(hero, 'touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    on(hero, 'touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) { go(i + (dx < 0 ? 1 : -1)); start(); }
      x0 = null;
    }, { passive: true });

    start();
  })();

  /* ======================================================================
     5. BLOG — category filter + "Explore more"
     All cards are already in the DOM (good for SEO); we only show/hide.
     "Explore more" reveals the next batch WITHOUT removing what is shown.
     ====================================================================== */
  (function blogFilter() {
    var grid = $('#blog-grid');
    if (!grid) return;

    var cells   = $$('.blog-cell', grid);
    var chips   = $$('.cat-chip[data-cat]');
    var moreBtn = $('#load-more');
    var wrap    = $('.load-more-wrap');
    var shownEl = $('#shown-count');
    var totalEl = $('#total-count');

    var STEP = 8;
    var cat = 'all';
    var limit = STEP;

    function matches(cell) { return cat === 'all' || cell.getAttribute('data-cat') === cat; }

    function render() {
      var shown = 0, total = 0;
      cells.forEach(function (cell) {
        if (!matches(cell)) { cell.hidden = true; return; }
        total++;
        if (shown < limit) { cell.hidden = false; shown++; }
        else cell.hidden = true;
      });
      if (shownEl) shownEl.textContent = shown;
      if (totalEl) totalEl.textContent = total;
      if (wrap) wrap.classList.toggle('is-done', shown >= total);
      if (moreBtn) {
        var left = total - shown;
        moreBtn.textContent = left > 0
          ? 'Explore ' + Math.min(STEP, left) + ' more article' + (Math.min(STEP, left) === 1 ? '' : 's')
          : 'Explore more articles';
      }
    }

    chips.forEach(function (chip) {
      on(chip, 'click', function () {
        cat = chip.getAttribute('data-cat');
        limit = STEP;
        chips.forEach(function (c) {
          var active = c === chip;
          c.classList.toggle('is-active', active);
          c.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        render();
        // keep the grid in view without yanking the page around
        var top = grid.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top: top, behavior: 'smooth' });

        // reflect the filter in the URL so it can be shared / back-buttoned
        var url = cat === 'all' ? location.pathname : location.pathname + '?c=' + cat;
        history.replaceState(null, '', url);
      });
    });

    if (moreBtn) {
      on(moreBtn, 'click', function () {
        limit += STEP;      // additive: previously shown cards stay put
        render();
      });
    }

    // honour ?c=category on load
    var pre = new URLSearchParams(location.search).get('c');
    if (pre) {
      var chip = chips.filter(function (c) { return c.getAttribute('data-cat') === pre; })[0];
      if (chip) chip.click();
      else render();
    } else render();
  })();

  /* ======================================================================
     6. PROMOTIONAL PRODUCTS -> WhatsApp enquiry
     ====================================================================== */
  (function whatsapp() {
    var meta = $('meta[name="ms-whatsapp"]');
    if (!meta) return;
    var phone = meta.getAttribute('content');
    $$('.product-request').forEach(function (btn) {
      on(btn, 'click', function () {
        var product = btn.getAttribute('data-product');
        var msg = 'Hello Mars Sign & Craft,\n\nI am interested in ' + product +
                  '.\n\nPlease send me more information and pricing.\n\nThank you.';
        window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      });
    });
  })();


  /* ======================================================================
     9. SCROLL RESTORE  (#2)
     Remember where the user was on a hub page so the "Back to all services"
     link returns them to that exact spot instead of the top.
     ====================================================================== */
  (function scrollMemory() {
    var HUBS = ['/services/', '/projects/', '/blog/', '/locations/'];
    var path = location.pathname;

    function keyFor(p) { return 'ms-scroll:' + p; }

    // Save position when leaving a hub page
    if (HUBS.indexOf(path) !== -1) {
      var save = function () {
        try { sessionStorage.setItem(keyFor(path), String(window.scrollY)); } catch (e) {}
      };
      on(window, 'beforeunload', save);
      $$('a').forEach(function (a) {
        on(a, 'click', function () {
          if (a.host === location.host) save();
        });
      });

      // Returning to the hub via a back-link: restore
      try {
        if (sessionStorage.getItem('ms-return') === path) {
          var y = parseInt(sessionStorage.getItem(keyFor(path)) || '0', 10);
          sessionStorage.removeItem('ms-return');
          if (y > 0) {
            // 'instant' avoids a long visible scroll animation
            window.scrollTo({ top: y, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
          }
        }
      } catch (e) {}
    }

    // Flag the intent when a back-link is used
    $$('[data-back]').forEach(function (a) {
      on(a, 'click', function () {
        try { sessionStorage.setItem('ms-return', a.getAttribute('href')); } catch (e) {}
      });
    });
  })();

  /* ======================================================================
     10. CONTACT MODAL  (#3)
     "Request a quote" opens in-page rather than navigating to /#contact.
     ====================================================================== */
  var modal = $('#quote-modal');
  function openModal(service) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    var f = $('#modal-page-field');
    if (f) f.value = location.pathname;
    var sel = $('#m-service');
    if (sel && service) {
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === service) { sel.selectedIndex = i; break; }
      }
    }
    var first = $('#m-name');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }
  if (modal) {
    $$('[data-quote-open]').forEach(function (b) {
      on(b, 'click', function (e) {
        e.preventDefault();
        openModal(b.getAttribute('data-service'));
      });
    });
    on($('.modal-close', modal), 'click', closeModal);
    on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* ======================================================================
     11. WHATSAPP  (#4)
     Floating launcher, bottom-LEFT, quiet until the user reaches services.
     Builds the message from the chosen service and always shows an explicit
     "redirecting you to WhatsApp" step rather than jumping silently.
     ====================================================================== */
  (function whatsapp() {
    var root  = $('#wa-root');
    if (!root) return;
    var fab   = $('#wa-fab');
    var panel = $('#wa-panel');
    var note  = $('#wa-note');
    var phone = (document.querySelector('meta[name="ms-whatsapp"]') || {}).content || '97470690143';
    var chosen = null;

    function openPanel(service) {
      panel.hidden = false;
      root.classList.add('is-open');
      fab.setAttribute('aria-expanded', 'true');
      if (service) selectChip(service);
    }
    function closePanel() {
      panel.hidden = true;
      root.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
    }
    function selectChip(service) {
      chosen = service;
      $$('.wa-chip', panel).forEach(function (c) {
        c.classList.toggle('is-active', c.getAttribute('data-service') === service);
      });
    }

    on(fab, 'click', function () {
      panel.hidden ? openPanel() : closePanel();
    });
    on($('.wa-panel-close', panel), 'click', closePanel);
    $$('.wa-chip', panel).forEach(function (c) {
      on(c, 'click', function () { selectChip(c.getAttribute('data-service')); });
    });

    // Any element can open the panel pre-filled
    $$('[data-wa-open]').forEach(function (b) {
      on(b, 'click', function (e) {
        e.preventDefault();
        openPanel(b.getAttribute('data-service'));
      });
    });

    /* --- build message + explicit redirect notice --- */
    var redirect     = $('#wa-redirect');
    var redirectMsg  = $('#wa-redirect-msg');
    var redirectLink = $('#wa-redirect-link');
    var redirectTimer = null;

    function buildMessage(service, extra) {
      var lines = ['Hello Mars Sign & Craft,'];
      lines.push('');
      lines.push(service
        ? 'I would like to enquire about: ' + service + '.'
        : 'I would like to enquire about your services.');
      if (extra) { lines.push(''); lines.push(extra); }
      lines.push('');
      // #4 traffic tag so enquiries can be attributed to the website
      lines.push('— sent from marssign.com' + (location.pathname !== '/' ? ' (' + location.pathname + ')' : ''));
      return lines.join('\n');
    }

    function go(service, extra) {
      var msg = buildMessage(service, extra);
      var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
      closePanel();

      if (!redirect) { window.open(url, '_blank', 'noopener'); return; }
      redirectLink.href = url;
      redirectMsg.textContent = service
        ? 'Opening a chat about ' + service + '.'
        : 'Opening a chat with our team.';
      redirect.hidden = false;
      document.body.classList.add('no-scroll');

      redirectTimer = setTimeout(function () {
        window.open(url, '_blank', 'noopener');
        hideRedirect();
      }, 1400);
    }

    function hideRedirect() {
      if (redirectTimer) { clearTimeout(redirectTimer); redirectTimer = null; }
      if (redirect) redirect.hidden = true;
      document.body.classList.remove('no-scroll');
    }

    if (redirect) {
      on($('.wa-redirect-cancel', redirect), 'click', hideRedirect);
      on(redirectLink, 'click', function () { setTimeout(hideRedirect, 100); });
    }

    on($('[data-wa-send]'), 'click', function () {
      go(chosen, note ? note.value.trim() : '');
    });

    /* --- legacy per-product buttons on the promotional page --- */
    $$('.product-request').forEach(function (b) {
      on(b, 'click', function () { go(b.getAttribute('data-product'), ''); });
    });

    /* --- #4 expand once, when the user reaches the services section --- */
    var teased = false;
    var target = $('#solutions') || $('.svc-grid') || $('.home-svc-grid');
    if (target && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !teased) {
            teased = true;
            root.classList.add('is-teased');   // shows the label, does not open
            setTimeout(function () { root.classList.remove('is-teased'); }, 5000);
            io.disconnect();
          }
        });
      }, { threshold: 0.25 });
      io.observe(target);
    }
  })();

  /* ======================================================================
     12. CONTACT FORM — async submit (both inline and modal)
     ====================================================================== */

  /* ======================================================================
     7b. ARABIC TRANSLATION TOGGLE
     Headings, titles and meta are hand-written Arabic and already in the
     HTML. This only translates the remaining BODY copy, on demand, so the
     translation script is never loaded for visitors who don't ask for it
     (keeps it off the critical path entirely).
     ====================================================================== */
  (function langToggle() {
    var btn = $('#lang-toggle');
    if (!btn) return;

    var KEY = 'ms-lang';
    var loaded = false;

    function injectTranslator() {
      if (loaded) return;
      loaded = true;
      var host = document.createElement('div');
      host.id = 'google_translate_element';
      document.body.appendChild(host);

      window.googleTranslateElementInit = function () {
        /* global google */
        new google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'ar', autoDisplay: false },
          'google_translate_element'
        );
        setTimeout(setCombo, 400);
      };
      var sc = document.createElement('script');
      sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      sc.async = true;
      document.body.appendChild(sc);
    }

    function setCombo() {
      var combo = document.querySelector('.goog-te-combo');
      if (!combo) return setTimeout(setCombo, 300);
      combo.value = 'ar';
      combo.dispatchEvent(new Event('change'));
    }

    function clearTranslation() {
      // Google stores its choice in a cookie; clearing it and reloading is
      // the only reliable way back to the original English.
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + location.hostname;
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    }

    on(btn, 'click', function () {
      var active = btn.getAttribute('aria-pressed') === 'true';
      if (active) return clearTranslation();
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = 'English';
      try { localStorage.setItem(KEY, 'ar'); } catch (e) {}
      injectTranslator();
    });

    // Restore the visitor's previous choice
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'ar' || /googtrans=\/en\/ar/.test(document.cookie)) {
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = 'English';
      injectTranslator();
    }
  })();

  /* ======================================================================
     8. CONTACT FORM — async submit
     ====================================================================== */
  (function contactForms() {
    [['#contactForm', '#form-status'], ['#modalContactForm', '#modal-form-status']].forEach(function (pair) {
      wire($(pair[0]), $(pair[1]));
    });

    function wire(form, status) {
    if (!form) return;
    var btn = $('.btn-submit', form);

    on(form, 'submit', function (e) {
      e.preventDefault();
      var original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = '';

      fetch(form.getAttribute('action'), { method: 'POST', body: new FormData(form) })
        .then(function (r) {
          if (!r.ok) throw new Error('bad response');
          status.className = 'form-status ok';
          status.textContent = '✓ Request sent. Our team will contact you shortly.';
          form.reset();
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent = '✖ Something went wrong. Please email info@marssign.com directly.';
        })
        .finally(function () {
          btn.textContent = original;
          btn.disabled = false;
        });
    });
    }
  })();

})();
