<template>
  <section class="mais-acessados-home">
    <h2>Imóveis mais buscados</h2>
    <div class="cards-container-home">
      <button class="nav-home acessadosPrev" @click="prevCardMaisAcessados">❮</button>
      <div class="cards-home" ref="acessadosContainer">
        <article v-for="imovel in imoveisMaisAcessados" :key="imovel.id_imovel" class="card-home">
          <div class="carrossel-home" :ref="`carrossel-${imovel.id_imovel}`">
            <button class="carrosselPrev-home" @click="showImage(imovel.id_imovel, -1)">❮</button>
            <div class="images-home">
              <img v-for="(image, index) in imovel.imagens" :src="getImageSrc(imovel.id_imovel, image.filename)"
                :alt="`${imovel.id_imovel} - ${index}`" :class="{ active: index === 0 }" :key="index" />
            </div>
            <button class="carrosselNext-home" @click="showImage(imovel.id_imovel, 1)">❯</button>
            <div class="carrossel-indicators-home">
              <span v-for="(image, index) in imovel.imagens" :class="{ active: index === 0 }" :key="index"
                class="indicator-home"></span>
            </div>
          </div>
          <div class="info-home">
            <div>
              <span>{{ imovel.id_imovel }}</span>
            </div>
            <p>{{ imovel.categoria }}</p>
            <p><b>{{ imovel.bairro }} - {{ imovel.cidade }} - {{ imovel.estado }}</b></p>
            <p v-if="imovel.categoria !== 'Lote'">{{ imovel.areaTotal }} m² • {{ imovel.quartos }} Quartos</p>
            <p v-if="imovel.categoria !== 'Lote'">{{ imovel.banheiros }} Banheiros • {{ imovel.garagem }} Vaga</p>
            <p v-else>{{ imovel.areaTotal }} m²</p>
            <p><b>{{ formatarNumero(imovel.valor) }}</b></p>
          </div>
        </article>
      </div>
      <button class="nav-home acessadosNext" @click="nextCardMaisAcessados">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisBuscados',
  data() {
    return {
      imoveisMaisAcessados: [],
      timestamp: new Date().getTime(),
      currentAcessadosIndex: 0,
      acessadosPerPage: 3
    };
  },
  mounted() {
    this.carregarImoveisMaisAcessados();
  },
  methods: {
    async carregarImoveisMaisAcessados() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/imoveis?maisAcessados=true`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Erro ao buscar imóveis mais acessados da API');
        const data = await response.json();

        const imoveisMaisAcessados = await Promise.all(
          data.map(async imovel => {
            try {
              const responseImagens = await fetch(`${process.env.VUE_APP_BACKEND_URL}/imoveis/imagem/${imovel.id_imovel}`, {
                headers: { 'Content-Type': 'application/json' }
              });

              if (!responseImagens.ok) throw new Error('Erro ao buscar imagens do imóvel');
              const imagens = await responseImagens.json();
              imovel.imagens = imagens.length > 0 ? imagens.slice(0, 10) : [{ filename: 'defaultImage.jpeg', url: `${process.env.VUE_APP_FRONTEND_URL}/imagens/defaultImage.jpeg` }];
            } catch (error) {
              console.error('Erro ao carregar imagens:', error);
              imovel.imagens = [{ filename: 'defaultImage.jpeg', url: `${process.env.VUE_APP_FRONTEND_URL}/imagens/defaultImage.jpeg` }];
            }
            return imovel;
          })
        );
        this.imoveisMaisAcessados = imoveisMaisAcessados;
        this.updateCardMaisAcessados();
      } catch (error) {
        console.error('Erro ao carregar os imóveis mais acessados:', error);
      }
    },

    getImageSrc(id_imovel, filename) {
      if (filename === 'defaultImage.jpeg') {
        return `${process.env.VUE_APP_FRONTEND_URL}/imagens/defaultImage.jpeg?timestamp=${this.timestamp}`;
      } else {
        return `${process.env.VUE_APP_FRONTEND_URL}/imagens/${id_imovel}/${filename}?timestamp=${this.timestamp}`;
      }
    },

    showImage(id_imovel, direction) {
      const carrossel = this.$refs[`carrossel-${id_imovel}`][0];
      const images = carrossel.querySelectorAll('img');
      const indicators = carrossel.querySelectorAll('.indicator-home');
      const currentImageIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
      let newImageIndex = currentImageIndex + direction;
      if (newImageIndex < 0) newImageIndex = images.length - 1;
      if (newImageIndex >= images.length) newImageIndex = 0;
      images[currentImageIndex].classList.remove('active');
      images[newImageIndex].classList.add('active');
      indicators[currentImageIndex].classList.remove('active');
      indicators[newImageIndex].classList.add('active');
    },

    addSwipe(element, onSwipeLeft, onSwipeRight) {
      let touchstartX = 0;
      let touchendX = 0;
      element.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
      }, false);
      element.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
      }, false);
      function handleSwipe() {
        if (touchendX < touchstartX) onSwipeLeft();
        if (touchendX > touchstartX) onSwipeRight();
      }
    },

    updateCardMaisAcessados() {
      const container = this.$refs.acessadosContainer;
      const totalImoveis = container.children.length;

      for (let i = 0; i < totalImoveis; i++) {
        container.children[i].style.display = i >= this.currentAcessadosIndex && i < this.currentAcessadosIndex + this.acessadosPerPage ? 'block' : 'none';
      }
    },

    prevCardMaisAcessados() {
      const container = this.$refs.acessadosContainer;
      const totalImoveis = container.children.length;

      if (this.currentAcessadosIndex > 0) {
        this.currentAcessadosIndex -= this.acessadosPerPage;
      } else {
        this.currentAcessadosIndex = totalImoveis - this.acessadosPerPage;
      }
      this.updateCardMaisAcessados();
    },

    nextCardMaisAcessados() {
      const container = this.$refs.acessadosContainer;
      const totalImoveis = container.children.length;

      if (this.currentAcessadosIndex < totalImoveis - this.acessadosPerPage) {
        this.currentAcessadosIndex += this.acessadosPerPage;
      } else {
        this.currentAcessadosIndex = 0;
      }
      this.updateCardMaisAcessados();
    },

    formatarNumero(numero) {
      return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  }
};
</script>

<style scoped>
@import '@/00-website/assets/css/home.css';
</style>
