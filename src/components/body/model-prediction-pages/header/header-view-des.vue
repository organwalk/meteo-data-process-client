<template>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row>
                <el-icon color="#73767a" ><ArrowRight /></el-icon><span class="model-des">&nbsp;Model Information</span>
            </el-row>

        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
    </el-row>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <h3 class="model-title"><span class="version-span" v-html="modelInfo.version"/>&nbsp;-&nbsp;{{modelInfo.cn_des}}</h3>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
    </el-row>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row>
                <el-icon color="#73767a"><Tickets /></el-icon><span class="info-detail">&nbsp;&nbsp;{{modelInfo.technology}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-icon color="#73767a"><CircleCheck /></el-icon><span class="info-detail">&nbsp;&nbsp;{{modelInfo.support}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-icon color="#73767a"><CopyDocument /></el-icon><span class="info-detail">&nbsp;&nbsp;{{new Date(modelInfo.update).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </el-row>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
    </el-row><br/>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {getMeteoModelInfoData} from "@/service/meteo-data-service";
import {Tickets,CircleCheck,CopyDocument,ArrowRight} from '@element-plus/icons-vue'
import {useStore} from "vuex";

const modelInfo = reactive({})
const store = useStore()

onMounted(async ()=>{
    Object.assign(modelInfo,await getMeteoModelInfoData())
    let modelList = modelInfo.support.split("、")
    modelList.push('Mixed Models')
    await store.dispatch('updateModelList',modelList)
})


</script>

<style scoped>
.model-des{
    font-size: 10px;
    color: #73767a;
}
.version-span{
    color: #606266;
}
.model-title{
    margin-top: 5px;
    margin-bottom: 10px;
}
.info-detail{
    font-size: 13px;
    color: #73767a;

}
</style>