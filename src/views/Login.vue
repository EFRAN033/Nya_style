<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-white">
    <!-- Encabezado simplificado para la página de login -->
    <header class="bg-white shadow-sm" v-if="!isLoginPage">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link 
            to="/" 
            class="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition-colors duration-200"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-xl font-bold">Vistete<span class="text-pink-600">YA</span></span>
          </router-link>

          <router-link 
            v-if="isAuthenticated"
            to="/profile" 
            class="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </router-link>
          
          <router-link
            v-else
            to="/login"
            class="text-sm font-medium text-pink-600 hover:text-pink-700 px-4 py-2 rounded-md hover:bg-pink-50 transition-colors duration-200"
          >
            Iniciar sesión
          </router-link>
        </div>
      </div>
    </header>

    <!-- Formulario -->
    <main class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <router-link to="/" class="flex items-center justify-center space-x-2">
            <svg class="w-10 h-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="text-2xl font-bold text-gray-800">Vistete<span class="text-pink-600">YA</span></span>
          </router-link>
          <p class="mt-2 text-sm text-gray-600">Tu solución rápida de compras</p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
          <div class="p-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
              Inicia sesión en tu cuenta
            </h2>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
              <div class="space-y-4">
                <div>
                  <label for="email" class="sr-only">Correo electrónico</label>
                  <div class="relative">
                    <input
                      id="email"
                      v-model="loginForm.email"
                      type="email"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="correo@ejemplo.com"
                    />
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="password" class="sr-only">Contraseña</label>
                  <div class="relative">
                    <input
                      id="password"
                      v-model="loginForm.password"
                      type="password"
                      required
                      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50"
                >
                  <span v-if="!loading">Iniciar sesión</span>
                  <span v-else>Procesando...</span>
                </button>
              </div>
            </form>

            <div class="mt-6 text-center">
              <router-link to="/register" class="text-sm text-pink-600 hover:underline">
                ¿No tienes una cuenta? Regístrate aquí
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const loading = ref(false)

// Verificar si estamos en la página de login
const isLoginPage = computed(() => route.path === '/login')

// Verificar autenticación
const isAuthenticated = computed(() => {
  return localStorage.getItem('usuario_id') !== null
})

const loginForm = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  
  try {
    const response = await axios.post(
      'http://localhost:5000/login',
      {
        email: loginForm.email,
        password: loginForm.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.usuario_id) {
      localStorage.setItem('usuario_id', response.data.usuario_id)
      router.push('/dashboard')
    }
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('Email o contraseña incorrectos')
          break
        case 500:
          alert('Error del servidor. Intente más tarde')
          break
        default:
          alert('Error desconocido')
      }
    } else {
      alert('No se pudo conectar al servidor')
    }
    console.error('Error en login:', error)
  } finally {
    loading.value = false
  }
}
</script>