<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <!-- Barra superior -->
    <div class="border-b border-pink-100">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <!-- Logo -->
          <router-link to="/" class="flex items-center">
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8">
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
              @click="handleMenuItemClick(item)"
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

            <!-- Wishlist -->
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

            <!-- Botón hamburguesa -->
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="md:hidden p-2 text-gray-500 hover:text-pink-400 transition-colors"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
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
          <router-link
            v-for="category in categories"
            :key="category.value"
            :to="{ path: '/explore', query: { category: category.value } }"
            class="whitespace-nowrap px-2 py-1 text-sm font-medium text-gray-600 hover:text-pink-400 hover:bg-pink-50 rounded-full transition-colors"
            :class="{ 'text-pink-400 bg-pink-50': activeCategory === category.value }"
            @click="setActiveCategory(category.value)"
          >
            {{ category.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menú móvil premium (SOLO 4 OPCIONES) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-white border-t border-pink-100 shadow-lg"
      >
        <div class="container mx-auto px-4 py-3">
          <nav class="flex flex-col divide-y divide-pink-50">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="flex items-center justify-between py-3 px-2 transition-colors"
              :class="{
                'text-pink-500': route.path === item.path,
                'text-gray-700 hover:text-pink-400': route.path !== item.path
              }"
              @click="isMobileMenuOpen = false"
            >
              <span class="font-medium">{{ item.name }}</span>
              <svg 
                v-if="route.path === item.path"
                class="h-5 w-5 text-pink-400 animate-bounce-x"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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

// Observar cambios en la ruta
watch(() => route.query.category, (newCategory) => {
  activeCategory.value = newCategory;
  scrollToProducts();
});

// Inicializar categoría activa
onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category;
  }
});

const handleMenuItemClick = (item) => {
  if (item.path === '/explore' && activeCategory.value) {
    router.push({ path: item.path, query: { category: activeCategory.value } });
  }
};

const setActiveCategory = (category) => {
  activeCategory.value = category;
  setTimeout(scrollToProducts, 100);
};

const scrollToProducts = () => {
  if (route.path === '/explore') {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const goToLogin = () => {
  if (user.value) {
    router.push('/mi-cuenta');
  } else {
    router.push('/login');
  }
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Animación para el icono activo */
.animate-bounce-x {
  animation: bounce-x 1s infinite;
}

@keyframes bounce-x {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

/* Transición para el menú móvil */
.md\\:hidden {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto al hacer tap */
.router-link:active {
  transform: scale(0.98);
}

/* Sombra premium para el menú */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>