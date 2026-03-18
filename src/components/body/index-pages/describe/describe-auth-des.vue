<template>
  <br />
  <el-row>
    <el-col :span="24">
      <img class="auth-des-img" :src="getImagePath(config.describe.auth.des.img)" alt="auth" />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <span class="auth-des-title">{{ config.describe.auth.des.title }}</span>
    </el-col>
  </el-row>
  <br />
  <el-row>
    <el-col :span="24">
      <span class="auth-des-title-2nd">{{ title2nd }}</span>
    </el-col>
  </el-row>
  <br />
  <el-row>
    <el-col :span="24">
      <span class="auth-des-title-3nd">{{ title3nd }}</span>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import config from '@/config/index-page-config.json'
import { getImagePath } from '@/utils/utils'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const dialogConfig = computed(() => config.describe.auth.des[authStore.dialog.type])
const title2nd = computed(() => dialogConfig.value?.title_2nd ?? '')
const title3nd = computed(() => dialogConfig.value?.title_3nd ?? '')
</script>

<style scoped>
.auth-des-img {
  width: 40%;
}

.auth-des-title {
  font-weight: 700;
  font-size: 30px;
  font-family: 'Microsoft YaHei', system-ui;
}

.auth-des-title-2nd {
  font-weight: 700;
  font-size: 20px;
  font-family: 'Microsoft YaHei', system-ui;
}

.auth-des-title-3nd {
  font-weight: 300;
  font-family: 'Microsoft YaHei', system-ui;
}
</style>
