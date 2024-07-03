<template>
  <section class="destaques">
    <h2>Imóveis em destaque</h2>
    <div class="cards-container">
      <button class="nav destaquesPrev">❮</button>
      <div id="destaqueContainer" class="cards"></div>
      <button class="nav destaquesNext">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisDestaques',
  methods: {

  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
