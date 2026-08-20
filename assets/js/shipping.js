
const shippingRadios = document.querySelectorAll('input[name="shipping"]');

if (shippingRadios.length) {

    shippingRadios.forEach(radio => {

        radio.addEventListener("change", () => {

            // Shipping fee
            const fee = radio.value === "express" ? 10 : 5;

            // Save shipping fee
            sessionStorage.setItem("shippingFee", fee);

            const cart = getCart();

            const cartTotal = cart.reduce((sum, p) => {
                return sum + Number(p.price) * Number(p.quantity || 1);
            }, 0);

            // Products + Shipping
            const total = cartTotal + fee;

            // Update total price
            const totalPriceEl = document.querySelector(".product-price-total-price");

            if (totalPriceEl) {
                totalPriceEl.textContent = total;
            }
        });

    });
}




document.addEventListener("click", (event) => {

    const isHomeLink = event.target.closest('a[href="../index.html"]');
    const isCheckoutLink = event.target.closest('a[href="checkout.html"]');
    const isCartLink = event.target.closest('a[href$="cart.html"]');

    if (isHomeLink || isCheckoutLink || isCartLink) {
        sessionStorage.removeItem("shippingFee");
    }

});