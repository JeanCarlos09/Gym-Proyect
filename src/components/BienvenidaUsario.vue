<template>
  <!-- Contenedor principal de la página -->
  <div id="body-bienvenido">

    <!-- Encabezado de la página -->
    <header id="header-bienvenido">
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
      <nav class="nav-bienvenido">
        <!-- Botón para iniciar sesión -->
        <button @click="navigateTo('inicio')">Iniciar Sesión</button>
        <!-- Botón para registrarse -->
        <button @click="navigateTo('registro')">Registrarse</button>
      </nav>
    </header>

    <!-- Sección principal de bienvenida -->
    <div id="main-bienvenida">
      <!-- Contenido de bienvenida -->
      <div class="welcome-bienvenida">
        <!-- Texto de bienvenida -->
        <div class="text-binvenda">
          <!-- Encabezado de bienvenida -->
          <h2 class="HCJ-bienvenido">¡Bienvenido a nuestro Gym!</h2>
          <!-- Párrafo descriptivo -->
          <p class="p-bievenida">
            En este sitio web, podrás descubrir todo lo que nuestro gimnasio tiene para ofrecerte. <br>
            <br>
            Nuestro sistema está diseñado para proporcionarte una experiencia de entrenamiento interactiva y efectiva,
            ayudándote a desarrollar las habilidades necesarias para alcanzar tus objetivos de fitness y bienestar. <br>
            <br>
            Comienza tu viaje hoy y descubre todo lo que puedes lograr con nuestras herramientas y recursos de
            entrenamiento. <br>
            <br>
            Regístrate para empezar o inicia sesión si ya tienes una cuenta.
          </p> <br>
          <!-- Botones de llamada a la acción -->
          <div class="btn-bienvenida">
            <a class="button" @click="navigateTo('registro')"><b>Regístrate</b></a>
            <a class="button" @click="navigateTo('inicio')"><b>Inicia sesión</b></a>
          </div>
        </div>
        <!-- Imagen de bienvenida -->
        <div class="image-bienvenida">
          <img src="@/assets/imagenes/bienvenida-img/main.png" alt="Imagen de aprendizaje">
        </div>
      </div>

      <!-- Sección sobre la importancia del ejercicio -->
      <div class="content-section-bienvenida">
        <div class="text-bienbenifa">
          <!-- Encabezado sobre la importancia del ejercicio -->
          <h2>¿Por qué es importante hacer ejercicio en el gimnasio?</h2>
          <!-- Párrafo explicativo -->
          <p>Hacer ejercicio regularmente en el gimnasio es esencial para mantener una buena salud física. El ejercicio
            ayuda a fortalecer los músculos, mejorar la resistencia cardiovascular y aumentar la flexibilidad. Además,
            reduce el riesgo de enfermedades crónicas como la diabetes, hipertensión y enfermedades del corazón.</p>
        </div>
        <!-- Imagen relacionada con la importancia del ejercicio -->
        <div class="image">
          <img src="@/assets/imagenes/bienvenida-img/foto1.jpg" alt="importancia">
        </div>
      </div>

      <!-- Sección sobre los beneficios del bienestar mental -->
      <div class="content-section-bienvenida">
        <div class="text-bienbenifa">
          <!-- Encabezado sobre el bienestar mental -->
          <h2>Beneficios del Bienestar Mental en el Gimnasio</h2>
          <!-- Párrafo explicativo -->
          <p>El ejercicio en el gimnasio también tiene beneficios significativos para la salud mental. Libera
            endorfinas, que son hormonas que mejoran el estado de ánimo y reducen el estrés y la ansiedad. Además, el
            ejercicio regular puede mejorar la calidad del sueño y aumentar la autoestima.</p>
        </div>
        <!-- Imagen relacionada con los beneficios mentales -->
        <div class="image">
          <img src="@/assets/imagenes/bienvenida-img/beneficios.jpg" alt="beneficios">
        </div>
      </div>

      <!-- Sección sobre la variedad de equipos y clases en el gimnasio -->
      <div class="content-section-bienvenida">
        <div class="text-bienbenifa">
          <!-- Encabezado sobre la variedad de equipos -->
          <h2>Variedad de Equipos y Clases en el Gimnasio</h2>
          <!-- Párrafo explicativo -->
          <p>En un gimnasio, tienes acceso a una variedad de equipos y servicios que pueden ayudarte a personalizar tu
            entrenamiento según tus necesidades y objetivos. Desde pesas y máquinas de cardio hasta clases grupales y
            entrenadores personales, un gimnasio ofrece las herramientas necesarias para optimizar tu rutina de
            ejercicios.</p>
        </div>
        <!-- Imagen relacionada con los equipos y clases -->
        <div class="image">
          <img src="@/assets/imagenes/bienvenida-img/equipos.jpg" alt="equipos">
        </div>
      </div>
    </div>

    <!-- Pie de página -->
    <footer id="footer-bienvenida">
      <!-- Navegación en el pie de página -->
      <nav class="footer-nav">
        <!-- Enlace a los términos y condiciones -->
        <a href="#terminos">Términos y Condiciones</a>
        <!-- Enlace a la política de privacidad -->
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <!-- Información de contacto -->
      <div class="contacto-bienvenida">
        <p class="p-bienvenida">Gimnasio Universitario</p>
        <p class="p-bienvenida">Dirección: Calle Falsa 123</p>
        <p class="p-bienvenida">Teléfono: 555-1234</p>
        <p class="p-bienvenida">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
// Exporta el componente Vue
export default {
  // Nombre del componente
  name: 'BienvenidaUsuario',
  methods: {
    // Método para navegar a diferentes rutas
    navigateTo(route) {
      // Utiliza el router de Vue para cambiar de ruta
      this.$router.push({ path: `/${route}` });
    }
  }
}
</script>

<style scoped>
/* Importa el archivo CSS específico para este componente */
@import '@/assets/css/BienvenidaUsario.css';
</style>
