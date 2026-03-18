<template>
  <el-row class="client-header">
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <el-row class="client-header__inner">
        <client-header-logo />
        <el-col :xs="0" :sm="0" :md="2" :lg="4" :xl="4" />
        <client-header-tab />
      </el-row>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
  <el-row v-if="showLine">
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
      <div class="client-header__divider"></div>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" />
  </el-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ClientHeaderLogo from '@/components/headers/client-header-logo.vue'
import ClientHeaderTab from '@/components/headers/client-header-tab.vue'

const route = useRoute()
const showLine = computed(() => route.name === 'index')
</script>

<style scoped>
.client-header {
  min-height: 72px;
}

.client-header__inner {
  align-items: center;
  background-color: #ffffff;
}

.client-header__divider {
  width: 100%;
  height: 1px;
  background-color: #dcdfe6;
}
</style>
