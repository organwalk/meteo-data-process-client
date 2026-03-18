<template>
  <el-card
    v-for="card in config.query.card"
    :key="card.eng_type"
    class="query-card"
    :class="{ 'query-card--active': queryType === card.eng_type }"
    shadow="hover"
    @click="mainPageStore.setQueryType(card.eng_type)"
  >
    <span>{{ card.eng_type }}</span>
    <h2>{{ card.cn_type }}</h2>
    <h5>{{ card.cn_des }}</h5>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import config from '@/config/main-page-config.json'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()
const queryType = computed(() => mainPageStore.queryType)
</script>

<style scoped>
.query-card {
  border-radius: 10px;
  margin-bottom: 20px;
  color: #333333;
  min-height: 27vh;
  cursor: pointer;
}

.query-card:hover {
  background-color: #337ecc;
  color: #ffffff;
}

.query-card span {
  font-size: 15px;
  font-weight: 300;
}

.query-card h2 {
  margin-top: 0;
  font-weight: 700;
}

.query-card h5 {
  font-weight: 300;
  line-height: 1.5rem;
}

.query-card--active {
  background-color: #409eff;
  color: #ffffff;
}
</style>
