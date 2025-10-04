/* Product detail page rendering */
(async function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const container = document.querySelector('[data-product-detail]');
  if (!id || !container) return;

  const resp = await fetch('/data/products.json');
  let products = [];
  try { products = await resp.json(); } catch { products = []; }
  const product = products.find(p => String(p.id) === String(id));
  if (!product) {
    container.innerHTML = '<p>Product not found.</p>';
    return;
  }

  container.innerHTML = `
    <div class="hero-card">
      <div class="hero-media" style="min-height:360px;background: url('${product.image || ''}') center/cover, #0f0f14"></div>
      <div class="copy">
        <div class="hero-eyebrow">${product.category}</div>
        <h1 class="hero-title">${product.name}</h1>
        <p class="hero-subtitle">${product.description || ''}</p>
        <div class="hero-actions">
          <button class="btn" data-add-to-cart>Add to cart • ${Site.formatCurrency(product.price)}</button>
          <button class="btn secondary">Wishlist</button>
        </div>
      </div>
    </div>
  `;
})();
