<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <!-- Barra superior -->
    <div class="border-b border-pink-100">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center">
            <svg class="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M3 17L12 22L21 17" stroke="currentColor" stroke-width="2"/>
              <path d="M3 12L12 17L21 12" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span class="ml-2 text-xl font-bold text-gray-800">Vistete<span class="text-pink-400">YA</span></span>
          </router-link>

          <!-- Menú desktop --> 
          <nav class="hidden md:flex space-x-8">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="text-gray-700 hover:text-pink-400 font-medium transition-colors"
              active-class="text-pink-400 border-b-2 border-pink-400"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <!-- Acciones usuario -->
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-500 hover:text-pink-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- Corazoncito -->
            <router-link to="/wishlist" class="relative p-2 text-gray-500 hover:text-pink-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="favoritesCount > 0"
                    class="absolute -top-1 -right-1 bg-pink-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ favoritesCount }}
              </span>
            </router-link>

            <button
              @click="goToLogin"
              class="hidden md:block bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
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
            :key="category.value"
            href="#"
            @click.prevent="selectCategory(category)"
            class="whitespace-nowrap px-2 py-1 text-sm font-medium text-gray-600 hover:text-pink-400 hover:bg-pink-50 rounded-full transition-colors"
            :class="{ 'text-pink-400 bg-pink-50': activeCategory === category.value }"
          >
            {{ category.name }}
          </a>
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-pink-100">
      <div class="px-4 py-3 space-y-4">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="block py-2 text-gray-700 hover:text-pink-400 font-medium"
          active-class="text-pink-400"
        >
          {{ item.name }}
        </router-link>
        
        <!-- Categorías móvil -->
        <div class="grid grid-cols-2 gap-2 pt-2">
          <a
            v-for="category in categories"
            :key="category.value"
            href="#"
            @click.prevent="selectCategory(category)"
            class="px-3 py-2 text-sm font-medium text-center text-gray-600 hover:text-pink-400 hover:bg-pink-50 rounded-full transition-colors"
            :class="{ 'text-pink-400 bg-pink-50': activeCategory === category.value }"
          >
            {{ category.name }}
          </a>
        </div>

        <button
          @click="goToLogin"
          class="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-full mt-4"
        >
          {{ user ? 'Mi Cuenta' : 'Unirse' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Descubrir', path: '/explore' },
  { name: 'Diseñadores', path: '/designers' },
  { name: 'Ocasiones', path: '/occasions' },
];

const categories = [
  { name: 'Vestidos', value: 'vestidos' },
  { name: 'Trajes', value: 'trajes' },
  { name: 'Disfraces', value: 'disfraces' },
  { name: 'Zapatos', value: 'zapatos' },
  { name: 'Accesorios', value: 'accesorios' },
  { name: 'Nueva Colección', value: 'nueva-coleccion' },
  { name: 'Verano 2025', value: 'verano-2025' }
];

const favoritesCount = ref(3);
const isMobileMenuOpen = ref(false);
const activeCategory = ref(null);
const user = ref(null);

// Inicializar categoría activa desde la URL
onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category;
  }
});

const goToLogin = () => {
  if (user.value) {
    router.push('/mi-cuenta');
  } else {
    router.push('/login');
  }
};

const selectCategory = (category) => {
  activeCategory.value = category.value;
  router.push({
    path: '/',
    query: { ...route.query, category: category.value }
  });
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
  background: linear-gradient(to right, #f472b6, #ec4899);
}
</style>
