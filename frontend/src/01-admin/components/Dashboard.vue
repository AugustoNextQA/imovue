<template>
  <div class="dashboard-component">
    <section class="dashboard">
      <a>Dashboard</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
