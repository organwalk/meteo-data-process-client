<template>
    <el-row v-loading="loadingHeader">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-card id="model-prediction-pages-header-view" shadow="never" body-style="padding-left:0;padding-right:0;padding-bottom:0">
                <header-view-des/>
                <header-view-tab class="header-view-tab"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import HeaderViewDes from "@/components/body/model-prediction-pages/header/header-view-des.vue";
import HeaderViewTab from "@/components/body/model-prediction-pages/header/header-view-tab.vue";
import {ref, watchEffect} from "vue";
import {useStore} from "vuex";

const loadingHeader = ref(true)
const store = useStore()

watchEffect(()=>{
    if (store.state.modelPredictionPages.modelList.length > 0){
        loadingHeader.value = false
    }
})
</script>

<style scoped>
#model-prediction-pages-header-view {
    font-family: 微软雅黑, serif;
    user-select: none;
    background-color: #f6f8fa;
    border-radius: 0;
    height: 22vh;
    border-left: none;
    border-right: none;
    color: #333333;
}
</style>