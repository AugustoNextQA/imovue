<template>
  <section class="imoveis">
    <div id="spinner" class="spinner" style="display: none;">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="content-container" style="display: none;">
      <h3 id="imovel-titulo"></h3>

      <div class="image-container">
        <img src="" alt="" class="large-image">
        <div class="small-image-container">
          <div class="small-image-row">
            <img src="" alt="" class="small-image">
            <div class="faded-image-container">
              <img src="" alt="Faded " class="faded-image">
              <button class="more-button">Ver mais</button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-and-info-container">
        <div class="text-container">
          <div class="titulo-sobre-imovel">
            <h3>Caracteristicas:</h3>
          </div>

          <div class="sobre-imovel">
            <div class="icone-wrapper" id="areaTotalContainer">
              <span class="icon-area">
                <img src="@/assets/imagens/detalhes/wide 1.png" alt="Ícone-area">
              </span>
              <hr>
              <div class="text-content">
                <b id="icon-areaTotal"></b>
                <p class="title">Área total</p>
              </div>
            </div>
            <div class="icone-wrapper">
              <span class="icon-terreno">
                <img src="@/assets/imagens/detalhes/terreno.png" alt="Ícone-terreno">
              </span>
              <hr>
              <div class="text-content">
                <b id="icon-areaConstruida"></b>
                <p class="title">Área construída</p>
              </div>
            </div>
            <div class="icone-wrapper">
              <span class="icon-bed">
                <img src="@/assets/imagens/detalhes/bed 1.png" alt="Ícone-bed">
              </span>
              <hr>
              <div class="text-content">
                <b id="icon-bed"></b>
                <p class="title">Quartos</p>
              </div>
            </div>
            <div class="icone-wrapper">
              <span class="icon-bathroom">
                <img src="@/assets/imagens/detalhes/shower 1.png" alt="Ícone-bathroom">
              </span>
              <hr>
              <div class="text-content">
                <b id="icon-bathroom"></b>
                <p class="title">Banheiros</p>
              </div>
            </div>
            <div class="icone-wrapper">
              <span class="icon-garage">
                <img src="@/assets/imagens/detalhes/garagem 1.png" alt="Ícone-garage">
              </span>
              <hr>
              <div class="text-content">
                <b id="icon-garage"></b>
                <p class="title">Vagas</p>
              </div>
            </div>
          </div>

          <div class="descricaoImovel">
            <h3>Descrição do imóvel:</h3>
            <p class="about"></p>

            <ul class="detalhesImovel"></ul>
          </div>
          <div class="conditionsPayment">
            <h3>Condições de Pagamento:</h3>
            <ul class="payments">
              <li>
                <span class="labelPayment">À vista:</span>
                <span class="valueMoney" id="valueMoney">Sim</span>
              </li>
              <li>
                <span class="labelPayment">Parcelamento:</span>
                <span class="valueInstallment" id="valueInstallment"></span>
              </li>
              <li>
                <span class="labelPayment">Financiamento:</span>
                <span class="valueFinancing" id="valueFinancing"></span>
              </li>
              <li>
                <span class="labelPayment">Negociação (aceita carro/imóvel):</span>
                <span class="valueNegotiation" id="valueNegotiation"></span>
              </li>
            </ul>
          </div>
        </div>

        <div class="bloco-informacoes">
          <div class="informacao">
            <label class="label">Imóvel</label>
            <span class="valor" id="valorImovel"></span>
          </div>
          <div class="informacao">
            <label class="label">IPTU</label>
            <span class="valor" id="iptu"></span>
          </div>
          <div class="informacao">
            <label class="label">Condomínio</label>
            <span class="valor" id="condominio"></span>
          </div>
          <hr>
          <a aria-label="Fale no WhatsApp" href="https://wa.me/551531901451" class="contact" id="contactButton" @click="openWhatsApp">
            <img alt="" class="whatsappImg" referrerpolicy="origin-when-cross-origin" src="@/assets/imagens/WhatsAppButtonGreenSmall.png">
          </a>
        </div>
      </div>
    </div>
    <div class="maps" style="display: none;">
      <div class="location-info">
        <div class="location-name">Localização</div>
        <div class="location-address"></div>
      </div>
    </div>
    <iframe class="mapa" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="map-iframe"></iframe>
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
@import '@/assets/css/detalhes.css';
</style>
