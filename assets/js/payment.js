var payment = document.getElementsByName("payment");
var card = document.querySelectorAll(".card-number, .card-owner-name, .expiry-date, .cvv");

for (var i = 0; i < card.length; i++) {
    card[i].parentElement.style.display = "none";
    card[i].required = false;
}

payment[0].onclick = function () {
    for (var i = 0; i < card.length; i++) {
        card[i].parentElement.style.display = "block";
        card[i].required = true;
    }
};

payment[1].onclick = function () {
    for (var i = 0; i < card.length; i++) {
        card[i].parentElement.style.display = "none";
        card[i].required = false;
    }
};



window.addEventListener("load", () => {

    const fee = Number(sessionStorage.getItem("shippingFee")) || 0;

    if (fee > 0) {
        const cart = getCart(); // من cart.js المتحمل في payment.html
        const cartTotal = cart.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity || 1), 0);

        const totalPriceEl = document.querySelector(".product-price-total-price");
        if (totalPriceEl) {
            totalPriceEl.textContent = cartTotal + fee;
        }
    }

});



document.addEventListener("click", (event) => {

    const isHomeLink = event.target.closest('a[href="../index.html"]');
    const isCheckoutLink = event.target.closest('a[href="checkout.html"]');
    const isCartLink = event.target.closest('a[href$="cart.html"]');

    if (isHomeLink || isCheckoutLink || isCartLink) {
        sessionStorage.removeItem("shippingFee");
    }

});

document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", () => {
        sessionStorage.setItem("paymentMethod", radio.value);
    });
});