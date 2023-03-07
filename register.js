const registrationForm = document.querySelector("#registration-form");

// Dynamically populate the country select options
const countrySelect = registrationForm.elements.namedItem("country");
fetch("/countries")
  .then((response) => response.json())
  .then((countries) => {
    for (const country of countries) {
      const option = document.createElement("option");
      option.value = country.id;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    }
  });

// Handle form submission
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  // Validate form fields
  const errors = validateRegistrationForm(formData);
  if (errors.length > 0) {
    displayErrors(errors);
    return;
  }

  // Submit form data to server
  fetch("/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        throw new Error("Registration failed.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Registration failed.");
    });
});

// Validation function for registration form fields
function validateRegistrationForm(formData) {
  const errors = [];

  const email = formData.get("email");
  if (!validateEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  const login = formData.get("login");
  if (!validateLogin(login)) {
    errors.push(
      "Please enter a valid login. It should be at least 6 characters long and contain only letters and numbers."
    );
  }

  const name = formData.get("name");
  if (!validateName(name)) {
    errors.push("Please enter your real name.");
  }

  const password = formData.get("password");
  if (!validatePassword(password)) {
    errors.push(
      "Please enter a valid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
    );
  }

  const birthdate = formData.get("birthdate");
  if (!validateBirthdate(birthdate)) {
    errors.push("Please enter a valid birth date.");
  }

  const country = formData.get("country");
  if (!validateCountry(country)) {
    errors.push("Please select your country.");
  }

  const terms = formData.get("terms");
  if (terms !== "on") {
    errors.push("Please agree to the terms and conditions.");
  }

  return errors;
}

// Validation functions for each form field
function validateEmail(email) {
  // This is a basic validation function that only checks if the email is valid according to the email format specification. In a real application, you would want to use a more advanced validation library or service that checks if the email actually exists and is not a disposable or temporary email address.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateLogin(login) {
  const loginRegex = /^[a-zA-Z0-9]{6,}$/;
  return loginRegex.test(login);
}

function validateName(name) {
  return name.trim() !== "";
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return passwordRegex.test(password);
}

function validateBirthdate(birthdate) {
  // This is a basic validation
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return birthdateRegex.test(birthdate);
}

function validateCountry(country) {
  // In this basic implementation, we only check if the country is not empty. In a real application, you might want to check if the country is actually one of the options in the select box, or use a more advanced validation library or service that checks if the country exists and is spelled correctly.
  return country !== "";
}

function displayErrors(errors) {
  const errorList = document.createElement("ul");
  for (const error of errors) {
    const errorItem = document.createElement("li");
    errorItem.textContent = error;
    errorList.appendChild(errorItem);
  }
  const errorContainer = document.querySelector("#error-container");
  errorContainer.innerHTML = "";
  errorContainer.appendChild(errorList);
}

// Display/hide password toggle functionality
const passwordInput = registrationForm.elements.namedItem("password");
const passwordToggle = document.querySelector("#password-toggle");
passwordToggle.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggle.textContent = "Hide password";
  } else {
    passwordInput.type = "password";
    passwordToggle.textContent = "Show password";
  }
});

// Additional functionality to display a confirmation message on successful registration
const confirmationMessage = document.querySelector("#confirmation-message");
if (confirmationMessage) {
  confirmationMessage.textContent =
    "Your registration was successful. Please check your email to confirm your account.";
}
