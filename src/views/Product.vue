<template>
  <div class="container mx-auto px-4 py-8">
<!-- Filtros mejorados -->
<div class="bg-pink-50 rounded-xl shadow-md p-6 mb-8 border border-pink-100">
  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-rose-900">Categoría</label>
      <select v-model="filters.category" class="w-full px-3 py-2 border border-pink-200 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
        <option value="">Todas</option>
        <option value="vestidos">Vestidos</option>
        <option value="trajes">Trajes</option>
        <option value="disfraces">Disfraces</option>
        <option value="zapatos">Zapatos</option>
        <option value="accesorios">Accesorios</option>
        <option value="nueva-coleccion">Nueva Colección</option>
        <option value="verano-2025">Verano 2025</option>
      </select>
    </div>
    
    <div class="space-y-2">
      <label class="block text-sm font-medium text-rose-900">Talla</label>
      <select v-model="filters.size" class="w-full px-3 py-2 border border-pink-200 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
        <option value="">Todas</option>
        <option v-for="size in sizeOptions" :value="size">{{ size }}</option>
      </select>
    </div>
    
    <div class="space-y-2">
      <label class="block text-sm font-medium text-rose-900">Tipo</label>
      <select v-model="filters.availability" class="w-full px-3 py-2 border border-pink-200 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
        <option value="">Todos</option>
        <option value="rent">Solo alquiler</option>
        <option value="buy">Solo compra</option>
        <option value="both">Alquiler y compra</option>
      </select>
    </div>
    
    <div class="space-y-2">
      <label class="block text-sm font-medium text-rose-900">Ordenar por</label>
      <select v-model="filters.sort" class="w-full px-3 py-2 border border-pink-200 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
        <option value="popular">Más populares</option>
        <option value="price_asc">Precio: menor a mayor</option>
        <option value="price_desc">Precio: mayor a menor</option>
        <option value="newest">Más recientes</option>
      </select>
    </div>
    
    <button @click="clearFilters" class="flex items-center justify-center gap-2 px-4 py-2 bg-pink-100 text-rose-900 rounded-lg font-medium hover:bg-pink-200 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      Limpiar
    </button>
  </div>
</div>

    <!-- Estado de carga -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="animate-pulse">
          <div class="bg-pink-100 h-64 w-full"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-pink-100 rounded w-3/4"></div>
            <div class="h-3 bg-pink-100 rounded w-1/2"></div>
            <div class="h-6 bg-pink-100 rounded w-1/3 mt-2"></div>
            <div class="h-10 bg-pink-100 rounded mt-4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de productos con tarjetas uniformes -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Producto 1 -->
      <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <!-- Badges superpuestos -->
        <div class="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
          <span v-if="item.isNew" class="px-2 py-1 text-xs font-bold rounded bg-rose-500 text-white">Nuevo</span>
          <span v-if="item.discount" class="px-2 py-1 text-xs font-bold rounded bg-pink-600 text-white">-{{ item.discount }}%</span>
          <span v-if="item.canRent && item.canBuy" class="px-2 py-1 text-xs font-bold rounded bg-rose-700 text-white">Alquiler/Compra</span>
          <span v-else-if="item.canRent" class="px-2 py-1 text-xs font-bold rounded bg-rose-700 text-white">Solo Alquiler</span>
          <span v-else-if="item.canBuy" class="px-2 py-1 text-xs font-bold rounded bg-rose-700 text-white">Solo Compra</span>
        </div>

        <!-- Imagen con efecto hover -->
        <div class="relative overflow-hidden aspect-square cursor-pointer" @click="viewItemDetails(item.id)">
          <img :src="item.images[0]" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy">
          <div :class="['absolute bottom-0 left-0 right-0 py-2 px-3 text-center text-xs font-bold text-white', 
                       getAvailabilityClass(item) === 'in-stock' ? 'bg-green-600' : 'bg-rose-600']">
            {{ getAvailabilityText(item) }}
          </div>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="p-4 flex-grow flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center space-x-2">
              <img :src="item.owner.avatar" :alt="item.owner.name" class="w-6 h-6 rounded-full border border-pink-200">
              <span class="text-sm text-rose-900 font-medium">{{ item.owner.name }}</span>
            </div>
            <div class="text-yellow-500 text-sm font-semibold">★ {{ item.owner.rating.toFixed(1) }}</div>
          </div>
          
          <h3 class="text-lg font-bold text-rose-900 mb-2 line-clamp-2">{{ item.name }}</h3>
          <p class="text-sm text-rose-800 mb-4 line-clamp-2">{{ truncateDescription(item.description, 60) }}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="flex items-center text-xs text-rose-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4z" clip-rule="evenodd" />
              </svg>
              {{ item.size }}
            </span>
            <span class="flex items-center text-xs text-rose-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
              </svg>
              {{ item.color }}
            </span>
          </div>
          
          <!-- Pie de tarjeta con precios y botones -->
          <div class="mt-auto">
            <div class="space-y-2 mb-4">
              <template v-if="item.canRent">
                <div>
                  <div class="text-xs text-rose-800 font-medium">Alquiler:</div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold text-rose-900">${{ item.rentPrice.toFixed(2) }}</span>
                    <span class="text-xs text-rose-700">/{{ item.rentalType === 'daily' ? 'día' : 'sem' }}</span>
                    <span v-if="item.originalRentPrice" class="text-xs text-rose-500 line-through ml-1">${{ item.originalRentPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </template>
              
              <template v-if="item.canBuy">
                <div :class="{'mt-2': item.canRent}">
                  <div class="text-xs text-rose-800 font-medium">Compra:</div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold text-rose-900">${{ item.buyPrice.toFixed(2) }}</span>
                    <span v-if="item.originalBuyPrice" class="text-xs text-rose-500 line-through ml-1">${{ item.originalBuyPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </template>
            </div>
            
            <div class="flex justify-between items-end">
              <div class="flex gap-2 flex-grow">
                <button v-if="item.canRent && item.rentAvailability > 0" 
                  @click.stop="startRentalProcess(item)"
                  class="flex-grow py-2 px-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  Alquilar
                </button>
                <button v-if="item.canBuy && item.buyAvailability > 0" 
                  @click.stop="startBuyProcess(item)"
                  class="flex-grow py-2 px-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  Comprar
                </button>
                <button v-if="(item.canRent && item.rentAvailability <= 0) || (item.canBuy && item.buyAvailability <= 0)"
                  disabled
                  class="flex-grow py-2 px-3 bg-pink-100 text-rose-800 text-sm font-semibold rounded-lg cursor-not-allowed">
                  Agotado
                </button>
              </div>
              
              <button @click.stop="toggleWishlist(item.id)" 
                :class="['w-10 h-10 flex items-center justify-center rounded-full transition-colors', 
                        isInWishlist(item.id) ? 'bg-rose-100 text-rose-500' : 'bg-pink-50 text-rose-400 hover:bg-pink-100']"
                aria-label="Añadir a favoritos">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="!loading && filteredItems.length > 0" class="flex justify-center items-center gap-6 mt-12">
      <button @click="prevPage" :disabled="currentPage === 1" 
        :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                 currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-rose-900 border border-pink-200 hover:bg-pink-50']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Anterior
      </button>
      
      <div class="text-sm font-medium text-rose-900">
        Página {{ currentPage }} de {{ totalPages }}
      </div>
      
      <button @click="nextPage" :disabled="currentPage === totalPages" 
        :class="['flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                 currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-rose-900 border border-pink-200 hover:bg-pink-50']">
        Siguiente
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FashionRentalGrid',
  data() {
    return {
      loading: true,
      currentPage: 1,
      itemsPerPage: 16,
      filters: {
        category: '',
        size: '',
        availability: '',
        sort: 'popular'
      },
      sizeOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      items: [],
      wishlist: []
    }
  },
  computed: {
    filteredItems() {
      let filtered = [...this.items];
      
      // Aplicar filtros
      if (this.filters.category) {
        filtered = filtered.filter(item => item.category === this.filters.category);
      }
      
      if (this.filters.size) {
        filtered = filtered.filter(item => item.size === this.filters.size);
      }
      
      if (this.filters.availability) {
        switch(this.filters.availability) {
          case 'rent':
            filtered = filtered.filter(item => item.canRent && !item.canBuy);
            break;
          case 'buy':
            filtered = filtered.filter(item => !item.canRent && item.canBuy);
            break;
          case 'both':
            filtered = filtered.filter(item => item.canRent && item.canBuy);
            break;
        }
      }
      
      // Aplicar ordenamiento
      switch (this.filters.sort) {
        case 'price_asc':
          filtered.sort((a, b) => {
            const aPrice = Math.min(a.canRent ? a.rentPrice : Infinity, a.canBuy ? a.buyPrice : Infinity);
            const bPrice = Math.min(b.canRent ? b.rentPrice : Infinity, b.canBuy ? b.buyPrice : Infinity);
            return aPrice - bPrice;
          });
          break;
        case 'price_desc':
          filtered.sort((a, b) => {
            const aPrice = Math.max(a.canRent ? a.rentPrice : 0, a.canBuy ? a.buyPrice : 0);
            const bPrice = Math.max(b.canRent ? b.rentPrice : 0, b.canBuy ? b.buyPrice : 0);
            return bPrice - aPrice;
          });
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
          break;
        default: // popular
          filtered.sort((a, b) => b.rentalCount - a.rentalCount);
      }
      
      // Paginación
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  },
  methods: {
    getAvailabilityClass(item) {
      if ((item.canRent && item.rentAvailability > 0) || (item.canBuy && item.buyAvailability > 0)) {
        return 'in-stock';
      }
      return 'out-of-stock';
    },
    getAvailabilityText(item) {
      if (item.canRent && item.canBuy) {
        const rentText = item.rentAvailability > 0 ? `Alquiler (${item.rentAvailability})` : 'Alquiler agotado';
        const buyText = item.buyAvailability > 0 ? `Compra (${item.buyAvailability})` : 'Compra agotado';
        return `${rentText} | ${buyText}`;
      } else if (item.canRent) {
        return item.rentAvailability > 0 ? `Disponible (${item.rentAvailability})` : 'Agotado';
      } else if (item.canBuy) {
        return item.buyAvailability > 0 ? `Disponible (${item.buyAvailability})` : 'Agotado';
      }
      return 'No disponible';
    },
    async loadItems() {
      this.loading = true;
      try {
        // Simulación de datos de API con más productos
        this.items = [
          {
            id: 1,
            name: 'Vestido de noche elegante',
            description: 'Vestido largo de gala para ocasiones especiales, color negro con detalles en dorado',
            category: 'formal',
            size: 'M',
            color: 'Negro',
            canRent: true,
            canBuy: true,
            rentPrice: 35.99,
            originalRentPrice: 45.99,
            buyPrice: 199.99,
            originalBuyPrice: 249.99,
            discount: 22,
            rentalType: 'daily',
            rentAvailability: 2,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 101,
              name: 'María G.',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              rating: 4.8
            },
            isNew: true,
            rentalCount: 12,
            dateAdded: '2023-05-15'
          },
          {
            id: 2,
            name: 'Traje formal de negocios',
            description: 'Traje de dos piezas en lana premium, ideal para reuniones importantes',
            category: 'formal',
            size: 'L',
            color: 'Azul marino',
            canRent: true,
            canBuy: false,
            rentPrice: 42.50,
            rentalType: 'daily',
            rentAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 102,
              name: 'Carlos M.',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              rating: 4.9
            },
            rentalCount: 18,
            dateAdded: '2023-04-22'
          },
          {
            id: 3,
            name: 'Zapatos de tacón premium',
            description: 'Zapatos de tacón medio con diseño elegante y cómodo para todo el día',
            category: 'formal',
            size: '38',
            color: 'Beige',
            canRent: true,
            canBuy: true,
            rentPrice: 25.00,
            originalRentPrice: 30.00,
            buyPrice: 129.99,
            discount: 17,
            rentalType: 'weekly',
            rentAvailability: 3,
            buyAvailability: 0,
            images: [
              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 103,
              name: 'Ana L.',
              avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
              rating: 4.7
            },
            isNew: true,
            rentalCount: 5,
            dateAdded: '2023-06-10'
          },
          {
            id: 4,
            name: 'Chaqueta de cuero genuino',
            description: 'Chaqueta de cuero 100% genuino con corte moderno y forro interior suave',
            category: 'casual',
            size: 'L',
            color: 'Negro',
            canRent: false,
            canBuy: true,
            buyPrice: 299.99,
            originalBuyPrice: 349.99,
            buyAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 104,
              name: 'Javier R.',
              avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
              rating: 4.5
            },
            rentalCount: 22,
            dateAdded: '2023-03-18'
          },
          {
            id: 5,
            name: 'Blusa de seda estampada',
            description: 'Blusa de seda natural con estampado floral, perfecta para looks elegantes',
            category: 'formal',
            size: 'S',
            color: 'Azul',
            canRent: true,
            canBuy: true,
            rentPrice: 28.00,
            originalRentPrice: 35.00,
            buyPrice: 89.99,
            discount: 20,
            rentalType: 'daily',
            rentAvailability: 4,
            buyAvailability: 3,
            images: [
              'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 105,
              name: 'Lucía V.',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              rating: 4.6
            },
            isNew: false,
            rentalCount: 8,
            dateAdded: '2023-05-30'
          },
          {
            id: 6,
            name: 'Jeans slim fit premium',
            description: 'Jeans de corte slim en tela elástica de alta calidad, color azul oscuro',
            category: 'casual',
            size: 'M',
            color: 'Azul',
            canRent: true,
            canBuy: true,
            rentPrice: 32.00,
            buyPrice: 79.99,
            rentalType: 'weekly',
            rentAvailability: 3,
            buyAvailability: 5,
            images: [
              'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 106,
              name: 'Miguel Á.',
              avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
              rating: 4.7
            },
            isNew: false,
            rentalCount: 15,
            dateAdded: '2023-04-10'
          },
          {
            id: 7,
            name: 'Sneakers deportivos urbanos',
            description: 'Zapatillas deportivas con estilo urbano, cómodas y versátiles',
            category: 'deportivo',
            size: '42',
            color: 'Blanco',
            canRent: true,
            canBuy: true,
            rentPrice: 38.00,
            originalRentPrice: 45.00,
            buyPrice: 129.99,
            originalBuyPrice: 149.99,
            discount: 15,
            rentalType: 'weekly',
            rentAvailability: 2,
            buyAvailability: 4,
            images: [
              'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 107,
              name: 'Roberto S.',
              avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
              rating: 4.8
            },
            isNew: true,
            rentalCount: 7,
            dateAdded: '2023-06-05'
          },
          {
            id: 8,
            name: 'Bolso de mano de diseñador',
            description: 'Bolso elegante de tamaño mediano con correa ajustable y múltiples compartimentos',
            category: 'accesorios',
            size: 'Único',
            color: 'Marrón',
            canRent: false,
            canBuy: true,
            buyPrice: 199.99,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 108,
              name: 'Isabel C.',
              avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
              rating: 4.9
            },
            isNew: false,
            rentalCount: 11,
            dateAdded: '2023-03-25'
          },
          {
            id: 9,
            name: 'Abrigo de invierno premium',
            description: 'Abrigo largo para invierno con capucha desmontable y aislamiento térmico',
            category: 'casual',
            size: 'XL',
            color: 'Camel',
            canRent: true,
            canBuy: true,
            rentPrice: 45.00,
            originalRentPrice: 55.00,
            buyPrice: 249.99,
            originalBuyPrice: 299.99,
            discount: 17,
            rentalType: 'weekly',
            rentAvailability: 2,
            buyAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 109,
              name: 'Elena P.',
              avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
              rating: 4.8
            },
            isNew: true,
            rentalCount: 9,
            dateAdded: '2023-06-15'
          },
          {
            id: 10,
            name: 'Camisa formal de algodón',
            description: 'Camisa de vestir en algodón egipcio, corte clásico y planchado permanente',
            category: 'formal',
            size: 'L',
            color: 'Blanco',
            canRent: true,
            canBuy: true,
            rentPrice: 22.00,
            buyPrice: 89.99,
            rentalType: 'daily',
            rentAvailability: 5,
            buyAvailability: 3,
            images: [
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 110,
              name: 'Fernando T.',
              avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
              rating: 4.7
            },
            isNew: false,
            rentalCount: 14,
            dateAdded: '2023-04-05'
          },
          {
            id: 11,
            name: 'Falda lápiz de oficina',
            description: 'Falda profesional en corte lápiz con tejido antiarrugas y bolsillos laterales',
            category: 'formal',
            size: 'M',
            color: 'Gris',
            canRent: true,
            canBuy: true,
            rentPrice: 25.00,
            buyPrice: 99.99,
            rentalType: 'daily',
            rentAvailability: 3,
            buyAvailability: 4,
            images: [
              'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 111,
              name: 'Sofía M.',
              avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
              rating: 4.9
            },
            isNew: false,
            rentalCount: 10,
            dateAdded: '2023-05-10'
          },
          {
            id: 12,
            name: 'Chaleco de lana merino',
            description: 'Chaleco fino de lana merino, ideal para capas en climas fríos',
            category: 'casual',
            size: 'S',
            color: 'Verde militar',
            canRent: true,
            canBuy: false,
            rentPrice: 18.00,
            rentalType: 'daily',
            rentAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 112,
              name: 'Alejandro G.',
              avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
              rating: 4.6
            },
            isNew: true,
            rentalCount: 6,
            dateAdded: '2023-06-20'
          },
          {
            id: 13,
            name: 'Reloj de pulsera elegante',
            description: 'Reloj analógico con correa de cuero y esfera minimalista',
            category: 'accesorios',
            size: 'Único',
            color: 'Negro',
            canRent: false,
            canBuy: true,
            buyPrice: 179.99,
            originalBuyPrice: 219.99,
            discount: 18,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 113,
              name: 'Ricardo L.',
              avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
              rating: 4.8
            },
            isNew: false,
            rentalCount: 8,
            dateAdded: '2023-05-22'
          },
          {
            id: 14,
            name: 'Sudadera con capucha oversize',
            description: 'Sudadera cómoda con capucha y bolsillo canguro, estilo urbano',
            category: 'casual',
            size: 'XL',
            color: 'Rosa pastel',
            canRent: true,
            canBuy: true,
            rentPrice: 20.00,
            buyPrice: 59.99,
            rentalType: 'weekly',
            rentAvailability: 4,
            buyAvailability: 6,
            images: [
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 114,
              name: 'Daniela R.',
              avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
              rating: 4.7
            },
            isNew: false,
            rentalCount: 13,
            dateAdded: '2023-04-18'
          },
          {
            id: 15,
            name: 'Pantalones de vestir slim fit',
            description: 'Pantalones formales con placa frontal y corte moderno',
            category: 'formal',
            size: '32',
            color: 'Gris oscuro',
            canRent: true,
            canBuy: true,
            rentPrice: 28.00,
            buyPrice: 109.99,
            rentalType: 'daily',
            rentAvailability: 3,
            buyAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 115,
              name: 'Oscar F.',
              avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
              rating: 4.9
            },
            isNew: true,
            rentalCount: 7,
            dateAdded: '2023-06-12'
          },
          {
            id: 16,
            name: 'Zapatillas running profesionales',
            description: 'Zapatillas para correr con amortiguación y soporte para arco',
            category: 'deportivo',
            size: '43',
            color: 'Azul/negro',
            canRent: true,
            canBuy: true,
            rentPrice: 30.00,
            buyPrice: 149.99,
            rentalType: 'weekly',
            rentAvailability: 2,
            buyAvailability: 3,
            images: [
              'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 116,
              name: 'Mario S.',
              avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
              rating: 4.8
            },
            isNew: false,
            rentalCount: 11,
            dateAdded: '2023-03-30'
          }
        ];
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        this.loading = false;
      }
    },
    truncateDescription(text, maxLength) {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    toggleWishlist(itemId) {
      const index = this.wishlist.indexOf(itemId);
      if (index === -1) {
        this.wishlist.push(itemId);
        this.$toast.success('Añadido a tu lista de deseos');
      } else {
        this.wishlist.splice(index, 1);
        this.$toast.info('Eliminado de tu lista de deseos');
      }
    },
    isInWishlist(itemId) {
      return this.wishlist.includes(itemId);
    },
    viewItemDetails(itemId) {
      this.$router.push(`/item/${itemId}`);
    },
    startRentalProcess(item) {
      this.$emit('start-rental', item);
    },
    startBuyProcess(item) {
      this.$emit('start-buy', item);
    },
    clearFilters() {
      this.filters = {
        category: '',
        size: '',
        availability: '',
        sort: 'popular'
      };
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  },
  mounted() {
    this.loadItems();
  }
}
</script>