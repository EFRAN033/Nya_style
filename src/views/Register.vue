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
            <span class="text-xl font-bold">Pidelo<span class="text-pink-600">YA</span></span>
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

    <!-- Contenido principal -->
    <main class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-2xl">
        <!-- Progreso y logo -->
        <div class="flex justify-between items-center mb-8">
          <button 
            v-if="currentStep > 1" 
            @click="prevStep"
            class="flex items-center text-pink-600 hover:text-pink-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Atrás
          </button>
          <div v-else></div>
          
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-500">Paso {{ currentStep }} de {{ totalSteps }}</span>
            <div class="w-32 bg-gray-200 rounded-full h-2.5">
              <div class="bg-pink-600 h-2.5 rounded-full" :style="`width: ${progress}%`"></div>
            </div>
          </div>
        </div>

        <!-- Selector de tipo de registro -->
        <div v-if="currentStep === 1" class="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100 mb-6">
          <div class="p-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Crea tu cuenta</h2>
            <p class="text-sm text-center text-gray-600 mb-8">Selecciona el tipo de cuenta que deseas crear</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                @click="selectUserType('customer')"
                :class="{'ring-2 ring-pink-500 bg-pink-50': userType === 'customer', 'border-gray-200 hover:border-pink-300': userType !== 'customer'}"
                class="border-2 rounded-xl p-6 text-center transition-all duration-200 hover:shadow-md"
              >
                <div class="flex flex-col items-center">
                  <div class="bg-pink-100 rounded-full p-4 mb-4">
                    <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Soy Cliente</h3>
                  <p class="text-sm text-gray-600">Quiero comprar productos</p>
                </div>
              </button>
              
              <button
                @click="selectUserType('seller')"
                :class="{'ring-2 ring-pink-500 bg-pink-50': userType === 'seller', 'border-gray-200 hover:border-pink-300': userType !== 'seller'}"
                class="border-2 rounded-xl p-6 text-center transition-all duration-200 hover:shadow-md"
              >
                <div class="flex flex-col items-center">
                  <div class="bg-pink-100 rounded-full p-4 mb-4">
                    <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">Soy Vendedor</h3>
                  <p class="text-sm text-gray-600">Quiero vender mis productos</p>
                </div>
              </button>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-200">
              <p class="text-sm text-center text-gray-600">
                ¿Ya tienes una cuenta? 
                <router-link to="/login" class="text-pink-600 font-medium hover:text-pink-500">Inicia sesión</router-link>
              </p>
            </div>
          </div>
        </div>

        <!-- Formulario de registro para Cliente -->
        <div v-if="userType === 'customer' && currentStep > 1" class="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100">
          <div class="p-8">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-1">Registro de Cliente</h2>
              <p class="text-sm text-gray-600">Paso {{ currentStep }} de {{ totalSteps }} - {{ stepTitles.customer[currentStep-1] }}</p>
            </div>
            
            <form class="space-y-6" @submit.prevent="handleCustomerRegister">
              <!-- Paso 2: Información básica -->
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                    <input
                      id="firstName"
                      v-model="customerForm.firstName"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: María"
                    >
                  </div>
                  
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                      id="lastName"
                      v-model="customerForm.lastName"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: Pérez Gómez"
                    >
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input
                    id="email"
                    v-model="customerForm.email"
                    type="email"
                    required
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="tucorreo@ejemplo.com"
                  >
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                      id="password"
                      v-model="customerForm.password"
                      type="password"
                      required
                      minlength="8"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Mínimo 8 caracteres"
                    >
                  </div>
                  
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                    <input
                      id="confirmPassword"
                      v-model="customerForm.confirmPassword"
                      type="password"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Repite tu contraseña"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Paso 3: Información adicional -->
              <div v-if="currentStep === 3" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      id="phone"
                      v-model="customerForm.phone"
                      type="tel"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: 987654321"
                    >
                  </div>
                  
                  <div>
                    <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
                    <input
                      id="birthDate"
                      v-model="customerForm.birthDate"
                      type="date"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                  </div>
                </div>
                
                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    id="address"
                    v-model="customerForm.address"
                    type="text"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="Ej: Av. Principal 123"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preferencias de compra</label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div v-for="preference in preferences" :key="preference" class="flex items-center">
                      <input
                        :id="`preference-${preference}`"
                        v-model="customerForm.preferences"
                        type="checkbox"
                        :value="preference"
                        class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      >
                      <label :for="`preference-${preference}`" class="ml-2 text-sm text-gray-700">{{ preference }}</label>
                    </div>
                  </div>
                </div>

                <div class="flex items-start pt-2">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      v-model="customerForm.acceptedTerms"
                      type="checkbox"
                      required
                      class="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    >
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-medium text-gray-700">Acepto los </label>
                    <router-link to="/terms" class="text-pink-600 hover:text-pink-500">Términos y condiciones</router-link>
                    <label for="terms" class="font-medium text-gray-700"> y la </label>
                    <router-link to="/privacy" class="text-pink-600 hover:text-pink-500">Política de privacidad</router-link>
                  </div>
                </div>
              </div>
              
              <!-- Botones de navegación -->
              <div class="pt-6">
                <button
                  type="submit"
                  v-if="currentStep === totalSteps"
                  class="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                >
                  Completar registro
                </button>
                <button
                  type="button"
                  v-else
                  @click="nextStep"
                  class="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Formulario de registro para Vendedor -->
        <div v-if="userType === 'seller' && currentStep > 1" class="bg-white shadow-lg rounded-2xl overflow-hidden border border-pink-100">
          <div class="p-8">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-1">Registro de Vendedor</h2>
              <p class="text-sm text-gray-600">Paso {{ currentStep }} de {{ totalSteps }} - {{ stepTitles.seller[currentStep-1] }}</p>
            </div>
            
            <form class="space-y-6" @submit.prevent="handleSellerRegister">
              <!-- Paso 2: Información personal -->
              <div v-if="currentStep === 2" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="sellerFirstName" class="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                    <input
                      id="sellerFirstName"
                      v-model="sellerForm.firstName"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: Juan"
                    >
                  </div>
                  
                  <div>
                    <label for="sellerLastName" class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                      id="sellerLastName"
                      v-model="sellerForm.lastName"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: Rodríguez López"
                    >
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="sellerEmail" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input
                      id="sellerEmail"
                      v-model="sellerForm.email"
                      type="email"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="tucorreo@ejemplo.com"
                    >
                  </div>
                  
                  <div>
                    <label for="sellerPhone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      id="sellerPhone"
                      v-model="sellerForm.phone"
                      type="tel"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: 987654321"
                    >
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="sellerPassword" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                      id="sellerPassword"
                      v-model="sellerForm.password"
                      type="password"
                      required
                      minlength="8"
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Mínimo 8 caracteres"
                    >
                  </div>
                  
                  <div>
                    <label for="sellerConfirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                    <input
                      id="sellerConfirmPassword"
                      v-model="sellerForm.confirmPassword"
                      type="password"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Repite tu contraseña"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Paso 3: Información de la tienda -->
              <div v-if="currentStep === 3" class="space-y-6">
                <div>
                  <label for="storeName" class="block text-sm font-medium text-gray-700 mb-1">Nombre de tu tienda</label>
                  <input
                    id="storeName"
                    v-model="sellerForm.storeName"
                    type="text"
                    required
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="Ej: Moda Elegante"
                  >
                </div>
                
                <div>
                  <label for="storeDescription" class="block text-sm font-medium text-gray-700 mb-1">Descripción de la tienda</label>
                  <textarea
                    id="storeDescription"
                    v-model="sellerForm.storeDescription"
                    rows="3"
                    class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="Describe los productos que ofreces..."
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Categorías de productos</label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div v-for="category in productCategories" :key="category" class="flex items-center">
                      <input
                        :id="`category-${category}`"
                        v-model="sellerForm.productCategories"
                        type="checkbox"
                        :value="category"
                        class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      >
                      <label :for="`category-${category}`" class="ml-2 text-sm text-gray-700">{{ category }}</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Paso 4: Información bancaria y documentos -->
              <div v-if="currentStep === 4" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="idNumber" class="block text-sm font-medium text-gray-700 mb-1">DNI o RUC</label>
                    <input
                      id="idNumber"
                      v-model="sellerForm.idNumber"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: 87654321"
                    >
                  </div>
                  
                  <div>
                    <label for="bankName" class="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                    <select
                      id="bankName"
                      v-model="sellerForm.bankName"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                      <option value="">Selecciona tu banco</option>
                      <option v-for="bank in banks" :key="bank" :value="bank">{{ bank }}</option>
                    </select>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="accountNumber" class="block text-sm font-medium text-gray-700 mb-1">Número de cuenta</label>
                    <input
                      id="accountNumber"
                      v-model="sellerForm.accountNumber"
                      type="text"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Ej: 193-45678901-0-78"
                    >
                  </div>
                  
                  <div>
                    <label for="accountType" class="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
                    <select
                      id="accountType"
                      v-model="sellerForm.accountType"
                      required
                      class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                      <option value="">Selecciona tipo</option>
                      <option value="savings">Ahorros</option>
                      <option value="checking">Corriente</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Documentos requeridos</label>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FileUpload
                        label="DNI/RUC (Frente)"
                        @file-changed="(file) => sellerForm.idFront = file"
                      />
                      <FileUpload
                        label="DNI/RUC (Reverso)"
                        @file-changed="(file) => sellerForm.idBack = file"
                      />
                    </div>
                    
                    <FileUpload
                      label="Selfie con DNI/RUC"
                      @file-changed="(file) => sellerForm.selfieWithId = file"
                    />
                  </div>
                </div>

                <div class="flex items-start pt-2">
                  <div class="flex items-center h-5">
                    <input
                      id="sellerTerms"
                      v-model="sellerForm.acceptedTerms"
                      type="checkbox"
                      required
                      class="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded"
                    >
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="sellerTerms" class="font-medium text-gray-700">Acepto los </label>
                    <router-link to="/terms" class="text-pink-600 hover:text-pink-500">Términos y condiciones</router-link>
                    <label for="sellerTerms" class="font-medium text-gray-700"> y la </label>
                    <router-link to="/privacy" class="text-pink-600 hover:text-pink-500">Política de privacidad</router-link>
                  </div>
                </div>
              </div>
              
              <!-- Botones de navegación -->
              <div class="pt-6">
                <button
                  type="submit"
                  v-if="currentStep === totalSteps"
                  class="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                >
                  Completar registro
                </button>
                <button
                  type="button"
                  v-else
                  @click="nextStep"
                  class="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                >
                  Continuar
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
import FileUpload from '@/components/FileUpload.vue';

const router = useRouter();

// Estado del formulario
const userType = ref(null); // 'customer' o 'seller'
const currentStep = ref(1);

// Títulos de los pasos
const stepTitles = {
  customer: ['Información básica', 'Datos adicionales'],
  seller: ['Información personal', 'Datos de la tienda', 'Información bancaria']
};

// Calcular el progreso y total de pasos
const totalSteps = computed(() => userType.value === 'seller' ? 4 : 3);
const progress = computed(() => (currentStep.value / totalSteps.value) * 100);

// Datos del formulario para clientes
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

// Datos del formulario para vendedores
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
  idFront: null,
  idBack: null,
  selfieWithId: null,
  acceptedTerms: false
});

// Opciones para los formularios
const preferences = [
  'Ropa de mujer',
  'Ropa de hombre',
  'Accesorios',
  'Calzado',
  'Electrónica',
  'Hogar',
  'Belleza',
  'Deportes',
  'Juguetes',
  'Libros'
];

const productCategories = [
  'Ropa de mujer',
  'Ropa de hombre',
  'Accesorios',
  'Zapatos',
  'Bolsos',
  'Joyeria',
  'Ropa infantil',
  'Deportes',
  'Trajes de baño',
  'Ropa formal'
];

const banks = [
  'BCP',
  'BBVA',
  'Interbank',
  'Scotiabank',
  'Banco de la Nación',
  'Banco Pichincha',
  'MiBanco',
  'Banco GNB',
  'Banco Falabella',
  'Banco Ripley'
];

// Métodos
const selectUserType = (type) => {
  userType.value = type;
  nextStep();
};

const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const validateCustomerForm = () => {
  // Validar que las contraseñas coincidan
  if (customerForm.value.password !== customerForm.value.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return false;
  }
  
  // Validar términos y condiciones
  if (!customerForm.value.acceptedTerms) {
    alert('Debes aceptar los términos y condiciones');
    return false;
  }
  
  return true;
};

const validateSellerForm = () => {
  // Validar que las contraseñas coincidan
  if (sellerForm.value.password !== sellerForm.value.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return false;
  }
  
  // Validar documentos en el último paso
  if (currentStep.value === 4 && (!sellerForm.value.idFront || !sellerForm.value.idBack || !sellerForm.value.selfieWithId)) {
    alert('Debes subir todos los documentos requeridos');
    return false;
  }
  
  // Validar términos y condiciones
  if (!sellerForm.value.acceptedTerms) {
    alert('Debes aceptar los términos y condiciones');
    return false;
  }
  
  return true;
};

const handleCustomerRegister = async () => {
  if (!validateCustomerForm()) return;
  
  try {
    console.log('Customer registration data:', customerForm.value);
    // Aquí iría la lógica para enviar los datos al backend
    
    // Redirigir después del registro exitoso
    router.push('/');
  } catch (error) {
    console.error('Error en el registro:', error);
    // Mostrar mensaje de error al usuario
  }
};

const handleSellerRegister = async () => {
  if (!validateSellerForm()) return;
  
  try {
    console.log('Seller registration data:', sellerForm.value);
    // Aquí iría la lógica para enviar los datos al backend
    
    // Redirigir al dashboard de vendedor después del registro exitoso
    router.push('/vendedor/dashboard');
  } catch (error) {
    console.error('Error en el registro:', error);
    // Mostrar mensaje de error al usuario
  }
};
</script>