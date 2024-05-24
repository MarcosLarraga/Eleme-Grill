/*cerrar ventana*/
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

const urlEmployees = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTOS.FIND_ALL';

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