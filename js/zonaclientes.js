let lastClientId = 0; // Definir lastClientId al inicio

/* Función para cerrar ventana */
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

/* Función para encontrar todos los clientes */
const fetchClientes = async () => {
    const urlClientes = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.FIND_ALL';
    
    try {
        const result = await fetch(urlClientes);
        const data = await result.json();
        console.log('Estos son los clientes que hay en la API:', data);
        printClientes(data); // Imprimir los clientes en la tabla HTML
        
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

/* Función para imprimir los clientes en una tabla */
const printClientes = (clientes) => {
    const table = document.getElementById('tabla-clientes');
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
}

/* Función para agregar un cliente */
const addCliente = async () => {
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

/* Función para eliminar un cliente */
const deleteCliente = async (clientIds) => {
    for (const clientId of clientIds) {
        const urlDeleteCliente = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.DELETE&CL_CLIENTE_ID=${clientId}`;

        try {
            const response = await fetch(urlDeleteCliente, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                console.log(`Cliente con ID ${clientId} eliminado`);
                fetchClientes(); // Actualizar la lista de clientes después de eliminar uno
            } else {
                throw new Error('Error al eliminar cliente');
            }
        } catch (error) {
            console.log('Error al eliminar cliente:', error);
        }
    }
};

/* Función para actualizar un cliente */
const updateCliente = async (clientId, updatedData) => {
    const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.UPDATE&CL_CLIENTE_ID=${clientId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar cliente');
        }

        console.log(`Cliente con ID ${clientId} actualizado`);
        fetchClientes(); // Actualizar la lista de clientes después de actualizar uno
    } catch (error) {
        console.log('Error al actualizar cliente:', error);
    }
};

/* Event listener para mostrar el formulario de agregar cliente */
document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
    document.getElementById('update-form').style.display = 'none';
});

/* Event listener para manejar el envío del formulario de cliente */
document.getElementById('client-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    addCliente();
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('client-form').reset();
});

/* Event listener para manejar la eliminación de clientes */
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedClients = document.querySelectorAll('.select-client:checked');
    const clientIdsToDelete = Array.from(selectedClients).map(input => input.dataset.id);
    
    if (clientIdsToDelete.length > 0) {
        deleteCliente(clientIdsToDelete);
    } else {
        alert('Seleccione al menos un cliente para eliminar.');
    }
});

/* Event listener para mostrar el formulario de actualizar cliente */
document.getElementById('update-button').addEventListener('click', () => {
    const selectedClients = document.querySelectorAll('.select-client:checked');

    if (selectedClients.length === 1) {
        const clientId = selectedClients[0].dataset.id;
        const clientRow = selectedClients[0].closest('tr').children;

        document.getElementById('update-nombre').value = clientRow[2].innerText;
        document.getElementById('update-apellido').value = clientRow[3].innerText;
        document.getElementById('update-direccion').value = clientRow[4].innerText;
        document.getElementById('update-telefono').value = clientRow[5].innerText;
        document.getElementById('update-email').value = clientRow[6].innerText;
        document.getElementById('update-contrasena').value = clientRow[7].innerText;

        document.getElementById('update-form').style.display = 'block';
        document.getElementById('add-form').style.display = 'none';

        document.getElementById('update-client-form').addEventListener('submit', (event) => {
            event.preventDefault();

            const updatedData = {
                CL_CLIENTE_ID: clientId,
                CL_NOMBRE: document.getElementById('update-nombre').value.trim(),
                CL_APELLIDO: document.getElementById('update-apellido').value.trim(),
                CL_DIRECCION: document.getElementById('update-direccion').value.trim(),
                CL_TELEFONO: document.getElementById('update-telefono').value.trim(),
                CL_EMAIL: document.getElementById('update-email').value.trim(),
                CL_CONTRASENA: document.getElementById('update-contrasena').value.trim()
            };

            updateCliente(clientId, updatedData);
            document.getElementById('update-form').style.display = 'none';
            document.getElementById('update-client-form').reset();
        }, { once: true }); // Asegurar que el event listener solo se ejecute una vez
    } else {
        alert('Seleccione un cliente para actualizar.');
    }
});

// Al cargar el DOM, obtener y mostrar los clientes
document.addEventListener('DOMContentLoaded', fetchClientes);
