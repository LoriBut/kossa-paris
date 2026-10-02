/* KOSSA — Script principal */

// ── Navbar scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Burger menu ────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navCta && navCta.classList.toggle('open');
});

// Fermer le menu en cliquant un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navCta && navCta.classList.remove('open');
  });
});

// ── Reveal on scroll ───────────────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .gallery-item, .testimonial-card, .info-block, .airtouch-text, .airtouch-visual, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ── Formulaire de contact ──────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"] span:first-child');
  const success = document.getElementById('form-success');

  btn.textContent = 'Envoi en cours…';

  setTimeout(() => {
    success.style.display = 'block';
    btn.textContent = 'Envoyer ma Demande';
    e.target.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => { success.style.display = 'none'; }, 6000);
  }, 1200);
}

// ── Parallax léger sur le hero ─────────────────────────
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const y = window.scrollY;
  heroBg.style.transform = `translateY(${y * 0.4}px)`;
}, { passive: true });

// ── Curseur personnalisé (desktop) ─────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #c9a84c;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.3s;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(201,168,76,0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.4s ease, opacity 0.3s;
  `;
  document.body.appendChild(ring);

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top  = my - 4 + 'px';
    ring.style.left   = mx - 16 + 'px';
    ring.style.top    = my - 16 + 'px';
  });

  document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      ring.style.transform   = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      ring.style.transform   = 'scale(1)';
    });
  });
}

// ── Smooth anchor scroll avec offset navbar ─────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
