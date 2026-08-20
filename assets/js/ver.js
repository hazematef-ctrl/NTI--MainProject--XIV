var form = document.getElementById("loginForm");
var email = document.getElementById("email");
var password = document.getElementById("password");
var message = document.getElementById("message");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (email.value == "") {
        message.innerHTML = "EMAIL IS REQUIRED";
        message.className = "error";
        return;
    }
    if (password.value == "") {
        message.innerHTML = "PASSWORD IS REQUIRED";
        message.className = "error";
        return;
    }
    if (email.value != "Mohamed@gmail.com" ||
        password.value != "Elnemsa2005") {

        message.innerHTML = "WRONG EMAIL OR PASSWORD";
        message.className = "error";
        return;
    }
    message.innerHTML = "LOGIN SUCCESSFUL";
    message.className = "success";
    setTimeout(function() {
        window.location.href = "home.html";
    }, 1000);

});

var forgot = document.getElementById("forgot");

forgot.addEventListener("click", function(e) {

    e.preventDefault();

    message.innerHTML = "A VERIFICATION CODE HAS BEEN SENT TO         MOHAMED@GMAIL.COM"     ;
    message.className = "success";

});