<template>
  <!-- Contenedor principal de la página del blog -->
  <div id="body-blog">

    <!-- Encabezado de la página del blog -->
    <header id="header-blog">
      <!-- Contenedor del logo -->
      <div class="logo">
        <!-- Imagen del logo -->
        <img src="@/assets/imagenes/principal-img/Imagen2.png" alt="Logo" />
      </div>

      <!-- Sección de redes sociales -->
      <div class="social-media">
        <!-- Enlace a Facebook con su icono -->
        <a href="https://www.facebook.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/facebook.png" alt="Facebook" />
        </a>
        <!-- Enlace a Instagram con su icono -->
        <a href="https://www.instagram.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/instagran.png" alt="Instagram" />
        </a>
        <!-- Enlace a Twitter con su icono -->
        <a href="https://www.twitter.com" target="_blank">
          <img src="@/assets/imagenes/principal-img/x.png" alt="Twitter" />
        </a>
      </div>

      <!-- Navegación principal -->
      <nav>
        <!-- Enlaces de navegación utilizando router-link para diferentes secciones -->
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galeria</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <!-- Icono para abrir la barra lateral -->
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>

    <!-- Barra lateral (sidebar) -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <!-- Botón para cerrar la barra lateral -->
      <div class="close-btn" @click="toggleSidebar">×</div>
      <!-- Información del usuario -->
      <div class="user-info">
        <!-- Mostrar nombre y correo del usuario -->
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <!-- Enlaces de navegación dentro de la barra lateral -->
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>

    <!-- Contenedor principal del blog -->
    <div id="main-blog">
      <!-- Contenedor de artículos del blog -->
      <div class="blog-container-blog">
        <!-- Iterar sobre los posts del blog -->
        <article class="blog-post-blog" v-for="(post, index) in blogPosts" :key="index">
          <!-- Imagen del post del blog -->
          <img :src="post.image" :alt="'Imagen Blog ' + (index + 1)" />
          <!-- Contenido del post del blog -->
          <div class="blog-content-blog">
            <!-- Título del post -->
            <h2>{{ post.title }}</h2>
            <!-- Contenido del post -->
            <p>{{ post.content }}</p>
            <!-- Enlace para leer más (sin funcionalidad actualmente) -->
            <a href="#" class="read-more-blog">Leer más</a>
          </div>
        </article>
      </div>
    </div>

    <!-- Pie de página del blog -->
    <footer id="footer-blog">
      <!-- Navegación en el pie de página -->
      <nav class="footer-nav">
        <!-- Enlace a términos y condiciones -->
        <a href="#terminos">Términos y Condiciones</a>
        <!-- Enlace a la política de privacidad -->
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <!-- Información de contacto -->
      <div class="contacto-blog">
        <p class="p-blog">Gimnasio Universitario</p>
        <p class="p-blog">Dirección: Calle Falsa 123</p>
        <p class="p-blog">Teléfono: 555-1234</p>
        <p class="p-blog">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { toggleSidebar as toggleSidebarScript, navigateTo } from '@/assets/js/blogs-scripts.js';

export default {
  name: 'BlogPage', // Nombre del componente
  data() {
    return {
      sidebarOpen: false, // Estado de la barra lateral (cerrada por defecto)
      user: {
        name: '', // Nombre del usuario
        email: '' // Correo del usuario
      },
      blogPosts: [
        // Lista de posts del blog con imagen, título y contenido
        {
          image: require('@/assets/imagenes/blogs-img/Importancia del entrenamiento de fuerza.jpeg'),
          title: "Importancia del entrenamiento de fuerza",
          content: "El entrenamiento de fuerza es fundamental para mantener una buena condición física y prevenir lesiones. Además, contribuye a aumentar la masa muscular, mejorar la postura corporal y aumentar el metabolismo basal."
        },
        {
          image: require('@/assets/imagenes/blogs-img/Beneficio.jpg'),
          title: "Beneficios del entrenamiento cardiovascular",
          content: "El entrenamiento cardiovascular, también conocido como cardio, es una forma de ejercicio que involucra la actividad aeróbica y tiene numerosos beneficios para la salud cardiovascular, la resistencia y la pérdida de grasa corporal."
        },
        {
          image: require('@/assets/imagenes/blogs-img/Lesiones comunes en el gimnasio y su prevención.jpg'),
          title: "Lesiones comunes en el gimnasio y su prevención",
          content: "Aunque el ejercicio es beneficioso para la salud, también conlleva el riesgo de lesiones si no se toman las precauciones adecuadas. Conocer las lesiones más comunes en el gimnasio y cómo prevenirlas puede ayudarte a mantenerte a salvo y evitar interrupciones en tu rutina de entrenamiento."
        },
        {
          image: require('@/assets/imagenes/blogs-img/Técnicas de relajación y recuperación.jpg'),
          title: "Técnicas de relajación y recuperación",
          content: "El entrenamiento intenso en el gimnasio puede ser estresante para el cuerpo y la mente. Es crucial incorporar técnicas de relajación y recuperación en tu rutina para evitar el sobreentrenamiento, reducir el riesgo de lesiones y maximizar los beneficios de tus esfuerzos."
        }
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
    // Método para alternar la barra lateral
    toggleSidebar() {
      this.sidebarOpen = toggleSidebarScript(this.sidebarOpen);
    },
    // Método para navegar a una URL específica
    navigateTo(url) {
      navigateTo(url, this.$router);
    },
    // Método para cerrar sesión
    logout() {
      // Eliminar el usuario conectado del localStorage y redirigir a inicio de sesión
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/blogs-styles.css';

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
