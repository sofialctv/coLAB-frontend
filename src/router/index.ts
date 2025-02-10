import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('@/coLAB/View/Home.vue'),
    },
    {
      path: '/bolsa',
      component: () => import('@/coLAB/View/Bolsa.vue'),
    },
    {
      path: '/financiador',
      component: () => import('@/coLAB/View/Financiador.vue'),
    },
    {
      path: '/pessoa',
      component: () => import('@/coLAB/View/Pessoa.vue'),
    },
    {
      path: '/projeto',
      component: () => import('@/coLAB/View/Projeto.vue'),
    },
  ],
})

export default router
