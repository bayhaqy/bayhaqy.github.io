/* =================================================================
   Achmad Bayhaqy — Portfolio v2 · Vanilla JS
   No dependencies, no frameworks, no API keys.
   ================================================================= */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  /* ---------- Smooth scroll with sticky-header offset ---------- */
  var headerOffset = 68;
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
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
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
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Subtle reveal on scroll (graceful) ---------- */
  var revealEls = document.querySelectorAll(
    '.timeline-item, .expertise-card, .edu-card, .cert-group, .pub-list li, .contact-chip, .about-side .card, .hero-photo'
  );
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .6s cubic-bezier(0.22,0.61,0.36,1), transform .6s cubic-bezier(0.22,0.61,0.36,1)';
      el.style.transitionDelay = Math.min(i * 40, 240) + 'ms';
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- CV download tracking (lightweight, no analytics SDK) ---------- */
  var cvLink = document.querySelector('a[href*="Achmad_Bayhaqy_CV_2026.pdf"]');
  if (cvLink) {
    cvLink.addEventListener('click', function () {
      // Optional: hook into your analytics here (Plausible/Umami/GA4)
      // window.plausible && window.plausible('Download CV');
      console.log('[portfolio] CV download initiated');
    });
  }
})();
