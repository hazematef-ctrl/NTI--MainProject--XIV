// ==========================================
// Dynamic Products & Sidebar Filters Controller
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Elements Selection
    const productsContainer = document.querySelector("#productsContainer");
    const noProductsText = document.querySelector("#noProducts");
    const searchInput = document.querySelector("#productSearch");
    
    // Top Categories & Clear Button
    const categoryButtons = document.querySelectorAll(".categories button");
    const clearFiltersBtn = document.querySelector("#clearFilters");

    // Sidebar Elements
    const sizeButtons = document.querySelectorAll(".sizes .size-btn");
    const availableFilter = document.querySelector("#availableFilter");
    const outOfStockFilter = document.querySelector("#outOfStockFilter");
    
    // Sidebar Dropdown Buttons
    const categoryFilterBtns = document.querySelectorAll("#categoryFilter button");
    const colorFilterBtns = document.querySelectorAll("#colorFilter button");
    const priceFilterBtns = document.querySelectorAll("#priceFilter button");
    const collectionFilterBtns = document.querySelectorAll("#collectionFilter button");
    const tagFilterBtns = document.querySelectorAll("#tagFilter button");
    const ratingFilterBtns = document.querySelectorAll("#ratingFilter button");

    // Collapsible Dropdown Toggles in Sidebar
    const filterOptions = document.querySelectorAll(".filter-option");

    // 2. State Management for Active Filters
    let activeFilters = {
        search: "",
        size: null,
        availability: null, // 'available' or 'outOfStock'
        category: null,
        color: null,
        priceMin: 0,
        priceMax: Infinity,
        collection: null,
        tag: null,
        rating: null
    };

    // Toggle Dropdown Menus in Sidebar
    filterOptions.forEach(button => {
        button.addEventListener("click", () => {
            const filterType = button.getAttribute("data-filter");
            const dropdown = document.querySelector(`#${filterType}Filter`);
            const icon = button.querySelector("i");

            if (dropdown) {
                const isHidden = dropdown.style.display === "none" || dropdown.style.display === "";
                dropdown.style.display = isHidden ? "flex" : "none";
                if (icon) {
                    icon.className = isHidden ? "bi bi-chevron-down" : "bi bi-chevron-right";
                }
            }
        });
    });

    // Hide dropdowns initially for a cleaner look
    document.querySelectorAll(".filter-dropdown").forEach(el => el.style.display = "none");

    // 3. Dynamic Description Generator
    function getProductDescription(product) {
        if (product.type === "shirt") return "Stylish shirt with a comfortable fit.";
        if (product.type === "tshirt") return "Comfortable T-shirt for everyday wear.";
        if (product.type === "pants") return "Modern pants with a clean design.";
        return "Stylish piece designed for a modern look.";
    }

    // 4. Create Product Card Component
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <div class="product-image">
                <img src="../${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <div>
                    <p>${product.title}</p>
                    <h5>${getProductDescription(product)}</h5>
                </div>
                <span>$${product.price}</span>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `product-details.html?id=${product.id}`;
        });

        return card;
    }

    // 5. Main Render Function
    function renderProducts(items) {
        if (!productsContainer) return;

        productsContainer.innerHTML = "";

        if (items.length === 0) {
            if (noProductsText) noProductsText.classList.remove("d-none");
            return;
        }

        if (noProductsText) noProductsText.classList.add("d-none");

        items.forEach(product => {
            const card = createProductCard(product);
            productsContainer.appendChild(card);
        });
    }

    // 6. Filtering Engine (Applies ALL active filters together)
    function applyFilters() {
        let result = products.filter(product => {
            // Search Filter
            if (activeFilters.search) {
                const query = activeFilters.search.toLowerCase();
                const titleMatch = product.title && product.title.toLowerCase().includes(query);
                const typeMatch = product.type && product.type.toLowerCase().includes(query);
                const categoryMatch = product.category && product.category.toLowerCase().includes(query);
                if (!titleMatch && !typeMatch && !categoryMatch) return false;
            }

            // Size Filter
            if (activeFilters.size) {
                if (!product.sizes || !product.sizes.includes(activeFilters.size)) {
                    // Fallback: If no sizes array in object, allow it by default so products don't completely vanish
                    if (product.sizes) return false;
                }
            }

            // Availability Filter
            if (activeFilters.availability === "available" && product.inStock === false) return false;
            if (activeFilters.availability === "outOfStock" && product.inStock !== false) return false;

            // Category Filter
            if (activeFilters.category) {
                const targetCat = activeFilters.category.toLowerCase();
                const pCat = (product.category || "").toLowerCase();
                const pType = (product.type || "").toLowerCase();
                if (pCat !== targetCat && pType !== targetCat) return false;
            }

            // Color Filter
            if (activeFilters.color) {
                if (product.color && product.color.toLowerCase() !== activeFilters.color.toLowerCase()) return false;
            }

            // Price Range Filter
            if (product.price < activeFilters.priceMin || product.price > activeFilters.priceMax) {
                return false;
            }

            // Collection Filter
            if (activeFilters.collection === "New" && !product.isNew) return false;
            if (activeFilters.collection === "Best Sellers" && !product.isBestSeller) return false;

            // Tag Filter
            if (activeFilters.tag) {
                if (!product.tags || !product.tags.includes(activeFilters.tag.toLowerCase())) {
                    if (product.tags) return false;
                }
            }

            // Rating Filter
            if (activeFilters.rating) {
                if (product.rating && product.rating < activeFilters.rating) return false;
            }

            return true;
        });

        renderProducts(result);
        updateAvailabilityCounts();
    }

    // 7. Dynamic Counts Update (Available vs Out of Stock)
    function updateAvailabilityCounts() {
        const availableCount = document.querySelector("#availableCount");
        const outOfStockCount = document.querySelector("#outOfStockCount");

        if (availableCount) {
            const count = products.filter(p => p.inStock !== false).length;
            availableCount.textContent = `(${count})`;
        }
        if (outOfStockCount) {
            const count = products.filter(p => p.inStock === false).length;
            outOfStockCount.textContent = `(${count})`;
        }
    }

    // 8. Event Listeners for Filters

    // Search Input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            activeFilters.search = e.target.value.trim();
            applyFilters();
        });
    }

    // Sizes Buttons
    sizeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const size = btn.getAttribute("data-size");
            if (activeFilters.size === size) {
                activeFilters.size = null;
                btn.style.background = "transparent";
                btn.style.color = "#000";
            } else {
                sizeButtons.forEach(b => {
                    b.style.background = "transparent";
                    b.style.color = "#000";
                });
                activeFilters.size = size;
                btn.style.background = "#000";
                btn.style.color = "#fff";
            }
            applyFilters();
        });
    });

    // Checkboxes (Availability)
    if (availableFilter) {
        availableFilter.addEventListener("change", () => {
            if (availableFilter.checked) {
                if (outOfStockFilter) outOfStockFilter.checked = false;
                activeFilters.availability = "available";
            } else {
                activeFilters.availability = null;
            }
            applyFilters();
        });
    }

    if (outOfStockFilter) {
        outOfStockFilter.addEventListener("change", () => {
            if (outOfStockFilter.checked) {
                if (availableFilter) availableFilter.checked = false;
                activeFilters.availability = "outOfStock";
            } else {
                activeFilters.availability = null;
            }
            applyFilters();
        });
    }

    // Helper Function to handle Single-Select Filter Dropdowns
    function setupDropdownFilter(buttons, filterKey, dataAttribute) {
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.getAttribute(dataAttribute);
                if (activeFilters[filterKey] === value) {
                    activeFilters[filterKey] = null;
                    btn.style.fontWeight = "normal";
                    btn.style.color = "#555";
                } else {
                    buttons.forEach(b => {
                        b.style.fontWeight = "normal";
                        b.style.color = "#555";
                    });
                    activeFilters[filterKey] = value;
                    btn.style.fontWeight = "bold";
                    btn.style.color = "#000";
                }
                applyFilters();
            });
        });
    }

    setupDropdownFilter(categoryFilterBtns, "category", "data-value");
    setupDropdownFilter(colorFilterBtns, "color", "data-value");
    setupDropdownFilter(collectionFilterBtns, "collection", "data-value");
    setupDropdownFilter(tagFilterBtns, "tag", "data-value");
    setupDropdownFilter(ratingFilterBtns, "rating", "data-value");

    // Price Filter Buttons
    priceFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const min = parseFloat(btn.getAttribute("data-min")) || 0;
            const max = parseFloat(btn.getAttribute("data-max")) || Infinity;

            if (activeFilters.priceMin === min && activeFilters.priceMax === max) {
                activeFilters.priceMin = 0;
                activeFilters.priceMax = Infinity;
                btn.style.fontWeight = "normal";
                btn.style.color = "#555";
            } else {
                priceFilterBtns.forEach(b => {
                    b.style.fontWeight = "normal";
                    b.style.color = "#555";
                });
                activeFilters.priceMin = min;
                activeFilters.priceMax = max;
                btn.style.fontWeight = "bold";
                btn.style.color = "#000";
            }
            applyFilters();
        });
    });

    // Quick Categories Buttons (Top Bar)
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-category");
            const col = btn.getAttribute("data-collection");

            if (cat) {
                activeFilters.category = activeFilters.category === cat ? null : cat;
            }
            if (col) {
                activeFilters.collection = activeFilters.collection === col ? null : col;
            }
            applyFilters();
        });
    });

    // Reset All Filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            activeFilters = {
                search: "",
                size: null,
                availability: null,
                category: null,
                color: null,
                priceMin: 0,
                priceMax: Infinity,
                collection: null,
                tag: null,
                rating: null
            };

            if (searchInput) searchInput.value = "";
            if (availableFilter) availableFilter.checked = false;
            if (outOfStockFilter) outOfStockFilter.checked = false;

            // Reset Styles
            sizeButtons.forEach(b => { b.style.background = "transparent"; b.style.color = "#000"; });
            document.querySelectorAll(".filter-dropdown button").forEach(b => {
                b.style.fontWeight = "normal";
                b.style.color = "#555";
            });

            applyFilters();
        });
    }

    // Initial Load
    applyFilters();
});