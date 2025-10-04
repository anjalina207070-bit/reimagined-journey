// Mobile Navigation and Products Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Shopping Cart Functionality
    let cart = [];
    const cartBtn = document.querySelector('.cart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Load cart from localStorage
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCartDisplay();
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            addToCart(id, name, price);
        });
    });

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCartDisplay();
        saveCart();
        showNotification(`${name} added to cart!`);
    }

    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> Cart (${totalItems})`;
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                showNotification('Thank you for subscribing!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');

        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.collection-item, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Products Page Functionality
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (searchInput && categoryFilter && priceFilter && sortFilter && productsGrid) {
        // Search functionality
        searchInput.addEventListener('input', filterProducts);

        // Filter functionality
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        sortFilter.addEventListener('change', filterProducts);

        // Load more functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProducts);
        }

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;
            const sortValue = sortFilter.value;

            const products = Array.from(productsGrid.children);

            let visibleProducts = products.filter(product => {
                const name = product.dataset.name.toLowerCase();
                const category = product.dataset.category;
                const price = parseFloat(product.dataset.price);

                // Search filter
                const matchesSearch = name.includes(searchTerm);

                // Category filter
                const matchesCategory = categoryValue === 'all' || category === categoryValue;

                // Price filter
                let matchesPrice = true;
                if (priceValue !== 'all') {
                    if (priceValue === '0-100') {
                        matchesPrice = price >= 0 && price <= 100;
                    } else if (priceValue === '100-300') {
                        matchesPrice = price > 100 && price <= 300;
                    } else if (priceValue === '300-500') {
                        matchesPrice = price > 300 && price <= 500;
                    } else if (priceValue === '500+') {
                        matchesPrice = price > 500;
                    }
                }

                return matchesSearch && matchesCategory && matchesPrice;
            });

            // Sort products
            if (sortValue === 'price-low') {
                visibleProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
            } else if (sortValue === 'price-high') {
                visibleProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
            } else if (sortValue === 'name') {
                visibleProducts.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
            }

            // Show/hide products
            products.forEach(product => {
                if (visibleProducts.includes(product)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        function loadMoreProducts() {
            // Simulate loading more products
            const hiddenProducts = Array.from(productsGrid.children).filter(product => product.style.display === 'none');

            if (hiddenProducts.length > 0) {
                hiddenProducts.slice(0, 4).forEach(product => {
                    product.style.display = 'block';
                });
            } else {
                loadMoreBtn.style.display = 'none';
                showNotification('All products loaded!');
            }
        }
    }

    // Quick View Modal
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modalAddToCart = document.getElementById('modalAddToCart');

    if (modal && closeModal && quickViewButtons.length > 0) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const product = document.querySelector(`.product-item[data-id="${productId}"]`);

                if (product) {
                    const name = product.dataset.name;
                    const price = product.dataset.price;
                    const image = product.querySelector('img').src;
                    const description = product.querySelector('.product-description').textContent;

                    document.getElementById('modalImage').src = image;
                    document.getElementById('modalImage').alt = name;
                    document.getElementById('modalTitle').textContent = name;
                    document.getElementById('modalPrice').textContent = `$${price}`;
                    document.getElementById('modalDescription').textContent = description;

                    modalAddToCart.setAttribute('data-id', productId);
                    modalAddToCart.setAttribute('data-name', name);
                    modalAddToCart.setAttribute('data-price', price);

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeModal.addEventListener('click', closeModalFunction);
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModalFunction();
            }
        });

        modalAddToCart.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            addToCart(id, name, price);
            closeModalFunction();
        });

        function closeModalFunction() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .collection-item, .about-content, .contact-content {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);