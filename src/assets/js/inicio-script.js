export function handleSubmit(email, password, errors, router) {
  errors.email = '';
  errors.password = '';
  errors.verificacion = '';
  let isValid = true;

  // Validar correo electrónico
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio.';
    isValid = false;
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'El correo electrónico no es válido.';
    isValid = false;
  }

  // Validar contraseña
  if (password.trim() === '') {
    errors.password = 'La contraseña es obligatoria.';
    isValid = false;
  }

  // Verificar credenciales en localStorage
  if (isValid) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Guardar el email en localStorage para la sesión
      localStorage.setItem('loggedInUser', email);
      router.push('/principal'); // Redirigir a la ruta principal
    } else {
      errors.verificacion = 'Correo electrónico o contraseña incorrectos.';
      isValid = false;
    }
  }
}
