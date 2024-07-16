export function handleSubmit(formData, errors, router) {
  // Limpiar errores
  Object.keys(errors).forEach(key => errors[key] = '');

  let isValid = true;

  // Validar nombre
  const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/;
  if (formData.name.trim() === '') {
    errors.name = 'El nombre es obligatorio.';
    isValid = false;
  } else if (!nameRegex.test(formData.name.trim())) {
    errors.name = 'El nombre no puede contener números.';
    isValid = false;
  }

  // Validar apellido
  const surnameRegex = /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/;
  if (formData.surname.trim() === '') {
    errors.surname = 'El apellido es obligatorio.';
    isValid = false;
  } else if (!surnameRegex.test(formData.surname.trim())) {
    errors.surname = 'El apellido no puede contener números.';
    isValid = false;
  }

  // Validar correo electrónico
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (formData.email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio.';
    isValid = false;
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'El correo electrónico no es válido.';
    isValid = false;
  }

  // Validar contraseña
  if (formData.password.trim() === '') {
    errors.password = 'La contraseña es obligatoria.';
    isValid = false;
  }

  // Confirmar contraseña
  if (formData.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Confirmar contraseña es obligatorio.';
    isValid = false;
  } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
    isValid = false;
  }

  // Si todos los campos son válidos, guardar en localStorage y redirigir
  if (isValid) {
    // Recuperar datos actuales
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el correo electrónico ya está registrado
    if (users.some(user => user.email === formData.email.trim())) {
      errors.email = 'El correo electrónico ya está registrado.';
      return;
    }

    // Agregar nuevo usuario
    users.push({
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password
    });

    // Guardar los datos en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirigir al inicio de sesión
    router.push('/inicio');
  }
}
