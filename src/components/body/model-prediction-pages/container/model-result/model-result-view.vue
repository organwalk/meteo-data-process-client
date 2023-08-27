<template>
  <el-card id="model-result-view" shadow="never">
      <div v-if="useTableData.length !== 0">
          <el-table :data="useTableData" border style="width: 100%;" >
              <el-table-column v-for="(name, index) in tableHeader" :key="index" :prop="name" :label="name"
                               align="center"/>
          </el-table>
      </div>
      <el-empty v-if="useTableData.length === 0" style="height: 80vh" :image="getImagePath('not_found.png')" description="暂未开始预测"></el-empty>
  </el-card>
</template>

<script setup>
import {nextTick, ref, watch} from "vue";
import {useStore} from "vuex";
import {convertToObjectArrayFrom2DArray, getImagePath} from "@/utils/utils";

const useTableData = ref([])
const tableHeader = ref(['时间','温度','湿度','风速','风向','降雨量','光照','PM25','PM10'])
const store = useStore()

watch(()=>store.state.modelPredictionPages.predictionList,(newVal)=>{
    if (newVal.length !==0){
        useTableData.value = convertToObjectArrayFrom2DArray(newVal,tableHeader.value)
        nextTick(() => {
            window.scrollTo(0, 0);
        });
    }
})
</script>

<style scoped>
#model-result-view{

    font-family: 微软雅黑,serif;
    color: #333333;
    user-select: none;
    border-radius: 0;
    border-left: none;
}
</style>