<template>
  <section class="home" id="home">
    <div id="spinner" class="spinner" style="display: none;">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="search">
      <img class="search__img" src="@/00-website/assets/imagens/home/fundo.jpg" alt="fundo" />
      <form class="search__form">
        <div class="form__tab_container">
          <button type="button" id="comprar-select" class="form__tab-button active" @click="toggleTab('comprar')"
            value="Venda">Comprar</button>
          <button type="button" id="alugar-select" class="form__tab-button" @click="toggleTab('alugar')"
            value="Aluguel">Alugar</button>
        </div>

        <div class="form__select" @click="toggleDisplayTiposImoveis">
          <span id="selected-imovel" value="">Todos imóveis</span><span class="icon"></span>

          <ul id="drop-imovel" class="suggestions" :class="{ show: displayTiposImoveis }">
            <li class="selectable-option" @click="selectImovel('Todos imóveis')">Todos imóveis</li>
            <li class="selectable-option" @click="selectImovel('Casa')">Casa</li>
            <li class="selectable-option" @click="selectImovel('Apartamento')">Apartamento</li>
            <li class="selectable-option" @click="selectImovel('Kitnet')">Kitnet</li>
            <li class="selectable-option" @click="selectImovel('Lote')">Lote</li>
          </ul>
        </div>

        <div class="input-container">
          <input type="text" class="form__input" name="cidade" placeholder="Cidade" id="cidade_input"
            @click="searchCidades" @input="searchCidades" autocomplete="off" />
          <button type="button" class="clear-btn" @click="clearInput('cidade_input')">&times;</button>
          <div id="cidadeSuggestions" class="suggestions" :class="{ show: cidadeSuggestions.length > 0 }">
            <div v-for="cidade in cidadeSuggestions" :key="cidade" class="selectable-option"
              @click="selectSuggestionHome(cidade, 'cidade_input')">{{ cidade }}</div>
            <div v-if="cidadeSuggestions.length === 0">Nenhuma cidade encontrada</div>
          </div>
        </div>

        <div class="input-container">
          <input type="text" class="form__input" name="bairro" placeholder="Bairro" id="bairro_input"
            @click="searchBairros" @input="searchBairros" autocomplete="off" />
          <button type="button" class="clear-btn" @click="clearInput('bairro_input')">&times;</button>
          <div id="bairroSuggestions" class="suggestions" :class="{ show: bairroSuggestions.length > 0 }">
            <div v-for="bairro in bairroSuggestions" :key="bairro" class="selectable-option"
              @click="selectSuggestionHome(bairro, 'bairro_input')">{{ bairro }}</div>
            <div v-if="bairroSuggestions.length === 0">Nenhum bairro encontrado</div>
          </div>
        </div>

        <button type="button" class="form__submit-btn">
          <img src="@/00-website/assets/imagens/lupa.png" alt="Buscar">
        </button>
      </form>
    </div>
  </section>

  <section class="destaques">
    <h2>Imóveis em destaque</h2>
    <div class="cards-container">
      <button class="nav destaquesPrev">❮</button>
      <div id="destaqueContainer" class="cards"></div>
      <button class="nav destaquesNext">❯</button>
    </div>
  </section>

  <section class="mais-acessados">
    <h2>Imóveis mais buscados</h2>
    <div class="cards-container">
      <button class="nav acessadosPrev">❮</button>
      <div id="acessadosContainer" class="cards"></div>
      <button class="nav acessadosNext">❯</button>
    </div>
  </section>

  <section class="categorias">
    <h2>Imóveis por Categoria</h2>
    <div class="buttons-container">
      <button class="categoria-btn active" @click="carregarImoveisPorCategoria('Casa')">Casa</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Apartamento')">Apartamento</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Lote')">Lote</button>
      <button class="categoria-btn" @click="carregarImoveisPorCategoria('Kitnet')">Kitnet</button>
    </div>
    <div class="cards-container">
      <div id="categoriaContainer" class="cards"></div>
    </div>
    <div class="ver-todos-container">
      <button class="ver-todos-btn" @click="verTodosImoveis">Ver todos</button>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="container">
      <div class="section-title">Fale Conosco</div>
      <p class="section-text">Gostou de algum imóvel? Mande-nos uma mensagem</p>

      <div class="contact-form-container">
        <form action="#" class="contact-form" id="email-form">
          <div class="half-width">
            <div class="input-wrapper">
              <label for="nome">Nome*</label>
              <input type="text" name="nome" id="nome" required placeholder="Digite seu nome" class="input-field" />
            </div>

            <div class="input-wrapper">
              <label for="email">Email*</label>
              <input type="text" name="email" id="email" required placeholder="Digite seu email" class="input-field" />
            </div>
          </div>

          <div class="input-wrapper">
            <label for="assunto">Assunto*</label>
            <input type="text" name="assunto" id="assunto" required placeholder="Digite o assunto"
              class="input-field" />
          </div>

          <div class="input-wrapper">
            <label for="message">Messagem*</label>
            <textarea name="message" id="mensagem" required placeholder="Digite sua mensagem"
              class="input-field"></textarea>
          </div>

          <button id="emailButton" type="submit" class="btn btn-primary">
            <span>Enviar Mensagem</span>
            <ion-icon name="paper-plane-outline"></ion-icon>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
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

      if (results.length === 0) {
        this.cidadeSuggestions.push('Nenhuma cidade encontrada');
        return;
      }

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

      if (results.length === 0) {
        this.bairroSuggestions.push('Nenhum bairro encontrado');
        return;
      }

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

    carregarImoveisPorCategoria(categoria) {
      // Implement your carregar imoveis logic here
    },

    verTodosImoveis() {
      // Implement your ver todos imoveis logic here
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
