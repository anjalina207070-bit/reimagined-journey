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

  function init() {
    updateCartBadge();
    initNewsletter();
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
