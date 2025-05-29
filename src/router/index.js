import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Product from '../views/Product.vue'; // Nombre consistente (en inglés)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { 
      showProducts: true // Bandera personalizada
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true,
    meta: {
      requiresProductData: true
    }
  },
  // Redirección opcional para manejar rutas sin ID
  {
    path: '/product',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Comportamiento mejorado de scroll
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // Offset para el header
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;