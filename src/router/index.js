import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Wishlist from '../views/Wishlist.vue';
import Rent from '../views/Rent.vue';
import Designers from '../views/Designers.vue';
import Occasions from '../views/Occasions.vue';
import Discover from '../views/Discover.vue'; // 

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
    path: '/occasions',
    name: 'occasions',
    component: Occasions,
    meta: {
      title: 'Ocasiones | VisteteYA'
    }
  },
  {
    path: '/discover', 
    name: 'discover',
    component: Discover,
    meta: {
      title: 'Descubrir | VisteteYA'
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
      guestOnly: true // Mantener para futuras implementaciones
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Registrarse | VisteteYA',
      guestOnly: true // Mantener para futuras implementaciones
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

// --- MODIFICACIONES EN router.beforeEach ---
router.beforeEach((to, from, next) => {
  // Opcional: console.log para ver el flujo (puedes quitarlos después)
  console.log('--- router.beforeEach INICIADO ---');
  console.log('Navegando DE:', from.fullPath, 'HACIA:', to.fullPath);
  document.title = to.meta.title || 'VisteteYA';

  // Si el destino es la página de login o registro, SIEMPRE permitir la navegación
  // Esto es útil cuando no tienes un backend de autenticación activo
  if (to.name === 'login' || to.name === 'register') {
    console.log('Permitido: Navegando a login/register (ignoring auth state for frontend dev).');
    next();
    console.log('--- router.beforeEach FINALIZADO (permitido a login/register) ---');
    return;
  }

  // Lógica de autenticación original (solo si no es login/register)
  const isAuthenticated = localStorage.getItem('authToken');
  console.log('¿Hay authToken en localStorage? (isAuthenticated):', !!isAuthenticated);
  console.log('Meta de la ruta de destino (to.meta):', to.meta);


  // Si la ruta requiere autenticación Y el usuario NO está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn('GUARD: Bloqueado. Ruta requiere autenticación y usuario NO autenticado.');
    console.log('Redirigiendo a login con query param "redirect".');
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    console.log('--- router.beforeEach FINALIZADO (redirección por requiresAuth) ---');
    return;
  }

  // Si llegamos aquí, se permite la navegación para el resto de rutas
  console.log('Permitido: Continuando navegación (otras rutas).');
  next();
  console.log('--- router.beforeEach FINALIZADO (continuado normalmente) ---');
});
// --- FIN DE LAS MODIFICACIONES router.beforeEach ---

export default router;