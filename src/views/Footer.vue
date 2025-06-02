<template>
  <footer class="bg-gray-900 text-white py-8 px-4">
    <div class="container mx-auto">
      <!-- Grid de 3 columnas (md+) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Columna 1: Enlaces rápidos -->
        <div>
          <h3 class="text-lg font-bold mb-4">VisteteYA</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-pink-400 transition">Inicio</a></li>
            <li><a href="#" class="hover:text-pink-400 transition">Explorar prendas</a></li>
            <li><a href="#" class="hover:text-pink-400 transition">Cómo funciona</a></li>
            <li><a href="#" class="hover:text-pink-400 transition">FAQs</a></li>
          </ul>
        </div>

        <!-- Columna 2: Contacto -->
        <div>
          <h3 class="text-lg font-bold mb-4">Contacto</h3>
          <p class="mb-2">¿Necesitas ayuda?</p>
          <a href="mailto:soporte@modarenta.com" class="text-pink-400 hover:underline hover:text-pink-300">soporte@visteteYA.com</a>
          
          <!-- Redes Sociales -->
          <div class="mt-4 flex space-x-4">
            <a href="#"><IconInstagram class="w-6 h-6 hover:text-pink-400 transition" /></a>
            <a href="#"><IconTwitter class="w-6 h-6 hover:text-pink-400 transition" /></a>
          </div>
        </div>

        <!-- Columna 3: Suscripción (para arrendadores) -->
        <div>
          <h3 class="text-lg font-bold mb-4">¿Quieres subir tus prendas?</h3>
          <p class="mb-4">Únete como arrendador y gana dinero con tu armario.</p>
          <button 
            @click="navigateToUpload"
            class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition"
          >
            Comenzar ahora
          </button>
        </div>
      </div>

      <!-- Línea divisoria y copyright -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© 2025 VisteteYA. Todos los derechos reservados.</p>
        <div class="mt-2 space-x-4">
          <a href="#" class="hover:text-white transition">Términos</a>
          <a href="#" class="hover:text-white transition">Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToUpload = () => {
  // Redirige al formulario de registro de arrendador
  router.push('/arrendador/registro');
};
</script>