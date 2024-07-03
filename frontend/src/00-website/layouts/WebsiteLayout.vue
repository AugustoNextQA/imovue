<template>
  <div>
    <Header />
    <router-view />
    <Footer v-if="!$route.meta.hideFooter" />
  </div>
</template>

<script>
import Header from '@/00-website/components/Header.vue'
import Footer from '@/00-website/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/header.css';
@import '@/00-website/assets/css/footer.css';
</style>
