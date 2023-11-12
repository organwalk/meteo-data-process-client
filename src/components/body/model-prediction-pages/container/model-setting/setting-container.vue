<template>
    <el-card id="setting-container" shadow="never" v-loading="loading">
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form :model="configForm" label-position="top">
                    <setting-container-station
                        :station="configForm.station"
                        :station-list="stationList"
                    />
                    <setting-container-report v-if="report"/>
                    <setting-container-plan
                        :plan-type="planType"
                        @change-plan-type="changePlanType"
                    />
                    <el-divider content-position="left">从这里开始预测</el-divider>
                    <el-row :gutter="15">
                        <el-col :xs="getStartDateSpan()" :sm="getStartDateSpan()" :md="getStartDateSpan()" :lg="getStartDateSpan()" :xl="getStartDateSpan()">
                            <el-date-picker
                                v-model="configForm.date"
                                type="date"
                                :disabled-date="disabledDate"
                                @change="changeDateToISO"
                                :clearable="false"
                                style="width: 100%"
                            />
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="left">
                            <el-button type="primary" color="#2261ec" style="width: 90%" @click="startPrediction()">开始预测</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {getStationData, getStationValidDatesList} from "@/service/station-service";
import {getDisabledDate, getFutureDates, getGMTTimeToStrISO8601} from "@/utils/utils";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import SettingContainerReport
    from "@/components/body/model-prediction-pages/container/model-setting/setting-container-report.vue";
import SettingContainerStation
    from "@/components/body/model-prediction-pages/container/model-setting/setting-container-station.vue";
import SettingContainerPlan
    from "@/components/body/model-prediction-pages/container/model-setting/setting-container-plan.vue";
import {getMeteoModelPredictData, getMeteoModelPredictionApiObj} from "@/service/meteo-data-service";

const configForm = reactive({
    station:'',
    date:'',
    end_date:''
})
const loading = ref(true)
const configHeight = ref()
const stationList = ref([])
const planType = ref('24小时预测')
const validDates = ref([])
const paddingZero = ref()
const report = ref()
const store = useStore()

const startPrediction = async () => {
    loading.value = true
    const apiObj = await getMeteoModelPredictionApiObj(configForm,planType)
    const data = await getMeteoModelPredictData(apiObj)
    let hour = 0;
    let minute = 0;
    if (planType.value === '24小时预测'){
      for (let i = 0; i < data.length; i++) {
        let innerArray = data[i];
        // 添加时间
        let time = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
        innerArray.unshift(time);
        // 更新时间
        hour++;
        if (hour === 24) {
          hour = 0;
          minute++;
        }
      }
    }else if (planType.value === '未来七日预测'){
      const future = getFutureDates(configForm.date, 7)
     for (let i = 0; i < data.length; i++){
       let innerArray = data[i];
       innerArray.unshift(future[i])
     }
    }
    await store.dispatch('updatePredictionList',data)
    loading.value = false
}
const changePlanType = (newVal) => {
    if (newVal !== planType.value) {
        planType.value = newVal
        setDateAndEndDate()
    }
}
const disabledDate = (date) => {
    return getDisabledDate(date,validDates)
}
watchEffect(async ()=>{
    loading.value = true
    if (stationList.value.length !== 0) {
        configForm.station = stationList.value[0].station
    }
    validDates.value = await getStationValidDatesList(configForm.station)
    loading.value = false
    setDateAndEndDate()
})
watch(()=>store.state.modelPredictionPages.paddingZero,(newPaddingZero) => {
    loading.value = true
    setTimeout(()=>{
        paddingZero.value = newPaddingZero
        loading.value = false
    },500)
})
watch(()=>store.state.modelPredictionPages.report,(newReport) => {
    loading.value = true
    setTimeout(()=>{
        report.value = newReport
        loading.value = false
    },500)
})

const changeDateToISO = () => {
    configForm.date = getGMTTimeToStrISO8601(configForm.date)
    if (planType.value !== "24小时预测" && configForm.date > configForm.end_date){
        configForm.date = configForm.end_date
        ElMessage.warning("起始时间不能大于结束时间")
    }
}
const setDateAndEndDate = () => {
  configForm.date = validDates.value[validDates.value.length - 1]
}
const getStartDateSpan = () => {
    if (planType.value === "24小时预测"){
        return 18
    }else {
        return 18
    }
}
onMounted(async ()=>{
    const stationData = await getStationData(loading)
    stationList.value = stationData.stationList
    configForm.station = stationList.value[0].station
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight
    configHeight.value = viewportHeight * 0.5
    report.value = store.state.modelPredictionPages.report
    paddingZero.value = store.state.modelPredictionPages.paddingZero
})

</script>

<style scoped>
#setting-container{
    border: none;
    border-radius: 0;
}

/deep/ .el-form-item__label{
    font-size: 10px;
    font-family: 微软雅黑,serif;
}
/deep/ .el-divider__text{
    color: #73767a;
    font-size: 10px;
    padding-left: 0;
    padding-right: 10px;
}
/deep/ .el-divider__text.is-left{
    left: 0;
}
/deep/ .el-descriptions__label:not(.is-bordered-label){
    color: #73767a;
}
/deep/ .el-descriptions__content:not(.is-bordered-label){
    color: #333333;
}
:deep(.el-carousel__button){
    background-color: #808080;
}
</style>