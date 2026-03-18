import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import config from '@/config/main-page-config.json'
import { useMainPageStore } from '@/stores/main-page'
import { getDisabledDate, getGMTTimeToStrISO8601 } from '@/utils/utils'
import {
  buildConditionFields,
  buildConditionPayload,
  getDefaultDateRange,
  getQueryOffset,
  isConditionPayloadComplete,
  QUERY_TYPES,
} from '@/modules/query/query-helpers'
import { createQueryTableResult, getMeteoDataQueryTableByType } from '@/service/meteo-data-service'
import { useStationDates } from '@/composables/useStationDates'

export function useMainQuery() {
  const mainPageStore = useMainPageStore()
  const loadingForm = computed(() => stationList.value.length === 0 || validDatesLoading.value)
  const loadingTable = ref(false)
  const isQuery = ref(false)
  const editVisible = ref(false)
  const editTip = ref('点击此处填写')
  const editTipButtonColor = ref('#909399')
  const tableHeader = ref([])
  const tableData = ref([])
  const total = ref(0)
  const resultMessage = ref('')

  const formData = reactive({
    selectStation: '',
    selectMeteoElements: ['1', '2'],
    date: '',
    end_date: '',
    hour: '00:00',
    offset: 0,
  })

  const editData = reactive({
    fields: [],
    startValues: {},
    endValues: {},
    payload: {},
  })

  const queryType = computed(() => mainPageStore.queryType)
  const stationList = computed(() => mainPageStore.stationList)
  const selectedStation = computed(() => formData.selectStation)
  const { validDates, loading: validDatesLoading, errorMessage: validDatesError } = useStationDates(selectedStation)

  function syncDatesByType() {
    const { date, endDate } = getDefaultDateRange(validDates.value, queryType.value)
    formData.date = date
    formData.end_date = endDate
  }

  function resetConditionState() {
    editData.fields = buildConditionFields(formData.selectMeteoElements, config.container.query.form.meteo_elements)
    editData.payload = buildConditionPayload(formData.selectMeteoElements, editData.startValues, editData.endValues)
  }

  function refreshConditionStatus() {
    const isComplete = isConditionPayloadComplete(editData.payload, formData.selectMeteoElements.length)
    editTip.value = isComplete ? '填写完成' : '存在空值'
    editTipButtonColor.value = isComplete ? '#67C23A' : '#F56C6C'
  }

  function disabledDate(date) {
    return getDisabledDate(date, validDates.value)
  }

  function normalizeDate() {
    formData.date = getGMTTimeToStrISO8601(formData.date)

    if (queryType.value === QUERY_TYPES.DATE || queryType.value === QUERY_TYPES.CONDITION) {
      if (formData.end_date && formData.date > formData.end_date) {
        formData.date = formData.end_date
        ElMessage.warning('起始时间不能大于结束时间')
      }
    }
  }

  function normalizeEndDate() {
    formData.end_date = getGMTTimeToStrISO8601(formData.end_date)

    if (formData.date && formData.end_date && formData.date > formData.end_date) {
      formData.end_date = formData.date
      ElMessage.warning('结束时间不能早于起始时间')
    }
  }

  function openEditDialog() {
    resetConditionState()
    editVisible.value = true
  }

  function cancelEdit() {
    editVisible.value = false
    editData.payload = buildConditionPayload(formData.selectMeteoElements, editData.startValues, editData.endValues)
    refreshConditionStatus()
  }

  function confirmEdit() {
    editData.payload = buildConditionPayload(formData.selectMeteoElements, editData.startValues, editData.endValues)

    if (!isConditionPayloadComplete(editData.payload, formData.selectMeteoElements.length)) {
      ElMessage.warning('请填写完整数据范围')
      return
    }

    editVisible.value = false
    refreshConditionStatus()
  }

  async function runQuery() {
    loadingTable.value = true
    resultMessage.value = ''

    const result = await getMeteoDataQueryTableByType(
      {
        ...formData,
        queryType: queryType.value,
      },
      editData.payload,
    )

    const tableResult = createQueryTableResult(formData, result)
    tableHeader.value = tableResult.tableHeader
    tableData.value = tableResult.tableData
    total.value = tableResult.total
    resultMessage.value = result.message
    loadingTable.value = false

    if (!result.success && result.message) {
      ElMessage.warning(result.message)
    }
  }

  async function query() {
    if (!formData.selectStation) {
      ElMessage.warning(validDatesError.value || '请先选择站点')
      return
    }

    if (formData.selectMeteoElements.length === 0) {
      formData.selectMeteoElements = ['1']
      ElMessage.warning('至少需要选择一个气象要素')
    }

    if (queryType.value === QUERY_TYPES.CONDITION) {
      editData.payload = buildConditionPayload(formData.selectMeteoElements, editData.startValues, editData.endValues)

      if (!isConditionPayloadComplete(editData.payload, formData.selectMeteoElements.length)) {
        ElMessage.warning('请填写完整复合条件')
        return
      }
    }

    formData.offset = 0
    isQuery.value = true
    await runQuery()
  }

  async function getPageNumber(pageNumber) {
    formData.offset = getQueryOffset(pageNumber)
    await runQuery()
  }

  watch(
    stationList,
    (nextStationList) => {
      if (!formData.selectStation && nextStationList.length > 0) {
        formData.selectStation = nextStationList[0].station
      }
    },
    { immediate: true },
  )

  watch(validDates, syncDatesByType)

  watch(
    queryType,
    () => {
      isQuery.value = false
      formData.offset = 0
      syncDatesByType()
    },
    { immediate: true },
  )

  watch(
    () => formData.selectMeteoElements.slice(),
    () => {
      resetConditionState()
      refreshConditionStatus()
    },
    { immediate: true },
  )

  return {
    QUERY_TYPES,
    loadingForm,
    loadingTable,
    isQuery,
    editVisible,
    editTip,
    editTipButtonColor,
    tableHeader,
    tableData,
    total,
    formData,
    validDates,
    editData,
    queryType,
    stationList,
    disabledDate,
    normalizeDate,
    normalizeEndDate,
    openEditDialog,
    cancelEdit,
    confirmEdit,
    query,
    getPageNumber,
  }
}
