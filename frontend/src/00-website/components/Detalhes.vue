<template>
  <section class="detalhes-section">
    <div id="spinner" class="detalhes-spinner" style="display: none;">
      <div class="detalhes-double-bounce1"></div>
      <div class="detalhes-double-bounce2"></div>
      <div class="detalhes-double-bounce3"></div>
    </div>
    <div class="detalhes-content-container" style="display: none;">
      <h3 id="imovel-titulo" class="detalhes-imovel-titulo"></h3>

      <div class="detalhes-image-container">
        <img src="" alt="" class="detalhes-large-image">
        <div class="detalhes-small-image-container">
          <div class="detalhes-small-image-row">
            <img src="" alt="" class="detalhes-small-image">
            <div class="detalhes-faded-image-container">
              <img src="" alt="Faded " class="detalhes-faded-image">
              <button class="detalhes-more-button">Ver mais</button>
            </div>
          </div>
        </div>
      </div>
      <div class="detalhes-text-and-info-container">
        <div class="detalhes-text-container">
          <div class="detalhes-titulo-sobre-imovel">
            <h3>Caracteristicas:</h3>
          </div>

          <div class="detalhes-sobre-imovel">
            <div class="detalhes-icone-wrapper" id="areaTotalContainer">
              <span class="detalhes-icon-area">
                <img src="@/00-website/assets/imagens/detalhes/wide 1.png" alt="Ícone-area">
              </span>
              <hr>
              <div class="detalhes-text-content">
                <b id="icon-areaTotal"></b>
                <p class="title">Área total</p>
              </div>
            </div>
            <div class="detalhes-icone-wrapper">
              <span class="detalhes-icon-terreno">
                <img src="@/00-website/assets/imagens/detalhes/terreno.png" alt="Ícone-terreno">
              </span>
              <hr>
              <div class="detalhes-text-content">
                <b id="icon-areaConstruida"></b>
                <p class="title">Área construída</p>
              </div>
            </div>
            <div class="detalhes-icone-wrapper">
              <span class="detalhes-icon-bed">
                <img src="@/00-website/assets/imagens/detalhes/bed 1.png" alt="Ícone-bed">
              </span>
              <hr>
              <div class="detalhes-text-content">
                <b id="icon-bed"></b>
                <p class="title">Quartos</p>
              </div>
            </div>
            <div class="detalhes-icone-wrapper">
              <span class="detalhes-icon-bathroom">
                <img src="@/00-website/assets/imagens/detalhes/shower 1.png" alt="Ícone-bathroom">
              </span>
              <hr>
              <div class="detalhes-text-content">
                <b id="icon-bathroom"></b>
                <p class="title">Banheiros</p>
              </div>
            </div>
            <div class="detalhes-icone-wrapper">
              <span class="detalhes-icon-garage">
                <img src="@/00-website/assets/imagens/detalhes/garagem 1.png" alt="Ícone-garage">
              </span>
              <hr>
              <div class="detalhes-text-content">
                <b id="icon-garage"></b>
                <p class="title">Vagas</p>
              </div>
            </div>
          </div>

          <div class="detalhes-descricaoImovel">
            <h3>Descrição do imóvel:</h3>
            <p class="detalhes-about"></p>

            <ul class="detalhes-detalhesImovel"></ul>
          </div>
          <div class="detalhes-conditionsPayment">
            <h3>Condições de Pagamento:</h3>
            <ul class="detalhes-payments">
              <li>
                <span class="detalhes-labelPayment">À vista:</span>
                <span class="detalhes-valueMoney" id="valueMoney">Sim</span>
              </li>
              <li>
                <span class="detalhes-labelPayment">Parcelamento:</span>
                <span class="detalhes-valueInstallment" id="valueInstallment"></span>
              </li>
              <li>
                <span class="detalhes-labelPayment">Financiamento:</span>
                <span class="detalhes-valueFinancing" id="valueFinancing"></span>
              </li>
              <li>
                <span class="detalhes-labelPayment">Negociação (aceita carro/imóvel):</span>
                <span class="detalhes-valueNegotiation" id="valueNegotiation"></span>
              </li>
            </ul>
          </div>
        </div>

        <div class="detalhes-bloco-informacoes">
          <div class="detalhes-informacao">
            <label class="detalhes-label">Imóvel</label>
            <span class="detalhes-valor" id="valorImovel"></span>
          </div>
          <div class="detalhes-informacao">
            <label class="detalhes-label">IPTU</label>
            <span class="detalhes-valor" id="iptu"></span>
          </div>
          <div class="detalhes-informacao">
            <label class="detalhes-label">Condomínio</label>
            <span class="detalhes-valor" id="condominio"></span>
          </div>
          <hr>
          <a aria-label="Fale no WhatsApp" href="https://wa.me/551531901451" class="detalhes-contact" id="contactButton"
            @click="openWhatsApp">
            <img alt="" class="detalhes-whatsappImg" referrerpolicy="origin-when-cross-origin"
              src="@/00-website/assets/imagens/WhatsAppButtonGreenSmall.png">
          </a>
        </div>
      </div>
    </div>
    <div class="detalhes-maps" style="display: none;">
      <div class="detalhes-location-info">
        <div class="detalhes-location-name">Localização</div>
        <div class="detalhes-location-address"></div>
      </div>
    </div>
    <iframe class="detalhes-mapa" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="map-iframe"></iframe>
  </section>
</template>

<script>
export default {
  name: 'Detalhes',
  methods: {
    openWhatsApp() {
      // Implementação da lógica para abrir o WhatsApp
    }
  }
}
</script>

<style scoped>
@import '@/00-website/assets/css/detalhes.css';
</style>
