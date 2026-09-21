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


// =====================================
// ADD PRODUCT TO CART
// =====================================

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


// =====================================
// UPDATE CART DISPLAY
// =====================================

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


        // Create cart item
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            <div class="cart-product-info">

                <h3>${item.name}</h3>

                <p>
                    KES ${item.price.toLocaleString()} each
                </p>

            </div>


            <div class="cart-quantity">

                <div class="quantity-controls">

                    <button
                        class="quantity-btn decrease-btn"
                        data-name="${item.name}"
                    >
                        −
                    </button>

                    <span class="quantity-number">
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-name="${item.name}"
                    >
                        +
                    </button>

                </div>


                <p>
                    Subtotal:
                    <strong>
                        KES ${itemTotal.toLocaleString()}
                    </strong>
                </p>


                <button
                    class="remove-cart-button"
                    data-name="${item.name}"
                >
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);
    });


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }


    // =====================================
    // UPDATE TOTALS
    // =====================================

    cartTotal.textContent =
        `KES ${total.toLocaleString()}`;

    cartCount.textContent = totalQuantity;


    // =====================================
    // INCREASE QUANTITY
    // =====================================

    const increaseButtons =
        document.querySelectorAll(".increase-btn");


    increaseButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName =
                button.dataset.name;


            const product =
                cart.find(function(item) {
                    return item.name === productName;
                });


            if (product) {

                product.quantity++;

                updateCart();
            }

        });

    });


    // =====================================
    // DECREASE QUANTITY
    // =====================================

    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");


    decreaseButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName =
                button.dataset.name;


            const product =
                cart.find(function(item) {
                    return item.name === productName;
                });


            if (product) {

                product.quantity--;


                // Remove item when quantity reaches zero
                if (product.quantity <= 0) {

                    cart = cart.filter(function(item) {
                        return item.name !== productName;
                    });
                }


                updateCart();
            }

        });

    });


    // =====================================
    // REMOVE PRODUCT
    // =====================================

    const removeButtons =
        document.querySelectorAll(".remove-cart-button");


    removeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productName =
                button.dataset.name;


            cart = cart.filter(function(item) {

                return item.name !== productName;

            });


            updateCart();

        });

    });

}


// =====================================
// ADD TO CART BUTTONS
// =====================================

const addCartButtons =
    document.querySelectorAll(".add-cart-button");


addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product =
            button.closest(".product-card");

        addToCart(product);

    });

});