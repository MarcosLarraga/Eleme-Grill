/*cerrar ventana*/
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
            CL_CONTRASENA,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
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

fetchEmployees();

const addClient = async (client) => {
    const urlAddClient = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD';
    
    try {
        const response = await fetch(urlAddClient, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });
        
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

const deleteClient = async (clientId) => {
    const urlDeleteClient = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.DELETE&ID=${clientId}`;
    
    try {
        const response = await fetch(urlDeleteClient, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar cliente');
        }
        
        console.log(`Cliente con ID ${clientId} eliminado`);
        
        fetchEmployees();
    } catch (error) {
        console.log('Error al eliminar cliente:', error);
    }
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
    const clientIdToDelete = prompt('Ingrese el ID del cliente a eliminar:');
    if (clientIdToDelete) {
        deleteClient(clientIdToDelete);
    }
});