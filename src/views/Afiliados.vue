<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <button @click="$router.go(-1)" class="text-gray-600 hover:text-emerald-600 transition-colors mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <router-link to="/" class="flex items-center">
              <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                ProVeo
              </span>
            </router-link>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <router-link 
              to="/proveedores" 
              class="text-sm font-medium text-emerald-600 border-b-2 border-emerald-500 pb-1"
            >
              Proveedores
            </router-link>
            <router-link 
              to="/soluciones" 
              class="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Soluciones
            </router-link>
            <router-link 
              to="/precios" 
              class="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Precios
            </router-link>
            <router-link 
              to="/contacto" 
              class="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Contacto
            </router-link>
          </nav>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/login" 
              class="hidden md:block px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              Iniciar sesión
            </router-link>
            <button class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
              Comenzar prueba
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Resto del código permanece igual -->
    <section class="pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full mb-4 uppercase tracking-wider">
            RED DE PROVEEDORES CERTIFICADOS
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Aliados Comerciales de Confianza
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Conectamos tu negocio con proveedores verificados que garantizan calidad premium, disponibilidad inmediata y condiciones competitivas.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Explorar proveedores
            </button>
            <button class="px-6 py-3 bg-white text-emerald-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-all transform hover:-translate-y-0.5">
              Unirse como proveedor
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Supplier Categories -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="filterByCategory(category.id)"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm',
              activeCategory === category.id 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-emerald-200'
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- All Suppliers Card -->
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
              <div class="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMTI5LDc4LDIwNywwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
              <img src="@/assets/imagenes/todo.png" alt="Todos los proveedores"
                  class="absolute inset-0 w-full h-full object-cover z-10" />
              <span class="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-purple-600 shadow-sm z-20">
                72 Proveedores
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-3">
                <h3 class="text-xl font-bold text-gray-900">Todos los Proveedores</h3>
                <span class="ml-3 px-2 py-1 text-xs font-bold text-purple-800 bg-purple-100 rounded-full">COMPLETO</span>
              </div>
              <p class="text-gray-600 mb-4">Accede a nuestro catálogo completo de proveedores verificados en todas las categorías disponibles.</p>
              <div class="flex justify-between items-center">
                <router-link to="/proveedores" class="text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                  Explorar todo
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
                <span class="text-xs text-gray-500">Variados</span>
              </div>
            </div>
          </div>

          <!-- Textiles Card -->
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <div class="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDE0MSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
              <img src="@/assets/imagenes/textil.png" alt="Materiales textiles"
                  class="absolute inset-0 w-full h-full object-cover z-10" />
              <span class="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm z-20">
                24 Proveedores
              </span>
              <span class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center z-20">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                NUEVOS
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Materiales Textiles</h3>
              <p class="text-gray-600 mb-4">Telas y materiales de primera calidad para confección, con certificación de origen y sostenibilidad.</p>
              <div class="flex justify-between items-center">
                <router-link to="/textiles" class="text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                  Explorar proveedores
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
                <span class="text-xs text-gray-500">Desde S/15/unidad</span>
              </div>
            </div>
          </div>

            <!-- Industrial Supplies Card -->
            <div class="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div class="relative h-48 flex items-center justify-center">
                <img src="@/assets/imagenes/insumo.png" alt="Insumos Industriales" class="w-full h-full object-cover" />
                <span class="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm z-10">
                  18 Proveedores
                </span>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">Insumos Industriales</h3>
                <p class="text-gray-600 mb-4">Todo lo necesario para mantener tu producción funcionando: hilos, botones, cremalleras y más.</p>
                <div class="flex justify-between items-center">
                  <router-link to="/insumos" class="text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                    Ver catálogo
                    <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </router-link>
                  <span class="text-xs text-gray-500">Desde S/8/unidad</span>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Become a Supplier Section -->
        <section class="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl font-bold mb-6">¿Eres proveedor?</h2>
              <p class="text-lg mb-8 opacity-90">
                Únete a nuestra red exclusiva y accede a cientos de compradores calificados con capacidad de compra verificada.
              </p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <button class="px-6 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Unirse ahora
                </button>
                <button class="px-6 py-3 bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  Ver requisitos
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mt-16">
              <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="font-bold text-lg mb-2">Mayor visibilidad</h3>
                <p class="text-white/80 text-sm">Exposición a cientos de empresas compradoras activas en nuestra plataforma.</p>
              </div>

              <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="font-bold text-lg mb-2">Pagos garantizados</h3>
                <p class="text-white/80 text-sm">Sistema de pagos seguros y a tiempo, sin preocupaciones por cobranza.</p>
              </div>

              <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="font-bold text-lg mb-2">Sin comisiones</h3>
                <p class="text-white/80 text-sm">Sin costos ocultos. Solo pagas una tarifa plana mensual sin porcentajes sobre ventas.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimonials -->
        <section class="py-16 bg-white">
          <div class="container mx-auto px-6">
            <div class="text-center mb-14">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
              <p class="text-gray-600 max-w-2xl mx-auto">Empresas que han transformado su cadena de suministro con nuestros proveedores certificados</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl mr-4">M</div>
                  <div>
                    <h4 class="font-bold text-gray-900">María González</h4>
                    <p class="text-sm text-gray-500">CEO, Moda Sostenible S.A.</p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"Redujimos nuestros tiempos de abastecimiento en un 40% y encontramos proveedores de telas orgánicas que cumplen con nuestros estándares éticos."</p>
                <div class="flex">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl mr-4">J</div>
                  <div>
                    <h4 class="font-bold text-gray-900">Juan Pérez</h4>
                    <p class="text-sm text-gray-500">Gerente de Compras, Textiles del Norte</p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"La calidad de los proveedores premium superó nuestras expectativas. Ahora tenemos acceso a materiales exclusivos que diferencian nuestros productos."</p>
                <div class="flex">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>

              <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl mr-4">C</div>
                  <div>
                    <h4 class="font-bold text-gray-900">Carlos Rojas</h4>
                    <p class="text-sm text-gray-500">Director, Confecciones Rápidas</p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">"Los servicios logísticos integrados nos permitieron reducir costos de almacenamiento en un 30% y mejorar nuestros tiempos de entrega."</p>
                <div class="flex">
                  <svg v-for="i in 4" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-gray-900 text-white">
          <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl font-bold mb-6">¿Listo para transformar tu cadena de suministro?</h2>
              <p class="text-lg mb-8 opacity-90">
                Únete a las empresas líderes que ya están revolucionando sus procesos de compras y abastecimiento con nuestra plataforma inteligente.
              </p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <button class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">
                  Comenzar prueba gratuita
                </button>
                <button class="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Hablar con un experto
                </button>
              </div>
              <p class="text-sm text-gray-400 mt-6">
                Prueba de 14 días • Sin tarjeta requerida • Cancelación en cualquier momento
              </p>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-gray-300 py-12">
          <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 class="text-white font-bold mb-4">Producto</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="hover:text-white transition-colors">Funcionalidades</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Precios</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Integraciones</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Actualizaciones</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-white font-bold mb-4">Recursos</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Guías</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Webinars</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Centro de ayuda</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-white font-bold mb-4">Empresa</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="hover:text-white transition-colors">Nosotros</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Carreras</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Socios</a></li>
                  <li><a href="#" class="hover:text-white transition-colors">Prensa</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-white font-bold mb-4">Contacto</h3>
                <ul class="space-y-2">
                  <li><a href="mailto:hola@proveo.com" class="hover:text-white transition-colors">hola@Proveo.com</a></li>
                  <li><a href="tel:+525512345678" class="hover:text-white transition-colors">+52 55 1234 5678</a></li>
                  <li class="mt-4">Av. Reforma 123, CDMX</li>
                </ul>
              </div>
            </div>
            <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div class="flex items-center mb-4 md:mb-0">
                <span class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ProVeo
                </span>
                <span class="text-sm text-gray-400 ml-4">© 2023 Proveo. Todos los derechos reservados.</span>
              </div>
              <div class="flex space-x-6">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">Términos</a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacidad</a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </template>

    <script>
    export default {
      name: 'SupplierPage',
      data() {
        return {
          activeCategory: 'all',
          categories: [
            { id: 'all', name: 'Todos' },
            { id: 'prendas', name: 'Textiles' },
            { id: 'suministros', name: 'Insumos' },
            { id: 'servicios', name: 'Servicios' },
            { id: 'premium', name: 'Premium' }
          ]
        }
      },
      methods: {
        filterByCategory(categoryId) {
          this.activeCategory = categoryId;
        }
      }
    }
    </script>

    <style scoped>
    /* Custom animations */
    .hover-animate {
      transition: all 0.3s ease;
    }

    .hover-animate:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Pattern backgrounds */
    .bg-pattern {
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    }
    </style>