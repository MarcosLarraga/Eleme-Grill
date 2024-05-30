const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'home.html';
}

document.getElementById('formAcceso').onsubmit = function (evento) {
    evento.preventDefault();
    const correo = document.getElementById('userEmail').value;
    const contrasena = document.getElementById('userPassword').value;
    const correoCorrectoAdmin = 'eleme@gmail.com';
    const contrasenaCorrectaAdmin = 'eleme';

    if (correo === correoCorrectoAdmin && contrasena === contrasenaCorrectaAdmin) {
        window.location.href = 'zonaprivada.html';
    } else {
        alert('Acceso denegado.');
    }
}