const registerForm = document.getElementById("register-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const formMessage = document.getElementById("form-message");


// FORM SUBMISSION
registerForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    formMessage.textContent = "";
    formMessage.className = "";

    let isValid = true;


    // REQUIRED NAME
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Full name is required.";
        isValid = false;
    }


    // REQUIRED EMAIL
    if (emailInput.value.trim() === "") {

        emailError.textContent = "Email address is required.";
        isValid = false;

    } else {

        // EMAIL VALIDATION
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }
    }


    // REQUIRED PASSWORD
    if (passwordInput.value === "") {

        passwordError.textContent = "Password is required.";
        isValid = false;

    } else if (passwordInput.value.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        isValid = false;
    }


    // PASSWORD CONFIRMATION
    if (confirmPasswordInput.value === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

        isValid = false;

    } else if (confirmPasswordInput.value !== passwordInput.value) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        isValid = false;
    }


    // SUCCESS
    if (isValid) {

        formMessage.textContent =
            "Account created successfully! Welcome to CampusMarket.";

        formMessage.className = "success";

        // Clear form
        registerForm.reset();

    } else {

        // ERROR MESSAGE
        formMessage.textContent =
            "Please correct the errors above.";

        formMessage.className = "error-message";
    }

});


// SHOW / HIDE PASSWORD
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});


// SHOW / HIDE CONFIRM PASSWORD
const toggleConfirmPassword =
    document.getElementById("toggle-confirm-password");

toggleConfirmPassword.addEventListener("click", function() {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";
        toggleConfirmPassword.textContent = "Hide";

    } else {

        confirmPasswordInput.type = "password";
        toggleConfirmPassword.textContent = "Show";
    }

});