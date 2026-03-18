<template>
  <el-card id="container-chart" shadow="hover" v-loading="loading">
    <el-row>
      <el-col :xs="18" :sm="18" :md="18" :lg="21" :xl="21">
        <span>{{ config.container.chart.title }}</span>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="3" :xl="3">
        <el-select v-model="selectMeteoElement">
          <el-option
            v-for="item in config.container.chart.meteo_elements"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div ref="chartRef" class="chart-canvas"></div>
  </el-card>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import config from '@/config/main-page-config.json'
import { createADayMeteoChartOptions, echarts } from '@/service/chart-service'
import { getMeteoByDayAboutStatusAndDataList } from '@/service/meteo-data-service'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const stationList = computed(() => mainPageStore.stationList)
const chartRef = ref(null)
const selectMeteoElement = ref('1')
const loading = ref(false)
let chartInstance = null
let requestId = 0

function resizeChart() {
  chartInstance?.resize()
}

async function loadChartData() {
  if (!stationList.value.length || !chartInstance) {
    return
  }

  requestId += 1
  const currentRequestId = requestId
  loading.value = true
  const meteoDataList = []

  for (const station of stationList.value) {
    const result = await getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement.value)

    if (currentRequestId !== requestId) {
      return
    }

    if (result.success) {
      meteoDataList.push({
        name: station.station,
        data: result.dataList.map((item) => Number(item?.[0] ?? 0)),
      })
    }
  }

  if (currentRequestId === requestId) {
    chartInstance.setOption(createADayMeteoChartOptions(meteoDataList), true)
    loading.value = false

    if (meteoDataList.length === 0) {
      ElMessage.warning('未查询到可用于展示的最新图表数据')
    }
  }
}

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    window.addEventListener('resize', resizeChart)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
  chartInstance = null
})

watch([stationList, selectMeteoElement], loadChartData, {
  immediate: true,
})
</script>

<style scoped>
#container-chart {
  min-height: 55vh;
  border-radius: 10px;
  user-select: none;
  font-family: 'Microsoft YaHei', system-ui;
}

#container-chart span {
  margin-left: 20px;
  font-weight: 700;
}

.chart-canvas {
  width: 100%;
  height: 45vh;
}
</style>
