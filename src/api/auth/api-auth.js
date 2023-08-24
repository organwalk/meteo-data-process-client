import http from "@/api/http";

export function login(userInfo){
    return http.post('/user/login', userInfo)
}
export function register(userInfo){
    return http.post('/user/register', userInfo)
}

export function signOut(){
    return http.query_post('/user/logout?username='+JSON.parse(sessionStorage.getItem("auth")).name)
}