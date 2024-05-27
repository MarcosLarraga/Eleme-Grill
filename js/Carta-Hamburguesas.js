// Function to fetch burger data
async function fetchBurgers() {
    try {
        const response = await fetch('http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.FIND_ALL');
        const products = await response.json();
        console.log('Fetched products:', products); // Log the fetched products

        // Filter only burger products (where PR_CATEGORIA_ID === 1)
        const burgers = products.filter(product => product.PR_CATEGORIA_ID === 1);
        console.log('Filtered burgers:', burgers); // Log the filtered burgers

        displayBurgers(burgers);
    } catch (error) {
        console.error('Error fetching burgers:', error);
    }
}

// Function to display burger cards on the page
function displayBurgers(burgers) {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = ''; // Clear any existing content

    burgers.forEach(burger => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = burger.PR_NOMBRE;

        card.appendChild(cardContent);
        productosContainer.appendChild(card);
    });
}

// Fetch burgers when the page loads
document.addEventListener('DOMContentLoaded', fetchBurgers);

// Function to open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listener to close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Fetch burgers when the page loads
document.addEventListener('DOMContentLoaded', fetchBurgers);


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