document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Productos de ejemplo con imágenes
    const products = {
        hamburguesas: [
            { name: 'Hamburguesa Clásica', price: 5, image: 'img/hamburguesa_clasica.jpg' },
            { name: 'Hamburguesa Doble', price: 7, image: 'img/hamburguesa_doble.jpg' },
            { name: 'Hamburguesa BBQ', price: 6, image: 'img/hamburguesa_bbq.jpg' },
            { name: 'Hamburguesa Vegetariana', price: 6, image: 'img/hamburguesa_vegetariana.jpg' },
            { name: 'Hamburguesa Pollo', price: 6, image: 'img/hamburguesa_pollo.jpg' },
            { name: 'Hamburguesa Tocino', price: 7, image: 'img/hamburguesa_tocino.jpg' },
            { name: 'Hamburguesa Queso', price: 5, image: 'img/hamburguesa_queso.jpg' },
            { name: 'Hamburguesa Picante', price: 6, image: 'img/hamburguesa_picante.jpg' },
            { name: 'Hamburguesa Deluxe', price: 8, image: 'img/hamburguesa_deluxe.jpg' },
            { name: 'Hamburguesa Mini', price: 4, image: 'img/hamburguesa_mini.jpg' },
            { name: 'Hamburguesa Gourmet', price: 9, image: 'img/hamburguesa_gourmet.jpg' },
            { name: 'Hamburguesa Especial', price: 10, image: 'img/hamburguesa_especial.jpg' },
        ],
        bebidas: [
            { name: 'Coca Cola', price: 2, image: 'img/coca_cola.jpg' },
            { name: 'Pepsi', price: 2, image: 'img/pepsi.jpg' },
            { name: 'Fanta', price: 2, image: 'img/fanta.jpg' },
            { name: 'Sprite', price: 2, image: 'img/sprite.jpg' },
            { name: 'Agua', price: 1.5, image: 'img/agua.jpg' },
            { name: 'Jugo Naranja', price: 3, image: 'img/jugo_naranja.jpg' },
            { name: 'Jugo Manzana', price: 3, image: 'img/jugo_manzana.jpg' },
            { name: 'Limonada', price: 3, image: 'img/limonada.jpg' },
            { name: 'Té Helado', price: 2.5, image: 'img/te_helado.jpg' },
            { name: 'Café', price: 2, image: 'img/cafe.jpg' },
            { name: 'Batido Chocolate', price: 4, image: 'img/batido_chocolate.jpg' },
            { name: 'Batido Fresa', price: 4, image: 'img/batido_fresa.jpg' },
        ],
        compartir: [
            { name: 'Papas Fritas', price: 3, image: 'img/papas_fritas.jpg' },
            { name: 'Aros de Cebolla', price: 4, image: 'img/aros_cebolla.jpg' },
            { name: 'Nuggets de Pollo', price: 5, image: 'img/nuggets_pollo.jpg' },
            { name: 'Nachos', price: 6, image: 'img/nachos.jpg' },
            { name: 'Alitas BBQ', price: 7, image: 'img/alitas_bbq.jpg' },
            { name: 'Mozzarella Sticks', price: 5, image: 'img/mozzarella_sticks.jpg' },
            { name: 'Ensalada', price: 4, image: 'img/ensalada.jpg' },
            { name: 'Quesadillas', price: 6, image: 'img/quesadillas.jpg' },
            { name: 'Mini Hot Dogs', price: 5, image: 'img/mini_hot_dogs.jpg' },
            { name: 'Tacos', price: 7, image: 'img/tacos.jpg' },
            { name: 'Guacamole', price: 4, image: 'img/guacamole.jpg' },
            { name: 'Bruschetta', price: 5, image: 'img/bruschetta.jpg' },
        ],
        postres: [
            { name: 'Tarta de Chocolate', price: 4, image: 'img/tarta_chocolate.jpg' },
            { name: 'Helado', price: 3, image: 'img/helado.jpg' },
            { name: 'Pastel de Queso', price: 4, image: 'img/pastel_queso.jpg' },
            { name: 'Brownie', price: 3.5, image: 'img/brownie.jpg' },
            { name: 'Galletas', price: 3, image: 'img/galletas.jpg' },
            { name: 'Fruta Fresca', price: 2.5, image: 'img/fruta_fresca.jpg' },
            { name: 'Crepes', price: 4.5, image: 'img/crepes.jpg' },
            { name: 'Mousse', price: 3.5, image: 'img/mousse.jpg' },
            { name: 'Flan', price: 3, image: 'img/flan.jpg' },
            { name: 'Tiramisú', price: 4, image: 'img/tiramisu.jpg' },
            { name: 'Panqueques', price: 3.5, image: 'img/panqueques.jpg' },
            { name: 'Cupcake', price: 3, image: 'img/cupcake.jpg' },
        ],
    };

    function renderProducts(category, products) {
        const container = document.getElementById(category);
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.price.toFixed(2)} €</p>
                <button data-category="${category}" data-name="${product.name}" data-price="${product.price}">Añadir al Carrito</button>
            `;
            container.appendChild(productElement);
        });
    }

    Object.keys(products).forEach(category => {
        renderProducts(category, products[category]);
    });

    function addToCart(name, price) {
        let cartItem = document.querySelector(`#cart-items tr[data-name="${name}"]`);
        if (cartItem) {
            const quantityElement = cartItem.querySelector('.quantity');
            const totalElement = cartItem.querySelector('.total');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            totalElement.textContent = (quantity * price).toFixed(2);
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
            total += parseFloat(item.textContent);
        });
        cartTotal.textContent = total.toFixed(2);
    }

    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Añadir al Carrito') {
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
        const paymentMethod = document.getElementById('payment-method').value;
        alert(`Pago realizado con ${paymentMethod}. Total: ${cartTotal.textContent} €`);
        cartItems.innerHTML = '';
        cartTotal.textContent = '0.00';
    });
});