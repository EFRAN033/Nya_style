<template>
  <section class="relative py-24 bg-white overflow-hidden">
    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>

    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span class="bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">¿Listo para transformar</span> tu cadena de suministro?
      </h2>
      <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
        Únete a las empresas líderes que ya están revolucionando sus procesos de compras y abastecimiento con nuestra plataforma inteligente.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
        <a
          href="#"
          class="group px-10 py-5 bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          Comenzar prueba gratuita
          <svg class="ml-3 inline h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
        <a
          href="#"
          class="px-10 py-5 border-2 border-emerald-600 text-emerald-600 font-bold rounded-full text-lg hover:bg-emerald-50 transition-colors duration-300"
        >
          Hablar con un experto
        </a>
      </div>

      <div class="mt-14 flex flex-wrap items-center justify-center gap-6 text-gray-600 text-lg">
        <div class="flex items-center">
          <i class="fas fa-check-circle text-emerald-500 mr-3"></i>
          <span>Prueba de 14 días</span>
        </div>
        <div class="hidden sm:block text-gray-400">•</div>
        <div class="flex items-center">
          <i class="fas fa-check-circle text-emerald-500 mr-3"></i>
          <span>Sin tarjeta requerida</span>
        </div>
        <div class="hidden sm:block text-gray-400">•</div>
        <div class="flex items-center">
          <i class="fas fa-check-circle text-emerald-500 mr-3"></i>
          <span>Cancelación en cualquier momento</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CleanCtaSection",
};
</script>