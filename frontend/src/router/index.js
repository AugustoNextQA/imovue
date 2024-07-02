import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/website/Home.vue'
import Contact from '@/components/website/Contact.vue'
import Login from '@/components/website/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/contato',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
