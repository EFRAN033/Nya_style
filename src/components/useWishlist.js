// src/components/useWishlist.js
import { ref, watch } from 'vue';

const WISHLIST_STORAGE_KEY = 'wishlist-items';
// Asegúrate de que esta URL base sea correcta para tu backend
const BASE_URL_BACKEND = 'http://localhost:8000';

// Función auxiliar para convertir rutas relativas a URLs absolutas
const getFullImageUrl = (relativePath) => {
  if (!relativePath) return '';
  // Si ya es una URL absoluta, la devuelve tal cual
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  // Si es una ruta relativa, le añade la URL base del backend
  return `${BASE_URL_BACKEND}${relativePath}`;
};

// Inicializa la lista de deseos desde localStorage o un array vacío
const _wishlistItems = ref(JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]'));

// Observa cambios en _wishlistItems y guarda en localStorage automáticamente
watch(_wishlistItems, (newVal) => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true }); // 'deep: true' es crucial para observar cambios dentro de los objetos del array

export function useWishlist() {
  /**
   * Añade un producto a la lista de deseos.
   * @param {Object} product - El objeto producto tal como viene de la API o de Product.vue.
   */
  const addToWishlist = (product) => {
    // Verifica si el artículo ya existe para evitar duplicados
    const exists = _wishlistItems.value.some(item => item.id === product.product_id);
    if (!exists) {
      // Procesa las URLs de las imágenes para que sean absolutas antes de guardarlas
      const processedImages = [];
      if (product.image_urls && product.image_urls.length > 0) {
        product.image_urls.forEach(url => processedImages.push(getFullImageUrl(url)));
      } else if (product.imageUrl) {
        // Si solo hay una 'imageUrl' (string), la convierte y la añade como el primer elemento de un array
        processedImages.push(getFullImageUrl(product.imageUrl));
      }

      // Mapea el objeto product a la estructura que Wishlist.vue espera
      _wishlistItems.value.push({
        id: product.product_id, // Usar product_id como ID único
        name: product.name,
        images: processedImages, // ¡Ahora contiene URLs absolutas!
        size: product.variations && product.variations.length > 0 ? product.variations[0].size : null,
        color: product.variations && product.variations.length > 0 ? product.variations[0].color : null,
        canBuy: product.offer_types?.includes('venta') || product.offer_types?.includes('venta_alquiler'),
        buyPrice: product.price,
        canRent: product.offer_types?.includes('alquiler') || product.offer_types?.includes('venta_alquiler'),
        rentPrice: product.rental_details?.price_per_day,
        addedDate: new Date().toISOString(), // Guarda la fecha en formato ISO para fácil recuperación
      });
      console.log('Producto añadido a la lista de deseos:', product.name);
    } else {
      console.log('El producto ya está en la lista de deseos:', product.name);
    }
  };

  /**
   * Elimina un artículo de la lista de deseos por su ID.
   * @param {number} id - El ID del producto a eliminar.
   */
  const removeFromWishlist = (id) => {
    _wishlistItems.value = _wishlistItems.value.filter(item => item.id !== id);
  };

  /**
   * Vacía completamente la lista de deseos.
   */
  const clearWishlist = () => {
    _wishlistItems.value = [];
  };

  return {
    wishlistItems: _wishlistItems, // Exponemos la ref para que los componentes puedan reaccionar a los cambios
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}