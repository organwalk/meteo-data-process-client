<template>
    <el-row :gutter="20">
        <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" >
            <el-card id="container-collection" shadow="never" v-loading="collectionData.loading">
            </el-card>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" >
            <el-card id="container-collection" shadow="never" v-loading="collectionData.loading">
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup>
import {reactive} from "vue";

const collectionData = reactive({
    loading:false
})
</script>

<style scoped>
#container-collection{
    border-radius: 15px;
    user-select: none;
    font-family: 微软雅黑,serif;
    height: 50vh;
}
</style>