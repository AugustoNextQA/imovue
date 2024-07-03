<template>
  <section class="categorias-home">
    <h2>Imóveis por Categoria</h2>
    <div class="buttons-container-home">
      <button class="categoria-btn-home" :class="{ active: categoriaSelecionada === 'Casa' }"
        @click="carregarImoveisPorCategoria('Casa')">Casa</button>
      <button class="categoria-btn-home" :class="{ active: categoriaSelecionada === 'Apartamento' }"
        @click="carregarImoveisPorCategoria('Apartamento')">Apartamento</button>
      <button class="categoria-btn-home" :class="{ active: categoriaSelecionada === 'Lote' }"
        @click="carregarImoveisPorCategoria('Lote')">Lote</button>
      <button class="categoria-btn-home" :class="{ active: categoriaSelecionada === 'Kitnet' }"
        @click="carregarImoveisPorCategoria('Kitnet')">Kitnet</button>
    </div>
    <div class="cards-container-home">
      <div id="categoriaContainer" class="cards-home">
        <article v-for="imovel in imoveisPorCategoria" :key="imovel.id_imovel" class="card-home">
          <div class="carrossel-home">
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
    </div>
    <div class="ver-todos-container-home">
      <button class="ver-todos-btn-home" @click="verTodosImoveis">Ver todos</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImoveisCategoria',
  data() {
    return {
      categoriaSelecionada: 'Casa',
      imoveisPorCategoria: [],
      isLoading: false,
      timestamp: new Date().getTime(),
    };
  },
  mounted() {
    this.carregarImoveisPorCategoria(this.categoriaSelecionada);
  },
  methods: {
    async carregarImoveisPorCategoria(categoria) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.categoriaSelecionada = categoria;

      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_URL}/imoveis?categoria=${categoria}&limit=3`, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Erro ao buscar imóveis da categoria');

        const data = await response.json();
        const imoveis = await Promise.all(
          data.imoveis.map(async imovel => {
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
        this.imoveisPorCategoria = imoveis;
      } catch (error) {
        console.error('Erro ao carregar imóveis da categoria:', error);
      }
      this.isLoading = false;
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

    async verTodosImoveis() {

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
