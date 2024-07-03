<template>
  <div>
    <header class="header" data-header>
      <div class="containerHeader">
        <router-link to="/" class="logo">
          <img src="@/00-website/assets/imagens/logo.png" alt="NextQA logo" />
        </router-link>
        <button class="menu-toggle-btn" data-nav-toggle-btn></button>
      </div>
    </header>
    <section class="loginSection" id="loginSection">
      <form class="login-form" id="loginForm" @submit="fazerLogin">
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
    <Popup ref="popup" />
  </div>
</template>

<script>
import Popup from './Popup.vue';

export default {
  name: 'Login',
  components: {
    Popup
  },
  methods: {
    async fazerLogin(event) {
      event.preventDefault();

      const username = document.getElementById('usernameLogin').value;
      const senha = document.getElementById('passwordLogin').value;

      this.limparRespostas();

      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, senha })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.mensagem);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('nome', data.nome);

        this.$refs.popup.showAlert('Login bem-sucedido!');
        setTimeout(() => {
          this.$router.push('/admin/dashboard');
        }, 1000);
      } catch (error) {
        let idElemento;
        if (error.message.includes('obrigatórios')) {
          idElemento = document.getElementById('error-message-all-login');
        } else if (error.message.includes('Usuário')) {
          idElemento = document.getElementById('error-message-username-login');
        } else if (error.message.includes('Senha')) {
          idElemento = document.getElementById('error-message-senha-login');
        } else if (error.message.includes('Acesso negado')) {
          this.$refs.popup.showAlert('Acesso negado. Apenas administradores podem fazer login.');
          return;
        }

        if (idElemento) {
          idElemento.textContent = error.message;
          idElemento.style.display = 'block';
        } else {
          console.error('Erro inesperado no login:', error.message);
        }
      }
    },

    limparRespostas() {
      const errorMessageElements = document.querySelectorAll('.error-message-input');
      errorMessageElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
      });
    }
  }
}
</script>

<style scoped>
@import '@/01-admin/assets/css/login.css';
</style>
