document.addEventListener('DOMContentLoaded', function () {
    const orderDetails = document.getElementById('order-details');
    const orderTotal = document.getElementById('order-total');
    let empleados = [];
    let lastClientId = 0; // Initialize lastClientId to a default value
    let lastOrderId = 0;  // Initialize lastOrderId to a default value

    function loadOrderSummary() {
        // Cargar los detalles del pedido desde el almacenamiento local
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        const totalAmount = localStorage.getItem('totalAmount');

        // Verificar si hay datos en el carrito y el monto total
        if (cartData && totalAmount) {
            // Iterar sobre los elementos del carrito y crear filas de tabla para cada uno
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
            // Establecer el total del pedido
            orderTotal.textContent = totalAmount;
        }
    }

    /* Función para encontrar todos los clientes */
    const fetchClientes = async () => {
        const urlClientes = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.FIND_ALL';
        
        try {
            const result = await fetch(urlClientes);
            const data = await result.json();
            console.log('Estos son los clientes que hay en la API:', data);
            
            // Obtener el último ID de cliente
            if (data.length > 0) {
                lastClientId = Math.max(...data.map(cliente => parseInt(cliente.CL_CLIENTE_ID, 10)));
            } else {
                lastClientId = 0;
            }
        } catch (error) {
            console.log('Error al extraer datos con la API', error);
        }
    };

    /* Función para encontrar todos los empleados */
    const fetchEmpleados = async () => {
        const urlEmpleados = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.FIND_ALL';
        
        try {
            const result = await fetch(urlEmpleados);
            const data = await result.json();
            console.log('Estos son los empleados que hay en la API:', data);
            empleados = data; // Almacenar empleados para uso posterior
        } catch (error) {
            console.log('Error al extraer datos con la API', error);
        }
    };

    /* Función para obtener el último ID de pedido */
    const fetchLastOrderId = async () => {
        const urlPedidos = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PEDIDO.FIND_ALL';
        
        try {
            const result = await fetch(urlPedidos);
            const data = await result.json();
            console.log('Estos son los pedidos que hay en la API:', data);
            
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

    /* Función para agregar un cliente */
    const addClient = async () => {
        const newNombre = document.getElementById('nombre').value.trim();
        const newApellido = document.getElementById('apellido').value.trim();
        const newDireccion = document.getElementById('direccion').value.trim();
        const newTelefono = document.getElementById('telefono').value.trim();
        const newEmail = document.getElementById('email').value.trim();
        const newContrasena = document.getElementById('contrasena').value.trim();
        
        if (newNombre && newApellido && newDireccion && newTelefono && newEmail && newContrasena) {
            const newId = lastClientId + 1; // Usar lastClientId correctamente definido
            const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD`;
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        CL_CLIENTE_ID: newId,
                        CL_NOMBRE: newNombre,
                        CL_APELLIDO: newApellido,
                        CL_DIRECCION: newDireccion,
                        CL_TELEFONO: newTelefono,
                        CL_EMAIL: newEmail,
                        CL_CONTRASENA: newContrasena
                    })
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Cliente añadido:', data);
                    lastClientId = newId; // Actualizar el último ID
                    fetchClientes(); // Actualizar la lista de clientes después de agregar uno nuevo
                } else {
                    console.error('Error al añadir el cliente.');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        } else {
            alert('Todos los campos son obligatorios.');
        }
    };

    /* Función para crear un pedido */
    const createOrder = async (clientId) => {
        if (empleados.length === 0) {
            alert('No hay empleados disponibles para asignar al pedido.');
            return;
        }

        const randomEmployee = empleados[Math.floor(Math.random() * empleados.length)];
        const currentDate = new Date().toISOString();
        const newOrderId = lastOrderId + 1; // Incrementar el ID del pedido

        const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=PEDIDO.ADD`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    PE_PEDIDO_ID: newOrderId,
                    PE_CLIENTE_ID: clientId + 1,
                    PE_EMPLEADO_ID: randomEmployee.EM_EMPLEADO_ID,
                    PE_FECHAPEDIDO: currentDate
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Pedido creado:', data);
                alert('Pedido realizado con éxito.');
                lastOrderId = newOrderId; // Actualizar el último ID de pedido
            } else {
                console.error('Error al crear el pedido.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };


    


    /* Event listener para mostrar el formulario de agregar cliente */
    document.getElementById('add-button').addEventListener('click', () => {
        document.getElementById('add-form').style.display = 'block';
    });

    /* Event listener para manejar el envío del formulario de cliente */
    document.getElementById('client-form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        addClient();
        document.getElementById('add-form').style.display = 'none';
        document.getElementById('client-form').reset();
    });

    /* Event listener para manejar la finalización de la compra */
    document.querySelector('button[type="submit"]').addEventListener('click', async () => {
        // Asumiendo que el cliente acaba de ser agregado y es el último en la lista
        await fetchLastOrderId(); // Obtener el último ID de pedido
        await createOrder(lastClientId);
    });

    // Al cargar el DOM, obtener y mostrar los clientes y cargar el resumen del pedido
    fetchClientes();
    fetchEmpleados(); // Obtener la lista de empleados al cargar la página
    loadOrderSummary();
});
