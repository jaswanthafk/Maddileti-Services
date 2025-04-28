// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-item, .menu-category h3, .menu-section h2, header .logo, header h1, .cta-button').forEach(element => {
    observer.observe(element);
});

// Cart functionality
const cart = {};
const cartItemsContainer = document.getElementById('cart-items');
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.querySelector('.close-cart');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    for (const category in cart) {
        const item = cart[category];
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item}</span>
            <button onclick="removeFromCart('${category}')">Remove / తొలగించు</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateButtonStates();
}

function addToCart(category, item) {
    cart[category] = item;
    updateCart();
}

function removeFromCart(category) {
    delete cart[category];
    updateCart();
}

function updateButtonStates() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const category = button.closest('.menu-category').dataset.category;
        const item = button.dataset.item;
        if (cart[category] === item) {
            button.classList.add('disabled');
            button.disabled = true;
        } else if (cart[category]) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.classList.remove('disabled');
            button.disabled = false;
        }
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.closest('.menu-category').dataset.category;
        const item = button.dataset.item;
        addToCart(category, item);
        cartSidebar.classList.add('active');
    });
});

// Toggle cart sidebar
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Load cart from localStorage
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        Object.assign(cart, JSON.parse(savedCart));
    }
    updateCart();
});