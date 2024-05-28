/* Función para encontrar todos los productos */
const fetchProductos = async () => {
    const urlProductos = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.FIND_ALL';

    try {
        const result = await fetch(urlProductos);
        const data = await result.json();
        console.log('Estos son los productos que hay en la API:', data);

        // Filtrar los productos cuyo PR_CATEGORIA_ID es igual a 4
        const productosFiltrados = data.filter(producto => producto.PR_CATEGORIA_ID === 4);

        printProductos(productosFiltrados); // Imprimir los productos filtrados en la categoría HTML
    } catch (error) {
        console.log('Error al extraer datos con la API', error);
    }
};

/* Función para imprimir los productos en la lista de productos */
const printProductos = (productos) => {
    const productosContainer = document.getElementById('productos');

    // Limpiar el contenedor de productos antes de agregar los nuevos productos
    productosContainer.innerHTML = '';

    // Iterar sobre cada producto y agregarlo a la tabla de productos
    productos.forEach(producto => {
        const { PR_NOMBRE, PR_PRECIO, PR_FOTO } = producto;

        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${PR_NOMBRE}</h2>
            <img src="${PR_FOTO}"/>
            <p>${PR_PRECIO} €</p>
        `;

        productosContainer.appendChild(productElement);
    });
};

/* Ejecutar fetchProductos cuando la página haya cargado */
document.addEventListener('DOMContentLoaded', fetchProductos);

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