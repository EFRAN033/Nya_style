<template>
  <footer class="bg-gray-900 text-white py-8 px-4">
    <div class="container mx-auto">
      <!-- Grid de 3 columnas (md+) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Columna 1: Enlaces rápidos -->
        <div>
          <h3 class="text-lg font-bold mb-4">VisteteYA</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-pink-400 transition">Inicio</router-link></li>
            <li><router-link to="/explorar" class="hover:text-pink-400 transition">Explorar prendas</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-400 transition">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-400 transition">FAQs</router-link></li>
          </ul>
        </div>

        <!-- Columna 2: Contacto -->
        <div>
          <h3 class="text-lg font-bold mb-4">Contacto</h3>
          <p class="mb-2">¿Necesitas ayuda?</p>
          <a href="mailto:soporte@visteteya.com" class="text-pink-400 hover:underline hover:text-pink-300">soporte@visteteYA.com</a>
        </div>

        <!-- Columna 3: Suscripción (para arrendadores) -->
        <div>
          <h3 class="text-lg font-bold mb-4">¿Quieres subir tus prendas?</h3>
          <p class="mb-4">Únete como arrendador y gana dinero con tu armario.</p>
          <button 
            @click="navigateToRegister"
            class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Comenzar ahora
          </button>
        </div>
      </div>

      <!-- Línea divisoria y copyright -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© 2025 VisteteYA. Todos los derechos reservados.</p>
        <div class="mt-2 space-x-4">
          <router-link to="/terminos" class="hover:text-white transition">Términos</router-link>
          <router-link to="/privacidad" class="hover:text-white transition">Privacidad</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToRegister = () => {
  // Redirige al formulario de registro general
  router.push('/Register');
};
</script>