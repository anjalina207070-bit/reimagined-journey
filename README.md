# Maison Étoile — Fashion Boutique (Static Site)

A minimal, responsive boutique storefront built with plain HTML, CSS, and JavaScript. No frameworks or build steps required.

## Structure

```
public/
  index.html           # Homepage: hero, featured, newsletter
  shop.html            # Product listing with filters and search
  product.html         # Product detail page
  about.html           # Brand story and values
  contact.html         # Contact form (client-side only)
  404.html             # Simple not-found page
  assets/
    styles/main.css    # Global styles and responsive layout
    scripts/main.js    # Shared interactivity (cart badge, newsletter)
    scripts/shop.js    # Shop rendering and filters
    scripts/product.js # Product detail rendering
    images/            # Placeholder for images
  data/
    products.json      # Sample catalog data
```

## Run locally

Because pages fetch `/data/products.json`, you need to serve `public/` with an HTTP server.

Option A: Python 3

```
cd public
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

Option B: Node (using `npx`)

```
cd public
npx serve -l 3000
```

## Customize

- Edit colors, type, and spacing in `public/assets/styles/main.css`
- Replace Unsplash image URLs with your own in `public/data/products.json`
- Add more products by appending objects to `products.json`
- Update brand name in each HTML file header (`Maison Étoile`)

## Notes

- This demo has a minimal in-memory cart badge; it does not persist or checkout.
- Forms are client-only and do not send data to a backend.