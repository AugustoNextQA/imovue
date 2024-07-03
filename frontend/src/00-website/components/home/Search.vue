<template>
  <section class="search-home">
    <img class="search__img-home" src="@/00-website/assets/imagens/home/fundo.jpg" alt="fundo" />
    <form class="search__form-home">
      <div class="form__tab_container-home">
        <button type="button" id="comprar-select" class="form__tab-button-home active" @click="toggleTab('comprar')"
          value="Venda">Comprar</button>
        <button type="button" id="alugar-select" class="form__tab-button-home" @click="toggleTab('alugar')"
          value="Aluguel">Alugar</button>
      </div>

      <div class="form__select-home" @click="toggleDisplayTiposImoveis">
        <span id="selected-imovel" value="">Todos imóveis</span><span class="icon-home"></span>

        <ul id="drop-imovel-home" class="suggestions-home" :class="{ show: displayTiposImoveis }">
          <li class="selectable-option-home" @click="selectImovel('Todos imóveis')">Todos imóveis</li>
          <li class="selectable-option-home" @click="selectImovel('Casa')">Casa</li>
          <li class="selectable-option-home" @click="selectImovel('Apartamento')">Apartamento</li>
          <li class="selectable-option-home" @click="selectImovel('Kitnet')">Kitnet</li>
          <li class="selectable-option-home" @click="selectImovel('Lote')">Lote</li>
        </ul>
      </div>

      <div class="input-container-home">
        <input type="text" class="form__input-home" name="cidade" placeholder="Cidade" id="cidade_input"
          @click="searchCidades" @input="searchCidades" autocomplete="off" />
        <button type="button" class="clear-btn-home" @click="clearInput('cidade_input')">&times;</button>
        <div id="cidadeSuggestions-home" class="suggestions-home" :class="{ show: cidadeSuggestions.length > 0 }">
          <div v-for="cidade in cidadeSuggestions" :key="cidade" class="selectable-option-home"
            @click="selectSuggestionHome(cidade, 'cidade_input')">{{ cidade }}</div>
        </div>
      </div>

      <div class="input-container-home">
        <input type="text" class="form__input-home" name="bairro" placeholder="Bairro" id="bairro_input"
          @click="searchBairros" @input="searchBairros" autocomplete="off" />
        <button type="button" class="clear-btn-home" @click="clearInput('bairro_input')">&times;</button>
        <div id="bairroSuggestions-home" class="suggestions-home" :class="{ show: bairroSuggestions.length > 0 }">
          <div v-for="bairro in bairroSuggestions" :key="bairro" class="selectable-option-home"
            @click="selectSuggestionHome(bairro, 'bairro_input')">{{ bairro }}</div>
        </div>
      </div>

      <button type="button" class="form__submit-btn-home">
        <img src="@/00-website/assets/imagens/lupa.png" alt="Buscar">
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      cidadeSuggestions: [],
      bairroSuggestions: [],
      displayTiposImoveis: false,
    }
  },
  methods: {
    toggleTab(tab) {
      const alugarBtn = document.getElementById('alugar-select');
      const comprarBtn = document.getElementById('comprar-select');

      if (tab === 'alugar') {
        alugarBtn.classList.add('active');
        comprarBtn.classList.remove('active');
      } else {
        alugarBtn.classList.remove('active');
        comprarBtn.classList.add('active');
      }
    },

    toggleDisplayTiposImoveis() {
      this.displayTiposImoveis = !this.displayTiposImoveis;
    },

    selectImovel(imovel) {
      const selected = document.getElementById('selected-imovel');
      if (imovel === 'Todos imóveis') {
        selected.setAttribute('value', '');
      } else {
        selected.setAttribute('value', imovel);
      }
      selected.textContent = imovel;
    },

    async searchCidades(event) {
      const input = event.target;
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/cidades`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar cidades da API');
        }
        const data = await response.json();

        console.log('Dados recebidos da API:', data);

        if (!Array.isArray(data.cidades)) {
          throw new Error('Dados recebidos não são uma lista de cidades');
        }

        await this.displayCidadesResults(data.cidades, input.value);
        this.handleInput(input)

      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        await this.displayCidadesResults([], input.value);
      }
    },

    async displayCidadesResults(results, query) {
      this.cidadeSuggestions = [];

      const normalizedQuery = this.removeAccents(query.toLowerCase());
      const filteredResults = results.filter(cidade => {
        return this.removeAccents(cidade.toLowerCase()).includes(normalizedQuery);
      });

      this.cidadeSuggestions = filteredResults;
    },

    async searchBairros(event) {
      const input = event.target;
      const cidade = document.getElementById('cidade_input').value;
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/bairros?cidade=${encodeURIComponent(cidade)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar bairros da API');
        }
        const data = await response.json();

        console.log('Dados recebidos da API:', data);

        if (!Array.isArray(data.bairros)) {
          throw new Error('Dados recebidos não são uma lista de bairros');
        }

        await this.displayBairrosResults(data.bairros, input.value);
        this.handleInput(input)

      } catch (error) {
        console.error('Erro ao buscar bairros:', error);
        await this.displayBairrosResults([], input.value);
      }
    },

    async displayBairrosResults(results, query) {
      this.bairroSuggestions = [];

      const normalizedQuery = this.removeAccents(query.toLowerCase());
      const filteredResults = results.filter(bairro => {
        return this.removeAccents(bairro.toLowerCase()).includes(normalizedQuery);
      });

      this.bairroSuggestions = filteredResults;
    },

    handleInput(input) {
      const clearBtn = input.nextElementSibling;
      clearBtn.style.display = 'block';
    },

    clearInput(inputId) {
      this.closeSuggestionHome();
      const input = document.getElementById(inputId);
      input.value = '';
      const clearBtn = input.nextElementSibling;
      clearBtn.style.display = 'none';
      input.focus();
    },

    async selectSuggestionHome(suggestion, id_input) {
      document.getElementById(id_input).value = suggestion;
      this.closeSuggestionHome();
    },

    closeSuggestionHome() {
      this.cidadeSuggestions = [];
      this.bairroSuggestions = [];
    },

    removeAccents(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
