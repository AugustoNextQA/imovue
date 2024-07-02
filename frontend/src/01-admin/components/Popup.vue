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
  name: 'Popup'
}
</script>

<style scoped>
@import '@/01-admin/assets/css/popup.css';
</style>
