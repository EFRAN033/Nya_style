<template>
  <section id="testimonios" class="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 to-emerald-900 overflow-hidden">
    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-900/20 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-900/20 blur-3xl"></div>

    <div class="container mx-auto px-6 sm:px-12 relative z-10">
      <!-- Encabezado -->
      <div class="text-center mb-14 md:mb-16">
        <span class="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-teal-100/20 to-emerald-100/20 text-emerald-300 rounded-full text-sm font-bold uppercase tracking-wider border border-emerald-400/30">
          TESTIMONIOS
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          <span class="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Voces</span> de confianza
        </h2>
        <p class="text-emerald-100 max-w-md mx-auto text-base md:text-lg">
          Empresas que transformaron su cadena de suministro
        </p>
      </div>

      <!-- Testimonios -->
      <div class="grid gap-8 md:grid-cols-2">
        <div 
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="p-8 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex items-start gap-5 mb-5">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="w-14 h-14 rounded-full border-2 border-emerald-400/30 object-cover"/>
            <div>
              <h4 class="font-bold text-white text-lg">{{ testimonial.name }}</h4>
              <p class="text-emerald-300 text-sm md:text-base">{{ testimonial.position }}</p>
            </div>
          </div>
          <p class="text-emerald-100 mb-5 text-base md:text-lg">"{{ testimonial.quote }}"</p>
          <div class="flex justify-between items-center">
            <div class="flex text-yellow-400">
              <i v-for="star in 5" :key="star" class="fas fa-star text-sm"/>
            </div>
            <span class="text-emerald-300 text-sm md:text-base">{{ testimonial.date }}</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <a href="#" class="inline-flex items-center px-6 py-3 border-2 border-emerald-400 text-emerald-400 rounded-full text-base font-semibold hover:bg-emerald-400/10 transition-all duration-300 group">
          Ver más testimonios
          <svg class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [
        {
          name: "Nina Rodríguez",
          position: "Directora de Logística",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
          quote: "Redujimos un 60% el tiempo en gestión de compras con mayor precisión en inventarios.",
          date: "Hace 2 meses"
        },
        {
          name: "Carlos Méndez",
          position: "CEO Distribuciones",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          quote: "Costos logísticos reducidos 35% con implementación rápida y soporte excepcional.",
          date: "Hace 5 meses"
        }
      ]
    };
  }
};
</script>