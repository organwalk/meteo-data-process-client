<template>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <el-row>
        <el-icon color="#73767a"><ArrowRight /></el-icon>
        <span class="model-des">&nbsp;Model Information</span>
      </el-row>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <h3 class="model-title">
        <span class="version-span">{{ modelInfo.version }}</span>
        <template v-if="modelInfo.version"> - </template>
        {{ modelInfo.cn_des }}
      </h3>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <el-row>
        <el-icon color="#73767a"><Tickets /></el-icon>
        <span class="info-detail">&nbsp;&nbsp;{{ modelInfo.technology }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-icon color="#73767a"><CircleCheck /></el-icon>
        <span class="info-detail">&nbsp;&nbsp;{{ modelInfo.support }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-icon color="#73767a"><CopyDocument /></el-icon>
        <span class="info-detail">
          &nbsp;&nbsp;{{ formatUpdateDate(modelInfo.update) }}&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </el-row>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
  <br />
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowRight, CircleCheck, CopyDocument, Tickets } from '@element-plus/icons-vue'
import { getMeteoModelInfoData } from '@/service/meteo-data-service'
import { usePredictionStore } from '@/stores/prediction'

const predictionStore = usePredictionStore()
const modelInfo = reactive({})

function formatUpdateDate(updateTime) {
  if (!updateTime) {
    return ''
  }

  return new Date(updateTime).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  const result = await getMeteoModelInfoData()

  if (!result.success) {
    ElMessage.error(result.message)
    return
  }

  Object.assign(modelInfo, result.data)
  const modelList = String(modelInfo.support || 'LSTM')
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)

  predictionStore.setModelList(modelList.length > 0 ? modelList : ['LSTM'])
})
</script>

<style scoped>
.model-des {
  font-size: 10px;
  color: #73767a;
}

.version-span {
  color: #606266;
}

.model-title {
  margin-top: 5px;
  margin-bottom: 10px;
}

.info-detail {
  font-size: 13px;
  color: #73767a;
}
</style>
