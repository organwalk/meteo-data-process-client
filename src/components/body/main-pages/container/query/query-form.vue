<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
            <el-card id="query-form" shadow="never">
            <el-collapse v-model="openCollapse" v-loading="loadingForm">
                <el-collapse-item  name="queryForm">
                    <template #title>
                        <h2 v-html="config.container.query.form.collapse_title"/>
                    </template>
                    <br/>
                    <el-form :model="formData" label-width="100px">
                        <el-form-item :label="config.container.query.form.label.station">
                            <el-select v-model="formData.selectStation" >
                                <el-option
                                    v-for="item in formData.storeStationList"
                                    :key="item.station"
                                    :label="item.name"
                                    :value="item.station"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="config.container.query.form.label.meteo_elements">
                            <el-select v-model="formData.selectMeteoElements" multiple style="width: 30vw" @remove-tag="checkMeteoElements" placeholder="必须选择一个气象要素">
                                <el-option
                                    v-for="item in config.container.query.form.meteo_elements"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="config.container.query.form.label.time_elements">
                            <el-row :gutter="25">
                                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                                    <el-date-picker
                                        v-model="formData.date"
                                        type="date"
                                        :disabled-date="disabledDate"
                                        @change="changeDateToISO"
                                        :clearable="false"
                                    />
                                </el-col>
                                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" v-if="formData.queryType === 'Query by hour'">
                                    <el-time-select
                                        v-model="formData.hour"
                                        start="00:00"
                                        step="01:00"
                                        end="23:00"
                                        :clearable="false"
                                    />
                                </el-col>
                                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" v-if="formData.queryType === 'Query by date' || formData.queryType === 'Query by condition'" align="right">
                                    <el-date-picker
                                        v-model="formData.end_date"
                                        type="date"
                                        :disabled-date="disabledDate"
                                        @change="changeEndDateToISO"
                                        :clearable="false"
                                    />
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item :label="config.container.query.form.label.condition" v-if="formData.queryType === 'Query by condition'">
                            <el-button @click="edit()" :color="editTipButtonColor" v-buttonAutoLoseFocus plain>{{editTip}}</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 10vw" type="primary" @click="query()" v-buttonAutoLoseFocus>查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            </el-card>
        </el-col>
    </el-row><br/>
    <el-dialog
        v-model="editVisible"
        title="填写气象要素范围"
        width="45%"
        style="border-radius: 10px;padding-left: 20px;padding-right: 20px;padding-top: 20px"
        :show-close="false"
    >
        <el-row :gutter="15" >
            <el-form :model="editData" v-for="item in editData.List" :key="item">
                <el-form-item :label="item.label + '范围'">
                    <el-row>
                        <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                            <el-input-number :controls="false" v-model="editData.editInputStartValue[editData.editInputStartMap[item.value]]" size="small" />
                        </el-col>
                        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" align="center">
                            <span>&nbsp;~</span>
                        </el-col>
                        <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                            <el-input-number :controls="false" v-model="editData.editInputEndValue[editData.editInputEndMap[item.value]]" size="small" />
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-row>
        <template #footer>
            <el-button @click="cancelEdit()" >取消</el-button>
            <el-button type="primary" @click="confirmThisEdit()">确认</el-button>
        </template>
    </el-dialog>
    <query-form-table
        :table-data="tableData"
        :table-header="tableHeader"
        :loading-table="loadingTable"
        :total="total"
        @get-page-number="getPageNumber"
        v-if="isQuery" />
</template>

<script setup>
import {computed, reactive, ref, watch, watchEffect} from "vue";
import config from "@/config/main-page-config.json"
import {useStore} from "vuex";
import {checkMeteoElementsNotNull, getDisabledDate, getGMTTimeToStrISO8601, notEmptyValues} from "@/utils/utils";
import {getStationValidDatesList} from "@/service/station-service";
import {
    getMeteoDataQueryTableByComplex,
    getMeteoDataQueryTableByDate,
    getMeteoDataQueryTableByDay,
    getMeteoDataQueryTableByHour
} from "@/service/meteo-data-service";
import QueryFormTable from "@/components/body/main-pages/container/query/query-form-table.vue";
import {ElMessage} from "element-plus";

const store = useStore()
const openCollapse = ref('queryForm')
const formData = reactive({
    queryType:computed(()=>store.state.mainPages.queryType),
    storeStationList:computed(()=>store.state.mainPages.stationList),
    selectStation:'',
    selectMeteoElements:['1','2'],
    date:'',
    end_date:'',
    hour:'00:00',
    offset:0
})
const validDates = ref([])
const meteoDataList = ref([])
const tableHeader = ref()
const tableData = ref()
const total = ref()
const isQuery = ref(false)
const loadingForm = ref(true)
const loadingTable = ref(false)
const editVisible = ref(false)
const editTip = ref('点击此处填写')
const editTipButtonColor = ref('#909399')
const editData = reactive({
    List:[],
    editInputStartValue:[],
    editInputStartMap:{
        1:'start_temperature',
        2:'start_humidity',
        3:'start_speed',
        4:'start_direction',
        5:'start_rain',
        6:'start_sunlight',
        7:'start_pm25',
        8:'start_pm10',
    },
    editInputEndValue:[],
    editInputEndMap:{
        1:'end_temperature',
        2:'end_humidity',
        3:'end_speed',
        4:'end_direction',
        5:'end_rain',
        6:'end_sunlight',
        7:'end_pm25',
        8:'end_pm10',
    },
    editObj:{}
})

watchEffect(async ()=>{
    if (formData.storeStationList.length !== 0) {
        formData.selectStation = formData.storeStationList[0].station
    }
    validDates.value = await getStationValidDatesList(formData.selectStation)
    loadingForm.value = false
    setDateAndEndDate()
})
watch(() => store.state.mainPages.queryType, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        isQuery.value = false;
        setDateAndEndDate()
    }
});
const setDateAndEndDate = () => {
    if (formData.queryType ==='Query by hour' || formData.queryType ==='Query by day'){
        formData.date = validDates.value[validDates.value.length - 1]
    }else {
        formData.date = validDates.value[validDates.value.length - 2]
        formData.end_date = validDates.value[validDates.value.length - 1]
    }
}

const previousMeteoElements = ref([])
const edit = () => {
    editVisible.value = true
    const currentMeteoElements = formData.selectMeteoElements
    if (JSON.stringify(currentMeteoElements) === JSON.stringify(previousMeteoElements)) {
        return
    }
    editData.List = []
    currentMeteoElements.forEach((item) => {
        config.container.query.form.meteo_elements.find((element) => {
            if (element.value === item) {
                editData.List.push(element)
            }
        })
    })
    previousMeteoElements.value = currentMeteoElements
}

const cancelEdit = () => {
    editVisible.value = false
    editData.editObj = {...editData.editInputStartValue, ...editData.editInputEndValue}
    if (Object.keys(editData.editObj).length !== formData.selectMeteoElements.length * 2 || !notEmptyValues(editData.editObj)){
        editTipButtonColor.value = '#F56C6C'
        editTip.value = '存在空值'
    }
}

const confirmThisEdit = () => {
    console.log(editData.editObj)
    editData.editObj = {...editData.editInputStartValue, ...editData.editInputEndValue}
    if (Object.keys(editData.editObj).length !== formData.selectMeteoElements.length * 2 || !notEmptyValues(editData.editObj)){
        ElMessage.warning("请填写完整数据范围")
    }else {
        editVisible.value = false
        editTipButtonColor.value = '#67C23A'
        editTip.value = '填写完成'
    }
}


const checkMeteoElements = (val) => {
    if (formData.selectMeteoElements.length === 0){
        formData.selectMeteoElements = checkMeteoElementsNotNull(val)
    }
}
const disabledDate = (date) => {
    return getDisabledDate(date,validDates)
}
const changeDateToISO = () => {
    formData.date = getGMTTimeToStrISO8601(formData.date)
    if (formData.queryType === 'Query by date' || formData.queryType === 'Query by condition'){
        if (formData.date > formData.end_date){
            formData.date = formData.end_date
            ElMessage.warning("起始时间不能大于结束时间")
        }
    }
}
const changeEndDateToISO = () => {
    formData.end_date = getGMTTimeToStrISO8601(formData.end_date)
    if (formData.queryType === 'Query by date' || formData.queryType === 'Query by condition'){
        if (formData.date > formData.end_date){
            formData.end_date = formData.date
            ElMessage.warning("结束时间不能早于起始时间")
        }
    }
}
const getPageNumber = async (pageNumber) => {
    loadingTable.value = true
    if (pageNumber === 1){
        formData.offset = (pageNumber-1) * 10
    }else {
        formData.offset = (pageNumber-1) * 10 + 1
    }
    await queryByType()
}

const query = async () => {
    if (formData.queryType === 'Query by condition' && (Object.keys(editData.editObj).length !== formData.selectMeteoElements.length * 2 || !notEmptyValues(editData.editObj))){
        ElMessage.warning("请填写完整复合条件")
    }else {
        if (formData.selectMeteoElements.length === 0){
            formData.selectMeteoElements = checkMeteoElementsNotNull('1')
        }else {
            isQuery.value = true
            loadingTable.value = true
            meteoDataList.value = []
            await queryByType()
        }
    }
}

const queryByType = async () => {
    switch (formData.queryType){
        case 'Query by hour':
            await getMeteoDataQueryTableByHour(formData,meteoDataList,total,tableHeader,tableData,loadingTable)
            break
        case 'Query by day':
            await getMeteoDataQueryTableByDay(formData,meteoDataList,total,tableHeader,tableData,loadingTable)
            break
        case 'Query by date':
            await getMeteoDataQueryTableByDate(formData,meteoDataList,total,tableHeader,tableData,loadingTable)
            break
        case 'Query by condition':
            await getMeteoDataQueryTableByComplex(formData,editData.editObj,meteoDataList,total,tableHeader,tableData,loadingTable)
            break
    }
}

</script>

<style scoped>
#query-form{
    border-radius: 10px;
    font-family: 微软雅黑,serif;
    user-select: none;
}
::v-global(.el-collapse) {
    --el-collapse-border-color: #ffffff
}

</style>