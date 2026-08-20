// Burger Nav 
const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const menuOverlay = document.querySelector("#menuOverlay");
const closeMenu = document.querySelector("#closeMenu");

function openMenu() {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeMobileMenu);

menuOverlay.addEventListener("click", closeMobileMenu);



const navBar = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navBar.classList.add("scrolled");
    } else {
        navBar.classList.remove("scrolled");
    }
});
//End Of Burger Nav 
