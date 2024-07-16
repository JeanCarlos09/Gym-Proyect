<template>
  <div class="body-principal">
    <header class="encaprincipal">
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
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galeria</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>
<!----------------------------------------------------------------------------------------------------------------->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Aquí se muestran el nombre y el correo del usuario -->
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>
<!----------------------------------------------------------------------------------------------------------------->

    <main>
      <div class="cards-container">
        <section class="card" id="membresia" @click="navigateTo('/membresia')">
          <img src="@/assets/imagenes/principal-img/membresia.png" alt="Membresía">
          <p>Membresía</p>
        </section>
        <section class="card" id="inscripcion" @click="navigateTo('/claseslist')">
          <img src="@/assets/imagenes/principal-img/clases.png" alt="Inscripción en Clases">
          <p>Inscripción en Clases</p>
        </section>
        <section class="card" id="pagos" @click="navigateTo('/pagos')">
          <img src="@/assets/imagenes/principal-img/pagos.png" alt="Pagos y Facturación">
          <p>Pagos y Facturación</p>
        </section>
        <section class="card" id="progreso" @click="navigateTo('/progreso')">
          <img src="@/assets/imagenes/principal-img/progreso.png" alt="Progreso y Metas">
          <p>Progreso y Metas</p>
        </section>
        <section class="card" id="calendario" @click="navigateTo('/calendario')">
          <img src="@/assets/imagenes/principal-img/calendario.png" alt="Calendario">
          <p>Calendario</p>
        </section>
        <section class="card" id="problemas" @click="navigateTo('/mantenimiento')">
          <img src="@/assets/imagenes/principal-img/problemas.png" alt="Problemas y Mantenimiento">
          <p>Problemas y Mantenimiento</p>
        </section>
      </div>
    </main>

    <footer class="footer-principal">
      <nav class="footer-nav-principal">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-principal">
        <p class="p-principal">Gimnasio Universitario</p>
        <p class="p-principal">Dirección: Calle Falsa 123</p>
        <p class="p-principal">Teléfono: 555-1234</p>
        <p class="p-principal">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { toggleSidebar as toggleSidebarScript, navigateTo } from '@/assets/js/principal-scripts.js';

export default {
  data() {
    return {
      sidebarOpen: false,
      user: {
        name: '',
        email: ''
      }
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
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/principal-styles.css';

/* Estilos para mostrar y ocultar la barra lateral */
.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}

/* Asegúrate de que los estilos sean correctos según tu diseño */
</style>
