<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <!-- Botón para volver mejorado -->
      <button 
        @click="$router.go(-1)"
        class="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="font-medium">Volver al catálogo</span>
      </button>
      
      <!-- Contenedor principal del producto -->
      <div class="flex flex-col lg:flex-row gap-8 md:gap-12 bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Galería de imágenes -->
        <div class="lg:w-1/2">
          <div class="sticky top-4">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-auto object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
              loading="lazy"
            >
            <!-- Mini galería (opcional) -->
            <div class="flex gap-3 mt-4 px-4 pb-4">
              <div v-for="(img, index) in product.gallery" :key="index" 
                   class="w-16 h-16 border-2 border-transparent hover:border-indigo-400 rounded-md cursor-pointer transition-all">
                <img :src="img" class="w-full h-full object-cover rounded-sm">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Información del producto -->
        <div class="lg:w-1/2 p-6 md:p-8">
          <!-- Encabezado -->
          <div class="mb-6">
            <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full mb-3">
              {{ product.category || 'Nuevo' }}
            </span>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <div class="flex items-center gap-2 mb-4">
              <div class="flex text-amber-400">
                <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-gray-500 text-sm">({{ product.reviews || 12 }} reseñas)</span>
            </div>
          </div>
          
          <!-- Precio -->
          <div class="mb-6">
            <p class="text-3xl font-bold text-gray-900 mb-1">{{ formatPrice(product.price) }}</p>
            <p v-if="product.originalPrice" class="text-lg text-gray-500 line-through">{{ formatPrice(product.originalPrice) }}</p>
            <p v-if="product.discount" class="text-green-600 font-medium mt-1">Ahorras {{ product.discount }}%</p>
          </div>
          
          <!-- Descripción -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>
          
          <!-- Variantes (opcional) -->
          <div class="mb-8" v-if="product.variants">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Colores disponibles</h3>
            <div class="flex gap-3">
              <button v-for="(variant, index) in product.variants" :key="index"
                      class="w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-300 transition-all"
                      :style="{ backgroundColor: variant.color }"
                      :title="variant.name">
              </button>
            </div>
          </div>
          
          <!-- Cantidad y CTA -->
          <div class="mb-8">
            <div class="flex items-center gap-4 mb-6">
              <label class="text-lg font-semibold text-gray-900">Cantidad:</label>
              <div class="flex items-center border rounded-lg overflow-hidden">
                <button class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors" @click="quantity > 1 ? quantity-- : null">-</button>
                <span class="px-4 py-2 w-12 text-center">{{ quantity }}</span>
                <button class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors" @click="quantity++">+</button>
              </div>
            </div>
            
            <button 
              @click="addToCart"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Añadir al carrito
            </button>
          </div>
          
          <!-- Detalles adicionales -->
          <div class="border-t pt-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500">Envío</h4>
                <p class="text-sm font-medium text-gray-900">Entrega en 2-3 días</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Disponibilidad</h4>
                <p class="text-sm font-medium text-green-600">En stock ({{ product.stock || 15 }} unidades)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const product = ref(null)
  const quantity = ref(1)
  
  // Datos de ejemplo mejorados
  const mockProducts = {
    1: {
      id: 1,
      name: 'Zapatillas Running Pro',
      category: 'Deportes',
      description: 'Zapatillas de running profesionales con tecnología de amortiguación avanzada para mayor comodidad durante carreras largas. Suela de goma duradera con patrón de tracción multidireccional para terreno mixto. Ideal para corredores que buscan rendimiento y estilo.',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
      ],
      variants: [
        { name: 'Azul Marino', color: '#1e3a8a' },
        { name: 'Negro', color: '#000000' },
        { name: 'Rojo', color: '#dc2626' }
      ],
      reviews: 24,
      stock: 15
    },
    2: {
      id: 2,
      name: 'Cámara DSLR Profesional',
      category: 'Fotografía',
      description: 'Cámara DSLR de 24.2MP con grabación de video 4K, pantalla táctil abatible y conectividad WiFi integrada. Incluye lente 18-55mm, ideal para fotógrafos aficionados que buscan dar el salto a equipos profesionales.',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
      ],
      reviews: 36,
      stock: 8
    }
  }
  
  onMounted(() => {
    product.value = mockProducts[route.params.id]
  })
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
  }
  
  const addToCart = () => {
    // Lógica para añadir al carrito
    alert(`Añadido ${quantity.value} ${product.value.name} al carrito`)
  }
  </script>
  
  <style scoped>
  /* Transiciones suaves para interacciones */
  button {
    transition: all 0.2s ease;
  }
  
  /* Mejor contraste para accesibilidad */
  .text-gray-900 {
    color: #111827;
  }
  
  /* Efecto hover para elementos interactivos */
  .hover\:opacity-90:hover {
    opacity: 0.9;
  }
  </style>