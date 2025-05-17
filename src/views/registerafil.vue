<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <button @click="$router.go(-1)" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Volver
            </button>
            <router-link to="/" class="flex items-center">
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                ProVeo
              </span>
            </router-link>
            <div class="w-10"></div> <!-- Espacio para equilibrar el layout -->
          </div>
        </div>
      </header>
  
      <!-- Resto del template se mantiene igual -->
      <main class="py-12">
        <div class="container mx-auto px-6 max-w-2xl">
          <div class="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Registro de Afiliados
                </span>
              </h2>
              <p class="text-gray-600">Completa tus datos para acceder a nuestra red de proveedores</p>
            </div>
  
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Información Básica -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre(s)*</label>
                  <input 
                    v-model="form.nombre"
                    type="text" 
                    id="nombre" 
                    placeholder="Ingresa tu nombre" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                </div>
                <div>
                  <label for="apellidos" class="block text-sm font-medium text-gray-700 mb-1">Apellidos*</label>
                  <input 
                    v-model="form.apellidos"
                    type="text" 
                    id="apellidos" 
                    placeholder="Ingresa tus apellidos" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                </div>
              </div>
  
              <!-- Datos de Contacto -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico*</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  id="email" 
                  placeholder="tu@empresa.com" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
              </div>
  
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1">Teléfono*</label>
                  <input 
                    v-model="form.telefono"
                    type="tel" 
                    id="telefono" 
                    placeholder="+52 55 1234 5678" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                </div>
                <div>
                  <label for="puesto" class="block text-sm font-medium text-gray-700 mb-1">Puesto/Cargo*</label>
                  <input 
                    v-model="form.puesto"
                    type="text" 
                    id="puesto" 
                    placeholder="Ej. Gerente de compras" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                </div>
              </div>
  
              <!-- Información de Empresa -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Información de tu empresa</h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="empresa" class="block text-sm font-medium text-gray-700 mb-1">Nombre de empresa*</label>
                    <input 
                      v-model="form.empresa"
                      type="text" 
                      id="empresa" 
                      placeholder="Nombre legal" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label for="rfc" class="block text-sm font-medium text-gray-700 mb-1">RFC*</label>
                    <input 
                      v-model="form.rfc"
                      type="text" 
                      id="rfc" 
                      placeholder="RFC de la empresa" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                </div>
  
                <div class="mt-6">
                  <label for="industria" class="block text-sm font-medium text-gray-700 mb-1">Industria/ Sector*</label>
                  <select 
                    v-model="form.industria"
                    id="industria" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="textil">Textil y confección</option>
                    <option value="manufactura">Manufactura</option>
                    <option value="comercio">Comercio minorista</option>
                    <option value="distribucion">Distribución</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
  
                <div class="mt-6">
                  <label for="tamano" class="block text-sm font-medium text-gray-700 mb-1">Tamaño de empresa*</label>
                  <select 
                    v-model="form.tamano"
                    id="tamano" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="micro">Micro (1-10 empleados)</option>
                    <option value="pequena">Pequeña (11-50 empleados)</option>
                    <option value="mediana">Mediana (51-250 empleados)</option>
                    <option value="grande">Grande (+250 empleados)</option>
                  </select>
                </div>
              </div>
  
              <!-- Contraseña -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Seguridad</h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña*</label>
                    <input 
                      v-model="form.password"
                      type="password" 
                      id="password" 
                      placeholder="••••••••" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      minlength="8"
                    >
                    <p class="mt-1 text-xs text-gray-500">Mínimo 8 caracteres</p>
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña*</label>
                    <input 
                      v-model="form.confirmPassword"
                      type="password" 
                      id="confirmPassword" 
                      placeholder="••••••••" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                  </div>
                </div>
  
                <div class="mt-6">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input 
                        v-model="form.terminos"
                        id="terminos" 
                        type="checkbox" 
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      >
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="terminos" class="font-medium text-gray-700">Acepto los <a href="#" class="text-blue-600 hover:text-blue-800">Términos del servicio</a> y <a href="#" class="text-blue-600 hover:text-blue-800">Política de privacidad</a>*</label>
                    </div>
                  </div>
                </div>
              </div>
  
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">Completar registro</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              </button>
            </form>
  
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                ¿Ya tienes una cuenta? 
                <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-800">Inicia sesión</router-link>
              </p>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-gray-300 py-12">
        <div class="container mx-auto px-6">
          <div class="text-center">
            <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              ProVeo
            </span>
            <p class="mt-4 text-sm max-w-2xl mx-auto">
              Plataforma líder en gestión inteligente de compras y cadena de suministro para empresas innovadoras.
            </p>
            <div class="flex justify-center space-x-6 mt-8">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2023 ProVeo. Todos los derechos reservados. <a href="#" class="hover:text-white transition-colors">Términos</a> · <a href="#" class="hover:text-white transition-colors">Política de privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterAfiliado',
    data() {
      return {
        loading: false,
        form: {
          nombre: '',
          apellidos: '',
          email: '',
          telefono: '',
          puesto: '',
          empresa: '',
          rfc: '',
          industria: '',
          tamano: '',
          password: '',
          confirmPassword: '',
          terminos: false
        }
      }
    },
    methods: {
      async submitForm() {
        // Validación básica
        if (this.form.password !== this.form.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
  
        if (!this.form.terminos) {
          alert('Debes aceptar los términos y condiciones');
          return;
        }
  
        this.loading = true;
  
        try {
          // Aquí iría la llamada a tu API para registrar al afiliado
          const response = await this.$axios.post('/api/afiliados/registro', this.form);
          
          // Si el registro es exitoso, redirigir al dashboard
          this.$router.push('/dashboard-afiliado');
          
        } catch (error) {
          console.error('Error en el registro:', error);
          alert('Ocurrió un error durante el registro. Por favor intenta nuevamente.');
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Efectos personalizados */
  input:focus, select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  
  /* Transiciones suaves */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  /* Animación para botones */
  .hover-animate:hover {
    transform: translateY(-2px);
  }
  
  /* Degradados personalizados */
  .bg-gradient-afiliado {
    background-image: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.05) 90%);
  }
  
  /* Estilo para el botón de volver */
  header button {
    transition: color 0.2s ease;
  }
  header button:hover {
    color: #2563eb; /* blue-600 */
  }
  </style>