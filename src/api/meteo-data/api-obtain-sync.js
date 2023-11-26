import http from "@/api/http";

export function connectDataSaveServer(){
    return http.get('/qx/obtain/connect')
}

export function syncStationData(){
    return http.get('/qx/obtain/sync/station')
}

export function syncDateRange(){
    return http.get('/qx/obtain/sync/date_range')
}

export function syncLatestDate(station){
    return http.get('/qx/obtain/sync/latest_date?station=' + station)
}

export function syncHavingData(station){
    return http.get('/qx/obtain/sync/exist?station=' + station)
}

export function syncMeteoDataByInfo(obj){
    return http.json_auth_post('/qx/obtain/sync/meteo_data', obj)
}