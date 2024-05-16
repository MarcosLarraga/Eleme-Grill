document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Productos de ejemplo con imágenes
    const products = {
        hamburguesas: [
            {name: 'Hamburguesa Clásica', price: 5, image: 'img/hamburguesa_clasica.jpg'},
            {name: 'Hamburguesa Doble', price: 7, image: 'img/hamburguesa_doble.jpg'},
            {name: 'Hamburguesa BBQ', price: 6, image: 'img/hamburguesa_bbq.jpg'},
            {name: 'Hamburguesa Vegetariana', price: 6, image: 'img/hamburguesa_vegetariana.jpg'},
            {name: 'Hamburguesa Pollo', price: 6, image: 'img/hamburguesa_pollo.jpg'},
            {name: 'Hamburguesa Tocino', price: 7, image: 'img/hamburguesa_tocino.jpg'},
            {name: 'Hamburguesa Queso', price: 5, image: 'img/hamburguesa_queso.jpg'},
            {name: 'Hamburguesa Picante', price: 6, image: 'img/hamburguesa_picante.jpg'},
            {name: 'Hamburguesa Deluxe', price: 8, image: 'img/hamburguesa_deluxe.jpg'},
            {name: 'Hamburguesa Mini', price: 4, image: 'img/hamburguesa_mini.jpg'},
            {name: 'Hamburguesa Gourmet', price: 9, image: 'img/hamburguesa_gourmet.jpg'},
            {name: 'Hamburguesa Especial', price: 10, image: 'img/hamburguesa_especial.jpg'},
        ],
        bebidas: [
            {name: 'Coca Cola', price: 2, image: 'img/coca_cola.jpg'},
            {name: 'Pepsi', price: 2, image: 'img/pepsi.jpg'},
            {name: 'Fanta', price: 2, image: 'img/fanta.jpg'},
            {name: 'Sprite', price: 2, image: 'img/sprite.jpg'},
            {name: 'Agua', price: 1.5, image: 'img/agua.jpg'},
            {name: 'Jugo Naranja', price: 3, image: 'img/jugo_naranja.jpg'},
            {name: 'Jugo Manzana', price: 3, image: 'img/jugo_manzana.jpg'},
            {name: 'Limonada', price: 3, image: 'img/limonada.jpg'},
            {name: 'Té Helado', price: 2.5, image: 'img/te_helado.jpg'},
            {name: 'Café', price: 2, image: 'img/cafe.jpg'},
            {name: 'Batido Chocolate', price: 4, image: 'img/batido_chocolate.jpg'},
            {name: 'Batido Fresa', price: 4, image: 'img/batido_fresa.jpg'},
        ],
        compartir: [
            {name: 'Papas Fritas', price: 3, image: 'img/papas_fritas.jpg'},
            {name: 'Aros de Cebolla', price: 4, image: 'img/aros_cebolla.jpg'},
            {name: 'Nuggets de Pollo', price: 5, image: 'img/nuggets_pollo.jpg'},
            {name: 'Nachos', price: 6, image: 'img/nachos.jpg'},
            {name: 'Alitas BBQ', price: 7, image: 'img/alitas_bbq.jpg'},
            {name: 'Mozzarella Sticks', price: 5, image: 'img/mozzarella_sticks.jpg'},
            {name: 'Ensalada', price: 4, image: 'img/ensalada.jpg'},
            {name: 'Quesadillas', price: 6, image: 'img/quesadillas.jpg'},
            {name: 'Guacamole', price: 3.5, image: 'img/guacamole.jpg'},
            {name: 'Papas con Queso', price: 4.5, image: 'img/papas_queso.jpg'},
            {name: 'Tacos', price: 6, image: 'img/tacos.jpg'},
            {name: 'Chili con Carne', price: 7, image: 'img/chili_con_carne.jpg'},
        ],
        postres: [
            {name: 'Helado', price: 4, image: 'img/helado.jpg'},
            {name: 'Pastel de Chocolate', price: 5, image: 'img/pastel_chocolate.jpg'},
            {name: 'Brownie', price: 3, image: 'img/brownie.jpg'},
            {name: 'Galletas', price: 2.5, image: 'img/galletas.jpg'},
            {name: 'Tarta de Manzana', price: 4.5, image: 'img/tarta_manzana.jpg'},
            {name: 'Cupcake', price: 3.5, image: 'img/cupcake.jpg'},
            {name: 'Cheesecake', price: 5, image: 'img/cheesecake.jpg'},
            {name: 'Flan', price: 3, image: 'img/flan.jpg'},
            {name: 'Crema Catalana', price: 4.5, image: 'img/crema_catalana.jpg'},
            {name: 'Churros', price: 4, image: 'img/churros.jpg'},
            {name: 'Tiramisú', price: 5, image: 'img/tiramisu.jpg'},
            {name: 'Mousse de Chocolate', price: 4, image: 'img/mousse_chocolate.jpg'},
        ]
    };

    // Función para cargar productos en la categoría correspondiente
    function loadProducts() {
        for (const category in products) {
            const productList = document.getElementById(category);
            products[category].forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.setAttribute('data-name', product.name);
                productDiv.setAttribute('data-price', product.price);
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart">Añadir al carrito</button>
                `;
                productList.appendChild(productDiv);
            });
        }
    }

    loadProducts();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const product = event.target.closest('.product');
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);
        const existingItem = cartItems.querySelector(`[data-name="${productName}"]`);

        if (existingItem) {
            const quantityElement = existingItem.querySelector('.item-quantity');
            const quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = quantity + 1;
            updateItemTotal(existingItem, productPrice);
        } else {
            const cartRow = document.createElement('tr');
            cartRow.setAttribute('data-name', productName);
            cartRow.innerHTML = `
                <td>${productName}</td>
                <td>$${productPrice.toFixed(2)}</td>
                <td class="item-quantity">1</td>
                <td class="item-total">$${productPrice.toFixed(2)}</td>
                <td><button class="remove-from-cart">Quitar</button></td>
            `;
            cartItems.appendChild(cartRow);
            cartRow.querySelector('.remove-from-cart').addEventListener('click', removeFromCart);
        }

        updateCartTotal();
    }

    function removeFromCart(event) {
        const cartRow = event.target.closest('tr');
        cartRow.remove();
        updateCartTotal();
    }

    function updateItemTotal(cartRow, productPrice) {
        const quantityElement = cartRow.querySelector('.item-quantity');
        const quantity = parseInt(quantityElement.textContent);
        const itemTotalElement = cartRow.querySelector('.item-total');
        itemTotalElement.textContent = `$${(quantity * productPrice).toFixed(2)}`;
    }

    function updateCartTotal() {
        let total = 0;
        cartItems.querySelectorAll('tr').forEach(cartRow => {
            const itemTotal = parseFloat(cartRow.querySelector('.item-total').textContent.replace('$', ''));
            total += itemTotal;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', () => {
        const paymentMethod = document.getElementById('payment-method').value;
        alert(`Pago realizado con ${paymentMethod}. Total: $${cartTotal.textContent}`);
        cartItems.innerHTML = '';
        cartTotal.textContent = '0.00';
    });
});