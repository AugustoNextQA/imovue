<template>
  <section class="visitantes">
    <div id="spinner" class="spinner" v-show="spinnerVisible">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="container">
      <div class="header">
        <span>Visitantes</span>
        <div class="close-property" @click="closePage">X</div>
      </div>
      <div id="totalVisits" class="total-visits"></div>
      <div class="visit-dates" id="visitDates">
        <!-- Aqui serão adicionados dinamicamente os dias de visita -->
      </div>
      <div class="actions">
        <button id="deleteAllVisitors" class="delete-all" @click="excluirTodosVisitantes">Excluir todos os históricos</button>
        <button class="voltar" @click="closePage">Voltar</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Visitantes',
  data() {
    return {
      spinnerVisible: false,
      // outros dados do componente
    };
  },
  methods: {
    closePage() {
      // Implementar lógica para fechar a página
    },
    excluirTodosVisitantes() {
      // Implementar lógica para excluir todos os visitantes
    }
  }
}
</script>

<style scoped>
@import '@/01-admin/assets/css/visitantes.css';
</style>
