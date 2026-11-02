
// Get popup elements
const serviceModal = document.getElementById("serviceModal");
const modalServiceTitle = document.getElementById("modalServiceTitle");
const serviceOptions = document.getElementById("serviceOptions");


// All service data
const serviceData = {

    "Dining Table & Chairs Cleaning": {
        options: [
            { name: "Dining Table + Sofa (3 Seater)", price: 250 },
            { name: "Dining Table + Sofa (5 Seater)", price: 399 },
            { name: "Dining Table + Sofa + Mattress", price: 499 }
        ]
    },

    "Living Room Deep Cleaning": {
        options: [
            { name: "Single Living Room Express (only for flat)", price: 1099 },
            { name: "Single Living Room Exclusive (only for flat)", price: 1499 }
        ]
    },

    "Bathroom Deep Cleaning Service": {
        options: [
            { name: "Scrubbing Machine-Based Cleaning", price: 499 },
            { name: "Chemical wash (Manual cleaning)", price: 899 }
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


// Open popup when service card is clicked
document.querySelectorAll(".pick-box").forEach(card => {

    card.addEventListener("click", function () {

        const serviceName = card.querySelector("h4").textContent.trim();

        const service = serviceData[serviceName];

        if (!service) return;

        // Show service name
        modalServiceTitle.textContent = serviceName;

        // Display service options
        serviceOptions.innerHTML = service.options.map(option => `

            <div class="service-option">

                <div class="service-option-info">
                    <h3>${option.name}</h3>
                    <p>₹ ${option.price.toFixed(2)}</p>
                </div>

                <div class="service-option-actions">

                    <button
                        type="button"
                        class="book-service"
                        data-option="${option.name}"
                        data-price="${option.price}">
                        Book Now
                    </button>

                </div>

            </div>

        `).join("");

        // Open popup
        serviceModal.classList.add("show");

    });

});


// Handle Book Now button
serviceOptions.addEventListener("click", function (event) {

    const button = event.target.closest(".book-service");

    if (!button) return;

    // Get selected service details
    const serviceName = modalServiceTitle.textContent;
    const optionName = button.dataset.option;
    const price = button.dataset.price;

    // Create booking page URL
    const bookingURL = new URL("booking.html", window.location.href);

    // Pass selected details
    bookingURL.searchParams.set("service", serviceName);
    bookingURL.searchParams.set("option", optionName);
    bookingURL.searchParams.set("price", price);

    // Open booking page
    window.location.href = bookingURL.toString();

});


// Close popup using close button
document.getElementById("closeServiceModal").addEventListener("click", function () {

    serviceModal.classList.remove("show");

});


// Close popup when clicking outside
serviceModal.addEventListener("click", function (event) {

    if (event.target === serviceModal) {

        serviceModal.classList.remove("show");

    }

});
