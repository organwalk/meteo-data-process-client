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

export function syncLatestDate(){
    return http.get('/qx/obtain/sync/latest_date')
}