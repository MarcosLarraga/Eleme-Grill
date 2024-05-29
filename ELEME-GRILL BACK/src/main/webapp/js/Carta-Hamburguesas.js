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

/*modal*/
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

var closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var modalId = this.parentElement.parentElement.id;
        closeModal(modalId);
    });
});

window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target.id);
    }
};