<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" align="left">
        <h2 @click="nextToIndex">{{ decorative.client_header.logo.text }}</h2>
    </el-col>
</template>

<script setup>
import decorative from "@/config/decorative_text_config.json"
const nextToIndex = () => {
    window.location.href = "/"
}
</script>

<style scoped>
h2{
    color: #333333;
    font-family: "微软雅黑",serif;
    user-select: none;
    margin-top: 10px;
}
</style>