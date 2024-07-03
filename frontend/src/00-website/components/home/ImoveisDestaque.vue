<template>
  <section class="destaques-home">
    <h2>Imóveis em destaque</h2>
    <div class="cards-container-home">
      <button class="nav-home destaquesPrev" @click="prevCardDestaque">❮</button>
      <div class="cards-home" ref="destaqueContainer">
        <article v-for="imovel in imoveisDestaque" :key="imovel.id_imovel" class="card-home">
          <div class="carrossel-home" :ref="'carrossel-home-' + imovel.id_imovel">
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
      <button class="nav-home destaquesNext" @click="nextCardDestaque">❯</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisDestaques',
  data() {
    return {
      imoveisDestaque: [],
      timestamp: new Date().getTime(),
      currentIndex: 0,
      itemsPerPage: 3
    };
  },
  mounted() {
    this.carregarImoveisDestaque();
  },
  methods: {
    async carregarImoveisDestaque() {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/imoveis`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Erro ao buscar imóveis da API');
        const data = await response.json();
        const imoveisDestaque = await Promise.all(
          data.imoveis.filter(imovel => imovel.destaque).map(async imovel => {

            try {
              const responseImagens = await fetch(`${process.env.VUE_APP_BACKEND_URL}/imoveis/imagem/${imovel.id_imovel}`, {
                headers: { 'Content-Type': 'application/json' }
              });

              if (!responseImagens.ok) throw new Error('Erro ao buscar imagens do imóvel');
              const imagens = await responseImagens.json();
              imovel.imagens = imagens.length > 0 ? imagens.slice(0, 10) : [{ filename: 'defaultImage.jpeg', url: `${process.env.VUE_APP_FRONTEND_URL}/imagens/defaultImage.jpeg` }];
            }
            catch (error) {
              console.error('Erro ao carregar imagens:', error);
              imovel.imagens = [{ filename: 'defaultImage.jpeg', url: `${process.env.VUE_APP_FRONTEND_URL}/imagens/defaultImage.jpeg` }];
            }
            return imovel;
          })
        );
        this.imoveisDestaque = imoveisDestaque;
        this.updateCardDestaque();
      } catch (error) {
        console.error('Erro ao carregar os imóveis em destaque:', error);
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
      const carrossel = this.$refs[`carrossel-home-${id_imovel}`][0];
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

    updateCardDestaque() {
      const container = this.$refs.destaqueContainer;
      const totalImoveis = container.children.length;

      for (let i = 0; i < totalImoveis; i++) {
        container.children[i].style.display = i >= this.currentIndex && i < this.currentIndex + this.itemsPerPage ? 'block' : 'none';
      }
    },

    prevCardDestaque() {
      const container = this.$refs.destaqueContainer;
      const totalImoveis = container.children.length;

      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = totalImoveis - this.itemsPerPage;
      }
      this.updateCardDestaque();
    },

    nextCardDestaque() {
      const container = this.$refs.destaqueContainer;
      const totalImoveis = container.children.length;

      if (this.currentIndex < totalImoveis - this.itemsPerPage) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.updateCardDestaque();
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
