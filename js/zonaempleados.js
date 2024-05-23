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
        document.getElementById('content').textContent = 'Failed to load content';
    }
}

const printEmployees = (employees) => {
    const table = document.getElementById('tablaEmpleados');
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