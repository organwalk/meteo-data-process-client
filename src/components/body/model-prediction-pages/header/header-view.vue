<template>
  <el-row v-loading="loadingHeader">
    <el-col :span="24">
      <el-card
        id="model-prediction-pages-header-view"
        shadow="never"
        body-style="padding-left: 0; padding-right: 0; padding-bottom: 0;"
      >
        <header-view-des />
        <header-view-tab class="header-view-tab" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import HeaderViewDes from '@/components/body/model-prediction-pages/header/header-view-des.vue'
import HeaderViewTab from '@/components/body/model-prediction-pages/header/header-view-tab.vue'
import { usePredictionStore } from '@/stores/prediction'

const predictionStore = usePredictionStore()
const loadingHeader = computed(() => predictionStore.modelList.length === 0)
</script>

<style scoped>
#model-prediction-pages-header-view {
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
  background-color: #f6f8fa;
  border-radius: 0;
  height: 22vh;
  border-left: none;
  border-right: none;
  color: #333333;
}
</style>
