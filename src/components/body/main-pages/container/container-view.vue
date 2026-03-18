<template>
  <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
    <el-card id="container" shadow="never" v-if="!queryType">
      <chart-view />
      <br />
      <server-view />
      <br />
    </el-card>
    <el-card id="container" shadow="never" v-else>
      <query-view class="container-query" />
      <br />
    </el-card>
  </el-col>
</template>

<script setup>
import { computed } from 'vue'
import ChartView from '@/components/body/main-pages/container/chart/chart-view.vue'
import ServerView from '@/components/body/main-pages/container/server/server-view.vue'
import QueryView from '@/components/body/main-pages/container/query/query-view.vue'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const queryType = computed(() => mainPageStore.queryType)
</script>

<style scoped>
#container {
  border-radius: 0;
  border-right: none;
  border-left: none;
  overflow-y: auto;
  border-bottom: none;
}

#container::-webkit-scrollbar {
  display: none;
}

.container-query {
  opacity: 0;
  transform: translateY(50%);
  animation: slideInFromBottom 0.8s ease-in-out forwards;
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
