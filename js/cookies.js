document.addEventListener("DOMContentLoaded", function () {
    var cookieTab = document.getElementById("cookie-tab");
    var acceptCookiesBtn = document.getElementById("accept-cookies");

    var cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (!cookiesAccepted) {
        cookieTab.classList.remove("hidden");
    }

    acceptCookiesBtn.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", true);
        cookieTab.classList.add("hidden");
    });

    window.addEventListener("beforeunload", function () {
        localStorage.removeItem("cookiesAccepted");
    });
});


var menu = document.querySelector('.hamburger');

function toggleMenu(event) {
  this.classList.toggle('is-active');
  var menuContainer = document.querySelector(".menuppal");
  menuContainer.classList.toggle("is_active");

  if (menuContainer.classList.contains("is_active")) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  event.preventDefault();
}

menu.addEventListener('click', toggleMenu, false);