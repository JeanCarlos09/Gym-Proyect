<template>
  <!-- Contenedor principal de la página -->
  <div id="body-membre">
    <!-- Encabezado -->
    <header id="header-membre">
      <!-- Logo del sitio -->
      <div class="logo-membre">
        <img src="@/assets/imagenes/principal-img/Imagen2.png" alt="Logo">
      </div>
      <!-- Íconos de redes sociales -->
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
      <!-- Navegación principal del sitio -->
      <nav>
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galería</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <!-- Ícono de menú para abrir la barra lateral -->
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>

    <!-- Barra lateral -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <!-- Botón para cerrar la barra lateral -->
      <div class="close-btn" @click="toggleSidebar">×</div>
      <!-- Información del usuario -->
      <div class="user-info">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <!-- Enlace al perfil del usuario -->
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <!-- Enlace para cerrar sesión -->
      <a href="#" @click="logout">Cerrar sesión</a>
    </aside>

    <!-- Contenido principal -->
    <div id="main-membre">
      <!-- Título de la sección de información general -->
      <h2 class="section-title-membre">Información General</h2>
      <!-- Información de la membresía -->
      <div class="general-info-membre" v-if="membership">
        <p>Estado de la membresía:
          <span :class="{ 'status-active': membership.status === 'Activo' }">{{ membership.status }}</span>
        </p>
        <p>Tipo de Membresía: {{ membership.type }}</p>
        <p>Fecha de Inicio: {{ membership.startDate }}</p>
        <p>Fecha de vencimiento: {{ membership.endDate }}</p>
        <!-- Botones para renovar o cancelar la membresía -->
        <button class="renovar" @click="buyPlan()">Renovar Membresía</button>
        <button class="cancelar" @click="cancelMembership">Cancelar Membresía</button>
      </div>
      <!-- Mensaje cuando no hay información de membresía disponible -->
      <div class="general-info-membre" v-else>
        <p>Estado de la membresía: No disponible</p>
        <p>Tipo de membresía: No disponible</p>
        <p>Fecha de Inicio: No disponible</p>
        <p>Fecha de vencimiento: No disponible</p>
      </div>
    </div>

    <hr class="divider">

    <!-- Planes de Membresía -->
    <div class="plans-membre">
      <h2 class="section-title-membre">Planes de Membresía</h2>
      <div class="plan-cards-membre">
        <!-- Iteración sobre los planes de membresía -->
        <div class="plan-card-membre" v-for="(plan, index) in plans" :key="index">
          <img :src="plan.image" :alt="plan.name">
          <button @click="buyPlan(plan.name)" class="boton-membre">Comprar</button>
        </div>
      </div>
    </div>

    <hr class="divider">

    <!-- Beneficios de la Membresía -->
    <div class="combined-plans-membre">
      <h2 class="section-title-membre">Beneficios de la Membresía</h2>
      <div class="benefits-membre">
        <!-- Iteración sobre los beneficios de membresía -->
        <div class="benefit-membre" v-for="(benefit, index) in benefits" :key="index">
          <h3>{{ benefit.title }}</h3>
          <div class="benefit-content-membre">
            <img :src="benefit.image" :alt="benefit.title">
            <ul>
              <li v-for="(item, i) in benefit.details" :key="i">
                <b>- {{ item }}</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerta de cancelación -->
    <div v-if="showCancelAlert" class="alert">
      <p>{{ cancelMessage }}</p>
      <button @click="showCancelAlert = false">Cerrar</button>
    </div>

    <!-- Pie de página -->
    <footer id="footer-member">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-member">
        <p class="p-member">Gimnasio Universitario</p>
        <p class="p-member">Dirección: Calle Falsa 123</p>
        <p class="p-member">Teléfono: 555-1234</p>
        <p class="p-member">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
// Importa funciones y referencias necesarias
import { ref, onMounted } from 'vue';
import { toggleSidebar as toggleSidebarScript } from '@/assets/js/membresia-scripts.js';

export default {
  name: 'MembresiaPage',
  setup() {
    // Estado reactivo para controlar la barra lateral
    const sidebarOpen = ref(false);
    // Información del usuario
    const user = ref({
      name: '',
      email: ''
    });
    // Lista de planes de membresía
    const plans = ref([
      { name: 'Plan por Día', image: require('@/assets/imagenes/membresia-img/DIA.png') },
      { name: 'Plan Mensual', image: require('@/assets/imagenes/membresia-img/mensual.png') },
      { name: 'Plan Trimestral', image: require('@/assets/imagenes/membresia-img/trimestral.png') },
      { name: 'Plan Semestral', image: require('@/assets/imagenes/membresia-img/semestral.png') },
      { name: 'Plan Anual', image: require('@/assets/imagenes/membresia-img/anual.png') }
    ]);
    // Lista de beneficios de membresía
    const benefits = ref([
      {
        title: 'Membresía por Día',
        image: require('@/assets/imagenes/membresia-img/DIA.png'),
        details: [
          'Acceso Ilimitado a Equipos de Gimnasio: Utiliza todos los equipos de gimnasio sin restricciones durante el día de tu membresía.',
          'Sin acceso a inscribirse a clases Grupales: La membresía diaria no incluye la opción de inscribirse en las clases grupales del gimnasio.'
        ]
      },
      {
        title: 'Membresía por Mes',
        image: require('@/assets/imagenes/membresia-img/mensual.png'),
        details: [
          'Acceso Ilimitado a Equipos de Gimnasio: Acceso completo a todos los equipos y máquinas de gimnasio durante el mes.',
          'Acceso a inscribirse a Clases Grupales: Participa en todas las clases grupales ofrecidas, como yoga, spinning, y más.',
          'Uso de la Piscina y Sauna: Disfruta del uso ilimitado de la piscina y las instalaciones de sauna durante todo el mes.',
          'Descuento en Eventos Especiales (5%): Recibe un 5% de descuento en todos los eventos especiales organizados por el gimnasio, como talleres y seminarios.'
        ]
      },
      {
        title: 'Membresía Trimestral',
        image: require('@/assets/imagenes/membresia-img/trimestral.png'),
        details: [
          'Acceso Ilimitado a Equipos de Gimnasio: Uso ilimitado de todos los equipos de gimnasio durante tres meses.',
          'Acceso a inscribirse a Clases Grupales: Participa en todas las clases grupales sin costo adicional.',
          'Uso de la Piscina y Sauna: Acceso ilimitado a la piscina y sauna durante el trimestre.',
          'Descuento en Eventos Especiales (10%): Obtén un 10% de descuento en todos los eventos especiales.',
          'Una Sesión Gratuita con un Entrenador Personal: Disfruta de una sesión gratuita con un entrenador personal.'
        ]
      },
      {
        title: 'Membresía Semestral',
        image: require('@/assets/imagenes/membresia-img/semestral.png'),
        details: [
          'Acceso Ilimitado a Equipos de Gimnasio: Uso sin restricciones de todos los equipos y máquinas del gimnasio durante seis meses.',
          'Acceso a inscribirse a Clases Grupales: Acceso completo a todas las clases grupales.',
          'Uso de la Piscina y Sauna: Disfruta de la piscina y sauna sin límites durante el semestre.',
          'Descuento en Eventos Especiales (15%): Obtén un 15% de descuento en todos los eventos especiales.',
          'Tres Sesiones Gratuitas con un Entrenador Personal: Aprovecha tres sesiones de entrenamiento personal gratuitas.',
          'Acceso Prioritario a Nuevas Clases: Inscríbete primero en nuevas clases y actividades antes de que se abran al público general.'
        ]
      },
      {
        title: 'Membresía Anual',
        image: require('@/assets/imagenes/membresia-img/anual.png'),
        details: [
          'Acceso Ilimitado a Equipos de Gimnasio: Acceso completo y sin restricciones a todas las instalaciones y equipos del gimnasio durante un año entero.',
          'Acceso a inscribirse a Clases Grupales: Participa en cualquier clase grupal que desees sin costo adicional durante el año.',
          'Uso de la Piscina y Sauna: Utiliza la piscina y las instalaciones de sauna sin límites durante todo el año.',
          'Descuento en Eventos Especiales (20%): Recibe un 20% de descuento en todos los eventos especiales organizados por el gimnasio.',
          'Seis Sesiones Gratuitas con un Entrenador Personal: Aprovecha seis sesiones de entrenamiento personal sin costo adicional.',
          'Acceso Prioritario a Nuevas Clases: Inscríbete primero en nuevas clases y actividades antes de que se abran al público general.',
          'Descuento del 10% en Productos de la Tienda del Gimnasio: Obtén un 10% de descuento en todos los productos de la tienda del gimnasio, incluyendo ropa deportiva, suplementos, y accesorios de fitness.'
        ]
      }
    ]);
    // Información de la membresía del usuario
    const membership = ref(null);
    // Estado para mostrar alerta de cancelación
    const showCancelAlert = ref(false);
    const cancelMessage = ref('');

    // Función para alternar la barra lateral
    const toggleSidebar = () => {
      sidebarOpen.value = toggleSidebarScript(sidebarOpen.value);
    };

    // Función para comprar un plan de membresía
    const buyPlan = (planName) => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        window.location.href = '/pagos';
        localStorage.setItem(`selectedPlan_${loggedInUserEmail}`, planName);
      }
    };

    // Función para renovar la membresía
    const renewMembership = () => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        window.location.href = '/pagos';
        localStorage.setItem(`renewMembership_${loggedInUserEmail}`, 'true');
      }
    };

    // Función para cancelar la membresía
    const cancelMembership = () => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        localStorage.removeItem(`transactions_${loggedInUserEmail}`);
        localStorage.removeItem(`membershipData_${loggedInUserEmail}`);
        membership.value = null;
        cancelMessage.value = 'Membresía cancelada.';
        showCancelAlert.value = true;
      }
    };

    // Función para cerrar sesión
    const logout = () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = '/inicio';
    };

    // Ejecutar cuando el componente esté montado
    onMounted(() => {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userFound = users.find(u => u.email === loggedInUserEmail);
        if (userFound) {
          user.value.name = `${userFound.name} ${userFound.surname}`;
          user.value.email = userFound.email;
        }
        const savedMembership = localStorage.getItem(`membershipData_${loggedInUserEmail}`);
        if (savedMembership) {
          membership.value = JSON.parse(savedMembership);
        }
      }
    });

    return {
      sidebarOpen,
      user,
      plans,
      benefits,
      membership,
      toggleSidebar,
      buyPlan,
      renewMembership,
      cancelMembership,
      logout,
      showCancelAlert,
      cancelMessage
    };
  }
};
</script>

<style scoped>
/* Importa los estilos personalizados */
@import '@/assets/css/membresia-styles.css';

/* Estilo para la barra lateral cuando está abierta */
.sidebar.open {
  display: block;
  transform: translateX(0);
}

/* Estilo para la alerta de cancelación */
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
}

/* Estilo para el estado activo de la membresía */
.status-active {
  color: rgb(1, 255, 1);
  /* Cambia el color del texto a verde */
}
</style>
