document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const formTitle = document.getElementById('formTitle');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');

    // Switch forms
    signInBtn.onclick = function () {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInBtn.classList.add('active');
        signUpBtn.classList.remove('active');
        formTitle.textContent = 'Sign In';
    };
    
    signUpBtn.onclick = function () {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        signUpBtn.classList.add('active');
        signInBtn.classList.remove('active');
        formTitle.textContent = 'Sign Up';
    };

    // Close button
    closeBtn.onclick = function () {
        window.location.href = 'home.html';
    };

    // Sign In form submission
    signInForm.onsubmit = function (evento) {
        evento.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        const correctEmail = 'eleme@gmail.com';
        const correctPassword = 'eleme';

        if (email === correctEmail && password === correctPassword) {
            window.location.href = 'ZonaPrivada.html';
        } else {
            alert('Access Denied.');
        }
    };

    // Sign Up form submission
    signUpForm.onsubmit = function (evento) {
        evento.preventDefault();
        const name = document.getElementById('signUpName').value;
        const surname = document.getElementById('signUpSurname').value;
        const address = document.getElementById('signUpAddress').value;
        const birthdate = document.getElementById('signUpBirthdate').value;
        const phone = document.getElementById('signUpPhone').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const newUser = {
            CL_NOMBRE: name,
            CL_APELLIDO: surname,
            CL_DIRECCIÓN: address,
            CL_FE_NACIMIENTO: birthdate,
            CL_TELÉFONO: phone,
            CL_EMAIL: email,
            CL_CONTRASEÑA: password
        };

        const url = "http://localhost:8080/ELEME-GRILL/Controller?ACTION=CLIENTE.ADD";
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => response.json())
          .then(data => {
              alert('User registered successfully');
          }).catch(error => {
              console.error('Error:', error);
          });
    };
});
