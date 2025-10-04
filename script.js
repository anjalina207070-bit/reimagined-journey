// Header scroll state
(function(){
  const header = document.querySelector('[data-header]');
  const onScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > 8;
    header.classList.toggle('scrolled', scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile nav toggle
(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !header || !nav) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('open');
    if (!expanded) nav.querySelector('a')?.focus();
  });
})();

// Reveal on scroll
(function(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
})();

// Simple subscribe handling
(function(){
  const form = document.querySelector('.subscribe-form');
  const input = document.querySelector('#email');
  const feedback = document.querySelector('.form-feedback');
  if (!form || !input || !feedback) return;

  function validateEmail(value){
    return /\S+@\S+\.\S+/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = String(input.value || '').trim();
    if (!validateEmail(email)){
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = '#f8c6c6';
      return;
    }
    // Simulate success
    feedback.textContent = 'Thanks for subscribing! Check your inbox for confirmation.';
    feedback.style.color = '#cfe8cf';
    form.reset();
  });
})();
