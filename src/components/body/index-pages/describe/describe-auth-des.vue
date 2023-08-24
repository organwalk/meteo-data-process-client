<template>
    <br/>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <img class="auth-des-img" :src=getImagePath(config.describe.auth.des.img) alt="not photo">
        </el-col>
    </el-row>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="auth-des-title" v-html="config.describe.auth.des.title"/>
        </el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="auth-des-title-2nd" v-html="title_2nd" />
        </el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="auth-des-title-3nd" v-html="title_3nd"/>
        </el-col>
    </el-row>
</template>

<script setup>
import {getImagePath} from "@/utils/utils";
import config from "@/config/index-page-config.json";
import {useStore} from "vuex";
import {ref} from "vue";

const store = useStore()
const title_2nd = ref()
const title_3nd = ref()
const type = store.state.indexPages.keepAuthViewOpen.type;
title_2nd.value = config.describe.auth.des[type].title_2nd;
title_3nd.value = config.describe.auth.des[type].title_3nd;
</script>

<style scoped>
.auth-des-img{
    width: 40%
}
.auth-des-title{
    font-weight: bolder;
    font-size: 30px;
    font-family: 微软雅黑,system-ui
}
.auth-des-title-2nd{
    font-weight: bolder;
    font-size: 20px;
    font-family: 微软雅黑,system-ui
}
.auth-des-title-3nd{
    font-weight: lighter;
    font-family: 微软雅黑,system-ui
}
</style>