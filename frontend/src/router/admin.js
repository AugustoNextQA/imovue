import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@/01-admin/layouts/AdminLayout.vue';
import Dashboard from '@/01-admin/components/Dashboard.vue';
import GestaoImoveis from '@/01-admin/components/GestaoImoveis.vue';
import Chaves from '@/01-admin/components/Chaves.vue';
import Pessoas from '@/01-admin/components/Pessoas.vue';
import Relatorios from '@/01-admin/components/Relatorios.vue';
import Login from '@/01-admin/components/Login.vue';

const routes = [
    {
        path: '/admin/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', name: 'AdminDashboard', component: Dashboard },
            { path: 'imoveis', name: 'AdminImoveis', component: GestaoImoveis },
            { path: 'chaves', name: 'AdminChaves', component: Chaves },
            { path: 'pessoas', name: 'AdminPessoas', component: Pessoas },
            { path: 'relatorios', name: 'AdminRelatorios', component: Relatorios },
        ],
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/admin/login');
    } else {
        next();
    }
});

export default router;
