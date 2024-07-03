<template>
  <div class="chaves-component">
    <section class="chaves">
      <a>chaves</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Chaves',
  data() {
    return {
      spinnerVisible: false,
      clearButtonVisible: false,
      currentPage: 1,
      canPreviousPage: false,
      canNextPage: true,
      // outros dados do componente
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
