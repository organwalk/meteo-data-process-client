<template>
  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" align="left">
    <el-card class="describe" shadow="never">
      <h5 v-html="config.describe.eng_title" />
      <h1 v-html="config.describe.cn_title" />
      <span v-html="config.describe.cn_des" />
      <br /><br /><br />
      <el-row :gutter="15">
        <el-col :xs="14" :sm="14" :md="12" :lg="16" :xl="16">
          <el-button class="describe-start" color="#409EFF" @click="startNow" v-buttonAutoLoseFocus>
            {{ config.describe.start_text }}
          </el-button>
        </el-col>
        <el-col :xs="10" :sm="10" :md="12" :lg="8" :xl="8">
          <el-button class="describe-register" plain @click="authStore.openDialog('register')" v-buttonAutoLoseFocus>
            {{ config.describe.register_text }}
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
  <describe-auth />
</template>

<script setup>
import { useRouter } from 'vue-router'
import config from '@/config/index-page-config.json'
import DescribeAuth from '@/components/body/index-pages/describe/describe-auth.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function startNow() {
  if (authStore.isAuthenticated) {
    router.push('/main')
    return
  }

  authStore.openDialog('login')
}
</script>

<style scoped>
.describe {
  border: none;
  margin-left: 5vw;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
}

.describe h5 {
  color: #79bbff;
}

.describe h1 {
  color: #333333;
  font-weight: 700;
  font-size: 40px;
}

.describe span {
  color: #606266;
  line-height: 2rem;
  font-size: 15px;
  font-weight: 300;
}

.describe-start,
.describe-register {
  width: 100%;
  height: 40px;
  font-weight: 700;
  font-family: 'Microsoft YaHei', serif;
}
</style>
