/* Main site JS: nav, cart badge, newsletter, SPA-like link handling */
const Site = (() => {
  const state = {
    cartCount: 0,
  };

  function formatCurrency(value) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  }

  function updateCartBadge() {
    const el = document.querySelector('[data-cart-badge]');
    if (!el) return;
    el.textContent = state.cartCount;
    el.hidden = state.cartCount === 0;
  }

  function initNewsletter() {
    const form = document.querySelector('[data-newsletter]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = new FormData(form).get('email');
      if (!email || !String(email).includes('@')) {
        alert('Please enter a valid email.');
        return;
      }
      form.reset();
      alert('Thanks for subscribing!');
    });
  }

  function addToCart(quantity = 1) {
    state.cartCount += quantity;
    updateCartBadge();
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || items.length === 0) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.vogue-header nav ul');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(!expanded));
    });
  }

  function init() {
    updateCartBadge();
    initNewsletter();
    initReveal();
    initMobileNav();
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        addToCart(1);
      }
    });
  }

  return { init, addToCart, state, formatCurrency };
})();

window.addEventListener('DOMContentLoaded', Site.init);
