// Obtener el modal y el botón de cierre
const modal = document.getElementById('loginModal');
const btn = document.getElementById("loginBtn");
const span = document.querySelector(".close");

// Función para abrir el modal
function openModal() {
    modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = "none";
}

// Abrir el modal cuando se hace clic en el botón
btn.addEventListener("click", openModal);

// Cerrar el modal cuando se hace clic en el botón de cierre o fuera del modal
window.addEventListener("click", function(event) {
    if (event.target === modal || event.target === span) {
        closeModal();
    }
});

// Cerrar el modal cuando se presiona la tecla Escape
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});