import axios from 'axios'
import {ElMessage} from "element-plus";

const request = (config) => {
    const instance = axios.create({
        baseURL:'http://localhost:9094/',
        timeout: 10000
    })
    instance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response) {
                // 响应状态码为 500
                if (error.response.status === 500) {
                    ElMessage.error("内部服务错误，请稍后再试")
                }
                // 响应状态码为 404
                else if (error.response.data.status === 404) {
                    ElMessage.error("请求数据不存在")
                }
            }else if (error.code && error.code === 'ECONNABORTED') {
                return instance(error.config);
            }
            return Promise.reject(error);
        }
    );
    return instance(config)
}

export default request