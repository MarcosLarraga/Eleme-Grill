const closeButton = document.getElementsByClassName('close-btn')[0];
        
        closeButton.onclick = function() {
            window.location.href = '../h'; // Redirige al usuario a la página principal o donde desees
        }

        document.getElementById('formAcceso').onsubmit = function(event) {
            event.preventDefault();
            const email = document.getElementById('userEmail').value;
            const password = document.getElementById('userPassword').value;
            const correctEmailAdmin = 'admin@gmail.com'; // Correo del administrador
            const correctPasswordAdmin = 'admin123'; // Contraseña del administrador
            const correctEmailEmpleado = 'empleadoBV@gmail.com'; // Correo del empleado
            const correctPasswordEmpleado = '1234'; // Contraseña del empleado
        
            if (email === correctEmailAdmin && password === correctPasswordAdmin) {
                window.location.href = 'zona_privada.html'; // Redirige a la página de administrador
            } else if (email === correctEmailEmpleado && password === correctPasswordEmpleado) {
                window.location.href = 'zona_privada_empleados.html'; // Redirige a la página de empleado
            } else {
                alert('Acceso denegado.');
            }
        }