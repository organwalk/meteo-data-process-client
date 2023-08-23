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
    }
]

export default routes