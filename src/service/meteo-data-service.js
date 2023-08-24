import {getMeteoDataByDay} from "@/api/meteo-data/api-meteo-data";

export async function getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement){
    const res = await getMeteoDataByDay(station.station, '2023-06-27', selectMeteoElement.value, '2')
    return {
        status:res.data.success,
        dataList:res.data.data
    }
}