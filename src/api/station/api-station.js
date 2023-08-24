import http from "@/api/http";

export function getStationInfo(){
    return http.get('/qx/stations')
}

export function getStationDate(station){
    return http.get('/qx/stations?station='+station)
}