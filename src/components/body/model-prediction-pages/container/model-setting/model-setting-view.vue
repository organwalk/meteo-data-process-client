<template>
    <el-card id="model-setting-view" shadow="never" body-style="padding:0">
        <el-card id="setting-header" shadow="never" >
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <span class="setting-title">Select Model Configuration</span>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" align="right">
                    <el-popover
                        placement="right"
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
            </el-row>
        </el-card>
        <model-setting-container/>
    </el-card>
</template>

<script setup>
import ModelSettingContainer
    from "@/components/body/model-prediction-pages/container/model-setting/model-setting-container.vue";
import {Setting} from '@element-plus/icons-vue'
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
#model-setting-view{
    height: 60vh;
    font-family: 微软雅黑,serif;
    color: #333333;
    user-select: none;
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
#setting-header{
    border-left: none;
    border-right: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.setting-title{
    font-weight: bolder;
    font-size: 15px;
    line-height: 30px;
}
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