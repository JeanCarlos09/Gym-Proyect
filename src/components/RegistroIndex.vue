<template>
  <!-- Contenedor principal para la página de registro -->
  <div id="body-register">
    <!-- Contenedor principal del formulario de registro -->
    <div class="main-register">

      <!-- Encabezado de la página de registro -->
      <h1 class="h1-register">
        <!-- Imagen del ícono de registro -->
        <img src="@/assets/imagenes/registro-img/6.png" class="icono-register" alt="Ícono">
        <!-- Título de la página, cargado desde la configuración -->
        {{ config.title }}
      </h1>

      <!-- Formulario de registro -->
      <form @submit.prevent="handleSubmit">
        <!-- Iteración sobre los campos del formulario definidos en la configuración -->
        <div v-for="(field, index) in config.fields" :key="index" class="form-group-register">
          <!-- Etiqueta del campo del formulario -->
          <label :for="field.model">{{ field.label }}</label>
          <!-- Campo de entrada del formulario -->
          <input v-model="formData[field.model]" :id="field.model" :name="field.model" :type="field.type"
            :placeholder="field.placeholder" />
          <!-- Mensaje de error específico para el campo -->
          <span class="error-message-register">{{ errors[field.model] }}</span>
        </div>

        <!-- Botones definidos en la configuración -->
        <button v-for="(button, index) in config.buttons" :key="index" :id="button.id" :type="button.type">
          {{ button.text }}
        </button>

        <!-- Enlace para navegar a otra página (por ejemplo, inicio de sesión) -->
        <div class="signup-link-register">
          <span>{{ config.links[0].text }} </span>
          <router-link :to="config.links[0].href">
            {{ config.links[0].linkText }}
          </router-link>
        </div>

        <!-- Enlace para volver a la página de inicio de sesión -->
        <div class="signup-link-login">
          <a :href="config.links[1].href">{{ config.links[1].text }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import config from '@/assets/json/registro.json'; // Importa la configuración de campos y textos desde un archivo JSON

export default {
  data() {
    return {
      config, // Configuración cargada desde el archivo JSON
      formData: {
        name: '', // Datos del formulario: nombre
        surname: '', // Datos del formulario: apellido
        email: '', // Datos del formulario: correo electrónico
        password: '', // Datos del formulario: contraseña
        confirmPassword: '' // Datos del formulario: confirmación de contraseña
      },
      errors: {
        name: '', // Errores específicos para nombre
        surname: '', // Errores específicos para apellido
        email: '', // Errores específicos para correo electrónico
        password: '', // Errores específicos para contraseña
        confirmPassword: '' // Errores específicos para confirmación de contraseña
      }
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = { // Reinicia los errores antes de validar
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
      return re.test(email); // Comprobar si el email cumple con la expresión regular
    },
    handleSubmit() {
      if (this.validateForm()) { // Valida el formulario antes de enviar
        alert('Registro exitoso'); // Muestra un mensaje de éxito
        this.$router.push('/inicio'); // Redirige al usuario a la página de inicio
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/registro-styles.css';
/*Importa los estilos específicos para la página de registro */

/* Estilos específicos para los mensajes de error en el formulario de registro */
.error-message-register {
  color: red;
  font-size: 0.9em;
}
</style>
