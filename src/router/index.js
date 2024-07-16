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
  { path: '/principal', component: PrincipalIndex, meta: { requiresAuth: true } },
  { path: '/blog', component: BlogPage, meta: { requiresAuth: true } },
  { path: '/calendario', component: CalendarPage, meta: { requiresAuth: true } },
  { path: '/claseslist', component: Clases, meta: { requiresAuth: true } },
  { path: '/membresia', component: MembresiaPage, meta: { requiresAuth: true } },
  { path: '/galeria', component: GaleriaGimnasio, meta: { requiresAuth: true } },
  { path: '/perfil', component: PerfilIndex, meta: { requiresAuth: true } },
  { path: '/inicio', component: UserLogin },
  { path: '/mantenimiento', component: MaintenancePage, meta: { requiresAuth: true } },
  { path: '/pagos', component: PagosIndex, meta: { requiresAuth: true } },
  { path: '/progreso', component: ProgresoIndex, meta: { requiresAuth: true } },
  { path: '/registro', component: RegistroIndex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedInUser) {
    // Si la ruta requiere autenticación y el usuario no ha iniciado sesión
    next('/inicio'); // Redirigir a la página de inicio de sesión
  } else {
    next(); // Dejar que el usuario continúe
  }
});

export default router;
