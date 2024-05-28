window.onload = function () {
  document.getElementById("cookieAlert").classList.add("show");
};

function acceptCookies() {
  // Set cookie here if necessary
  document.getElementById("cookieAlert").style.transition = "bottom 0.5s ease";
  document.getElementById("cookieAlert").style.bottom = "-100%";
}

function rejectCookies() {
  // Set cookie here if necessary
  document.getElementById("cookieAlert").style.transition = "bottom 0.5s ease";
  document.getElementById("cookieAlert").style.bottom = "-100%";
  setTimeout(showCookieAlert, 1000); // Show alert again after x seconds
}

function showCookieAlert() {
  document.getElementById("cookieAlert").style.transition = "bottom 0.5s ease";
  document.getElementById("cookieAlert").style.bottom = "0";
}

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