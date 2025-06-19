<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 font-sans">
    <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            @click="prevStep"
            class="flex items-center text-gray-600 hover:text-pink-700 transition-colors duration-200 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
            :class="{'opacity-50 cursor-not-allowed': currentStep === 1}"
            :disabled="currentStep === 1"
            aria-label="Volver al paso anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Atrás
          </button>

          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition-colors duration-200 group"
          >
            <img src="@/assets/imagenes/visteteya.jpeg" alt="VisteteYA Logo" class="h-8 w-8">
            <span class="text-2xl font-bold">Vistete<span class="text-pink-600">YA</span></span>
          </router-link>

          <nav class="flex space-x-6">
            <router-link
              to="/"
              class="inline-flex items-center text-sm font-medium text-gray-600 hover:text-pink-700 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-pink-50"
              aria-label="Ir a la página de inicio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-2xl">
        <div class="flex flex-col sm:flex-row justify-end items-center mb-8 gap-4">
          <div class="flex items-center space-x-3 bg-white py-2 px-4 rounded-full shadow-md border border-gray-100">
            <span class="text-sm font-semibold text-gray-700">Paso {{ currentStep }} de {{ totalSteps }}</span>
            <div class="w-40 bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div class="bg-pink-600 h-2.5 rounded-full transition-all duration-500 ease-out" :style="`width: ${progress}%`"></div>
            </div>
          </div>
        </div>

        <div
          v-if="currentStep === 1"
          class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-pink-100 transform transition-transform duration-300 hover:scale-[1.005]"
        >
          <div class="p-8 sm:p-10">
            <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-3">Crea tu cuenta</h2>
            <p class="text-base text-center text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
              Comienza tu experiencia en VisteteYA seleccionando el tipo de cuenta que mejor se adapta a ti.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
              <button
                @click="selectUserType('customer')"
                :class="{'ring-3 ring-pink-500 bg-pink-50 border-pink-300 shadow-lg': userType === 'customer', 'border-gray-200 hover:border-pink-300 hover:shadow-md': userType !== 'customer'}"
                class="border-2 rounded-2xl p-7 text-center transition-all duration-300 transform hover:-translate-y-1 relative group"
                aria-label="Seleccionar tipo de cuenta: Cliente"
              >
                <div class="flex flex-col items-center">
                  <div class="bg-pink-100 rounded-full p-5 mb-5 transition-all duration-300 group-hover:scale-110">
                    <svg class="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Soy Cliente</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Comprar productos, guardar favoritos y gestionar tus pedidos de forma sencilla.
                  </p>
                </div>
                <div v-if="userType === 'customer'" class="absolute top-3 right-3 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </button>

              <button
                @click="selectUserType('seller')"
                :class="{'ring-3 ring-pink-500 bg-pink-50 border-pink-300 shadow-lg': userType === 'seller', 'border-gray-200 hover:border-pink-300 hover:shadow-md': userType !== 'seller'}"
                class="border-2 rounded-2xl p-7 text-center transition-all duration-300 transform hover:-translate-y-1 relative group"
                aria-label="Seleccionar tipo de cuenta: Vendedor"
              >
                <div class="flex flex-col items-center">
                  <div class="bg-pink-100 rounded-full p-5 mb-5 transition-all duration-300 group-hover:scale-110">
                    <svg class="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Soy Vendedor</h3>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Vender tus productos, gestionar tu tienda y expandir tu negocio.
                  </p>
                </div>
                <div v-if="userType === 'seller'" class="absolute top-3 right-3 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>

            <div class="mt-10 pt-8 border-t border-gray-100">
              <p class="text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-pink-600 font-semibold hover:text-pink-700 hover:underline transition-colors duration-200">Inicia sesión aquí</router-link>
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="(userType === 'customer' || userType === 'seller') && currentStep > 1"
          class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-pink-100 animate-fade-in-up"
        >
          <div class="p-8 sm:p-10">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
                {{ userType === 'customer' ? 'Registro de Cliente' : 'Registro de Vendedor' }}
              </h2>
              <p class="text-base text-gray-600">Paso {{ currentStep - 1 }} de {{ totalSteps - 1 }} - <span class="font-medium text-pink-700">{{ stepTitles[userType][currentStep-2] }}</span></p>
            </div>

            <form class="space-y-7" @submit.prevent="userType === 'customer' ? handleCustomerRegister() : handleSellerRegister()">
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5">Nombre(s) <span class="text-red-500">*</span></label>
                    <input
                      id="firstName"
                      v-model="customerForm.firstName"
                      v-if="userType === 'customer'"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: María"
                      aria-required="true"
                    >
                    <input
                      id="sellerFirstName"
                      v-model="sellerForm.firstName"
                      v-if="userType === 'seller'"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: Juan"
                      aria-required="true"
                    >
                  </div>

                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1.5">Apellidos <span class="text-red-500">*</span></label>
                    <input
                      id="lastName"
                      v-model="customerForm.lastName"
                      v-if="userType === 'customer'"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: Pérez Gómez"
                      aria-required="true"
                    >
                    <input
                      id="sellerLastName"
                      v-model="sellerForm.lastName"
                      v-if="userType === 'seller'"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: Rodríguez López"
                      aria-required="true"
                    >
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico <span class="text-red-500">*</span></label>
                  <input
                    id="email"
                    v-model="customerForm.email"
                    v-if="userType === 'customer'"
                    type="email"
                    required
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                    placeholder="tucorreo@ejemplo.com"
                    aria-required="true"
                  >
                  <input
                    id="sellerEmail"
                    v-model="sellerForm.email"
                    v-if="userType === 'seller'"
                    type="email"
                    required
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                    placeholder="tucorreo@ejemplo.com"
                    aria-required="true"
                  >
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">Contraseña <span class="text-red-500">*</span></label>
                    <input
                      id="password"
                      v-model="customerForm.password"
                      v-if="userType === 'customer'"
                      type="password"
                      required
                      minlength="8"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Mínimo 8 caracteres"
                      aria-required="true"
                    >
                    <input
                      id="sellerPassword"
                      v-model="sellerForm.password"
                      v-if="userType === 'seller'"
                      type="password"
                      required
                      minlength="8"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Mínimo 8 caracteres"
                      aria-required="true"
                    >
                  </div>

                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1.5">Confirmar contraseña <span class="text-red-500">*</span></label>
                    <input
                      id="confirmPassword"
                      v-model="customerForm.confirmPassword"
                      v-if="userType === 'customer'"
                      type="password"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Repite tu contraseña"
                      aria-required="true"
                    >
                    <input
                      id="sellerConfirmPassword"
                      v-model="sellerForm.confirmPassword"
                      v-if="userType === 'seller'"
                      type="password"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Repite tu contraseña"
                      aria-required="true"
                    >
                  </div>
                </div>

                <div v-if="userType === 'seller'">
                  <label for="sellerPhone" class="block text-sm font-medium text-gray-700 mb-1.5">Teléfono <span class="text-red-500">*</span></label>
                  <input
                    id="sellerPhone"
                    v-model="sellerForm.phone"
                    type="tel"
                    required
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                    placeholder="Ej: 987654321"
                    aria-required="true"
                  >
                </div>
              </div>

              <div v-if="currentStep === 3" class="space-y-6">
                <template v-if="userType === 'customer'">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1.5">Teléfono <span class="text-red-500">*</span></label>
                      <input
                        id="phone"
                        v-model="customerForm.phone"
                        type="tel"
                        required
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                        placeholder="Ej: 987654321"
                        aria-required="true"
                      >
                    </div>

                    <div>
                      <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-1.5">Fecha de nacimiento</label>
                      <input
                        id="birthDate"
                        v-model="customerForm.birthDate"
                        type="date"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                        aria-label="Fecha de nacimiento"
                      >
                    </div>
                  </div>

                  <div>
                    <label for="address" class="block text-sm font-medium text-gray-700 mb-1.5">Dirección</label>
                    <input
                      id="address"
                      v-model="customerForm.address"
                      type="text"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: Av. Principal 123"
                      aria-label="Dirección de residencia"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2.5">Preferencias de compra</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div v-for="preference in preferences" :key="preference" class="flex items-center">
                        <input
                          :id="`preference-${preference}`"
                          v-model="customerForm.preferences"
                          type="checkbox"
                          :value="preference"
                          class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          :aria-label="`Preferencia: ${preference}`"
                        >
                        <label :for="`preference-${preference}`" class="ml-2 text-sm text-gray-700 cursor-pointer">{{ preference }}</label>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else-if="userType === 'seller'">
                  <div>
                    <label for="storeName" class="block text-sm font-medium text-gray-700 mb-1.5">Nombre de tu tienda <span class="text-red-500">*</span></label>
                    <input
                      id="storeName"
                      v-model="sellerForm.storeName"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: Moda Elegante Boutique"
                      aria-required="true"
                    >
                  </div>

                  <div>
                    <label for="storeDescription" class="block text-sm font-medium text-gray-700 mb-1.5">Descripción de la tienda</label>
                    <textarea
                      id="storeDescription"
                      v-model="sellerForm.storeDescription"
                      rows="3"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200 resize-y"
                      placeholder="Describe los productos que ofreces, tu estilo, etc."
                      aria-label="Descripción de la tienda"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2.5">Categorías de productos</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div v-for="category in productCategories" :key="category" class="flex items-center">
                        <input
                          :id="`category-${category}`"
                          v-model="sellerForm.productCategories"
                          type="checkbox"
                          :value="category"
                          class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          :aria-label="`Categoría: ${category}`"
                        >
                        <label :for="`category-${category}`" class="ml-2 text-sm text-gray-700 cursor-pointer">{{ category }}</label>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div v-if="currentStep === 4 && userType === 'seller'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="idNumber" class="block text-sm font-medium text-gray-700 mb-1.5">DNI o RUC <span class="text-red-500">*</span></label>
                    <input
                      id="idNumber"
                      v-model="sellerForm.idNumber"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: 87654321"
                      aria-required="true"
                    >
                  </div>

                  <div>
                    <label for="bankName" class="block text-sm font-medium text-gray-700 mb-1.5">Banco <span class="text-red-500">*</span></label>
                    <select
                      id="bankName"
                      v-model="sellerForm.bankName"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200 bg-white"
                      aria-required="true"
                    >
                      <option value="" disabled>Selecciona tu banco</option>
                      <option v-for="bank in banks" :key="bank" :value="bank">{{ bank }}</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="accountNumber" class="block text-sm font-medium text-gray-700 mb-1.5">Número de cuenta <span class="text-red-500">*</span></label>
                    <input
                      id="accountNumber"
                      v-model="sellerForm.accountNumber"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200"
                      placeholder="Ej: 193-45678901-0-78"
                      aria-required="true"
                    >
                  </div>

                  <div>
                    <label for="accountType" class="block text-sm font-medium text-gray-700 mb-1.5">Tipo de cuenta <span class="text-red-500">*</span></label>
                    <select
                      id="accountType"
                      v-model="sellerForm.accountType"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-base transition-colors duration-200 bg-white"
                      aria-required="true"
                    >
                      <option value="" disabled>Selecciona tipo</option>
                      <option value="savings">Ahorros</option>
                      <option value="checking">Corriente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3.5">Documentos requeridos <span class="text-red-500">*</span></label>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FileUpload
                        label="DNI/RUC (Frente)"
                        :required="true"
                        @file-changed="(file) => sellerForm.idFront = file"
                        :initial-file="sellerForm.idFront"
                      />
                      <FileUpload
                        label="DNI/RUC (Reverso)"
                        :required="true"
                        @file-changed="(file) => sellerForm.idBack = file"
                        :initial-file="sellerForm.idBack"
                      />
                    </div>

                    <FileUpload
                      label="Selfie con DNI/RUC"
                      :required="true"
                      @file-changed="(file) => sellerForm.selfieWithId = file"
                      :initial-file="sellerForm.selfieWithId"
                    />
                  </div>
                </div>
              </div>

              <div class="flex items-start pt-4 border-t border-gray-100">
                <div class="flex items-center h-5">
                  <input
                    id="customerTerms"
                    v-model="customerForm.acceptedTerms"
                    v-if="userType === 'customer'"
                    type="checkbox"
                    required
                    class="focus:ring-pink-500 h-5 w-5 text-pink-600 border-gray-300 rounded"
                    aria-required="true"
                  >
                  <input
                    id="sellerTerms"
                    v-model="sellerForm.acceptedTerms"
                    v-if="userType === 'seller'"
                    type="checkbox"
                    required
                    class="focus:ring-pink-500 h-5 w-5 text-pink-600 border-gray-300 rounded"
                    aria-required="true"
                  >
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label :for="userType === 'customer' ? 'customerTerms' : 'sellerTerms'" class="font-medium text-gray-700 cursor-pointer">
                    Acepto los
                    <router-link to="/terms" class="text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200" target="_blank">Términos y condiciones</router-link>
                    y la
                    <router-link to="/privacy" class="text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200" target="_blank">Política de privacidad</router-link>.
                  </label>
                </div>
              </div>

              <div v-if="formError" class="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-center text-sm animate-fade-in-down" role="alert">
                {{ formError }}
              </div>

              <div class="pt-6">
                <button
                  type="submit"
                  :disabled="loading"
                  v-if="currentStep === totalSteps"
                  class="w-full flex justify-center py-3.5 px-6 border border-transparent shadow-lg text-lg font-semibold rounded-lg text-white bg-pink-600 hover:bg-pink-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300
                         transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-md"
                  :aria-busy="loading ? 'true' : 'false'"
                  aria-live="polite"
                >
                  <span v-if="!loading">Completar registro</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registrando...
                  </span>
                </button>
                <button
                  type="button"
                  :disabled="loading"
                  v-else
                  @click="validateAndNextStep()"
                  class="w-full flex justify-center py-3.5 px-6 border border-transparent shadow-lg text-lg font-semibold rounded-lg text-white bg-pink-600 hover:bg-pink-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300
                         transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-md"
                  :aria-busy="loading ? 'true' : 'false'"
                  aria-live="polite"
                >
                  <span v-if="!loading">Continuar</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validando...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// Asume que FileUpload está en '@/components/FileUpload.vue'
import FileUpload from '@/components/FileUpload.vue';

const router = useRouter();

// --- Estados Reactivos ---
const userType = ref(null); // 'customer' o 'seller'
const currentStep = ref(1);
const loading = ref(false); // Para el estado de carga de los botones
const formError = ref(null); // Para mostrar errores de validación en la UI

// --- Títulos de los Pasos ---
const stepTitles = {
  customer: ['Información Personal', 'Preferencias y Contacto'],
  seller: ['Información Personal', 'Datos de la Tienda', 'Verificación y Pagos']
};

// --- Cálculos Computados ---
const totalSteps = computed(() => userType.value === 'seller' ? 4 : 3);
const progress = computed(() => (currentStep.value / totalSteps.value) * 100);

// --- Datos del Formulario para Clientes ---
const customerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthDate: '',
  address: '',
  preferences: [],
  acceptedTerms: false
});

// --- Datos del Formulario para Vendedores ---
const sellerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  storeName: '',
  storeDescription: '',
  productCategories: [],
  idNumber: '',
  bankName: '',
  accountNumber: '',
  accountType: '',
  idFront: null, // Guardará el objeto File
  idBack: null,  // Guardará el objeto File
  selfieWithId: null, // Guardará el objeto File
  acceptedTerms: false
});

// --- Opciones para Selects y Checkboxes ---
const preferences = [
  'Ropa de mujer', 'Ropa de hombre', 'Accesorios', 'Calzado',
  'Electrónica', 'Hogar', 'Belleza', 'Deportes', 'Juguetes', 'Libros'
];

const productCategories = [
  'Ropa de mujer', 'Ropa de hombre', 'Accesorios', 'Zapatos', 'Bolsos',
  'Joyería', 'Ropa infantil', 'Deportes', 'Trajes de baño', 'Ropa formal'
];

const banks = [
  'BCP', 'BBVA', 'Interbank', 'Scotiabank', 'Banco de la Nación',
  'Banco Pichincha', 'MiBanco', 'Banco GNB', 'Banco Falabella', 'Banco Ripley'
];

// --- Métodos de Navegación y Lógica del Formulario ---

const selectUserType = (type) => {
  userType.value = type;
  formError.value = null; // Limpiar errores al cambiar de tipo
  nextStep();
};

const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
    formError.value = null; // Limpiar errores al avanzar de paso
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    formError.value = null; // Limpiar errores al retroceder
    // Si retrocedes al paso 1, resetea userType para volver a la selección
    if (currentStep.value === 1) {
      userType.value = null;
    }
  }
};

// Función para validar el paso actual antes de avanzar
const validateAndNextStep = () => {
  formError.value = null; // Resetear error
  let isValid = true;
  const currentFormData = userType.value === 'customer' ? customerForm.value : sellerForm.value;

  if (userType.value === 'customer') {
    if (currentStep.value === 2) {
      if (!currentFormData.firstName || !currentFormData.lastName || !currentFormData.email || !currentFormData.password || !currentFormData.confirmPassword) {
        isValid = false;
        formError.value = 'Por favor, completa todos los campos obligatorios del Paso 1 (Cliente).';
      } else if (currentFormData.password !== currentFormData.confirmPassword) {
        isValid = false;
        formError.value = 'Las contraseñas no coinciden.';
      } else if (currentFormData.password.length < 8) {
        isValid = false;
        formError.value = 'La contraseña debe tener al menos 8 caracteres.';
      }
    } else if (currentStep.value === 3) {
      if (!currentFormData.phone) {
        isValid = false;
        formError.value = 'Por favor, ingresa tu número de teléfono (Paso 2 Cliente).';
      }
      if (!currentFormData.acceptedTerms) {
        isValid = false;
        formError.value = 'Debes aceptar los Términos y Condiciones y la Política de Privacidad para continuar.';
      }
    }
  } else if (userType.value === 'seller') {
    if (currentStep.value === 2) {
      if (!currentFormData.firstName || !currentFormData.lastName || !currentFormData.email || !currentFormData.phone || !currentFormData.password || !currentFormData.confirmPassword) {
        isValid = false;
        formError.value = 'Por favor, completa todos los campos obligatorios del Paso 1 (Vendedor).';
      } else if (currentFormData.password !== currentFormData.confirmPassword) {
        isValid = false;
        formError.value = 'Las contraseñas no coinciden.';
      } else if (currentFormData.password.length < 8) {
        isValid = false;
        formError.value = 'La contraseña debe tener al menos 8 caracteres.';
      }
    } else if (currentStep.value === 3) {
      if (!currentFormData.storeName || !currentFormData.storeDescription || currentFormData.productCategories.length === 0) {
        isValid = false;
        formError.value = 'Por favor, completa la información de tu tienda y selecciona al menos una categoría (Paso 2 Vendedor).';
      }
    } else if (currentStep.value === 4) {
      if (!currentFormData.idNumber || !currentFormData.bankName || !currentFormData.accountNumber || !currentFormData.accountType) {
        isValid = false;
        formError.value = 'Por favor, completa toda la información bancaria (Paso 3 Vendedor).';
      } else if (!currentFormData.idFront || !currentFormData.idBack || !currentFormData.selfieWithId) {
        isValid = false;
        formError.value = 'Debes subir todos los documentos requeridos (DNI/RUC frente, DNI/RUC reverso y selfie con DNI/RUC).';
      }
      if (!currentFormData.acceptedTerms) {
        isValid = false;
        formError.value = 'Debes aceptar los Términos y Condiciones y la Política de Privacidad para finalizar.';
      }
    }
  }

  // Si isValid es true, entonces avanza al siguiente paso
  if (isValid) {
    nextStep();
  }
  return isValid; // Devolver el estado de validación
};


// --- Funciones de Registro Final ---
const handleCustomerRegister = async () => {
  loading.value = true;
  formError.value = null; // Limpiar errores previos

  // Aquí llamamos a validateAndNextStep() para asegurar que la validación final del último paso sea correcta
  if (!validateAndNextStep()) { // Solo valida, no avanza si ya estamos en el último paso
    loading.value = false;
    return;
  }

  try {
    console.log('Customer registration data:', customerForm.value);
    // Simula una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos

    // Aquí iría la lógica para enviar los datos al backend
    // Ejemplo: const response = await axios.post('/api/register/customer', customerForm.value);

    // Si todo es exitoso
    alert('¡Registro de Cliente completado con éxito!');
    router.push('/dashboard-cliente'); // Redirigir a un dashboard específico para clientes

  } catch (error) {
    console.error('Error en el registro de cliente:', error);
    formError.value = 'Error al registrarte. Intenta de nuevo más tarde.';
    // Si la API devuelve un mensaje de error específico, puedes usarlo:
    // formError.value = error.response?.data?.message || 'Error al registrarte. Intenta de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
};

const handleSellerRegister = async () => {
  loading.value = true;
  formError.value = null; // Limpiar errores previos

  // Aquí llamamos a validateAndNextStep() para asegurar que la validación final del último paso sea correcta
  if (!validateAndNextStep()) { // Solo valida, no avanza si ya estamos en el último paso
    loading.value = false;
    return;
  }

  try {
    console.log('Seller registration data:', sellerForm.value);
    // Simula una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos

    // Aquí iría la lógica para enviar los datos al backend
    // Si tienes que enviar archivos (idFront, idBack, selfieWithId), usarías FormData:
    /*
    const formData = new FormData();
    for (const key in sellerForm.value) {
      if (sellerForm.value[key] !== null) { // Evitar añadir nulls
        formData.append(key, sellerForm.value[key]);
      }
    }
    const response = await axios.post('/api/register/seller', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    */

    // Si todo es exitoso
    alert('¡Registro de Vendedor completado con éxito! Tu cuenta está bajo revisión.');
    router.push('/dashboard-vendedor'); // Redirigir a un dashboard específico para vendedores

  } catch (error) {
    console.error('Error en el registro de vendedor:', error);
    formError.value = 'Error al registrarte como vendedor. Intenta de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/*
  He añadido algunas animaciones CSS personalizadas para un toque más profesional,
  ya que Tailwind no tiene todas las animaciones predefinidas.
*/

/* Importa una fuente más moderna si no lo has hecho globalmente */
/* Por ejemplo, en tu main.css o en el <head> de index.html: */
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); */
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* Animación de entrada para los pasos del formulario */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* Animación para el mensaje de error */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.4s ease-out forwards;
}

/* Sombra más pronunciada para hover en la tarjeta principal */
.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 15px 30px -8px rgba(0, 0, 0, 0.08);
}
</style>