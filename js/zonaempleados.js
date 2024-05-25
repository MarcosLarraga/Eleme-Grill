/*cerrar ventana*/
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

/*empleados*/ 
const urlEmployees = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=EMPLEADO.FIND_ALL';

const fetchEmployees = async ()=> {
    try{
        const result = await fetch(urlEmployees);
        const data = await result.json();
        console.log('Estos son los empleados que hay en la API:', data);
        printEmployees(data);
    }catch(error){
        console.log('Error al extraer datos con la API', error);
        
    }
}

const printEmployees = (employees) => {
    const table = document.getElementById('tabla-empleados');
    const tbody = table.querySelector('tbody');
    table.style.display= 'table';

    employees.forEach(employee => {
        const {
            EM_EMPLEADO_ID,
            EM_NOMBRE,
            EM_APELLIDO,
            EM_DIRECCION,
            EM_TELEFONO,
            EM_EMAIL,
            EM_ZONA_PRIVADA_ID,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${EM_EMPLEADO_ID}</td>
        <td>${EM_NOMBRE}</td>
        <td>${EM_APELLIDO}</td>
        <td>${EM_DIRECCION}</td>
        <td>${EM_TELEFONO}</td>
        <td>${EM_EMAIL}</td>
        <td>${EM_ZONA_PRIVADA_ID}</td>
        `;
        tbody.appendChild(row);
    })
}
fetchEmployees();

const addEmployee = async (employee) => {
    const urlAddClient = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD';
    
    try {
        let Employee = {
            EM_CLIENTE_ID : "1",
            EM_NOMBRE : "Pepa",
            EM_APELLIDO : "Lópeza",
            EM_DIRECCIÓN : "Calle Barranca 69",
            EM_FE_NACIMIENTO : "01/01/1975",
            EM_TELÉFONO : "33-33",
            EM_EMAIL : "la33vallegar@alonsojodete.ya"    
        }
        
        const response = await fetch(urlAddEmployee, {
            method: 'POST',
            cors: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Employee)
        });
        console.log(response)
        
        if (!response.ok) {
            throw new Error('Error al añadir cliente');
        }
        
        const data = await response.json();
        console.log('Empleado añadido:', data);
        
        fetchEmployees();
    } catch (error) {
        console.log('Error al añadir empleado:', error);
    }
};

const deleteEmployee = async (employeeIds) => {
    Array.from(employeeIds).forEach(employeeId => {
        const urlDeleteEmployee = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.DELETE&CL_CLIENTE_ID=${clientId}`;

        try {
            const response = fetch(urlDeleteEmployee, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'EM_EMPLEADO_ID': JSON.stringify(employeeId)
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al eliminar empleado');
            }
    
            console.log(`Empleados con IDs ${employeeId.join(', ')} eliminados`);
            
            fetchEmployees();
        } catch (error) {
            console.log('Error al eliminar empleado:', error);
        }
    })

};

// Mostrar el formulario de añadir cliente
document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
});

// Manejar el envío del formulario
document.getElementById('employee-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const newClient = {
        EM_NOMBRE: document.getElementById('nombre').value,
        EM_APELLIDO: document.getElementById('apellido').value,
        EM_DIRECCION: document.getElementById('direccion').value,
        EM_TELEFONO: document.getElementById('telefono').value,
        EM_EMAIL: document.getElementById('email').value,
        EM_CONTRASENA: document.getElementById('contrasena').value
    };
    
    addClient(newEmployee);
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('employee-form').reset();
});

// Manejar eliminación de cliente
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedEmployees = document.querySelectorAll('.select-employee:checked');
    const employeeIdsToDelete = Array.from(selectedEmployees).map(input => input.dataset.id);
    
    if (employeeIdsToDelete.length > 0) {
        deleteEmployee(employeeIdsToDelete);
    } else {
        alert('Seleccione al menos un empleado para eliminar.');
    }
});