// Shared GSAP motion for Levantate Labs subpages
window.LVTMotion = {
  init: function () {
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    document.querySelectorAll('[data-line]').forEach(function (el, i) {
      gsap.fromTo(el, { yPercent: 110 }, {
        yPercent: 0, duration: 1.1, ease: 'power4.out', delay: 0.08 * i,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    document.querySelectorAll('[data-words]').forEach(function (el) {
      var walk = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3 && child.textContent.trim()) {
            var frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach(function (w) {
              if (!w.trim()) { frag.appendChild(document.createTextNode(w)); return; }
              var s = document.createElement('span');
              s.textContent = w; s.style.display = 'inline-block'; s.setAttribute('data-w', '1');
              frag.appendChild(s);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) walk(child);
        });
      };
      walk(el);
      gsap.fromTo(el.querySelectorAll('[data-w]'), { opacity: 0.12 }, {
        opacity: 1, stagger: 0.02, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 35%', scrub: true }
      });
    });

    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var f = parseFloat(el.getAttribute('data-parallax')) || 0.06;
      gsap.fromTo(el, { yPercent: -f * 100, scale: 1.12 }, {
        yPercent: f * 100, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    document.querySelectorAll('[data-media-frame]').forEach(function (el) {
      gsap.fromTo(el, { clipPath: 'inset(6% 4% 6% 4% round 20px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'power2.out', duration: 1.2,
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
    });

    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: target, duration: 1.6, ease: 'power2.out', snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    document.querySelectorAll('[data-section-scale]').forEach(function (el) {
      gsap.fromTo(el, { scale: 0.96 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: true }
      });
    });

    var wm = document.querySelector('[data-wordmark]');
    if (wm) gsap.fromTo(wm, { yPercent: 55 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: wm.parentElement, start: 'top bottom', end: 'bottom bottom', scrub: true }
    });

    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var arrow = btn.querySelector('[data-btn-arrow]');
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power2.out' });
        if (arrow) arrow.style.transform = 'translateX(4px)';
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        if (arrow) arrow.style.transform = 'translateX(0)';
      });
    });
  }
};
