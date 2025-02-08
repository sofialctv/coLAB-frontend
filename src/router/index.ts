import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('@/view/index-cidade.vue'),
    },
    {
      path: '/cliente',
      component: () => import('@/view/index-cliente.vue'),
    },
    {
      path: '/pedido',
      component: () => import('@/view/index-pedido.vue'),
    },
    {
      path: '/projeto',
      component: () => import('@/coLAB/View/Projeto.vue'),
    },
  ],
})

export default router
