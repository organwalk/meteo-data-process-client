import request from '@/api/request'

const http = {
    post(params){
        const config = {
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (params) config.data = params
        return request(config)
    }
}
export default http