<template>
  <div>
    <header>
      <div class="header-left">
        <img src="@/01-admin/assets/imagens/menu/menuFechado.png" alt="Menu" id="menu-icon" class="menu-icon">
        <img src="@/01-admin/assets/imagens/header-logo.png" alt="Logo" class="header-logo">
      </div>
      <div class="header-right">
        <a href="#" id="preview-site">Preview Site</a>
        <div class="user-info" id="user-info">
          <div class="user-icon" id="user-initials"></div>
          <span id="username"></span>
          <img src="@/01-admin/assets/imagens/user/setaBaixo.png" alt="Seta" class="icon-arrow" id="dropdown-arrow">
          <div class="dropdown-content" id="dropdown-user">
            <a href="#" id="configUser">
              <img src="@/01-admin/assets/imagens/user/configuracoes.png" alt="Configurações" class="dropdown-icon">Configurações
            </a>
            <a href="#" id="meuPlano">
              <img src="@/01-admin/assets/imagens/user/plano.png" alt="Meu plano" class="dropdown-icon">Meu plano
            </a>
            <a href="#" id="logout">
              <img src="@/01-admin/assets/imagens/user/sair.png" alt="Sair" class="dropdown-icon">Sair
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="sidebar">
      <ul class="nav-links">
        <li>
          <router-link to="/admin/dashboard" id="dashboard-link">
            <img src="@/01-admin/assets/imagens/menu/inicio.png" alt="Início" class="menu-item-icon">
            <span class="link-name">Início</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/imoveis" id="imoveis-link">
            <img src="@/01-admin/assets/imagens/menu/imoveis.png" alt="Imóveis" class="menu-item-icon">
            <span class="link-name">Imóveis</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/chaves" id="chaves-link">
            <img src="@/01-admin/assets/imagens/menu/chaves.png" alt="Chaves" class="menu-item-icon">
            <span class="link-name">Chaves</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/pessoas" id="pessoas-link">
            <img src="@/01-admin/assets/imagens/menu/pessoas.png" alt="Pessoas" class="menu-item-icon">
            <span class="link-name">Pessoas</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/relatorios" id="relatorios-link">
            <img src="@/01-admin/assets/imagens/menu/relatorios.png" alt="Relatórios" class="menu-item-icon">
            <span class="link-name">Relatórios</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout'
}
</script>

<style scoped>
@import '@/01-admin/assets/css/style.css';
@import '@/01-admin/assets/css/admin.css';
</style>
