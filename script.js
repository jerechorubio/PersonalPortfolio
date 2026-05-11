//script.js — Portfolio
 
'use strict';
 
//1. DARK / LIGHT THEME TOGGLE
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const html = document.documentElement;
  if (!btn) return;
 
  // Persist theme preference
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) html.setAttribute('data-theme', saved);
 
  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();
 
 

   //2. CUSTOM CURSOR

(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(max-width:640px)').matches) return;
 
  let mx = 0, my = 0, fx = 0, fy = 0;
 
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  }, { passive: true });
 
  (function rafFollower() {
    fx += (mx - fx) * 0.13;
    fy += (my - fy) * 0.13;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(rafFollower);
  })();
 
  const interEls = 'a, button, .glass-card, .proj-card, .fbtn';
  document.querySelectorAll(interEls).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'translate(-50%,-50%) scale(2.2)';
      follower.style.transform = 'translate(-50%,-50%) scale(0.5)';
      follower.style.borderColor = 'rgba(252,209,22,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.borderColor = 'rgba(157,80,187,0.55)';
    });
  });
})();
 
 
  //3. NAVBAR — scroll + hamburger

(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navbar) return;
 
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
 
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      })
    );
  }
})();
 
 
  //4. TYPING EFFECT

(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
 
  const phrases = [
    'Systems Developer',
    'SAP Certified',
    'Youth Leader & SK Kagawad',
    'Zone 3B Youth President',
    'IAS Aspirant',
    '3rd Year BSIT Student',
    'Community-Driven Builder',
  ];
 
  let pi = 0, ci = 0, del = false;
 
  function step() {
    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.slice(0, ci + 1);
      ci++;
      if (ci === cur.length) { del = true; setTimeout(step, 1800); return; }
      setTimeout(step, 80 + Math.random() * 55);
    } else {
      el.textContent = cur.slice(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(step, 350); return; }
      setTimeout(step, 38);
    }
  }
  setTimeout(step, 900);
})();
 
  //5. SCROLL REVEAL (Intersection Observer)

(function initReveal() {
  const selectors = '.reveal-fade,.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.reveal-tl,.reveal-bento';
  const targets   = document.querySelectorAll(selectors);
  if (!targets.length) return;
 
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--d') || '0') * 1000;
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -55px 0px' });
 
  targets.forEach(el => io.observe(el));
})();
 
  //6. SKILL BAR ANIMATION

(function initSkillBars() {
  const fills = document.querySelectorAll('.sb-fill');
  if (!fills.length) return;
 
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      setTimeout(() => { el.style.width = el.getAttribute('data-w') + '%'; }, 250);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
 
  fills.forEach(el => io.observe(el));
})();
 
 
  //7. TIMELINE SPINE ANIMATION

(function initSpine() {
  const spine = document.getElementById('tlSpine');
  if (!spine) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { spine.classList.add('animated'); io.disconnect(); }
  }, { threshold: 0.15 });
  io.observe(spine);
})();
 
  //8. MAGNETIC BUTTON EFFECT

(function initMagnetic() {
  const btns = document.querySelectorAll('.magnetic');
  btns.forEach(btn => {
    let rect;
    btn.addEventListener('mouseenter', () => { rect = btn.getBoundingClientRect(); });
    btn.addEventListener('mousemove', e => {
      if (!rect) return;
      const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.32;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.32;
      btn.style.transform = `translate(${dx}px,${dy}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();
 

  //9. PROJECT FILTER

(function initFilter() {
  const btns  = document.querySelectorAll('.fbtn');
  const cards = document.querySelectorAll('.proj-card');
  if (!btns.length) return;
 
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
 
      cards.forEach(card => {
        const cats = card.getAttribute('data-cat') || '';
        const show = filter === 'all' || cats.includes(filter);
        card.style.opacity    = '0';
        card.style.transform  = 'scale(0.95)';
        card.style.transition = 'opacity .25s,transform .25s';
        if (!show) {
          setTimeout(() => card.classList.add('hidden'), 250);
        } else {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity   = '';
            card.style.transform = '';
          }, 10);
        }
      });
    });
  });
})();
 
 
  //10. COUNTER ANIMATION — hero stats

(function initCounters() {
  const counters = document.querySelectorAll('.hs-n[data-target]');
  if (!counters.length) return;
 
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.textContent.replace(/\d+/, '');
      let cur = 0;
      const inc = target / 40;
      const tick = () => {
        cur = Math.min(cur + inc, target);
        el.textContent = Math.ceil(cur) + suffix;
        if (cur < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 1 });
 
  counters.forEach(c => io.observe(c));
})();
 
 
  //11. PARALLAX ORBS (mouse follow)

(function initOrbs() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length || window.matchMedia('(max-width:768px)').matches) return;
 
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
      const f = (i + 1) * 9;
      orb.style.transform = `translate(${dx * f}px,${dy * f}px)`;
    });
  }, { passive: true });
})();
 

  //12. CARD TILT EFFECT

(function initTilt() {
  const cards = document.querySelectorAll('.proj-card,.cert-card');
  if (window.matchMedia('(max-width:768px)').matches) return;
 
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform    = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
      card.style.transition   = 'transform .1s,border-color .3s,box-shadow .3s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .3s';
    });
  });
})();
 
 
  //13. SCROLL SPY — highlight active nav link

(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a,.mobile-menu a');
  if (!sections.length) return;
 
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = active ? 'var(--p3)' : '';
      });
    });
  }, { threshold: 0.45 });
 
  sections.forEach(s => io.observe(s));
})();
 
 
  //14. BACK TO TOP BUTTON

(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
 
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
 
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
 
 

   //15. SMOOTH ANCHOR SCROLL

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
 
 

   //16. CONTACT FORM VALIDATION & SUBMIT
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  if (!form) return;
 
  const fName   = document.getElementById('fName');
  const fEmail  = document.getElementById('fEmail');
  const fMsg    = document.getElementById('fMsg');
  const errName = document.getElementById('errName');
  const errEmail= document.getElementById('errEmail');
  const errMsg  = document.getElementById('errMsg');
  const submitBtn = document.getElementById('submitBtn');
  const fb      = document.getElementById('formFb');
 
  // Real-time validation helpers
  function setErr(input, errEl, msg) {
    errEl.textContent = msg;
    input.closest('.iw').querySelector('input,textarea').classList.toggle('err', !!msg);
  }
 
  function validateName()  { setErr(fName,  errName,  fName.value.trim().length < 2  ? 'Please enter your full name.' : ''); }
  function validateEmail() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value.trim());
    setErr(fEmail, errEmail, ok ? '' : 'Please enter a valid email address.');
  }
  function validateMsg()   { setErr(fMsg, errMsg, fMsg.value.trim().length < 10 ? 'Message must be at least 10 characters.' : ''); }
 
  fName.addEventListener('blur',  validateName);
  fEmail.addEventListener('blur', validateEmail);
  fMsg.addEventListener('blur',   validateMsg);
 
  // Clear error on input
  [fName, fEmail, fMsg].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('err');
    });
  });
 
  form.addEventListener('submit', e => {

    // Run all validations
    validateName(); validateEmail(); validateMsg();

    const hasError = errName.textContent || errEmail.textContent || errMsg.textContent;
    
    // If errors — block and stop
    if (hasError) {
      e.preventDefault();
      return;
    }

    // If all valid — let form submit naturally to Formsubmit ✅
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

  });
})();
 
 
  //17. PAGE LOAD FADE IN

(function initLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Reveal hero elements immediately
    const heroEls = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-up, .hero .reveal-scale');
    heroEls.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), 200 + i * 110));
  });
})();
 
 
  //Dev Signature

console.log(
  '%c⚡ Portfolio — Dev/Leader\n%cMerging Systems with Leadership',
  'color:#FCD116;font-weight:800;font-size:14px;background:#0D0D0D;padding:8px 14px;border-radius:6px 6px 0 0;display:block;',
  'color:#9D50BB;font-size:12px;background:#0D0D0D;padding:4px 14px 8px;border-radius:0 0 6px 6px;display:block;'
);
