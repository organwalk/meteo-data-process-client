import http from "@/api/http";

export function getMeteoDataByDay(station, date, which, type){
    return http.query_auth_post('/qx/stat_day?station='+station+'&&date='+date+'&&which='+which+'&&type='+type)
}