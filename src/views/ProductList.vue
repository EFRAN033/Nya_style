<template>
    <section class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          >
          <div class="p-4">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-600 line-clamp-2">{{ product.description }}</p>
            <p class="text-2xl font-bold mt-2">{{ formatPrice(product.price) }}</p>
            <button 
              @click="$router.push(`/product/${product.id}`)"
              class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      products: Array,
      required: true
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR'
        }).format(price)
      }
    }
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>