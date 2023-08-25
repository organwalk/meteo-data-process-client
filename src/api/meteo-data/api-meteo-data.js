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