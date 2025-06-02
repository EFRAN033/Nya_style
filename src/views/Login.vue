<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-white">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link 
            to="/" 
            class="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition-colors duration-200"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-xl font-bold">Pidelo<span class="text-pink-600">YA</span></span>
          </router-link>
          <nav class="flex space-x-8">
            <router-link 
              to="/" 
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Logo centrado (opcional, puedes quitarlo si prefieres) -->
        <div class="text-center">
          <router-link to="/" class="flex items-center justify-center space-x-2">
            <svg class="w-10 h-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-2xl font-bold text-gray-800">Pidelo<span class="text-pink-600">YA</span></span>
          </router-link>
          <p class="mt-2 text-sm text-gray-600">Tu solución rápida de compras</p>
        </div>

        <!-- Card principal -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
          <div class="p-8">
            <!-- Selector de tipo de usuario mejorado -->
            <div class="flex justify-center mb-6">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  @click="userType = 'customer'"
                  :class="{'bg-pink-600 text-white': userType === 'customer', 'bg-white text-gray-700 hover:bg-gray-50': userType !== 'customer'}"
                  class="px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-200 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Cliente
                </button>
                <button
                  @click="userType = 'seller'"
                  :class="{'bg-pink-600 text-white': userType === 'seller', 'bg-white text-gray-700 hover:bg-gray-50': userType !== 'seller'}"
                  class="px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-200 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Vendedor
                </button>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
              Inicia sesión en tu cuenta
            </h2>
            
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
              <div class="rounded-md shadow-sm space-y-4">
                <div>
                  <label for="email" class="sr-only">Correo electrónico</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      v-model="loginForm.email"
                      type="email"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="correo@ejemplo.com"
                    >
                  </div>
                </div>
                
                <div>
                  <label for="password" class="sr-only">Contraseña</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Contraseña"
                    >
                  </div>
                  <div class="mt-2 flex justify-end">
                    <router-link 
                      to="/forgot-password" 
                      class="text-xs text-pink-600 hover:text-pink-500 font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </router-link>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 shadow-md"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-pink-300 group-hover:text-pink-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Iniciar sesión
                </button>
              </div>
            </form>
            
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    ¿Eres nuevo en PideloYA?
                  </span>
                </div>
              </div>
              
              <div class="mt-6">
                <button
                  @click="goToRegister"
                  class="group relative w-full flex justify-center py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Crear una cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userType = ref('customer'); // 'customer' o 'seller'

const loginForm = ref({
  email: '',
  password: ''
});

const goToRegister = () => {
  // Redirige a Register.vue con el tipo de usuario como parámetro
  router.push({ 
    path: '/register',
    query: { type: userType.value }
  });
};

const handleLogin = async () => {
  try {
    console.log('Login data:', {
      userType: userType.value,
      ...loginForm.value
    });
    
    // Aquí iría la lógica de autenticación
    // Redirigir según el tipo de usuario
    if (userType.value === 'customer') {
      router.push('/');
    } else {
      router.push('/vendedor/dashboard');
    }
  } catch (error) {
    console.error('Error en el login:', error);
    // Mostrar mensaje de error al usuario
  }
};
</script>