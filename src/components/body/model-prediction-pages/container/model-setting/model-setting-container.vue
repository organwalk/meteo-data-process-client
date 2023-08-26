<template>
    <el-scrollbar :height="configHeight">
    <el-card id="setting-container" shadow="never" v-loading="loading">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form :model="configForm" label-position="top">
                        <el-form-item label="气象站">
                            <el-select v-model="configForm.station" style="width: 100%" >
                                <el-option
                                        v-for="item in stationList"
                                        :key="item.station"
                                        :label="item.name"
                                        :value="item.station"
                                />
                            </el-select>
                        </el-form-item>
                        <div v-if="report">
                            <el-carousel height="200px" direction="vertical" :autoplay="true" :loop="true" :interval="5000">
                                <el-carousel-item>
                                    <el-divider content-position="left">短期模型评估报告</el-divider>
                                    <el-descriptions size="small" :column="3">
                                        <el-descriptions-item label="MSE" :span="1"><br/>76.02</el-descriptions-item>
                                        <el-descriptions-item label="R_MSE" :span="1"><br/>1.36</el-descriptions-item>
                                        <el-descriptions-item label="MAE" :span="1"><br/>5.46</el-descriptions-item>
                                        <el-descriptions-item label="Loss" :span="1"><br/>13.06</el-descriptions-item>
                                        <el-descriptions-item label="Validation Loss" :span="2"><br/>20.03</el-descriptions-item>
                                        <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>2023-03-21</el-descriptions-item>
                                    </el-descriptions>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <el-divider content-position="left">长期模型评估报告</el-divider>
                                    <el-descriptions size="small" :column="3">
                                        <el-descriptions-item label="MSE" :span="1"><br/>76.02</el-descriptions-item>
                                        <el-descriptions-item label="R_MSE" :span="1"><br/>1.36</el-descriptions-item>
                                        <el-descriptions-item label="MAE" :span="1"><br/>5.46</el-descriptions-item>
                                        <el-descriptions-item label="Loss" :span="1"><br/>13.06</el-descriptions-item>
                                        <el-descriptions-item label="Validation Loss" :span="2"><br/>20.03</el-descriptions-item>
                                        <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>2023-03-21</el-descriptions-item>
                                    </el-descriptions>
                                </el-carousel-item>
                            </el-carousel><br/>
                        </div>
                        <el-divider content-position="left">预测方案</el-divider>
                        <el-row :gutter="20">
                            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" v-for="item in config.model_config.plan" :key="item">
                                <el-card class="predict-card"
                                         :class="planType === item.title ? 'click-plan':''"
                                         style="height: 20vh" shadow="never" @click="changePlanType(item.title)">
                                    <span class="predict-title" v-html="item.title" /><br/><br/>
                                    <span class="predict-des" v-html="item.des" />
                                </el-card>
                            </el-col>
                        </el-row><br/>
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
                            <el-col v-if="planType !== '24小时预测'" :xs="getStartDateSpan()" :sm="getStartDateSpan()" :md="getStartDateSpan()" :lg="getStartDateSpan()" :xl="getStartDateSpan()">
                                <el-date-picker
                                    v-model="configForm.end_date"
                                    type="date"
                                    :disabled-date="disabledDate"
                                    @change="changeEndDateToISO"
                                    :clearable="false"
                                    style="width: 100%"
                                />
                            </el-col>
                            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="left">
                                <el-button type="primary" color="#2261ec" style="width: 90%">开始预测</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
      </el-card>
    </el-scrollbar>
</template>

<script setup>
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {getStationData, getStationValidDatesList} from "@/service/station-service";
import config from "@/config/model-prediction-page-config.json"
import {getDisabledDate, getGMTTimeToStrISO8601} from "@/utils/utils";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";

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
    if (stationList.value.length !== 0) {
        configForm.station = stationList.value[0].station
    }
    validDates.value = await getStationValidDatesList(configForm.station)
    loading.value = false
    setDateAndEndDate()
})
watch(()=>store.state.modelPredictionPages.paddingZero,(newPaddingZero) => {
    console.log(2222)
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
const changeEndDateToISO = () => {
    configForm.end_date = getGMTTimeToStrISO8601(configForm.end_date)
    if (planType.value !== "24小时预测" && configForm.date > configForm.end_date){
        configForm.end_date = configForm.date
        ElMessage.warning("结束时间不能早于起始时间")
    }
}
const setDateAndEndDate = () => {
    if (planType.value !== "24小时预测"){
        configForm.date = validDates.value[validDates.value.length - 7]
        configForm.end_date = validDates.value[validDates.value.length - 1]
    }else {
        configForm.date = validDates.value[validDates.value.length - 1]
    }
}
const getStartDateSpan = () => {
    if (planType.value === "24小时预测"){
        return 18
    }else {
        return 9
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
.predict-title{
    font-size: 15px;
    font-weight: bolder;
}
.predict-des{
    font-size: 10px;
    font-weight: lighter;
}
.predict-card:hover{
    border: 1px solid #409EFF;
    background-color: #f4f9ff;
}
.click-plan{
    border: 1px solid #409EFF;
    background-color: #f4f9ff;
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