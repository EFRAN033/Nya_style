<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased">
    <main class="container mx-auto px-4 py-8">
      <section class="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <div class="max-w-4xl mx-auto text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">Encuentra tu estilo perfecto</h2>
          <p class="text-lg text-gray-600">Descubre prendas únicas para comprar o alquilar</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div class="space-y-1">
            <label for="category-select" class="block text-sm font-medium text-gray-700">Categoría</label>
            <div class="relative">
              <select id="category-select" v-model="filters.category" class="input-select">
                <option value="">Todas las categorías</option>
                <option value="vestidos">Vestidos</option>
                <option value="trajes">Trajes</option>
                <option value="disfraces">Disfraces</option>
                <option value="accesorios">Accesorios</option>
                <option value="calzado">Calzado</option>
                <option value="otro">Otros</option>
              </select>
              <div class="input-select-icon">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <label for="size-select" class="block text-sm font-medium text-gray-700">Talla</label>
            <div class="relative">
              <select id="size-select" v-model="filters.size" class="input-select">
                <option value="">Todas las tallas</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <div class="input-select-icon">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <label for="max-price-input" class="block text-sm font-medium text-gray-700">Precio máximo</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <span class="text-sm">S/</span>
              </div>
              <input
                type="number"
                id="max-price-input"
                v-model.number="filters.maxPrice"
                placeholder=""
                class="pl-9 input-text"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label for="status-select" class="block text-sm font-medium text-gray-700">Estado</label>
            <div class="relative">
              <select id="status-select" v-model="filters.status" class="input-select">
                <option value="">Todos los estados</option>
                <option value="available">Disponible</option>
                <option value="rented">Alquilado</option>
                <option value="sold">Vendido</option>
              </select>
              <div class="input-select-icon">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="flex items-end h-full">
            <button @click="clearFilters" class="w-full button-secondary">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Limpiar
            </button>
          </div>
        </div>
      </section>

      <div v-if="isLoading" class="py-16 flex flex-col items-center justify-center">
        <div class="relative w-20 h-20 mb-6">
          <div class="absolute inset-0 rounded-full border-4 border-purple-200 animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-4 border-purple-500 border-t-transparent animate-spin animation-delay-150"></div>
        </div>
        <p class="text-lg font-medium text-gray-700">Buscando productos increíbles...</p>
        <p class="text-sm text-gray-500 mt-2">Por favor espera un momento</p>
      </div>

      <div v-else-if="!isLoading && paginatedProducts.length === 0" class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="max-w-md mx-auto">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-800 mt-4">No encontramos resultados</h3>
          <p class="text-gray-500 mt-2">Prueba ajustando los filtros o busca en otras categorías</p>
          <button @click="clearFilters" class="mt-6 button-primary">
            Mostrar todos los productos
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <article v-for="product in paginatedProducts" :key="product.product_id" 
          @click="openProductModal(product)"
          class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
          
          <div class="relative w-full h-64 bg-gray-50 overflow-hidden">
            <div v-if="product.imageUrl" class="absolute inset-0 bg-gray-200">
              <img :src="getFullImageUrl(product.imageUrl)" :alt="product.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                loading="lazy">
            </div>
            <div v-else class="absolute inset-0 flex items-center justify-center text-gray-300">
              <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h16V5H4zm2 2h12v10H6V7zM7 8h10v8H7V8zm5 0a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
              </svg>
            </div>
            
            <div class="absolute top-3 left-3 flex flex-col space-y-2">
              <span class="badge bg-purple-600">{{ product.category }}</span>
              <span v-if="product.status === 'available'" class="badge bg-green-500">Disponible</span>
              <span v-else-if="product.status === 'rented'" class="badge bg-yellow-500">Alquilado</span>
              <span v-else-if="product.status === 'sold'" class="badge bg-red-500">Vendido</span>
            </div>
            
            <div class="absolute top-3 right-3">
              <span class="badge bg-pink-600 text-lg font-bold">{{ getProductDisplayPrice(product) }}</span>
            </div>
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex flex-wrap gap-2">
              <span v-for="type in product.offer_types" :key="type"
                :class="['badge-sm', 
                  {'bg-blue-500': type === 'venta', 
                   'bg-green-500': type === 'alquiler', 
                   'bg-purple-500': type === 'venta_alquiler'}]">
                {{ getOfferTypeText(type) }}
              </span>
            </div>

            <div class="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                {{ formatDate(product.created_at) }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
                </svg>
                {{ product.stock }} en stock
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="totalPages > 1" class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-500">
          Mostrando <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> a 
          <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}</span> de 
          <span class="font-medium">{{ filteredProducts.length }}</span> resultados
        </div>
        
        <div class="flex items-center space-x-2">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="pagination-button" :class="{'opacity-50 cursor-not-allowed': currentPage === 1}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="sr-only">Anterior</span>
          </button>
          
          <div class="flex items-center space-x-1">
            <button v-for="page in visiblePages" :key="page"
              @click="currentPage = page"
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
              :class="page === currentPage ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-gray-100'">
              {{ page }}
            </button>
            <span v-if="showEllipsis" class="px-2 text-gray-500">...</span>
          </div>
          
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="pagination-button" :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}">
            <span class="sr-only">Siguiente</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <transition name="modal">
        <div v-if="selectedProduct" class="fixed inset-0 z-50 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <transition name="modal-fade">
              <div class="fixed inset-0 transition-opacity" @click="closeProductModal">
                <div class="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
              </div>
            </transition>

            <div class="inline-block align-bottom bg-white rounded-2xl shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full overflow-hidden">
              <div class="flex flex-col lg:flex-row">
                <div class="lg:w-1/2 p-6 bg-gray-50">
                  <div class="relative h-96 rounded-xl overflow-hidden mb-4 bg-white shadow-inner flex items-center justify-center">
                    <img v-if="mainImageUrl" :src="mainImageUrl" :alt="selectedProduct.name" 
                      class="max-h-full max-w-full object-contain transition-opacity duration-300">
                    <div v-else class="text-gray-300">
                      <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h16V5H4zm2 2h12v10H6V7zM7 8h10v8H7V8zm5 0a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div v-if="selectedProduct.image_urls && selectedProduct.image_urls.length > 1" 
                    class="flex space-x-3 overflow-x-auto pb-2">
                    <button v-for="(url, index) in selectedProduct.image_urls" :key="index"
                      @click="mainImageUrl = getFullImageUrl(url)"
                      class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all"
                      :class="{'border-purple-600 shadow-md': mainImageUrl === getFullImageUrl(url), 'border-transparent': mainImageUrl !== getFullImageUrl(url)}">
                      <img :src="getFullImageUrl(url)" :alt="`Thumbnail ${index + 1}`"
                        class="w-full h-full object-cover">
                    </button>
                  </div>
                </div>
                
                <div class="lg:w-1/2 p-6 flex flex-col">
                  <div class="flex-grow">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">{{ selectedProduct.name }}</h2>
                        <span class="inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold text-purple-700 bg-purple-100">
                          {{ selectedProduct.category }}
                        </span>
                      </div>
                      <button @click="closeProductModal" class="text-gray-400 hover:text-gray-500 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div class="mb-6 flex items-center justify-between">
                      <div>
                        <p class="text-3xl font-bold text-purple-700">{{ getProductDisplayPrice(selectedProduct) }}</p>
                        <div class="flex items-center mt-1 text-sm text-gray-500">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                          </svg>
                          Publicado el {{ formatDate(selectedProduct.created_at) }}
                        </div>
                      </div>
                      <div v-if="selectedProduct.status === 'available'" class="badge bg-green-100 text-green-800">
                        Disponible
                      </div>
                      <div v-else-if="selectedProduct.status === 'rented'" class="badge bg-yellow-100 text-yellow-800">
                        Alquilado
                      </div>
                      <div v-else-if="selectedProduct.status === 'sold'" class="badge bg-red-100 text-red-800">
                        Vendido
                      </div>
                    </div>
                    
                    <div class="mb-6">
                      <h3 class="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                      <p class="text-gray-700 whitespace-pre-line">{{ selectedProduct.description }}</p>
                    </div>
                    
                    <div v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('alquiler') || selectedProduct.offer_types.includes('venta_alquiler')) && selectedProduct.rental_details" 
                      class="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <h3 class="text-lg font-semibold text-purple-800 mb-3">Detalles de alquiler</h3>
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-sm text-gray-600">Precio por día</p>
                          <p class="font-bold text-purple-700">S/ {{ selectedProduct.rental_details.price_per_day ? selectedProduct.rental_details.price_per_day.toFixed(2) : 'N/A' }}</p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-600">Días mínimos</p>
                          <p class="font-bold text-purple-700">{{ selectedProduct.rental_details.min_days || '1' }}</p>
                        </div>
                        <div v-if="selectedProduct.rental_details.max_days">
                          <p class="text-sm text-gray-600">Días máximos</p>
                          <p class="font-bold text-purple-700">{{ selectedProduct.rental_details.max_days }}</p>
                        </div>
                        <div v-if="selectedProduct.rental_details.deposit_amount">
                          <p class="text-sm text-gray-600">Depósito</p>
                          <p class="font-bold text-purple-700">S/ {{ selectedProduct.rental_details.deposit_amount.toFixed(2) }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="selectedProduct.variations && selectedProduct.variations.length > 0" class="mb-6">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">Variaciones disponibles</h3>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div v-for="(variation, index) in selectedProduct.variations" :key="index"
                          class="p-3 border rounded-lg hover:border-purple-300 transition-colors"
                          :class="{'border-purple-500 bg-purple-50': variation.stock > 0, 'border-gray-200': variation.stock <= 0}">
                          <p class="font-medium text-gray-800">Talla: {{ variation.size }}</p>
                          <p class="text-sm text-gray-600">Color: {{ variation.color }}</p>
                          <p class="text-sm mt-1" :class="{'text-green-600 font-bold': variation.stock > 0, 'text-red-600 font-bold': variation.stock <= 0}">
                            Stock: {{ variation.stock }}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="pt-4 border-t border-gray-200">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">Información del vendedor</h3>
                      <div class="space-y-2">
                        <p class="flex items-center text-gray-700">
                          <svg class="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                          </svg>
                          {{ selectedProduct.seller_name }}
                        </p>
                        <p v-if="selectedProduct.seller_phone" class="flex items-center text-gray-700">
                          <svg class="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                          </svg>
                          <a :href="`tel:${selectedProduct.seller_phone}`" class="hover:underline">{{ selectedProduct.seller_phone }}</a>
                        </p>
                        <p v-if="selectedProduct.seller_email" class="flex items-center text-gray-700">
                          <svg class="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                          <a :href="`mailto:${selectedProduct.seller_email}`" class="hover:underline">{{ selectedProduct.seller_email }}</a>
                        </p>
                        <p v-if="selectedProduct.seller_address" class="flex items-start text-gray-700">
                          <svg class="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                          </svg>
                          {{ selectedProduct.seller_address }}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                    <button v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('alquiler') || selectedProduct.offer_types.includes('venta_alquiler'))"
                      class="button-primary flex-1">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Alquilar ahora
                    </button>
                    <button 
                      v-if="selectedProduct.offer_types && (selectedProduct.offer_types.includes('venta') || selectedProduct.offer_types.includes('venta_alquiler'))"
                      @click="handleAddToWishlist(selectedProduct)"
                      class="button-secondary flex-1">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.703.707 1.703H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Añadir a lista de deseos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useWishlist } from '@/components/useWishlist'; // ¡IMPORTA EL COMPOSABLE AQUÍ!

const BASE_URL_BACKEND = 'http://localhost:8000';

const products = ref([]);
const isLoading = ref(true);
const selectedProduct = ref(null);
const mainImageUrl = ref('');

const filters = reactive({
  category: '',
  size: '',
  maxPrice: null,
  status: '',
});

const currentPage = ref(1);
const itemsPerPage = 8;

const router = useRouter();
const { addToWishlist } = useWishlist(); // Obtiene la función addToWishlist del composable

// Computed para paginación visible (mejor experiencia UX)
const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const range = 2; // Cuántas páginas mostrar alrededor de la actual
  
  // Caso cuando hay pocas páginas
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // Lógica para mostrar páginas con elipsis
  if (current <= range + 1) {
    for (let i = 1; i <= range * 2 + 1; i++) {
      pages.push(i);
    }
    // Si no es el último bloque de páginas, añade elipsis y la última página
    if (total > range * 2 + 1 && current < total - range) {
        pages.push('...'); // Representa elipsis
        pages.push(total);
    }
  } else if (current >= total - range) {
    pages.push(1);
    // Si no es el primer bloque de páginas, añade elipsis
    if (total > range * 2 + 1 && current > range + 1) {
        pages.unshift('...'); // Representa elipsis
    }
    for (let i = total - range * 2; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('...'); // Elipsis al inicio
    for (let i = current - range; i <= current + range; i++) {
      pages.push(i);
    }
    pages.push('...'); // Elipsis al final
    pages.push(total);
  }
  
  // Filtra los duplicados si se produce alguno (ej. 1, ..., 5, 6, 7, ..., 10 -> 1, ..., 5, 6, 7, 10)
  return Array.from(new Set(pages));
});

const showEllipsis = computed(() => {
  return totalPages.value > 5 && 
    !(currentPage.value <= 3 || currentPage.value >= totalPages.value - 2);
});

const fetchAllProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${BASE_URL_BACKEND}/products`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllProducts();
});

watch(filters, () => {
  currentPage.value = 1;
});

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.size) {
    filtered = filtered.filter(p => 
      p.variations && p.variations.some(v => 
        v.size && v.size === filters.size && v.stock > 0
      )
    );
  }

  if (filters.maxPrice !== null && filters.maxPrice !== '') {
    filtered = filtered.filter(p => {
      // Considera el precio de venta si el producto está a la venta
      const hasSalePrice = p.offer_types && (p.offer_types.includes('venta') || p.offer_types.includes('venta_alquiler')) && p.price !== null && p.price <= filters.maxPrice;
      // Considera el precio de alquiler si el producto está en alquiler
      const hasRentalPrice = p.offer_types && (p.offer_types.includes('alquiler') || p.offer_types.includes('venta_alquiler')) && p.rental_details && p.rental_details.price_per_day !== null && p.rental_details.price_per_day <= filters.maxPrice;
      
      return hasSalePrice || hasRentalPrice;
    });
  }

  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const clearFilters = () => {
  filters.category = '';
  filters.size = '';
  filters.maxPrice = null;
  filters.status = '';
  currentPage.value = 1;
};

const openProductModal = (product) => {
  selectedProduct.value = product;
  mainImageUrl.value = product.image_urls && product.image_urls.length > 0 
    ? getFullImageUrl(product.image_urls[0]) 
    : (product.imageUrl ? getFullImageUrl(product.imageUrl) : ''); // Fallback a imageUrl si no hay image_urls
  document.body.style.overflow = 'hidden';
};

const closeProductModal = () => {
  selectedProduct.value = null;
  mainImageUrl.value = '';
  document.body.style.overflow = '';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const getStatusText = (status) => {
  switch (status) {
    case 'available': return 'Disponible';
    case 'rented': return 'Alquilado';
    case 'sold': return 'Vendido';
    default: return status;
  }
};

const getOfferTypeText = (type) => {
  switch (type) {
    case 'venta': return 'En Venta';
    case 'alquiler': return 'En Alquiler';
    case 'venta_alquiler': return 'Venta y Alquiler';
    default: return type;
  }
};

const getProductDisplayPrice = (product) => {
  const hasRental = product.offer_types && (product.offer_types.includes('alquiler') || product.offer_types.includes('venta_alquiler')) && product.rental_details && product.rental_details.price_per_day !== null;
  const hasSale = product.offer_types && (product.offer_types.includes('venta') || product.offer_types.includes('venta_alquiler')) && product.price !== null;

  let priceText = '';
  if (hasSale) {
    priceText += `S/ ${product.price.toFixed(2)}`;
  }
  if (hasRental) {
    if (priceText) priceText += ' o ';
    priceText += `S/ ${product.rental_details.price_per_day.toFixed(2)}/día`;
  }
  return priceText || 'N/A';
};

const getFullImageUrl = (relativePath) => {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath; 
  }
  return `${BASE_URL_BACKEND}${relativePath}`;
};

// Esta función ahora usa el composable para añadir a la lista de deseos
const handleAddToWishlist = (product) => {
  addToWishlist(product); // Llama a la función del composable para añadir el producto
  // Opcional: Puedes navegar a la lista de deseos o simplemente mostrar un mensaje de éxito.
  // router.push({ name: 'wishlist' }); // Si quieres navegar directamente a la wishlist
  closeProductModal(); // Cierra el modal después de añadir
  alert(`"${product.name}" añadido a tu lista de deseos!`); // Mensaje de confirmación
};
</script>

<style scoped>
/* Estilos base */
.input-select {
  @apply w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 cursor-pointer;
}

.input-select-icon {
  @apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500;
}

.input-text {
  @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200;
}

.button-primary {
  @apply px-5 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center;
}

.button-secondary {
  @apply px-5 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center;
}

.badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-4 text-white;
}

.badge-sm {
  @apply inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-4 text-white;
}

.pagination-button {
  @apply w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors duration-200;
}

/* Animaciones para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Animación de carga */
.animation-delay-150 {
  animation-delay: 0.15s;
}

/* Clamp para texto multilínea */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Scrollbar personalizado */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Efecto hover para las tarjetas */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Transiciones suaves */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

/* Efecto de zoom en imágenes */
.transform {
  transform: translateZ(0);
}

/* Mejoras de accesibilidad */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Estilos para el placeholder de imágenes */
.text-gray-300 {
  color: #e5e7eb;
}

/* Mejoras para el modal en móviles */
@media (max-width: 640px) {
  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
  }
}
</style>