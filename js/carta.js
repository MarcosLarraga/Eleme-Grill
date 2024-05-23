console.log('Hola mundo desde script.js');

// URL de la API para obtener los datos
const url = 'https://pokeapi.co/api/v2/pokemon/54'; // Ajusta esta URL a la correcta para tu API

const fetchCategories = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Datos de la API ----->', data);

        // categorias estan en array en el objeto `data`
        const categories = [
            data, // Hamburguesas
            data, // Para Compartir
            data, // Bebidas
            data  // Postres
        ];

        categories.forEach((item, index) => {
            updateCategory(item, index + 1);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Función para actualizar cada categoría con los datos obtenidos
const updateCategory = (item, categoryId) => {
    const {
        name,
        sprites: {
            other: {
                home: { front_default: imgItemFront }
            }
        }
    } = item;

    const category = document.getElementById(`category-${categoryId}`);
    if (category) {
        const img = category.querySelector('img');
        img.src = imgItemFront;
        img.alt = name;
    }
};

fetchCategories();

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