<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <HeroSection />
    <ProductList :products="products" />
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import ProductList from './ProductList.vue'

export default {
  components: {
    Header,
    HeroSection,
    Footer,
    ProductList
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Zapatillas Running',
          description: 'Zapatillas profesionales para corredores',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
          id: 2,
          name: 'Cámara DSLR',
          description: 'Cámara profesional 24.2MP con 4K',
          price: 599.99,
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
      ]
    }
  }
}
</script>