import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/00-website/components/Home.vue'
import Contact from '@/00-website/components/Contact.vue'
import Login from '@/00-website/components/Login.vue'

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
