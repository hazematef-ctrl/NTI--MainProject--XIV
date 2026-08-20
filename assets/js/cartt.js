// ==========================================
// Cart
// ==========================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================================
// Save Cart
// ==========================================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// ==========================================
// Update Cart Counter
// ==========================================

function updateCartCounter() {

    const cartCounter =
        document.querySelector(".cart-counter");

    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}
updateCartCounter();
