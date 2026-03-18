<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-row>
        <query-view />
        <container-view />
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import QueryView from '@/components/body/main-pages/query/query-view.vue'
import ContainerView from '@/components/body/main-pages/container/container-view.vue'
import { getStationData } from '@/service/station-service'
import { useMainPageStore } from '@/stores/main-page'

const mainPageStore = useMainPageStore()

onMounted(async () => {
  if (mainPageStore.stationList.length > 0) {
    return
  }

  const result = await getStationData()

  if (!result.success) {
    ElMessage.error(result.message)
    return
  }

  mainPageStore.setStationList(result.stationList)
})
</script>
