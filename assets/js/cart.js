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
const isCartPage = window.location.pathname.includes("cart.html");
    
function createCartItem(item) {

    
    const wrapper = document.createElement("div");
    wrapper.classList.add("product");

    wrapper.innerHTML = `
                    <div class="product-properities">
                        <img class="product-image" src="../${item.image}" alt="productname">
                        <div class="product-name"><p class="name">${item.title}</p>
                            <p class="type">${item.category}</p>
                        </div>
                        <div class="add-button">
                            <a href="#">
                                <button class="negative">-</button>
                            </a>
                            
                            <span class="quantity">${item.qty}</span>
                            <a href="#">
                                <button class="positive">+</button>
                            </a>
                        </div>
                        <div class="price"> <span class="dollar">$ </span><span class="product-price">${item.price * item.qty}</span></div>
                        
                        <div class="×-class">
                            <a href="#">
                                <button class="×-button">×</button>
                                
                            </a>
                        </div>
                        
                    </div>

    `;
    if (isCartPage)
    {
        wrapper.innerHTML += `
                    <div class ="size-size-word"> 
                        SIZE
                     </div>
                    <div class="size-buttons">

                        <input type="radio" name="size-${item.id}" id="xs-${item.id}" value="XS">
                        <label for="xs-${item.id}">XS</label>

                        <input type="radio" name="size-${item.id}" id="s-${item.id}" value="S">
                        <label for="s-${item.id}">S</label>

                        <input type="radio" name="size-${item.id}" id="m-${item.id}" value="M">
                        <label for="m-${item.id}">M</label>

                        <input type="radio" name="size-${item.id}" id="l-${item.id}" value="L">
                        <label for="l-${item.id}">L</label>

                        <input type="radio" name="size-${item.id}" id="xl-${item.id}" value="XL">
                        <label for="xl-${item.id}">XL</label>

                        <input type="radio" name="size-${item.id}" id="2x-${item.id}" value="2X">
                        <label for="2x-${item.id}">2X</label>
                    </div>
                    <hr class="productshr">



    `;
    wrapper.querySelectorAll(`input[name="size-${item.id}"]`).forEach(radio => 
        {
        radio.onclick = function () {
            localStorage.setItem(`size-${item.id}`, this.value);
        };

    });
    }
    
    if (!isCartPage)
    {
    const size = localStorage.getItem(`size-${item.id}`) || "";

        
         wrapper.innerHTML += `
             <div class="selected-size">
                    <p class="size-size"> Size: ${size} </p>
             </div>
            <hr class="productshr">

    `;
    }
    wrapper.querySelector(".positive").addEventListener("click", (e) => {
        e.preventDefault();
        let cartData = getCart();
        const newItem = { ...item };
        delete newItem.qty;
        cartData.push(newItem);
        saveCartData(cartData);
        renderCartPage();
    });

    wrapper.querySelector(".negative").addEventListener("click", (e) => {
        e.preventDefault();
        let cartData = getCart();
        const index = cartData.findIndex(p => p.id === item.id);
        if (index !== -1) {
            cartData.splice(index, 1);
            saveCartData(cartData);
            renderCartPage();
        }
    });

    wrapper.querySelector(".×-button").addEventListener("click", (e) => {
        e.preventDefault();
        let cartData = getCart().filter(p => p.id !== item.id);
        saveCartData(cartData);
        renderCartPage();
    });

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

document.addEventListener("DOMContentLoaded", renderCartPage);
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCounterEl = document.querySelector(".cart-counter");
        if (cartCounterEl) cartCounterEl.textContent = cart.length;
    }
});
const emptycart = "emptycart.html"; 
document.addEventListener("click", (event) => {
    const cartLink = event.target.closest('a[href$="cart.html"]');
    if (!cartLink) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        event.preventDefault();
        const href = cartLink.getAttribute("href");
        window.location.href = href.replace(/cart\.html$/, emptycart);
    }
});
