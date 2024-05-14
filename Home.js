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

/*inicio sesion*/
const modal = document.getElementById('loginModal');
const btn = document.getElementById("loginBtn");
const span = document.querySelector(".close");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

btn.addEventListener("click", openModal);

window.addEventListener("click", function(event) {
    if (event.target === modal || event.target === span) {
        closeModal();
    }
});

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});