<template>
    <el-row style="height: 10vh">
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="24" >
            <el-row style="background-color: #ffffff" >
                <client-header-logo />
                <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" />
                <client-header-tab />
            </el-row>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="1" :xl="11" />
    </el-row>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="24">
            <div style="width: 100%;height: 1px;background-color: #c8c9cc"></div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="1" :xl="11" />
    </el-row>

</template>

<script setup>
import ClientHeaderLogo from "@/components/headers/client-header-logo.vue";
import ClientHeaderTab from "@/components/headers/client-header-tab.vue";

</script>

<style scoped>

</style>