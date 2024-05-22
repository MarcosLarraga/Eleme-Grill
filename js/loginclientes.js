document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');


    signInBtn.onclick = function () {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInBtn.classList.add('active');
        signUpBtn.classList.remove('active');
    };
    
    signUpBtn.onclick = function () {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        signUpBtn.classList.add('active');
        signInBtn.classList.remove('active');
    };

    closeBtn.onclick = function () {
        window.location.href = 'home.html';
    };

    // Sign In
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

    // Sign Up
    signUpForm.onsubmit = function (evento) {
        evento.preventDefault();
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const newUser = {
            name: name,
            email: email,
            password: password,
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
