<template>
    <el-row v-loading="loading">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-card shadow="never" id="data-analyze-form">
                <template #header>
                    <span class="data-analyze-container-title">气象要素相关性分析</span>
                </template>
                <el-form :model="analyzeForm" label-position="top">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="选择气象站点">
                                <el-select v-model="analyzeForm.station" style="width: 100%" >
                                    <el-option
                                        v-for="item in stationList"
                                        :key="item.station"
                                        :label="item.name"
                                        :value="item.station"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="设定起始时间">
                                <el-date-picker
                                    v-model="analyzeForm.date"
                                    type="date"
                                    :disabled-date="disabledDate"
                                    @change="changeDateToISO"
                                    :clearable="false"
                                    style="width: 100%"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="设定截止时间">
                                <el-date-picker
                                    v-model="analyzeForm.end_date"
                                    type="date"
                                    :disabled-date="disabledDate"
                                    @change="changeEndDateToISO"
                                    :clearable="false"
                                    style="width: 100%"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="选择气象要素">
                                <el-select v-model="analyzeForm.selectMeteoElements" multiple style="width: 30vw" @remove-tag="checkMeteoElements" placeholder="选择两个及以上的要素">
                                    <el-option
                                        v-for="item in config.container.query.form.meteo_elements"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
                            <el-button type="primary" @click="startAnalyze()" style="width: 100%" v-buttonAutoLoseFocus>开始分析</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <el-card shadow="never" id="data-analyze-chart" body-style="padding-top:0">
                <container-chart :correlation-list="chartDataList" :elements="chartElements"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import ContainerChart from "@/components/body/data-analyze-pages/container/container-chart.vue";
import config from "@/config/main-page-config.json"
import {onMounted, reactive, ref, watchEffect} from "vue";
import {getStationData, getStationValidDatesList} from "@/service/station-service";
import {checkMeteoElementsNotNull, getDisabledDate, getGMTTimeToStrISO8601} from "@/utils/utils";
import {ElMessage} from "element-plus";
// import {getMeteoCorrelationDataList} from "@/service/meteo-data-service";


const analyzeForm = reactive({
    station:'',
    date:'',
    end_date:'',
    selectMeteoElements:['1','2','3','4','5','6','7','8']
})
const loading = ref(true)
const stationList = ref([])
const validDates = ref([])
const chartDataList = ref([])
const chartElements = ref([])

const disabledDate = (date) => {
    return getDisabledDate(date,validDates)
}
watchEffect(async ()=>{
    loading.value = true
    if (stationList.value.length !== 0) {
        analyzeForm.station = stationList.value[0].station
    }
    validDates.value = await getStationValidDatesList(analyzeForm.station)
    loading.value = false
    setDateAndEndDate()
})
const startAnalyze = async () => {
    // const list = await getMeteoCorrelationDataList(analyzeForm)
    // if (list.length > 0){
    //     chartDataList.value = list
    // }
    const elementsCNMap = {
        '1':'温度',
        '2':'湿度',
        '3':'风速',
        '4':'风向',
        '5':'降雨',
        '6':'光照',
        '7':'PM25',
        '8':'PM10'
    }
    analyzeForm.selectMeteoElements.sort()
    chartElements.value = analyzeForm.selectMeteoElements.map(elements => elementsCNMap[elements])
}
const setDateAndEndDate = () => {
    analyzeForm.date = validDates.value[validDates.value.length - 2]
    analyzeForm.end_date = validDates.value[validDates.value.length - 1]
}
const changeDateToISO = () => {
    analyzeForm.date = getGMTTimeToStrISO8601(analyzeForm.date)
    if (analyzeForm.date > analyzeForm.end_date){
        analyzeForm.date = analyzeForm.end_date
        ElMessage.warning("起始时间不能大于结束时间")
    }
}
const changeEndDateToISO = () => {
    analyzeForm.end_date = getGMTTimeToStrISO8601(analyzeForm.end_date)
    if (analyzeForm.date > analyzeForm.end_date){
        analyzeForm.end_date = analyzeForm.date
        ElMessage.warning("结束时间不能早于起始时间")
    }
}
const checkMeteoElements = (val) => {
    if (analyzeForm.selectMeteoElements.length === 0){
        analyzeForm.selectMeteoElements = checkMeteoElementsNotNull(val,2)
    }
}
onMounted(async ()=>{
    const stationData = await getStationData(loading)
    stationList.value = stationData.stationList
    if (stationList.value.length !== 0) {
        analyzeForm.station = stationList.value[0].station
    }
    validDates.value = await getStationValidDatesList(analyzeForm.station)
    loading.value = false
})
</script>

<style scoped>
#data-analyze-form{
    height: 725px;
    border-radius: 0;
    font-family: 微软雅黑,serif;
}
.data-analyze-container-title{
    font-weight: bold;
    color: #333333;
}
#data-analyze-chart{
    width: 100%;
    overflow-x: auto;
    height: 725px;
    border-left: none;
    border-radius: 0;
}
</style>