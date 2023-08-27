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
    return http.p_get('/qx/model/info')
}

export function getMeteoModelPrediction(apiObj){
    return http.p_post('/qx/model/predict',apiObj)
}