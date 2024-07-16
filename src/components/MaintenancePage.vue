<template>
  <div id="body-manteni">
    <header id="header-manteni">
      <div class="logo">
        <img src="@/assets/imagenes/principal-img/Imagen2.png" alt="Logo">
      </div>
      <div class="social-media">
        <a href="https://www.facebook.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/facebook.png" alt="Facebook">
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/instagran.png" alt="Instagram">
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/x.png" alt="Twitter">
        </a>
      </div>
      <nav>
        <a href="/principal">Inicio</a>
        <a href="/claseslist">Clases</a>  
        <a href="/membresia">Membresía</a>
        <a href="/galeria">Galería</a>
        <a href="/blog">Blog</a>
        <div class="sidebar-icon" @click="toggleSidebar">☰</div>
      </nav>
    </header>

    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>

    <div id="main-manteni">
      <div class="support-maintenance">
        <div class="Bienvenido">
          <h1>Problemas y Mantenimiento</h1>
          <p>Bienvenido al área de Problemas y Mantenimiento. Aquí puedes encontrar información 
            y soluciones para problemas técnicos, así como solicitar ayuda adicional si es 
            necesario.</p>
        </div>

        <hr>

        <div class="problemas">
          <h2>Reportar un Problema</h2>
          <form id="report-form" @submit.prevent="submitReport">
            <label for="issue">Descripción del Problema:</label><br>
            <textarea v-model="issueDescription" placeholder="Escribe aquí la descripción del problema" id="issue" name="issue" rows="10" cols="100"></textarea><br>
            <button type="submit">Enviar Reporte</button>
          </form>
        </div>

        <hr>

        <h2>Preguntas Frecuentes</h2>
        <div class="faq">
          <div class="question-answer" v-for="(item, index) in faqs" :key="index">
            <div class="question">
              <h3>{{ item.question }}</h3>
            </div>
            <div class="answer">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer id="footer-manteni">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-manteni">
        <p class="p-manteni">Gimnasio Universitario</p>
        <p class="p-manteni">Dirección: Calle Falsa 123</p>
        <p class="p-manteni">Teléfono: 555-1234</p>
        <p class="p-manteni">Email: info@gimnasio.com</p>
      </div>
    </footer>

    <!-- Mensaje de éxito para el envío del reporte -->
    <div v-if="showSuccessMessage" class="success-message">
      Reporte enviado
    </div>
  </div>
</template>

<script>
import { toggleSidebar as toggleSidebarScript, navigateTo } from '@/assets/js/mentenimiento-scripts.js';

export default {
  data() {
    return {
      sidebarOpen: false,
      user: {
        name: '',
        email: ''
      },
      faqs: [
        {
          question: '¿Cómo restablecer mi contraseña?',
          answer: 'Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?".'
        },
        // ... otras preguntas frecuentes
      ],
      issueDescription: '', // Estado para almacenar el texto del problema
      showSuccessMessage: false // Añadido para mostrar el mensaje de éxito
    };
  },
  mounted() {
    // Recuperar el correo del usuario conectado desde localStorage
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === loggedInUserEmail);
      if (user) {
        // Asignar nombre completo y correo del usuario al estado
        this.user.name = `${user.name} ${user.surname}`;
        this.user.email = user.email;
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = toggleSidebarScript(this.sidebarOpen);
    },
    navigateTo(url) {
      navigateTo(url, this.$router);
    },
    logout() {
      // Eliminar el usuario conectado del localStorage y redirigir a inicio de sesión
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    },
    submitReport() {
      // Lógica para enviar el reporte
      this.showSuccessMessage = true;
      this.issueDescription = ''; // Limpiar el campo de texto

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/mantenimiento-styles.css';

/* Estilos para mostrar y ocultar la barra lateral */
.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}

/* Estilo para el mensaje de éxito */
.success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4CAF50; /* Verde */
  color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1000; /* Asegura que el mensaje esté por encima de otros elementos */
}
</style>
