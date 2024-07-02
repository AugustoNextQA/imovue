// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Contact from '@/components/Contact.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
