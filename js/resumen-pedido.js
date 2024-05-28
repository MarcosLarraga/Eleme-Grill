let lastClientId = 0; // Initialize lastClientId to a default value

document.addEventListener('DOMContentLoaded', function () {
    const orderDetails = document.getElementById('order-details');
    const orderTotal = document.getElementById('order-total');

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
         //   printClientes(data); // Imprimir los clientes en la tabla HTML
       
        } catch (error) {
            console.log('Error al extraer datos con la API', error);
        }
    };
    
    /* Función para imprimir los clientes en una tabla */
    const printClientes = (clientes) => {
        const table = document.getElementById('tabla-empleados');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
    

        clientes.forEach(cliente => {
            const {
                CL_CLIENTE_ID,
                CL_NOMBRE,
                CL_APELLIDO,
                CL_DIRECCION,
                CL_TELEFONO,
                CL_EMAIL,
                CL_CONTRASENA
            } = cliente;
    
            const row = document.createElement('tr');
    
            row.innerHTML = `
                <td><input type="checkbox" class="select-client" data-id="${CL_CLIENTE_ID}"></td>
                <td>${CL_CLIENTE_ID}</td>
                <td>${CL_NOMBRE}</td>
                <td>${CL_APELLIDO}</td>
                <td>${CL_DIRECCION}</td>
                <td>${CL_TELEFONO}</td>
                <td>${CL_EMAIL}</td>
                <td>${CL_CONTRASENA}</td>
            `;
            tbody.appendChild(row);
        });
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
    
    // Al cargar el DOM, obtener y mostrar los clientes y cargar el resumen del pedido
    fetchClientes();
    loadOrderSummary();
});
