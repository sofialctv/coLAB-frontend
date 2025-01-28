import { createRouter, createWebHistory } from 'vue-router';
import Projeto from '../views/Projeto.vue';


const routes = [
  {
    path: '/',
    redirect: '/projeto',
  },
  {
    path: '/projeto',
    name: 'Projeto',
    component: Projeto,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
