<template>
  <div id="body-perfil">
    <header id="header-perfil">
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
        <!-- Enlaces de navegación -->
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galeria</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <!-- Icono para abrir el sidebar -->
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>
    
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <!-- Botón para cerrar el sidebar -->
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Mostrar el nombre completo y correo del usuario -->
        <p>{{ user.name }} {{ user.surname }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>

    <!-- Contenido principal -->
    <div id="main-perfil">
      <section class="content-perfil">
        <div class="left-side">
          <aside class="sidebar1-perfil">
            <div class="profile-pic-perfil">
              <img :src="user.profilePicture || 'default-profile.png'" alt="Foto de perfil" id="profileImage">
              <button @click="triggerFileInput">Agregar Foto</button>
              <!-- Input para cambiar la foto de perfil -->
              <input type="file" ref="profileImageInput" style="display: none;" @change="changeProfileImage">
            </div>
            <ul class="menu-perifl">
              <li @click="showSection('info-section')">Información Personal</li>
              <li @click="showSection('phone-section')">Teléfono</li>
              <li @click="showSection('address-section')">Dirección</li>
            </ul>
          </aside>
        </div>
        <div class="right-side">
          <section class="content-perfil">
            <!-- Sección de Información Personal -->
            <div id="info-section" class="section-perfil" v-show="activeSection === 'info-section'">
              <h2>Información Personal</h2>
              <form id="profile-form" @submit.prevent="saveProfileInfo">
                <div class="form-group-perfil">
                  <label for="nombre">Nombre:</label>
                  <input type="text" id="nombre" v-model="user.name" placeholder="Nombre">
                  <span class="error-message"></span>
                </div>
                <div class="form-group-perfil">
                  <label for="apellido">Apellido:</label>
                  <input type="text" id="apellido" v-model="user.surname" placeholder="Apellido">
                  <span class="error-message"></span>
                </div>
                <button type="submit">Guardar Cambios</button>
              </form>
            </div>
            <!-- Sección de Teléfono -->
            <div id="phone-section" class="section" v-show="activeSection === 'phone-section'">
              <h2>Teléfono</h2>
              <form id="phone-form" @submit.prevent="savePhone">
                <div class="form-group-perfil">
                  <label for="telefono">Teléfono:</label>
                  <input type="tel" id="telefono" v-model="user.phone" placeholder="Teléfono">
                  <span class="error-message"></span>
                </div>
                <button type="submit">Guardar Cambios</button>
              </form>
            </div>
            <!-- Sección de Dirección -->
            <div id="address-section" class="section" v-show="activeSection === 'address-section'">
              <h2>Dirección</h2>
              <form id="address-form" @submit.prevent="saveAddress">
                <div class="form-group">
                  <label for="direccion">Dirección:</label>
                  <input type="text" id="direccion" v-model="user.address" placeholder="Dirección">
                  <span class="error-message"></span>
                </div>
                <button id="boton-perfil" type="submit">Guardar Cambios</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </div>
    
    <footer>
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto">
        <p>Gimnasio Universitario</p>
        <p>Dirección: Calle Falsa 123</p>
        <p>Teléfono: 555-1234</p>
        <p>Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Datos del usuario inicializados
      user: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
        profilePicture: '' // Agregamos la foto de perfil
      },
      activeSection: 'info-section', // Sección activa del perfil
      sidebarOpen: false // Controla si el sidebar está abierto o cerrado
    };
  },
  mounted() {
    // Cargar los datos del usuario cuando el componente se monta
    this.loadUser();
  },
  methods: {
    // Cambiar la sección activa
    showSection(section) {
      this.activeSection = section;
    },
    // Alternar el estado del sidebar
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    // Disparar el input de archivo para cambiar la foto de perfil
    triggerFileInput() {
      this.$refs.profileImageInput.click();
    },
    // Cambiar la imagen de perfil
    changeProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profilePicture = e.target.result; // Actualizamos la foto de perfil
          this.saveProfileInfo(); // Guardamos la foto en localStorage
        };
        reader.readAsDataURL(file);
      }
    },
    // Cargar datos del usuario desde localStorage
    loadUser() {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loggedInUserEmail);
        if (user) {
          this.user = { ...user };
        }
      }
    },
    // Guardar la información del perfil en localStorage
    saveProfileInfo() {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === loggedInUserEmail);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...this.user };
          localStorage.setItem('users', JSON.stringify(users));
          alert('Información personal guardada');
        }
      }
    },
    // Función para guardar el teléfono
    savePhone() {
      this.saveProfileInfo(); // Guardamos el teléfono junto con otros datos
      alert('Teléfono guardado');
    },
    // Función para guardar la dirección
    saveAddress() {
      this.saveProfileInfo(); // Guardamos la dirección junto con otros datos
      alert('Dirección guardada');
    },
    // Cerrar sesión y redirigir a la página de inicio
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/perfil-styles.css';

/* Estilos para mostrar y ocultar la barra lateral */
.sidebar {
  display: none; /* Oculto por defecto */
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block; /* Mostrar cuando la clase 'open' está presente */
  transform: translateX(0);
}

/* Estilo para la imagen de perfil */
.profile-pic-perfil img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
}
</style>
