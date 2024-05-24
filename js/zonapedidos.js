/*cerrar ventana*/
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

const urlEmployees = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PEDIDOS.FIND_ALL';

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
            PE_PEDIDO_ID,
            PE_CLIENTE_ID,
            PE_PAGO_ID,
            PE_EMPLEADO_ID,
            PE_FECHAPEDIDO,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${PE_PEDIDO_ID}</td>
        <td>${PE_CLIENTE_ID}</td>
        <td>${PE_PAGO_ID}</td>
        <td>${PE_EMPLEADO_ID}</td>
        <td>${PE_FECHAPEDIDO}</td>
        `;
        tbody.appendChild(row);
    });
};