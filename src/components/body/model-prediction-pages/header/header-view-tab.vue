<template>
    <el-row>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane v-for="item in modelList" :key="item" :label="item" :name="item" />
            </el-tabs>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="1" :xl="1" />
    </el-row>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useStore} from "vuex";

const activeName = ref('')
const store = useStore()
const modelList = ref([])

watch(
    () => store.state.modelPredictionPages.modelList,
    (newModelList) => {
        modelList.value = newModelList;
        activeName.value = modelList.value[0]
    }
)
</script>

<style scoped>
/deep/ .el-tabs__item{
    font-family: 微软雅黑,serif;
    font-weight: bold;
    color: #73767a;
}
/deep/ .el-tabs__nav-wrap::after{
    background-color: transparent;
}
/deep/ .el-tabs__item:hover{
    color: #337ecc;
}
/deep/ .el-tabs__item.is-active{
    color: #337ecc;
}
/deep/ .el-tabs__active-bar{
    color: #337ecc;
}
/deep/ .el-tabs__active-bar{
    background-color: #337ecc;
}
</style>