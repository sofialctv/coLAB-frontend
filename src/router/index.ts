import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/cidade',
            component: () => import('@/view/index-cidade.vue')
        },
        {
            path: '/cliente',
            component: () => import('@/view/index-cliente.vue')
        },
        {
            path: '/pedido',
            component: () => import('@/view/index-pedido.vue')
        },
    ]
});

export default router;