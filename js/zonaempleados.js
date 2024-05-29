let lastClientId = 0; // Definir lastClientId al inicio

/* Función para cerrar ventana */
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

/* Función para encontrar todos los clientes */
const fetchClientes = async () => {
    const urlClientes = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.FIND_ALL';
    
    try {
        const result = await fetch(urlClientes);
        const data = await result.json();
        console.log('Estos son los clientes que hay en la API:', data);
        printClientes(data); // Imprimir los clientes en la tabla HTML
        
        // Obtener el último ID de cliente
        if (data.length > 0) {
            lastClientId = Math.max(...data.map(cliente => parseInt(cliente.EM_EMPLEADO_ID, 10)));
        } else {
            lastClientId = 0;
        }
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
            EM_EMPLEADO_ID,
            EM_NOMBRE,
            EM_APELLIDO,
            EM_DIRECCION,
            EM_TELEFONO,
            EM_EMAIL,
        } = cliente;

        const row = document.createElement('tr');

        row.innerHTML = `
        <td><input type="checkbox" class="select-employee" data-id="${EM_EMPLEADO_ID}"></td>
        <td>${EM_EMPLEADO_ID}</td>
        <td>${EM_NOMBRE}</td>
        <td>${EM_APELLIDO}</td>
        <td>${EM_DIRECCION}</td>
        <td>${EM_TELEFONO}</td>
        <td>${EM_EMAIL}</td>
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
    
    if (newNombre && newApellido && newDireccion && newTelefono && newEmail ) {
        const newId = lastClientId + 1; // Usar lastClientId correctamente definido
        const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.ADD`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    EM_EMPLEADO_ID: newId,
                    EM_NOMBRE: newNombre,
                    EM_APELLIDO: newApellido,
                    EM_DIRECCION: newDireccion,
                    EM_TELEFONO: newTelefono,
                    EM_EMAIL: newEmail,
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
    fetchClientes();
};


/* Función para eliminar un cliente */
const deleteClient = async (clientIds) => {
    for (const clientId of clientIds) {
        const urlDeleteClient = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.DELETE&EM_EMPLEADO_ID=${clientId}`; // Corregido de CLIENTE.DELETE a EMPLEADO.DELETE

        try {
            const response = await fetch(urlDeleteClient, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                console.log(`Empleado con ID ${clientId} eliminado`);
                fetchClientes(); // Actualizar la lista de empleados después de eliminar uno
            } else {
                throw new Error('Error al eliminar empleado');
            }
        } catch (error) {
            console.log('Error al eliminar empleado:', error);
        }
    }
};



/* Event listener para mostrar el formulario de agregar cliente */
document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
});

/* Event listener para manejar el envío del formulario de cliente */
document.getElementById('employee-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    addClient();
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('employee-form').reset();
});

//* Event listener para manejar la eliminación de clientes */
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedEmployees = document.querySelectorAll('.select-employee:checked'); // Cambiado de '.select-client' a '.select-employee'
    const employeeIdsToDelete = Array.from(selectedEmployees).map(input => input.dataset.id);
    
    if (employeeIdsToDelete.length > 0) {
        deleteClient(employeeIdsToDelete);
    } else {
        alert('Seleccione al menos un empleado para eliminar.');
    }
});

/* Función para actualizar un cliente */
const updateEmpleado = async (clientId, updatedData) => {
    const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.UPDATE&EM_EMPLEADO_ID=${clientId}`;

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




/* Event listener para mostrar el formulario de actualizar cliente */
document.getElementById('update-button').addEventListener('click', () => {
    const selectedEmployees = document.querySelectorAll('.select-employee:checked');

    if (selectedEmployees.length === 1) {
        const employeeId = selectedEmployees[0].dataset.id;
        const employeeRow = selectedEmployees[0].closest('tr').children;

        document.getElementById('update-nombre').value = employeeRow[2].innerText;
        document.getElementById('update-apellido').value = employeeRow[3].innerText;
        document.getElementById('update-direccion').value = employeeRow[4].innerText;
        document.getElementById('update-telefono').value = employeeRow[5].innerText;
        document.getElementById('update-email').value = employeeRow[6].innerText;

        document.getElementById('update-form').style.display = 'block';
        document.getElementById('add-form').style.display = 'none';

        document.getElementById('update-client-form').addEventListener('submit', (event) => {
            event.preventDefault();

            const updatedData = {
                EM_EMPLEADO_ID: employeeId,
                EM_NOMBRE: document.getElementById('update-nombre').value.trim(),
                EM_APELLIDO: document.getElementById('update-apellido').value.trim(),
                EM_DIRECCION: document.getElementById('update-direccion').value.trim(),
                EM_TELEFONO: document.getElementById('update-telefono').value.trim(),
                EM_EMAIL: document.getElementById('update-email').value.trim(),
            };

            updateEmpleado(employeeId, updatedData); // Llama a la función updateEmpleado
            document.getElementById('update-form').style.display = 'none';
            document.getElementById('update-client-form').reset();
        }, { once: true }); // Asegurar que el event listener solo se ejecute una vez
    } else {
        alert('Seleccione un empleado para actualizar.');
    }
});



// Al cargar el DOM, obtener y mostrar los clientes
document.addEventListener('DOMContentLoaded', fetchClientes);

