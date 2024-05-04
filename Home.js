function cambiarIdioma(idioma) {
    if (idioma === 'es') {
        window.location.href = 'home.html'; 
    } else if (idioma === 'en') {
        window.location.href = 'home_ingles.html';
    }
}

document.getElementById('Espanol').addEventListener('click', function() {
    cambiarIdioma('es');
});

document.getElementById('Ingles').addEventListener('click', function() {
    cambiarIdioma('en');
});
