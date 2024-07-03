import { createApp } from 'vue'
import App from './App.vue'

// Importar os routers
import websiteRouter from './router/website'
import adminRouter from './router/admin'

// Criar duas instâncias da aplicação
const appWebsite = createApp(App)
const appAdmin = createApp(App)

// Montar cada aplicação com seu respectivo router
appWebsite.use(websiteRouter).mount('#app-website')
appAdmin.use(adminRouter).mount('#app-admin')
