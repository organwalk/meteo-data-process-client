<template>
  <el-row>
    <el-col :span="24">
      <el-card id="form-table" shadow="never" align="center" v-loading="loadingTable">
        <el-table :data="useTableData" border style="width: 100%;">
          <el-table-column
            v-for="(name, index) in tableHeader"
            :key="index"
            :prop="name"
            :label="name"
            align="center"
          />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <br v-if="queryType !== 'Query by day'" />
  <el-row v-if="queryType !== 'Query by day'">
    <el-col :span="24">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="Number(page.size)"
        :page-count="Number(page.count)"
        style="justify-content: center;"
        layout="prev, pager, next"
        background
        hide-on-single-page
        @current-change="emit('getPageNumber', currentPage)"
      />
    </el-col>
  </el-row>
  <br />
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { convertToObjectArrayFrom2DArray, getPageData } from '@/utils/utils'
import { useMainPageStore } from '@/stores/main-page'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  tableHeader: {
    type: Array,
    default: () => [],
  },
  loadingTable: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['getPageNumber'])
const mainPageStore = useMainPageStore()
const queryType = computed(() => mainPageStore.queryType)
const currentPage = ref(1)
const page = reactive({
  size: 0,
  count: 1,
})
const useTableData = ref([])

watch(
  () => [props.tableData, props.tableHeader, props.total],
  () => {
    useTableData.value = convertToObjectArrayFrom2DArray(props.tableData, props.tableHeader)
    const pageData = getPageData(props.tableData, props.total)
    page.size = pageData.size || 10
    page.count = pageData.count
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<style scoped>
#form-table {
  border-radius: 10px;
  font-family: 'Microsoft YaHei', serif;
  user-select: none;
}
</style>
