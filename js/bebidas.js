/*nav(responsive)*/
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