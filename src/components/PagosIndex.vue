<template>
  <div id="body-pagos">
    <!-- Encabezado -->
    <header id="header-pagos">
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
        <router-link to="/galeria"><b>Galería</b></router-link>
        <router-link to="/blog"><b>Blog</b></router-link>
        <div class="sidebar-icon" @click="toggleSidebar"><b>☰</b></div>
      </nav>
    </header>
    <!----------------------------------------------------------------------------------------------------------------->
    <!-- Barra lateral -->
    <aside id="sidebar" class="sidebar" :class="{ 'open': sidebarOpen }">
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Aquí se muestran el nombre y el correo del usuario -->
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
      </div>
      <hr>
      <router-link to="/perfil">Perfil</router-link>
      <hr>
      <router-link to="/inicio" @click="logout">Salir</router-link>
    </aside>
    <!----------------------------------------------------------------------------------------------------------------->

    <!-- Contenido principal -->
    <div id="main-pagos">
      <!-- Selector de tipo de membresía -->
      <label for="membership-type">
        <h2>Seleccione el tipo de membresía:</h2>
      </label>
      <select id="membership-type" class="custom-select-pagos" v-model="selectedMembership" @change="guardarSeleccion">
        <option value="">Seleccione una opción</option>
        <option value="day">Membresía por Día</option>
        <option value="month">Membresía por Mes</option>
        <option value="quarter">Membresía Trimestral</option>
        <option value="semester">Membresía Semestral</option>
        <option value="year">Membresía Anual</option>
      </select>

      <div class="container">
        <!-- Información de membresía -->
        <div class="parte izquierda" id="membership-info" v-html="membershipInfo"></div>
        <!-- Formulario de pago -->
        <div class="parte derecha">
          <form id="membership-form" @submit.prevent="procesarPago">
            <div class="form-section-pagos">
              <p>Método de pago:</p>
              <div class="payment-option-pagos">
                <input type="radio" id="credit-card" name="payment-method" value="credit-card"
                  v-model="selectedPaymentMethod" @change="mostrarPagos">
                <label for="credit-card" class="payment-method-label-pagos">Tarjeta de crédito/débito</label>
                <img src="@/assets/imagenes/pagos-img/master.png" alt="MasterCard Logo">
                <img src="@/assets/imagenes/pagos-img/visa.png" alt="Visa Logo">
              </div>
              <div class="payment-option-pagos">
                <input type="radio" id="paypal" name="payment-method" value="paypal" v-model="selectedPaymentMethod"
                  @change="mostrarPagos">
                <label for="paypal" class="payment-method-label-pagos">PayPal</label>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal Logo">
              </div>
            </div>


            <!-- Mensaje de advertencia -->
            <div v-if="showAlert" class="alert" :class="alertType">
              <p>{{ alertMessage }}</p>
            </div>

            <!-- Mensaje de advertencia para membresía -->
            <div v-if="showMembershipAlert" class="alert alert-warning">
              <p>Debe comprar una membresía para inscribirse en las clases. Por favor, visite la sección de membresía.
              </p>
            </div>

            <!-- Mensaje de éxito -->
            <div v-if="showSuccessMessage" class="success-message">
              <h2>¡Tu compra fue un éxito!</h2>
            </div>

            <hr class="divider">
            <div class="payment-info" id="payment-info">
              <div v-if="selectedPaymentMethod === 'credit-card'">
                <label for="cardNumber">Número de tarjeta:</label>
                <input type="text" id="cardNumber" v-model="paymentDetails.cardNumber" @input="validarNumeroTarjeta"
                  placeholder="Número de Tarjeta">
                <span class="error">{{ validationErrors.cardNumber }}</span>

                <label for="cardExpiry">Fecha de expiración:</label>
                <input type="text" id="cardExpiry" v-model="paymentDetails.cardExpiry" @input="validarFechaExpiracion"
                  placeholder="MM/AA">
                <span class="error">{{ validationErrors.cardExpiry }}</span>

                <label for="cardCvc">CVC:</label>
                <input type="text" id="cardCvc" v-model="paymentDetails.cardCvc" @input="validarCvc"
                  placeholder="Código de control">
                <span class="error">{{ validationErrors.cardCvc }}</span>
              </div>

              <!-- Ejemplo para PayPal -->
              <div v-if="selectedPaymentMethod === 'paypal'">
                <label for="paypalEmail">Email de PayPal:</label>
                <input type="email" id="paypalEmail" v-model="paymentDetails.paypalEmail" @input="validarEmailPayPal"
                  placeholder="Correo Electrónico">
                <span class="error">{{ validationErrors.paypalEmail }}</span>
              </div>

              <!-- Botón de realizar pago -->
              <button class="boton-pagos" :disabled="!isFormValid" type="submit">Realizar Pago</button>
            </div>
          </form>
        </div>
      </div>

      <hr class="divider">

      <!-- Historial de transacciones -->
      <div class="detalles">
        <h3>Historial de Transacciones</h3>
        <div class="historial-transacciones">
          <table id="tabla-pagos">
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Comprobante</th>
            </tr>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.description }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.status }}</td>
              <td><a :href="transaction.receipt">Descargar</a></td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Pie de página -->
    <footer id="footer-pagos">
      <nav class="footer-nav">
        <a href="#terminos">Términos y Condiciones</a>
        <a href="#privacidad">Política de Privacidad</a>
      </nav>
      <div class="contacto-pagos">
        <p class="p-pagos">Gimnasio Universitario</p>
        <p class="p-pagos">Dirección: Calle Falsa 123</p>
        <p class="p-pagos">Teléfono: 555-1234</p>
        <p class="p-pagos">Email: info@gimnasio.com</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { toggleSidebar as toggleSidebarScript, navigateTo } from '@/assets/js/pagos-scripts.js';

export default {
  name: 'PagosIndex',
  data() {
    return {
      showAlert: false,
      alertMessage: '',
      alertType: 'alert-warning',
      showMembershipAlert: false,
      selectedPaymentMethod: '',
      sidebarOpen: false,
      user: {
        name: '',
        email: ''
      },
      selectedMembership: '',
      membershipInfo: '',
      paymentDetails: {
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        paypalEmail: ''
      },
      images: {
        day: require('@/assets/imagenes/membresia-img/DIA.png'),
        month: require('@/assets/imagenes/membresia-img/mensual.png'),
        quarter: require('@/assets/imagenes/membresia-img/trimestral.png'),
        semester: require('@/assets/imagenes/membresia-img/semestral.png'),
        year: require('@/assets/imagenes/membresia-img/anual.png')
      },
      transactions: [],
      validationErrors: {
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
      },
      showSuccessMessage: false
    };
  },
  computed: {
    isFormValid() {
      // Verificar si todos los campos están válidos
      return !Object.values(this.validationErrors).some(error => error);
    }
  },
  mounted() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (loggedInUserEmail) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === loggedInUserEmail);
      if (user) {
        this.user.name = `${user.name} ${user.surname}`;
        this.user.email = user.email;
      }

      const savedTransactions = JSON.parse(localStorage.getItem(`transactions_${loggedInUserEmail}`)) || [];
      this.transactions = savedTransactions;
    }
  },
  methods: {

    mostrarAlerta(mensaje, tipo = 'alert-warning') {
      this.alertMessage = mensaje;
      this.alertType = tipo;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000); // Mostrar el mensaje por 3 segundos
    },

    toggleSidebar() {
      this.sidebarOpen = toggleSidebarScript(this.sidebarOpen);
    },
    navigateTo(url) {
      navigateTo(url, this.$router);
    },
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$router.push('/inicio');
    },
    guardarSeleccion() {
      const membershipData = {
        day: `
          <img class="img-pagos" src="${this.images.day}" alt="Membresía por Día">
          <ul class="ul-pagos">
            <h6 class="text"><b>Beneficios </b></h6>
            <h6><b>- Acceso Ilimitado a Equipos de Gimnasio</b></h6>
            <h6><b>- Sin acceso a inscribirse a clases Grupales</b></h6>
            <hr class="divider">
            <h6 class="text"><b>Descripción</b></h6>
            <h6><b>Ideal para aquellos que desean acceso temporal y flexible a las instalaciones. Perfecta para visitantes ocasionales o personas que desean probar los servicios antes de comprometerse a un plan a largo plazo.</b></h6>
            <hr class="divider">
            <h4 class="text1"><b>Costo: $5</b></h4>
          </ul>
        `,
        month: `
          <img class="img-pagos" src="${this.images.month}" alt="Membresía por Mes">
          <ul class="ul-pagos">
            <h6 class="text"><b>Beneficios </b></h6>
            <h6><b>- Acceso Ilimitado a Equipos de Gimnasio</b></h6>
            <h6><b>- Acceso a inscribirse a Clases Grupales</b></h6>
            <h6><b>- Uso de la Piscina y Sauna</b></h6>
            <h6><b>- Descuento en Eventos Especiales (5%)</b></h6>
            <hr class="divider">
            <h6 class="text"><b>Descripción</b></h6>
            <h6><b>Una opción conveniente para aquellos que buscan un compromiso a corto plazo. Ideal para personas que prefieren evaluar su uso mes a mes.</b></h6>
            <hr class="divider">
            <h4 class="text1"><b>Costo: $20</b></h4>
          </ul>
        `,
        quarter: `
          <img class="img-pagos" src="${this.images.quarter}" alt="Membresía Trimestral">
          <ul class="ul-pagos">
            <h6 class="text"><b>Beneficios </b></h6>
            <h6><b>- Acceso Ilimitado a Equipos de Gimnasio</b></h6>
            <h6><b>- Acceso a inscribirse a Clases Grupales</b></h6>
            <h6><b>- Uso de la Piscina y Sauna</b></h6>
            <h6><b>- Descuento en Eventos Especiales (10%)</b></h6>
            <h6><b>- Una Sesión Gratuita con un Entrenador Personal</b></h6>
            <hr class="divider">
            <h6 class="text"><b>Descripción</b></h6>
            <h6><b>Un plan intermedio que ofrece un equilibrio entre compromiso y flexibilidad. Excelente para aquellos que buscan mantener un régimen de ejercicios durante un período más largo.</b></h6>
            <hr class="divider">
            <h4 class="text1"><b>Costo: $50</b></h4>
          </ul>
        `,
        semester: `
          <img class="img-pagos" src="${this.images.semester}" alt="Membresía Semestral">
          <ul class="ul-pagos">
            <h6 class="text"><b>Beneficios </b></h6>
            <h6><b>- Acceso Ilimitado a Equipos de Gimnasio</b></h6>
            <h6><b>- Acceso a inscribirse a Clases Grupales</b></h6>
            <h6><b>- Uso de la Piscina y Sauna</b></h6>
            <h6><b>- Descuento en Eventos Especiales (15%)</b></h6>
            <h6><b>- Tres Sesiones Gratuitas con un Entrenador Personal</b></h6>
            <h6><b>- Acceso Prioritario a Nuevas Clases</b></h6>
            <hr class="divider">
            <h6 class="text"><b>Descripción</b></h6>
            <h6><b>Ideal para usuarios dedicados que desean un plan a mediano plazo. Ofrece beneficios adicionales y mayor valor en comparación con las opciones a corto plazo.</b></h6>
            <hr class="divider">
            <h4 class="text1"><b>Costo: $60</b></h4>
          </ul>
        `,
        year: `
          <img class="img-pagos" src="${this.images.year}" alt="Membresía Anual">
          <ul class="ul-pagos">
            <h6 class="text"><b>Beneficios </b></h6>
            <h6><b>- Acceso Ilimitado a Equipos de Gimnasio</b></h6>
            <h6><b>- Acceso a inscribirse a Clases Grupales</b></h6>
            <h6><b>- Uso de la Piscina y Sauna</b></h6>
            <h6><b>- Descuento en Eventos Especiales (20%)</b></h6>
            <h6><b>- Seis Sesiones Gratuitas con un Entrenador Personal</b></h6>
            <h6><b>- Acceso Prioritario a Nuevas Clases</b></h6>
            <h6><b>- Descuento del 10% en Productos de la Tienda del Gimnasio</b></h6>
            <hr class="divider">
            <h6 class="text"><b>Descripción</b></h6>
            <h6><b>Ideal para usuarios dedicados que desean un plan a largo plazo. Ofrece beneficios adicionales y mayor valor en comparación con las opciones a corto plazo.</b></h6>
            <hr class="divider">
            <h4 class="text1"><b>Costo: $350</b></h4>
          </ul>
        `
      };
      this.membershipInfo = membershipData[this.selectedMembership] || '<h3>Seleccione un tipo de membresía para ver los detalles.</h3>';

      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail && this.selectedMembership) {
        localStorage.setItem(`selectedMembership_${loggedInUserEmail}`, this.selectedMembership);
        this.membershipInfo = membershipData[this.selectedMembership];
      }
    },
    mostrarPagos() {
      const paymentData = {
        'credit-card': `
          <div class="form-group">
            <label class="tarj" for="tarjeta">Número de Tarjeta:</label>
            <input type="text" id="tarjeta" name="tarjeta" placeholder="Número de Tarjeta" oninput="validarNumero(this)">
            <span class="error-message" style="font-size: 12px; color: red;"></span>
          </div>
          <div class="form-group">
            <label class="tarj" for="Titular">Nombre del Titular:</label>
            <input type="text" id="Titular" name="Titular" placeholder="Nombre del Titular">
            <span class="error-message" style="font-size: 12px; color: red;"></span>
          </div>
          <div class="form-group">
            <label class="tarj" for="Expira">Expira:</label>
            <input type="month" id="Expira" name="Expira" placeholder="MM/YY">
            <span class="error-message" style="font-size: 12px; color: red;"></span>
          </div>
          <div class="form-group">
            <label class="tarj" for="Codigo">Código de control:</label>
            <input type="text" id="Codigo" name="Codigo" placeholder="Código de control" oninput="validarNumero(this)">
            <span class="error-message" style="font-size: 12px; color: red;"></span>
          </div>
          <button class="boton-pagos" @click="procesarCompra">Comprar</button>
        `,
        'paypal': `
          <div class="form-group">
            <label class="tarj" for="Correo">Correo Electrónico:</label>
            <input type="email" id="Correo" name="Correo" placeholder="Correo Electrónico">
            <span class="error-message" style="font-size: 12px; color: red;"></span>
          </div>
          <button class="boton-pagos" @click="procesarCompra">Comprar</button>
        `
      };
      this.paymentInfo = paymentData[this.selectedPaymentMethod] || '';
    },
    // Validación de número de tarjeta
    validarNumeroTarjeta() {
      const regex = /^\d{16}$/;
      this.validationErrors.cardNumber = regex.test(this.paymentDetails.cardNumber.replace(/\s+/g, '')) ? '' : 'Número de tarjeta inválido. Debe contener 16 dígitos.';
    },

    // Validación de fecha de expiración
    validarFechaExpiracion() {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      this.validationErrors.cardExpiry = regex.test(this.paymentDetails.cardExpiry) ? '' : 'Fecha de expiración inválida. Debe ser en formato MM/AA.';
    },

    // Validación del CVC
    validarCvc() {
      const regex = /^\d{3}$/;
      this.validationErrors.cardCvc = regex.test(this.paymentDetails.cardCvc) ? '' : 'CVC inválido. Debe contener 3 dígitos.';
    },

    // Validación del email de PayPal
    validarEmailPayPal() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.validationErrors.paypalEmail = regex.test(this.paymentDetails.paypalEmail) ? '' : 'Email de PayPal inválido.';
    },

    // Validación del formulario
    validarFormulario() {
      if (this.selectedPaymentMethod === 'credit-card') {
        this.validarNumeroTarjeta();
        this.validarFechaExpiracion();
        this.validarCvc();
      } else if (this.selectedPaymentMethod === 'paypal') {
        this.validarEmailPayPal();
      }
    },

    // Procesar el pago
    procesarPago() {
      // Validar que se haya seleccionado un método de pago
      if (!this.selectedPaymentMethod) {
        this.mostrarAlerta('Por favor, seleccione un método de pago.', 'alert-warning');
        return;
      }

      // Validar el formulario de pago
      this.validarFormulario();

      // Verificar si el formulario es válido
      if (!this.isFormValid) {
        this.mostrarAlerta('Por favor, complete el formulario correctamente.', 'alert-warning');
        return;
      }

      const loggedInUserEmail = localStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        // Crear una nueva transacción
        const newTransaction = {
          date: new Date().toLocaleDateString(),
          description: this.selectedMembership,
          amount:
            this.selectedMembership === 'day' ? '$5' :
              this.selectedMembership === 'month' ? '$20' :
                this.selectedMembership === 'quarter' ? '$50' :
                  this.selectedMembership === 'semester' ? '$60' :
                    this.selectedMembership === 'year' ? '$350' :
                      '',
          status: 'Completo',
          receipt: '#'
        };

        // Guardar la transacción en el localStorage
        this.transactions.push(newTransaction);
        localStorage.setItem(`transactions_${loggedInUserEmail}`, JSON.stringify(this.transactions));

        // Calcular la fecha de finalización de la membresía
        const startDate = new Date();
        let endDate;
        switch (this.selectedMembership) {
          case 'day':
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);
            break;
          case 'month':
            endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 1);
            break;
          case 'quarter':
            endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 3);
            break;
          case 'semester':
            endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 4);
            break;
          case 'year':
            endDate = new Date(startDate);
            endDate.setFullYear(startDate.getFullYear() + 1);
            break;
          default:
            endDate = new Date(startDate);
        }

        // Actualizar datos de la membresía
        const membershipData = {
          type: this.selectedMembership,
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          status: 'Activo'
        };
        localStorage.setItem(`membershipData_${loggedInUserEmail}`, JSON.stringify(membershipData));

        // Mostrar mensaje de éxito
        this.showSuccessMessage = true;

        // Redirigir al usuario a la página de membresía
        this.$router.push('/membresia');
      } else {
        alert('No hay usuario logueado.', 'alert-error');
      }
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/pagos-styles.css';

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
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-color: #ffeeba;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}
</style>