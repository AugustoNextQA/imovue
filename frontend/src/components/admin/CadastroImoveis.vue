<template>
  <section class="cadastro-imoveis">
    <div id="spinner" class="spinner" v-show="spinnerVisible">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <div class="double-bounce3"></div>
    </div>
    <div class="container">
      <div class="header-property">
        <h2>Cadastrar novo imóvel</h2>
        <div class="close-property" @click="closeForm">X</div>
      </div>
      <hr>
      <form id="form-property" @submit.prevent="handleSubmit">
        <!-- Informações Básicas -->
        <div class="section">
          <h3>Informações Básicas</h3>
          <div class="grid-container" id="grid-select">
            <div class="group-input">
              <h4>Categoria</h4>
              <div class="select-group">
                <div>
                  <input type="radio" id="categoria-casa" name="categoria" value="Casa" v-model="formData.categoria"
                    required>
                  <label for="categoria-casa">Casa</label>
                </div>
                <div>
                  <input type="radio" id="categoria-apartamento" name="categoria" value="Apartamento"
                    v-model="formData.categoria" required>
                  <label for="categoria-apartamento">Apartamento</label>
                </div>
                <div>
                  <input type="radio" id="categoria-lote" name="categoria" value="Lote" v-model="formData.categoria"
                    required>
                  <label for="categoria-lote">Lote</label>
                </div>
                <div>
                  <input type="radio" id="categoria-kitnet" name="categoria" value="Kitnet" v-model="formData.categoria"
                    required>
                  <label for="categoria-kitnet">Kitnet</label>
                </div>
              </div>
            </div>
            <div class="group-input">
              <h4>Comércio</h4>
              <div class="select-group">
                <div>
                  <input type="checkbox" id="comercio-venda" name="comercio" value="Venda" v-model="formData.comercio">
                  <label for="comercio-venda">Venda</label>
                </div>
                <div>
                  <input type="checkbox" id="comercio-aluguel" name="comercio" value="Aluguel"
                    v-model="formData.comercio">
                  <label for="comercio-aluguel">Aluguel</label>
                </div>
              </div>
            </div>
          </div>
          <hr>
        </div>
        <!-- Outros campos seguem a mesma lógica -->
        <div class="btn-container">
          <button type="button" class="btn-anexar" @click="anexarImagens">Anexar Imagens</button>
          <div class="btn-group-right">
            <button type="button" class="button" @click="closeForm">Cancelar</button>
            <button type="submit" class="btn-salvar-form" :disabled="!formIsValid">Salvar</button>
          </div>
        </div>
      </form>
    </div>

    <section class="modal-upload" v-show="modalVisible">
      <div class="modal-container">
        <h2>Upload de Imagens do Imóvel</h2>
        <div class="upload-container">
          <div id="preview" class="preview-container">
            <div id="uploadPlaceholder" class="image-upload">
              <input type="file" id="imagemImovel" accept="image/*" multiple @change="previewImages">
              <label for="imagemImovel">
                <div class="upload-placeholder">
                  <span>+</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="btn-modal">
          <button type="button" class="button" @click="closeModalUpload">Voltar</button>
          <button type="button" class="btn-salvar-imagens" @click="uploadImages">Salvar imagens</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CadastroImoveis',
  data() {
    return {
      spinnerVisible: false,
      modalVisible: false,
      formData: {
        categoria: '',
        comercio: [],
        // outros campos do formulário
      }
    };
  },
  computed: {
    formIsValid() {
      // lógica de validação do formulário
      return true;
    }
  },
  methods: {
    closeForm() {
      // lógica para fechar o formulário
    },
    handleSubmit() {
      // lógica para tratar o envio do formulário
    },
    anexarImagens() {
      this.modalVisible = true;
    },
    closeModalUpload() {
      this.modalVisible = false;
    },
    previewImages(event) {
      // lógica para visualizar as imagens
    },
    uploadImages() {
      // lógica para fazer upload das imagens
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/admin/cadastro-imoveis.css';
</style>
