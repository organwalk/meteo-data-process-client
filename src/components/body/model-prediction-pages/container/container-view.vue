<template>
    <br/>
    <el-row id="model-prediction-container">
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"/>
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row :gutter="20">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <model-setting-view/>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"/>
    </el-row>
</template>

<script setup>
import ModelSettingView from "@/components/body/model-prediction-pages/container/model-setting/model-setting-view.vue";
</script>

<style scoped>
#model-prediction-container{
    height: 100vh;
}
</style>