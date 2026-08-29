/* =================================================================
   Achmad Bayhaqy — Portfolio v4 · Vanilla JS
   Interactive features, no dependencies, no frameworks, no API keys.
   ================================================================= */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (light/dark) ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var brandLogo = document.getElementById('brandLogo');
  var STORAGE_KEY = 'portfolio-theme';

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    // Swap logo: light variant for dark theme, dark variant for light theme
    if (brandLogo) {
      brandLogo.src = theme === 'dark' ? 'assets/logo-light.png' : 'assets/logo.png';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Sync logo on load (in case theme was loaded from storage before JS)
  applyTheme(getCurrentTheme());

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var setNav = function (open) {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navLinks.classList.toggle('open', open);
  };
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setNav(!isOpen);
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });
  document.addEventListener('click', function (e) {
    if (!navLinks || !navToggle) return;
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      setNav(false);
    }
  });
  // Auto-close mobile menu on scroll (so it never covers content while reading)
  var navCloseOnScroll = function () {
    if (navLinks && navLinks.classList.contains('open')) setNav(false);
  };
  window.addEventListener('scroll', navCloseOnScroll, { passive: true });

  /* ---------- Smooth scroll with sticky-header offset ---------- */
  // Use 90px to account for sticky header (68px desktop / 56px mobile)
  // PLUS mobile browser address bar (~50px on initial view before it auto-hides).
  // This is a compromise that works whether address bar is visible or hidden.
  var headerOffset = 90;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Active nav link via IntersectionObserver ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navMap = {};
  document.querySelectorAll('.nav-links a[href^="#"]:not([data-flip-contact])').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && href.length > 1) navMap[href.slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        Object.keys(navMap).forEach(function (key) {
          navMap[key].classList.toggle('active', key === id);
        });
        // Update section dots too
        var dot = document.querySelector('.section-dots a[href="#' + id + '"]');
        if (dot) {
          document.querySelectorAll('.section-dots a').forEach(function (d) {
            d.classList.remove('active');
          });
          dot.classList.add('active');
        }
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  // Handled globally by the data-reveal / IntersectionObserver system below (v6+).
  // The legacy per-element inline-style reveal was removed to avoid double animation.

  /* ---------- Animated number counters (hero stats) ---------- */
  var heroStats = document.getElementById('heroStats');
  if (heroStats && 'IntersectionObserver' in window) {
    var counters = heroStats.querySelectorAll('.meta-num[data-count]');
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = null;
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };
      requestAnimationFrame(step);
    };
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { countObserver.observe(c); });
  }

  /* ---------- Reading progress bar ---------- */
  var progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    var updateProgress = function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
  }

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 600) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Section navigation dots (desktop only) ---------- */
  var navSections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'education', label: 'Education' }
  ];
  if (window.innerWidth > 960) {
    var dotsContainer = document.createElement('nav');
    dotsContainer.className = 'section-dots';
    dotsContainer.setAttribute('aria-label', 'Section navigation');
    navSections.forEach(function (s) {
      var a = document.createElement('a');
      a.href = '#' + s.id;
      a.setAttribute('data-label', s.label);
      a.setAttribute('aria-label', s.label);
      dotsContainer.appendChild(a);
    });
    document.body.appendChild(dotsContainer);
    // Show after a beat
    setTimeout(function () { dotsContainer.classList.add('visible'); }, 500);
    // Click handlers (reuse smooth scroll)
    dotsContainer.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Magnetic button effect (desktop, non-reduced-motion) ---------- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (btn) {
      btn.classList.add('magnetic');
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.25) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- Keyboard navigation (j/k or arrow down/up) ---------- */
  var navOrder = navSections.map(function (s) { return s.id; });
  document.addEventListener('keydown', function (e) {
    // Don't interfere with form inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key !== 'j' && e.key !== 'k' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    // Only handle when not in nav toggle
    if (navLinks && navLinks.classList.contains('open')) return;

    e.preventDefault();
    var currentScroll = window.scrollY + window.innerHeight / 2;
    var currentIdx = 0;
    for (var i = 0; i < navOrder.length; i++) {
      var el = document.getElementById(navOrder[i]);
      if (!el) continue;
      if (el.offsetTop <= currentScroll) currentIdx = i;
    }
    var nextIdx;
    if (e.key === 'j' || e.key === 'ArrowDown') {
      nextIdx = Math.min(currentIdx + 1, navOrder.length - 1);
    } else {
      nextIdx = Math.max(currentIdx - 1, 0);
    }
    var target = document.getElementById(navOrder[nextIdx]);
    if (target) {
      var top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });

  /* ---------- CV download tracking (lightweight, no analytics SDK) ---------- */
  var cvLinks = document.querySelectorAll('a[href*="Achmad_Bayhaqy_CV"]');
  cvLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Optional: hook into your analytics here (Plausible/Umami/GA4)
      // window.plausible && window.plausible('Download CV');
      console.log('[portfolio] CV download initiated');
    });
  });

  /* ---------- Publication PDF inline viewer ---------- */
  // PDFs are now always visible (no toggle); reserve hook for future lazy-loading if needed.
  var pubPdfs = document.querySelectorAll('.pub-pdf-wrap iframe');
  if ('IntersectionObserver' in window && pubPdfs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var f = en.target;
          if (f.getAttribute('data-src')) {
            f.setAttribute('src', f.getAttribute('data-src'));
            f.removeAttribute('data-src');
          }
          io.unobserve(f);
        }
      });
    }, { rootMargin: '200px' });
    pubPdfs.forEach(function (f) { io.observe(f); });
  }
})();

/* =================================================================
   HERO v5 — Business card interactions (meepulm-inspired)
   Intro veil sequencing · name character reveal · 3D tilt ·
   sheen tracking · flip front/back · hero scroll parallax.
   ================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  var body = document.body;
  var veil = document.getElementById('introVeil');
  var card = document.getElementById('bcCard');
  var tilt = document.getElementById('bcTilt');
  var scene = document.getElementById('bcScene');

  /* ---------- Split "Achmad" into reveal characters ---------- */
  var surnameDelay = 0;
  if (card) {
    var splitEls = card.querySelectorAll('[data-split]');
    splitEls.forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var ch = document.createElement('span');
        ch.className = 'bc-ch';
        ch.setAttribute('aria-hidden', 'true');
        ch.textContent = text[i];
        ch.style.transitionDelay = (280 + i * 55) + 'ms';
        el.appendChild(ch);
      }
      // keep the real word accessible to screen readers
      var sr = document.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = text;
      el.appendChild(sr);
      surnameDelay = 280 + text.length * 55 + 90;
    });
    var surname = card.querySelector('.bc-surname');
    if (surname) surname.style.transitionDelay = surnameDelay + 'ms';
  }

  /* ---------- Intro veil sequencing ---------- */
  function finishIntro() {
    body.classList.add('iv-done');
    if (card) card.classList.add('is-in');
    setTimeout(function () {
      if (veil && veil.parentNode) veil.parentNode.removeChild(veil);
    }, 900);
  }
  if (veil) {
    if (reduceMotion) {
      veil.parentNode && veil.parentNode.removeChild(veil);
      if (card) card.classList.add('is-in');
    } else {
      // two RAFs so the initial paint lands before animating
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          body.classList.add('iv-run');
          setTimeout(finishIntro, 620);
        });
      });
      // hard safety: never trap the user behind the veil
      setTimeout(function () {
        if (!body.classList.contains('iv-done')) finishIntro();
      }, 2400);
    }
  } else if (card) {
    card.classList.add('is-in');
  }

  if (reduceMotion) return; // no tilt / parallax / sheen below

  /* ---------- 3D tilt (lerped) + sheen tracking ---------- */
  if (tilt && scene && finePointer) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

    var loop = function () {
      cx += (tx - cx) * 0.085;
      cy += (ty - cy) * 0.085;
      tilt.style.setProperty('--rx', cx.toFixed(3) + 'deg');
      tilt.style.setProperty('--ry', cy.toFixed(3) + 'deg');
      if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };
    var kick = function () { if (raf === null) raf = requestAnimationFrame(loop); };

    scene.addEventListener('pointermove', function (e) {
      var r = tilt.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      ty = px * 10;   // rotateY
      tx = py * -7.5; // rotateX
      tilt.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(2) + '%');
      tilt.style.setProperty('--my', ((py + 0.5) * 100).toFixed(2) + '%');
      kick();
    });
    scene.addEventListener('pointerleave', function () {
      tx = 0; ty = 0;
      kick();
    });
  }

  /* ---------- Flip front / back ---------- */
  var flipBtn = document.getElementById('bcFlip');
  var flipBackBtn = document.getElementById('bcFlipBack');
  var back = document.getElementById('bcBack');

  function setFlipped(flipped) {
    if (!card) return;
    card.classList.toggle('is-flipped', flipped);
    if (flipBtn) flipBtn.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    if (back) back.setAttribute('aria-hidden', flipped ? 'false' : 'true');
    var front = card.querySelector('.bc-front');
    if (front) front.setAttribute('aria-hidden', flipped ? 'true' : 'false');
  }
  if (flipBtn) flipBtn.addEventListener('click', function () {
    setFlipped(!card.classList.contains('is-flipped'));
  });
  if (flipBackBtn) flipBackBtn.addEventListener('click', function () { setFlipped(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setFlipped(false);
  });

  /* ---------- Hero scroll parallax (subtle fade-and-drift) ---------- */
  var stage = document.querySelector('.hero-stage');
  var wrap = document.getElementById('heroStageWrap');
  if (stage && wrap && finePointer) {
    var ticking = false;
    var parallax = function () {
      ticking = false;
      var sy = window.scrollY;
      var h = stage.offsetHeight || 1;
      if (sy <= h) {
        wrap.style.transform = 'translateY(' + (sy * 0.16).toFixed(1) + 'px)';
        wrap.style.opacity = Math.max(1 - sy / (h * 0.72), 0).toFixed(3);
      }
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(parallax);
      }
    }, { passive: true });
  }
})();


/* =================================================================
   V6 — Horizontal scroll scenes (meepulm-style) · global reveals ·
   nav Contact flips the card · flip hint button
   ================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Card flip helpers ---------- */
  var card = document.getElementById('bcCard');
  var flipBtn = document.getElementById('bcFlip');

  function flipTo(flipped) {
    if (!card) return;
    var isFlipped = card.classList.contains('is-flipped');
    if (isFlipped === flipped) return;
    if (flipBtn) flipBtn.click();
  }
  var flipHint = document.getElementById('bcFlipHint');
  if (flipHint) flipHint.addEventListener('click', function () { flipTo(true); });

  /* ---------- Nav "Contact" → scroll to hero + flip card ---------- */
  document.querySelectorAll('[data-flip-contact]').forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () { flipTo(true); }, 700);
    });
  });

  /* ---------- Global scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var groups = new Map();
    revealEls.forEach(function (el) {
      var p = el.parentElement;
      var n = groups.get(p) || 0;
      el.style.setProperty('--reveal-delay', Math.min(n * 70, 350) + 'ms');
      groups.set(p, n + 1);
    });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        ro.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Experience timeline: scroll-drawn accent line ---------- */
  // The red line over the timeline hairline draws downward as the reader
  // scrolls through the section; timeline dots pop as their items reveal.
  if (reduceMotion) return;

  var timelineEl = document.getElementById('careerTimeline');
  if (timelineEl) {
    var tlTicking = false;
    var updateTl = function () {
      tlTicking = false;
      var r = timelineEl.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var p = (vh * 0.78 - r.top) / Math.max(r.height, 1);
      p = Math.min(Math.max(p, 0), 1);
      timelineEl.style.setProperty('--tl-progress', p.toFixed(4));
    };
    var onTlScroll = function () {
      if (!tlTicking) {
        tlTicking = true;
        requestAnimationFrame(updateTl);
      }
    };
    window.addEventListener('scroll', onTlScroll, { passive: true });
    window.addEventListener('resize', onTlScroll);
    updateTl();
  }
})();
