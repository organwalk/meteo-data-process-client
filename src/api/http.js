import request from '@/api/request'

const http = {
    post(url, params){
        const config = {
            url:url,
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (params) config.data = params
        return request(config)
    },
    query_post(url, params){
        const config = {
            url:url,
            method: 'post',
        }
        if (params) config.params = params
        return request(config)
    },
    query_auth_post(url, params){
        const config = {
            url:url,
            method: 'post',
            headers:{
                'name':JSON.parse(sessionStorage.getItem("auth")).name,
                'access_token':JSON.parse(sessionStorage.getItem("auth")).access_token
            }
        }
        if (params) config.params = params
        return request(config)
    },
    get(url,params){
        const config = {
            method:'get',
            url:url,
            headers:{
                'name':JSON.parse(sessionStorage.getItem("auth")).name,
                'access_token':JSON.parse(sessionStorage.getItem("auth")).access_token
            }
        }
        if (params) config.params = params
        return request(config)
    },
}
export default http