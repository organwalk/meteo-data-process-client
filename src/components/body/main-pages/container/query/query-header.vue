<template>
  <el-row id="query-header">
    <el-col :xs="6" :sm="6" :md="6" :lg="8" :xl="8">
      <el-button round @click="mainPageStore.setQueryType('')" v-buttonAutoLoseFocus>
        {{ config.container.query.header.button }}
      </el-button>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" align="center">
      <span>{{ headerTitle }}</span>
    </el-col>
    <el-col :xs="6" :sm="6" :md="6" :lg="8" :xl="8" />
  </el-row>
  <br />
</template>

<script setup>
import { computed } from 'vue'
import config from '@/config/main-page-config.json'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const headerTitle = computed(() => {
  return config.container.query.header[mainPageStore.queryType]?.title ?? ''
})
</script>

<style scoped>
#query-header {
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
}

#query-header span {
  font-size: larger;
  font-weight: 700;
}
</style>
