<template>
  <el-card id="collection-analyze-card" shadow="never" align="center">
    <el-empty
      :image="getImagePath(config.container.collection.analyze.empty_img)"
      :image-size="200"
      :description="config.container.collection.analyze.empty_des"
      style="font-family: 'Microsoft YaHei', serif; font-weight: 300;"
    />
  </el-card>
</template>

<script setup>
import config from '@/config/main-page-config.json'
import { getImagePath } from '@/utils/utils'
</script>

<style scoped>
#collection-analyze-card {
  border-radius: 10px;
  user-select: none;
  font-family: 'Microsoft YaHei', serif;
  min-height: 45vh;
  margin-top: 4vh;
}
</style>
