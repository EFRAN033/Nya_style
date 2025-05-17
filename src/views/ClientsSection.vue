<template>
  <section id="clientes" class="py-16 bg-white relative overflow-hidden">
    <!-- Elementos decorativos abstractos -->
    <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"></div>
    <div class="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-teal-100/30 blur-3xl"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center mb-16 animate-slide-in-bottom">
        <!-- Badge con el estilo de la paleta -->
        <span class="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-teal-100 to-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
          CONFÍAN EN NOSOTROS
        </span>
        
        <!-- Título con el gradiente verde -->
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          <span class="bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">Empresas líderes</span> en logística global
        </h2>
        
        <!-- Texto descriptivo -->
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Nuestra plataforma optimiza las cadenas de suministro de las organizaciones más innovadoras
        </p>
      </div>

      <!-- Versión Desktop: Grid estático -->
      <div class="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-8 animate-slide-in-bottom">
        <div
          v-for="(client, index) in clients"
          :key="'desktop-' + index"
          class="flex justify-center items-center h-20 group"
        >
          <img
            :src="client.logo"
            :alt="`Logo ${client.name}`"
            class="h-12 opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110 grayscale hover:grayscale-0"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Versión Mobile Carrusel automático -->
      <div class="md:hidden relative overflow-hidden h-24 w-full">
        <div 
          class="absolute top-0 left-0 flex items-center h-full carrusel-track"
          :style="{ width: carruselWidth }"
        >
          <div 
            v-for="(client, index) in duplicatedClients" 
            :key="'mobile-' + index"
            class="flex-shrink-0 flex justify-center items-center w-32 px-4 group"
          >
            <img
              :src="client.logo"
              :alt="`Logo ${client.name}`"
              class="max-h-12 max-w-[100px] opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Indicador de scroll para móvil -->
      <div class="md:hidden mt-8 text-center">
        <svg class="w-6 h-6 mx-auto text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import cliente1 from '@/assets/imagenes/cliente1.svg';
import cliente2 from '@/assets/imagenes/cliente2.svg';
import cliente3 from '@/assets/imagenes/cliente3.svg';
import cliente4 from '@/assets/imagenes/cliente4.svg';
import cliente5 from '@/assets/imagenes/cliente5.svg';
import cliente6 from '@/assets/imagenes/cliente6.svg';
import cliente7 from '@/assets/imagenes/cliente7.svg';

export default {
  name: "ClientsSection",
  data() {
    return {
      clients: [
        { name: "Google", logo: cliente1 },
        { name: "Amazon", logo: cliente2 },
        { name: "Microsoft", logo: cliente3 },
        { name: "Walmart", logo: cliente4 },
        { name: "DHL", logo: cliente5 },
        { name: "Maersk", logo: cliente6 },
        { name: "Coca Cola", logo: cliente7 }
      ],
      carruselSpeed: 30 
    };
  },
  computed: {
    duplicatedClients() {
      return [...this.clients, ...this.clients]; 
    },
    carruselWidth() {
      return `${this.clients.length * 160}px`; 
    }
  },
  mounted() {
    this.startCarrusel();
  },
  methods: {
    startCarrusel() {
      const carruselTrack = document.querySelector('.carrusel-track');
      if (carruselTrack) {
        const animation = carruselTrack.animate(
          [
            { transform: 'translateX(0)' },
            { transform: `translateX(-${this.carruselWidth})` }
          ],
          {
            duration: this.carruselSpeed * 1000,
            iterations: Infinity
          }
        );
        
        // Pausar al hacer hover (opcional)
        carruselTrack.addEventListener('mouseenter', () => animation.pause());
        carruselTrack.addEventListener('mouseleave', () => animation.play());
      }
    }
  }
};
</script>

<style scoped>
.carrusel-track {
  will-change: transform; 
}

img {
  object-fit: contain;
  height: auto;
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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>