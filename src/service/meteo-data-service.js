import {
    getMeteoCorrelation,
    getMeteoDataByComplex,
    getMeteoDataByDate,
    getMeteoDataByDay,
    getMeteoDataByHour, getMeteoModelInfo, getMeteoModelPrediction
} from "@/api/meteo-data/api-meteo-data";
import {extractLabels} from "@/utils/utils";
import config from "@/config/main-page-config.json";
import {ElMessage} from "element-plus";

export async function getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement){
    const res = await getMeteoDataByDay(station.station, '2023-11-07', selectMeteoElement.value, '2')
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

export async function getMeteoDataListByComplex(apiObj){
    const res = await getMeteoDataByComplex(apiObj)
    if (res.data.success === 1){
        return {
            list:res.data.data,
            total:res.data.total
        }
    }else {
        ElMessage.warning("当前复合条件下未查询到气象数据")
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

export async function getMeteoDataQueryTableByComplex(formData,editObj,meteoDataList,total,tableHeader,tableData,loadingTable){
    let oldApiObj = {
        station:formData.selectStation,
        start_date:formData.date,
        end_date:formData.end_date,
        pageSize:10,
        offset:formData.offset
    }
    let apiObj = {...oldApiObj,...editObj}
    let obj = await getMeteoDataListByComplex(apiObj)
    meteoDataList.value = obj.list
    total.value = obj.total
    getTableData(formData,meteoDataList,total,tableHeader,tableData,loadingTable,obj)
}

export async function getMeteoModelInfoData(){
    const res = await getMeteoModelInfo()
    if (res.data.code === 200){
        return res.data.data
    }else {
        return {}
    }
}

export async function getMeteoModelPredictData(apiObj){
    const res = await getMeteoModelPrediction(apiObj)
    if (res.data.code === 200){
        ElMessage.success("已成功获取预测结果")
        return res.data.data
    }else {
        ElMessage.error(JSON.parse(JSON.stringify(res.data)).msg)
        return {}
    }
}

export async function getMeteoModelPredictionApiObj(configForm,planType){
    let baseObj = {
        station:configForm.station,
        start_date:configForm.date,
    }
    if (planType.value ==='24小时预测'){
        return  {
            ...baseObj,
            ...{
                model_type:'SHORTTERM_LSTM'
            }
        }
    }else {
        return  {
            ...baseObj,
            ...{
                model_type:'LONGTERM_LSTM'
            }
        }
    }
}

export async function getMeteoCorrelationDataList(analyzeForm){
    let apiObj = {
        'station':analyzeForm.station,
        'start_date':analyzeForm.date,
        'end_date':analyzeForm.end_date,
        'correlation':analyzeForm.selectMeteoElements.join(",")
    }
    const res = await getMeteoCorrelation(apiObj)
    if (res.data.code === 200){
        ElMessage.success("已成功获取分析结果")
        return res.data.data
    }else {
        ElMessage.error(JSON.parse(JSON.stringify(res.data)).msg)
        return []
    }
}