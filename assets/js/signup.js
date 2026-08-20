var form = document.getElementById("signupForm");
var email = document.getElementById("signupEmail");
var password = document.getElementById("signupPassword");
var confirmPassword = document.getElementById("confirmPassword");
var message = document.getElementById("signupMessage");

form.addEventListener("submit", function (m) {

    m.preventDefault();

    var emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,20}$/;

    if (email.value == "") {
        message.innerHTML = "EMAIL IS REQUIRED";
        message.className = "error";
    }
    else if (!emailPattern.test(email.value)) {
        message.innerHTML = "INVALID EMAIL";
        message.className = "error";
    }
    else if (password.value.length < 8) {
        message.innerHTML = "PASSWORD MUST BE 8 CHARACTERS";
        message.className = "error";
    }
    else if (password.value != confirmPassword.value) {
        message.innerHTML = "PASSWORDS DO NOT MATCH";
        message.className = "error";
    }
    else {
        message.innerHTML = "ACCOUNT CREATED SUCCESSFULLY";
        message.className = "success";

        setTimeout(function () {
        window.location.href = "../../index.html";
        }, 1000);
    }

});
