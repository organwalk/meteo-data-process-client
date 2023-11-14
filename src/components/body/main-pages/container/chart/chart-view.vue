<template>
  <el-card id="container-chart" shadow="hover" v-loading="loading">
    <el-row>
      <el-col :xs="8" :sm="6" :md="4" :lg="21" :xl="1">
        <span v-html="config.container.chart.title"/>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <el-select v-model="selectMeteoElement" @change="changeElement()">
          <el-option
              v-for="item in config.container.chart.MeteoElements"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div id="aDayMeteoChart" style="width: 100%; height: 45vh"></div>
  </el-card>
</template>

<script setup>
import config from "@/config/main-page-config.json";
import {onMounted, ref} from "vue";
import {getStationData} from "@/service/station-service";
import {getADayMeteoChart} from "@/service/chart-service";
import {getMeteoByDayAboutStatusAndDataList} from "@/service/meteo-data-service";
import {useStore} from "vuex";

const store = useStore()
const selectMeteoElement = ref('1')
const loading = ref(false)
onMounted(async () => {
  await getContainerChart()
})

const changeElement = async () => {
  await getContainerChart()
}

const getContainerChart = async () => {
  loading.value = true
  const stationData = await getStationData(loading)
  await store.dispatch('updateStationList', stationData.stationList)
  let meteoDataList = []
  for (const station of stationData.stationList) {
    const statusAndDataListObj = await getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement)
    if (statusAndDataListObj.status === 1) {
      const data = statusAndDataListObj.dataList.map(item => Number(item[0]));
      meteoDataList.push({
        name: station.station,
        data: data
      });
    }
  }
  getADayMeteoChart(meteoDataList)
  loading.value = false
}
</script>

<style scoped>
#container-chart {
  height: 55vh;
  border-radius: 10px;
  user-select: none;
  font-family: 微软雅黑, system-ui;
}

#container-chart span {
  margin-left: 20px;
  font-weight: bolder;
}
</style>