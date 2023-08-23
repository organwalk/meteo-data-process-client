<template>
    <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" align="left">
        <el-card class="describe" shadow="never">
            <h5 v-html="decorative.index_pages.describe.eng_title" />
            <h1 v-html="decorative.index_pages.describe.cn_title" />
            <span v-html="decorative.index_pages.describe.cn_des"/><br/><br/><br/>
            <el-row :gutter="15">
                <el-col :xs="8" :sm="6" :md="4" :lg="16" :xl="1" >
                    <el-button class="describe-start" color="#409EFF" v-buttonAutoLoseFocus
                               @click="getLoginEvent()"
                               v-html="decorative.index_pages.describe.start_text"/>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" >
                    <el-button class="describe-register"  plain v-buttonAutoLoseFocus
                               v-html="decorative.index_pages.describe.register_text"/>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
    <body-index-pages-describe-auth
        :open-auth-view="openAuthView"
        @close-auth-view="closeAuthView"
    />
</template>

<script setup>
import decorative from "@/config/decorative_text_config.json"
import BodyIndexPagesDescribeAuth from "@/components/body/index-pages/body-index-pages-describe-auth.vue";
import {ref} from "vue";

const openAuthView = ref(false)
const getLoginEvent = () => {
    openAuthView.value = true
}
const closeAuthView = (status) => {
    openAuthView.value = status
}
</script>

<style scoped>
.describe{
    border: none;
    margin-left: 5vw;
    font-family: 微软雅黑,serif;
    user-select: none;
}
.describe h5{
    color: #79bbff;
}
.describe h1{
    color: #333333;
    font-weight: bolder;
    font-size: 40px;
}
.describe span{
    color: #606266;
    line-height: 2rem;
    font-size: 15px;
    font-weight: lighter;
}
.describe-start{
    width: 100%;
    height: 40px;
    color:#ffffff;
    font-weight: bolder;
    font-family: 微软雅黑,serif;
}
.describe-register{
    width: 100%;
    height: 40px;
    font-weight: bolder;
    font-family: 微软雅黑,serif;
}
</style>