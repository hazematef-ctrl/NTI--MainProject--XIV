// ==========================================
// Products Page
// ==========================================


// ==========================================
// HTML Elements
// ==========================================

const bestSellersGrid =
    document.querySelector("#bestSellersGrid");

const newProductsGrid =
    document.querySelector("#newProductsGrid");

const shirtsGrid =
    document.querySelector("#shirtsGrid");

const tshirtsGrid =
    document.querySelector("#tshirtsGrid");


// ==========================================
// Create Product Card
// ==========================================

function createProductCard(product) {

    const card =
        document.createElement("div");

    card.classList.add("product");

    card.innerHTML = `

        <div class="product-image">

            <img
                src="../${product.image}"
                alt="${product.title}"
            >

        </div>

        <div class="product-info">

            <div>

                <p>
                    ${product.title}
                </p>

                <h5>
                    ${getProductDescription(product)}
                </h5>

            </div>

            <span>
                $${product.price}
            </span>

        </div>

    `;


    // ==========================================
    // Open Product Details
    // ==========================================

    card.addEventListener("click", () => {

        window.location.href =
            `product-details.html?id=${product.id}`;

    });


    return card;
}


// ==========================================
// Product Description
// ==========================================

function getProductDescription(product) {

    if (product.type === "shirt") {

        return "Stylish shirt with a comfortable fit and modern design.";

    }

    if (product.type === "tshirt") {

        return "Comfortable T-shirt designed for everyday wear.";

    }

    if (product.type === "pants") {

        return "Modern pants with a clean design and comfortable fit.";

    }

    return "Stylish piece designed for a modern look.";

}


// ==========================================
// Render Products
// ==========================================

function renderProducts(grid, productsList) {

    if (!grid) return;

    grid.innerHTML = "";

    productsList.forEach(product => {

        const card =
            createProductCard(product);

        grid.appendChild(card);

    });

}


// ==========================================
// Get Products
// ==========================================

const bestSellers =
    products.filter(product =>
        product.isBestSeller
    );


const newProducts =
    products.filter(product =>
        product.isNew
    );


const shirts =
    products.filter(product =>
        product.type === "shirt"
    );


const tshirts =
    products.filter(product =>
        product.type === "tshirt"
    );


// ==========================================
// Initial Render
// ==========================================

renderProducts(
    bestSellersGrid,
    bestSellers
);

renderProducts(
    newProductsGrid,
    newProducts
);

renderProducts(
    shirtsGrid,
    shirts
);

renderProducts(
    tshirtsGrid,
    tshirts
);