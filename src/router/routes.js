const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/IndexPage.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/pages/MainPage.vue'),
  },
  {
    path: '/dataAnalyze',
    name: 'dataAnalyze',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/pages/DataAnalyzePage.vue'),
  },
  {
    path: '/modelPrediction',
    name: 'modelPrediction',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/pages/ModelPredictionPage.vue'),
  },
]

export default routes
