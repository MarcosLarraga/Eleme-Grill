/* Función para encontrar todas las categorías */
const fetchCategorias = async () => {
  const urlCategorias = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CATEGORIA.FIND_ALL';

  try {
      const result = await fetch(urlCategorias);
      const data = await result.json();
      console.log('Estas son las categorías que hay en la API:', data);
      printCategorias(data); // Imprimir las categorías en el contenedor HTML
  } catch (error) {
      console.log('Error al extraer datos con la API', error);
  }
};

/* Función para imprimir las categorías en las tarjetas */
const printCategorias = (categorias) => {
  const tarjetas = document.querySelectorAll('.tarjeta');

  categorias.forEach((categoria, index) => {
      const { CA_NOMBRE } = categoria;

      if (tarjetas[index]) {
          const titulo = tarjetas[index].querySelector('h1');
          if (titulo) {
              titulo.textContent = CA_NOMBRE;
          }
      }
  });
};

/* Ejecutar fetchCategorias cuando la página haya cargado */
document.addEventListener('DOMContentLoaded', fetchCategorias);

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

//hamburger
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