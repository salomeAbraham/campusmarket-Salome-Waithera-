// =====================================
// CAMPUSMARKET PRODUCT FILTERING
// =====================================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product-card");
const noResultsMessage = document.getElementById("noResults");


// Filter products
function filterProducts() {

    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    let visibleProducts = 0;

    // Loop through all products
    products.forEach(function(product) {

        const productName =
            product.dataset.name.toLowerCase();

        const productCategory =
            product.dataset.category;

        const matchesSearch =
            productName.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;


        // Decide whether to show or hide product
        if (matchesSearch && matchesCategory) {

            product.style.display = "block";
            visibleProducts++;

        } else {

            product.style.display = "none";
        }

    });


    // Show message if no products match
    if (visibleProducts === 0) {

        noResultsMessage.style.display = "block";

    } else {

        noResultsMessage.style.display = "none";
    }
}


searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);


// =====================================
// SHOPPING CART
// =====================================

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


// Add product to cart
function addToCart(product) {

    const name = product.dataset.name;
    const price = Number(product.dataset.price);

    const existingProduct = cart.find(function(item) {
        return item.name === name;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }


    updateCart();
}


// Update the cart display
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    // Loop through cart products
    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        totalQuantity += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>KES ${item.price.toLocaleString()} each</p>
            </div>

            <div class="cart-quantity">
                <label>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        data-name="${item.name}"
                    >
                </label>

                <p>
                    Subtotal:
                    <strong>
                        KES ${itemTotal.toLocaleString()}
                    </strong>
                </p>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });


    // If cart is empty
    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }


    cartTotal.textContent =
        `KES ${total.toLocaleString()}`;

    cartCount.textContent = totalQuantity;


    // Add quantity event listeners
    const quantityInputs =
        document.querySelectorAll(".cart-quantity input");

    quantityInputs.forEach(function(input) {

        input.addEventListener("input", function() {

            const productName = input.dataset.name;

            const newQuantity =
                Number(input.value);

            const product =
                cart.find(function(item) {
                    return item.name === productName;
                });


            if (product && newQuantity > 0) {

                product.quantity = newQuantity;

                updateCart();
            }

        });

    });
}


// Add click events to all Add to Cart buttons
const addCartButtons =
    document.querySelectorAll(".add-cart-button");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product =
            button.closest(".product-card");

        addToCart(product);

    });

});