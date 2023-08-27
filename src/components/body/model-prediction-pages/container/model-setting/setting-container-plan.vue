<template>
    <el-divider content-position="left">预测方案</el-divider>
    <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" v-for="item in config.model_config.plan" :key="item">
            <el-card class="predict-card"
                     :class="planType === item.title ? 'click-plan':''"
                     style="height: 20vh" shadow="never" @click="changePlanType(item.title)">
                <span class="predict-title" v-html="item.title" /><br/><br/>
                <span class="predict-des" v-html="item.des" />
            </el-card>
        </el-col>
    </el-row><br/>
</template>

<script setup>
import config from "@/config/model-prediction-page-config.json";
import {computed, defineProps,defineEmits} from 'vue'
const props = defineProps({
    planType:String
})
const emit = defineEmits(['changePlanType'])
const planType = computed(()=>props.planType)
const changePlanType = (val) => {
    emit('changePlanType',val)
}
</script>

<style scoped>
.predict-title{
    font-size: 15px;
    font-weight: bolder;
}
.predict-des{
    font-size: 10px;
    font-weight: lighter;
}
.predict-card:hover{
    border: 1px solid #409EFF;
    background-color: #f4f9ff;
}
.click-plan{
    border: 1px solid #409EFF;
    background-color: #f4f9ff;
}
</style>