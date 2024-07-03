import { createRouter, createWebHistory } from 'vue-router'
import WebsiteLayout from '@/00-website/layouts/WebsiteLayout.vue'
import Home from '@/00-website/components/Home.vue'
import Contact from '@/00-website/components/Contact.vue'
import Imoveis from '@/00-website/components/Imoveis.vue'
import Login from '@/00-website/components/Login.vue'

const routes = [
    {
        path: '/',
        component: WebsiteLayout,
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'contato', name: 'Contact', component: Contact },
            { path: 'imoveis', name: 'Imoveis', component: Imoveis },
            { path: 'login', name: 'Login', component: Login, meta: { hideFooter: true } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
