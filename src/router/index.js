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
import Orders from '../views/seller/Orders.vue'; 
import Articles from '../views/seller/Articles.vue'; 
import Configuration from '../views/seller/Configuration.vue'; 
// --- NUEVA IMPORTACIÓN PARA EL PERFIL DEL CLIENTE ---
import MyProfile from '../views/myprofile.vue'; // Asegúrate de que esta ruta sea correcta
// --- FIN NUEVA IMPORTACIÓN ---

// --- ¡Nuevas Importaciones para el Panel de Administración! ---
import AdminDashboardLayout from '../views/admin/AdminDashboardLayout.vue';
import ImageManagement from '../views/admin/ImageManagement.vue'; 
import Settings from '../views/admin/Settings.vue';
import SupplierApprovals from '../views/admin/SupplierApprovals.vue';
// --- Fin Nuevas Importaciones ---

// --- NUEVA IMPORTACIÓN PARA Buy.vue ---
import Buy from '../views/Buy.vue'; 
// --- FIN NUEVA IMPORTACIÓN ---

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
  // --- NUEVA RUTA PARA Buy.vue ---
  {
    path: '/buy/:productId',
    name: 'Buy',
    component: Buy,
    props: true, // Esto permite que el productId se pase como una prop al componente Buy.vue
    meta: {
      title: 'Comprar/Alquilar Producto | VisteteYA',
      requiresAuth: true // Asume que la compra/alquiler requiere autenticación
    }
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
  {
    path: '/dashboard-vendedor/pedidos', 
    name: 'SellerOrders', 
    component: Orders, 
    meta: {
      title: 'Mis Pedidos | Panel Vendedor',
      requiresAuth: true,
      role: 'vendedor'
    }
  },
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
  // --- NUEVA RUTA PARA EL PERFIL DEL CLIENTE ---
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile,
    meta: {
      title: 'Mi Perfil | VisteteYA',
      requiresAuth: true,
      role: 'cliente' // Asegura que solo los clientes puedan acceder a esta ruta
    }
  },
  // --- FIN NUEVA RUTA ---
  // --- ¡Nuevas Rutas para el Panel de Administración! ---
  {
    path: '/admin',
    name: 'admin-dashboard', // Nombre de la ruta principal del panel admin
    component: AdminDashboardLayout,
    meta: { requiresAuth: true, role: 'admin', title: 'Panel Admin | VisteteYA' },
    children: [
      {
        path: 'images', // Ruta completa sería /admin/images
        name: 'admin-images',
        component: ImageManagement,
        meta: { requiresAuth: true, role: 'admin', title: 'Gestión de Imágenes | Admin' },
      },
      {
        path: 'settings', // Ruta completa sería /admin/settings
        name: 'admin-settings',
        component: Settings,
        meta: { requiresAuth: true, role: 'admin', title: 'Configuraciones | Admin' },
      },
      {
        path: 'suppliers', // Ruta completa sería /admin/suppliers
        name: 'admin-suppliers',
        component: SupplierApprovals,
        meta: { requiresAuth: true, role: 'admin', title: 'Aprobaciones de Proveedores | Admin' },
      },
      // Opcional: una sub-ruta por defecto para /admin/
      {
        path: '', // Si alguien va a /admin sin sub-ruta, redirige a una por defecto
        redirect: { name: 'admin-images' } // Puedes cambiar esto a la que quieras que sea la página de inicio del admin
      }
    ]
  },
  // --- Fin Nuevas Rutas ---
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
  const userRole = localStorage.getItem('user_role'); // Asegúrate de que este valor esté presente en localStorage después del login

  // Si se va a la página de login o registro, permite el acceso
  if (to.name === 'login' || to.name === 'register') {
    next();
    return;
  }

  // Verifica si la ruta requiere autenticación y si el usuario no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  // Verifica si la ruta requiere un rol específico y si el usuario no tiene ese rol
  // Esta parte ya está bastante bien en tu código, solo asegúrate de que 'user_role' se guarde correctamente.
  if (to.meta.role && userRole !== to.meta.role) {
    if (isAuthenticated) {
      alert('Acceso denegado. No tienes los permisos necesarios para esta sección.');
      next('/'); // Redirige a la página de inicio o a una de "Acceso Denegado"
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }
    return;
  }

  next(); // Permite la navegación
});

export default router;