<template>
  <!-- Contenedor principal para la página de registro -->
  <div id="body-register">
    <!-- Contenedor del formulario de registro -->
    <div class="main-register">

      <!-- Encabezado de la página de registro -->
      <h1 class="h1-register">
        <!-- Imagen del ícono de registro -->
        <img src="@/assets/imagenes/registro-img/6.png" class="icono-register" alt="Ícono">
        Registro de Usuario <!-- Título estático de la página de registro -->
      </h1>

      <!-- Formulario para el registro de usuario -->
      <form @submit.prevent="handleSubmit">
        <!-- Campo para el nombre del usuario -->
        <div class="form-group-register">
          <label for="name">Nombre:</label> <!-- Etiqueta para el campo del nombre -->
          <input v-model="formData.name" id="name" name="name" autofocus placeholder="Nombre" />
          <!-- Mensaje de error para el nombre -->
          <span class="error-message-register">{{ errors.name }}</span>
        </div>

        <!-- Campo para el apellido del usuario -->
        <div class="form-group-register">
          <label for="surname">Apellido:</label> <!-- Etiqueta para el campo del apellido -->
          <input v-model="formData.surname" id="surname" name="surname" placeholder="Apellido" />
          <!-- Mensaje de error para el apellido -->
          <span class="error-message-register">{{ errors.surname }}</span>
        </div>

        <!-- Campo para el correo electrónico del usuario -->
        <div class="form-group-register">
          <label for="email">Correo electrónico:</label> <!-- Etiqueta para el campo del correo electrónico -->
          <input v-model="formData.email" id="email" name="email" placeholder="Correo electrónico" />
          <!-- Mensaje de error para el correo electrónico -->
          <span class="error-message-register">{{ errors.email }}</span>
        </div>

        <!-- Campo para la contraseña del usuario -->
        <div class="form-group-register">
          <label for="password">Contraseña:</label> <!-- Etiqueta para el campo de la contraseña -->
          <input v-model="formData.password" type="password" id="password" name="password" placeholder="Contraseña" />
          <!-- Mensaje de error para la contraseña -->
          <span class="error-message-register">{{ errors.password }}</span>
        </div>

        <!-- Campo para la confirmación de la contraseña del usuario -->
        <div class="form-group-register">
          <label for="confirm-password">Confirmar Contraseña:</label>
          <!-- Etiqueta para el campo de confirmación de contraseña -->
          <input v-model="formData.confirmPassword" type="password" id="confirm-password" name="confirm-password"
            placeholder="Confirmar Contraseña" />
          <!-- Mensaje de error para la confirmación de contraseña -->
          <span class="error-message-register">{{ errors.confirmPassword }}</span>
        </div>

        <!-- Botón para enviar el formulario -->
        <button id="boton-register" type="submit">Registrarse</button>

        <!-- Enlace para redirigir a la página de inicio de sesión -->
        <div class="signup-link-register">
          Ya tienes cuenta
          <router-link to="/inicio">Iniciar Sesión</router-link>
        </div>

        <!-- Enlace para volver a la página de inicio -->
        <div class="signup-link-login">
          <a href="/">Volver al inicio</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '', // Nombre del usuario
        surname: '', // Apellido del usuario
        email: '', // Correo electrónico del usuario
        password: '', // Contraseña del usuario
        confirmPassword: '' // Confirmación de la contraseña del usuario
      },
      errors: {
        name: '', // Mensaje de error para el nombre
        surname: '', // Mensaje de error para el apellido
        email: '', // Mensaje de error para el correo electrónico
        password: '', // Mensaje de error para la contraseña
        confirmPassword: '' // Mensaje de error para la confirmación de contraseña
      }
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

      // Validar nombre
      if (!this.formData.name) {
        this.errors.name = 'El nombre es obligatorio.';
        valid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(this.formData.name)) {
        this.errors.name = 'El nombre solo puede contener letras.';
        valid = false;
      }

      // Validar apellido
      if (!this.formData.surname) {
        this.errors.surname = 'El apellido es obligatorio.';
        valid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(this.formData.surname)) {
        this.errors.surname = 'El apellido solo puede contener letras.';
        valid = false;
      }

      // Validar correo electrónico
      if (!this.formData.email) {
        this.errors.email = 'El correo electrónico es obligatorio.';
        valid = false;
      } else if (!this.validateEmail(this.formData.email)) {
        this.errors.email = 'El formato del correo electrónico es inválido.';
        valid = false;
      }

      // Validar contraseña
      if (!this.formData.password) {
        this.errors.password = 'La contraseña es obligatoria.';
        valid = false;
      } else if (this.formData.password.length > 12) {
        this.errors.password = 'La contraseña no puede tener más de 12 caracteres.';
        valid = false;
      }

      // Validar confirmación de contraseña
      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden.';
        valid = false;
      }

      return valid; // Devuelve si el formulario es válido
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
      return re.test(email); // Verifica si el correo electrónico cumple con la expresión regular
    },
    handleSubmit() {
      if (this.validateForm()) { // Valida el formulario antes de enviar
        const users = JSON.parse(localStorage.getItem('users')) || []; // Obtiene los usuarios almacenados o inicializa un array vacío
        const existingUser = users.find(u => u.email === this.formData.email); // Verifica si ya existe un usuario con el mismo correo electrónico

        if (existingUser) {
          this.errors.email = 'Ya existe una cuenta con este correo electrónico.'; // Mensaje de error si el correo electrónico ya está en uso
        } else {
          // Añade el nuevo usuario a la lista
          users.push({
            name: this.formData.name,
            surname: this.formData.surname,
            email: this.formData.email,
            password: this.formData.password
          });
          localStorage.setItem('users', JSON.stringify(users)); // Guarda la lista de usuarios en el localStorage
          this.$router.push('/inicio'); // Redirige a la página de inicio de sesión
        }
      }
    }
  }
};
</script>

<style>
@import '@/assets/css/registro-styles.css';
/* Importa los estilos específicos para la página de registro */
</style>
