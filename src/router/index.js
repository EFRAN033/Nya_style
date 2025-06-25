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
import AddProductForm from '../views/AddProductForm.vue';
// ¡IMPORTA Orders.vue desde la carpeta 'seller' aquí!
import Orders from '../views/seller/Orders.vue'; 
// Importa Articles.vue para la sección "Mis Artículos"
import Articles from '../views/seller/Articles.vue'; 
// Importa Configuration.vue para la sección de Configuración
import Configuration from '../views/seller/Configuration.vue'; 

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
    path: '/dashboard-vendedor/add-product',
    name: 'AddProduct',
    component: AddProductForm,
    meta: {
      title: 'Añadir Producto | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor'
    }
  },
  // RUTA PARA LOS PEDIDOS, apuntando al componente en la carpeta 'seller'
  {
    path: '/dashboard-vendedor/pedidos', 
    name: 'SellerOrders', 
    component: Orders, // ¡Aquí se usa el componente importado de views/seller!
    meta: {
      title: 'Mis Pedidos | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor'
    }
  },
  // Nueva ruta para "Mis Artículos"
  {
    path: '/dashboard-vendedor/mis-articulos',
    name: 'MyArticles', 
    component: Articles,
    meta: {
      title: 'Mis Artículos | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor'
    }
  },
  // Nueva ruta para "Configuración"
  {
    path: '/dashboard-vendedor/configuracion',
    name: 'SellerConfiguration', 
    component: Configuration, 
    meta: {
      title: 'Configuración | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor'
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'VisteteYA';

  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('user_role');

  if (to.name === 'login' || to.name === 'register') {
    next();
    return;
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  if (to.meta.role && userRole !== to.meta.role) {
    if (isAuthenticated) {
      alert('Acceso denegado. No tienes los permisos necesarios para esta sección.');
      next('/');
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
    return;
  }

  next();
});

export default router;