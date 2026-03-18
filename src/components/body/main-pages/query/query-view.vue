<template>
  <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
    <el-card id="query" shadow="never">
      <query-card />
    </el-card>
  </el-col>
</template>

<script setup>
import QueryCard from '@/components/body/main-pages/query/query-card.vue'
</script>

<style scoped>
#query {
  border-radius: 0;
  border-left: none;
  overflow-y: auto;
  font-family: 'Microsoft YaHei', system-ui;
  user-select: none;
}

#query::-webkit-scrollbar {
  display: none;
}
</style>
