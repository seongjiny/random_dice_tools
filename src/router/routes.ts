import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/HomeComponent.vue') },
      {
        path: 'field',
        component: () => import('components/DiceFieldComponent.vue'),
      },
      {
        path: 'solver',
        component: () => import('components/QuanSolverComponent.vue'),
      },
      {
        path: 'solver2',
        component: () => import('components/QuanSolver2Component.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
