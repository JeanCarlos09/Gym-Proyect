<template>
  <div id="body-gale">
    <!-- Header -->
    <header id="header-cale">
      <div class="logo">
        <!-- Logo de la aplicación -->
        <img src="@/assets/imagenes/principal-img/Imagen2.png" alt="Logo" />
      </div>
      <div class="social-media">
        <!-- Enlaces a redes sociales -->
        <a href="https://www.facebook.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/facebook.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/instagran.png" alt="Instagram" />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/x.png" alt="Twitter" />
        </a>
      </div>
      <nav>
        <!-- Navegación principal -->
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galeria</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <!-- Botón de sidebar -->
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Información del usuario -->
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr />
      <router-link to="/perfil">Perfil</router-link>
      <hr />
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>

    <!-- Contenido Principal -->
    <div id="main-cale">
      <div class="gallery-header-cale">
        <h2>Bienvenido a la Galería del Gimnasio</h2>
        <p>Encuentra a continuación algunas imágenes destacadas de nuestras instalaciones y actividades.</p>
      </div>
      <div class="gallery-container-cale">
        <!-- Generar imágenes de ejemplo con títulos -->
        <figure class="gallery-item-cale" v-for="image in images" :key="image.alt">
          <img :src="image.src" :alt="image.alt" @click="openModal(image)" />
          <figcaption>{{ image.caption }}</figcaption>
        </figure>
      </div>

      <!-- Modal para imágenes -->
      <div id="modal" class="modal-cale" :class="{ active: isModalOpen }">
        <span class="close-cale" @click="closeModal">&times;</span>
        <img class="modal-content-cale" :src="currentImage.src" :alt="currentImage.alt" />
        <div id="modal-caption-cale">{{ currentImage.caption }}</div>
      </div>
    </div>

    <!-- Footer -->
    <footer id="footer-cale">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-cale">
        <p class="p-cale">Gimnasio Universitario</p>
        <p class="p-cale">Dirección: Calle Falsa 123</p>
        <p class="p-cale">Teléfono: 555-1234</p>
        <p class="p-cale">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { toggleSidebar as toggleSidebarScript, navigateTo } from '@/assets/js/galeria-scripts.js';

export default {
  name: 'GaleriaGimnasio',
  data() {
    return {
      sidebarOpen: false,
      user: {
        name: '',
        email: ''
      },
      isModalOpen: false,
      currentImage: {},
      images: [
        { src: require('@/assets/imagenes/galeria-img/pesas.jpg'), alt: 'Zona de pesas', caption: 'Zona de pesas' },
        { src: require('@/assets/imagenes/galeria-img/cardio.jpg'), alt: 'Área de cardio', caption: 'Área de cardio' },
        { src: require('@/assets/imagenes/galeria-img/yoga.jpg'), alt: 'Sala de yoga', caption: 'Sala de yoga' },
        { src: require('@/assets/imagenes/galeria-img/pilates.jpg'), alt: 'Sala de pilates', caption: 'Sala de pilates' },
        { src: require('@/assets/imagenes/galeria-img/pesomuerto.jpeg'), alt: 'Area de peso muerto', caption: 'Area de peso muerto' },
        { src: require('@/assets/imagenes/galeria-img/estiramiento.jpeg'), alt: 'Área de estiramiento', caption: 'Área de estiramiento' },
        { src: require('@/assets/imagenes/galeria-img/piscina.jpg'), alt: 'Piscina', caption: 'Piscina' },
        { src: require('@/assets/imagenes/galeria-img/meditacion.jpg'), alt: 'Sala de meditacion', caption: 'Sala de meditacion' },
        { src: require('@/assets/imagenes/galeria-img/baile.png'), alt: 'Sala de baile terapia', caption: 'Sala de baile terapia' },
        { src: require('@/assets/imagenes/galeria-img/ciclismo.jpg'), alt: 'Zona de bicicletas', caption: 'Zona de bicicletas' },
        { src: require('@/assets/imagenes/galeria-img/press.jpg'), alt: 'Zona de press de banca', caption: 'Zona de press de banca' },
        { src: require('@/assets/imagenes/galeria-img/barra.jpg'), alt: 'Zona de barras', caption: 'Zona de barras' },
        { src: require('@/assets/imagenes/galeria-img/gluteo.jpg'), alt: 'Área de glúteos', caption: 'Área de glúteos' },
        { src: require('@/assets/imagenes/galeria-img/piernas.jpg'), alt: 'Zona de piernas', caption: 'Zona de piernas' },
        { src: require('@/assets/imagenes/galeria-img/flexiones.jpg'), alt: 'Área de flexiones', caption: 'Área de flexiones' },
        { src: require('@/assets/imagenes/galeria-img/recepcion.jpg'), alt: 'Recepción', caption: 'Recepción' },
        { src: require('@/assets/imagenes/galeria-img/vestuarios.jpg'), alt: 'Vestuarios', caption: 'Vestuarios' },
        { src: require('@/assets/imagenes/galeria-img/sauna.jpg'), alt: 'Sauna', caption: 'Sauna' },
        { src: require('@/assets/imagenes/galeria-img/baños.jpg'), alt: 'Baños', caption: 'Baños' }
      ]
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
    openModal(image) {
      // Abrir el modal con la imagen seleccionada
      this.currentImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      // Cerrar el modal
      this.isModalOpen = false;
      this.currentImage = {};
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/galeria-styles.css';

.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}

.modal-cale {
  display: none;
  position: fixed;
  z-index: 1000;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-cale.active {
  display: block;
}

.modal-content-cale {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

.close-cale {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close-cale:hover,
.close-cale:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

#modal-caption-cale {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
}
</style>
