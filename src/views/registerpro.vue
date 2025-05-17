<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <button @click="$router.go(-1)" class="text-gray-600 hover:text-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <router-link to="/" class="flex items-center">
              <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                ProVeo
              </span>
            </router-link>
            <div class="w-6"></div> <!-- Espacio para mantener el balance -->
          </div>
        </div>
      </header>
  
      <!-- Formulario de Registro -->
      <main class="py-12">
        <div class="container mx-auto px-6 max-w-2xl">
          <div class="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Registro de Proveedores
                </span>
              </h2>
              <p class="text-gray-600">Completa tus datos para unirte a nuestra red de proveedores certificados</p>
            </div>
  
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Información de la Empresa -->
              <div>
                <label for="empresa" class="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa*</label>
                <input 
                  v-model="form.empresa"
                  type="text" 
                  id="empresa" 
                  placeholder="Nombre legal de tu empresa" 
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  required
                >
              </div>
  
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="rfc" class="block text-sm font-medium text-gray-700 mb-1">RFC*</label>
                  <input 
                    v-model="form.rfc"
                    type="text" 
                    id="rfc" 
                    placeholder="RFC de la empresa" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    required
                  >
                </div>
                <div>
                  <label for="anios" class="block text-sm font-medium text-gray-700 mb-1">Años de experiencia*</label>
                  <input 
                    v-model="form.anios"
                    type="number" 
                    id="anios" 
                    min="1"
                    placeholder="Ej. 3" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    required
                  >
                </div>
              </div>
  
              <!-- Categorías de Productos -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Categorías de productos/servicios*</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div v-for="category in categories" :key="category.id" class="flex items-center">
                    <input 
                      v-model="form.categorias"
                      :id="'category-'+category.id" 
                      type="checkbox" 
                      :value="category.id"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    >
                    <label :for="'category-'+category.id" class="ml-2 text-sm text-gray-700">{{ category.name }}</label>
                  </div>
                </div>
              </div>
  
              <!-- Información de Contacto -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Información de contacto</h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
                    <input 
                      v-model="form.nombre"
                      type="text" 
                      id="nombre" 
                      placeholder="Persona de contacto" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label for="puesto" class="block text-sm font-medium text-gray-700 mb-1">Puesto/Cargo*</label>
                    <input 
                      v-model="form.puesto"
                      type="text" 
                      id="puesto" 
                      placeholder="Ej. Gerente de ventas" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    >
                  </div>
                </div>
  
                <div class="mt-6">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico*</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    id="email" 
                    placeholder="contacto@empresa.com" 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    required
                  >
                </div>
  
                <div class="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label for="telefono" class="block text-sm font-medium text-gray-700 mb-1">Teléfono*</label>
                    <input 
                      v-model="form.telefono"
                      type="tel" 
                      id="telefono" 
                      placeholder="+52 55 1234 5678" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    >
                  </div>
                  <div>
                    <label for="whatsapp" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    <input 
                      v-model="form.whatsapp"
                      type="tel" 
                      id="whatsapp" 
                      placeholder="+52 55 1234 5678" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    >
                  </div>
                </div>
              </div>
  
              <!-- Información de Producción -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Capacidad de producción</h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="capacidad" class="block text-sm font-medium text-gray-700 mb-1">Capacidad mensual*</label>
                    <select 
                      v-model="form.capacidad"
                      id="capacidad" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1-100">1-100 unidades</option>
                      <option value="101-500">101-500 unidades</option>
                      <option value="501-2000">501-2,000 unidades</option>
                      <option value="2000+">Más de 2,000 unidades</option>
                    </select>
                  </div>
                  <div>
                    <label for="tiempo" class="block text-sm font-medium text-gray-700 mb-1">Tiempo de entrega promedio*</label>
                    <select 
                      v-model="form.tiempo"
                      id="tiempo" 
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="24h">24 horas</option>
                      <option value="3d">3 días</option>
                      <option value="1s">1 semana</option>
                      <option value="2s">2 semanas</option>
                      <option value="1m">1 mes</option>
                    </select>
                  </div>
                </div>
  
                <div class="mt-6">
                  <label for="certificaciones" class="block text-sm font-medium text-gray-700 mb-1">Certificaciones (opcional)</label>
                  <textarea 
                    v-model="form.certificaciones"
                    id="certificaciones" 
                    rows="2"
                    placeholder="Ej. ISO 9001, Orgánico, etc." 
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  ></textarea>
                </div>
              </div>
  
              <!-- Seguridad -->
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
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
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
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
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
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        required
                      >
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="terminos" class="font-medium text-gray-700">Acepto los <a href="#" class="text-emerald-600 hover:text-emerald-800">Términos del servicio</a> y <a href="#" class="text-emerald-600 hover:text-emerald-800">Política de privacidad</a>*</label>
                    </div>
                  </div>
                </div>
              </div>
  
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">Enviar solicitud</span>
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
                <router-link to="/login" class="font-medium text-emerald-600 hover:text-emerald-800">Inicia sesión</router-link>
              </p>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-gray-300 py-12">
        <div class="container mx-auto px-6">
          <div class="text-center">
            <span class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
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
    name: 'RegisterProveedor',
    data() {
      return {
        loading: false,
        categories: [
          { id: 'textiles', name: 'Textiles' },
          { id: 'insumos', name: 'Insumos' },
          { id: 'maquinaria', name: 'Maquinaria' },
          { id: 'servicios', name: 'Servicios' },
          { id: 'materia-prima', name: 'Materia prima' },
          { id: 'empaques', name: 'Empaques' }
        ],
        form: {
          empresa: '',
          rfc: '',
          anios: '',
          categorias: [],
          nombre: '',
          puesto: '',
          email: '',
          telefono: '',
          whatsapp: '',
          capacidad: '',
          tiempo: '',
          certificaciones: '',
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
  
        if (this.form.categorias.length === 0) {
          alert('Debes seleccionar al menos una categoría');
          return;
        }
  
        this.loading = true;
  
        try {
          // Aquí iría la llamada a tu API para registrar al proveedor
          const response = await this.$axios.post('/api/proveedores/registro', this.form);
          
          // Si el registro es exitoso, redirigir a página de confirmación
          this.$router.push('/registro-exitoso');
          
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
  input:focus, select:focus, textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
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
  .bg-gradient-proveedor {
    background-image: radial-gradient(circle at 10% 20%, rgba(5, 150, 105, 0.1) 0%, rgba(16, 185, 129, 0.05) 90%);
  }
  </style>