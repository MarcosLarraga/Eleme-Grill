// Obtener el modal y el botón de cierre
var modal = document.getElementById('loginModal');
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function () {
    modal.style.display = "block";
}

// Cerrar el modal cuando se hace clic en el botón de cierre o fuera del modal
window.onclick = function (event) {
    if (event.target == modal || event.target == span) {
        modal.style.display = "none";
    }
}
