<template>
  <header class="header" data-header>
    <div class="container-header">
      <a href="/" class="logo">
        <img src="@/assets/imagens/website/logo.png" alt="AGAS Imóveis logo" />
      </a>

      <button class="menu-toggle-btn" data-nav-toggle-btn>
        <ion-icon name="menu-outline" class="icon-menu"></ion-icon>
        <ion-icon name="close-outline" class="icon-close"></ion-icon>
      </button>
    </div>

    <nav class="navbar">
      <ul class="navbar-list">
        <li>
          <div class="dropdown-header">
            <router-link to="/" class="drop-link">Comprar<span class="icon"></span></router-link>
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
          <div class="dropdown-header">
            <router-link to="/" class="drop-link">Alugar<span class="icon"></span></router-link>
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
          <router-link to="/" class="navbar-link">Cadastre seu imóvel</router-link>
        </li>
        <li>
          <router-link to="/contato" class="navbar-link" id="contato-link">Contato</router-link>
        </li>
      </ul>

      <router-link to="/login" class="login">
        <div class="textoLogin">Entrar</div>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    navBarSearchImoveis(tipo, categoria) {
      // Implement your search logic here
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/website/header.css';
</style>
