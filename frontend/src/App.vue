<template>
  <div id="app">
    <Header v-if="showHeaderAndFooter" />
    <router-view />
    <Footer v-if="showHeaderAndFooter" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './00-website/components/Header.vue'
import Footer from './00-website/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const route = useRoute()
    const showHeaderAndFooter = computed(() => route.name !== 'Login')
    return { showHeaderAndFooter }
  }
}
</script>

<style>
/* Global styles here */
</style>
