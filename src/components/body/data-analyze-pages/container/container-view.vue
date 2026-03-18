<template>
  <el-row v-loading="loading">
    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
      <el-card id="data-analyze-form" shadow="never">
        <template #header>
          <span class="data-analyze-container-title">气象要素相关性分析</span>
        </template>
        <el-form :model="analyzeForm" label-position="top">
          <el-row>
            <el-col :span="24">
              <el-form-item label="选择气象站点">
                <el-select v-model="analyzeForm.station" style="width: 100%">
                  <el-option
                    v-for="item in stationList"
                    :key="item.station"
                    :label="item.name"
                    :value="item.station"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="设定起始时间">
                <el-date-picker
                  v-model="analyzeForm.date"
                  type="date"
                  value-format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  :clearable="false"
                  style="width: 100%"
                  @change="normalizeDate"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="设定结束时间">
                <el-date-picker
                  v-model="analyzeForm.end_date"
                  type="date"
                  value-format="YYYY-MM-DD"
                  :disabled-date="disabledDate"
                  :clearable="false"
                  style="width: 100%"
                  @change="normalizeEndDate"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="选择气象要素">
                <el-select v-model="analyzeForm.selectMeteoElements" multiple style="width: 100%">
                  <el-option
                    v-for="item in config.container.query.form.meteo_elements"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" align="center">
              <el-button type="primary" style="width: 100%" @click="startAnalyze" v-buttonAutoLoseFocus>
                开始分析
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
      <el-card id="data-analyze-chart" shadow="never" body-style="padding-top: 0">
        <container-chart :correlation-list="chartDataList" :elements="chartElements" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted } from 'vue'
import config from '@/config/main-page-config.json'
import ContainerChart from '@/components/body/data-analyze-pages/container/container-chart.vue'
import { useDataAnalysis } from '@/composables/useDataAnalysis'

const {
  loading,
  analyzeForm,
  stationList,
  chartDataList,
  chartElements,
  disabledDate,
  normalizeDate,
  normalizeEndDate,
  startAnalyze,
  loadStations,
} = useDataAnalysis()

onMounted(async () => {
  await loadStations()
})
</script>

<style scoped>
#data-analyze-form {
  height: 725px;
  border-radius: 0;
  font-family: 'Microsoft YaHei', serif;
}

.data-analyze-container-title {
  font-weight: 700;
  color: #333333;
}

#data-analyze-chart {
  width: 100%;
  overflow-x: auto;
  height: 725px;
  border-left: none;
  border-radius: 0;
}
</style>
