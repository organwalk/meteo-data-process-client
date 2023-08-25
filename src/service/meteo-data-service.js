import {getMeteoDataByDate, getMeteoDataByDay, getMeteoDataByHour} from "@/api/meteo-data/api-meteo-data";
import {extractLabels} from "@/utils/utils";
import config from "@/config/main-page-config.json";
import {ElMessage} from "element-plus";

export async function getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement){
    const res = await getMeteoDataByDay(station.station, '2023-06-27', selectMeteoElement.value, '2')
    return {
        status:res.data.success,
        dataList:res.data.data
    }
}

export async function getMeteoDataListByHour(apiObj){
    const res = await getMeteoDataByHour(apiObj)
    if (res.data.success === 1){
        return {
            list:res.data.data,
            total:res.data.total
        }
    }else {
        ElMessage.warning("当前小时内未查询到气象数据")
        return []
    }
}

export async function getMeteoDataListByDay(apiObj){
    const res = await getMeteoDataByDay(apiObj.station,apiObj.date,apiObj.which,'1')
    if (res.data.success === 1){
        return res.data.data
    }else {
        ElMessage.warning("当日内未查询到气象数据")
        return []
    }
}

export async function getMeteoDataListByDate(apiObj){
    const res = await getMeteoDataByDate(apiObj)
    if (res.data.success === 1){
        return {
            list:res.data.data,
            total:res.data.total
        }
    }else {
        ElMessage.warning("当前时间段内未查询到气象数据")
        return []
    }
}

const getTableData = (formData,meteoDataList,total,tableHeader,tableData,loadingTable) => {
    tableHeader.value = extractLabels(formData.selectMeteoElements,config.container.query.form.meteo_elements)
    tableData.value = meteoDataList.value
    loadingTable.value = false
}

export async function getMeteoDataQueryTableByHour(formData,meteoDataList,total,tableHeader,tableData,loadingTable){
    let apiObj = {
        station:formData.selectStation,
        date:formData.date,
        hour:formData.hour.split(':')[0],
        which:formData.selectMeteoElements.sort((a,b)=>a-b).join(','),
        pageSize:10,
        offset:formData.offset
    }
    let obj = await getMeteoDataListByHour(apiObj)
    meteoDataList.value = obj.list
    total.value = obj.total
    getTableData(formData,meteoDataList,total,tableHeader,tableData,loadingTable,obj)
}

export async function getMeteoDataQueryTableByDay(formData,meteoDataList,total,tableHeader,tableData,loadingTable){
    let apiObj = {
        station:formData.selectStation,
        date:formData.date,
        which:formData.selectMeteoElements.sort((a,b)=>a-b).join(','),
    }
    meteoDataList.value = await getMeteoDataListByDay(apiObj)
    getTableData(formData,meteoDataList,total,tableHeader,tableData,loadingTable)
}

export async function getMeteoDataQueryTableByDate(formData,meteoDataList,total,tableHeader,tableData,loadingTable){
    let apiObj = {
        station:formData.selectStation,
        start_date:formData.date,
        end_date:formData.end_date,
        which:formData.selectMeteoElements.sort((a,b)=>a-b).join(','),
        pageSize:10,
        offset:formData.offset
    }
    let obj = await getMeteoDataListByDate(apiObj)
    meteoDataList.value = obj.list
    total.value = obj.total
    getTableData(formData,meteoDataList,total,tableHeader,tableData,loadingTable,obj)
}