import {checkOnlyEngAndNumber} from "@/utils/utils";
import {login, register, signOut} from "@/api/auth/api-auth";
import {ElMessage} from "element-plus";

export async function loginToSystem(authServiceData) {
    if (checkOnlyEngAndNumber(authServiceData.auth.password)) {
        authServiceData.isLogin = true
        const res = await login(authServiceData.auth)
        if (res.data.code === 200){
            sessionStorage.setItem('auth', JSON.stringify(res.data.auth))
            setTimeout(()=>{
                authServiceData.isLogin = false
                window.location.href = "/main"
            },1000)
            ElMessage.success("登录成功")
        }else {
            resError(authServiceData, "用户名或密码错误")
        }
    }
}

export async function registerToSystem(authServiceData){
    if (checkOnlyEngAndNumber(authServiceData.auth.password)) {
        authServiceData.isLogin = true
        const res = await register(authServiceData.auth)
        if (res.data.success === 1){
            ElMessage.success("注册成功")
            await loginToSystem(authServiceData)
        }else {
            resError(authServiceData, "内部服务错误")
        }
    }
}

export async function signOutSystem(){
    const res = await signOut()
    if (res.data.success === 1){
        sessionStorage.setItem("auth","")
        ElMessage.success("已退出登录")
        window.location.href = "/"
    }else {
        ElMessage.error("内部服务错误，请重试")
    }
}

const resError = (authServiceData, msg) => {
    authServiceData.showPassword = false
    authServiceData.isLogin = false
    ElMessage.error(msg)
}