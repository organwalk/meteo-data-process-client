<template>
  <el-card id="collection-statistics-card" shadow="never">
      <el-table :data="statisticsTableData" height="285" style="width: 100%">
          <el-table-column prop="day" label="采集日期" />
          <el-table-column prop="total" label="数据总量" />
      </el-table>
  </el-card>
</template>

<script setup>
import {reactive, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {getStationMeteoDataCountByMonthList} from "@/service/station-service";

const store = useStore()
const statisticsTableData = ref([])
const storeData = reactive({
    station:"",
    pickMonth:""
})

const year = ref()
const month = ref()
watchEffect(() => {
  storeData.station = store.state.mainPages.nowStation
  storeData.pickMonth = store.state.mainPages.nowPickMonth
})

watchEffect(() => {
  if (storeData.pickMonth){
    year.value = storeData.pickMonth.substring(0, 4)
    month.value = storeData.pickMonth.substring(5, 7)
  }
})
watchEffect(async () => {
    if (storeData.station && month.value) {
        statisticsTableData.value = await getStationMeteoDataCountByMonthList(storeData.station, year.value, month.value)
    }
})
</script>

<style scoped>
#collection-statistics-card{
    border-radius: 10px;
    user-select: none;
    font-family: 微软雅黑,serif;
    height: 45vh;
    margin-top: 4vh;
}
</style>