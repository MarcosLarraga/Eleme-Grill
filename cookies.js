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
