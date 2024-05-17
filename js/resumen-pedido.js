document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');

    function loadOrderSummary() {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        const totalAmount = localStorage.getItem('totalAmount') || '0.00';
        
        cartData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price} €</td>
                <td>${item.quantity}</td>
                <td>${item.total} €</td>
            `;
            orderSummary.appendChild(row);
        });

        orderTotal.textContent = totalAmount;
    }

    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago realizado con éxito.');
        localStorage.clear();
        window.location.href = 'carrito.html';
    });

    loadOrderSummary();
});