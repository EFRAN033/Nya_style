<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <!-- Barra superior -->
    <div class="border-b border-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center">
            <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 17L12 22L21 17" stroke="currentColor" stroke-width="2"/>
              <path d="M3 12L12 17L21 12" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="ml-2 text-xl font-bold text-gray-800">Nya<span class="text-purple-600">Style</span></span>
          </router-link>

          <!-- Menú desktop -->
          <nav class="hidden md:flex space-x-8">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              active-class="text-purple-600 border-b-2 border-purple-600"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <!-- Acciones usuario -->
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-purple-600">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <router-link to="/favorites" class="relative p-2 text-gray-500 hover:text-purple-600">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="favoritesCount > 0"
                    class="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ favoritesCount }}
              </span>
            </router-link>

            <button
              @click="toggleAuthModal"
              class="hidden md:block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
            >
              {{ user ? 'Mi Cuenta' : 'Unirse' }}
            </button>

            <!-- Botón menú mobile -->
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Categorías desktop -->
    <div class="bg-white hidden md:block">
      <div class="container mx-auto px-4">
        <div class="flex overflow-x-auto py-3 space-x-6 hide-scrollbar">
          <a
            v-for="category in categories"
            :key="category"
            href="#"
            class="whitespace-nowrap px-2 py-1 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            :class="{ 'text-purple-600 bg-purple-50': activeCategory === category }"
          >
            {{ category }}
          </a>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100">
      <div class="px-4 py-3 space-y-4">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="block py-2 text-gray-700 hover:text-purple-600 font-medium"
          active-class="text-purple-600"
        >
          {{ item.name }}
        </router-link>
        <button
          @click="toggleAuthModal"
          class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full"
        >
          {{ user ? 'Mi Cuenta' : 'Unirse' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Descubrir', path: '/explore' },
  { name: 'Diseñadores', path: '/designers' },
  { name: 'Ocasiones', path: '/occasions' },
];

const categories = [
  'Vestidos', 'Trajes', 'Bolsos', 'Zapatos',
  'Accesorios', 'Nueva Colección', 'Verano 2025'
];

const favoritesCount = ref(3);
const isMobileMenuOpen = ref(false);
const activeCategory = ref('Vestidos');
const user = ref(null); // Reemplaza por tu lógica real de auth

const toggleAuthModal = () => {
  // Mostrar modal de autenticación
  alert('Aquí se abriría el modal de login o cuenta');
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #7c3aed, #4f46e5);
}
</style>
