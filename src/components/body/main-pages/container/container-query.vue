<template>
  <el-card id="container-query" shadow="never">
      <container-query-header/>
      <container-query-form />
  </el-card>

</template>

<script setup>
import ContainerQueryHeader from "@/components/body/main-pages/container/container-query-header.vue";
import ContainerQueryForm from "@/components/body/main-pages/container/container-query-form.vue";


</script>

<style scoped>
#container-query{
    border-radius: 15px;
    height: 100vh;
    overflow-y: auto;
}

</style>