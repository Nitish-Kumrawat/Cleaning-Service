
const cartContainer = document.getElementById("cart-container");

const CART_KEY = "cleanCareCart";

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    if (!Array.isArray(cart)) {
        cart = [];
    }
} catch (error) {
    cart = [];
}


function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Display cart
function displayCart() {
    // Empty cart
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any services yet.</p>
                <a href="index.html" class="browse-btn">
                    Browse Services
                </a>
            </div>
        `;
        return;
    }

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Display services and order summary
    cartContainer.innerHTML = `
        <div class="cart-layout">

            <section class="cart-items">
                <br>
                ${cart.map(item => `
                    <article class="cart-item">
                        <div class="service-icon">
                            <i class="fa-solid ${item.icon}"></i>
                        </div>

                        <div class="service-details">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <strong>₹${item.price.toLocaleString("en-IN")}</strong>

                            <div class="quantity-control">
                                <button data-action="decrease"
                                    data-id="${item.id}"
                                    aria-label="Decrease quantity">−</button>

                                <span>${item.quantity}</span>

                                <button data-action="increase"
                                    data-id="${item.id}"
                                    aria-label="Increase quantity">+</button>
                            </div>
                        </div>

                        <button class="remove-item"
                            data-action="remove"
                            data-id="${item.id}"
                            aria-label="Remove ${item.name}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </article>
                `).join("")}

            </section>

            <aside class="order-summary">
                <h2>Order Summary</h2>

                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₹${subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div class="summary-row">
                    <span>Service Charge</span>
                    <span>₹0</span>
                </div>

                <hr>

                <div class="summary-row total-row">
                    <strong>Total</strong>
                    <strong>₹${subtotal.toLocaleString("en-IN")}</strong>
                </div>

                <button class="checkout-btn" data-action="checkout">
                    Proceed to Checkout
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

                <p class="payment-note">
                    <i class="fa-solid fa-money-bill-wave"></i>
                    Payment: Cash on Service
                </p>
            </aside>

        </div>
    `;
}

// Handle cart button clicks
cartContainer.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "remove") {
        cart = cart.filter(item => String(item.id) !== id);
    }

    if (action === "increase") {
        const item = cart.find(item => String(item.id) === id);

        if (item && item.quantity < 5) {
            item.quantity++;
        }
    }

    if (action === "decrease") {
        const item = cart.find(item => String(item.id) === id);

        if (item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(item => String(item.id) !== id);
            }
        }
    }

    if (action === "checkout") {
        alert("Checkout will be implemented next. Payment method: Cash on Service.");
        return;
    }

    saveCart();
    displayCart();
});

// Initialize cart
displayCart();
