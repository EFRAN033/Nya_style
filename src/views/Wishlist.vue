<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto">
      <!-- Header compacto -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center">
          <!-- Botón para regresar -->
          <button 
            @click="$router.go(-1)"
            class="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="Regresar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 class="ml-3 text-2xl font-semibold text-gray-900">Mi Lista</h1>
          <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-800">
            {{ wishlistItems.length }}
          </span>
        </div>
        <div class="flex items-center space-x-3">
          <select
            v-model="sortOption"
            class="text-sm rounded-md border-gray-300 shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50"
          >
            <option value="recent">Recientes</option>
            <option value="price-asc">Precio ↑</option>
            <option value="price-desc">Precio ↓</option>
          </select>
          <button
            v-if="wishlistItems.length > 0"
            @click="confirmClearWishlist"
            class="p-2 text-gray-400 hover:text-rose-500 transition-colors"
            title="Limpiar lista"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Resto del template permanece igual -->
      <!-- Estado vacío mejorado -->
      <div v-if="wishlistItems.length === 0" class="text-center pt-16">
        <div class="mx-auto h-32 w-32 text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Lista vacía</h3>
        <p class="mt-1 text-gray-500">Guarda tus artículos favoritos aquí</p>
        <router-link
          to="/"
          class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Explorar productos
        </router-link>
      </div>

      <!-- Lista compacta de productos -->
      <ul v-else class="space-y-4">
        <li 
          v-for="item in sortedWishlist" 
          :key="item.id" 
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
        >
          <div class="flex p-4">
            <!-- Imagen compacta -->
            <router-link 
              :to="`/product/${item.id}`" 
              class="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border border-gray-200"
            >
              <img
                :src="item.images?.[0] || defaultImage"
                :alt="item.name"
                class="h-full w-full object-cover"
              />
            </router-link>

            <!-- Contenido principal -->
            <div class="ml-4 flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 truncate">
                    <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
                  </h3>
                  <div class="mt-1 flex flex-wrap gap-1">
                    <span v-if="item.size" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {{ item.size }}
                    </span>
                    <span v-if="item.color" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {{ item.color }}
                    </span>
                  </div>
                </div>
                <button
                  @click="removeFromWishlist(item.id)"
                  class="text-gray-400 hover:text-rose-500 transition-colors p-1 -mt-1 -mr-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Precios y acciones -->
              <div class="mt-3 flex items-center justify-between">
                <div class="space-y-1">
                  <template v-if="item.canBuy">
                    <p class="text-xs text-gray-500">Compra</p>
                    <div class="flex items-center space-x-2">
                      <p class="text-base font-semibold text-gray-900">
                        S/{{ item.buyPrice?.toFixed(2) || '0.00' }}
                      </p>
                      <span v-if="item.originalBuyPrice" class="text-xs text-gray-500 line-through">
                        S/{{ item.originalBuyPrice.toFixed(2) }}
                      </span>
                    </div>
                  </template>
                  <template v-if="item.canRent">
                    <p class="text-xs text-gray-500">Alquiler</p>
                    <p class="text-base font-semibold text-gray-900">
                      S/{{ item.rentPrice?.toFixed(2) || '0.00' }}
                    </p>
                  </template>
                </div>
                <div class="flex space-x-2">
                  <button
                    v-if="item.canBuy"
                    @click="startBuyProcess(item)"
                    class="px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-800"
                  >
                    Comprar
                  </button>
                  <button
                    v-if="item.canRent"
                    @click="startRentalProcess(item)"
                    class="px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    Alquilar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- Footer compacto -->
      <div v-if="wishlistItems.length > 0" class="mt-6 flex justify-between items-center">
        <p class="text-sm text-gray-500">
          {{ wishlistItems.length }} artículo{{ wishlistItems.length !== 1 ? 's' : '' }}
        </p>
        <router-link
          to="/checkout"
          class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Ver lista
        </router-link>
      </div>
    </div>

    <!-- Modal de confirmación minimalista -->
    <div v-if="showClearConfirmation" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl overflow-hidden max-w-sm w-full">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Vaciar lista</h3>
              <p class="text-sm text-gray-500 mt-1">¿Eliminar todos los artículos?</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="showClearConfirmation = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              @click="clearWishlist"
              class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado local para la lista de deseos
const wishlistItems = ref([
  {
    id: 1,
    name: 'Vestido de noche elegante',
    description: '',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'],
    size: 'M',
    color: 'Negro',
    isNew: true,
    canRent: true,
    rentPrice: 25.5,
    originalRentPrice: 30,
    canBuy: true,
    buyPrice: 120,
    originalBuyPrice: 150,
    addedDate: new Date('2023-05-15')
  },
  {
    id: 2,
    name: 'Zapatos de tacón piel',
    description: '',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'],
    size: '38',
    color: 'Beige',
    isNew: false,
    canRent: false,
    canBuy: true,
    buyPrice: 89.99,
    originalBuyPrice: 120,
    addedDate: new Date('2023-05-10')
  }
])

const defaultImage = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
const showClearConfirmation = ref(false)
const sortOption = ref('recent')

const sortedWishlist = computed(() => {
  const items = [...wishlistItems.value]
  switch (sortOption.value) {
    case 'price-asc': return items.sort((a, b) => (a.buyPrice || 0) - (b.buyPrice || 0))
    case 'price-desc': return items.sort((a, b) => (b.buyPrice || 0) - (a.buyPrice || 0))
    case 'recent':
    default: return items.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
  }
})

function removeFromWishlist(id) {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== id)
}

function confirmClearWishlist() {
  showClearConfirmation.value = true
}

function clearWishlist() {
  wishlistItems.value = []
  showClearConfirmation.value = false
}

function startRentalProcess(item) {
  router.push({ path: `/checkout/rent/${item.id}` })
}

function startBuyProcess(item) {
  router.push({ path: `/checkout/buy/${item.id}` })
}
</script>

<style scoped>
/* Efecto sutil al pasar el mouse */
li {
  transition: all 0.15s ease;
}

/* Mejor contraste para texto */
.text-gray-900 {
  color: #111827;
}

/* Espaciado consistente */
.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>