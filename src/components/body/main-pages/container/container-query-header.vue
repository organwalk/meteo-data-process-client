<template>
    <el-row id="query-header">
        <el-col :xs="6" :sm="6" :md="6" :lg="8" :xl="6" >
            <el-button
                @click="store.dispatch('updateQueryType','')"
                v-html="config.container.query.header.button" round />
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" align="center">
            <span style="font-size: larger" v-html="config.container.query.header[store.state.mainPages.queryType].title"/>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" />
    </el-row><br/>
</template>

<script setup>

import config from "@/config/main-page-config.json"
import {useStore} from "vuex";

const store = useStore()


</script>

<style scoped>
#query-header{
    font-family: 微软雅黑,serif;
    user-select: none;
}
#query-header span{
    font-weight: bolder;
}
</style>