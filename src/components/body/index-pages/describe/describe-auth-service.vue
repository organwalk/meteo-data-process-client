<template>
  <el-card shadow="never" class="auth-service-card">
    <el-row>
      <el-col :span="24" center>
        <form>
          <el-input
            v-if="!showPassword"
            v-model.trim="form.username"
            maxlength="11"
            show-word-limit
            size="large"
            :placeholder="config.describe.auth.service.username_place"
            :prefix-icon="User"
            @keyup.enter="nextStep"
          />
          <el-input
            v-else
            v-model.trim="form.password"
            class="password-input"
            size="large"
            type="password"
            show-password
            :placeholder="config.describe.auth.service.password_place"
            :prefix-icon="Check"
            @keyup.enter="submitAuth"
          />
        </form>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="12" align="left">
        <el-popover placement="bottom" :width="220" trigger="click">
          <template #reference>
            <el-button text style="color: #2C6AE3">
              {{ config.describe.auth.service.detail_button }}
            </el-button>
          </template>
          <span v-html="config.describe.auth.service.detail_des" />
        </el-popover>
      </el-col>
      <el-col :span="12" align="right">
        <el-button plain @click="cancel" v-buttonAutoLoseFocus>
          {{ config.describe.auth.service.cancel_button }}
        </el-button>
        <el-button
          v-if="!showPassword"
          type="primary"
          color="#2C6AE3"
          @click="nextStep"
          v-buttonAutoLoseFocus
        >
          {{ config.describe.auth.service.next_button }}
        </el-button>
        <el-button v-else type="primary" color="#2C6AE3" @click="submitAuth" v-buttonAutoLoseFocus>
          {{ submitButtonText }}
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, User } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import config from '@/config/index-page-config.json'
import { useAuthStore } from '@/stores/auth'
import { checkOnlyEngAndNumber } from '@/utils/utils'
import { loginToSystem, registerToSystem } from '@/service/auth-service'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const showPassword = ref(false)
const form = reactive({
  username: '',
  password: '',
})

const submitButtonText = computed(() => {
  return authStore.dialog.type === 'register'
    ? config.describe.auth.service.register_button
    : config.describe.auth.service.login_button
})

function cancel() {
  showPassword.value = false
  form.username = ''
  form.password = ''
  authStore.closeDialog()
}

function nextStep() {
  if (!checkOnlyEngAndNumber(form.username)) {
    ElMessage.error('用户名只能包含英文和数字')
    return
  }

  showPassword.value = true
}

async function submitAuth() {
  if (!checkOnlyEngAndNumber(form.password)) {
    ElMessage.error('密码只能包含英文和数字')
    return
  }

  authStore.setLoading(true)

  if (authStore.dialog.type === 'register') {
    const registerResult = await registerToSystem({
      username: form.username,
      password: form.password,
    })

    if (!registerResult.success) {
      authStore.setLoading(false)
      ElMessage.error(registerResult.message)
      return
    }

    ElMessage.success(registerResult.message)
  }

  const loginResult = await loginToSystem({
    username: form.username,
    password: form.password,
  })

  authStore.setLoading(false)

  if (!loginResult.success) {
    ElMessage.error(loginResult.message)
    showPassword.value = false
    form.password = ''
    return
  }

  authStore.updateSession(loginResult.auth)
  authStore.closeDialog()
  ElMessage.success(loginResult.message)
  await router.replace(String(route.query.redirect || '/main'))
}
</script>

<style scoped>
.auth-service-card {
  border: none;
}

.password-input {
  position: relative;
  overflow: hidden;
}
</style>
