<template>
  <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" align="right">
    <el-button class="tab-el-button"
               v-for="tab in config.tab.button"
               :key="tab.text"
               @click="pushRouter(tab.route)"
               text
               :style="getButtonBackGroundColor(tab.route)"
               v-buttonAutoLoseFocus>
      <h3>{{ tab.text }}</h3>
    </el-button>
    <el-button v-if="showSignOut" class="tab-el-button"
               @click="signOutSystem()"
               v-html="config.tab.sign_out" text/>
    <el-badge v-if="nowPath === '/main'"
              :value="badgeValue"
              :type="badgeType"
              :hidden="setHidden(badgeValue)"
              style="margin-top: -10px;margin-left: 5px">
      <el-button :icon="Refresh" circle/>
    </el-badge>
  </el-col>
</template>

<script setup>
import config from "@/config/client-header-config.json"
import {onBeforeMount, ref, watchEffect} from "vue";
import {signOutSystem} from "@/service/auth-service";
import {
  Refresh
} from '@element-plus/icons-vue'
import {connectDataSaveServer, syncDateRange, syncLatestDate, syncStationData} from "@/api/meteo-data/api-obtain-sync";
import {ElMessage} from "element-plus";
import {getStationDate, getStationInfo} from "@/api/station/api-station";
const pushRouter = (route) => {
  window.location.href = route
}
const showSignOut = ref(false)
watchEffect(() => {
  showSignOut.value = !!sessionStorage.getItem("auth");
})
const getButtonBackGroundColor = (route) => {
  if (window.location.pathname === route) {
    return {backgroundColor: '#f4f4f5'}
  }
}

const nowPath = ref(window.location.pathname)
const badgeValue = ref('12')
const badgeType = ref('danger')
const setHidden = (val) => {
  return val === '0' && val !== '!';
}

// 与远程数据存储服务器建立连接
const connectServer = async () => {
  const res = await connectDataSaveServer()
  if (res.data.success === 1){
    ElMessage.success(res.data.data)
    await syncStationCodeServer()
  }else {
    ElMessage.warning(res.data.data)
    badgeValue.value = '!'
  }
}

// 同步气象站编号数据
const syncStationCodeServer = async () => {
  const res = await syncStationData()
  if (res.data.success === 1){
    ElMessage.success(res.data.data)
    await syncStationDataRange()
  }else {
    ElMessage.warning(res.data.data)
    badgeValue.value = '!'
  }
}

// 计算各个气象站共有多少日的数据待同步
const syncStationDataRange = async () => {
  const res = await syncDateRange()
  if (res.data.success === 1){
    ElMessage.success(res.data.data)
    const station = await getStationInfo()
    const latestDate = await getMeteoDataLatestDate()
    for (const item of station.data.staion){
      const dataList = await getMeteoDateList(item.station)
      if (latestDate !== ""){
        const processList = getDatesAfter(dataList, latestDate)
        sessionStorage.setItem(item.station, processList)
        console.log(processList)
      }else {
        badgeValue.value = "!"
      }
    }
  }else {
    ElMessage.warning(res.data.data)
    badgeValue.value = '!'
  }
}

// 获取采集日期列表
const getMeteoDateList = async (station) => {
  const res = await getStationDate(station)
  return res.data.data
}
// 获取气象数据最新记录日期
const getMeteoDataLatestDate = async () => {
  const res = await syncLatestDate()
  if (res.data.success === 1){
    return res.data.data
  }else {
    return ""
  }
}

// 获取未同步的日期列表
const getDatesAfter = (dataList, latestDate) => {
  // 将日期字符串转换为日期对象
  const dates = dataList.map(dateStr => new Date(dateStr));
  // 对日期对象进行排序
  dates.sort((a, b) => a - b);
  // 找到latestDate在排序后日期列表中的索引
  const latestDateIndex = dates.findIndex(date => date.getTime() === new Date(latestDate).getTime());
  // 获取latestDate之后的日期列表
  const datesAfterLatest = dates.slice(latestDateIndex + 1);
  // 将日期对象转换回日期字符串
  return datesAfterLatest.map(date => date.toISOString().split('T')[0]);
}

onBeforeMount(async () => {
  if (nowPath.value === '/main'){
    await connectServer()
  }
})

</script>

<style scoped>
.tab-el-button {
  margin-top: 10px;
  margin-bottom: 20px;
  height: 5vh;
  font-family: 微软雅黑, serif;
}

h3 {
  color: #333333;
  font-weight: lighter;
}

:deep(.el-button.is-text:not(.is-disabled):hover) {
  background-color: #f4f4f5;
}

:deep(.el-button.is-text:not(.is-disabled):focus) {
  background-color: #f4f4f5;
}
</style>