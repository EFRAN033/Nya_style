<template>
  <section id="innovacion" class="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/30 to-white overflow-hidden">
    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>

    <div class="container mx-auto px-6 sm:px-12 relative z-10">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-20">
        <div class="md:w-1/2 md:pr-10 animate-slide-in-left">
          <span class="inline-block mb-6 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-teal-100 to-emerald-100 text-emerald-700 rounded-full text-sm md:text-base font-bold uppercase tracking-wider border border-emerald-200">
            INNOVACIÓN
          </span>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight">
            <span class="bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">Tecnología</span> que anticipa el futuro
          </h2>
          <p class="text-gray-600 text-base md:text-xl mb-8 md:mb-12 leading-relaxed">
            Nuestra plataforma combina inteligencia artificial avanzada, análisis predictivo y automatización inteligente para ofrecerte una solución completa que transforma tu cadena de suministro.
          </p>

          <!-- Características -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
            <div 
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white p-6 md:p-7 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div class="flex items-center mb-4">
                <div class="bg-gradient-to-r from-teal-100 to-emerald-50 p-3 md:p-3.5 rounded-lg mr-4">
                  <i :class="feature.icon" class="text-emerald-600 text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
                  <p class="text-gray-500 text-sm md:text-base">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex flex-wrap gap-4 md:gap-8">
            <a
              href="#"
              class="group px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-bold rounded-full text-base md:text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Regístrate Gratis
              <svg class="ml-2 md:ml-3 inline h-4 w-4 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a
              href="#"
              class="px-6 md:px-10 py-3 md:py-5 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full text-base md:text-lg hover:bg-emerald-50 transition-colors duration-300"
            >
              Saber más
            </a>
          </div>
        </div>

        <!-- Imagen con sello -->
        <div class="hidden md:block md:w-1/2 relative animate-slide-in-right">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="Smart Purchasing System"
            class="rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl w-full border-2 border-gray-200 transition-transform duration-500 hover:scale-[1.02]"
          />
          <div class="absolute -bottom-8 -right-8 bg-gradient-to-r from-teal-600 to-emerald-700 text-white px-8 py-5 rounded-2xl shadow-xl">
            <p class="text-4xl font-bold">+28%</p>
            <p class="text-base font-medium mt-1">Crecimiento anual</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EnhancedDesignSection",
  data() {
    return {
      features: [
        {
          icon: "fas fa-brain",
          title: "IA Predictiva",
          description: "Anticipa demandas y evita desabastecimientos",
        },
        {
          icon: "fas fa-robot",
          title: "Automatización",
          description: "Reduce errores y ahorra tiempo",
        },
        {
          icon: "fas fa-network-wired",
          title: "Integración",
          description: "Conecta todos tus sistemas",
        },
        {
          icon: "fas fa-shield-check",
          title: "Seguridad",
          description: "Protege tus datos sensibles",
        },
      ],
    };
  },
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

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
}
</style>