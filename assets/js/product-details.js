// ==========================================
// Get Product ID From URL
// ==========================================

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));


// ==========================================
// Find Product
// ==========================================

const product = products.find(product => product.id === productId);


// ==========================================
// HTML Elements
// ==========================================

const productImage =
    document.querySelector("#productImage");

const productCategory =
    document.querySelector("#productCategory");

const productName =
    document.querySelector("#productName");

const productPrice =
    document.querySelector("#productPrice");

const productDescription =
    document.querySelector("#productDescription");

const breadcrumbName =
    document.querySelector("#breadcrumbName");


// ==========================================
// Display Product
// ==========================================

function displayProduct() {

    // Product not found
    if (!product) {

        productName.textContent = "Product Not Found";

        return;
    }


    // ==========================================
    // Image
    // ==========================================

    productImage.src = `../${product.image}`;

    productImage.alt = product.title;


    // ==========================================
    // Category
    // ==========================================

    productCategory.textContent =
        product.category;


    // ==========================================
    // Name
    // ==========================================

    productName.textContent =
        product.title;


    // ==========================================
    // Price
    // ==========================================

    productPrice.textContent =
        `$${product.price}`;


    // ==========================================
    // Breadcrumb
    // ==========================================

    breadcrumbName.textContent =
        product.title;


    // ==========================================
    // Description
    // ==========================================

    productDescription.textContent =
        `Discover our ${product.title}. A stylish piece designed for a modern look.`;

}
// ==========================================
// Add To Cart
// ==========================================

const addCartBtn =
    document.querySelector("#addCart");

addCartBtn.addEventListener("click", () => {

    if (!product) {
        return;
    }

    cart.push(product);

    saveCart();

    updateCartCounter();

    console.log(cart);
});


// ==========================================
// Initial Render
// ==========================================

displayProduct();