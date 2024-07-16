<template>
  <div id="body-progre">
    <header id="header-progre">
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
    
    <div id="main-progre">
      <div class="cabeza-progre">
        <div class="progress-header-progre">
          <h2>Progresos y Metas</h2>
          <p>Visualiza y gestiona tus progresos y metas en el gimnasio.</p>
        </div>
        <div class="progress-summary-progre">
          <div class="summary-card-progre">
            <h3>Metas Completadas</h3>
            <p id="metas-completadas">{{ metasCompletadas }}</p>
          </div>
          <div class="summary-card-progre">
            <h3>Calorías Quemadas</h3>
            <p id="calorias-quemadas">{{ caloriasQuemadas }}</p>
          </div>
          <div class="summary-card-progre">
            <h3>Tiempo de Ejercicio</h3>
            <p id="tiempo-ejercicio">{{ tiempoEjercicio }}</p>
          </div>
        </div>
      </div>
      <div class="progress-container-progre">
        <section class="progress-card-progre">
        <h3 class="h3-progre">Metas Alcanzadas</h3>
        <ul class="ul-progre" id="metas-alcanzadas">
          <li class="li-progre" v-for="(meta, index) in metasAlcanzadas" :key="index">
            {{ meta.name }} - {{ meta.target }}
            <span class="status completed">Completada</span>
          </li>
        </ul>
      </section>

        <section class="progress-card-progre">
          <h3 class="h3-progre">Nuevas Metas</h3>
          <form id="new-goal-form" @submit.prevent="handleAddNewGoal">
            <input type="text" v-model="newGoalName" placeholder="Nombre de la meta" required>
            <input type="number" v-model="newGoalTarget" placeholder="Objetivo (e.g., 10 km, 5 kg)" required>
            <button type="submit">Añadir Meta</button>
          </form>
          <ul id="nuevas-metas">
            <li v-for="(goal, index) in nuevasMetas" :key="index">
            {{ goal.name }} - {{ goal.target }}
            <span :class="`status-no ${goal.status.replace(/\s+/g, '-').toLowerCase()}`">{{ goal.status }}</span>
            <button id="iniciar-meta" @click="startGoal(index)">Iniciar</button>
            <button id="completar-meta" @click="completeGoal(index)">Completar</button>
            <button id="cancelar-meta" @click="cancelGoal(index)">Cancelar</button>
          </li>
          </ul>
        </section>
        <section class="progress-card-progre">
          <h3  class="h3-progre">Registro de Actividades</h3>
          <form id="new-goal-form" @submit.prevent="handleRegisterActivity">
            <input type="text" v-model="activityName" placeholder="Nombre de la actividad" required>
            <input type="number" v-model="activityDuration" placeholder="Duración (minutos)" required>
            <input type="number" v-model="activityCalories" placeholder="Calorías quemadas" required>
            <button type="submit">Registrar Actividad</button>
          </form>
          <ul id="registro-actividades">
            <li v-for="(activity, index) in actividades" :key="index">{{ activity }}</li>
          </ul>
        </section>
      </div>
    </div>
    
    <footer id="footer-progre">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-progre">
        <p class="p-progre">Gimnasio Universitario</p>
        <p class="p-progre">Dirección: Calle Falsa 123</p>
        <p class="p-progre">Teléfono: 555-1234</p>
        <p class="p-progre">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false,
      user: {
        name: '',
        email: ''
      },
      metasCompletadas: 0,
      caloriasQuemadas: 0,
      tiempoEjercicio: '0h 0m',
      metasAlcanzadas: [],
      nuevasMetas: [],
      actividades: [],
      newGoalName: '',
      newGoalTarget: '',
      activityName: '',
      activityDuration: '',
      activityCalories: ''
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    navigateTo(url) {
      this.$router.push(url);
    },
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    },
    loadUserData() {
      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loggedInUserEmail);
        if (user) {
          this.user.name = `${user.name} ${user.surname}`;
          this.user.email = user.email;

          // Cargar metas y actividades desde localStorage
          this.metasAlcanzadas = JSON.parse(localStorage.getItem(`metasAlcanzadas_${user.email}`)) || [];
          this.nuevasMetas = JSON.parse(localStorage.getItem(`nuevasMetas_${user.email}`)) || [];
          this.actividades = JSON.parse(localStorage.getItem(`actividades_${user.email}`)) || [];
          this.caloriasQuemadas = JSON.parse(localStorage.getItem(`caloriasQuemadas_${user.email}`)) || 0;
          this.tiempoEjercicio = JSON.parse(localStorage.getItem(`tiempoEjercicio_${user.email}`)) || '0h 0m';
          
          this.updateCompletedGoals();
        }
      }
    },
    saveUserData() {
      const loggedInUserEmail = this.user.email;
      localStorage.setItem(`metasAlcanzadas_${loggedInUserEmail}`, JSON.stringify(this.metasAlcanzadas));
      localStorage.setItem(`nuevasMetas_${loggedInUserEmail}`, JSON.stringify(this.nuevasMetas));
      localStorage.setItem(`actividades_${loggedInUserEmail}`, JSON.stringify(this.actividades));
      localStorage.setItem(`caloriasQuemadas_${loggedInUserEmail}`, JSON.stringify(this.caloriasQuemadas));
      localStorage.setItem(`tiempoEjercicio_${loggedInUserEmail}`, JSON.stringify(this.tiempoEjercicio));
    },
    handleAddNewGoal() {
      if (this.newGoalName && this.newGoalTarget) {
        this.nuevasMetas.push({
          name: this.newGoalName,
          target: this.newGoalTarget,
          status: 'No iniciado'
        });
        this.newGoalName = '';
        this.newGoalTarget = '';
        this.saveUserData();
      }
    },
    handleRegisterActivity() {
      if (this.activityName && this.activityDuration && this.activityCalories) {
        const now = new Date();
        this.actividades.push(`${this.activityName} - ${this.activityDuration} min, ${this.activityCalories} cal (${now.toLocaleString()})`);
        this.updateStatistics(parseInt(this.activityDuration), parseInt(this.activityCalories));
        this.activityName = '';
        this.activityDuration = '';
        this.activityCalories = '';
        this.saveUserData();
      }
    },
    startGoal(index) {
      this.nuevasMetas[index].status = 'En progreso';
      this.saveUserData();
    },
    completeGoal(index) {
    const completedGoal = this.nuevasMetas.splice(index, 1)[0];
    completedGoal.status = 'Completada';  // Asegúrate de asignar el status
    this.metasAlcanzadas.push(completedGoal);
    this.updateCompletedGoals();
    this.saveUserData();
    },
    cancelGoal(index) {
      this.nuevasMetas.splice(index, 1);
      this.saveUserData();
    },
    updateCompletedGoals() {
      this.metasCompletadas = this.metasAlcanzadas.length;
    },
    updateStatistics(duration, calories) {
      const [horas, minutos] = this.tiempoEjercicio.split('h');
      let totalMinutos = parseInt(horas) * 60 + parseInt(minutos.replace('m', '')) + duration;
      let nuevasHoras = Math.floor(totalMinutos / 60);
      let nuevosMinutos = totalMinutos % 60;
      this.tiempoEjercicio = `${nuevasHoras}h ${nuevosMinutos}m`;
      this.caloriasQuemadas += calories;
    }
  }
};
</script>


<style scoped>
@import '@/assets/css/progreso-styles.css';

.sidebar {
  display: none;
  transition: transform 0.3s ease;
}

.sidebar.open {
  display: block;
  transform: translateX(0);
}

.status-No-iniciado {
  color: gray;
}

.status-En-progreso {
  color: orange;
}

.status-Completada {
  color: green;
}

button {
  margin-left: 5px;
}

/* Estilos para el estado completado */
.status-no {
  display: inline-block;
  margin-left: 10px;
  padding: 2px 5px;
  border-radius: 3px;
  color: rgb(253, 0, 0);
}

.status {
  display: inline-block;
  margin-left: 10px;
  padding: 2px 5px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
}


.status.completed {
  background-color: green;
}
</style>
