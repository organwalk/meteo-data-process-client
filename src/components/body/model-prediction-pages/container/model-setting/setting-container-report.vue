<template>
  <el-carousel height="200px" direction="vertical" :autoplay="true" :loop="true" :interval="5000">
    <el-carousel-item>
      <el-divider content-position="left">短期模型评估报告</el-divider>
      <el-descriptions v-if="shortReport" size="small" :column="3">
        <el-descriptions-item label="RMSE"><br />{{ shortReport.rmse }}</el-descriptions-item>
        <el-descriptions-item label="MAE"><br />{{ shortReport.mae }}</el-descriptions-item>
        <el-descriptions-item label="R2"><br />{{ shortReport.r2 }}</el-descriptions-item>
        <el-descriptions-item label="train_loss" :span="2"><br />{{ shortReport.train_loss }}</el-descriptions-item>
        <el-descriptions-item label="val_loss" :span="2"><br />{{ shortReport.val_loss }}</el-descriptions-item>
        <el-descriptions-item label="Last Model Evaluation Time" :span="4">
          <br />{{ shortReport.date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-row v-else>
        <el-col :span="24" align="center">
          <span>暂无报告</span>
        </el-col>
      </el-row>
    </el-carousel-item>
    <el-carousel-item>
      <el-divider content-position="left">长期模型评估报告</el-divider>
      <el-descriptions v-if="longReport" size="small" :column="3">
        <el-descriptions-item label="RMSE"><br />{{ longReport.rmse }}</el-descriptions-item>
        <el-descriptions-item label="MAE"><br />{{ longReport.mae }}</el-descriptions-item>
        <el-descriptions-item label="R2"><br />{{ longReport.r2 }}</el-descriptions-item>
        <el-descriptions-item label="train_loss" :span="2"><br />{{ longReport.train_loss }}</el-descriptions-item>
        <el-descriptions-item label="val_loss" :span="2"><br />{{ longReport.val_loss }}</el-descriptions-item>
        <el-descriptions-item label="Last Model Evaluation Time" :span="4">
          <br />{{ longReport.date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-row v-else>
        <el-col :span="24" align="center">
          <span>暂无报告</span>
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
  <br />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { formatModelReport } from '@/modules/prediction/prediction-helpers'
import { getModelReportData } from '@/service/meteo-data-service'

const shortReport = ref(null)
const longReport = ref(null)

onMounted(async () => {
  const [shortResult, longResult] = await Promise.all([
    getModelReportData('SHORTTERM_LSTM'),
    getModelReportData('LONGTERM_LSTM'),
  ])

  shortReport.value = shortResult.success ? formatModelReport(shortResult.data) : null
  longReport.value = longResult.success ? formatModelReport(longResult.data) : null
})
</script>
