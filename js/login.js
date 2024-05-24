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

    let Cliente = {
        CL_CLIENTE_ID : "1",
        CL_NOMBRE : "Pepa",
        CL_APELLIDO : "Lópeza",
        CL_DIRECCIÓN : "Calle Barranca 69",
        CL_FE_NACIMIENTO : "01/01/1975",
        CL_TELÉFONO : "33-33",
        CL_EMAIL : "la33vallegar@alonsojodete.ya"    
    }
    const url = "http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD";
    fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(Cliente), // data can be `string` or {object}!        
      }).then(function (response) {
        alert (response.json());
        return response.json();
      }); 
}