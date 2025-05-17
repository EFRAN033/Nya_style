<template>
  <header class="fixed w-full bg-white shadow-md z-50">
    <div class="w-full px-6 py-4 mx-auto sm:px-8 lg:px-10 max-w-7xl">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold -ml-3 transform translate-x-1">
          <span class="text-teal-500">Pro</span>
          <span class="text-emerald-600">Veo</span>
        </div>

        <nav class="hidden md:flex space-x-8">
          <a href="#inicio" class="text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Inicio</a>
          <a href="#soluciones" class="text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Soluciones</a>
          <a href="#casos" class="text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Casos</a>
          <a href="#precios" class="text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Precios</a>
          <a href="#contacto" class="text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Contacto</a>
        </nav>

        <button class="md:hidden focus:outline-none" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 hover:text-teal-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Menú móvil -->
      <div
        id="mobile-menu"
        class="w-full md:hidden max-h-0 overflow-hidden transition-all duration-300 bg-white"
      >
        <div class="pt-4 pb-2 space-y-4 px-2">
          <a href="#inicio" class="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Inicio</a>
          <a href="#soluciones" class="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Soluciones</a>
          <a href="#casos" class="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Casos</a>
          <a href="#precios" class="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Precios</a>
          <a href="#contacto" class="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-300 font-medium">Contacto</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    toggleMenu() {
      const menu = document.getElementById("mobile-menu");
      menu.classList.toggle("max-h-0");
      menu.classList.toggle("max-h-[1000px]");
      
      if (menu.classList.contains("max-h-[1000px]")) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(anchor.getAttribute("href"))?.scrollIntoView({
            behavior: "smooth",
          });

          const menu = document.getElementById("mobile-menu");
          if (menu.classList.contains("max-h-[1000px]")) {
            this.toggleMenu();
          }
        });
      });
    },
  },
  mounted() {
    this.setupSmoothScrolling();
  },
};
</script>