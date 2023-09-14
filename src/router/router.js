const routes = [
    {
        path : '/',
        name : 'index',
        component: () => import('@/pages/IndexPage.vue')
    },
    {
        path : '/main',
        name : 'main',
        component: ()=>import('@/pages/MainPage.vue')
    },
    {
        path: '/dataAnalyze',
        name: 'dataAnalyze',
        component:()=>import('@/pages/DataAnalyzePage.vue')
    },
    {
        path : '/modelPrediction',
        name : 'modelPrediction',
        component: ()=>import('@/pages/ModelPredictionPage.vue')
    }
]

export default routes