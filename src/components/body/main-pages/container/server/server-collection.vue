<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-card id="container-collection" shadow="hover" v-loading="loading">
        <el-row>
          <el-col :xs="18" :sm="18" :md="18" :lg="16" :xl="16">
            <span>{{ config.container.collection.overview_title }}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="8" :xl="8" align="right">
            <el-date-picker
              v-model="pickMonth"
              type="month"
              value-format="YYYY-MM"
              :disabled-date="disabledDate"
              :editable="false"
              :clearable="false"
              style="width: 9vw"
              @change="change"
            />
          </el-col>
        </el-row>
        <collection-statistics-card />
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-card id="container-collection" shadow="hover">
        <el-row>
          <span>{{ config.container.collection.analyze.title }}</span>
        </el-row>
        <server-collection-analyze-card />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import config from '@/config/main-page-config.json'
import CollectionStatisticsCard from '@/components/body/main-pages/container/server/server-collection-statistics-card.vue'
import ServerCollectionAnalyzeCard from '@/components/body/main-pages/container/server/server-collection-analyze-card.vue'
import { getStationValidDatesList } from '@/service/station-service'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const station = computed(() => mainPageStore.currentStation)
const loading = ref(false)
const pickMonth = ref('')
const validDates = ref([])
const validMonths = computed(() => {
  return [...new Set(validDates.value.map((item) => item.slice(0, 7)))]
})

function disabledDate(date) {
  return !validMonths.value.includes(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`)
}

async function loadValidDates(currentStation) {
  if (!currentStation) {
    validDates.value = []
    pickMonth.value = ''
    return
  }

  loading.value = true
  const result = await getStationValidDatesList(currentStation)
  validDates.value = result.data
  pickMonth.value = result.data.at(-1)?.slice(0, 7) ?? ''
  mainPageStore.setCurrentMonth(pickMonth.value)
  loading.value = false
}

function change() {
  mainPageStore.setCurrentMonth(pickMonth.value)
}

watch(station, loadValidDates, { immediate: true })
</script>

<style scoped>
#container-collection {
  border-radius: 10px;
  user-select: none;
  font-family: 'Microsoft YaHei', serif;
  min-height: 60vh;
}

#container-collection span {
  font-weight: 700;
  font-size: larger;
}
</style>
