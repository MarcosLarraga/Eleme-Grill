document.addEventListener('DOMContentLoaded', () => {
    let lastOrderId = 0; // Definir lastOrderId al inicio

    /* Función para encontrar todos los pedidos y actualizar el lastOrderId */
    const fetchPedidos = async () => {
        const urlPedidos = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PEDIDO.FIND_ALL';

        try {
            const result = await fetch(urlPedidos);
            const data = await result.json();
            console.log('Estos son los pedidos que hay en la API:', data);

            // Renderizar pedidos en la tabla
            const tbody = document.querySelector('#tabla-pedidos tbody');
            tbody.innerHTML = ''; // Limpiar el contenido previo
            data.forEach(pedido => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><input type="checkbox" class="select-order" data-id="${pedido.PE_PEDIDO_ID}"></td>
                    <td>${pedido.PE_PEDIDO_ID}</td>
                    <td>${pedido.PE_CLIENTE_ID}</td>
                    <td>${pedido.PE_EMPLEADO_ID}</td>
                    <td>${pedido.PE_FECHAPEDIDO}</td>
                `;
                tbody.appendChild(tr);
            });

            // Obtener el último ID de pedido
            if (data.length > 0) {
                lastOrderId = Math.max(...data.map(pedido => parseInt(pedido.PE_PEDIDO_ID, 10)));
            } else {
                lastOrderId = 0;
            }
        } catch (error) {
            console.log('Error al extraer datos con la API', error);
        }
    };

    /* Función para eliminar un pedido */
    const deletePedido = async (orderIds) => {
        for (const orderId of orderIds) {
            const urlDeletePedido = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=PEDIDO.DELETE&PE_PEDIDO_ID=${orderId}`;

            try {
                const response = await fetch(urlDeletePedido, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log(`Pedido con ID ${orderId} eliminado`);
                    fetchPedidos(); // Actualizar la lista de pedidos después de eliminar uno
                } else {
                    throw new Error('Error al eliminar pedido');
                }
            } catch (error) {
                console.log('Error al eliminar pedido:', error);
            }
        }
    };



    /* Event listener para manejar la eliminación de pedidos */
    document.getElementById('delete-button').addEventListener('click', () => {
        const selectedOrders = document.querySelectorAll('.select-order:checked');
        const orderIdsToDelete = Array.from(selectedOrders).map(input => input.dataset.id);

        if (orderIdsToDelete.length > 0) {
            deletePedido(orderIdsToDelete);
        } else {
            alert('Seleccione al menos un pedido para eliminar.');
        }
    });



    // Inicializar la lista de pedidos al cargar la página
    fetchPedidos();
});
