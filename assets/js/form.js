// show a message with a type of the input
function showMessage(input, message, type) {
  // get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  // update the class for the input
  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
  // check if the value is not empty
  if (!hasValue(input, requiredMsg)) {
    return false;
  }
  // validate email format
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = input.value.trim();
  if (!emailRegex.test(email)) {
    return showError(input, invalidMsg);
  }
  return true;
}

function enableSubmit() {
  let inputs = document.getElementsByClassName("form__required");
  let btn = document.querySelector('input[type="submit"]');
  let isValid = true;

  for (var i = 0; i < inputs.length; i++) {
    let changedInput = inputs[i];
    if (changedInput.value.trim() === "" || changedInput.value === null) {
      isValid = false;
      break;
    }
  }
  btn.disabled = !isValid;
}

const form = document.getElementById("form");
const country = document.getElementById("country");
// Required messages
const FIRSTNAME_REQUIRED = "Please enter your first name";
const LASTNAME_REQUIRED = "Please enter your last name";
const EMAIL_REQUIRED = "Please enter your email";
const MESSAGE_REQUIRED = "Please complete this required field.";

// Invalid messages
const EMAIL_INVALID = "Please enter a correct email address format";
const PHONE_INVALID = "Please enter a correct phone number format";

// INPUTS
// Required
const firstname = form.elements["firstname"];
const lastname = form.elements["lastname"];
const email = form.elements["email"];
const phone = form.elements["phone"];
const message = form.elements["message"];
// Optional
const language = form.elements["language"];
const promo = form.elements["promo"];

// Load the form
if (localStorage.getItem("formData") !== null) {
  const formData = JSON.parse(localStorage.getItem("formData"));
  firstname.value = formData.firstname;
  lastname.value = formData.lastname;
  email.value = formData.email;
  phone.value = formData.phone;
  message.value = formData.message;
  language.value = formData.language;
  promo.value = formData.promo;
}
enableSubmit();

form.addEventListener("submit", function (event) {
  // stop form submission
  event.preventDefault();

  // validate the form
  let firstnameValid = hasValue(firstname, FIRSTNAME_REQUIRED);
  let lastnameValid = hasValue(lastname, LASTNAME_REQUIRED);
  let phoneValid = hasValue(phone, PHONE_INVALID);
  let messageValid = hasValue(message, MESSAGE_REQUIRED);
  let emailValid = validateEmail(
    form.elements["email"],
    EMAIL_REQUIRED,
    EMAIL_INVALID
  );

  // if valid, submit the form.
  if (
    firstnameValid &&
    lastnameValid &&
    emailValid &&
    messageValid &&
    phoneValid
  ) {
    alert("Simulation d'envois.");

    // save the form data
    const formData = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      language: language.value,
      promo: promo.value,
      country: country.value,
    };

    // save the form data to local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // refresh the page
    setTimeout(function () {
      location.reload();
    }, 1000);
  }
});

country.addEventListener("change", function (event) {
  let prefix = "";
  switch (country.value) {
    case "US":
      prefix = "+1";
      break;
    case "FR":
      prefix = "+33";
      break;
    default:
      prefix = "+1";
      break;
  }

  phone.value = prefix;
});
