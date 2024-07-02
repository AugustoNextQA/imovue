<template>
  <section class="imoveis">
    <div id="spinner" class="spinner" style="display: none;">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="content-container">
      <div class="header-search">
        <div class="search-container">
          <input type="text" class="search-bar" placeholder="Pesquisar" @input="searchImoveis" @click="toggleClearButton">
          <div class="clear-button-container" style="display: none;" @click="clearSearchBar">
            <button class="clear-button">&times;</button>
          </div>
          <button class="search-button" @click="applySearch">
            <img src="@/assets/lupa.png" alt="Buscar">
          </button>
        </div>
        <div id="searchResults" class="search-results"></div>
        <button class="filter-button" @click="toggleFilters">Filtros</button>
      </div>
      <div class="header-filtros">
        <h1 class="titulo"></h1>
        <div id="filters" class="orderDropdown">
          <button id="dropbtn" class="dropbtn" @click="toggleDropdown('dropdown-content')">Ordenar</button>
          <div id="dropdown-content" class="orderDropdown-content" style="display: none;">
            <button id="menor-valor" @click="changeOrder('menor-valor')">menor valor</button>
            <button id="maior-valor" @click="changeOrder('maior-valor')">maior valor</button>
          </div>
        </div>
      </div>
      <div class="cards" id="imoveis-container">
        <!-- Os imóveis serão adicionados aqui dinamicamente -->
      </div>
      <div class="pagination">
        <div class="custom-select">
          <button id="btn-page-number" class="page-number" @click="toggleDropdown('pagination-content')">20</button>
          <div id="pagination-content" class="paginationDropdown-content" style="display: none;">
            <button @click="changeItemsPerPage(20)">20</button>
            <button @click="changeItemsPerPage(50)">50</button>
            <button @click="changeItemsPerPage(100)">100</button>
          </div>
        </div>
        <div class="btn-pagination">
          <button class="btn-navigation" @click="previousPage" disabled>&#60;</button>
          <span id="currentPageIndicator">1</span>
          <button class="btn-navigation" @click="nextPage">&#62;</button>
        </div>
      </div>
    </div>

    <!-- Painel de Filtros -->
    <div id="filterPanel" class="filter-panel">
      <div class="header-filter">
        <h2>Filtrar Imóveis</h2>
        <button class="close-button" @click="toggleFilters">X</button>
      </div>
      <div class="filters">
        <div class="filter-group">
          <h3>Valor do imóvel</h3>
          <div class="value-range">
            <div>
              <label for="min-value">Mínimo</label>
              <input type="text" id="min-value" placeholder="R$ 0,00" @input="formatCurrency">
            </div>
            <div>
              <label for="max-value">Máximo</label>
              <input type="text" id="max-value" placeholder="R$ 100.000,00" @input="formatCurrency">
            </div>
          </div>
        </div>
        <div class="filter-group">
          <h3>Tipos de imóvel</h3>
          <div class="filter-options">
            <label><input type="checkbox" class="checkbox" name="tipo" value="Apartamento"> Apartamento</label>
            <label><input type="checkbox" class="checkbox" name="tipo" value="Casa"> Casa</label>
            <label><input type="checkbox" class="checkbox" name="tipo" value="Lote"> Lote</label>
            <label><input type="checkbox" class="checkbox" name="tipo" value="Kitnet"> Kitnet</label>
          </div>
        </div>
        <div class="filter-group">
          <h3>Quartos</h3>
          <div class="filter-options">
            <button type="button" class="filter-option" data-quartos="1" @click="selectOption">1</button>
            <button type="button" class="filter-option" data-quartos="2" @click="selectOption">2</button>
            <button type="button" class="filter-option" data-quartos="3" @click="selectOption">3</button>
            <button type="button" class="filter-option" data-quartos="4+" @click="selectOption">4+</button>
          </div>
        </div>
        <div class="filter-group">
          <h3>Vagas</h3>
          <div class="filter-options">
            <button type="button" class="filter-option" data-vagas="1" @click="selectOption">1</button>
            <button type="button" class="filter-option" data-vagas="2+" @click="selectOption">2+</button>
            <button type="button" class="filter-option" data-vagas="Indiferente" @click="selectOption">Indiferente</button>
          </div>
        </div>
        <div class="filter-group">
          <h3>Banheiros</h3>
          <div class="filter-options">
            <button type="button" class="filter-option" data-banheiros="1" @click="selectOption">1</button>
            <button type="button" class="filter-option" data-banheiros="2" @click="selectOption">2</button>
            <button type="button" class="filter-option" data-banheiros="3" @click="selectOption">3</button>
            <button type="button" class="filter-option" data-banheiros="4+" @click="selectOption">4+</button>
          </div>
        </div>

        <div class="filter-group">
          <h3>Área</h3>
          <div class="area-range">
            <div>
              <label for="min-area">Mínima</label>
              <input type="text" id="min-area" placeholder="0 m²" @input="formatArea">
            </div>
            <div>
              <label for="max-area">Máxima</label>
              <input type="text" id="max-area" placeholder="1000 m²" @input="formatArea">
            </div>
          </div>
        </div>
        <div class="filter-actions">
          <button type="reset" class="filter-reset" @click="resetOptions">Limpar</button>
          <button type="button" class="filter-submit" @click="applyFilters">Ver imóveis</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Imoveis',
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
    toggleFilters() {
      // Implement toggle filters logic here
    },
    toggleDropdown(id) {
      // Implement toggle dropdown logic here
    },
    changeOrder(order) {
      // Implement change order logic here
    },
    changeItemsPerPage(items) {
      // Implement change items per page logic here
    },
    previousPage() {
      // Implement previous page logic here
    },
    nextPage() {
      // Implement next page logic here
    },
    formatCurrency(event) {
      // Implement format currency logic here
    },
    selectOption(event) {
      // Implement select option logic here
    },
    formatArea(event) {
      // Implement format area logic here
    },
    resetOptions() {
      // Implement reset options logic here
    },
    applyFilters() {
      // Implement apply filters logic here
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/website/imoveis.css';
</style>
