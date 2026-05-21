// ── Mobile Menu ──────────────────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuBtn.innerHTML = navMenu.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ── Header scroll effect ─────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.padding = '10px 0';
    header.style.backgroundColor = 'rgba(10,10,10,0.98)';
  } else {
    header.style.padding = '20px 0';
    header.style.backgroundColor = 'rgba(10,10,10,0.95)';
  }
});

// ── Scroll Animations ────────────────────────────────────────────────────────
const animatedEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
const animateOnScroll = () => {
  animatedEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 120) {
      el.classList.add('visible');
    }
  });
};
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// ── Smooth scrolling ─────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// ── Hero: Floating Particles ─────────────────────────────────────────────────
(function createParticles() {
  const wrapper = document.querySelector('.particles-wrapper');
  if (!wrapper) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 10 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.5;
    wrapper.appendChild(p);
  }
})();

// ── Hero chart animation lines ────────────────────────────────────────────────
(function buildChartLines() {
  const ca = document.querySelector('.chart-animation');
  if (!ca) return;
  const kf = document.createElement('style');
  kf.textContent = `@keyframes moveLine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;
  document.head.appendChild(kf);
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.style.cssText = `position:absolute;width:100%;height:1px;
      background:linear-gradient(90deg,transparent,rgba(212,175,55,${0.1+i*0.1}),transparent);
      bottom:${i*60}px;animation:moveLine ${3+i*0.5}s linear infinite`;
    ca.appendChild(line);
  }
})();

// ── Stat Counter Animation ────────────────────────────────────────────────────
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const step = () => {
    start += target / (duration / 16);
    if (start >= target) { el.textContent = target.toLocaleString() + suffix; return; }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const raw = entry.target.dataset.target;
      const suffix = entry.target.dataset.suffix || '';
      animateCounter(entry.target, parseFloat(raw), suffix);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

// ── Countdown removed ─────────────────────────────────────────────────────────

// ── Notify form ───────────────────────────────────────────────────────────────
const notifyForm = document.getElementById('notifyForm');
if (notifyForm) {
  notifyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.textContent = '✓ Notified!';
    btn.style.background = '#4ade80';
    btn.style.color = '#0a0a0a';
    this.querySelector('input').value = '';
    setTimeout(() => {
      btn.textContent = 'Notify Me';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

// ── Contact Form — handled by Formspree (no JS intercept needed) ──────────────
// Formspree will redirect to its thank-you page after submission.
// If you want a custom success message instead, use their AJAX approach:
// https://formspree.io/blog/ajax-form-submission/
