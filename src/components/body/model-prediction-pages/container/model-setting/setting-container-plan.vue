<template>
  <el-divider content-position="left">预测方案</el-divider>
  <el-row :gutter="20">
    <el-col v-for="item in config.model_config.plan" :key="item.title" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <el-card
        class="predict-card"
        :class="{ 'click-plan': planType === item.title }"
        style="height: 20vh"
        shadow="never"
        @click="emit('changePlanType', item.title)"
      >
        <span class="predict-title">{{ item.title }}</span>
        <br /><br />
        <span class="predict-des">{{ item.des }}</span>
      </el-card>
    </el-col>
  </el-row>
  <br />
</template>

<script setup>
import config from '@/config/model-prediction-page-config.json'

defineProps({
  planType: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['changePlanType'])
</script>

<style scoped>
.predict-title {
  font-size: 15px;
  font-weight: 700;
}

.predict-des {
  font-size: 10px;
  font-weight: 300;
}

.predict-card:hover,
.click-plan {
  border: 1px solid #409eff;
  background-color: #f4f9ff;
}
</style>
