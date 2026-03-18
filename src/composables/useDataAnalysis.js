import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useMainPageStore } from '@/stores/main-page'
import { getStationData } from '@/service/station-service'
import { getDisabledDate, getGMTTimeToStrISO8601 } from '@/utils/utils'
import { METEO_ELEMENT_LABEL_MAP } from '@/constants/meteo'
import { getDefaultDateRange } from '@/modules/query/query-helpers'
import { getMeteoCorrelationDataList } from '@/service/meteo-data-service'
import { useStationDates } from '@/composables/useStationDates'

export function useDataAnalysis() {
  const mainPageStore = useMainPageStore()
  const loading = ref(true)
  const chartDataList = ref([])
  const chartElements = ref([])
  const stationList = ref([])
  let requestId = 0

  const analyzeForm = reactive({
    station: '',
    date: '',
    end_date: '',
    selectMeteoElements: ['1', '2', '3', '4', '5', '6', '7', '8'],
  })

  const { validDates } = useStationDates(computed(() => analyzeForm.station))

  function disabledDate(date) {
    return getDisabledDate(date, validDates.value)
  }

  function setDateRange() {
    const { date, endDate } = getDefaultDateRange(validDates.value, 'Query by date')
    analyzeForm.date = date
    analyzeForm.end_date = endDate
  }

  function normalizeDate() {
    analyzeForm.date = getGMTTimeToStrISO8601(analyzeForm.date)

    if (analyzeForm.end_date && analyzeForm.date > analyzeForm.end_date) {
      analyzeForm.date = analyzeForm.end_date
      ElMessage.warning('起始时间不能大于结束时间')
    }
  }

  function normalizeEndDate() {
    analyzeForm.end_date = getGMTTimeToStrISO8601(analyzeForm.end_date)

    if (analyzeForm.date && analyzeForm.date > analyzeForm.end_date) {
      analyzeForm.end_date = analyzeForm.date
      ElMessage.warning('结束时间不能早于起始时间')
    }
  }

  async function startAnalyze() {
    if (analyzeForm.selectMeteoElements.length < 2) {
      ElMessage.warning('相关性分析至少需要选择两个气象要素')
      return
    }

    if (!analyzeForm.station || !analyzeForm.date || !analyzeForm.end_date) {
      ElMessage.warning('请先选择完整的站点和日期范围')
      return
    }

    loading.value = true
    requestId += 1
    const currentRequestId = requestId

    const result = await getMeteoCorrelationDataList(analyzeForm)

    if (currentRequestId !== requestId) {
      return
    }

    if (result.success) {
      chartDataList.value = result.data
      chartElements.value = [...analyzeForm.selectMeteoElements]
        .sort((left, right) => Number(left) - Number(right))
        .map((element) => METEO_ELEMENT_LABEL_MAP[element])
        .filter(Boolean)
      ElMessage.success(result.message)
    } else {
      chartDataList.value = []
      chartElements.value = []
      ElMessage.error(result.message)
    }

    loading.value = false
  }

  async function loadStations() {
    loading.value = true
    const stationResult = await getStationData()

    if (!stationResult.success) {
      stationList.value = []
      loading.value = false
      ElMessage.error(stationResult.message)
      return
    }

    stationList.value = stationResult.stationList
    mainPageStore.setStationList(stationResult.stationList)
    analyzeForm.station = stationResult.stationList[0]?.station ?? ''
    loading.value = false
  }

  watch(validDates, async () => {
    setDateRange()

    if (analyzeForm.station && analyzeForm.date && analyzeForm.end_date) {
      await startAnalyze()
    }
  })

  return {
    loading,
    analyzeForm,
    stationList,
    validDates,
    chartDataList,
    chartElements,
    disabledDate,
    normalizeDate,
    normalizeEndDate,
    startAnalyze,
    loadStations,
  }
}
