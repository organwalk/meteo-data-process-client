<template>
  <el-card id="model-result-view" shadow="never">
    <div v-if="tableRows.length !== 0">
      <el-table :data="tableRows" border style="width: 100%;" height="700">
        <el-table-column
          v-for="(name, index) in tableHeader"
          :key="index"
          :prop="name"
          :label="name"
          align="center"
        />
      </el-table>
    </div>
    <el-empty
      v-else
      style="height: 80vh"
      :image="getImagePath('not_found.png')"
      description="暂未开始预测"
    />
  </el-card>
</template>

<script setup>
import { computed, watch } from 'vue'
import { METEO_TABLE_HEADER } from '@/constants/meteo'
import { convertToObjectArrayFrom2DArray, getImagePath } from '@/utils/utils'
import { usePredictionStore } from '@/stores/prediction'

const predictionStore = usePredictionStore()
const tableHeader = METEO_TABLE_HEADER
const tableRows = computed(() => convertToObjectArrayFrom2DArray(predictionStore.predictionList, tableHeader))

watch(
  () => predictionStore.predictionList,
  (nextPredictionList) => {
    if (nextPredictionList.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
)
</script>

<style scoped>
#model-result-view {
  font-family: 'Microsoft YaHei', serif;
  color: #333333;
  user-select: none;
  border-radius: 0;
  border-left: none;
}
</style>
