const closeButton = document.getElementsByClassName('close-btn')[0];
        
        closeButton.onclick = function() {
            window.location.href = 'home.html'; // Redirige al usuario a la página principal o donde desees
        }

        document.getElementById('formAcceso').onsubmit = function(event) {
            event.preventDefault();
            const email = document.getElementById('userEmail').value;
            const password = document.getElementById('userPassword').value;
            const correctEmailAdmin = 'admin@gmail.com'; // Correo del administrador
            const correctPasswordAdmin = 'admin123'; // Contraseña del administrador
        
            if (email === correctEmailAdmin && password === correctPasswordAdmin) {
                window.location.href = 'zona_privada.html'; // Redirige a la página de administrador
            } else {
                alert('Acceso denegado.');
            }
        }