const botonCerrar = document.getElementsByClassName('close-btn')[0];

botonCerrar.onclick = function () {
    window.location.href = 'login.html';
}

function loadContent(type) {
    fetch(`data/${type}.json`)
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';

            if (Array.isArray(data)) {
                data.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'item';
                    itemElement.textContent = JSON.stringify(item, null, 2);
                    content.appendChild(itemElement);
                });
            } else {
                content.textContent = JSON.stringify(data, null, 2);
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById('content').textContent = 'Failed to load content';
        });
}