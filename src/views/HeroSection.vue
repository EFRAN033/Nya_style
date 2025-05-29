<template>
  <section class="relative h-screen max-h-[800px] overflow-hidden">
    <!-- Carrusel con efecto de desvanecido mejorado -->
    <div class="absolute inset-0 z-0">
      <div class="relative h-full w-full">
        <!-- Imagen 1 con efecto parallax sutil -->
        <transition 
          :enter-active-class="currentDirection === 'next' ? 'enter-next' : 'enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'leave-next' : 'leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 0" key="slide-0" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                 alt="Modelo con vestido de noche" 
                 class="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>
        </transition>

        <!-- Imagen 2 -->
        <transition 
          :enter-active-class="currentDirection === 'next' ? 'enter-next' : 'enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'leave-next' : 'leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 1" key="slide-1" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                 alt="Modelo con traje elegante" 
                 class="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>
        </transition>

        <!-- Imagen 3 -->
        <transition 
          :enter-active-class="currentDirection === 'next' ? 'enter-next' : 'enter-prev'"
          :leave-active-class="currentDirection === 'next' ? 'leave-next' : 'leave-prev'"
          mode="out-in"
        >
          <div v-if="currentSlide === 2" key="slide-2" class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                 alt="Modelo con abrigo de diseñador" 
                 class="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
                 :class="{'scale-105': !isHovering, 'scale-100': isHovering}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Contenido superpuesto -->
    <div class="relative z-10 h-full flex flex-col justify-center" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl">
          <!-- Título con animación de entrada -->
          <transition
            appear
            enter-active-class="transition-all duration-700 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span class="block">{{ slides[currentSlide].title }}</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 block">
                {{ slides[currentSlide].highlight }}
              </span>
            </h1>
          </transition>
          
          <!-- Subtítulo con animación retardada -->
          <transition
            appear
            enter-active-class="transition-all duration-700 ease-out delay-150"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <p class="text-lg md:text-xl text-gray-200 mb-8">
              {{ slides[currentSlide].description }}
            </p>
          </transition>
          
          <!-- Botones CTA con animación -->
          <transition
            appear
            enter-active-class="transition-all duration-700 ease-out delay-300"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link 
                to="/explore" 
                class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg transition-all hover:scale-105"
              >
                Explorar Colección
              </router-link>
              <router-link 
                to="/how-it-works" 
                class="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all"
              >
                Cómo Funciona
              </router-link>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Controles del carrusel con animación -->
    <div class="absolute bottom-8 left-0 right-0 z-10">
      <div class="container mx-auto px-6">
        <div class="flex justify-center items-center space-x-3">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="{'bg-white w-6': currentSlide === index, 'bg-white/30 w-3': currentSlide !== index}"
            aria-label="Ir a slide"
          ></button>
        </div>
      </div>
    </div>

    <!-- Flechas de navegación con efecto hover -->
    <button 
      @click="prevSlide"
      class="hidden md:block absolute left-6 top-1/2 z-10 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-all"
      aria-label="Slide anterior"
    >
      <div class="relative">
        <div class="absolute inset-0 bg-white/10 rounded-full scale-75 hover:scale-100 opacity-0 hover:opacity-100 transition-all duration-300"></div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </button>
    <button 
      @click="nextSlide"
      class="hidden md:block absolute right-6 top-1/2 z-10 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-all"
      aria-label="Siguiente slide"
    >
      <div class="relative">
        <div class="absolute inset-0 bg-white/10 rounded-full scale-75 hover:scale-100 opacity-0 hover:opacity-100 transition-all duration-300"></div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentSlide = ref(0);
const currentDirection = ref('next');
const isHovering = ref(false);

const slides = [
  {
    title: "Alquila el",
    highlight: "Estilo que Deseas",
    description: "Prendas exclusivas de diseñador para tus ocasiones especiales."
  },
  {
    title: "Nueva",
    highlight: "Colección Verano",
    description: "Descubre las últimas tendencias en moda premium para alquilar."
  },
  {
    title: "Viste como",
    highlight: "Nunca Antes",
    description: "Cambia de look cada semana sin compromisos a largo plazo."
  }
];

let slideInterval;

const nextSlide = () => {
  currentDirection.value = 'next';
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentDirection.value = 'prev';
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
  currentDirection.value = index > currentSlide.value ? 'next' : 'prev';
  currentSlide.value = index;
};

const startCarousel = () => {
  slideInterval = setInterval(() => {
    if (!isHovering.value) {
      nextSlide();
    }
  }, 5000);
};

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style>
/* Animaciones personalizadas para el carrusel */
.enter-next {
  animation: enterNext 1s ease-out forwards;
}
.leave-next {
  animation: leaveNext 1s ease-out forwards;
}
.enter-prev {
  animation: enterPrev 1s ease-out forwards;
}
.leave-prev {
  animation: leavePrev 1s ease-out forwards;
}

@keyframes enterNext {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes leaveNext {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@keyframes enterPrev {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes leavePrev {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(30px);
  }
}

/* Efecto parallax para imágenes */
.transform {
  transition: transform 1.2s cubic-bezier(0.25, 0.45, 0.45, 0.95);
}
</style>