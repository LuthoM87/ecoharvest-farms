// =============================================
// ECOHARVEST FARMS - MAIN JAVASCRIPT FILE
// =============================================

// Global variables
let cart = [];
let currentImageIndex = 0;
let galleryImages = [];
let searchData = [];
let products = [];
let events = [];

// =============================================
// 1. INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize all components
    initializeNavigation();
    initializeProducts();
    initializeSearch();
    initializeAccordion();
    initializeTabs();
    initializeGallery();
    initializeForms();
    initializeMap();
    initializeAnimations();
    initializeCart();
    initializeEvents();
    initializeScrollEffects();
    initializeStatistics();
    
    // Load dynamic content
    loadProducts();
    loadEvents();
    loadSearchData();
}

// =============================================
// 2. NAVIGATION
// =============================================
function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// =============================================
// 3. PRODUCTS MANAGEMENT
// =============================================
function initializeProducts() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });
}

function loadProducts() {
    products = [
        {
            id: 1,
            name: 'Organic Tomatoes',
            description: 'Freshly harvested organic tomatoes, grown without pesticides.',
            price: 25,
            category: 'vegetables',
            image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
            inStock: true,
            keywords: ['tomatoes', 'organic', 'vegetables', 'fresh']
        },
        {
            id: 2,
            name: 'Organic Carrots',
            description: 'Sweet and crunchy organic carrots, perfect for salads and snacks.',
            price: 20,
            category: 'vegetables',
            image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
            inStock: true,
            keywords: ['carrots', 'organic', 'vegetables', 'sweet']
        },
        {
            id: 3,
            name: 'Organic Lettuce',
            description: 'Crisp and fresh organic lettuce, ideal for salads and sandwiches.',
            price: 15,
            category: 'vegetables',
            image: 'https://post.healthline.com/wp-content/uploads/2020/03/crisphead-lettuce-iceberg-1296x728-body.jpg',
            inStock: true,
            keywords: ['lettuce', 'organic', 'vegetables', 'crisp', 'salad']
        },
        {
            id: 4,
            name: 'Organic Apples',
            description: 'Juicy and sweet organic apples, perfect for snacking.',
            price: 30,
            category: 'fruits',
            image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
            inStock: true,
            keywords: ['apples', 'organic', 'fruits', 'sweet', 'juicy']
        },
        {
            id: 5,
            name: 'Fresh Basil',
            description: 'Aromatic fresh basil, perfect for cooking and garnishing.',
            price: 12,
            category: 'herbs',
            image: 'https://www.soliorganic.com/wp-content/uploads/2022/03/6P6A0082.jpg',
            inStock: true,
            keywords: ['basil', 'herbs', 'fresh', 'aromatic', 'cooking']
        },
        {
            id: 6,
            name: 'Organic Spinach',
            description: 'Nutrient-rich organic spinach, great for salads and smoothies.',
            price: 18,
            category: 'vegetables',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D',
            inStock: true,
            keywords: ['spinach', 'organic', 'vegetables', 'nutrient', 'healthy']
        }
    ];

    displayProducts(products);
}

function displayProducts(productsToShow) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productElement = createProductElement(product);
        productGrid.appendChild(productElement);
    });

    // Add animation to products
    const productElements = productGrid.querySelectorAll('.product');
    productElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createProductElement(product) {
    const productDiv = document.createElement('article');
    productDiv.className = 'product';
    productDiv.setAttribute('data-category', product.category);

    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">ZAR ${product.price}/kg</p>
        <div class="product-actions">
            <button class="add-to-cart" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;

    return productDiv;
}

function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// =============================================
// 4. SHOPPING CART
// =============================================
function initializeCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.toggle('open');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showModal('Please add items to your cart before checkout.');
                return;
            }
            
            // Simulate checkout process
            showModal('Thank you for your order! We will contact you soon to arrange delivery.');
            cart = [];
            updateCartDisplay();
        });
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('open');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    showCartAnimation();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>ZAR ${item.price}/kg</p>
                    </div>
                    <div>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function showCartAnimation() {
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.classList.add('pulse');
        setTimeout(() => {
            cartToggle.classList.remove('pulse');
        }, 1000);
    }
}

// =============================================
// 5. SEARCH FUNCTIONALITY
// =============================================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                searchResults.style.display = 'block';
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function loadSearchData() {
    searchData = [
        ...products.map(product => ({
            type: 'product',
            title: product.name,
            description: product.description,
            keywords: product.keywords,
            data: product
        })),
        {
            type: 'page',
            title: 'About Us',
            description: 'Learn about EcoHarvest Farms mission and team',
            keywords: ['about', 'mission', 'team', 'history'],
            section: 'about'
        },
        {
            type: 'page',
            title: 'Sustainability',
            description: 'Our sustainable farming practices',
            keywords: ['sustainability', 'organic', 'environment', 'practices'],
            section: 'sustainability'
        },
        {
            type: 'page',
            title: 'Contact',
            description: 'Get in touch with us',
            keywords: ['contact', 'phone', 'email', 'address'],
            section: 'contact'
        }
    ];
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchResults.style.display = 'none';
        return;
    }

    const results = searchData.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.description.toLowerCase().includes(query) ||
               item.keywords.some(keyword => keyword.toLowerCase().includes(query));
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="handleSearchResultClick('${result.type}', '${result.section || result.data?.id}')">
                <strong>${highlightText(result.title, query)}</strong>
                <p>${highlightText(result.description, query)}</p>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function handleSearchResultClick(type, identifier) {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';

    if (type === 'page') {
        const section = document.getElementById(identifier);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (type === 'product') {
        const productElement = document.querySelector(`[data-product-id="${identifier}"]`);
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth' });
            productElement.classList.add('highlight');
            setTimeout(() => {
                productElement.classList.remove('highlight');
            }, 2000);
        }
    }
}

// =============================================
// 6. ACCORDION FUNCTIONALITY
// =============================================
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;

            // Close all other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion item
            header.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('active');
        });
    });
}

// =============================================
// 7. TABS FUNCTIONALITY
// =============================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// =============================================
// 8. GALLERY & LIGHTBOX
// =============================================
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Store gallery images
    window.galleryImages = Array.from(galleryImages);

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Close lightbox on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    currentImageIndex = index;
    lightboxImage.src = window.galleryImages[index].src;
    lightboxImage.alt = window.galleryImages[index].alt;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + window.galleryImages.length) % window.galleryImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = window.galleryImages[currentImageIndex].src;
    lightboxImage.alt = window.galleryImages[currentImageIndex].alt;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % window.galleryImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = window.galleryImages[currentImageIndex].src;
    lightboxImage.alt = window.galleryImages[currentImageIndex].alt;
}

// =============================================
// 9. FORM VALIDATION & SUBMISSION
// =============================================
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const enquiryForm = document.getElementById('enquiry-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        addRealTimeValidation(contactForm);
    }

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleEnquiryFormSubmit);
        addRealTimeValidation(enquiryForm);
    }
}

function addRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Remove previous validation classes
    formGroup.classList.remove('error', 'success');

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }

    // Minimum length validation
    if (field.hasAttribute('minlength') && field.value.trim()) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (field.value.trim().length < minLength) {
            isValid = false;
            message = `Minimum ${minLength} characters required`;
        }
    }

    // Number validation
    if (field.type === 'number' && field.value.trim()) {
        const min = field.getAttribute('min');
        const max = field.getAttribute('max');
        const value = parseFloat(field.value);
        
        if (min && value < parseFloat(min)) {
            isValid = false;
            message = `Minimum value is ${min}`;
        } else if (max && value > parseFloat(max)) {
            isValid = false;
            message = `Maximum value is ${max}`;
        }
    }

    // Date validation
    if (field.type === 'date' && field.value.trim()) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            message = 'Please select a future date';
        }
    }

    // Update UI based on validation result
    if (isValid) {
        formGroup.classList.add('success');
        errorMessage.textContent = '';
    } else {
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    }

    return isValid;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    showLoadingState(e.target);
    
    setTimeout(() => {
        hideLoadingState(e.target);
        showSuccessModal('Thank you for your message! We will get back to you soon.');
        e.target.reset();
        
        // Remove validation classes
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
        });
    }, 2000);
}

function handleEnquiryFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm(e.target)) {
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Calculate estimated cost and availability
    const product = products.find(p => p.name.toLowerCase().includes(data.productInterest));
    const quantity = parseInt(data.quantity) || 1;
    const estimatedCost = product ? product.price * quantity : 0;

    showLoadingState(e.target);
    
    setTimeout(() => {
        hideLoadingState(e.target);
        
        let responseMessage = `Thank you for your enquiry! `;
        
        if (data.enquiryType === 'product' && product) {
            responseMessage += `Based on your request for ${quantity}kg of ${product.name}, the estimated cost would be ZAR ${estimatedCost.toFixed(2)}. `;
        }
        
        responseMessage += `We will contact you within 24 hours to discuss availability and next steps.`;
        
        showSuccessModal(responseMessage);
        e.target.reset();
        
        // Remove validation classes
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
        });
    }, 2000);
}

function showLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }
}

function hideLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.id === 'contact-form' ? 'Send Message' : 'Submit Enquiry';
    }
}

// =============================================
// 10. MAP INTEGRATION
// =============================================
function initializeMap() {
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.warn('Leaflet library not loaded');
        return;
    }

    const mapContainer = document.getElementById('farm-map');
    if (!mapContainer) return;

    // Stellenbosch coordinates (approximate)
    const farmLocation = [-33.9321, 18.8602];

    try {
        const map = L.map('farm-map').setView(farmLocation, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom marker icon
        const farmIcon = L.divIcon({
            html: '🌱',
            iconSize: [30, 30],
            className: 'custom-div-icon'
        });

        L.marker(farmLocation, { icon: farmIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center;">
                    <strong>EcoHarvest Farms</strong><br>
                    18 Valero Road<br>
                    Stellenbosch, South Africa<br>
                    <a href="tel:+27863456789">+27 86 345 6789</a>
                </div>
            `)
            .openPopup();

        // Add click event to show directions
        map.on('click', function(e) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${farmLocation[0]},${farmLocation[1]}`;
            window.open(url, '_blank');
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = '<p>Map could not be loaded. Please check your internet connection.</p>';
    }
}

// =============================================
// 11. ANIMATIONS & SCROLL EFFECTS
// =============================================
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

function initializeScrollEffects() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product, .practice-item, .event-item');
    animateElements.forEach(el => observer.observe(el));
}

// =============================================
// 12. STATISTICS COUNTER
// =============================================
function initializeStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    // Intersection Observer for statistics
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
}

// =============================================
// 13. EVENTS MANAGEMENT
// =============================================
function initializeEvents() {
    loadEvents();
}

function loadEvents() {
    events = [
        {
            id: 1,
            title: 'Tree Planting Day',
            date: '2025-06-25',
            description: 'Join us for a community tree-planting event. Help us make the planet greener!',
            location: 'EcoHarvest Farms',
            category: 'community'
        },
        {
            id: 2,
            title: 'Organic Farming Workshop',
            date: '2025-07-15',
            description: 'Learn the basics of organic farming and sustainable agriculture practices.',
            location: 'Farm Education Center',
            category: 'education'
        },
        {
            id: 3,
            title: 'Harvest Festival',
            date: '2025-08-20',
            description: 'Celebrate the harvest season with local food, music, and family activities.',
            location: 'EcoHarvest Farms',
            category: 'festival'
        },
        {
            id: 4,
            title: 'Composting Workshop',
            date: '2025-09-10',
            description: 'Learn how to create nutrient-rich compost for your garden.',
            location: 'Farm Education Center',
            category: 'education'
        }
    ];

    displayEvents();
}

function displayEvents() {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    eventsList.innerHTML = events.map(event => `
        <div class="event-item" data-aos="fade-up">
            <div class="event-date">${formatDate(event.date)}</div>
            <h4 class="event-title">${event.title}</h4>
            <p>${event.description}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <button class="cta-button primary" onclick="registerForEvent(${event.id})">
                Register Interest
            </button>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function registerForEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (event) {
        showSuccessModal(`Thank you for your interest in "${event.title}"! We will send you more details closer to the event date.`);
    }
}

// =============================================
// 14. MODAL FUNCTIONALITY
// =============================================
function showModal(message) {
    showSuccessModal(message);
}

function showSuccessModal(message) {
    const modal = document.getElementById('success-modal');
    const messageElement = document.getElementById('success-message');
    const closeButton = modal.querySelector('.modal-close');

    if (messageElement) {
        messageElement.textContent = message;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Close modal events
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Auto close after 5 seconds
    setTimeout(closeModal, 5000);
}

// =============================================
// 15. UTILITY FUNCTIONS
// =============================================
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =============================================
// 16. ERROR HANDLING
// =============================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to an error tracking service
});

// =============================================
// 17. PERFORMANCE OPTIMIZATION
// =============================================
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration (for PWA capabilities)
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

// =============================================
// 18. ACCESSIBILITY ENHANCEMENTS
// =============================================
// Skip to main content
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        // Add focus indicators
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #388E3C';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// =============================================
// 19. EXPORT FUNCTIONS FOR GLOBAL ACCESS
// =============================================
window.EcoHarvest = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    registerForEvent,
    showModal,
    showSuccessModal
};

console.log('EcoHarvest Farms website loaded successfully! 🌱');