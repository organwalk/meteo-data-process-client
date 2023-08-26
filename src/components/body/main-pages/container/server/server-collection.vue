<template>
    <el-row :gutter="20">
        <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" >
            <el-card id="container-collection" shadow="hover" v-loading="collectionData.loading">
                <el-row>
                    <el-col :xs="8" :sm="6" :md="4" :lg="16" :xl="1" >
                        <span v-html="config.container.collection.overview_title"/>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1" align="right">
                        <el-date-picker
                            v-model="collectionData.pickMonth"
                            type="month"
                            :disabled-date="disabledDate"
                            :editable="false"
                            :clearable="false"
                            style="width: 9vw"
                        />
                    </el-col>
                </el-row>
                <collection-statistics-card/>
            </el-card>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="1" >
            <el-card id="container-collection" shadow="hover" v-loading="collectionData.loading">
                <el-row><span v-html="config.container.collection.analyze.title"/></el-row>
                <server-collection-analyze-card/>
            </el-card>
        </el-col>
    </el-row>

</template>

<script setup>
import {computed, reactive, ref, watchEffect} from "vue";
import config from "@/config/main-page-config.json"
import CollectionStatisticsCard
    from "@/components/body/main-pages/container/server/server-collection-statistics-card.vue";
import {useStore} from "vuex";
import {getStationValidDatesList} from "@/service/station-service";
import {getDisabledDate} from "@/utils/utils";
import ServerCollectionAnalyzeCard
    from "@/components/body/main-pages/container/server/server-collection-analyze-card.vue";

const store= useStore()
const collectionData = reactive({
    loading:false,
    pickMonth:'',
    station:computed(()=>store.state.mainPages.nowStation)
})
const validDates = ref([])

watchEffect(async () => {
    validDates.value = await getStationValidDatesList(collectionData.station)
    collectionData.pickMonth = validDates.value[validDates.value.length - 1]
    await store.dispatch('updateNowPickMonth',collectionData.pickMonth)
})

const disabledDate = (date) => {
    return getDisabledDate(date,validDates)
}

</script>

<style scoped>
#container-collection{
    border-radius: 15px;
    user-select: none;
    font-family: 微软雅黑,serif;
    height: 60vh;
}
#container-collection span{
    font-weight: bolder;
    font-size: larger;
}
</style>