<template>
  <el-card id="collection-analyze-card" shadow="never" align="center">
      <el-empty :image="getImagePath(config.container.collection.analyze.empty_img)" 
                :image-size="200" 
                :description="config.container.collection.analyze.empty_des" style="font-family: 微软雅黑,serif;font-weight: lighter"/>
  </el-card>
</template>

<script setup>
import {getImagePath} from "@/utils/utils";
import config from "@/config/main-page-config.json"
</script>

<style scoped>
#collection-analyze-card{
    border-radius: 15px;
    user-select: none;
    font-family: 微软雅黑,serif;
    height: 45vh;
    margin-top: 4vh;
}
</style>