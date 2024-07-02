<template>
  <footer>
    <div class="footer-top">
      <div class="container">
        <div class="footer-brand">
          <a class="logoFooter">
            <img src="@/assets/imagens/logo-footer.png" alt="NextQA logo" />
          </a>

          <p class="footer-text">Seu Sonho, Nosso Compromisso!</p>

          <ul class="social-list">
            <li>
              <a href="mailto:contato@agasimoveis.com.br" class="social-link">
                <ion-icon name="mail-outline"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://www.facebook.com/people/AGAS-Im%C3%B3veis/61560455033326/" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/agasimoveisitapeva/" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://wa.me/551531901451" class="social-link">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="copyright">
          &copy; 2024
          <a>Pereira Imoveis </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
@import '@/assets/css/website/footer.css';
</style>
