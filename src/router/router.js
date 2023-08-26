const routes = [
    {
        path : '/index',
        name : 'index',
        component: () => import('@/pages/IndexPage.vue')
    },
    {
        path : '/',
        name : 'main',
        component: ()=>import('@/pages/MainPage.vue')
    },
    {
        path : '/modelPrediction',
        name : 'modelPrediction',
        component: ()=>import('@/pages/ModelPredictionPage.vue')
    }
]

export default routes