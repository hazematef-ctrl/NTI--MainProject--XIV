(function initCartFromStorage() {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    if (typeof cart !== "undefined") {
        saved.forEach(item => cart.push(item));
        if (typeof updateCartCounter === "function") {
            updateCartCounter();
        }
    }
})();

function persistCart() {
    if (typeof cart !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

document.addEventListener("click", (event) => {
    const isAddButton =
        event.target.closest(".new-product-add") ||
        event.target.closest(".collection-add");

    if (isAddButton) {
        setTimeout(persistCart, 50);
    }
});

