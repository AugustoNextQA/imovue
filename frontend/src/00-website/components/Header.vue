<template>
  <header class="header" data-header>
    <div class="container-header">
      <a href="/" class="logo">
        <img src="@/00-website/assets/imagens/logo.png" alt="AGAS Imóveis logo" />
      </a>

      <button class="menu-toggle-btn" @click="toggleMenu">
        <ion-icon :name="menuIcon"></ion-icon>
      </button>
    </div>

    <nav class="navbar" :class="{ expanded: isMenuOpen }">
      <ul class="navbar-list">
        <li>
          <div class="dropdown-header" @click="toggleDropHeader" @mouseover="showDropHeader" @mouseout="hideDropHeader">
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
          <div class="dropdown-header" @click="toggleDropHeader" @mouseover="showDropHeader" @mouseout="hideDropHeader">
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

      <router-link to="/admin" class="login">
        <div class="textoLogin">Entrar</div>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false,
      menuIcon: 'menu-outline'
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.menuIcon = this.isMenuOpen ? 'close-outline' : 'menu-outline';
    },

    toggleDropHeader(event) {
      if (window.innerWidth <= 900) {
        const dropdownHeader = event.currentTarget;
        const dropdownContent = dropdownHeader.querySelector('.dropdown-header-content');
        dropdownContent.classList.toggle('show');
      }
    },

    showDropHeader(event) {
      if (window.innerWidth > 900) {
        const dropdownHeader = event.currentTarget;
        const dropdownContent = dropdownHeader.querySelector('.dropdown-header-content');
        clearTimeout(dropdownContent.getAttribute("data-timer"));
        dropdownContent.classList.add("show");
      }
    },

    hideDropHeader(event) {
      const dropdownHeader = event.currentTarget;
      const dropdownContent = dropdownHeader.querySelector('.dropdown-header-content');
      const timer = setTimeout(function () {
        dropdownContent.classList.remove("show");
      }, 100);
      dropdownContent.setAttribute("data-timer", timer);
    },

    navBarSearchImoveis(tipo, categoria) {
      // Implement your search logic here
    }
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/header.css';
</style>
