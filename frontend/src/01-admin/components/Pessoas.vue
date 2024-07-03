<template>
  <div class="pessoas-component">
    <section class="pessoas">
      <a>pessoas</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Pessoas',
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
