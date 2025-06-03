<!-- Buy.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-rose-900 mb-6">Proceso de Compra</h1>
      <p>Estás comprando el producto con ID: {{ id }}</p>
      <!-- Aquí iría el formulario de compra -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Buy',
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
  </script>