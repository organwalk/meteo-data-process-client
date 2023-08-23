import http from "@/api/http";

export default function login(userInfo){
    return http.post(userInfo)
}