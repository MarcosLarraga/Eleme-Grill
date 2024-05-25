const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

const urlEmployees = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.FIND_ALL';

const fetchEmployees = async () => {
    try {
        const result = await fetch(urlEmployees);
        const data = await result.json();
        console.log('Estos son los empleados que hay en la API:', data);
        printEmployees(data);
    } catch (error) {
        console.log('Error al extraer datos con la API', error);
    }
};

const printEmployees = (employees) => {
    const table = document.getElementById('tabla-empleados');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    employees.forEach(employee => {
        const {
            CL_CLIENTE_ID,
            CL_NOMBRE,
            CL_APELLIDO,
            CL_DIRECCION,
            CL_TELEFONO,
            CL_EMAIL,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="checkbox" class="select-client" data-id="${CL_CLIENTE_ID}"></td>
            <td>${CL_CLIENTE_ID}</td>
            <td>${CL_NOMBRE}</td>
            <td>${CL_APELLIDO}</td>
            <td>${CL_DIRECCION}</td>
            <td>${CL_TELEFONO}</td>
            <td>${CL_EMAIL}</td>
        `;
        tbody.appendChild(row);
    });
};

fetchEmployees();

const addClient = async (client) => {
    const urlAddClient = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD';
    
    try {
        let Cliente = {
            CL_CLIENTE_ID : "1",
            CL_NOMBRE : "Pepa",
            CL_APELLIDO : "Lópeza",
            CL_DIRECCIÓN : "Calle Barranca 69",
            CL_FE_NACIMIENTO : "01/01/1975",
            CL_TELÉFONO : "33-33",
            CL_EMAIL : "la33vallegar@alonsojodete.ya"    
        }
        
        const response = await fetch(urlAddClient, {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cliente)
        });
        console.log(response)
        
        if (!response.ok) {
            throw new Error('Error al añadir cliente');
        }
        
        const data = await response.json();
        console.log('Cliente añadido:', data);
        
        fetchEmployees();
    } catch (error) {
        console.log('Error al añadir cliente:', error);
    }
};

const deleteClient = async (clientIds) => {
    Array.from(clientIds).forEach(clientId => {
        const urlDeleteClient = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.DELETE&CL_CLIENTE_ID=${clientId}`;

        try {
            const response = fetch(urlDeleteClient, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'CL_CLIENTE_ID': JSON.stringify(clientId) // Enviar un array de IDs en formato JSON
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al eliminar cliente');
            }
    
            console.log(`Clientes con IDs ${clientId.join(', ')} eliminados`);
            
            fetchEmployees();
        } catch (error) {
            console.log('Error al eliminar cliente:', error);
        }
    })

};

// Mostrar el formulario de añadir cliente
document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
});

// Manejar el envío del formulario
document.getElementById('client-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newClient = {
        CL_NOMBRE: document.getElementById('nombre').value,
        CL_APELLIDO: document.getElementById('apellido').value,
        CL_DIRECCION: document.getElementById('direccion').value,
        CL_TELEFONO: document.getElementById('telefono').value,
        CL_EMAIL: document.getElementById('email').value,
        CL_CONTRASENA: document.getElementById('contrasena').value
    };
    
    addClient(newClient);
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('client-form').reset();
});

// Manejar eliminación de cliente
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedClients = document.querySelectorAll('.select-client:checked');
    const clientIdsToDelete = Array.from(selectedClients).map(input => input.dataset.id);
    
    if (clientIdsToDelete.length > 0) {
        deleteClient(clientIdsToDelete);
    } else {
        alert('Seleccione al menos un cliente para eliminar.');
    }
});
