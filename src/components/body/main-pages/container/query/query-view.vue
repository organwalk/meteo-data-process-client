<template>
  <el-card id="container-query" shadow="never">
      <query-header/>
      <query-form />
  </el-card>

</template>

<script setup>
import QueryHeader from "@/components/body/main-pages/container/query/query-header.vue";
import QueryForm from "@/components/body/main-pages/container/query/query-form.vue";


</script>

<style scoped>
#container-query{
    border-radius: 10px;
    height: 852px;
    overflow-y: auto;
}

</style>