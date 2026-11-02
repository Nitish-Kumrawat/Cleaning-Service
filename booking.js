// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Get selected service details
const serviceName = params.get("service");
const serviceOption = params.get("option");
const servicePrice = params.get("price");

// Fill service details automatically
document.getElementById("serviceName").value = serviceName || "";
document.getElementById("serviceOption").value = serviceOption || "";
document.getElementById("servicePrice").value =
    servicePrice ? `₹ ${servicePrice}` : "";


// Set minimum booking date to today
const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

document.getElementById("bookingDate").min = localDate;


// Handle form submission
document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;

    // Check selected service details
    if (!serviceName || !serviceOption || !servicePrice) {
        alert("Please select a service first.");
        return;
    }

    // Create WhatsApp message
    const message = `
Hello CleanCare! I want to book a cleaning service.

Service: ${serviceName}
Option: ${serviceOption}
Price: ₹${servicePrice}

Customer Name: ${customerName}
Mobile Number: ${mobile}
Address: ${address}
Booking Date: ${bookingDate}
Preferred Time: ${bookingTime}
    `;

    // Replace with your business WhatsApp number
    const whatsappNumber = "91XXXXXXXXXX";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

});