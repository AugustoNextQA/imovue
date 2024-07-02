<template>
  <section class="gestaoImoveis">
    <div id="spinner" class="spinner" v-show="spinnerVisible">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="container">
      <div class="header">
        <span>Imóveis Cadastrados</span>
      </div>

      <div class="header-search">
        <div class="search-container">
          <input type="text" class="search-bar" placeholder="Pesquisar" @input="searchImoveis"
            @click="toggleClearButton">
          <div class="clear-button-container" v-show="clearButtonVisible" @click="clearSearchBar">
            <button class="clear-button">&times;</button>
          </div>
          <button class="search-button" @click="applySearch">
            <img src="@/00-website/assets/imagens/lupa.png" alt="Buscar">
          </button>
        </div>
        <div id="searchResults" class="search-results"></div>
        <div class="button-header">
          <button id="visitasBtn" @click="verVisitantes">Ver visitantes</button>
          <button id="new" @click="cadastrarNovoImovel">Cadastrar novo imóvel</button>
        </div>
      </div>

      <div class="divTable">
        <table>
          <thead>
            <tr>
              <th @click="changeOrder('id_imovel')">
                <div class="id_imovel">ID<span class="icon"></span></div>
              </th>
              <th @click="changeOrder('categoria')">
                <div class="categoria">Categoria<span class="icon"></span></div>
              </th>
              <th @click="changeOrder('rua')">
                <div class="endereco">Endereço<span class="icon"></span></div>
              </th>
              <th @click="changeOrder('valor')">
                <div class="valor">Valor<span class="icon"></span></div>
              </th>
              <th class="publicar">Publicar</th>
              <th class="destaque">Destaque</th>
              <th class="acao">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody id="imoveisTableBody">
            <!-- Linhas da tabela vão aqui -->
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <div class="custom-select">
          <button id="btn-page-number" class="page-number" @click="toggleDropdown('pagination-content')">20</button>
          <div id="pagination-content" class="paginationDropdown-content">
            <button @click="changeItemsPerPage(20)">20</button>
            <button @click="changeItemsPerPage(50)">50</button>
            <button @click="changeItemsPerPage(100)">100</button>
          </div>
        </div>
        <div class="btn-pagination">
          <button class="btn-navigation" @click="previousPage" :disabled="!canPreviousPage">&#60;</button>
          <span id="currentPageIndicator">{{ currentPage }}</span>
          <button class="btn-navigation" @click="nextPage" :disabled="!canNextPage">&#62;</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GestaoImoveis',
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
    searchImoveis(event) {
      // Implement search logic here
    },
    toggleClearButton() {
      // Implement clear button toggle logic here
    },
    clearSearchBar() {
      // Implement clear search bar logic here
    },
    applySearch() {
      // Implement apply search logic here
    },
    verVisitantes() {
      // Implementar lógica para ver visitantes
    },
    cadastrarNovoImovel() {
      // Implementar lógica para cadastrar novo imóvel
    },
    changeOrder(order) {
      // Implementar lógica para mudar a ordem
    },
    changeItemsPerPage(items) {
      // Implementar lógica para mudar itens por página
    },
    previousPage() {
      // Implementar lógica para página anterior
    },
    nextPage() {
      // Implementar lógica para próxima página
    },
    toggleDropdown(id) {
      // Implementar lógica para mostrar/ocultar dropdown
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/admin/gestaoImoveis.css';
</style>
