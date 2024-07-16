// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Bienvenida from '../components/BienvenidaUsario.vue';
import BlogPage from '../components/BlogPage.vue';
import PrincipalIndex from '../components/PrincipalIndex.vue';
import Clases from '../components/ClaseInscripciones.vue';
import MembresiaPage from '../components/MembresiaPage.vue';
import GaleriaGimnasio from '../components/GaleriaGimnasio.vue';
import PerfilIndex from '../components/PerfilIndex.vue';
import CalendarPage from '../components/CalendarPage.vue';
import UserLogin from '../components/UserLogin.vue';
import MaintenancePage from '../components/MaintenancePage.vue';
import PagosIndex from '../components/PagosIndex.vue';
import ProgresoIndex from '../components/ProgresoIndex.vue';
import RegistroIndex from '../components/RegistroIndex.vue';

const routes = [
  { path: '/', component: Bienvenida }, // Ruta por defecto a la página de bienvenida
  { path: '/principal', component: PrincipalIndex },
  { path: '/blog', component: BlogPage },
  { path: '/calendario', component: CalendarPage },
  { path: '/claseslist', component: Clases },
  { path: '/membresia', component: MembresiaPage },
  { path: '/galeria', component: GaleriaGimnasio },
  { path: '/perfil', component: PerfilIndex },
  { path: '/inicio', component: UserLogin },
  { path: '/mantenimiento', component: MaintenancePage },
  { path: '/pagos', component: PagosIndex },
  { path: '/progreso', component: ProgresoIndex },
  { path: '/registro', component: RegistroIndex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
