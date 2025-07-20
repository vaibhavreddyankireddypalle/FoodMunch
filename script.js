// Advanced Food Munch Website JavaScript
// Modern ES6+ features with comprehensive functionality

class FoodMunchApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('foodMunchCart')) || [];
        this.menuItems = [];
        this.filteredItems = [];
        this.currentFilter = 'all';
        this.itemsPerPage = 8;
        this.currentPage = 1;
        this.isLoading = false;
        
        this.init();
    }

    // Initialize the application
    async init() {
        this.showLoadingScreen();
        await this.loadMenuItems();
        this.setupEventListeners();
        this.initializeAnimations();
        this.updateCartUI();
        this.hideLoadingScreen();
        this.setupProgressBar();
        this.initializeStats();
    }

    // Loading screen management
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    // Progress bar for page scroll
    setupProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Animated statistics counter
    initializeStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Load menu items (simulated API call)
    async loadMenuItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.menuItems = [
                    {
                        id: 1,
                        name: "Ginger Fried Rice",
                        category: "starters",
                        price: 12.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-ginger-fried-img.png",
                        description: "Aromatic basmati rice with fresh ginger and vegetables",
                        rating: 4.5,
                        spicy: true,
                        vegetarian: false
                    },
                    {
                        id: 2,
                        name: "Veg Spring Rolls",
                        category: "starters",
                        price: 8.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-veg-starters-img.png",
                        description: "Crispy spring rolls filled with fresh vegetables",
                        rating: 4.3,
                        spicy: false,
                        vegetarian: true
                    },
                    {
                        id: 3,
                        name: "Mushroom Soup",
                        category: "starters",
                        price: 6.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-soup-img.png",
                        description: "Creamy mushroom soup with herbs and spices",
                        rating: 4.7,
                        spicy: false,
                        vegetarian: true
                    },
                    {
                        id: 4,
                        name: "Grilled Seafood",
                        category: "mains",
                        price: 24.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-grilled-seafood-img.png",
                        description: "Fresh seafood grilled to perfection with lemon",
                        rating: 4.8,
                        spicy: false,
                        vegetarian: false
                    },
                    {
                        id: 5,
                        name: "Hyderabadi Biryani",
                        category: "mains",
                        price: 18.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-hyderabadi-biryani-img.png",
                        description: "Traditional Hyderabadi biryani with tender meat",
                        rating: 4.9,
                        spicy: true,
                        vegetarian: false
                    },
                    {
                        id: 6,
                        name: "Mushroom Noodles",
                        category: "mains",
                        price: 14.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-mushroom-noodles-img.png",
                        description: "Stir-fried noodles with mushrooms and vegetables",
                        rating: 4.4,
                        spicy: true,
                        vegetarian: true
                    },
                    {
                        id: 7,
                        name: "Fresh Garden Salad",
                        category: "mains",
                        price: 10.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-gluten-img.png",
                        description: "Organic mixed greens with house dressing",
                        rating: 4.2,
                        spicy: false,
                        vegetarian: true
                    },
                    {
                        id: 8,
                        name: "Coffee Bourbon",
                        category: "desserts",
                        price: 7.99,
                        image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-coffee-bourbon-img.png",
                        description: "Rich coffee-flavored dessert with bourbon notes",
                        rating: 4.6,
                        spicy: false,
                        vegetarian: true
                    },
                    {
                        id: 9,
                        name: "Fresh Orange Juice",
                        category: "beverages",
                        price: 4.99,
                        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=200&fit=crop",
                        description: "Freshly squeezed orange juice",
                        rating: 4.1,
                        spicy: false,
                        vegetarian: true
                    },
                    {
                        id: 10,
                        name: "Iced Coffee",
                        category: "beverages",
                        price: 5.99,
                        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=200&fit=crop",
                        description: "Cold brew coffee with ice and cream",
                        rating: 4.4,
                        spicy: false,
                        vegetarian: true
                    }
                ];
                
                this.filteredItems = [...this.menuItems];
                resolve();
            }, 1000);
        });
    }

    // Setup all event listeners
    setupEventListeners() {
        // Navigation scroll effects
        this.setupNavbarScroll();
        
        // Menu filters
        this.setupMenuFilters();
        
        // Search functionality
        this.setupSearch();
        
        // Cart functionality
        this.setupCartEvents();
        
        // Newsletter form
        this.setupNewsletterForm();
        
        // Back to top button
        this.setupBackToTop();
        
        // Order tracking
        this.setupOrderTracking();
        
        // Smooth scrolling for navigation
        this.setupSmoothScrolling();
        
        // Load more functionality
        this.setupLoadMore();

        // Render initial menu items
        this.renderMenuItems();
    }

    // Navbar scroll effects
    setupNavbarScroll() {
        const navbar = document.getElementById('mainNavbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Menu filter functionality
    setupMenuFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Filter items
                const filter = e.target.getAttribute('data-filter');
                this.filterMenuItems(filter);
            });
        });
    }

    // Filter menu items by category
    filterMenuItems(category) {
        this.currentFilter = category;
        this.currentPage = 1;
        
        if (category === 'all') {
            this.filteredItems = [...this.menuItems];
        } else {
            this.filteredItems = this.menuItems.filter(item => item.category === category);
        }
        
        this.renderMenuItems();
    }

    // Search functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchMenuItems(e.target.value);
            }, 300);
        });
    }

    // Search menu items
    searchMenuItems(query) {
        if (!query.trim()) {
            this.filterMenuItems(this.currentFilter);
            return;
        }

        const searchTerm = query.toLowerCase();
        this.filteredItems = this.menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        
        this.currentPage = 1;
        this.renderMenuItems();
    }

    // Render menu items
    renderMenuItems() {
        const container = document.getElementById('menu-container');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const itemsToShow = this.filteredItems.slice(0, endIndex);

        if (this.currentPage === 1) {
            container.innerHTML = '';
        }

        itemsToShow.slice(startIndex).forEach((item, index) => {
            const menuCard = this.createMenuCard(item);
            container.appendChild(menuCard);
            
            // Add stagger animation
            setTimeout(() => {
                menuCard.style.opacity = '1';
                menuCard.style.transform = 'translateY(0)';
            }, index * 100);
        });

        this.updateLoadMoreButton();
    }

    // Create menu card element
    createMenuCard(item) {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-3 mb-4';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';

        const spicyIcon = item.spicy ? '<i class="fas fa-pepper-hot text-danger ms-1" title="Spicy"></i>' : '';
        const vegIcon = item.vegetarian ? '<i class="fas fa-leaf text-success ms-1" title="Vegetarian"></i>' : '';
        const stars = '★'.repeat(Math.floor(item.rating)) + (item.rating % 1 ? '☆' : '');

        card.innerHTML = `
            <div class="menu-item-card h-100" data-aos="fade-up">
                <div class="position-relative">
                    <img src="${item.image}" class="menu-item-image" alt="${item.name}" loading="lazy" />
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-warning text-dark">${stars} ${item.rating}</span>
                    </div>
                </div>
                <div class="menu-card-content">
                    <h3 class="menu-card-title">${item.name} ${spicyIcon} ${vegIcon}</h3>
                    <p class="menu-card-description">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="menu-card-price">$${item.price}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="app.changeQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2 quantity-display" id="qty-${item.id}">0</span>
                            <button class="quantity-btn" onclick="app.changeQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" onclick="app.addToCart(${item.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    // Load more functionality
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            this.currentPage++;
            this.renderMenuItems();
        });
    }

    // Update load more button visibility
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;

        const totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        
        if (this.currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Cart functionality
    setupCartEvents() {
        const cartBtn = document.getElementById('cart-btn');
        const mobileCartBtn = document.getElementById('mobile-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        [cartBtn, mobileCartBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.showCartModal());
            }
        });

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
        }
    }

    // Change quantity in menu
    changeQuantity(itemId, change) {
        const qtyDisplay = document.getElementById(`qty-${itemId}`);
        if (!qtyDisplay) return;

        let currentQty = parseInt(qtyDisplay.textContent) || 0;
        currentQty = Math.max(0, currentQty + change);
        qtyDisplay.textContent = currentQty;

        // Update cart if quantity is greater than 0
        if (currentQty > 0) {
            const item = this.menuItems.find(item => item.id === itemId);
            if (item) {
                const cartItem = { ...item, quantity: currentQty };
                this.updateCartItem(cartItem);
            }
        } else {
            this.removeFromCart(itemId);
        }
    }

    // Add item to cart
    addToCart(itemId) {
        const item = this.menuItems.find(item => item.id === itemId);
        if (!item) return;

        const existingItem = this.cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }

        this.updateCartUI();
        this.saveCartToLocalStorage();
        this.showCartNotification(item.name);
        
        // Update quantity display
        const qtyDisplay = document.getElementById(`qty-${itemId}`);
        if (qtyDisplay) {
            const cartItem = this.cart.find(item => item.id === itemId);
            qtyDisplay.textContent = cartItem ? cartItem.quantity : 0;
        }
    }

    // Update cart item
    updateCartItem(item) {
        const existingItemIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex !== -1) {
            this.cart[existingItemIndex] = item;
        } else {
            this.cart.push(item);
        }

        this.updateCartUI();
        this.saveCartToLocalStorage();
    }

    // Remove item from cart
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartUI();
        this.saveCartToLocalStorage();
        
        // Update quantity display
        const qtyDisplay = document.getElementById(`qty-${itemId}`);
        if (qtyDisplay) {
            qtyDisplay.textContent = '0';
        }
    }

    // Update cart UI
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const mobileCartCount = document.getElementById('mobile-cart-count');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        [cartCount, mobileCartCount].forEach(element => {
            if (element) {
                element.textContent = totalItems;
                element.style.display = totalItems > 0 ? 'inline-block' : 'none';
            }
        });
    }

    // Show cart modal
    showCartModal() {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        this.renderCartItems();
        cartModal.show();
    }

    // Render cart items in modal
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItemsContainer || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '0.00';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = '';

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="text-end">
                    <div class="fw-bold">$${itemTotal.toFixed(2)}</div>
                    <button class="btn btn-sm btn-outline-danger mt-1" onclick="app.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Update cart quantity
    updateCartQuantity(itemId, change) {
        const item = this.cart.find(item => item.id === itemId);
        if (!item) return;

        item.quantity = Math.max(1, item.quantity + change);
        this.updateCartUI();
        this.saveCartToLocalStorage();
        this.renderCartItems();
        
        // Update menu quantity display
        const qtyDisplay = document.getElementById(`qty-${itemId}`);
        if (qtyDisplay) {
            qtyDisplay.textContent = item.quantity;
        }
    }

    // Save cart to localStorage
    saveCartToLocalStorage() {
        localStorage.setItem('foodMunchCart', JSON.stringify(this.cart));
    }

    // Show cart notification
    showCartNotification(itemName) {
        // Create and show a toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle text-success me-2"></i>
                <span>${itemName} added to cart!</span>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Proceed to checkout
    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Simulate checkout process
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderNumber = 'FM' + Date.now().toString().slice(-6);
        
        alert(`Order placed successfully!\nOrder Number: ${orderNumber}\nTotal: $${total.toFixed(2)}\n\nThank you for choosing Food Munch!`);
        
        // Clear cart
        this.cart = [];
        this.updateCartUI();
        this.saveCartToLocalStorage();
        
        // Close modal
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
        
        // Reset quantity displays
        document.querySelectorAll('.quantity-display').forEach(display => {
            display.textContent = '0';
        });
    }

    // Newsletter form
    setupNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            if (this.validateEmail(email)) {
                this.subscribeToNewsletter(email);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Subscribe to newsletter
    subscribeToNewsletter(email) {
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            document.getElementById('newsletter-email').value = '';
        }, 500);
    }

    // Back to top button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Order tracking
    setupOrderTracking() {
        const trackOrderBtn = document.getElementById('track-order-btn');
        const trackBtn = document.getElementById('track-btn');

        if (trackOrderBtn) {
            trackOrderBtn.addEventListener('click', () => {
                const trackingModal = new bootstrap.Modal(document.getElementById('trackingModal'));
                trackingModal.show();
            });
        }

        if (trackBtn) {
            trackBtn.addEventListener('click', () => {
                this.trackOrder();
            });
        }
    }

    // Track order
    trackOrder() {
        const orderNumber = document.getElementById('orderNumber').value;
        const trackingResult = document.getElementById('tracking-result');
        
        if (!orderNumber.trim()) {
            alert('Please enter an order number.');
            return;
        }

        // Simulate tracking
        trackingResult.innerHTML = `
            <div class="tracking-status">
                <div class="tracking-step completed">1</div>
                <div class="tracking-step completed">2</div>
                <div class="tracking-step active">3</div>
                <div class="tracking-step">4</div>
            </div>
            <div class="mt-3">
                <h6>Order Status: Preparing</h6>
                <p class="text-muted">Your delicious meal is being prepared by our chefs!</p>
                <small>Estimated delivery: 25-30 minutes</small>
            </div>
        `;
        
        trackingResult.style.display = 'block';
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize animations
    initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }

        // Add intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FoodMunchApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh cart when page becomes visible again
        if (window.app) {
            window.app.updateCartUI();
        }
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('Back online');
    // Could show a notification or refresh data
});

window.addEventListener('offline', () => {
    console.log('Gone offline');
    // Could show offline notification
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FoodMunchApp;
}