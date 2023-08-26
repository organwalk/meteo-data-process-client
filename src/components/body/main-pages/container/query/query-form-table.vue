<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
            <el-card id="form-table" shadow="never" align="center" v-loading="loadingTable">
                <el-table :data="useTableData" border style="width: 100%;" >
                    <el-table-column v-for="(name, index) in tableHeader" :key="index" :prop="name" :label="name"
                                     align="center"/>
                </el-table>
            </el-card>
        </el-col>
    </el-row><br v-if="queryType !== 'Query by day'"/>
    <el-row v-if="queryType !== 'Query by day'">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
            <el-pagination :page-size="Number(page.size)" :page-count="Number(page.count)"
                           v-model:current-page="currentPage"
                           style="justify-content: center;"
                           layout="prev, pager, next"
                           @current-change="emit('getPageNumber',currentPage)"
                           background hide-on-single-page
            />
        </el-col>
    </el-row>
    <br/>
</template>

<script setup>
import {computed, defineProps, defineEmits, reactive, ref, watchEffect} from "vue";
import {convertToObjectArrayFrom2DArray, getPageData} from "@/utils/utils";
import {useStore} from "vuex";
const props = defineProps({
    tableData:[],
    tableHeader:[],
    loadingTable:Boolean,
    total:Number
})
const emit = defineEmits(['getPageNumber'])
const store = useStore()
const queryType = computed(()=>store.state.mainPages.queryType)
const tableData = computed(()=>props.tableData)
const tableHeader = computed(()=>props.tableHeader)
const total = computed(()=>props.total)
const currentPage = ref(1)
const page = reactive({
    size:'',
    count:''
})
const useTableData = ref([])
watchEffect(()=>{
    console.log(tableData.value + "11111")
    if (tableData.value !== undefined){
        useTableData.value = convertToObjectArrayFrom2DArray(tableData.value,tableHeader.value)
        page.size = getPageData(tableData,total).size
        page.count = getPageData(tableData,total).count
    }else {
        useTableData.value = []
    }
})


</script>

<style scoped>
#form-table{
    border-radius: 15px;
    font-family: 微软雅黑,serif;
    user-select: none;
}
</style>