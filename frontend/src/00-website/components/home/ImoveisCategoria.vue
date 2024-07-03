<template>
  <section class="categorias-home">
    <h2>Imóveis por Categoria</h2>
    <div class="buttons-container-home">
      <button class="categoria-btn-home active" @click="carregarImoveisPorCategoria('Casa')">Casa</button>
      <button class="categoria-btn-home" @click="carregarImoveisPorCategoria('Apartamento')">Apartamento</button>
      <button class="categoria-btn-home" @click="carregarImoveisPorCategoria('Lote')">Lote</button>
      <button class="categoria-btn-home" @click="carregarImoveisPorCategoria('Kitnet')">Kitnet</button>
    </div>
    <div class="cards-container-home">
      <div id="categoriaContainer" class="cards-home"></div>
    </div>
    <div class="ver-todos-container-home">
      <button class="ver-todos-btn-home" @click="verTodosImoveis">Ver todos</button>
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
