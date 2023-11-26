import {getStationCollectionDataCountByMonth, getStationDate, getStationInfo} from "@/api/station/api-station";
import {ElMessage} from "element-plus";

//获取气象站信息数据
export async function getStationData(loading){
    const res = await getStationInfo()
    if (res.data.success === 1){
        const stationCode = res.data.station.map(item => item.station)
        await sessionStorage.setItem("stations", JSON.stringify(stationCode))
        return  {
            numberOfStation:res.data.station.length,
            stationList:res.data.station
        }
    }else {
        loading.value = false
        ElMessage.error("内部服务错误，请重试")
    }
}

//获取气象站启动日期
export async function getStartDate(station){
    const res = await getStationDate(station)
    if (res.data.success === 1){
        return res.data.data[0]
    }else {
        return ""
    }
}

//获取有效日期列表
export async function getStationValidDatesList(station){
    const res = await getStationDate(station)
    if (res.data.success === 1){
        return res.data.data
    }else {
        return []
    }
}

// 获取任意月份下每日数据总量
export async function getStationMeteoDataCountByMonthList(station,year,month){
    const res = await getStationCollectionDataCountByMonth(station,String(year),String(month))
    if (res.data.success === 1){
        return res.data.data
    }else {
        return []
    }
}