document.addEventListener('DOMContentLoaded', function() {
    const orderDetails = document.getElementById('order-details');
    const orderTotal = document.getElementById('order-total');

    function loadOrderSummary() {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        const totalAmount = localStorage.getItem('totalAmount');
        
        if (cartData && totalAmount) {
            cartData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price} €</td>
                    <td>${item.quantity}</td>
                    <td>${item.total} €</td>
                `;
                orderDetails.appendChild(row);
            });
            orderTotal.textContent = totalAmount;
        }
    }

    document.getElementById('payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Payment Successful. Thank you for your purchase!');
        localStorage.removeItem('cartData');
        localStorage.removeItem('totalAmount');
        window.location.href = 'home.html';
    });

    loadOrderSummary();
});
