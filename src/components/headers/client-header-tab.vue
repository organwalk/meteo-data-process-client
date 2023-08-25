<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" align="right">
        <el-button class="tab-el-button"
                   v-for="tab in config.tab.button"
                   :key="tab.text"
                   @click="pushRouter(tab.route)"
                   text
                   v-buttonAutoLoseFocus>
            <h3>{{ tab.text }}</h3>
        </el-button>
        <el-button v-if="showSignOut" class="tab-el-button"
                   @click="signOutSystem()"
                   v-html="config.tab.sign_out" plain round />
    </el-col>
</template>

<script setup>
import config from "@/config/client-header-config.json"
import {ref, watchEffect} from "vue";
import {signOutSystem} from "@/service/auth-service";

const pushRouter = (route) => {
    window.location.href = route
}
const showSignOut = ref(false)
watchEffect(()=>{
    showSignOut.value = !!sessionStorage.getItem("auth");
})
</script>

<style scoped>
.tab-el-button {
    margin-top: 10px;
    margin-bottom: 20px;
    height: 5vh;
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