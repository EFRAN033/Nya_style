import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import router from './router'
import axios from 'axios' // Importa Axios

// --- Configuración base de Axios ---
// Crea una instancia de Axios para configurar el baseURL y los interceptores.
const api = axios.create({
  baseURL: import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_API_URL_LOCAL  // Tu URL local de backend
    : import.meta.env.VITE_APP_API_URL_PRODUCTION, // Tu URL de producción de backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor de Solicitudes de Axios ---
// Esto se ejecuta ANTES de que se envíe cada solicitud.
// Añade el token JWT al encabezado Authorization si existe en localStorage.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer'; // Asegura que el tipo de token sea 'Bearer' por defecto

    if (token) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejo de errores antes de enviar la solicitud (ej. problemas de configuración)
    return Promise.reject(error);
  }
);

// --- Interceptor de Respuestas de Axios ---
// Esto se ejecuta DESPUÉS de que se recibe una respuesta.
// Maneja errores 401 (Unauthorized) o 403 (Forbidden) limpiando el token y redirigiendo al login.
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devuelve
  (error) => {
    // Si hay un error y el estado es 401 o 403
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Authentication error (401/403). Clearing session and redirecting to login.');
      // Limpia todos los datos de sesión almacenados en localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenType');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_first_name');
      
      // Redirige al usuario a la página de login
      // router.push() es la forma programática de navegar con Vue Router
      router.push('/login'); 
    }
    // Para cualquier otro error, rechaza la promesa para que pueda ser capturada por el código que hizo la solicitud.
    return Promise.reject(error);
  }
);


const app = createApp(App)

app.use(router)

// Haz la instancia de Axios disponible globalmente en todos tus componentes
// Puedes acceder a ella como this.$axios en la Options API
// o importando 'api' directamente en la Composition API si lo exportas.
app.config.globalProperties.$axios = api

app.mount('#app')