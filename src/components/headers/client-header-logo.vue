<template>
  <el-col :xs="12" :sm="10" :md="8" :lg="8" :xl="8" align="left">
    <h2 class="header-logo" @click="router.push('/')">{{ config.logo.text }}</h2>
  </el-col>
</template>

<script setup>
import { useRouter } from 'vue-router'
import config from '@/config/client-header-config.json'

const router = useRouter()
</script>

<style scoped>
.header-logo {
  margin: 12px 0;
  color: #333333;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
  cursor: pointer;
}
</style>
