// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.style.display = expanded ? 'none' : 'block';
  });
}

// Filter products
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const productCards = Array.from(document.querySelectorAll('.product-card'));

function applyFilter(category) {
  productCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const show = category === 'all' || category === cardCategory;
    card.style.display = show ? '' : 'none';
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-filter');
    applyFilter(category);
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Deep link filters from nav links with data-filter
const navFilterLinks = Array.from(document.querySelectorAll('a[data-filter]'));
navFilterLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const category = link.getAttribute('data-filter');
    const matchingButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (matchingButton) {
      e.preventDefault();
      matchingButton.click();
    }
  });
});

// Add to bag interactions (demo only)
const bagButtons = Array.from(document.querySelectorAll('.add-to-bag'));
bagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.getAttribute('data-product') || 'Item';
    btn.textContent = 'Added ✓';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = `Add to bag`;
      btn.disabled = false;
    }, 1200);
    const announce = document.createElement('div');
    announce.setAttribute('role', 'status');
    announce.className = 'visually-hidden';
    announce.textContent = `${product} added to bag.`;
    document.body.appendChild(announce);
    setTimeout(() => announce.remove(), 800);
  });
});

// Newsletter form (demo)
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email'))?.value || '';
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      newsletterMessage.textContent = 'Please enter a valid email.';
      newsletterMessage.style.color = '#ffb3b3';
      return;
    }
    newsletterMessage.textContent = 'Thanks for subscribing — welcome!';
    newsletterMessage.style.color = '#9be2a2';
    newsletterForm.reset();
  });
}

// Back to top button
const toTop = document.getElementById('to-top');
if (toTop) {
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    toTop.classList.toggle('show', show);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Current year in footer
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
