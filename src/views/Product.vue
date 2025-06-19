<template>
  <div class="container mx-auto px-4 py-8">
    <div ref="filterContainer" class="bg-pink-50 rounded-xl shadow-lg p-6 mb-8 border border-pink-100">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-rose-800">Categoría</label>
          <select v-model="filters.category" class="w-full px-3 py-2 border border-pink-300 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow duration-200 hover:shadow-sm">
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
          <label class="block text-sm font-medium text-rose-800">Talla</label>
          <select v-model="filters.size" class="w-full px-3 py-2 border border-pink-300 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow duration-200 hover:shadow-sm">
            <option value="">Todas</option>
            <option v-for="size in sizeOptions" :value="size" :key="size">{{ size }}</option>
          </select>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium text-rose-800">Tipo</label>
          <select v-model="filters.availability" class="w-full px-3 py-2 border border-pink-300 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow duration-200 hover:shadow-sm">
            <option value="">Todos</option>
            <option value="rent">Solo alquiler</option>
            <option value="buy">Solo compra</option>
            <option value="both">Alquiler y compra</option>
          </select>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium text-rose-800">Ordenar por</label>
          <select v-model="filters.sort" class="w-full px-3 py-2 border border-pink-300 rounded-lg bg-white text-rose-900 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow duration-200 hover:shadow-sm">
            <option value="popular">Más populares</option>
            <option value="price_asc">Precio: menor a mayor</option>
            <option value="price_desc">Precio: mayor a menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>
        
        <button @click="clearFilters" class="flex items-center justify-center gap-2 px-4 py-2 bg-pink-100 text-rose-800 rounded-lg font-medium hover:bg-pink-200 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Limpiar
        </button>
      </div>
    </div>

    <div v-if="!loading && totalItems === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 mb-4">No se encontraron productos que coincidan con los filtros.</p>
        <button @click="clearFilters" class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Limpiar filtros
        </button>
    </div>
    
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 animate-pulse">
        <div class="h-56 bg-pink-100 w-full"></div>
        <div class="p-3 space-y-2">
          <div class="h-4 bg-pink-100 rounded w-3/4"></div>
          <div class="h-3 bg-pink-100 rounded w-1/2"></div>
          <div class="h-5 bg-pink-100 rounded w-1/3 mt-2"></div>
          <div class="h-9 bg-pink-100 rounded mt-3"></div>
        </div>
      </div>
    </div>

    <div v-else id="products-section" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in paginatedItems" :key="item.id"
           class="relative bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition-shadow duration-300 flex flex-col group">
        <div class="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
          <span v-if="item.isNew" class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">Nuevo</span>
          <span v-if="item.discount" class="px-2 py-0.5 text-xs font-bold rounded-full bg-pink-600 text-white">-{{ item.discount }}%</span>
          <span v-if="item.canRent && item.canBuy" class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-700 text-white">Alq./Comp.</span>
          <span v-else-if="item.canRent" class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-700 text-white">Alquiler</span>
          <span v-else-if="item.canBuy" class="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-700 text-white">Compra</span>
        </div>

        <div class="relative overflow-hidden h-56 cursor-pointer" @click="openProductDetail(item)">
          <img :src="item.images[0]" :alt="item.name"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
          <div :class="['absolute bottom-0 left-0 right-0 py-1.5 px-3 text-center text-xs font-bold text-white',
                       (item.canRent && item.rentAvailability > 0) || (item.canBuy && item.buyAvailability > 0) ? 'bg-green-600' : 'bg-rose-600']">
            {{ getAvailabilityText(item) }}
          </div>
        </div>

        <div class="p-3 flex-grow flex flex-col">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center space-x-1.5">
              <img :src="item.owner.avatar" :alt="item.owner.name" class="w-5 h-5 rounded-full border border-pink-200">
              <span class="text-xs text-rose-900 font-medium truncate">{{ item.owner.name }}</span>
            </div>
            <div class="text-yellow-500 text-xs font-semibold flex items-center">
                <svg class="h-3.5 w-3.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ item.owner.rating.toFixed(1) }}
            </div>
          </div>

          <h3 class="text-base font-semibold text-rose-900 mb-1 line-clamp-2">{{ item.name }}</h3>
          <p class="text-xs text-rose-700 mb-2 line-clamp-2">{{ truncateDescription(item.description, 50) }}</p>

          <div class="flex flex-wrap gap-1 mb-3">
            <span class="inline-flex items-center text-xs text-rose-600 bg-pink-50 rounded-full px-2 py-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4z" clip-rule="evenodd" />
              </svg>
              {{ item.size }}
            </span>
            <span class="inline-flex items-center text-xs text-rose-600 bg-pink-50 rounded-full px-2 py-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
              </svg>
              {{ item.color }}
            </span>
          </div>

          <div class="mt-auto pt-2">
            <div class="space-y-1 mb-3">
              <template v-if="item.canRent">
                <div class="flex items-baseline gap-1">
                  <span class="text-lg font-bold text-rose-900">S/{{ item.rentPrice.toFixed(2) }}</span>
                  <span class="text-xs text-rose-700">/{{ item.rentalType === 'daily' ? 'día' : 'sem' }}</span>
                  <span v-if="item.originalRentPrice" class="text-xs text-rose-500 line-through ml-1">S/{{ item.originalRentPrice.toFixed(2) }}</span>
                </div>
                <div class="text-xs text-rose-700 font-medium uppercase tracking-wider">Alquiler</div>
              </template>

              <template v-if="item.canBuy">
                <div :class="{'mt-2': item.canRent}">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-bold text-rose-900">S/{{ item.buyPrice.toFixed(2) }}</span>
                    <span v-if="item.originalBuyPrice" class="text-xs text-rose-500 line-through ml-1">S/{{ item.originalBuyPrice.toFixed(2) }}</span>
                  </div>
                  <div class="text-xs text-rose-700 font-medium uppercase tracking-wider">Compra</div>
                </div>
              </template>
            </div>

            <div class="flex items-center justify-between gap-2">
              <div class="flex flex-grow gap-2">
                <button v-if="item.canRent && item.rentAvailability > 0"
                  @click.stop="startRentalProcess(item)"
                  class="flex-grow py-2 px-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                  Alquilar
                </button>
                <button v-if="item.canBuy && item.buyAvailability > 0"
                  @click.stop="startBuyProcess(item)"
                  class="flex-grow py-2 px-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                  Comprar
                </button>
                <button v-if="(!item.canRent || item.rentAvailability <= 0) && (!item.canBuy || item.buyAvailability <= 0)"
                  disabled
                  class="flex-grow py-2 px-2 bg-pink-100 text-rose-800 text-sm font-semibold rounded-lg cursor-not-allowed">
                  Agotado
                </button>
              </div>

              <button @click.stop="toggleWishlist(item.id)"
                :class="['flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors shadow-sm',
                        isInWishlist(item.id) ? 'bg-rose-100 text-rose-500' : 'bg-pink-50 text-rose-400 hover:bg-pink-100']"
                aria-label="Añadir a favoritos">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && totalItems > 0" class="flex justify-center items-center gap-4 mt-10">
      <button @click="prevPage" :disabled="currentPage === 1"
        :class="['flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors shadow-sm',
                 currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-white text-rose-900 border border-pink-200 hover:bg-pink-50']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Anterior
      </button>

      <div class="text-sm font-medium text-rose-700">
        Página {{ currentPage }} de {{ totalPages }}
      </div>

      <button @click="nextPage" :disabled="currentPage === totalPages"
        :class="['flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors shadow-sm',
                 currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-white text-rose-900 border border-pink-200 hover:bg-pink-50']">
        Siguiente
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>


    <div v-if="selectedProduct" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full my-8">
        <div class="bg-white p-4 sm:p-6">
          <div class="sm:flex">
            <div class="w-full sm:w-1/2 pr-0 sm:pr-4 mb-4 sm:mb-0">
              <div class="relative h-72 sm:h-80 w-full mb-3 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <img :src="currentImage || (selectedProduct.images ? selectedProduct.images[0] : '')" :alt="selectedProduct.name" class="w-full h-full object-cover">
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(image, index) in selectedProduct.images" :key="index"
                     class="h-16 sm:h-20 cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:border-rose-500 transition-colors"
                     :class="{'border-2 border-rose-500 shadow-lg': image === currentImage || (!currentImage && index === 0)}"
                     @click="changeMainImage(image)">
                  <img :src="image" :alt="'Imagen ' + (index + 1)" class="w-full h-full object-cover">
                </div>
              </div>
            </div>

            <div class="w-full sm:w-1/2 mt-4 sm:mt-0 flex flex-col">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-2xl font-bold text-rose-900 mb-1">{{ selectedProduct.name }}</h3>
                  <div class="flex items-center text-sm text-gray-500">
                    <div class="flex items-center text-yellow-500 mr-1.5">
                      <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="{'text-gray-300': i > Math.round(selectedProduct.owner.rating)}" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span>({{ selectedProduct.rentalCount }} alquileres)</span>
                  </div>
                </div>
                <button @click="closeProductDetail" class="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="mb-4 flex-grow">
                <p class="text-gray-700 mb-3 text-sm leading-relaxed">{{ selectedProduct.description }}</p>

                <div class="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-xs">
                  <div class="inline-flex items-center text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4z" clip-rule="evenodd" />
                    </svg>
                    Talla: {{ selectedProduct.size }}
                  </div>
                  <div class="inline-flex items-center text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                    </svg>
                    Color: {{ selectedProduct.color }}
                  </div>
                  <div class="inline-flex items-center text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                    </svg>
                    Añadido: {{ formatDate(selectedProduct.dateAdded) }}
                  </div>
                </div>

                <div class="bg-pink-50 rounded-lg p-3 mb-4 border border-pink-100">
                  <div class="flex items-center mb-2">
                    <img :src="selectedProduct.owner.avatar" :alt="selectedProduct.owner.name" class="w-8 h-8 rounded-full border border-pink-200 mr-2">
                    <div>
                      <p class="font-medium text-rose-900">Ofrecido por {{ selectedProduct.owner.name }}</p>
                      <div class="flex items-center text-yellow-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                        <span class="ml-1">{{ selectedProduct.owner.rating.toFixed(1) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                <div class="space-y-2">
                  <div v-if="selectedProduct.canRent" class="flex justify-between items-center py-1">
                    <div>
                      <p class="text-sm font-medium text-gray-700 uppercase tracking-wider">Alquiler:</p>
                      <p class="text-xs text-gray-500">{{ selectedProduct.rentalType === 'daily' ? 'Por día' : 'Por semana' }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xl font-bold text-rose-900">S/{{ selectedProduct.rentPrice.toFixed(2) }}</p>
                      <p v-if="selectedProduct.originalRentPrice" class="text-xs text-gray-500 line-through">S/{{ selectedProduct.originalRentPrice.toFixed(2) }}</p>
                      <p class="text-xs text-green-600 mt-0.5">{{ selectedProduct.rentAvailability }} disponibles</p>
                    </div>
                  </div>

                  <div v-if="selectedProduct.canBuy" class="flex justify-between items-center py-1">
                    <div>
                      <p class="text-sm font-medium text-gray-700 uppercase tracking-wider">Compra:</p>
                      <p class="text-xs text-gray-500">Precio final</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xl font-bold text-rose-900">S/{{ selectedProduct.buyPrice.toFixed(2) }}</p>
                      <p v-if="selectedProduct.originalBuyPrice" class="text-xs text-gray-500 line-through">S/{{ selectedProduct.originalBuyPrice.toFixed(2) }}</p>
                      <p class="text-xs text-green-600 mt-0.5">{{ selectedProduct.buyAvailability }} disponibles</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col space-y-3">
                <button v-if="selectedProduct.canRent && selectedProduct.rentAvailability > 0"
                  @click="startRentalProcess(selectedProduct)"
                  class="w-full py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Alquilar ahora
                </button>

                <button v-if="selectedProduct.canBuy && selectedProduct.buyAvailability > 0"
                  @click="startBuyProcess(selectedProduct)"
                  class="w-full py-2.5 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                  </svg>
                  Comprar ahora
                </button>

                <button @click="toggleWishlist(selectedProduct.id)"
                  :class="['w-full py-2.5 px-4 border rounded-lg font-medium transition-colors flex items-center justify-center shadow-sm',
                          isInWishlist(selectedProduct.id) ? 'border-rose-500 bg-rose-50 text-rose-600 hover:bg-rose-100' : 'border-gray-300 text-gray-700 hover:bg-gray-50']">
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
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'Product', 
  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },
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
      currentImage: '',
      scrollOffset: 0 // Puedes ajustar esto. Si tienes una barra de navegación fija de 60px de alto, prueba con -60
    }
  },
  computed: {
    filteredAndSortedItems() {
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
      return filtered;
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedItems.slice(start, end);
    },
    totalItems() {
        return this.filteredAndSortedItems.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  watch: {
    '$route.query.category': {
      immediate: true,
      handler(newCategory) {
        if (newCategory) {
          this.filters.category = newCategory;
        } else {
          this.filters.category = '';
        }
        // No resetear a la primera página aquí para permitir que la navegación del Header maneje el scroll.
        // Si necesitas que siempre se resetee la página cuando cambia la categoría por la URL, descomenta:
        // this.currentPage = 1;
      }
    },
    'filters': {
      handler() {
        this.currentPage = 1;
      },
      deep: true
    }
  },
  mounted() {
    this.loadItems();
    this.loadWishlist();
    if (this.route.query.category) {
      this.filters.category = this.route.query.category;
    }
  },
  methods: {
    async loadItems() {
      this.loading = true;
      try {
        // Simulación de datos de API con 8 productos variados
        this.items = [
          {
            id: 1,
            name: 'Vestido de noche elegante con detalles en dorado',
            description: 'Un vestido largo de gala que irradia sofisticación. Su diseño en seda y chiffon de alta calidad, con un sutil brillo dorado, lo hace ideal para eventos de etiqueta. Incorpora un forro suave para máxima comodidad y un cinturón ajustable que realza la figura.',
            category: 'vestidos',
            size: 'M',
            color: 'Negro',
            canRent: true,
            canBuy: true,
            rentPrice: 35.99,
            originalRentPrice: 45.99,
            discount: 22,
            buyPrice: 199.99,
            originalBuyPrice: 249.99,
            rentalType: 'daily',
            rentAvailability: 2,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
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
            name: 'Traje ejecutivo moderno',
            description: 'Traje de dos piezas en lana de primera calidad, diseñado para el profesional contemporáneo. Su chaqueta de corte slim y pantalón de ajuste perfecto te brindará un look pulcro y autoritario para cualquier encuentro de negocios. Destacan sus acabados internos y botones artesanales.',
            category: 'trajes',
            size: 'L',
            color: 'Azul marino',
            canRent: true,
            canBuy: false,
            rentPrice: 42.50,
            rentalType: 'daily',
            rentAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1542841381-12f5e34707db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
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
            name: 'Zapatos de tacón elegantes y cómodos',
            description: 'Un par de zapatos de tacón que combinan a la perfección estilo y confort. Con un tacón de 7 cm y una base ancha para máxima estabilidad, te permitirán moverte con confianza. Su plantilla acolchada y suela antideslizante los hacen ideales para largas jornadas.',
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
            buyAvailability: 0, // Simula que no hay stock para comprar
            images: [
              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1584982631574-d4b8f041203b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
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
            name: 'Disfraz de superhéroe para fiesta infantil',
            description: 'Disfraz completo y detallado de tu superhéroe favorito, perfecto para fiestas de cumpleaños o eventos temáticos. Fabricado con materiales cómodos y seguros para niños, incluye accesorios auténticos que lo harán sentir como un verdadero héroe. Fácil de poner y quitar.',
            category: 'disfraces',
            size: 'S',
            color: 'Rojo/Azul',
            canRent: true,
            canBuy: false,
            rentPrice: 18.00,
            rentalType: 'daily',
            rentAvailability: 5,
            images: [
              'https://images.unsplash.com/photo-1622437648177-3e8f8a1d7c4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1620000049000-84b2e8d9c57d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1579782524419-f54f738092f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 104,
              name: 'Javier P.',
              avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
              rating: 4.5
            },
            rentalCount: 30,
            dateAdded: '2022-11-01'
          },
          {
            id: 5,
            name: 'Aretes colgantes de perlas cultivadas',
            description: 'Delicados aretes con perlas cultivadas de agua dulce, montadas en plata de ley. Su diseño clásico y elegante los convierte en el accesorio perfecto para cualquier ocasión, desde un evento formal hasta el uso diario. Son ligeros y cómodos de llevar.',
            category: 'accesorios',
            size: 'Única',
            color: 'Blanco',
            canRent: false,
            canBuy: true,
            buyPrice: 85.00,
            originalBuyPrice: 95.00,
            discount: 10,
            buyAvailability: 4,
            images: [
              'https://images.unsplash.com/photo-1620726710431-709673966025?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1607590826978-4ecf556b2f4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1599427670984-902ee5c17d7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 105,
              name: 'Sofía R.',
              avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
              rating: 4.9
            },
            isNew: true,
            rentalCount: 0,
            dateAdded: '2023-06-20'
          },
          {
            id: 6,
            name: 'Vestido de cóctel azul cielo',
            description: 'Un vestido fresco y juvenil, perfecto para eventos de día o cócteles. Su tela ligera y color vibrante te harán destacar, mientras que su corte favorecedor se adapta a diversas siluetas. Es fácil de cuidar y no requiere planchado.',
            category: 'vestidos',
            size: 'S',
            color: 'Azul cielo',
            canRent: true,
            canBuy: true,
            rentPrice: 28.00,
            buyPrice: 150.00,
            rentalType: 'daily',
            rentAvailability: 1,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1582142270383-a4f6a5b6f3a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1574870104856-bb617a232f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1594953330694-81d36c84c4f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 106,
              name: 'Laura V.',
              avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
              rating: 4.6
            },
            rentalCount: 9,
            dateAdded: '2023-03-01'
          },
          {
            id: 7,
            name: 'Traje casual de lino para verano',
            description: 'Ideal para climas cálidos, este traje de lino ofrece comodidad y estilo. Ligero y transpirable, es perfecto para eventos al aire libre o un look elegante pero relajado. La chaqueta y el pantalón se pueden usar juntos o por separado, ofreciendo gran versatilidad.',
            category: 'trajes',
            size: 'XL',
            color: 'Beige',
            canRent: true,
            canBuy: true,
            rentPrice: 38.00,
            buyPrice: 180.00,
            originalRentPrice: 48.00,
            discount: 20,
            rentalType: 'weekly',
            rentAvailability: 2,
            buyAvailability: 1,
            images: [
              'https://images.unsplash.com/photo-1533842186780-60b54378f773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1548043640-5e36e654f46a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1579783900350-f8444f2b1d3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 107,
              name: 'Roberto D.',
              avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
              rating: 4.7
            },
            isNew: true,
            rentalCount: 7,
            dateAdded: '2023-06-25' // Más reciente
          },
          {
            id: 8,
            name: 'Botas de piel estilo Chelsea',
            description: 'Botas clásicas Chelsea de piel genuina, con elástico lateral para un ajuste cómodo. Duraderas y versátiles, ideales para combinar con jeans o pantalones de vestir. Su suela robusta y diseño atemporal las hacen un básico de armario.',
            category: 'zapatos',
            size: '42',
            color: 'Marrón',
            canRent: false,
            canBuy: true,
            buyPrice: 220.00,
            buyAvailability: 3,
            images: [
              'https://images.unsplash.com/photo-1606891398553-61921a97d197?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1594953330694-81d36c84c4f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 108,
              name: 'Ricardo N.',
              avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
              rating: 4.8
            },
            rentalCount: 0,
            dateAdded: '2023-01-10'
          },
          {
            id: 9,
            name: 'Collar de plata con dije de corazón',
            description: 'Un delicado collar de plata de ley con un pequeño dije en forma de corazón. Perfecto para un regalo significativo o para añadir un toque sutil de elegancia a tu atuendo diario. Es hipoalergénico y resistente al deslustre.',
            category: 'accesorios',
            size: 'Única',
            color: 'Plata',
            canRent: false,
            canBuy: true,
            buyPrice: 55.00,
            buyAvailability: 10,
            images: [
              'https://images.unsplash.com/photo-1612712128140-e2239d2e1467?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1612712128140-e2239d2e1467?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1588691523456-4c465b8d23d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 109,
              name: 'Elena C.',
              avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
              rating: 4.9
            },
            rentalCount: 0,
            dateAdded: '2023-04-01'
          },
          {
            id: 10,
            name: 'Vestido floral de verano',
            description: 'Vestido ligero y fluido con un estampado floral vibrante, perfecto para los días soleados de verano. Su tejido transpirable y corte relajado aseguran máxima comodidad. Ideal para paseos por la playa o reuniones informales.',
            category: 'verano-2025',
            size: 'M',
            color: 'Multicolor',
            canRent: true,
            canBuy: true,
            rentPrice: 20.00,
            buyPrice: 90.00,
            rentalType: 'daily',
            rentAvailability: 3,
            buyAvailability: 2,
            images: [
              'https://images.unsplash.com/photo-1579782483108-98e3532c2560?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1579782483108-98e3532c2560?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80',
              'https://images.unsplash.com/photo-1579782483108-98e3532c2560?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=625&q=80'
            ],
            owner: {
              id: 110,
              name: 'Julia F.',
              avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
              rating: 4.5
            },
            isNew: true,
            rentalCount: 15,
            dateAdded: '2023-07-01' // Más reciente
          }
        ];
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        this.loading = false;
      }
    },
    loadWishlist() {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        this.wishlist = JSON.parse(storedWishlist);
      }
    },
    saveWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    },
    isInWishlist(itemId) {
      return this.wishlist.includes(itemId);
    },
    toggleWishlist(itemId) {
      if (this.isInWishlist(itemId)) {
        this.wishlist = this.wishlist.filter(id => id !== itemId);
      } else {
        this.wishlist.push(itemId);
      }
      this.saveWishlist();
    },
    getAvailabilityText(item) {
      const canRent = item.canRent && item.rentAvailability > 0;
      const canBuy = item.canBuy && item.buyAvailability > 0;

      if (canRent && canBuy) {
        return `Alquiler (${item.rentAvailability}) / Compra (${item.buyAvailability})`;
      } else if (canRent) {
        return `${item.rentAvailability} disponibles para alquiler`;
      } else if (canBuy) {
        return `${item.buyAvailability} disponibles para compra`;
      } else {
        return 'Agotado';
      }
    },
    truncateDescription(description, maxLength) {
      if (description.length <= maxLength) {
        return description;
      }
      return description.substring(0, maxLength) + '...';
    },
    isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      // Ajusta este umbral si necesitas que el elemento sea visible en un porcentaje específico
      const threshold = 0.8; // Considera visible si el 80% del elemento está en el viewport
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight * threshold || document.documentElement.clientHeight * threshold) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    scrollToFilterContainer() {
      if (this.$refs.filterContainer) {
        const element = this.$refs.filterContainer;
        if (!this.isElementInViewport(element)) {
          // Obtén la posición actual del elemento
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.scrollY;
          
          // Calcula la posición de scroll deseada con el offset
          // Restamos el offset para que el scroll se detenga más arriba
          const targetScrollPosition = absoluteElementTop + this.scrollOffset;

          window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
          });
        }
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToFilterContainer();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToFilterContainer();
      }
    },
    clearFilters() {
      const scrollY = window.scrollY; // Guardar la posición actual del scroll
      this.filters.category = '';
      this.filters.size = '';
      this.filters.availability = '';
      this.filters.sort = 'popular';
      this.currentPage = 1;

      this.router.replace({ query: {} }).then(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY); // Restaurar el scroll
        });
      }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.error(err);
        }
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY); // Asegurar el scroll incluso en error
        });
      });
    },
    openProductDetail(product) {
      this.selectedProduct = product;
      this.currentImage = product.images[0];
      document.body.style.overflow = 'hidden'; // Bloquear el scroll del body
    },
    closeProductDetail() {
      this.selectedProduct = null;
      this.currentImage = '';
      document.body.style.overflow = ''; // Restaurar el scroll del body
    },
    changeMainImage(image) {
      this.currentImage = image;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    startRentalProcess(product) {
      alert(`Iniciando proceso de alquiler para: ${product.name}`);
      // Lógica para redirigir o abrir modal
    },
    startBuyProcess(product) {
      alert(`Iniciando proceso de compra para: ${product.name}`);
      // Lógica para redirigir o añadir al carrito
    }
  }
}
</script>

<style scoped>
/* Estilos para el scrollbar en Firefox */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
}

/* Ocultar scrollbar en Webkit (Chrome, Safari) */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>