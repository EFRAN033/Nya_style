import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Wishlist from '../views/Wishlist.vue';
import Rent from '../views/Rent.vue';
import Designers from '../views/Designers.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { 
      showProducts: true,
      title: 'Inicio | VisteteYA'
    }
  },
  {
    path: '/designers',
    name: 'designers',
    component: Designers,
    meta: { 
      title: 'Diseñadores | VisteteYA'
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props: true,
    meta: { 
      requiresProductData: true,
      title: 'Detalle Producto | VisteteYA'
    }
  },
  {
    path: '/product',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { 
      title: 'Iniciar Sesión | VisteteYA',
      guestOnly: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { 
      title: 'Registrarse | VisteteYA',
      guestOnly: true
    }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: Wishlist,
    meta: { 
      title: 'Mi Wishlist | VisteteYA',
      requiresAuth: true
    }
  },
  {
    path: '/rent/:productId',
    name: 'Rent',
    component: Rent,
    props: route => ({
      productId: route.params.productId,
      rentalType: route.query.rentalType || 'daily',
      productName: route.query.productName || ''
    }),
    meta: { 
      title: 'Proceso de Alquiler | VisteteYA',
      requiresAuth: true
    }
  },
  {
    path: '/rent',
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
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
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // Gestión de títulos
  document.title = to.meta.title || 'VisteteYA';

  // Verificación de autenticación
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;