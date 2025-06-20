<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        @click="toggleSidebar"
      ></div>
  
      <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <button
            @click="toggleSidebar"
            class="md:hidden flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            aria-label="Abrir menú"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
  
          <button
            @click="goToDashboard"
            class="hidden md:flex items-center text-gray-700 hover:text-pink-600 transition-colors duration-200 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 text-sm font-medium border border-gray-200 shadow-sm"
            aria-label="Volver al Panel de Vendedor"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Panel
          </button>
  
          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-900 hover:text-pink-700 transition-colors duration-200 group md:ml-0 ml-4"
          >
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8 rounded-full shadow-sm">
            <span class="text-xl font-extrabold">Vistete<span class="text-pink-600">YA</span></span>
          </router-link>
  
          <nav class="flex space-x-6">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-pink-700 transition-colors duration-200 py-2.5 px-4 rounded-full hover:bg-pink-50"
              aria-label="Ir a la página de inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
          </nav>
        </div>
      </header>
  
      <div>
        <aside
          :class="{
            'translate-x-0 ease-out': isSidebarOpen,
            '-translate-x-full ease-in': !isSidebarOpen,
            'md:translate-x-0': true // Siempre visible en MD+
          }"
          class="fixed inset-y-0 left-0 w-64 bg-white text-gray-700 p-4 transform transition-transform duration-200 z-30 md:flex md:flex-col shadow-md border-r border-gray-100"
          style="top: 4rem;"
        >
          <div class="flex items-center justify-between mb-2 mt-4 pl-1 pr-2">
            <span class="text-2xl font-extrabold text-pink-700">Vendedor Panel</span>
            <button
              @click="toggleSidebar"
              class="md:hidden text-gray-600 hover:text-pink-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-label="Cerrar menú"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <nav class="flex-1">
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-6 ml-4 block">Gestión Principal</span>
            <div class="space-y-2">
              <router-link
                to="/dashboard-vendedor"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-pink-100 text-pink-800 hover:bg-pink-200': $route.path === '/dashboard-vendedor', 'text-gray-700': $route.path !== '/dashboard-vendedor' }"
              >
                <svg class="h-5 w-5 mr-3" :class="{ 'text-pink-600': $route.path === '/dashboard-vendedor', 'text-gray-500': $route.path !== '/dashboard-vendedor' }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Panel Principal
              </router-link>
              <router-link
                to="/dashboard-vendedor/publicar-articulo"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-pink-100 text-pink-800 hover:bg-pink-200': $route.path === '/dashboard-vendedor/publicar-articulo', 'text-gray-700': $route.path !== '/dashboard-vendedor/publicar-articulo' }"
              >
                <svg class="h-5 w-5 mr-3" :class="{ 'text-pink-600': $route.path === '/dashboard-vendedor/publicar-articulo', 'text-gray-500': $route.path !== '/dashboard-vendedor/publicar-articulo' }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Publicar Nuevo Artículo
              </router-link>
            </div>
  
            <hr class="border-t border-gray-200 my-4">
  
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-4 ml-4 block">Tus Productos</span>
            <div class="space-y-2">
              <router-link
                to="/dashboard-vendedor/mis-articulos"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-pink-100 text-pink-800 hover:bg-pink-200': $route.path === '/dashboard-vendedor/mis-articulos', 'text-gray-700': $route.path !== '/dashboard-vendedor/mis-articulos' }"
              >
                <svg class="h-5 w-5 mr-3" :class="{ 'text-pink-600': $route.path === '/dashboard-vendedor/mis-articulos', 'text-gray-500': $route.path !== '/dashboard-vendedor/mis-articulos' }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Mis Artículos
              </router-link>
              <router-link
                to="/dashboard-vendedor/pedidos"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-pink-100 text-pink-800 hover:bg-pink-200': $route.path === '/dashboard-vendedor/pedidos', 'text-gray-700': $route.path !== '/dashboard-vendedor/pedidos' }"
              >
                <svg class="h-5 w-5 mr-3" :class="{ 'text-pink-600': $route.path === '/dashboard-vendedor/pedidos', 'text-gray-500': $route.path !== '/dashboard-vendedor/pedidos' }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 12l-2 2-2-2" /></svg>
                Pedidos
              </router-link>
            </div>
  
            <hr class="border-t border-gray-200 my-4">
  
            <span class="text-xs font-semibold uppercase text-gray-400 mb-2 mt-4 ml-4 block">Configuración</span>
            <div class="space-y-2">
              <router-link
                to="/dashboard-vendedor/configuracion"
                class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-pink-100 text-pink-800 hover:bg-pink-200': $route.path === '/dashboard-vendedor/configuracion', 'text-gray-700': $route.path !== '/dashboard-vendedor/configuracion' }"
              >
                <svg class="h-5 w-5 mr-3" :class="{ 'text-pink-600': $route.path === '/dashboard-vendedor/configuracion', 'text-gray-500': $route.path !== '/dashboard-vendedor/configuracion' }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Configuración
              </router-link>
            </div>
          </nav>
        </aside>
  
        <main class="flex-1 p-4 md:p-8 overflow-y-auto pt-16 md:ml-64">
          <div class="container mx-auto px-6 py-10 max-w-4xl bg-white rounded-3xl shadow-2xl">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center">Publicar Nuevo Artículo</h1>
  
            <form @submit.prevent="submitProduct" class="space-y-10">
  
              <section class="border-b border-gray-200 pb-10">
                <h2 class="text-2xl font-extrabold text-gray-800 mb-6 flex items-center">
                  <svg class="h-8 w-8 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  1. Detalles Generales
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nombre del Artículo <span class="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      v-model="product.name"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                      placeholder="Ej: Vestido de Gala 'Noche Estrellada'"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>
  
                  <div>
                    <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Categoría <span class="text-red-500">*</span></label>
                    <select
                      id="category"
                      v-model="product.category"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base appearance-none bg-white pr-8"
                    >
                      <option value="" disabled>Selecciona una categoría</option>
                      <option v-for="cat in availableCategories" :key="cat.value" :value="cat.value">{{ cat.name }}</option>
                    </select>
                    <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
                  </div>
  
                  <div class="md:col-span-2">
                    <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Descripción Detallada <span class="text-red-500">*</span></label>
                    <textarea
                      id="description"
                      v-model="product.description"
                      rows="6"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                      placeholder="Describe el artículo: material, estilo, ocasión, estado, etc."
                    ></textarea>
                    <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
                  </div>
                </div>
              </section>
  
              <section class="border-b border-gray-200 pb-10">
                <h2 class="text-2xl font-extrabold text-gray-800 mb-6 flex items-center">
                  <svg class="h-8 w-8 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2V5a2 2 0 00-2-2h-2.343a2 2 0 01-1.664-.89l-2.828-3.181A2 2 0 006.004 0H4a2 2 0 00-2 2v10l8 8h12z" /></svg>
                  2. Selecciona Tipo de Oferta
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <label class="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                         :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('venta')}">
                    <input type="checkbox" v-model="product.offerTypes" value="venta" class="form-checkbox text-pink-600 h-5 w-5 focus:ring-pink-500" />
                    <span class="ml-4 text-base font-medium text-gray-900">Vender</span>
                  </label>
                  <label class="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                         :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('alquiler')}">
                    <input type="checkbox" v-model="product.offerTypes" value="alquiler" class="form-checkbox text-pink-600 h-5 w-5 focus:ring-pink-500" />
                    <span class="ml-4 text-base font-medium text-gray-900">Alquilar</span>
                  </label>
                  <label class="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-all duration-200 shadow-md"
                         :class="{'bg-pink-50 border-pink-600': product.offerTypes.includes('ambos')}">
                    <input type="checkbox" v-model="product.offerTypes" value="ambos" class="form-checkbox text-pink-600 h-5 w-5 focus:ring-pink-500" />
                    <span class="ml-4 text-base font-medium text-gray-900">Ambas Opciones</span>
                  </label>
                </div>
                <p v-if="errors.offerTypes" class="mt-2 text-sm text-red-600">{{ errors.offerTypes }}</p>
  
                <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div v-if="product.offerTypes.includes('venta') || product.offerTypes.includes('ambos')">
                    <label for="price" class="block text-sm font-semibold text-gray-700 mb-2">Precio de Venta (Soles S/) <span class="text-red-500">*</span></label>
                    <input
                      type="number"
                      id="price"
                      v-model.number="product.price"
                      min="0.01"
                      step="0.01"
                      :required="product.offerTypes.includes('venta') || product.offerTypes.includes('ambos')"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                      placeholder="Ej: 150.00"
                    />
                    <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
                  </div>
  
                  <div v-if="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')" class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label for="rentalPrice" class="block text-sm font-semibold text-gray-700 mb-2">Precio Alquiler/Día (Soles S/) <span class="text-red-500">*</span></label>
                        <input
                          type="number"
                          id="rentalPrice"
                          v-model.number="product.rentalDetails.pricePerDay"
                          min="0.01"
                          step="0.01"
                          :required="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')"
                          class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: 30.00"
                        />
                        <p v-if="errors.pricePerDay" class="mt-1 text-sm text-red-600">{{ errors.pricePerDay }}</p>
                      </div>
                      <div>
                        <label for="minDays" class="block text-sm font-semibold text-gray-700 mb-2">Mín. Días Alquiler <span class="text-red-500">*</span></label>
                        <input
                          type="number"
                          id="minDays"
                          v-model.number="product.rentalDetails.minDays"
                          min="1"
                          :required="product.offerTypes.includes('alquiler') || product.offerTypes.includes('ambos')"
                          class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: 3"
                        />
                        <p v-if="errors.minDays" class="mt-1 text-sm text-red-600">{{ errors.minDays }}</p>
                      </div>
                      <div>
                        <label for="maxDays" class="block text-sm font-semibold text-gray-700 mb-2">Máx. Días Alquiler (Opcional)</label>
                        <input
                          type="number"
                          id="maxDays"
                          v-model.number="product.rentalDetails.maxDays"
                          :min="product.rentalDetails.minDays || 1"
                          class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: 30"
                        />
                        <p v-if="errors.maxDays" class="mt-1 text-sm text-red-600">{{ errors.maxDays }}</p>
                      </div>
                  </div>
                </div>
              </section>
  
              <section class="border-b border-gray-200 pb-10">
                <h2 class="text-2xl font-extrabold text-gray-800 mb-6 flex items-center">
                  <svg class="h-8 w-8 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21v-3m0 0V5a2 2 0 012-2h4a2 2 0 012 2v13m-6 0H4a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2v-1m-6 0H4" /></svg>
                  3. Variaciones del Artículo
                </h2>
                <p class="text-base text-gray-600 mb-6">Define las tallas, colores y el stock disponible para cada combinación. Mínimo una variación es requerida.</p>
  
                <div class="space-y-6">
                  <div v-for="(variation, index) in product.variations" :key="index" class="relative bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-800 mb-5">Variación #{{ index + 1 }}</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label :for="'size-' + index" class="block text-sm font-medium text-gray-700 mb-1">Talla <span class="text-red-500">*</span></label>
                        <input
                          type="text"
                          :id="'size-' + index"
                          v-model="variation.size"
                          required
                          class="block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: M, L, 38"
                        />
                        <p v-if="errors[`variations[${index}].size`]" class="mt-1 text-sm text-red-600">{{ errors[`variations[${index}].size`] }}</p>
                      </div>
                      <div>
                        <label :for="'color-' + index" class="block text-sm font-medium text-gray-700 mb-1">Color <span class="text-red-500">*</span></label>
                        <input
                          type="text"
                          :id="'color-' + index"
                          v-model="variation.color"
                          required
                          class="block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: Rojo, Azul Marino"
                        />
                        <p v-if="errors[`variations[${index}].color`]" class="mt-1 text-sm text-red-600">{{ errors[`variations[${index}].color`] }}</p>
                      </div>
                      <div>
                        <label :for="'stock-' + index" class="block text-sm font-medium text-gray-700 mb-1">Stock <span class="text-red-500">*</span></label>
                        <input
                          type="number"
                          :id="'stock-' + index"
                          v-model.number="variation.stock"
                          min="0"
                          required
                          class="block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-base"
                          placeholder="Ej: 5"
                        />
                        <p v-if="errors[`variations[${index}].stock`]" class="mt-1 text-sm text-red-600">{{ errors[`variations[${index}].stock`] }}</p>
                      </div>
                    </div>
                    <button
                      v-if="product.variations.length > 1"
                      type="button"
                      @click="removeVariation(index)"
                      class="absolute top-4 right-4 p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200"
                      aria-label="Eliminar variación"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  @click="addVariation"
                  class="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg transition-all duration-200"
                >
                  <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Añadir Otra Variación
                </button>
              </section>
  
              <section class="border-b border-gray-200 pb-10">
                <h2 class="text-2xl font-extrabold text-gray-800 mb-6 flex items-center">
                  <svg class="h-8 w-8 mr-3 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  4. Imágenes del Artículo
                </h2>
                <p class="text-base text-gray-600 mb-6">Sube al menos <span class="font-bold text-pink-600">3 imágenes</span> de alta calidad para mostrar tu artículo.</p>
  
                <div
                  class="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-pink-500 transition-colors duration-200"
                  @click="triggerFileInput"
                  @dragover.prevent="handleDragOver"
                  @dragleave.prevent="handleDragLeave"
                  @drop.prevent="handleDrop"
                  :class="{'border-pink-500 bg-pink-50': isDragging}"
                >
                  <input type="file" id="images" multiple accept="image/*" @change="handleImageUpload" class="sr-only" ref="fileInputRef" />
                  <div class="text-center">
                    <svg class="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="mt-3 text-lg text-gray-600">
                      <span class="font-semibold text-pink-600">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p class="text-sm text-gray-500 mt-1">PNG, JPG, GIF hasta 5MB por imagen</p>
                  </div>
                </div>
                <p v-if="errors.images" class="mt-2 text-sm text-red-600">{{ errors.images }}</p>
  
                <div v-if="product.images.length" class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                  <div v-for="(image, index) in product.images" :key="index" class="relative group aspect-w-1 aspect-h-1">
                    <img :src="image.preview" class="w-full h-full object-cover rounded-xl border border-gray-200 shadow-md" :alt="`Imagen ${index + 1}`" />
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="absolute top-2 right-2 bg-red-700 text-white rounded-full p-2 text-xs opacity-90 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center shadow-lg"
                      aria-label="Eliminar imagen"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              </section>
  
              <div class="mt-10">
                <p v-if="submissionStatus === 'loading'" class="mt-4 text-center text-blue-600 flex items-center justify-center gap-3 text-lg">
                  <svg class="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando tu artículo, por favor espera...
                </p>
                <p v-if="submissionStatus === 'success'" class="mt-4 text-center text-green-600 font-semibold flex items-center justify-center gap-3 text-lg">
                  <svg class="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ¡Artículo añadido con éxito! Redirigiendo a tus artículos.
                </p>
                <p v-if="submissionStatus === 'error'" class="mt-4 text-center text-red-600 font-semibold flex items-center justify-center gap-3 text-lg">
                  <svg class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Error al añadir el artículo. Por favor, revisa los campos e intenta de nuevo.
                </p>
                <ul v-if="Object.keys(errors).length > 0 && submissionStatus === 'error'" class="mt-4 text-sm text-red-600 list-disc list-inside">
                  <li v-for="(errorMsg, key) in errors" :key="key">{{ errorMsg }}</li>
                </ul>
              </div>
  
  
              <div class="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                <button
                  type="submit"
                  :disabled="submissionStatus === 'loading'"
                  class="inline-flex items-center px-10 py-4 border border-transparent text-xl font-bold rounded-full shadow-xl text-white bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                >
                  <svg class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Publicar Artículo
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  
  const product = ref({
    name: '',
    description: '',
    category: '',
    offerTypes: [],
    price: null,
    rentalDetails: {
      pricePerDay: null,
      minDays: 1,
      maxDays: null,
    },
    images: [],
    variations: [{ size: '', color: '', stock: null }],
    sellerId: localStorage.getItem('user_id'),
  });
  
  const availableCategories = ref([
    { name: 'Vestidos', value: 'vestidos' },
    { name: 'Trajes', value: 'trajes' },
    { name: 'Disfraces', value: 'disfraces' },
    { name: 'Zapatos', value: 'zapatos' },
    { name: 'Accesorios', value: 'accesorios' },
  ]);
  
  const submissionStatus = ref(null);
  const errors = ref({});
  const fileInputRef = ref(null);
  const isDragging = ref(false);
  const isSidebarOpen = ref(false);
  
  watch(() => product.value.offerTypes, (newVal) => {
    if (!newVal.includes('venta') && !newVal.includes('ambos')) {
      product.value.price = null;
    }
    if (!newVal.includes('alquiler') && !newVal.includes('ambos')) {
      product.value.rentalDetails = { pricePerDay: null, minDays: 1, maxDays: null };
    }
  }, { deep: true });
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  const triggerFileInput = () => {
    fileInputRef.value.click();
  };
  
  const handleDragOver = () => {
    isDragging.value = true;
  };
  
  const handleDragLeave = () => {
    isDragging.value = false;
  };
  
  const handleDrop = (event) => {
    isDragging.value = false;
    handleFiles(event.dataTransfer.files);
  };
  
  const handleImageUpload = (event) => {
    handleFiles(event.target.files);
    event.target.value = '';
  };
  
  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    errors.value.images = '';
  
    if (product.value.images.length + newFiles.length > 10) {
      errors.value.images = 'No puedes subir más de 10 imágenes en total.';
      return;
    }
  
    newFiles.forEach(file => {
      if (!file.type.startsWith('image/')) {
        errors.value.images = 'Solo se permiten archivos de imagen (PNG, JPG, GIF).';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        errors.value.images = `La imagen "${file.name}" excede el tamaño máximo (5MB).`;
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (e) => {
        product.value.images.push({ file: file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    product.value.images.splice(index, 1);
  };
  
  const addVariation = () => {
    product.value.variations.push({ size: '', color: '', stock: null });
  };
  
  const removeVariation = (index) => {
    if (product.value.variations.length > 1) {
      alert('Debe haber al menos una variación para el producto.');
    } else {
      // Si solo queda una variación, no la eliminamos pero podemos limpiarla
      product.value.variations[index] = { size: '', color: '', stock: null };
      // Opcional: mostrar un mensaje al usuario
      // alert('No puedes eliminar la última variación. Puedes limpiar sus campos en su lugar.');
    }
  };
  
  const validateForm = () => {
    errors.value = {};
  
    if (!product.value.name) errors.value.name = 'El nombre del artículo es obligatorio.';
    if (!product.value.category) errors.value.category = 'Debes seleccionar una categoría.';
    if (!product.value.description) errors.value.description = 'La descripción es obligatoria.';
  
    if (product.value.offerTypes.length === 0) {
      errors.value.offerTypes = 'Debes seleccionar al menos una opción de oferta (Vender, Alquilar o Ambas).';
    } else {
      const isSelling = product.value.offerTypes.includes('venta') || product.value.offerTypes.includes('ambos');
      const isRenting = product.value.offerTypes.includes('alquiler') || product.value.offerTypes.includes('ambos');
  
      if (isSelling && (product.value.price === null || product.value.price <= 0)) {
        errors.value.price = 'Ingresa un precio de venta válido (mayor a 0).';
      }
  
      if (isRenting) {
        if (product.value.rentalDetails.pricePerDay === null || product.value.rentalDetails.pricePerDay <= 0) {
          errors.value.pricePerDay = 'Ingresa un precio de alquiler por día válido (mayor a 0).';
        }
        if (product.value.rentalDetails.minDays === null || product.value.rentalDetails.minDays <= 0) {
          errors.value.minDays = 'Ingresa un mínimo de días de alquiler válido (mayor a 0).';
        }
        if (product.value.rentalDetails.maxDays !== null && product.value.rentalDetails.maxDays < product.value.rentalDetails.minDays) {
          errors.value.maxDays = 'El máximo de días no puede ser menor que el mínimo de días.';
        }
      }
    }
  
    if (product.value.variations.length === 0) {
      errors.value.variations = 'Debes añadir al menos una variación (talla, color, stock).';
    } else {
      product.value.variations.forEach((variation, index) => {
        if (!variation.size) errors.value[`variations[${index}].size`] = 'La talla es obligatoria.';
        if (!variation.color) errors.value[`variations[${index}].color`] = 'El color es obligatorio.';
        if (variation.stock === null || variation.stock < 0) errors.value[`variations[${index}].stock`] = 'El stock es obligatorio y debe ser 0 o mayor.';
      });
    }
  
    if (product.value.images.length < 3) {
      errors.value.images = `Debes subir al menos 3 imágenes del producto. Actualmente tienes ${product.value.images.length}.`;
    }
  
    return Object.keys(errors.value).length === 0;
  };
  
  
  const submitProduct = async () => {
    submissionStatus.value = null;
  
    if (!validateForm()) {
      submissionStatus.value = 'error';
      return;
    }
  
    submissionStatus.value = 'loading';
  
    const formData = new FormData();
  
    formData.append('name', product.value.name);
    formData.append('description', product.value.description);
    formData.append('category', product.value.category);
    formData.append('sellerId', product.value.sellerId);
  
    product.value.offerTypes.forEach(type => {
      formData.append('offerTypes[]', type);
    });
  
    if (product.value.offerTypes.includes('venta') || product.value.offerTypes.includes('ambos')) {
      formData.append('price', product.value.price);
    }
  
    if (product.value.offerTypes.includes('alquiler') || product.value.offerTypes.includes('ambos')) {
      formData.append('rentalDetails[pricePerDay]', product.value.rentalDetails.pricePerDay);
      formData.append('rentalDetails[minDays]', product.value.rentalDetails.minDays);
      if (product.value.rentalDetails.maxDays !== null) {
        formData.append('rentalDetails[maxDays]', product.value.rentalDetails.maxDays);
      }
    }
  
    formData.append('variations', JSON.stringify(product.value.variations));
  
    product.value.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error desconocido al guardar el producto.');
      }
  
      const responseData = await response.json();
      console.log('Producto guardado:', responseData);
      submissionStatus.value = 'success';
      setTimeout(() => {
          router.push('/dashboard-vendedor/mis-articulos'); // Redirige a mis artículos después de 2 segundos
      }, 2000); // 2 segundos de espera
  
    } catch (error) {
      console.error('Error al enviar producto:', error);
      errors.value.submission = error.message;
      submissionStatus.value = 'error';
    }
  };
  
  const resetForm = () => {
    product.value = {
      name: '',
      description: '',
      category: '',
      offerTypes: [],
      price: null,
      rentalDetails: {
        pricePerDay: null,
        minDays: 1,
        maxDays: null,
      },
      images: [],
      variations: [{ size: '', color: '', stock: null }],
      sellerId: localStorage.getItem('user_id'),
    };
    submissionStatus.value = null;
    errors.value = {};
  };
  
  const goToDashboard = () => {
    router.push('/dashboard-vendedor');
  };
  </script>
  
  <style scoped>
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.5em 1.5em;
  }
  
  .aspect-w-1 {
    position: relative;
    padding-bottom: 100%;
  }
  
  .aspect-h-1 {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  </style>