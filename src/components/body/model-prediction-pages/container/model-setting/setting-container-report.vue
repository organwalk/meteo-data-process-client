<template>
  <el-carousel height="200px" direction="vertical" :autoplay="true" :loop="true" :interval="5000">
    <el-carousel-item>
      <el-divider content-position="left">短期模型评估报告</el-divider>
      <el-descriptions size="small" :column="3" v-if="haveShortReport">
        <el-descriptions-item label="R_MSE" :span="1"><br/>{{ reportObj.rmse }}</el-descriptions-item>
        <el-descriptions-item label="MAE" :span="1"><br/>{{ reportObj.mae }}</el-descriptions-item>
        <el-descriptions-item label="r2" :span="1"><br/>{{ reportObj.r2 }}</el-descriptions-item>
        <el-descriptions-item label="train_loss" :span="2"><br/>{{ reportObj.train_loss }}</el-descriptions-item>
        <el-descriptions-item label="val_loss" :span="2"><br/>{{ reportObj.val_loss }}</el-descriptions-item>
        <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>{{ reportObj.date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-row v-if="!haveShortReport">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
          <span>暂无报告</span>
        </el-col>
      </el-row>
    </el-carousel-item>
    <el-carousel-item>
      <el-divider content-position="left">长期模型评估报告</el-divider>
      <el-descriptions size="small" :column="3" v-if="haveLongReport">
        <el-descriptions-item label="R_MSE" :span="1"><br/>{{ longReportObj.rmse }}</el-descriptions-item>
        <el-descriptions-item label="MAE" :span="1"><br/>{{ longReportObj.mae }}</el-descriptions-item>
        <el-descriptions-item label="r2" :span="1"><br/>{{ longReportObj.r2 }}</el-descriptions-item>
        <el-descriptions-item label="train_loss" :span="2"><br/>{{ longReportObj.train_loss }}</el-descriptions-item>
        <el-descriptions-item label="val_loss" :span="2"><br/>{{ longReportObj.val_loss }}</el-descriptions-item>
        <el-descriptions-item label="Last Model Evaluation Time" :span="4"><br/>{{ longReportObj.date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-row v-if="!haveLongReport">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
          <span>暂无报告</span>
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
  <br/>
</template>

<script setup>

import {getModelReport} from "@/api/meteo-data/api-meteo-data";
import {onBeforeMount, reactive, ref} from "vue";

const haveShortReport = ref(true)
const reportObj = reactive({
  date: '',
  rmse: '',
  mae: '',
  r2: '',
  train_loss: '',
  val_loss: ''
})
const haveLongReport = ref(true)
const longReportObj = reactive({
  date: '',
  rmse: '',
  mae: '',
  r2: '',
  train_loss: '',
  val_loss: ''
})
const getShortReport = async () => {
  const res = await getModelReport({model_type: 'SHORTTERM_LSTM'})
  if (res.data.code === 200) {
    haveShortReport.value = true
    const resObj = res.data.data
    reportObj.date = resObj.date
    reportObj.rmse = Number(resObj.rmse).toFixed(2)
    reportObj.mae = Number(resObj.mae).toFixed(2)
    reportObj.r2 = Number(resObj.r2).toFixed(2)
    reportObj.train_loss = Number(resObj.train_loss).toFixed(2)
    reportObj.val_loss = Number(resObj.val_loss).toFixed(2)
  } else {
    haveShortReport.value = false
  }
}

const getLongReport = async () => {
  const res = await getModelReport({model_type: 'LONGTERM_LSTM'})
  if (res.data.code === 200) {
    haveLongReport.value = true
    const resObj = res.data.data
    longReportObj.date = resObj.date
    longReportObj.rmse = Number(resObj.rmse).toFixed(2)
    longReportObj.mae = Number(resObj.mae).toFixed(2)
    longReportObj.r2 = Number(resObj.r2).toFixed(2)
    longReportObj.train_loss = Number(resObj.train_loss).toFixed(2)
    longReportObj.val_loss = Number(resObj.val_loss).toFixed(2)
  } else {
    haveLongReport.value = false
  }
}

onBeforeMount(async () => {
  await getShortReport()
  await getLongReport()
})
</script>

<style scoped>

</style>