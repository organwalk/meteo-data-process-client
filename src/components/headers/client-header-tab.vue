<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" align="right">
        <el-button class="tab-el-button"
                   v-for="tab in decorative.client_header.tab.button"
                   :key="tab.text"
                   @click="pushRouter(tab.route)"
                   text
                   v-buttonAutoLoseFocus>
            <h3>{{ tab.text }}</h3>
        </el-button>
    </el-col>
</template>

<script setup>
import {useRouter} from "vue-router";
import decorative from "@/config/decorative_text_config.json"

const router = useRouter()
const pushRouter = (route) => {
    router.push(route)
}
</script>

<style scoped>
.tab-el-button {
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: 微软雅黑,serif;
}
h3 {
    color: #333333;
    font-weight: lighter;
}
:deep(.el-button.is-text:not(.is-disabled):hover) {
    background-color: #f4f4f5;
}
:deep(.el-button.is-text:not(.is-disabled):focus) {
    background-color: #f4f4f5;
}
</style>