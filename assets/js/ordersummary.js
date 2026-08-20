// ==========================================
// Cart Page Logic
// ==========================================

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartData(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData));
}

function groupCart(cartData) {
    const grouped = [];

    cartData.forEach(product => {
        const existing = grouped.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            grouped.push({ ...product, qty: 1 });
        }
    });

    return grouped;
}

function createCartItem(item) {

    const wrapper = document.createElement("div");
    wrapper.classList.add("product");
    const size = localStorage.getItem(`size-${item.id}`) || "";

        
        
    wrapper.innerHTML = `
                    <div class="product-properities">
                        <img class="product-image" src="../${item.image}" alt="productname">
                        <div class="product-name"><p class="name">${item.title}</p>
                            <p class="type">${item.category}</p>
                        </div>
                        <div class="add-button">
                            <span class="quantity">${item.qty}</span>
                            
                        </div>
                        <div class="price"> <span class="dollar">$ </span><span class="product-price">${item.price * item.qty}</span></div>
                        
                    </div>
                          
                    
    `;
     wrapper.innerHTML += `
             <div class="selected-size">
                    <p class="size-size"> Size: ${size} </p>
             </div>
            <hr class="productshr">

    `;
   

    return wrapper;
}

function renderCartPage() {

    const cartData = getCart();
    const cartCounterEl = document.querySelector(".cart-counter");
    if (cartCounterEl) cartCounterEl.textContent = cartData.length;

    const productsContainer = document.querySelector(".products");
    if (!productsContainer) return;

    const totalPriceEl = document.querySelector(".product-price-total-price");
    const numEl = document.querySelector(".num");
    const itemsEl = document.querySelector(".items");

    const grouped = groupCart(cartData);

    productsContainer.querySelectorAll(".product").forEach(el => el.remove());

    grouped.forEach(item => {
        productsContainer.appendChild(createCartItem(item));
    });

    const total = cartData.reduce((sum, p) => sum + p.price, 0);
    if (totalPriceEl) totalPriceEl.textContent = total;

    if (numEl) numEl.textContent = cartData.length;
    if (itemsEl) itemsEl.textContent = cartData.length === 1 ? "item" : "items";
}

document.addEventListener("DOMContentLoaded", () => {
    renderCartPage();

    // Apply saved shipping fee to total (if any)
    const fee = Number(sessionStorage.getItem("shippingFee")) || 0;
    if (fee > 0) {
        const totalPriceEl = document.querySelector(".product-price-total-price");
        if (totalPriceEl) {
            const currentTotal = Number(totalPriceEl.textContent) || 0;
            totalPriceEl.textContent = currentTotal + fee;
        }
    }

    const doneBtn = document.querySelector(".done");
    if (doneBtn) {
        doneBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
        });
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

const payment = sessionStorage.getItem("paymentMethod");

document.querySelector("#paymentMethod").textContent = payment;