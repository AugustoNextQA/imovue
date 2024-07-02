<template>
  <section class="home" id="home">
    <div id="spinner" class="spinner" style="display: none;">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="search">
      <img class="search__img" src="@/assets/imagens/home/fundo.jpg" alt="fundo" />
      <form class="search__form">
        <div class="form__tab_container">
          <button type="button" id="comprar-select" class="form__tab-button active" @click="toggleTab('comprar')" value="Venda">Comprar</button>
          <button type="button" id="alugar-select" class="form__tab-button" @click="toggleTab('alugar')" value="Aluguel">Alugar</button>
        </div>

        <div class="form__select" @click="toggleDisplayTiposImoveis">
          <span id="selected-imovel" value="">Todos imóveis</span><span class="icon"></span>

          <ul id="drop-imovel" class="suggestions">
            <li class="selectable-option" @click="selectImovel('Todos imóveis')">Todos imóveis</li>
            <li class="selectable-option" @click="selectImovel('Casa')">Casa</li>
            <li class="selectable-option" @click="selectImovel('Apartamento')">Apartamento</li>
            <li class="selectable-option" @click="selectImovel('Kitnet')">Kitnet</li>
            <li class="selectable-option" @click="selectImovel('Lote')">Lote</li>
          </ul>
        </div>

        <div class="input-container">
          <input type="text" class="form__input" name="cidade" placeholder="Cidade" id="cidade_input" @click="searchCidades" @input="searchCidades" autocomplete="off" />
          <button type="button" class="clear-btn" @click="clearInput('cidade_input')">&times;</button>
          <div id="cidadeSuggestions" class="suggestions"></div>
        </div>

        <div class="input-container">
          <input type="text" class="form__input" name="bairro" placeholder="Bairro" id="bairro_input" @click="searchBairros" @input="searchBairros" autocomplete="off" />
          <button type="button" class="clear-btn" @click="clearInput('bairro_input')">&times;</button>
          <div id="bairroSuggestions" class="suggestions"></div>
        </div>

        <button type="button" class="form__submit-btn">
          <img src="@/assets/imagens/lupa.png" alt="Buscar">
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
            <input type="text" name="assunto" id="assunto" required placeholder="Digite o assunto" class="input-field" />
          </div>

          <div class="input-wrapper">
            <label for="message">Messagem*</label>
            <textarea name="message" id="mensagem" required placeholder="Digite sua mensagem" class="input-field"></textarea>
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
  methods: {
    toggleTab(tab) {
      // Implement your toggle tab logic here
    },
    toggleDisplayTiposImoveis() {
      // Implement your toggle display logic here
    },
    selectImovel(imovel) {
      // Implement your select imovel logic here
    },
    searchCidades() {
      // Implement your search cidades logic here
    },
    searchBairros() {
      // Implement your search bairros logic here
    },
    clearInput(inputId) {
      document.getElementById(inputId).value = '';
    },
    carregarImoveisPorCategoria(categoria) {
      // Implement your carregar imoveis logic here
    },
    verTodosImoveis() {
      // Implement your ver todos imoveis logic here
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/website/home.css';
</style>
