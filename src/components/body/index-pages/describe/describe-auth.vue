<template>
  <el-dialog
    v-model="openAuthView"
    class="auth"
    width="35%"
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-row>
      <el-card shadow="never" class="auth-card" align="center" v-loading="authStore.loading">
        <describe-auth-des />
        <describe-auth-service />
      </el-card>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import DescribeAuthDes from '@/components/body/index-pages/describe/describe-auth-des.vue'
import DescribeAuthService from '@/components/body/index-pages/describe/describe-auth-service.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const openAuthView = computed({
  get: () => authStore.dialog.open,
  set: (value) => {
    if (!value) {
      authStore.closeDialog()
    }
  },
})
</script>

<style scoped>
.auth-card {
  border-radius: 10px;
  margin-top: 0;
}

:deep(.auth) {
  border-radius: 15px;
  background-color: transparent;
}

:deep(.el-dialog__header) {
  display: none;
}

:deep(.el-dialog__body) {
  padding: 0;
}
</style>
