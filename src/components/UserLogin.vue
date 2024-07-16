<template>
  <!-- Contenedor principal de la página de inicio de sesión -->
  <div id="body-login">
    <!-- Contenedor principal de la vista de inicio de sesión -->
    <div class="main-login" id="app">

      <!-- Encabezado de la página de inicio de sesión -->
      <h1 class="h1-login">
        <!-- Imagen del logo que se carga dinámicamente -->
        <img :src="logoSrc" class="icono-login" alt="Icono de inicio">
        <!-- Título de la página, cargado desde la configuración -->
        {{ config.title }}
      </h1>

      <!-- Contenedor para mostrar mensajes de error de verificación -->
      <div class="error-verificacion">
        <!-- Mensaje de error de verificación, si existe -->
        <span class="error-message-verificacion">{{ errors.verificacion }}</span>
      </div>

      <!-- Formulario de inicio de sesión -->
      <form @submit.prevent="handleSubmit">

        <!-- Iteración sobre los campos de formulario definidos en la configuración -->
        <div v-for="(field, index) in config.fields" :key="index" class="form-group-login">
          <!-- Etiqueta del campo de formulario -->
          <label :for="field.model">{{ field.label }}</label>
          <!-- Campo de entrada del formulario -->
          <input v-model="formData[field.model]" :id="field.model" :name="field.model" :type="field.type"
            :placeholder="field.placeholder" autofocus />
          <!-- Mensaje de error específico para el campo -->
          <span class="error-message-login">{{ errors[field.model] }}</span>
        </div>

        <!-- Opciones adicionales del formulario -->
        <div class="options-login">
          <!-- Enlace para recuperar la contraseña -->
          <a :href="config.passwordLink.href" class="password-link-login">{{ config.passwordLink.text }}</a>
        </div>

        <!-- Botón de envío del formulario -->
        <button :id="config.button.id" :type="config.button.type">
          {{ config.button.text }}
        </button>

        <!-- Enlace para registrarse -->
        <div class="signup-link-login">
          {{ config.signUpLink.text }} <router-link :to="config.signUpLink.href">{{ config.signUpLink.linkText
            }}</router-link>
        </div>

        <!-- Enlace para volver -->
        <div class="signup-link-login">
          <a :href="config.returnLink.href">{{ config.returnLink.text }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import config from '@/assets/json/login.json'; // Importar configuración de campos y textos de inicio de sesión
import logo from '@/assets/imagenes/inicio-img/6.png'; // Importar la imagen del logo

export default {
  data() {
    return {
      config, // Configuración cargada del archivo JSON
      logoSrc: logo, // Fuente de la imagen del logo
      formData: {
        email: '', // Datos del formulario, incluyendo email y contraseña
        password: ''
      },
      errors: {
        email: '', // Errores específicos para email y contraseña
        password: '',
        verificacion: ''
      }
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = { // Reiniciar errores antes de la validación
        email: '',
        password: '',
        verificacion: ''
      };

      // Validar el campo de email
      if (!this.formData.email) {
        this.errors.email = 'El correo electrónico es obligatorio.';
        valid = false;
      } else if (!this.validateEmail(this.formData.email)) {
        this.errors.email = 'El formato del correo electrónico es inválido.';
        valid = false;
      }

      // Validar el campo de contraseña
      if (!this.formData.password) {
        this.errors.password = 'La contraseña es obligatoria.';
        valid = false;
      }

      return valid; // Devolver si el formulario es válido
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
      return re.test(email); // Comprobar si el email cumple con la expresión regular
    },
    handleSubmit() {
      if (this.validateForm()) { // Validar el formulario antes de enviar
        const users = JSON.parse(localStorage.getItem('users')) || []; // Obtener usuarios almacenados
        const user = users.find(u => u.email === this.formData.email && u.password === this.formData.password); // Buscar usuario con email y contraseña coincidentes

        if (user) {
          localStorage.setItem('loggedInUser', this.formData.email); // Guardar usuario como conectado
          this.$router.push('/principal'); // Redirigir al usuario a la página principal
        } else {
          this.errors.verificacion = 'Correo electrónico o contraseña incorrectos.'; // Mostrar mensaje de error si no se encuentra el usuario
        }
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/inicio-styles.css';
/* Importar estilos específicos para la página de inicio de sesión*/

/* Estilos para los mensajes de error en los campos de formulario */
.error-message-login {
  color: red;
  font-size: 0.9em;
}

/* Estilos para el mensaje de verificación general */
.error-message-verificacion {
  color: red;
  font-size: 0.9em;
  display: block;
  margin-top: 1em;
}
</style>
