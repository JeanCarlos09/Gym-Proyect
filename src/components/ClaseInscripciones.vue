<template>
  <div class="body-clases">
    <!-- Header -->
    <header class="head-clases">
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

    <div id="main-clases">
      <!-- Mensaje de advertencia para membresía -->
      <div v-if="showMembershipAlert" class="alert alert-warning">
        <p>Debe comprar una membresía para inscribirse en las clases. Por favor, visite la sección de membresía.</p>
      </div>

      <!-- Contenido principal -->
      <div class="plans">
        <h2 class="h2-clases">Tipos de clases disponibles</h2>
        <div class="plan-cards-clases">
          <!-- Tarjetas de clases -->
          <div class="plan-card-clases" v-for="(clase, index) in clasesList" :key="index">
            <img :src="clase.img" :alt="clase.nombre" />
            <h3 class="h3-clases">{{ clase.nombre }}</h3>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <h2 class="h2-clases">Inscripción</h2>

      <!-- Listado de clases disponibles -->
      <div class="benefits-clases" v-for="(clasesList, claseType) in clases" :key="claseType">
        <h1>{{ claseType.charAt(0).toUpperCase() + claseType.slice(1) }}</h1>
        <div class="benefit-clases">
          <div class="benefi-clases" v-for="(clase, index) in clasesList" :key="index">
            <div class="Inf-clases">
              <!-- Información de la clase -->
              <ul>
                <li><b>Instructor/a:</b> {{ clase.instructor }}</li>
                <li><b>Día:</b> {{ clase.dia }}</li>
                <li><b>Hora:</b> {{ clase.hora }}</li>
                <li><b>Ubicación:</b> {{ clase.ubicacion }}</li>
                <li><b>Plazas disponibles:</b> {{ clase.plazas }}</li>
              </ul>
            </div>
            <!-- Botón para inscribirse -->
            <button id="boton-clases" @click="inscribirse(clase)"><b>Inscribirse</b></button>
          </div>
        </div>
      </div>

      <hr />

      <h2>Clases Inscritas</h2>
      <div class="mis-clases-info">
        <h2>Mis Clases:</h2>
        <!-- Tabla de clases inscritas -->
        <table id="tabla-clases">
          <thead id="thead-clases">
            <tr>
              <th id="th-clases">Nombre de la Clase</th>
              <th id="th-clases">Fecha y Hora</th>
              <th id="th-clases">Ubicación</th>
              <th id="th-clases">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(clase, index) in misClases" :key="index">
              <td id="td-clases">{{ clase.nombre }}</td>
              <td id="td-clases">{{ clase.fecha }}</td>
              <td id="td-clases">{{ clase.ubicacion }}</td>
              <td id="td-clases">
                <!-- Botón para cancelar inscripción -->
                <button id="cancelar-clases" @click="cancelarInscripcion(index)"><b>Cancelar</b></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer -->
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importar useRouter
import { toggleSidebar as toggleSidebarScript } from '@/assets/js/clases-scripts.js';

export default {
  name: 'ClaseInscripciones',
  setup() {
    const sidebarOpen = ref(false);
    const showMembershipAlert = ref(false);

    // Datos simulados para clases
    const clases = ref({
      yoga: [
        { instructor: 'Albertho Lopez', dia: 'En la mañana', hora: 'De 09:00 am a 10:30 am', ubicacion: 'Sala de Yoga', plazas: 10 },
        { instructor: 'Maria González', dia: 'En la tarde', hora: 'De 15:00 pm a 16:30 pm', ubicacion: 'Sala de Yoga', plazas: 10 },
        { instructor: 'Luisa Fernanda', dia: 'En la noche', hora: 'De 19:00 pm a 20:30 pm', ubicacion: 'Sala de Yoga', plazas: 10 }
      ],
      pilates: [
        { instructor: 'Ana Torres', dia: 'En la mañana', hora: 'De 07:00 am a 08:30 am', ubicacion: 'Sala de Pilates', plazas: 10 },
        { instructor: 'Jorge Hernández', dia: 'En la tarde', hora: 'De 17:00 pm a 18:30 pm', ubicacion: 'Sala de Pilates', plazas: 10 },
        { instructor: 'Patricia Morales', dia: 'En la noche', hora: 'De 20:00 pm a 21:30 pm', ubicacion: 'Sala de Pilates', plazas: 10 }
      ],
      meditacion: [
        { instructor: 'Ricardo Gómez', dia: 'En la mañana', hora: 'De 06:00 am a 07:30 am', ubicacion: 'Sala de Meditación', plazas: 10 },
        { instructor: 'Elena Fernández', dia: 'En la tarde', hora: 'De 15:00 pm a 16:30 pm', ubicacion: 'Sala de Meditación', plazas: 10 },
        { instructor: 'Francisco Rivas', dia: 'En la noche', hora: 'De 19:00 pm a 20:30 pm', ubicacion: 'Sala de Meditación', plazas: 10 }
      ],
      baile: [
        { instructor: 'Laura Martínez', dia: 'En la mañana', hora: 'De 06:00 am a 07:40', ubicacion: 'Sala de Baile Terapia', plazas: 10 },
        { instructor: 'David Sánchez', dia: 'En la noche', hora: 'De 20:00 pm a 21:40 pm', ubicacion: 'Sala de Baile Terapia', plazas: 10 }
      ]
    });

    const user = ref({
      name: '',
      email: '',
      hasMembership: false
    });

    const router = useRouter(); // Obtener la instancia del router

    // Generar una clave única para el usuario
    const userClassesKey = (email) => `misClases_${email}`;

    // Obtener clases inscritas del localStorage
    const misClases = ref(JSON.parse(localStorage.getItem(userClassesKey(user.value.email))) || []);

    const toggleSidebar = () => {
      sidebarOpen.value = toggleSidebarScript(sidebarOpen.value);
    };

    const checkMembership = () => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      const transactions = JSON.parse(localStorage.getItem(`transactions_${loggedInUserEmail}`)) || [];
      return transactions.some(transaction => transaction.status === 'Completo');
    };

    const inscribirse = (clase) => {
      if (!checkMembership()) {
        showMembershipAlert.value = true;
        setTimeout(() => {
          showMembershipAlert.value = false;
        }, 3000); // Mostrar el mensaje por 3 segundos
        return;
      }

      const newInscription = {
        nombre: clase.instructor,
        fecha: `${clase.dia} ${clase.hora}`,
        ubicacion: clase.ubicacion
      };

      // Agregar la nueva inscripción a la lista del usuario
      misClases.value.push(newInscription);

      // Guardar en localStorage con clave específica del usuario
      localStorage.setItem(userClassesKey(user.value.email), JSON.stringify(misClases.value));
    };

    const cancelarInscripcion = (index) => {
      misClases.value.splice(index, 1);
      localStorage.setItem(userClassesKey(user.value.email), JSON.stringify(misClases.value));
    };

    const logout = () => {
      localStorage.removeItem('loggedInUser');
      router.push('/inicio'); // Usar router para redirigir
    };

    onMounted(() => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userInfo = users.find(u => u.email === loggedInUserEmail);
        if (userInfo) {
          user.value.name = `${userInfo.name} ${userInfo.surname}`;
          user.value.email = userInfo.email;
          user.value.hasMembership = checkMembership(); // Actualiza el estado de la membresía
        } else {
          console.error('No se encontró información del usuario.');
        }
      } else {
        console.error('No hay un usuario logueado.');
      }

      // Actualizar la lista de clases inscritas del usuario
      misClases.value = JSON.parse(localStorage.getItem(userClassesKey(user.value.email))) || [];
    });

    return { clases, misClases, sidebarOpen, toggleSidebar, inscribirse, cancelarInscripcion, user, logout, showMembershipAlert };
  }
};
</script>

<style scoped>
@import '@/assets/css/clases-styles.css';

.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}

.alert {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
  z-index: 1000;
  /* Asegúrate de que esté por encima de otros elementos */
}
</style>
