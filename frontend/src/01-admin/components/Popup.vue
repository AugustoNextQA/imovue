<template>
  <section class="popup" id="custom-popup">
    <div class="popup-container">
      <div class="popup-content">
        <span id="popup-message"></span>
        <div id="popup-buttons"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Popup',
  methods: {
    async showAlert(mensagem) {
      const popup = document.getElementById('custom-popup');
      const popupMessage = document.getElementById('popup-message');
      const popupButtons = document.getElementById('popup-buttons');

      popupMessage.innerText = mensagem;
      popup.style.display = 'flex';
      popupButtons.innerHTML = '';
      popupButtons.style.justifyContent = 'center';

      const okButton = document.createElement('button');
      okButton.innerText = 'OK';
      okButton.id = 'popup-ok';
      okButton.onclick = async () => {
        await this.fecharPopup();
      };

      popupButtons.appendChild(okButton);
    },

    async showConfirm(mensagem, callback) {
      const popup = document.getElementById('custom-popup');
      const popupMessage = document.getElementById('popup-message');
      const popupButtons = document.getElementById('popup-buttons');

      popupMessage.innerText = mensagem;
      popup.style.display = 'flex';
      popupButtons.innerHTML = '';
      popupButtons.style.justifyContent = 'space-between';

      const okButton = document.createElement('button');
      okButton.innerText = 'OK';
      okButton.id = 'popup-ok';
      okButton.onclick = async () => {
        await this.fecharPopup();
        if (callback) callback(true);
      };

      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancelar';
      cancelButton.classList.add('cancel');
      cancelButton.onclick = async () => {
        await this.fecharPopup();
        if (callback) callback(false);
      };

      popupButtons.appendChild(cancelButton);
      popupButtons.appendChild(okButton);
    },

    async fecharPopup() {
      const popup = document.getElementById('custom-popup');
      popup.style.display = 'none';
    }
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/popup.css';
</style>