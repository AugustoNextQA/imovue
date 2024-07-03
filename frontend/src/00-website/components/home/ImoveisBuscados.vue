<template>
  <section class="mais-acessados-home">
    <h2>Imóveis mais buscados</h2>
    <div class="cards-container-home">
      <button class="nav acessadosPrev">❮</button>
      <div id="acessadosContainer" class="cards-home"></div>
      <button class="nav acessadosNext">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisBuscados',
  methods: {

  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
