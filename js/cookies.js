document.addEventListener("DOMContentLoaded", function () {
    var cookieTab = document.getElementById("cookie-tab");
    var acceptCookiesBtn = document.getElementById("accept-cookies");

    // Verifica si ya se ha aceptado la cookie
    var cookiesAccepted = localStorage.getItem("cookiesAccepted");

    if (!cookiesAccepted) {
        // Si no se ha aceptado, muestra la pestaña de cookies
        cookieTab.classList.remove("hidden");
    }

    // Maneja el clic en el botón de aceptar cookies
    acceptCookiesBtn.addEventListener("click", function () {
        // Guarda en el almacenamiento local que las cookies han sido aceptadas
        localStorage.setItem("cookiesAccepted", true);
        // Oculta la pestaña de cookies
        cookieTab.classList.add("hidden");
    });

    // Elimina la marca de cookiesAccepted al recargar la página
    window.addEventListener("beforeunload", function () {
        localStorage.removeItem("cookiesAccepted");
    });
});

// selector
var menu = document.querySelector('.hamburger');

// method
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

// event
menu.addEventListener('click', toggleMenu, false);