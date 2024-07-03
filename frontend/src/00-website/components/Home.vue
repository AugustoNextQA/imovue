<template>
  <section class="home-section">
    <div id="spinner" class="spinner-home" style="display: none;">
      <div class="double-bounce1-home"></div>
      <div class="double-bounce2-home"></div>
      <div class="double-bounce3-home"></div>
    </div>
    <Search />
    <ImoveisDestaque />
    <ImoveisBuscados />
    <ImoveisCategoria />
    <Contact :showContactInfo="false" />
  </section>
</template>

<script>
import Search from './home/Search.vue';
import ImoveisDestaque from './home/ImoveisDestaque.vue';
import ImoveisBuscados from './home/ImoveisBuscados.vue';
import ImoveisCategoria from './home/ImoveisCategoria.vue';
import Contact from './Contact.vue';

export default {
  name: 'Home',
  components: {
    Search,
    ImoveisDestaque,
    ImoveisBuscados,
    ImoveisCategoria,
    Contact
  },
  methods: {

  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
