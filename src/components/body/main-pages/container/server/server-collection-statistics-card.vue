<template>
  <el-card id="collection-statistics-card" shadow="never" v-loading="loading">
    <el-table :data="statisticsTableData" height="285" style="width: 100%">
      <el-table-column prop="day" label="采集日期" />
      <el-table-column prop="total" label="数据总量" />
    </el-table>
  </el-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useMainPageStore } from '@/stores/main-page'
import { getStationMeteoDataCountByMonthList } from '@/service/station-service'

const mainPageStore = useMainPageStore()
const currentStation = computed(() => mainPageStore.currentStation)
const currentMonth = computed(() => mainPageStore.currentMonth)
const statisticsTableData = ref([])
const loading = ref(false)

async function loadStatistics() {
  if (!currentStation.value || !currentMonth.value) {
    statisticsTableData.value = []
    return
  }

  const year = currentMonth.value.substring(0, 4)
  const month = currentMonth.value.substring(5, 7)
  loading.value = true
  const result = await getStationMeteoDataCountByMonthList(currentStation.value, year, month)
  statisticsTableData.value = result.data
  loading.value = false
}

watch([currentStation, currentMonth], loadStatistics, { immediate: true })
</script>

<style scoped>
#collection-statistics-card {
  border-radius: 10px;
  user-select: none;
  font-family: 'Microsoft YaHei', serif;
  min-height: 45vh;
  margin-top: 4vh;
}
</style>
