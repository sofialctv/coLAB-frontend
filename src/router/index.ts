import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/bolsa',
      component: () => import('@/views/Bolsa.vue'),
    },
    {
      path: '/cargo',
      component: () => import('@/views/Cargo.vue'),
    },
    {
      path: '/financiador',
      component: () => import('@/views/Financiador.vue'),
    },
    {
      path: '/pessoa',
      component: () => import('@/views/Pessoa.vue'),
    },
    {
      path: '/projeto',
      component: () => import('@/views/Projeto.vue'),
    },
  ],
})

export default router
