import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/01-admin/layouts/AdminLayout.vue'
import GestaoImoveis from '@/01-admin/components/GestaoImoveis.vue'
import CadastroImoveis from '@/01-admin/components/CadastroImoveis.vue'
import Visitantes from '@/01-admin/components/Visitantes.vue'

const routes = [
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: 'imoveis', name: 'GestaoImoveis', component: GestaoImoveis },
            { path: 'cadastro-imoveis', name: 'CadastroImoveis', component: CadastroImoveis },
            { path: 'visitantes', name: 'Visitantes', component: Visitantes }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
