<template>
  <el-card id="container-server" shadow="never" v-loading="loading">
    <el-row>
      <el-col :xs="18" :sm="18" :md="18" :lg="20" :xl="20">
        <span>{{ config.container.server.title }}</span>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
        <el-select v-model="selectStation">
          <el-option
            v-for="item in stationList"
            :key="item.station"
            :label="item.name"
            :value="item.station"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <server-card :card-data="{ title: config.container.server.card.station_name, content: stationName }" />
      <server-card :card-data="{ title: config.container.server.card.start_date, content: startDate }" />
      <server-card :card-data="{ title: config.container.server.card.running_status, content: '正常' }" />
    </el-row>
    <br />
    <server-collection />
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import config from '@/config/main-page-config.json'
import ServerCard from '@/components/body/main-pages/container/server/server-card.vue'
import ServerCollection from '@/components/body/main-pages/container/server/server-collection.vue'
import { getStartDate } from '@/service/station-service'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const stationList = computed(() => mainPageStore.stationList)
const selectStation = ref('')
const stationName = ref('')
const startDate = ref('')
const loading = ref(false)

async function loadStationSummary(station) {
  if (!station) {
    stationName.value = ''
    startDate.value = ''
    return
  }

  loading.value = true
  mainPageStore.setCurrentStation(station)
  stationName.value = stationList.value.find((item) => item.station === station)?.name ?? ''

  const result = await getStartDate(station)
  startDate.value = result.data
  loading.value = false

  if (!result.success) {
    ElMessage.error(result.message)
  }
}

watch(
  stationList,
  (nextStationList) => {
    if (!selectStation.value && nextStationList.length > 0) {
      selectStation.value = nextStationList[0].station
    }
  },
  { immediate: true },
)

watch(selectStation, loadStationSummary, { immediate: true })
</script>

<style scoped>
#container-server {
  border-radius: 10px;
  user-select: none;
  font-family: 'Microsoft YaHei', serif;
}

#container-server span {
  font-weight: 700;
  font-size: larger;
}

:deep(.el-input__wrapper),
:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
  box-shadow: none;
}
</style>
