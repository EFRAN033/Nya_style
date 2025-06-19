<template>
  <header class="sticky top-0 z-50 bg-white shadow-lg">
    <div class="border-b border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center group">
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-105">
            <span class="ml-2 text-2xl font-extrabold text-gray-900 leading-none">
              Vistete<span class="text-pink-600">YA</span>
            </span>
          </router-link>

          <nav class="hidden md:flex space-x-8">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="text-gray-700 hover:text-pink-600 font-medium transition-all duration-200 py-2 px-3 rounded-md hover:bg-pink-50"
              active-class="text-pink-600 border-b-2 border-pink-600 pb-2 -mb-2"
              @click="handleMenuItemClick(item)"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" aria-label="Buscar">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <router-link to="/wishlist" class="relative p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200" aria-label="Lista de deseos">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="favoritesCount > 0"
                    class="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-ping-once">
                {{ favoritesCount }}
              </span>
            </router-link>

            <button
              @click="goToLogin"
              class="hidden md:block bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 py-2.5 rounded-full font-semibold
                     hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-out"
            >
              {{ user ? 'Mi Cuenta' : 'Unirse' }}
            </button>

            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="md:hidden p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
              aria-label="Abrir menú móvil"
            >
              <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    <div class="bg-white hidden md:block border-t border-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex overflow-x-auto py-3 space-x-6 hide-scrollbar">
          <router-link
            v-for="category in categories"
            :key="category.value"
            :to="{ path: '/explore', query: { category: category.value } }"
            class="whitespace-nowrap px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200"
            :class="{ 'bg-pink-100 text-pink-700 font-semibold shadow-sm': activeCategory === category.value }"
            @click="setActiveCategory(category.value)"
          >
            {{ category.name }}
          </router-link>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out transform"
      leave-active-class="transition-all duration-200 ease-in transform"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white border-t border-pink-100 shadow-xl absolute w-full"
      >
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-col divide-y divide-gray-100">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.path"
              class="flex items-center justify-between py-3 px-3 transition-colors duration-200 rounded-md"
              :class="{
                'bg-pink-50 text-pink-600 font-semibold': route.path === item.path,
                'text-gray-800 hover:bg-gray-50 hover:text-pink-600': route.path !== item.path
              }"
              @click="isMobileMenuOpen = false"
            >
              <span class="text-base">{{ item.name }}</span>
              <svg
                v-if="route.path === item.path"
                class="h-5 w-5 text-pink-500 animate-fade-in-right"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
            <button
              @click="goToLogin"
              class="w-full text-left py-3 px-3 mt-2 rounded-md bg-pink-500 text-white font-semibold
                     hover:bg-pink-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {{ user ? 'Mi Cuenta' : 'Unirse / Iniciar Sesión' }}
            </button>
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
const user = ref(null); // Simula el estado de autenticación del usuario

// Observar cambios en la ruta para resaltar la categoría activa
watch(() => route.query.category, (newCategory) => {
  activeCategory.value = newCategory;
  // Opcional: Desplazarse a la sección de productos si se cambia la categoría
  // setTimeout(scrollToProducts, 100);
});

// Observar la ruta principal para cerrar el menú móvil al navegar
watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});


// Inicializar categoría activa al montar el componente
onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category;
  }
  // Simular carga de usuario (esto se reemplazaría con tu lógica de autenticación real)
  user.value = localStorage.getItem('userToken') ? { name: 'Usuario' } : null;
});

const handleMenuItemClick = (item) => {
  // Asegura que al hacer clic en 'Descubrir' se mantenga el filtro de categoría si existe
  if (item.path === '/explore' && activeCategory.value) {
    router.push({ path: item.path, query: { category: activeCategory.value } });
  } else {
    router.push(item.path); // Navega directamente si no es 'Descubrir' o no hay categoría activa
  }
  isMobileMenuOpen.value = false; // Cerrar menú móvil al seleccionar un ítem
};

const setActiveCategory = (category) => {
  activeCategory.value = category;
  // Opcional: Forzar el scroll a la sección de productos si estás en la página de exploración
  if (route.path === '/explore') {
    setTimeout(scrollToProducts, 100);
  }
};

const scrollToProducts = () => {
  const productsSection = document.getElementById('products-section');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const goToLogin = () => {
  if (user.value) {
    // Aquí puedes redirigir a un perfil de usuario o dashboard
    router.push('/mi-cuenta');
  } else {
    router.push('/login');
  }
  isMobileMenuOpen.value = false; // Asegurar que el menú móvil se cierre
};
</script>

<style scoped>
/* Oculta la barra de desplazamiento para elementos con overflow-x-auto */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Animación para el icono activo del menú móvil (simulando bounce en x) */
@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-right {
  animation: fade-in-right 0.3s ease-out forwards;
}

/* Animación para el badge de favoritos (un pequeño pulso al aparecer/actualizar) */
@keyframes ping-once {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-ping-once {
  animation: ping-once 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sombra más pronunciada para el menú móvil abierto */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Transiciones personalizadas para el menú móvil */
.transition-all {
  transition-property: all;
  transition-duration: var(--transition-duration, 0.3s);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>