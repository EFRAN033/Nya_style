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
        <div class="relative overflow-hidden aspect-square cursor-pointer" @click="openProductDetail(item)">
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
                    <span class="text-lg font-extrabold text-rose-900">S/{{ item.rentPrice.toFixed(2) }}</span>
                    <span class="text-xs text-rose-700">/{{ item.rentalType === 'daily' ? 'día' : 'sem' }}</span>
                    <span v-if="item.originalRentPrice" class="text-xs text-rose-500 line-through ml-1">S/{{ item.originalRentPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </template>
              
              <template v-if="item.canBuy">
                <div :class="{'mt-2': item.canRent}">
                  <div class="text-xs text-rose-800 font-medium">Compra:</div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold text-rose-900">S/{{ item.buyPrice.toFixed(2) }}</span>
                    <span v-if="item.originalBuyPrice" class="text-xs text-rose-500 line-through ml-1">S/{{ item.originalBuyPrice.toFixed(2) }}</span>
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

    <!-- Modal de detalle del producto -->
    <div v-if="selectedProduct" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Fondo oscuro -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeProductDetail"></div>
        </div>

        <!-- Contenido del modal -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <!-- Galería de imágenes -->
              <div class="w-full sm:w-1/2 pr-6">
                <div class="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
                  <img :src="selectedProduct.images[0]" :alt="selectedProduct.name" class="w-full h-full object-cover">
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div v-for="(image, index) in selectedProduct.images" :key="index" 
                       class="h-24 cursor-pointer border-2 rounded-lg overflow-hidden"
                       :class="{'border-rose-500': index === 0}"
                       @click="changeMainImage(image)">
                    <img :src="image" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover">
                  </div>
                </div>
              </div>

              <!-- Detalles del producto -->
              <div class="w-full sm:w-1/2 mt-4 sm:mt-0">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-2xl font-bold text-rose-900 mb-2">{{ selectedProduct.name }}</h3>
                    <div class="flex items-center mb-4">
                      <div class="flex items-center text-yellow-500 mr-2">
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-300': i > Math.round(selectedProduct.owner.rating)}" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="text-sm text-gray-500">({{ selectedProduct.rentalCount }} alquileres)</span>
                    </div>
                  </div>
                  <button @click="closeProductDetail" class="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div class="mb-6">
                  <p class="text-gray-700 mb-4">{{ selectedProduct.description }}</p>
                  
                  <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4z" clip-rule="evenodd" />
                      </svg>
                      Talla: {{ selectedProduct.size }}
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                      </svg>
                      Color: {{ selectedProduct.color }}
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      Añadido: {{ formatDate(selectedProduct.dateAdded) }}
                    </div>
                  </div>

                  <div class="bg-pink-50 rounded-lg p-4 mb-4">
                    <div class="flex items-center mb-3">
                      <img :src="selectedProduct.owner.avatar" :alt="selectedProduct.owner.name" class="w-8 h-8 rounded-full border border-pink-200 mr-2">
                      <div>
                        <p class="font-medium text-rose-900">{{ selectedProduct.owner.name }}</p>
                        <div class="flex items-center">
                          <div class="flex items-center text-yellow-500 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span class="text-sm text-gray-600 ml-1">{{ selectedProduct.owner.rating.toFixed(1) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600">Este artículo es ofrecido por {{ selectedProduct.owner.name }}. Puedes contactar al propietario para más detalles sobre el producto.</p>
                  </div>
                </div>

                <!-- Precios y disponibilidad -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                  <div class="space-y-4">
                    <div v-if="selectedProduct.canRent" class="flex justify-between items-center">
                      <div>
                        <p class="text-sm font-medium text-gray-700">Alquiler:</p>
                        <p class="text-xs text-gray-500">{{ selectedProduct.rentalType === 'daily' ? 'Por día' : 'Por semana' }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-xl font-bold text-rose-900">S/{{ selectedProduct.rentPrice.toFixed(2) }}</p>
                        <p v-if="selectedProduct.originalRentPrice" class="text-xs text-gray-500 line-through">S/{{ selectedProduct.originalRentPrice.toFixed(2) }}</p>
                        <p class="text-xs text-green-600 mt-1">{{ selectedProduct.rentAvailability }} disponibles</p>
                      </div>
                    </div>

                    <div v-if="selectedProduct.canBuy" class="flex justify-between items-center">
                      <div>
                        <p class="text-sm font-medium text-gray-700">Compra:</p>
                        <p class="text-xs text-gray-500">Precio final</p>
                      </div>
                      <div class="text-right">
                        <p class="text-xl font-bold text-rose-900">S/{{ selectedProduct.buyPrice.toFixed(2) }}</p>
                        <p v-if="selectedProduct.originalBuyPrice" class="text-xs text-gray-500 line-through">S/{{ selectedProduct.originalBuyPrice.toFixed(2) }}</p>
                        <p class="text-xs text-green-600 mt-1">{{ selectedProduct.buyAvailability }} disponibles</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex flex-col space-y-3">
                  <button v-if="selectedProduct.canRent && selectedProduct.rentAvailability > 0" 
                    @click="startRentalProcess(selectedProduct)"
                    class="w-full py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    </svg>
                    Alquilar ahora
                  </button>
                  
                  <button v-if="selectedProduct.canBuy && selectedProduct.buyAvailability > 0" 
                    @click="startBuyProcess(selectedProduct)"
                    class="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                    Comprar ahora
                  </button>

                  <button @click="toggleWishlist(selectedProduct.id)" 
                    :class="['w-full py-2 px-4 border rounded-lg font-medium transition-colors flex items-center justify-center',
                            isInWishlist(selectedProduct.id) ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50']">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" :class="{'text-rose-500': isInWishlist(selectedProduct.id)}" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    {{ isInWishlist(selectedProduct.id) ? 'En tu lista de deseos' : 'Añadir a lista de deseos' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      itemsPerPage: 8,
      filters: {
        category: '',
        size: '',
        availability: '',
        sort: 'popular'
      },
      sizeOptions: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      items: [],
      wishlist: [],
      selectedProduct: null,
      currentImage: ''
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
    async loadItems() {
      this.loading = true;
      try {
        // Simulación de datos de API con 4 productos variados
        this.items = [
          {
            id: 1,
            name: 'Vestido de noche elegante',
            description: 'Vestido largo de gala para ocasiones especiales, color negro con detalles en dorado. Fabricado en seda y chiffon de alta calidad, con forro interior suave. Perfecto para bodas, galas y eventos formales. Incluye cinturón ajustable para mejor ajuste.',
            category: 'vestidos',
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
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
              'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
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
            description: 'Traje de dos piezas en lana premium, ideal para reuniones importantes. Chaqueta con corte moderno y pantalón con ajuste perfecto. Incluye bolsillos interiores y botones de alta calidad. Disponible en talla L para un look profesional impecable.',
            category: 'trajes',
            size: 'L',
            color: 'Azul marino',
            canRent: true,
            canBuy: false,
            rentPrice: 42.50,
            rentalType: 'daily',
            rentAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
              'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
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
            description: 'Zapatos de tacón medio con diseño elegante y cómodo para todo el día. Tacón de 7 cm con base ancha para mayor estabilidad. Plantilla acolchada y suela antideslizante. Disponible en color beige, ideal para combinar con cualquier outfit formal.',
            category: 'zapatos',
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
              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
              'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
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
            name: 'Disfraz de superhéroe para niño',
            description: 'Disfraz completo de superhéroe para niños de 6-8 años. Incluye capa, máscara y cinturón. Fabricado en poliéster resistente y cómodo. Perfecto para fiestas de cumpleaños, Halloween o eventos temáticos. Lavable a máquina.',
            category: 'disfraces',
            size: '6-8 años',
            color: 'Rojo/Azul',
            canRent: true,
            canBuy: true,
            rentPrice: 15.99,
            buyPrice: 49.99,
            rentalType: 'daily',
            rentAvailability: 4,
            buyAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
              'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80'
            ],
            owner: {
              id: 104,
              name: 'Laura T.',
              avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
              rating: 4.5
            },
            isNew: false,
            rentalCount: 7,
            dateAdded: '2023-03-18'
          }
        ];
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        this.loading = false;
      }
    },
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
    openProductDetail(item) {
      this.selectedProduct = item;
      this.currentImage = item.images[0];
      document.body.style.overflow = 'hidden'; // Evita el scroll del body cuando el modal está abierto
    },
    closeProductDetail() {
      this.selectedProduct = null;
      document.body.style.overflow = 'auto'; // Restaura el scroll del body
    },
    changeMainImage(image) {
      this.currentImage = image;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    startRentalProcess(item) {
      this.$emit('start-rental', item);
      this.closeProductDetail();
    },
    startBuyProcess(item) {
      this.$emit('start-buy', item);
      this.closeProductDetail();
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>