<template>
    <el-row style="height: 90vh">
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="8" :sm="6" :md="4" :lg="22" :xl="1" >
            <el-row :gutter="20">
                <describe-view/>
                <banner-view/>
            </el-row>
        </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
  </el-row>
</template>

<script setup>
import DescribeView from "@/components/body/index-pages/describe/describe-view.vue";
import BannerView from "@/components/body/index-pages/banner/banner-view.vue";
</script>

<style scoped>

</style>