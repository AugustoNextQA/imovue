<template>
  <section class="categorias">
    <h2>Imóveis por Categoria</h2>
    <div class="buttons-container">
      <button class="categoria-btn active" @click="carregarImoveisPorCategoria('Casa')">Casa</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Apartamento')">Apartamento</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Lote')">Lote</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Kitnet')">Kitnet</button>
    </div>
    <div class="cards-container">
      <div id="categoriaContainer" class="cards"></div>
    </div>
    <div class="ver-todos-container">
      <button class="ver-todos-btn" @click="verTodosImoveis">Ver todos</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisCategoria',
  methods: {
    carregarImoveisPorCategoria(categoria) {
      // Implement your carregar imoveis logic here
    },

    verTodosImoveis() {
      // Implement your ver todos imoveis logic here
    },
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
