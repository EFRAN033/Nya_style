import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Wishlist from '../views/Wishlist.vue';
import Rent from '../views/Rent.vue';
import Designers from '../views/Designers.vue';
import Occasions from '../views/Occasions.vue';
import Discover from '../views/Discover.vue';
import AddProductForm from '../views/AddProductForm.vue'; // <-- Importamos el nuevo componente

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
  // NUEVA RUTA PARA EL FORMULARIO DE AÑADIR PRODUCTOS
  {
    path: '/dashboard-vendedor/add-product',
    name: 'AddProduct',
    component: AddProductForm,
    meta: {
      title: 'Añadir Producto | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor' // Esta ruta es solo para vendedores
    }
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
  document.title = to.meta.title || 'VisteteYA';

  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('user_role'); // Obtenemos el rol del usuario

  // 1. Si el destino es la página de login o registro, SIEMPRE permitir la navegación
  if (to.name === 'login' || to.name === 'register') {
    next();
    return;
  }

  // 2. Si la ruta requiere autenticación Y el usuario NO está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  // 3. Si la ruta requiere un rol específico Y el rol del usuario NO COINCIDE
  if (to.meta.role && userRole !== to.meta.role) {
    // Si el usuario está autenticado pero no tiene el rol correcto
    if (isAuthenticated) {
      // Podrías redirigir a una página de "Acceso Denegado" o a la página principal
      alert('Acceso denegado. No tienes los permisos necesarios para esta sección.');
      next('/');
    } else {
      // Si no está autenticado, simplemente lo enviamos al login
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
    return;
  }

  // 4. Si todas las verificaciones pasan, permitir la navegación
  next();
});
// --- FIN DE LAS MODIFICACIONES router.beforeEach ---

export default router;