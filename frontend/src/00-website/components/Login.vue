<template>
  <div>
    <header class="header" data-header>
      <div class="container">
        <router-link to="/" class="logo">
          <img src="@/00-website/assets/imagens/logo.png" alt="NextQA logo" />
        </router-link>
        <button class="menu-toggle-btn" data-nav-toggle-btn></button>
      </div>
    </header>
    <section class="loginSection" id="loginSection">
      <form class="login-form" id="loginForm" @submit.prevent="handleLogin">
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
  methods: {
    handleLogin() {
      // Implement login logic here
    },
    carregarPopup() {
      // Implement popup logic here
    }
  },
  mounted() {
    this.carregarPopup();
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/login.css';
</style>
