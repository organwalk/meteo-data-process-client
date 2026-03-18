<template>
  <el-card id="setting-container" shadow="never" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-form :model="configForm" label-position="top">
          <setting-container-station v-model="configForm.station" :station-list="stationList" />
          <setting-container-report v-if="predictionStore.report" />
          <setting-container-plan :plan-type="planType" @change-plan-type="changePlanType" />
          <el-divider content-position="left">从这里开始预测</el-divider>
          <el-row :gutter="15">
            <el-col :span="18">
              <el-date-picker
                v-model="configForm.date"
                type="date"
                value-format="YYYY-MM-DD"
                :disabled-date="disabledDate"
                :clearable="false"
                style="width: 100%"
                @change="normalizeDate"
              />
            </el-col>
            <el-col :span="6" align="left">
              <el-button type="primary" color="#2261ec" style="width: 90%" @click="startPrediction" v-buttonAutoLoseFocus>
                开始预测
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { onMounted } from 'vue'
import SettingContainerReport from '@/components/body/model-prediction-pages/container/model-setting/setting-container-report.vue'
import SettingContainerStation from '@/components/body/model-prediction-pages/container/model-setting/setting-container-station.vue'
import SettingContainerPlan from '@/components/body/model-prediction-pages/container/model-setting/setting-container-plan.vue'
import { usePrediction } from '@/composables/usePrediction'

const {
  configForm,
  loading,
  stationList,
  planType,
  disabledDate,
  normalizeDate,
  changePlanType,
  startPrediction,
  loadStations,
  predictionStore,
} = usePrediction()

onMounted(async () => {
  await loadStations()
})
</script>

<style scoped>
#setting-container {
  border: none;
  border-radius: 0;
}

:deep(.el-form-item__label) {
  font-size: 10px;
  font-family: 'Microsoft YaHei', serif;
}

:deep(.el-divider__text) {
  color: #73767a;
  font-size: 10px;
  padding-left: 0;
  padding-right: 10px;
}

:deep(.el-divider__text.is-left) {
  left: 0;
}

:deep(.el-descriptions__label:not(.is-bordered-label)) {
  color: #73767a;
}

:deep(.el-descriptions__content:not(.is-bordered-label)) {
  color: #333333;
}

:deep(.el-carousel__button) {
  background-color: #808080;
}
</style>
