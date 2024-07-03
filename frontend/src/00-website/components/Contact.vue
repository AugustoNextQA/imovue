<template>
  <section class="contact">
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
            <label for="message">Mensagem*</label>
            <textarea name="message" id="mensagem" required placeholder="Digite sua mensagem"
              class="input-field"></textarea>
          </div>

          <button id="emailButton" type="submit" class="btn btn-primary">
            <span>Enviar Mensagem</span>
            <ion-icon name="paper-plane-outline"></ion-icon>
          </button>
        </form>
      </div>

      <div v-if="showContactInfo" class="contact-info">
        <h2>Informações de Contato</h2>
        <div class="social-media">
          <a href="mailto:contato@agasimoveis.com.br" target="_blank">
            <ion-icon name="mail-outline"></ion-icon>
          </a>
          <a href="https://www.facebook.com/people/AGAS-Im%C3%B3veis/61560455033326/" target="_blank">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="https://www.instagram.com/agasimoveisitapeva/" target="_blank">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://wa.me/551531901451" target="_blank">
            <ion-icon name="logo-whatsapp"></ion-icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    showContactInfo: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/contato.css';
</style>
