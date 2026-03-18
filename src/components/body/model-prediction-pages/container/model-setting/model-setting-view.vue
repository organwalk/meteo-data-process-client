<template>
  <el-card id="model-setting-view" shadow="never" body-style="padding: 0;">
    <el-card id="setting-header" shadow="never">
      <el-row>
        <el-col :span="20">
          <span class="setting-title">Select Model Configuration</span>
        </el-col>
      </el-row>
    </el-card>
    <setting-container />
  </el-card>
</template>

<script setup>
import SettingContainer from '@/components/body/model-prediction-pages/container/model-setting/setting-container.vue'
</script>

<style scoped>
#model-setting-view {
  font-family: 'Microsoft YaHei', serif;
  color: #333333;
  user-select: none;
  border-top: none;
  border-radius: 0;
}

#setting-header {
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.setting-title {
  font-weight: 700;
  font-size: 15px;
  line-height: 30px;
}
</style>
