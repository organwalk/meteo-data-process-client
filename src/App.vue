<template>
    <el-card id="box" body-style="padding-left:0;padding-right:0;">
        <client-header/>
        <router-view/>
    </el-card>
</template>

<script setup>
import ClientHeader from "@/components/headers/client-header.vue";
</script>

<style>
body{
    overflow-y: auto !important;
    padding-right: 0 !important;
}
#box{
    width: 100%;height: 100vh;border-radius: 20px;
}
</style>


