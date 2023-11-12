import http from "@/api/http";
import {buildQueryURL} from "@/utils/utils";

export function getMeteoDataByHour(apiObj){
    return http.query_auth_post(
        buildQueryURL('/qx/stat_hour', apiObj)
    )
}

export function getMeteoDataByDay(station, date, which, type){
    return http.query_auth_post(
        buildQueryURL('/qx/stat_day', {station,date,which,type})
    )
}

export function getMeteoDataByDate(apiObj){
    return http.query_auth_post(
        buildQueryURL('/qx/stat_day_range', apiObj)
    )
}

export function getMeteoDataByComplex(apiObj){
    return http.query_auth_post(
        buildQueryURL('/qx/query', apiObj)
    )
}

export function getMeteoModelInfo(){
    return http.get('/anapredict/model/info')
}

export function getMeteoModelPrediction(apiObj){
    return http.json_auth_post('/anapredict/model/prediction',apiObj)
}

export function getMeteoCorrelation(apiObj){
    return http.json_auth_post('/anapredict/analyze/correlation', apiObj)
}

// 获取模型报告
export function getModelReport(obj){
    return http.json_auth_post('/anapredict/model/report', obj)
}