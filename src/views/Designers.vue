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
              <span class="text-xl font-bold">Vistete<span class="text-pink-600">YA</span></span>
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
  
      <!-- Hero Section Premium -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10"></div>
        <div class="container mx-auto px-4 py-28 relative z-10">
          <div class="max-w-2xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Talento <span class="text-pink-500">Peruano</span> en Moda
            </h1>
            <p class="text-lg md:text-xl text-gray-600 mb-8">
              Descubre a los diseñadores que están revolucionando la industria de la moda en Perú
            </p>
            <div class="relative max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Buscar diseñadores..." 
                class="w-full pl-12 pr-6 py-3 border-0 rounded-full shadow-md focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              >
              <svg class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>
  
      <!-- Diseñadores Destacados -->
      <section class="container mx-auto px-4 py-16">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Diseñadores <span class="text-pink-500">Verificados</span></h2>
            <p class="text-gray-500">Los mejores creadores de moda del Perú</p>
          </div>
          <div class="mt-4 md:mt-0">
            <select class="bg-white border border-gray-200 rounded-full px-4 py-2 focus:ring-pink-500 focus:border-pink-500">
              <option>Filtrar por ciudad</option>
              <option>Lima</option>
              <option>Cusco</option>
              <option>Arequipa</option>
              <option>Trujillo</option>
            </select>
          </div>
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="designer in designers" :key="designer.id" class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
            <router-link :to="`/designers/${designer.slug}`" class="block">
              <!-- Badge Verificado -->
              <div v-if="designer.verified" class="absolute top-4 right-4 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Verificado
              </div>
              
              <!-- Imagen del diseñador -->
              <div class="relative h-64 overflow-hidden">
                <img :src="designer.coverImage" :alt="designer.brand" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                  <div class="flex items-center">
                    <div class="relative">
                      <img :src="designer.avatar" :alt="designer.name" class="w-14 h-14 rounded-full border-2 border-white">
                    </div>
                    <div class="ml-3 text-left">
                      <h3 class="font-bold text-white text-lg">{{ designer.name }}</h3>
                      <span class="text-xs text-white bg-pink-500 px-2 py-1 rounded-full">{{ designer.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Info del diseñador -->
              <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-bold text-xl text-gray-800">{{ designer.brand }}</h3>
                    <p class="text-sm text-pink-500">{{ designer.specialty }}</p>
                  </div>
                  <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{{ designer.yearsActive }}+ años</span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ designer.description }}</p>
                
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="flex mr-2">
                      <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= designer.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="text-xs text-gray-500">{{ designer.rating }}.0</span>
                  </div>
                  <span class="text-sm font-medium text-pink-500">{{ designer.collections }} colecciones</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
  
      <!-- CTA para diseñadores -->
      <section class="bg-gradient-to-r from-pink-500 to-purple-600 py-16 text-white">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl md:text-3xl font-bold mb-6">¿Eres diseñador peruano?</h2>
            <p class="text-lg mb-8 opacity-90">
              Únete a nuestra plataforma premium y lleva tu talento al siguiente nivel con exposición internacional y clientes exclusivos.
            </p>
            <router-link 
              to="/register?type=designer" 
              class="inline-block bg-white text-pink-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105 shadow-lg"
            >
              Regístrate como Proveedor
            </router-link>
          </div>
        </div>
      </section>
  
      <!-- Footer optimizado para móvil -->
      <footer class="bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <!-- Versión móvil - Acordeón compacto -->
          <div class="md:hidden py-6 space-y-4">
            <!-- Acordeón de enlaces -->
            <div v-for="(section, index) in mobileSections" :key="index">
              <button 
                @click="toggleSection(index)"
                class="flex justify-between items-center w-full text-left font-medium py-2 focus:outline-none"
              >
                <span>{{ section.title }}</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'transform rotate-180': openSections[index] }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                v-show="openSections[index]"
                class="pl-2 space-y-2 mb-2"
              >
                <router-link 
                  v-for="(link, linkIndex) in section.links" 
                  :key="linkIndex"
                  :to="link.path"
                  class="block py-1 text-gray-300 hover:text-pink-400 transition text-sm"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </div>
  
            <!-- Botón CTA siempre visible -->
            <div class="pt-2">
              <button 
                @click="navigateToRegister"
                class="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg transition transform hover:scale-[1.02] focus:outline-none text-sm font-medium"
              >
                Subir mis prendas
              </button>
            </div>
          </div>
  
          <!-- Versión desktop (original) -->
          <div class="hidden md:block py-8">
            <div class="grid grid-cols-3 gap-8">
              <div>
                <h3 class="text-lg font-bold mb-4">VisteteYA</h3>
                <ul class="space-y-2">
                  <li><router-link to="/" class="hover:text-pink-400 transition">Inicio</router-link></li>
                  <li><router-link to="/explorar" class="hover:text-pink-400 transition">Explorar prendas</router-link></li>
                  <li><router-link to="/como-funciona" class="hover:text-pink-400 transition">Cómo funciona</router-link></li>
                  <li><router-link to="/faqs" class="hover:text-pink-400 transition">FAQs</router-link></li>
                </ul>
              </div>
  
              <div>
                <h3 class="text-lg font-bold mb-4">Contacto</h3>
                <p class="mb-2">¿Necesitas ayuda?</p>
                <a href="mailto:soporte@visteteya.com" class="text-pink-400 hover:underline hover:text-pink-300">soporte@visteteYA.com</a>
              </div>
  
              <div>
                <h3 class="text-lg font-bold mb-4">¿Quieres subir tus prendas?</h3>
                <p class="mb-4">Únete como arrendador y gana dinero con tu armario.</p>
                <button 
                  @click="navigateToRegister"
                  class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105 text-sm"
                >
                  Comenzar ahora
                </button>
              </div>
            </div>
          </div>
  
          <!-- Copyright (compartido) -->
          <div class="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
            <p>© 2025 VisteteYA. Todos los derechos reservados.</p>
            <div class="mt-2 flex justify-center space-x-4">
              <router-link to="/terminos" class="hover:text-white transition">Términos</router-link>
              <router-link to="/privacidad" class="hover:text-white transition">Privacidad</router-link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Datos de ejemplo de diseñadores
  const designers = ref([
    {
      id: 1,
      name: 'María Fernández',
      slug: 'maria-fernandez',
      brand: 'MF Couture',
      specialty: 'Moda Tradicional Peruana',
      description: 'Reinterpretación contemporánea de textiles andinos con técnicas ancestrales.',
      location: 'Cusco, Perú',
      yearsActive: 8,
      rating: 4,
      collections: 12,
      verified: true,
      coverImage: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    // ... (otros diseñadores)
  ]);
  
  // Estado para acordeón móvil
  const openSections = ref([false, false]);
  const mobileSections = ref([
    {
      title: 'Enlaces rápidos',
      links: [
        { label: 'Inicio', path: '/' },
        { label: 'Explorar prendas', path: '/explorar' },
        { label: 'Cómo funciona', path: '/como-funciona' },
        { label: 'FAQs', path: '/faqs' }
      ]
    },
    {
      title: 'Contacto',
      links: [
        { label: 'soporte@visteteYA.com', path: 'mailto:soporte@visteteya.com' },
        { label: 'Lima, Perú', path: '#' }
      ]
    }
  ]);
  
  const toggleSection = (index) => {
    openSections.value[index] = !openSections.value[index];
  };
  
  const navigateToRegister = () => {
    router.push('/Register');
  };
  </script>
  
  <style scoped>
  /* Transiciones para el acordeón móvil */
  [v-show] {
    transition: opacity 0.2s ease, max-height 0.3s ease;
  }
  
  /* Mejoras de hover */
  .hover\:-translate-y-2:hover {
    transform: translateY(-0.5rem);
  }
  
  .transition-transform {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  </style>