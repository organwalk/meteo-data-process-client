<template>
  <el-col :xs="12" :sm="14" :md="14" :lg="12" :xl="12" align="right">
    <el-button
      v-for="tab in config.tab.button"
      :key="tab.route"
      class="tab-el-button"
      text
      :style="getButtonStyle(tab.route)"
      @click="router.push(tab.route)"
      v-buttonAutoLoseFocus
    >
      <h3>{{ tab.text }}</h3>
    </el-button>
    <el-button
      v-if="authStore.isAuthenticated"
      class="tab-el-button"
      text
      @click="handleSignOut"
      v-buttonAutoLoseFocus
    >
      <h3>{{ config.tab.sign_out }}</h3>
    </el-button>
    <el-badge
      v-if="route.name === 'main'"
      :value="badgeValue"
      :hidden="badgeValue === '0'"
      :type="badgeType"
      class="sync-badge"
    >
      <el-button :icon="Refresh" circle @click="dialogVisible = true" v-buttonAutoLoseFocus />
    </el-badge>
  </el-col>

  <el-dialog
    v-model="dialogVisible"
    width="40%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-row v-loading="loading">
      <el-col :span="24" align="center">
        <h3 v-if="syncCounts.sync > 0">
          当前共有 <el-text type="danger" size="large">{{ syncCounts.sync }}</el-text> 份数据待同步
        </h3>
        <h3 v-else-if="syncCounts.clean > 0">
          当前共有 <el-text type="warning" size="large">{{ syncCounts.clean }}</el-text> 份数据待清洗
        </h3>
        <h3 v-else>服务器中的气象数据已处于最新状态</h3>
        <div v-if="loading" class="sync-progress">
          <el-progress :percentage="percentage" />
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="24" align="center">
        <el-button :icon="Refresh" round :disabled="disabledState.sync" @click="syncMeteoData" v-buttonAutoLoseFocus>
          数据同步
        </el-button>
        <el-button :icon="Close" circle @click="dialogVisible = false" v-buttonAutoLoseFocus />
        <el-button :disabled="disabledState.clean" round @click="cleanMeteoData" v-buttonAutoLoseFocus>
          数据清洗
          <el-icon class="el-icon--right"><DocumentChecked /></el-icon>
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Close, DocumentChecked, Refresh } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/config/client-header-config.json'
import { useAuthStore } from '@/stores/auth'
import { signOutSystem } from '@/service/auth-service'
import { useSyncTasks } from '@/composables/useSyncTasks'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { dialogVisible, percentage, loading, syncCounts, disabledState, refreshStatus, syncMeteoData, cleanMeteoData } = useSyncTasks()

const badgeValue = computed(() => {
  if (syncCounts.sync > 0) {
    return String(syncCounts.sync)
  }

  if (syncCounts.clean > 0) {
    return String(syncCounts.clean)
  }

  return '0'
})

const badgeType = computed(() => (syncCounts.sync > 0 ? 'danger' : 'warning'))

function getButtonStyle(targetRoute) {
  return route.path === targetRoute ? { backgroundColor: '#f4f4f5' } : {}
}

async function handleSignOut() {
  const result = await signOutSystem()

  if (!result.success) {
    ElMessage.error(result.message)
    return
  }

  authStore.clearSession()
  ElMessage.success(result.message)
  await router.replace('/')
}

watch(
  () => route.name,
  async (routeName) => {
    if (routeName === 'main' && authStore.isAuthenticated) {
      await refreshStatus()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.tab-el-button {
  margin: 10px 0 20px;
  height: 40px;
  font-family: 'Microsoft YaHei', serif;
}

.sync-badge {
  margin-top: -10px;
  margin-left: 5px;
}

.sync-progress {
  margin: 24px 0;
}

h3 {
  color: #333333;
  font-weight: 400;
}

:deep(.el-button.is-text:not(.is-disabled):hover),
:deep(.el-button.is-text:not(.is-disabled):focus) {
  background-color: #f4f4f5;
}
</style>
