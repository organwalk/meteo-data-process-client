<template>
  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
    <el-card class="banner" shadow="never">
      <el-row>
        <el-col :span="24">
          <banner-card />
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script setup>
import BannerCard from '@/components/body/index-pages/banner/banner-card.vue'
</script>

<style scoped>
.banner {
  height: 90vh;
  border: none;
  margin-left: 5vw;
  margin-right: 3vw;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
  overflow-y: auto;
}

.banner::-webkit-scrollbar {
  display: none;
}
</style>
