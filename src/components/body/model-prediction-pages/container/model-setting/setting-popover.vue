<template>
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" align="right">
        <el-popover
                placement="bottom"
                :width="150"
                trigger="click"
                hide-after="0"
                popper-style="padding:0"
                :show-arrow="false"
        >
            <template #reference>
                <el-button :icon="Setting" v-buttonAutoLoseFocus style="width: 30px;height: 30px" />
            </template>
            <el-card style="border: none" shadow="never" body-style="padding-left:10px;padding-right:10px;padding-top:0;padding-bottom:0">
                <template #header>
                    <span style="font-size: 15px;font-weight: bold;font-family: 微软雅黑,serif">Setting</span>
                </template>
                <el-row>
                    <el-tooltip
                            effect="dark"
                            content="允许通过将前一个时间步的数据值复制到缺失的时间步来填充缺失值"
                            placement="right"
                            hide-after="0"
                    >
                        <el-checkbox v-model="paddingZero" label="前向填充" size="large" />
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip
                            effect="dark"
                            content="是否显示模型的评估报告"
                            placement="right"
                            hide-after="0"
                    >
                        <el-checkbox v-model="report" label="评估报告" size="large" />
                    </el-tooltip>
                </el-row>
            </el-card>
        </el-popover>
    </el-col>
</template>

<script setup>
import {Setting} from "@element-plus/icons-vue";
import {computed, onMounted, ref, watchEffect} from "vue";
import {useStore} from "vuex";

const paddingZero = ref(true)
const report = ref(true)
const store = useStore()

const listenPaddingZero = computed(() => paddingZero.value)
const listenReport = computed(()=>report.value)

onMounted(async ()=>{
    await store.dispatch('updateReport', listenReport.value)
    await store.dispatch('updatePaddingZero', listenPaddingZero.value)
})
watchEffect(async ()=>{
    await store.dispatch('updateReport', listenReport.value)
})
watchEffect(async () =>{
    await store.dispatch('updatePaddingZero', listenPaddingZero.value)
})

</script>

<style scoped>
/deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#333333;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #337ecc;
    border-color:#337ecc
}
/deep/ .el-checkbox__inner:hover {
    border-color: #337ecc
}
/deep/ .el-card__header{
    padding: 10px;
}
</style>