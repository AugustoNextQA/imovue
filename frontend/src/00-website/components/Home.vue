<template>
  <section class="home" id="home">
    <div id="spinner" class="spinner" style="display: none;">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
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
