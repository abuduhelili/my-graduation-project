import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'layout',
    path: '/',
    component: () => import('@/views/layouts/index'),
    children: [
      {
        path: '/',
        name: 'modelEdit',
        meta: { keepAlive: true },
        component: () => import('@/views/ModelEdit.vue'),
      },
      {
        path: '/preview',
        name: 'modelPreview',
        meta: { keepAlive: false },
        component: () => import('@/views/ModelPreview.vue'),
      },
      {
        path: '/modelIframe',
        name: 'modelIframe',
        meta: { keepAlive: false },
        component: () => import('@/views/ModelIframe.vue'),
      },
      {
        path: '/modelBase',
        name: 'modelBase',
        meta: { keepAlive: false },
        component: () => import('@/views/ModelBase.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  model: 'hash',
  routes,
});

export default router;
