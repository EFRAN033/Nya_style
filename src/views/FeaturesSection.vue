<template>
  <section id="soluciones" class="relative py-20 bg-gradient-to-br from-emerald-50/30 to-white overflow-hidden">
    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Encabezado -->
      <div class="text-center mb-16 max-w-3xl mx-auto animate-slide-in-bottom">
        <span class="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-emerald-700 font-medium text-sm tracking-wide border border-emerald-200">
          PLATAFORMA INTEGRADA
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
          <span class="bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">Soluciones</span> para tu cadena de suministro
        </h2>
        <p class="text-lg text-gray-600">
          Tecnología que optimiza tus operaciones logísticas sin complicaciones
        </p>
      </div>

      <!-- Tarjetas -->
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-100 group hover:-translate-y-1"
        >
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0 mr-5">
              <div class="h-14 w-14 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-emerald-600 group-hover:from-teal-100 group-hover:to-emerald-100 transition-all">
                <i :class="feature.icon" class="text-xl"></i>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ feature.title }}</h3>
              <p class="text-gray-600 mt-1">{{ feature.description }}</p>
            </div>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li v-for="(item, i) in feature.items" :key="i" class="flex items-start">
              <svg class="h-5 w-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">{{ item }}</span>
            </li>
          </ul>
          
          <a href="#" class="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-800 group">
            Conocer más
            <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16 animate-slide-in-bottom">
        <a href="#" class="inline-flex items-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-colors group">
          Explorar todas las soluciones
          <svg class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
        
        <div class="mt-10">
          <p class="text-sm text-gray-500 mb-4">Confían en nuestra plataforma</p>
          <div class="flex flex-wrap justify-center gap-6 grayscale hover:grayscale-0 transition-all duration-500">
            <img class="h-7 opacity-80 hover:opacity-100 hover:scale-110 transition-all" src="https://logo.clearbit.com/amazon.com" alt="Amazon" loading="lazy">
            <img class="h-7 opacity-80 hover:opacity-100 hover:scale-110 transition-all" src="https://logo.clearbit.com/walmart.com" alt="Walmart" loading="lazy">
            <img class="h-7 opacity-80 hover:opacity-100 hover:scale-110 transition-all" src="https://logo.clearbit.com/dhl.com" alt="DHL" loading="lazy">
            <img class="h-7 opacity-80 hover:opacity-100 hover:scale-110 transition-all" src="https://logo.clearbit.com/maersk.com" alt="Maersk" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BalancedSolutions",
  data() {
    return {
      features: [
        {
          icon: "fas fa-warehouse",
          title: "Gestión de Inventarios",
          description: "Control inteligente de tus existencias",
          items: [
            "Reabastecimiento predictivo",
            "Alertas de stock crítico",
            "Optimización automática"
          ],
        },
        {
          icon: "fas fa-truck-moving",
          title: "Logística Integrada",
          description: "Visibilidad completa de tu cadena",
          items: [
            "Seguimiento en tiempo real",
            "Optimización de rutas",
            "Gestión de proveedores"
          ],
        },
        {
          icon: "fas fa-chart-line",
          title: "Analítica Avanzada",
          description: "Toma decisiones basadas en datos",
          items: [
            "Dashboards personalizados",
            "Indicadores clave",
            "Reportes automatizados"
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
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

.animate-slide-in-bottom {
  animation: slideInBottom 0.6s ease-out forwards;
}
</style>