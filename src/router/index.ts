import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service/:id',
      name: 'serviceDetails',
      component: () => import('../views/ServicePage.vue'),
      props: true,
    },
  ],
})

export default router
