<template>
  <div class="relatorios-component">
    <section class="relatorios">
      <a>relatorios</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Relatorios',
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
