let lastClientId = 0; // Definir lastClientId al inicio

/* Función para cerrar ventana */
const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'zonaprivada.html';
}

/* Función para encontrar todos los productos */
const fetchClientes = async () => {
    const urlClientes = 'http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.FIND_ALL';
    
    try {
        const result = await fetch(urlClientes);
        const data = await result.json();
        console.log('Estos son los productos que hay en la API:', data);
        printClientes(data); // Imprimir los productos en la tabla HTML
        
        // Obtener el último ID de producto
        if (data.length > 0) {
            lastClientId = Math.max(...data.map(producto => parseInt(producto.PR_PRODUCTO_ID, 10)));
        } else {
            lastClientId = 0;
        }
    } catch (error) {
        console.log('Error al extraer datos con la API', error);
    }
};

/* Función para imprimir los productos en una tabla */
const printClientes = (productos) => {
    const table = document.getElementById('tabla-empleados');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const {
            PR_PRODUCTO_ID,
            PR_NOMBRE,
            PR_PRECIO,
            PR_CATEGORIA_ID,
        } = producto;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="checkbox" class="select-product" data-id="${PR_PRODUCTO_ID}"></td>
            <td>${PR_PRODUCTO_ID}</td>
            <td>${PR_NOMBRE}</td>
            <td>${PR_PRECIO}</td>
            <td>${PR_CATEGORIA_ID}</td>
        `;
        tbody.appendChild(row);
    });
}

/* Función para agregar un producto */
const addClient = async () => {
    const newNombre = document.getElementById('nombre').value.trim();
    const newPrecio = document.getElementById('precio').value.trim();
    const newCategoria = document.getElementById('categoria').value.trim();
    
    if (newNombre && newPrecio && newCategoria) {
        const newId = lastClientId + 1; // Usar lastClientId correctamente definido
        const url = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.ADD`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    PR_PRODUCTO_ID: newId,
                    PR_NOMBRE: newNombre,
                    PR_PRECIO: newPrecio,
                    PR_CATEGORIA_ID: newCategoria
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Producto añadido:', data);
                lastClientId = newId; // Actualizar el último ID
                fetchClientes(); // Actualizar la lista de productos después de agregar uno nuevo
            } else {
                console.error('Error al añadir el producto.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    } else {
        alert('Todos los campos son obligatorios.');
    }
    fetchClientes();
};

/* Función para eliminar un producto */
const deleteClient = async (productIds) => {
    for (const productId of productIds) {
        const urlDeleteClient = `http://localhost:8080/ELEME-GRILL/Controller?ACTION=PRODUCTO.DELETE&PR_PRODUCTO_ID=${productId}`;

        try {
            const response = await fetch(urlDeleteClient, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                console.log(`Producto con ID ${productId} eliminado`);
                fetchClientes(); // Actualizar la lista de productos después de eliminar uno
            } else {
                throw new Error('Error al eliminar producto');
            }
        } catch (error) {
            console.log('Error al eliminar producto:', error);
        }
    }
};

/* Event listener para mostrar el formulario de agregar producto */
document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-form').style.display = 'block';
});

/* Event listener para manejar el envío del formulario de producto */
document.getElementById('client-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    addClient();
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('client-form').reset();
});

/* Event listener para manejar la eliminación de productos */
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedProducts = document.querySelectorAll('.select-product:checked');
    const productIdsToDelete = Array.from(selectedProducts).map(input => input.dataset.id);
    
    if (productIdsToDelete.length > 0) {
        deleteClient(productIdsToDelete);
    } else {
        alert('Seleccione al menos un producto para eliminar.');
    }
});

// Al cargar el DOM, obtener y mostrar los productos
document.addEventListener('DOMContentLoaded', fetchClientes);
