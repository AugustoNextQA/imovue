<template>
  <div>
    <header class="header" data-header>
      <div class="container">
        <a href="/" class="logo">
          <img src="@/assets/imagens/logo.png" alt="NextQA logo" />
        </a>
        <button class="menu-toggle-btn" data-nav-toggle-btn></button>
      </div>
    </header>
    <section class="loginSection" id="loginSection">
      <form class="login-form" id="loginForm">
        <h2 class="login-title">Iniciar sessão</h2>
        <div class="form-group">
          <label for="username">Nome de usuário</label>
          <input type="text" id="usernameLogin" name="username" required placeholder="Digite seu nome de usuário">
          <div class="error-message-input" id="error-message-username-login"></div>
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="passwordLogin" name="password" required placeholder="Digite sua senha">
          <div class="error-message-input" id="error-message-senha-login"></div>
        </div>
        <div class="form-actions">
          <p class="forgot-password">Esqueceu sua senha?</p>
          <button type="submit" class="login-button">Entrar</button>
          <div class="error-message-input" id="error-message-all-login"></div>
        </div>
      </form>
    </section>
    <div id="popupSection"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    this.carregarPopup();
  },
  methods: {
    carregarPopup() {
      // Lógica para carregar popup
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/login.css';
@import '@/assets/css/header.css';
</style>
