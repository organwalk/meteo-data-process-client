<template>
    <el-row style="height: 80vh">
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="8" :sm="6" :md="4" :lg="22" :xl="1" >
            <el-row :gutter="20">
                <body-index-pages-describe/>
                <body-index-pages-banner/>
            </el-row>
        </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
  </el-row>
</template>

<script setup>
import BodyIndexPagesDescribe from "@/components/body/index-pages/body-index-pages-describe.vue";
import BodyIndexPagesBanner from "@/components/body/index-pages/body-index-pages-banner.vue";
</script>

<style scoped>

</style>