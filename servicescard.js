const serviceModal = document.getElementById("serviceModal");
const modalServiceTitle = document.getElementById("modalServiceTitle");
const serviceOptions = document.getElementById("serviceOptions");

const serviceData = {
    "Dining Table & Chairs Cleaning": {
        options: [
            { name: "Dining Table + Sofa (3 Seater)", price: 250 },
            { name: "Dining Table + Sofa (5 Seater)", price: 399 },
            { name: "Dining Table + Sofa + Mattress ", price: 499 }
        ]
    },

    "Living Room Deep Cleaning": {
        options: [
            { name: "Single Living Room Express (only for flat)", price: 1099 },
            { name: "Single Living Room Exclusive (only for flat)", price: 1499 },
        ]
    },

    "Bathroom Deep Cleaning Service": {
        options: [
            { name: "Scrubbing Machine-Based Cleaning", price: 499 },
            { name: "Chemical wash (Manual cleaning )", price: 899 },
        ]
    },

    "Kitchen Deep Cleaning Service": {
        options: [
            { name: "Only trolley & cabinets cleaning", price: 1249 },
            { name: "Full Occupied Kitchen Deep Cleaning without chimney", price: 1599 },
            { name: "Full Occupied Kitchen Deep Cleaning With Chimney", price: 1999 }
        ]
    }
};

// Open popup when a service card is clicked
document.querySelectorAll(".pick-box").forEach(card => {
    card.addEventListener("click", () => {
        const serviceName = card.querySelector("h4").textContent.trim();
        const service = serviceData[serviceName];

        if (!service) return;

        modalServiceTitle.textContent = serviceName;

        serviceOptions.innerHTML = service.options.map(option => `
            <div class="service-option">
                <div class="service-option-info">
                    <h3>${option.name}</h3>
                    <p>₹ ${option.price.toFixed(2)}</p>
                </div>

                <div class="service-option-actions">
                    <button type="button" class="add-service">Add</button>
                </div>
            </div>
        `).join("");

        serviceModal.classList.add("show");
    });
});

// Close popup
document.getElementById("closeServiceModal").addEventListener("click", () => {
    serviceModal.classList.remove("show");
});

// Close when clicking outside the popup
serviceModal.addEventListener("click", event => {
    if (event.target === serviceModal) {
        serviceModal.classList.remove("show");
    }
});

let selopt = null;
let selquant = 1;


serviceOptions.addEventListener("click", function (event) {
    const btn = event.target.closest("button");

    if (!btn) return;

    const optcard = btn.closest(".service-option");

    if (!optcard) return;

    // Add button
    if (btn.classList.contains("add-service")) {
        const serviceName = modalServiceTitle.textContent;
        const optionName = optcard.querySelector("h3").textContent;

        selopt = serviceData[serviceName].options.find(
            option => option.name === optionName
        );

        selquant = 1;

        optcard.querySelector(".service-option-actions").innerHTML = `
            <div class="quantity-controls">
                <button type="button" class="decrease-qty">−</button>
                <span class="quantity-value">1</span>
                <button type="button" class="increase-qty">+</button>
                <button type="button" class="done-service">Done</button>
            </div>
        `;
        return;
    }

    // Find this option's quantity
    const quantityValue = optcard.querySelector(".quantity-value");

    if (!quantityValue) return;

    let quantity = Number(quantityValue.textContent);

    // Increase
    if (btn.classList.contains("increase-qty")) {
        if(quantity < 5) {
            quantity++;
        }

        if(quantity === 5) {
            optcard.querySelector(".service-option-actions").innerHTML = `
            <div class="quantity-controls">
                <button type="button" class="decrease-qty">−</button>
                <span class="quantity-value">5</span>
                <button type="button" class="increase-qty">Max</button>
                <button type="button" class="done-service">Done</button>
            </div>
        `;
            return;
        }

    }

    // Decrease
    if (btn.classList.contains("decrease-qty")) {
        quantity--;

        if (quantity === 0) {
            optcard.querySelector(".service-option-actions").innerHTML = `
            <button type="button" class="add-service">Add</button>
        `;
            return;
        }
    }

    quantityValue.textContent = quantity;

    // Done
    if (btn.classList.contains("done-service")) {
        if (btn.classList.contains("done-service")) {
            const cartKey = "cleanCareCart";
            const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

            const serviceName = modalServiceTitle.textContent;
            const optionName = optcard.querySelector("h3").textContent;

            const itemName = `${serviceName} - ${optionName}`;

            const existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: Date.now(),
                    name: itemName,
                    description: serviceName,
                    price: selopt.price,
                    quantity: quantity,
                    icon: "fa-broom"
                });
            }

            localStorage.setItem(cartKey, JSON.stringify(cart));

            serviceModal.classList.remove("show");
        }
    }
});

