<template>
  <div id="body-calendario">
    <!-- Header del calendario -->
    <header id="header-calendario">
      <div class="logo">
        <!-- Imagen del logo -->
        <img src="@/assets/imagenes/principal-img/Imagen2.png" alt="Logo" />
      </div>
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
        <router-link to="/principal"><b>Inicio</b></router-link>
        <router-link to="/claseslist"><b>Clases</b></router-link>
        <router-link to="/membresia"><b>Membresía</b></router-link>
        <router-link to="/galeria"><b>Galeria</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <!-- Icono del sidebar que al hacer clic activa o desactiva el sidebar -->
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <!-- Botón para cerrar el sidebar -->
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Mostrar el nombre y correo del usuario -->
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>

    <!-- Contenedor principal del calendario -->
    <div id="main-calendario">
      <!-- Encabezado del calendario -->
      <div class="calendar-header-calendario">
        <h2>Calendario Personal</h2>
        <p>Aquí puedes agregar y eliminar elementos según tu preferencia.</p>
      </div>
      <!-- Contenedor del calendario -->
      <div class="calendar-container-calendario">
        <div class="calendar-controls-calendario">
          <button @click="prevMonth">Anterior</button>
          <span id="current-month-year">{{ currentMonthYear }}</span>
          <button @click="nextMonth">Siguiente</button>
        </div>
        <div class="calendar-calendario">
          <!-- Iterar sobre los días del calendario -->
          <div class="calendar-day" v-for="day in calendarDays" :key="day.date" @click="selectDay(day.date)">
            <span>{{ day.date }}</span>
            <!-- Mostrar eventos del día si existen -->
            <ul v-if="day.events.length">
              <li v-for="event in day.events" :key="event.id">{{ event.name }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Detalles del evento -->
      <div class="event-details-calendario">
        <h3>Detalles del Evento</h3>
        <!-- Formulario para añadir eventos -->
        <form @submit.prevent="addEvent" id="event-form">
          <input type="text" v-model="eventName" placeholder="Nombre del evento" required />
          <input type="datetime-local" v-model="eventDatetime" required />
          <textarea v-model="eventDescription" placeholder="Descripción del evento" required></textarea>
          <button type="submit">Añadir Evento</button>
        </form>
        <!-- Lista de eventos -->
        <ul id="event-list">
          <li v-for="event in events" :key="event.id">
            <p><strong>{{ event.name }}</strong></p>
            <p>{{ event.datetime }}</p>
            <p>{{ event.description }}</p>
            <!-- Botón para eliminar el evento -->
            <button class="cancelar-cale" @click="deleteEvent(event.id)">Eliminar</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Pie de página del calendario -->
    <footer id="footer-calendario">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-calendario">
        <p class="p-calendario">Gimnasio Universitario</p>
        <p class="p-calendario">Dirección: Calle Falsa 123</p>
        <p class="p-calendario">Teléfono: 555-1234</p>
        <p class="p-calendario">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CalendarPage', // Nombre del componente
  data() {
    return {
      user: {
        name: '', // Nombre del usuario
        email: '' // Correo del usuario
      },
      sidebarOpen: false, // Estado de la barra lateral (cerrada por defecto)
      currentMonth: new Date().getMonth(), // Mes actual
      currentYear: new Date().getFullYear(), // Año actual
      events: [], // Lista de eventos
      eventName: '', // Nombre del evento nuevo
      eventDatetime: '', // Fecha y hora del evento nuevo
      eventDescription: '', // Descripción del evento nuevo
      calendarDays: [] // Días del calendario
    };
  },
  computed: {
    currentMonthYear() {
      // Formatear el nombre del mes y año actuales
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      return `${monthNames[this.currentMonth]} ${this.currentYear}`;
    }
  },
  mounted() {
    // Cargar la información del usuario al montar el componente
    this.loadUser();
    // Actualizar el calendario al montar el componente
    this.updateCalendar();
  },
  methods: {
    toggleSidebar() {
      // Alternar el estado de la barra lateral
      this.sidebarOpen = !this.sidebarOpen;
    },
    logout() {
      // Eliminar el usuario conectado del localStorage y redirigir a inicio de sesión
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    },
    loadUser() {
      // Cargar el usuario conectado del localStorage
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loggedInUserEmail);
        if (user) {
          this.user.name = `${user.name} ${user.surname}`;
          this.user.email = user.email;
        }
      }
    },
    updateCalendar() {
      // Actualizar los días del calendario para el mes y año actuales
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();

      this.calendarDays = [];

      // Añadir días vacíos hasta el primer día del mes
      for (let i = 0; i < firstDay; i++) {
        this.calendarDays.push({ date: '', events: [] });
      }

      // Añadir días del mes con eventos
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        this.calendarDays.push({
          date: day,
          events: this.getEventsForDate(date)
        });
      }
    },
    prevMonth() {
      // Ir al mes anterior
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.updateCalendar();
    },
    nextMonth() {
      // Ir al mes siguiente
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.updateCalendar();
    },
    addEvent() {
      // Añadir un nuevo evento a la lista de eventos
      const newEvent = {
        id: Date.now(),
        name: this.eventName,
        datetime: this.eventDatetime,
        description: this.eventDescription
      };
      this.events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(this.events));
      this.eventName = '';
      this.eventDatetime = '';
      this.eventDescription = '';
      this.updateCalendar(); // Actualiza el calendario después de agregar el evento
    },
    deleteEvent(eventId) {
      // Eliminar un evento de la lista de eventos
      this.events = this.events.filter(event => event.id !== eventId);
      localStorage.setItem('events', JSON.stringify(this.events));
      this.updateCalendar(); // Actualiza el calendario después de eliminar el evento
    },
    getEvents() {
      // Obtener eventos almacenados en localStorage
      return JSON.parse(localStorage.getItem('events')) || [];
    },
    getEventsForDate(date) {
      // Obtener eventos para una fecha específica
      const events = this.getEvents();
      return events.filter(event => {
        const eventDate = new Date(event.datetime);
        return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
      });
    },
    selectDay(date) {
      // Seleccionar un día específico y cargar sus eventos
      const selectedDate = new Date(this.currentYear, this.currentMonth, date);
      this.events = this.getEventsForDate(selectedDate);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/calendario-styles.css';

/* Estilos para mostrar y ocultar la barra lateral */
.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}
</style>
