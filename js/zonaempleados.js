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