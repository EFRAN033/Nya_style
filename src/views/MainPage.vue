<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <HeroSection />
    <Product @send-products="setProducts" />
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import Product from './Product.vue'

export default {
  components: {
    Header,
    HeroSection,
    Footer,
    Product
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    setProducts(productos) {
      this.products = productos
    }
  }
}
</script>
