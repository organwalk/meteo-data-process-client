<template>
  <el-card id="container-server" shadow="never" v-loading="serverData.loading">
      <el-row>
          <el-col :xs="8" :sm="6" :md="4" :lg="20" :xl="1" >
              <span v-html="config.container.server.title"/>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1" >
              <el-select v-model="serverData.selectStation" @change="changeStationCode()">
                  <el-option
                          v-for="item in serverData.storeStationList"
                          :key="item.station"
                          :label="item.name"
                          :value="item.station"
                  />
              </el-select>
          </el-col>
      </el-row>
      <el-row :gutter="15">
          <container-server-card :card-data="{title:config.container.server.card.station_name,content:serverData.stationName}"/>
          <container-server-card :card-data="{title:config.container.server.card.start_date,content:serverData.startDate}"/>
          <container-server-card :card-data="{title:config.container.server.card.running_status,content:'正常'}"/>
      </el-row>
  </el-card>
</template>

<script setup>
import config from "@/config/main-page-config.json"
import {useStore} from "vuex";
import {computed, reactive, watchEffect} from "vue";
import ContainerServerCard from "@/components/body/main-pages/container/container-server-card.vue";
import {getStartDate} from "@/service/station-service";
import {ElMessage} from "element-plus";

const store = useStore()
const serverData = reactive({
    storeStationList:computed(()=>store.state.mainPages.stationList),
    selectStation:'',
    loading:true,
    stationName:'',
    startDate:''
})
watchEffect(async () => {
    if (serverData.storeStationList.length !== 0) {
        serverData.selectStation = serverData.storeStationList[0].station
    }
    if (serverData.selectStation) {
        serverData.stationName = serverData.storeStationList.find((item) => {
            return item.station === serverData.selectStation
        }).name
        serverData.startDate = await getStartDate(serverData.selectStation)
        if (serverData.startDate === ""){
            ElMessage.error("内部服务错误，请重试")
        }
        serverData.loading = false
    }
})
</script>

<style scoped>
#container-server{
    border-radius: 15px;
    user-select: none;
    font-family: 微软雅黑,serif;
    height: 35vh;
}
#container-server span{
    font-weight: bolder;
    font-size: larger;
}
</style>