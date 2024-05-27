document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function addToCart(name, price) {
        let cartItem = document.querySelector(`#cart-items tr[data-name="${name}"]`);
        if (cartItem) {
            const quantityElement = cartItem.querySelector('.quantity');
            const totalElement = cartItem.querySelector('.total');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            totalElement.textContent = (quantity * price).toFixed(2) + ' €';
        } else {
            cartItem = document.createElement('tr');
            cartItem.setAttribute('data-name', name);
            cartItem.innerHTML = `
                <td>${name}</td>
                <td>${price.toFixed(2)} €</td>
                <td class="quantity">1</td>
                <td class="total">${price.toFixed(2)} €</td>
                <td><button class="remove">Eliminar</button></td>
            `;
            cartItems.appendChild(cartItem);
        }
        updateCartTotal();
    }

    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('#cart-items .total').forEach(item => {
            total += parseFloat(item.textContent.replace(' €', ''));
        });
        cartTotal.textContent = total.toFixed(2) + ' €';
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to cart') {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            addToCart(name, price);
        } else if (e.target.classList.contains('remove')) {
            const cartItem = e.target.closest('tr');
            cartItem.remove();
            updateCartTotal();
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        const cartData = [];
        document.querySelectorAll('#cart-items tr').forEach(row => {
            const name = row.getAttribute('data-name');
            const price = row.children[1].textContent.replace(' €', '');
            const quantity = row.children[2].textContent;
            const total = row.children[3].textContent.replace(' €', '');
            cartData.push({ name, price, quantity, total });
        });
        const totalAmount = cartTotal.textContent;
        localStorage.setItem('cartData', JSON.stringify(cartData));
        localStorage.setItem('totalAmount', totalAmount);
        window.location.href = 'resumen-pedido.html';
    });
});

/* Función para encontrar todos los productos */
const fetchProductos = async () => {
    const urlProductos = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.FIND_ALL';

    try {
        const result = await fetch(urlProductos);
        const data = await result.json();
        console.log('Estos son los productos que hay en la API:', data);
        printProductos(data); // Imprimir los productos en la categoría HTML
    } catch (error) {
        console.log('Error al extraer datos con la API', error);
    }
};

/* Función para imprimir los productos en la lista de productos */
const printProductos = (productos) => {
    const productosContainer = document.getElementById('productos');

    productos.forEach(producto => {
        const { PR_PRODUCTO_ID, PR_NOMBRE, PR_PRECIO } = producto;

        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${PR_NOMBRE}</h2>
            <p>Price: ${PR_PRECIO} €</p>
            <button data-name="${PR_NOMBRE}" data-price="${PR_PRECIO}">Add to cart</button>
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