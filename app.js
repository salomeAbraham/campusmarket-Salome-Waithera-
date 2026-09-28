// ==========================================
// CAMPUSMARK SHARED PRODUCT DATA
// ==========================================

const productData = [
    {
        name: "Scientific Calculator",
        category: "Stationery",
        price: 1200,
        image: "images/Calculator.jpg",
        alt: "Scientific calculator on a table"
    },

    {
        name: "Campus Backpack",
        category: "Bags",
        price: 1500,
        image: "images/Backpack.jpg",
        alt: "Black campus backpack displayed on a white floor"
    },

    {
        name: "Programming Textbook",
        category: "Textbooks",
        price: 1800,
        image: "images/Textbook.jpg",
        alt: "Open textbooks and study books on a desk"
    },

    {
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2500,
        image: "images/headphones.jpg",
        alt: "Black wireless headphones on a white desk"
    },

    {
        name: "USB Flash Drive",
        category: "Electronics",
        price: 900,
        image: "images/usbFlashDrive.jpg",
        image: null,
        alt: ""
    },

    {
        name: "Notebook Set",
        category: "Stationery",
        price: 600,
        image: "images/Notebookset.jpg",
        image: null,
        alt: ""
    }
];


// ==========================================
// CATALOGUE FILTERING
// ==========================================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");
const noResultsMessage = document.getElementById("noResults");

let filteredProducts = [...productData];


// Get products matching the current filters
function getFilteredProducts() {

    const searchTerm =
        searchInput.value.trim().toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    return productData.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}


// Apply filter to catalogue AND gallery
function filterProducts() {

    filteredProducts = getFilteredProducts();


    // Loop through the product cards
    productCards.forEach(function(card) {

        const productName =
            card.dataset.name;

        const shouldShow =
            filteredProducts.some(function(product) {
                return product.name === productName;
            });


        // if / else decision
        if (shouldShow) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });


    if (filteredProducts.length === 0) {

        noResultsMessage.style.display = "block";

    } else {

        noResultsMessage.style.display = "none";
    }


    // IMPORTANT:
    // The same filtered data drives the gallery.
    galleryIndex = 0;
    renderGallery();
}


if (searchInput && categoryFilter) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}


// ==========================================
// PRODUCT GALLERY / SLIDESHOW
// ==========================================

const galleryDisplay =
    document.getElementById("galleryDisplay");

const previousImage =
    document.getElementById("previousImage");

const nextImage =
    document.getElementById("nextImage");

const galleryCounter =
    document.getElementById("galleryCounter");

let galleryIndex = 0;


// Only products with images appear in gallery
function getGalleryProducts() {

    return filteredProducts.filter(function(product) {

        return product.image !== null;

    });
}


// Display the current gallery image
function renderGallery() {

    if (!galleryDisplay) {
        return;
    }


    const galleryProducts =
        getGalleryProducts();


    // Clear previous DOM elements
    galleryDisplay.replaceChildren();


    if (galleryProducts.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "No product images match the current filter.";

        message.classList.add("gallery-empty");

        galleryDisplay.appendChild(message);

        galleryCounter.textContent = "";

        return;
    }


    // Keep the index inside the valid range
    galleryIndex =
        galleryIndex % galleryProducts.length;


    const product =
        galleryProducts[galleryIndex];


    const image =
        document.createElement("img");

    image.src = product.image;

    image.alt = product.alt;

    image.classList.add("gallery-image");


    const title =
        document.createElement("h3");

    title.textContent =
        product.name;

    title.classList.add("gallery-title");


    const category =
        document.createElement("p");

    category.textContent =
        product.category;

    category.classList.add("gallery-category");


    galleryDisplay.appendChild(image);

    galleryDisplay.appendChild(title);

    galleryDisplay.appendChild(category);


    galleryCounter.textContent =
        `${galleryIndex + 1} of ${galleryProducts.length}`;
}


// Previous image
if (previousImage) {

    previousImage.addEventListener(
        "click",
        function() {

            const galleryProducts =
                getGalleryProducts();

            if (galleryProducts.length === 0) {
                return;
            }


            galleryIndex =
                (galleryIndex - 1 +
                galleryProducts.length) %
                galleryProducts.length;

            renderGallery();
        }
    );
}


// Next image
if (nextImage) {

    nextImage.addEventListener(
        "click",
        function() {

            const galleryProducts =
                getGalleryProducts();

            if (galleryProducts.length === 0) {
                return;
            }


            galleryIndex =
                (galleryIndex + 1) %
                galleryProducts.length;

            renderGallery();
        }
    );
}


renderGallery();


// ==========================================
// SHOPPING CART
// ==========================================

let cart = [];

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


function addToCart(productName) {

    const product =
        productData.find(function(item) {
            return item.name === productName;
        });


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(function(item) {
            return item.name === product.name;
        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }


    updateCart();
}


// Validate quantity
function validateQuantity(value) {

    if (value.trim() === "") {

        return {
            valid: false,
            message: "Quantity is required."
        };
    }


    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return {
            valid: false,
            message: "Quantity must be a number."
        };
    }


    if (number <= 0) {

        return {
            valid: false,
            message: "Quantity must be greater than zero."
        };
    }


    if (!Number.isInteger(number)) {

        return {
            valid: false,
            message: "Quantity must be a whole number."
        };
    }


    return {
        valid: true,
        value: number
    };
}


// Create a cart item using DOM methods
function createCartItem(item) {

    const wrapper =
        document.createElement("div");

    wrapper.classList.add("cart-item");


    const information =
        document.createElement("div");

    information.classList.add("cart-information");


    const title =
        document.createElement("h3");

    title.textContent =
        item.name;


    const price =
        document.createElement("p");

    price.textContent =
        `KES ${item.price.toLocaleString()} each`;


    information.appendChild(title);
    information.appendChild(price);


    const controls =
        document.createElement("div");

    controls.classList.add("cart-quantity");


    const label =
        document.createElement("label");

    label.textContent =
        "Quantity: ";


    const input =
        document.createElement("input");

    input.type = "number";

    input.min = "1";

    input.value =
        item.quantity;

    input.setAttribute(
        "aria-label",
        `Quantity for ${item.name}`
    );


    const error =
        document.createElement("p");

    error.classList.add("quantity-error");


    const subtotal =
        document.createElement("p");

    subtotal.classList.add("subtotal");


    function updateItemQuantity() {

        const validation =
            validateQuantity(input.value);


        if (!validation.valid) {

            input.classList.add("input-error");

            error.textContent =
                validation.message;

            error.classList.add("show");


            subtotal.textContent =
                "Subtotal excluded until quantity is valid.";

            updateCartTotal();

            return;
        }


        input.classList.remove("input-error");

        error.textContent = "";

        error.classList.remove("show");


        item.quantity =
            validation.value;


        const itemSubtotal =
            item.price * item.quantity;


        subtotal.textContent =
            `Subtotal: KES ${itemSubtotal.toLocaleString()}`;


        updateCartTotal();
    }


    input.addEventListener(
        "input",
        updateItemQuantity
    );


    label.appendChild(input);

    controls.appendChild(label);

    controls.appendChild(error);

    controls.appendChild(subtotal);


    wrapper.appendChild(information);

    wrapper.appendChild(controls);


    updateItemQuantity();


    return wrapper;
}


// Calculate total using only valid quantities
function updateCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        const validation =
            validateQuantity(
                String(item.quantity)
            );


        if (validation.valid) {

            total +=
                item.price *
                validation.value;
        }
    });


    if (cartTotal) {

        cartTotal.textContent =
            `KES ${total.toLocaleString()}`;
    }
}


// Render cart
function updateCart() {

    if (!cartItems) {
        return;
    }


    cartItems.replaceChildren();


    if (cart.length === 0) {

        const empty =
            document.createElement("p");

        empty.textContent =
            "Your cart is empty.";

        empty.classList.add("empty-cart");

        cartItems.appendChild(empty);

        if (cartCount) {
            cartCount.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = "KES 0";
        }

        return;
    }


    let totalQuantity = 0;


    cart.forEach(function(item) {

        totalQuantity +=
            item.quantity;


        const cartItem =
            createCartItem(item);

        cartItems.appendChild(cartItem);
    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;
    }


    updateCartTotal();
}


// Add-to-cart buttons
const addCartButtons =
    document.querySelectorAll(
        ".add-cart-button"
    );


addCartButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const card =
                button.closest(".product-card");


            if (!card) {
                return;
            }


            const productName =
                card.dataset.name;


            addToCart(productName);
        }
    );
});


// ==========================================
// REGISTRATION FORM VALIDATION
// ==========================================

const registrationForm =
    document.getElementById("registrationForm");


if (registrationForm) {

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const successMessage =
        document.getElementById("successMessage");


    function showError(field, message) {

        const errorElement =
            document.getElementById(
                `${field.id}Error`
            );


        if (errorElement) {

            errorElement.textContent =
                message;

            errorElement.classList.add("show");
        }


        field.classList.add("input-error");
    }


    function clearError(field) {

        const errorElement =
            document.getElementById(
                `${field.id}Error`
            );


        if (errorElement) {

            errorElement.textContent = "";

            errorElement.classList.remove("show");
        }


        field.classList.remove("input-error");
    }


    registrationForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            clearError(fullName);
            clearError(email);
            clearError(password);
            clearError(confirmPassword);


            if (successMessage) {

                successMessage.classList.remove("show");
            }


            let formIsValid = true;


            // Required field
            if (fullName.value.trim() === "") {

                showError(
                    fullName,
                    "Full name is required."
                );

                formIsValid = false;
            }


            // Required + format check
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email.value.trim() === "") {

                showError(
                    email,
                    "Email address is required."
                );

                formIsValid = false;

            } else if (
                !emailPattern.test(email.value.trim())
            ) {

                showError(
                    email,
                    "Email must contain a valid format such as name@example.com."
                );

                formIsValid = false;
            }


            // Custom password rule
            if (password.value === "") {

                showError(
                    password,
                    "Password is required."
                );

                formIsValid = false;

            } else if (password.value.length < 8) {

                showError(
                    password,
                    "Password must contain at least 8 characters."
                );

                formIsValid = false;
            }


            // Custom password confirmation rule
            if (confirmPassword.value === "") {

                showError(
                    confirmPassword,
                    "Please confirm your password."
                );

                formIsValid = false;

            } else if (
                confirmPassword.value !==
                password.value
            ) {

                showError(
                    confirmPassword,
                    "Passwords do not match."
                );

                formIsValid = false;
            }


            if (!formIsValid) {

                return;
            }


            // Successful validated submission
            successMessage.textContent =
                "Registration successful! Welcome to CampusMarket.";


            // Animation is deliberately triggered
            // only after successful validation.
            successMessage.classList.add("show");


            registrationForm.reset();
        }
    );


    // Show / hide password
    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirmPassword =
        document.getElementById(
            "toggleConfirmPassword"
        );


    togglePassword.addEventListener(
        "click",
        function() {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.textContent =
                    "Hide";

            } else {

                password.type = "password";

                togglePassword.textContent =
                    "Show";
            }
        }
    );


    toggleConfirmPassword.addEventListener(
        "click",
        function() {

            if (
                confirmPassword.type ===
                "password"
            ) {

                confirmPassword.type =
                    "text";

                toggleConfirmPassword.textContent =
                    "Hide";

            } else {

                confirmPassword.type =
                    "password";

                toggleConfirmPassword.textContent =
                    "Show";
            }
        }
    );
}