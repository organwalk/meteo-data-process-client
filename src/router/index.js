import { createRouter, createWebHistory } from 'vue-router'
import routes from "./router"
import {ElMessage} from "element-plus";

const router =createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem("auth")) {
        if (to.name !== "main"){
            next()
        }else {
            ElMessage.warning("您尚未登录")
            setTimeout(()=>{
                window.location.href = "/index"
            },1000)
        }
    } else {
        next()
    }
})

export default router