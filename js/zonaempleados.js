/*cerrar ventana*/
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}
/*empleados*/ 
const urlEmployees = '';

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
    const table = document.getElementById('tabla-empleados');
    const tbody = table.querySelector('tbody');
    table.style.display= 'table';

    employees.forEach(employee => {
        const {
            
        } =employee;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>  </td>
        <td>  </td>
        <td>  </td>
        <td>  </td>
        <td>  </td>
        <td>  </td>
        <td>  </td>
        `;
        tbody.appendChild(row);
    })
}
fetchEmployees();