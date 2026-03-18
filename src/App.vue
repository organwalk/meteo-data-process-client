<template>
  <el-card id="app-shell" body-style="padding-left: 0; padding-right: 0; padding-bottom: 0;">
    <client-header />
    <router-view />
  </el-card>
</template>

<script setup>
import ClientHeader from '@/components/headers/client-header.vue'
</script>

<style>
body {
  margin: 0;
  background-color: #f5f7fa;
  overflow-y: auto !important;
  padding-right: 0 !important;
}

#app {
  min-height: 100vh;
}

#app-shell {
  width: 100%;
  min-height: 100vh;
  border-radius: 15px;
}
</style>
