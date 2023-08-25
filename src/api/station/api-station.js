import http from "@/api/http";
import {buildQueryURL} from "@/utils/utils";

export function getStationInfo(){
    return http.get('/qx/stations')
}

export function getStationDate(station){
    return http.get(buildQueryURL('/qx/stations',{station}))
}

export function getStationCollectionDataCountByMonth(station,year,month){
    return http.get(buildQueryURL('/qx/data_sum',{station,year,month}))
}