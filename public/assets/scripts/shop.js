/* Shop page rendering and filtering */
(async function () {
  const grid = document.querySelector('[data-products-grid]');
  const input = document.querySelector('[data-filter-input]');
  const filterBtns = document.querySelectorAll('[data-filter]');
  const resp = await fetch('/data/products.json');
  let products = [];
  try { products = await resp.json(); } catch { products = []; }

  function render(list) {
    if (!grid) return;
    grid.innerHTML = list.map(p => `
      <article class="card" data-product>
        <div class="card-media" style="background: url('${p.image || ''}') center/cover, #15151b"></div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="card-meta"><span>${p.category}</span><span>${Site.formatCurrency(p.price)}</span></div>
          <a class="btn secondary" href="/product.html?id=${encodeURIComponent(p.id)}">View</a>
        </div>
      </article>
    `).join('');
  }

  function applyFilter() {
    const q = (input?.value || '').toLowerCase();
    const active = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
    let list = products;
    if (active !== 'all') list = list.filter(p => p.category.toLowerCase() === active);
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
    render(list);
  }

  input?.addEventListener('input', applyFilter);
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter();
  }));

  render(products);
})();
