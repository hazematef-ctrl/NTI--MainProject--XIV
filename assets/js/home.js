

// ==========================================
// Section - 1
// Hero Slides
// ==========================================

const slides = [
    [products[0], products[1]],
    [products[2], products[3]],
    [products[4], products[5]],
    [products[6], products[7]],
    [products[8], products[9]]
];

let currentSlide = 0;


// ==========================================
// Hero Elements
// ==========================================

const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const slider = document.querySelector("#images-slider")

// ==========================================
// Update Product Card
// ==========================================
function changeImage(image, newSrc) {

    image.src = newSrc;
}


function updateProductCard(image, product) {
    changeImage(image, product.image);
}


// ==========================================
// Show Slide
// ==========================================

function showSlide(index) {
    const product1 = slides[index][0];
    const product2 = slides[index][1];

    // Update cards
    updateProductCard(image1, product1);
    updateProductCard(image2, product2);
}
// ==========================================
// Next Button
// ==========================================

nextBtn.addEventListener("click", () => {


    slider.style.transform = "translateX(20px)";

    setTimeout(() => {
        slider.style.transform = "translateX(0)";
    }, 400);
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

});


// ==========================================
// Previous Button
// ==========================================

prevBtn.addEventListener("click", () => {

    slider.style.transform = "translateX(-20px)";
    setTimeout(() => {
        slider.style.transform = "translateX(0)";
    }, 400);

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

});


// ==========================================
// Initial Slide
// ==========================================

showSlide(currentSlide);


// ==========================================
// End Of Section - 1
// ==========================================


// ==========================================
// Section - 2
// New This Week
// ==========================================

const newProducts = products.filter(product => product.isNew);

const productsTrack =
    document.querySelector("#productsTrack");

const newProductsCount =
    document.querySelector("#newProductsCount");

const productsPrevBtn =
    document.querySelector("#productsPrevBtn");

const productsNextBtn =
    document.querySelector("#productsNextBtn");


// ==========================================
// Products State
// ==========================================

let currentProductIndex = 0;


// ==========================================
// Products Count 
// ==========================================

newProductsCount.textContent =
    `(${newProducts.length})`;


// ==========================================
// Create Product Card
// ==========================================

function createNewProductCard(product) {

    const card = document.createElement("article");

    card.classList.add("new-product-card");

    card.innerHTML = `

        <div class="new-product-image-wrapper">

            ${product.isNew
            ? `<span class="new-product-badge">NEW</span>`
            : ""
        }

            <img
                src="${product.image}"
                alt="${product.title}"
                class="new-product-image"
            >

            <button class="new-product-add">
                +
            </button>

        </div>

        <div class="new-product-info">

            <p class="new-product-category">
                ${product.category}
            </p>

            <div class="new-product-bottom">

                <h3 class="new-product-title">
                    ${product.title}
                </h3>

                <p class="new-product-price">
                    $${product.price}
                </p>

            </div>

        </div>
    `;

    card.addEventListener("click", (event) => {
        if (event.target.closest(".new-product-add")) {
            event.stopPropagation();
            return;
        }

        window.location.href = `./pages/product-details.html?id=${product.id}`;
    });
    const addBtn = card.querySelector(".new-product-add");

    addBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        cart.push(product);

        saveCart();

        updateCartCounter();

        console.log(cart);
    });


    return card;
}


// ==========================================
// Render Products
// ==========================================

function renderNewProducts() {

    productsTrack.innerHTML = "";

    newProducts.forEach(product => {

        const card =
            createNewProductCard(product);

        productsTrack.appendChild(card);

    });
}


// ==========================================
// Get Slider Information
// ==========================================

function getSliderInfo() {

    const cards =
        productsTrack.querySelectorAll(
            ".new-product-card"
        );

    if (!cards.length) {
        return null;
    }

    const firstCard = cards[0];

    const cardWidth =
        firstCard.offsetWidth;

    const gap =
        parseFloat(
            getComputedStyle(productsTrack).gap
        ) || 0;

    const moveDistance =
        cardWidth + gap;

    const viewport =
        document.querySelector(
            ".products-viewport"
        );

    const viewportWidth =
        viewport.offsetWidth;

    // Number of cards that can fit
    const visibleCards =
        Math.floor(
            (viewportWidth + gap) /
            moveDistance
        );

    // Maximum position we can move to
    const maxIndex =
        Math.max(
            0,
            cards.length - visibleCards
        );

    return {
        moveDistance,
        visibleCards,
        maxIndex
    };
}


// ==========================================
// Update Slider
// ==========================================

function updateProductsSlider() {

    const sliderInfo =
        getSliderInfo();

    if (!sliderInfo) return;

    const {
        moveDistance,
        maxIndex
    } = sliderInfo;


    // Make sure index is valid
    currentProductIndex =
        Math.min(
            currentProductIndex,
            maxIndex
        );


    // Move Track
    productsTrack.style.transform =
        `translateX(-${currentProductIndex *
        moveDistance
        }px)`;


    updateProductsButtons();
}


// ==========================================
// Update Buttons
// ==========================================

function updateProductsButtons() {

    const sliderInfo =
        getSliderInfo();

    if (!sliderInfo) return;


    const {
        maxIndex
    } = sliderInfo;


    // Previous
    productsPrevBtn.disabled =
        currentProductIndex <= 0;


    // Next
    productsNextBtn.disabled =
        currentProductIndex >= maxIndex;
}


// ==========================================
// Next Button
// ==========================================

productsNextBtn.addEventListener(
    "click",
    () => {

        const sliderInfo =
            getSliderInfo();

        if (!sliderInfo) return;


        if (
            currentProductIndex >=
            sliderInfo.maxIndex
        ) {
            return;
        }


        currentProductIndex++;

        updateProductsSlider();

    }
);


// ==========================================
// Previous Button
// ==========================================

productsPrevBtn.addEventListener(
    "click",
    () => {

        if (currentProductIndex <= 0) {
            return;
        }


        currentProductIndex--;

        updateProductsSlider();

    }
);


// ==========================================
// Initial Render
// ==========================================

renderNewProducts();

updateProductsSlider();


// ==========================================
// Responsive
// ==========================================

window.addEventListener(
    "resize",
    () => {

        updateProductsSlider();

    }
);
// ==========================================
// Section - 3
// Collections
// ==========================================

const collectionGrid =
    document.querySelector("#collectionGrid");

const loadMoreBtn =
    document.querySelector("#loadMoreBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const sortButtons =
    document.querySelectorAll("[data-sort]");


// ==========================================
// State
// ==========================================

let activeCategory = "all";

let activeSort = null;

let visibleProducts = 6;

const productsPerLoad = 3;


// ==========================================
// Get Filtered Products
// ==========================================

function getFilteredProducts() {

    let result = [...products];


    // Category
    if (activeCategory !== "all") {

        result = result.filter(product =>
            product.category === activeCategory
        );

    }


    // Sort
    if (activeSort === "low") {

        result.sort((a, b) =>
            a.price - b.price
        );

    }

    if (activeSort === "high") {

        result.sort((a, b) =>
            b.price - a.price
        );

    }


    return result;
}


// ==========================================
// Create Collection Card
// ==========================================

function createCollectionCard(product) {

    const card =
        document.createElement("article");

    card.classList.add("collection-card");


    card.innerHTML = `

        <div class="collection-image-wrapper">

            ${product.isNew
            ? `
                        <span class="collection-new">
                            NEW
                        </span>
                    `
            : ""
        }


            <img
                src="${product.image}"
                alt="${product.title}"
                class="collection-image"
            >


            <button
                class="collection-add"
                aria-label="Add ${product.title}">

                <i class="bi bi-plus-lg"></i>

            </button>

        </div>


        <div class="collection-info">

            <p class="collection-type">
                ${product.category}
            </p>


            <div class="collection-bottom">

                <h3 class="collection-title">
                    ${product.title}
                </h3>

                <p class="collection-price">
                    $${product.price}
                </p>

            </div>

        </div>

    `;

    card.addEventListener("click", (event) => {
        if (event.target.closest(".collection-add")) {
            event.stopPropagation();
            return;
        }
        window.location.href = `./pages/product-details.html?id=${product.id}`;
    });

    const addBtn = card.querySelector(".collection-add");

    addBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        cart.push(product);

        saveCart();

        updateCartCounter();

        console.log(cart);
    });

    return card;
}


// ==========================================
// Render Collection
// ==========================================

function renderCollection() {

    const filteredProducts =
        getFilteredProducts();


    collectionGrid.innerHTML = "";


    const productsToShow =
        filteredProducts.slice(
            0,
            visibleProducts
        );


    productsToShow.forEach(product => {

        const card =
            createCollectionCard(product);

        collectionGrid.appendChild(card);

    });


    updateLoadMoreButton(
        filteredProducts.length
    );
}


// ==========================================
// Load More Button
// ==========================================

function updateLoadMoreButton(totalProducts) {

    if (visibleProducts >= totalProducts) {

        loadMoreBtn.style.display = "none";

        return;
    }


    loadMoreBtn.style.display = "flex";
}


loadMoreBtn.addEventListener("click", () => {

    visibleProducts += productsPerLoad;

    renderCollection();

});


// ==========================================
// Category Filter
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory =
            button.dataset.category;


        // Reset pagination
        visibleProducts = 6;


        // Active state
        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        renderCollection();

    });

});


// ==========================================
// Sorting
// ==========================================

sortButtons.forEach(button => {

    button.addEventListener("click", () => {

        activeSort =
            button.dataset.sort;


        visibleProducts = 6;


        renderCollection();

    });

});


// ==========================================
// Initial Render
// ==========================================

renderCollection();


// ==========================================
// End Of Section - 3
// ==========================================



