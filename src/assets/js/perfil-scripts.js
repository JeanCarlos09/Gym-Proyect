



function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}


document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm('profile-form');
});

document.getElementById('phone-form').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm('phone-form');
});

document.getElementById('address-form').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm('address-form');
});

function validateForm(formId) {
    const form = document.getElementById(formId);
    let isValid = true;

    form.querySelectorAll('input').forEach(input => {
        const errorElement = input.nextElementSibling;
        if (input.value.trim() === '') {
            errorElement.textContent = 'Este campo es obligatorio.';
            errorElement.style.display = 'block';
            isValid = false;
        } else {
            errorElement.style.display = 'none';
        }
    });

    if (isValid) {
        alert('Formulario guardado exitosamente');
    }
}

window.onload = function() {
    showSection('info-section'); // Muestra la sección de información personal por defecto
};
