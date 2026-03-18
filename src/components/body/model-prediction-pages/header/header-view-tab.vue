<template>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="modelName in modelList"
          :key="modelName"
          :label="modelName"
          :name="modelName"
        />
      </el-tabs>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { usePredictionStore } from '@/stores/prediction'

const predictionStore = usePredictionStore()
const modelList = computed(() => predictionStore.modelList)
const activeName = ref('')

watch(
  modelList,
  (nextModelList) => {
    activeName.value = nextModelList[0] ?? ''
  },
  { immediate: true },
)
</script>

<style scoped>
:deep(.el-tabs__item) {
  font-family: 'Microsoft YaHei', serif;
  font-weight: 700;
  color: #73767a;
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}

:deep(.el-tabs__item:hover),
:deep(.el-tabs__item.is-active) {
  color: #337ecc;
}

:deep(.el-tabs__active-bar) {
  background-color: #337ecc;
}
</style>
