<template>
  <section
    id="inicio"
    class="relative overflow-hidden bg-white pt-24 pb-16 md:pt-36 md:pb-24"
  >
    <!-- Fondo orgánico abstracto con movimiento sutil -->
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMCwxMDAgMCIgc3Ryb2tlPSJyZ2JhKDQsMTIwLDgxLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] animate-float"></div>
    </div>

    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"></div>

    <div class="container relative mx-auto px-6">
      <div class="flex flex-col items-center lg:flex-row">
        <!-- Columna de texto -->
        <div class="mb-12 lg:mb-0 lg:w-1/2 lg:pr-10 animate-slide-in-left">
          <!-- Badge de novedad con diseño orgánico -->
          <div class="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 px-4 py-2 text-xs font-medium text-white tracking-wider shadow-md relative overflow-hidden group">
            <span class="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center">
              <span class="mr-2 inline-block h-2 w-2 rounded-full bg-white/90 animate-pulse"></span>
              ¡NUEVA VERSIÓN DISPONIBLE!
              <svg class="ml-2 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
            </span>
          </div>

          <h1 class="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            <span class="relative inline-block">
              <span class="absolute -bottom-1 left-0 h-2 w-full bg-emerald-200/70 rounded-full"></span>
              <span class="relative bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">Revoluciona</span>
            </span> tu cadena de<br>
            <span class="relative">
              <span class="absolute -bottom-1 left-0 h-1 w-full bg-teal-100 rounded-full"></span>
              <span class="relative text-gray-800">suministro digital</span>
            </span>
          </h1>

          <!-- Subtítulo con efecto de aparición progresiva -->
          <p class="mb-8 text-lg text-gray-600 md:text-xl max-w-lg">
            <span class="inline-block opacity-0 animate-fade-in [animation-delay:0.2s] animate-fill-forwards">Plataforma inteligente que</span>
            <span class="inline-block opacity-0 animate-fade-in [animation-delay:0.4s] animate-fill-forwards"> <span class="font-semibold text-teal-600">automatiza</span> procesos,</span>
            <span class="inline-block opacity-0 animate-fade-in [animation-delay:0.6s] animate-fill-forwards"> <span class="font-semibold text-emerald-600">reduce costos</span> y</span>
            <span class="inline-block opacity-0 animate-fade-in [animation-delay:0.8s] animate-fill-forwards"> <span class="font-semibold text-green-700">maximiza eficiencia</span>.</span>
          </p>

          <!-- CTA con diseño orgánico -->
          <div class="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <router-link
              to="/afiliados"
              class="relative overflow-hidden flex items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl group"
            >
              <span class="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center">
                Comenzar ahora
                <svg
                  class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </router-link>

            <a
              href="#features"
              class="relative flex items-center justify-center rounded-lg border-2 border-emerald-100 bg-white px-8 py-4 text-lg font-semibold text-emerald-800 transition-all hover:bg-emerald-50 group"
            >
              <span class="absolute inset-0 rounded-md bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center">
                <svg
                  class="mr-2 h-5 w-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                Ver demostración
              </span>
            </a>
          </div>

          <!-- Social proof con diseño mejorado -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="relative flex -space-x-3">
              <img
                class="relative z-30 h-12 w-12 rounded-full border-2 border-white shadow-md"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Cliente satisfecho"
                loading="lazy"
              />
              <img
                class="relative z-20 h-12 w-12 rounded-full border-2 border-white shadow-md"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Cliente satisfecho"
                loading="lazy"
              />
              <img
                class="relative z-10 h-12 w-12 rounded-full border-2 border-white shadow-md"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Cliente satisfecho"
                loading="lazy"
              />
              <div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-700 to-teal-600 text-xs font-bold text-white shadow-md z-0">
                +2.5K
              </div>
            </div>
            <div class="text-center sm:text-left sm:ml-4">
              <div class="flex items-center justify-center sm:justify-start">
                <div class="flex text-amber-400">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                </div>
                <span class="ml-2 text-sm font-medium text-gray-600">4.9 (2.5K+ reseñas)</span>
              </div>
              <p class="mt-1 text-sm text-gray-500 leading-tight">
                Empresas líderes en logística nos prefieren
              </p>
            </div>
          </div>
        </div>

        <!-- Columna de imagen con diseño mejorado -->
        <div class="lg:w-1/2 animate-slide-in-right">
          <div class="relative">
            <!-- Marco orgánico para la imagen -->
            <div class="relative overflow-hidden rounded-2xl shadow-2xl border-8 border-white transform rotate-1">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 z-10"></div>
              <img
                class="h-auto w-full transform transition-all duration-500 hover:scale-105"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Dashboard de gestión de suministros"
                loading="lazy"
              />
            </div>
            
            <!-- Tarjeta de métrica con diseño orgánico -->
            <div
              class="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-6 shadow-xl md:block border-t-4 border-teal-500 transform -rotate-1"
            >
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100">
                  <svg
                    class="h-6 w-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium uppercase tracking-wider text-teal-600">
                    Eficiencia mejorada
                  </p>
                  <p class="text-2xl font-bold text-gray-900">+87%</p>
                  <p class="text-sm text-gray-600">en procesos logísticos</p>
                </div>
              </div>
            </div>

            <!-- Sello de garantía con diseño mejorado -->
            <div
              class="absolute -right-6 -top-6 hidden items-center rounded-xl bg-white px-5 py-3 shadow-xl md:flex border border-emerald-100 transform rotate-2"
            >
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 shadow-md">
                <svg
                  class="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-xs font-medium text-emerald-600 tracking-wider">GARANTÍA SATISFACCIÓN</p>
                <p class="text-sm font-bold text-gray-900">30 días sin riesgo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Logos de empresas con diseño mejorado -->
    <div class="container mx-auto mt-20 px-6 animate-slide-in-bottom">
      <p class="mb-8 text-center text-sm font-medium uppercase tracking-wider text-emerald-600">
        Empresas que optimizan con nosotros
      </p>
      <div class="flex flex-wrap items-center justify-center gap-10 grayscale hover:grayscale-0 transition-all duration-500">
        <div class="group relative">
          <img class="h-8 transition-all duration-300 group-hover:scale-110" src="https://logo.clearbit.com/google.com" alt="Google" loading="lazy" />
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <div class="group relative">
          <img class="h-8 transition-all duration-300 group-hover:scale-110" src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" loading="lazy" />
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <div class="group relative">
          <img class="h-8 transition-all duration-300 group-hover:scale-110" src="https://logo.clearbit.com/amazon.com" alt="Amazon" loading="lazy" />
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <div class="group relative">
          <img class="h-8 transition-all duration-300 group-hover:scale-110" src="https://logo.clearbit.com/slack.com" alt="Slack" loading="lazy" />
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
        <div class="group relative">
          <img class="h-8 transition-all duration-300 group-hover:scale-110" src="https://logo.clearbit.com/airbnb.com" alt="Airbnb" loading="lazy" />
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  mounted() {
    const elements = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right, .animate-slide-in-bottom');
    elements.forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.opacity = '1';
      }, 10);
    });
  }
};
</script>

<style>
@keyframes slideInLeft {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInBottom {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
}

.animate-slide-in-bottom {
  animation: slideInBottom 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

/* Efectos hover personalizados */
.hover-rotate:hover {
  transform: rotate(1deg) scale(1.02);
}
</style>