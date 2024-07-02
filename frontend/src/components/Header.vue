<template>
  <header class="header" data-header>
    <div class="container-header">
      <a class="logo">
        <img src="@/assets/imagens/logo.png" alt="AGAS Imóveis logo" />
      </a>

      <button class="menu-toggle-btn" data-nav-toggle-btn>
        <ion-icon name="menu-outline" class="icon-menu"></ion-icon>
        <ion-icon name="close-outline" class="icon-close"></ion-icon>
      </button>
    </div>

    <nav class="navbar">
      <ul class="navbar-list">
        <li>
          <div
            class="dropdown-header"
            @click="toggleDropHeader"
            @mouseover="showDropHeader"
            @mouseout="hideDropHeader"
          >
            <a class="drop-link">
              Comprar
              <span class="icon"></span>
            </a>
            <div id="drop-comprar" class="dropdown-header-content">
              <button @click="navBarSearchImoveis('Venda')">Todos imóveis</button>
              <button @click="navBarSearchImoveis('Venda', 'Casa')">Casas</button>
              <button @click="navBarSearchImoveis('Venda', 'Apartamento')">Apartamentos</button>
              <button @click="navBarSearchImoveis('Venda', 'Kitnet')">Kitnets</button>
              <button @click="navBarSearchImoveis('Venda', 'Lote')">Lotes</button>
            </div>
          </div>
        </li>
        <li>
          <div
            class="dropdown-header"
            @click="toggleDropHeader"
            @mouseover="showDropHeader"
            @mouseout="hideDropHeader"
          >
            <a class="drop-link">
              Alugar
              <span class="icon"></span>
            </a>
            <div id="drop-alugar" class="dropdown-header-content">
              <button @click="navBarSearchImoveis('Aluguel')">Todos imóveis</button>
              <button @click="navBarSearchImoveis('Aluguel', 'Casa')">Casas</button>
              <button @click="navBarSearchImoveis('Aluguel', 'Apartamento')">Apartamentos</button>
              <button @click="navBarSearchImoveis('Aluguel', 'Kitnet')">Kitnets</button>
              <button @click="navBarSearchImoveis('Aluguel', 'Lote')">Lotes</button>
            </div>
          </div>
        </li>
        <li>
          <a href="#" class="navbar-link">Cadastre seu imóvel</a>
        </li>
        <li>
          <a href="/contato" class="navbar-link" id="contato-link">Contato</a>
        </li>
      </ul>

      <a href="/login" class="login">
        <div class="textoLogin">Entrar</div>
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleDropHeader(event) {
      // Implement your toggle logic here
    },
    showDropHeader(event) {
      // Implement your show logic here
    },
    hideDropHeader(event) {
      // Implement your hide logic here
    },
    navBarSearchImoveis(tipo, categoria) {
      // Implement your search logic here
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/header.css';
</style>
