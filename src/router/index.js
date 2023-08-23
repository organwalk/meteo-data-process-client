import { createRouter, createWebHistory } from 'vue-router'
import routes from "./router"

const router =createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem("authInfo")) {
        if (to.name !== "main"){
            next()
        }else {
            window.location.href = "/index"
        }
    } else {
        next()
    }
})

export default router