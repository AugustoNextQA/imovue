<template>
  <section class="imoveis">
    <div id="imoveis-spinner" class="imoveis-spinner" style="display: none;">
      <div class="imoveis-double-bounce1"></div>
      <div class="imoveis-double-bounce2"></div>
      <div class="imoveis-double-bounce3"></div>
    </div>
    <div class="imoveis-content-container">
      <div class="imoveis-header-search">
        <div class="imoveis-search-container">
          <input type="text" class="imoveis-search-bar" placeholder="Pesquisar" @input="searchImoveis" @click="toggleClearButton">
          <div class="imoveis-clear-button-container" style="display: none;" @click="clearSearchBar">
            <button class="imoveis-clear-button">&times;</button>
          </div>
          <button class="imoveis-search-button" @click="applySearch">
            <img src="@/00-website/assets/imagens/lupa.png" alt="Buscar">
          </button>
        </div>
        <div id="imoveis-searchResults" class="imoveis-search-results"></div>
        <button class="imoveis-filter-button" @click="toggleFilters">Filtros</button>
      </div>
      <div class="imoveis-header-filtros">
        <h1 class="titulo"></h1>
        <div id="imoveis-filters" class="imoveis-orderDropdown">
          <button id="imoveis-dropbtn" class="imoveis-dropbtn" @click="toggleDropdown('imoveis-dropdown-content')">Ordenar</button>
          <div id="imoveis-dropdown-content" class="imoveis-orderDropdown-content" style="display: none;">
            <button id="imoveis-menor-valor" @click="changeOrder('menor-valor')">menor valor</button>
            <button id="imoveis-maior-valor" @click="changeOrder('maior-valor')">maior valor</button>
          </div>
        </div>
      </div>
      <div class="imoveis-cards" id="imoveis-container">
        <!-- Os imóveis serão adicionados aqui dinamicamente -->
      </div>
      <div class="imoveis-pagination">
        <div class="imoveis-custom-select">
          <button id="imoveis-btn-page-number" class="imoveis-page-number" @click="toggleDropdown('imoveis-pagination-content')">20</button>
          <div id="imoveis-pagination-content" class="imoveis-paginationDropdown-content" style="display: none;">
            <button @click="changeItemsPerPage(20)">20</button>
            <button @click="changeItemsPerPage(50)">50</button>
            <button @click="changeItemsPerPage(100)">100</button>
          </div>
        </div>
        <div class="imoveis-btn-pagination">
          <button class="imoveis-btn-navigation" @click="previousPage" disabled>&#60;</button>
          <span id="imoveis-currentPageIndicator">1</span>
          <button class="imoveis-btn-navigation" @click="nextPage">&#62;</button>
        </div>
      </div>
    </div>

    <!-- Painel de Filtros -->
    <div id="imoveis-filterPanel" class="imoveis-filter-panel">
      <div class="imoveis-header-filter">
        <h2>Filtrar Imóveis</h2>
        <button class="imoveis-close-button" @click="toggleFilters">X</button>
      </div>
      <div class="imoveis-filters">
        <div class="imoveis-filter-group">
          <h3>Valor do imóvel</h3>
          <div class="imoveis-value-range">
            <div>
              <label for="imoveis-min-value">Mínimo</label>
              <input type="text" id="imoveis-min-value" placeholder="R$ 0,00" @input="formatCurrency">
            </div>
            <div>
              <label for="imoveis-max-value">Máximo</label>
              <input type="text" id="imoveis-max-value" placeholder="R$ 100.000,00" @input="formatCurrency">
            </div>
          </div>
        </div>
        <div class="imoveis-filter-group">
          <h3>Tipos de imóvel</h3>
          <div class="imoveis-filter-options">
            <label><input type="checkbox" class="imoveis-checkbox" name="tipo" value="Apartamento"> Apartamento</label>
            <label><input type="checkbox" class="imoveis-checkbox" name="tipo" value="Casa"> Casa</label>
            <label><input type="checkbox" class="imoveis-checkbox" name="tipo" value="Lote"> Lote</label>
            <label><input type="checkbox" class="imoveis-checkbox" name="tipo" value="Kitnet"> Kitnet</label>
          </div>
        </div>
        <div class="imoveis-filter-group">
          <h3>Quartos</h3>
          <div class="imoveis-filter-options">
            <button type="button" class="imoveis-filter-option" data-quartos="1" @click="selectOption">1</button>
            <button type="button" class="imoveis-filter-option" data-quartos="2" @click="selectOption">2</button>
            <button type="button" class="imoveis-filter-option" data-quartos="3" @click="selectOption">3</button>
            <button type="button" class="imoveis-filter-option" data-quartos="4+" @click="selectOption">4+</button>
          </div>
        </div>
        <div class="imoveis-filter-group">
          <h3>Vagas</h3>
          <div class="imoveis-filter-options">
            <button type="button" class="imoveis-filter-option" data-vagas="1" @click="selectOption">1</button>
            <button type="button" class="imoveis-filter-option" data-vagas="2+" @click="selectOption">2+</button>
            <button type="button" class="imoveis-filter-option" data-vagas="Indiferente" @click="selectOption">Indiferente</button>
          </div>
        </div>
        <div class="imoveis-filter-group">
          <h3>Banheiros</h3>
          <div class="imoveis-filter-options">
            <button type="button" class="imoveis-filter-option" data-banheiros="1" @click="selectOption">1</button>
            <button type="button" class="imoveis-filter-option" data-banheiros="2" @click="selectOption">2</button>
            <button type="button" class="imoveis-filter-option" data-banheiros="3" @click="selectOption">3</button>
            <button type="button" class="imoveis-filter-option" data-banheiros="4+" @click="selectOption">4+</button>
          </div>
        </div>

        <div class="imoveis-filter-group">
          <h3>Área</h3>
          <div class="imoveis-area-range">
            <div>
              <label for="imoveis-min-area">Mínima</label>
              <input type="text" id="imoveis-min-area" placeholder="0 m²" @input="formatArea">
            </div>
            <div>
              <label for="imoveis-max-area">Máxima</label>
              <input type="text" id="imoveis-max-area" placeholder="1000 m²" @input="formatArea">
            </div>
          </div>
        </div>
        <div class="imoveis-filter-actions">
          <button type="reset" class="imoveis-filter-reset" @click="resetOptions">Limpar</button>
          <button type="button" class="imoveis-filter-submit" @click="applyFilters">Ver imóveis</button>
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
@import '@/00-website/assets/css/imoveis.css';
</style>
