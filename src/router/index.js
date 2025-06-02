import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Wishlist from '../views/Wishlist.vue'; // 👈 NUEVO

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { showProducts: true }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true,
    meta: { requiresProductData: true }
  },
  {
    path: '/product',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Iniciar Sesión | PideloYA' }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: 'Registrarse | PideloYA' }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist,
    meta: { title: 'Mi Wishlist | PideloYA' } // 👈 NUEVO
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
