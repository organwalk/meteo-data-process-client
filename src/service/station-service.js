import {getStationDate, getStationInfo} from "@/api/station/api-station";
import {ElMessage} from "element-plus";

export async function getStationData(loading){
    const res = await getStationInfo()
    if (res.data.success === 1){
        return  {
            numberOfStation:res.data.station.length,
            stationList:res.data.station
        }
    }else {
        loading.value = false
        ElMessage.error("内部服务错误，请重试")
    }
}

export async function getStartDate(station){
    const res = await getStationDate(station)
    if (res.data.success === 1){
        return res.data.date[0]
    }else {
        return ""
    }
}