import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { usePredictionStore } from '@/stores/prediction'
import { getDisabledDate, getGMTTimeToStrISO8601 } from '@/utils/utils'
import { PREDICTION_PLAN_TYPES, formatPredictionRows } from '@/modules/prediction/prediction-helpers'
import { getDefaultDateRange } from '@/modules/query/query-helpers'
import { getMeteoModelPredictData } from '@/service/meteo-data-service'
import { getStationData } from '@/service/station-service'
import { useStationDates } from '@/composables/useStationDates'

export function usePrediction() {
  const predictionStore = usePredictionStore()
  const loading = ref(true)
  const stationList = ref([])
  const planType = ref(PREDICTION_PLAN_TYPES.SHORT)

  const configForm = reactive({
    station: '',
    date: '',
  })

  const { validDates } = useStationDates(computed(() => configForm.station))

  function disabledDate(date) {
    return getDisabledDate(date, validDates.value)
  }

  function setDateRange() {
    const { date } = getDefaultDateRange(validDates.value, 'Query by day')
    configForm.date = date
  }

  function changePlanType(nextPlanType) {
    planType.value = nextPlanType
    setDateRange()
  }

  function normalizeDate() {
    configForm.date = getGMTTimeToStrISO8601(configForm.date)
  }

  async function startPrediction() {
    if (!configForm.station || !configForm.date) {
      ElMessage.warning('请先选择站点和日期')
      return
    }

    if (validDates.value.length === 0) {
      ElMessage.warning('当前站点没有可用日期，无法发起预测')
      return
    }

    loading.value = true
    const result = await getMeteoModelPredictData(configForm, planType.value)

    if (result.success) {
      predictionStore.setPredictionList(formatPredictionRows(result.data, planType.value, configForm.date))
      ElMessage.success(result.message)
    } else {
      predictionStore.setPredictionList([])
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
    configForm.station = stationResult.stationList[0]?.station ?? ''
    loading.value = false
  }

  watch(validDates, setDateRange)

  return {
    PREDICTION_PLAN_TYPES,
    configForm,
    loading,
    stationList,
    validDates,
    planType,
    disabledDate,
    normalizeDate,
    changePlanType,
    startPrediction,
    loadStations,
    predictionStore,
  }
}
