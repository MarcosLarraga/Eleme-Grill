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
            PR_PRODUCTO_ID,
            PR_NOMBRE,
            PR_PRECIO,
            PR_CATEGORIA_ID,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${PR_PRODUCTO_ID}</td>
        <td>${PR_NOMBRE}</td>
        <td>${PR_PRECIO}</td>
        <td>${PR_CATEGORIA_ID}</td>
        `;
        tbody.appendChild(row);
    });
};