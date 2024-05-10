function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  }
  
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  }
  
  // Cierra el modal cuando se hace clic en la X
  var closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var modalId = this.parentElement.parentElement.id;
      closeModal(modalId);
    });
  });
  
  // Cierra el modal cuando se hace clic fuera del contenido
  window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target.id);
    }
  };