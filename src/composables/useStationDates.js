import { ref, watch } from 'vue'
import { getStationValidDatesList } from '@/service/station-service'

export function useStationDates(stationRef, options = {}) {
  const validDates = ref([])
  const loading = ref(false)
  const errorMessage = ref('')
  let requestId = 0

  async function loadValidDates(station) {
    if (!station) {
      validDates.value = []
      errorMessage.value = ''
      return []
    }

    requestId += 1
    const currentRequestId = requestId
    loading.value = true
    errorMessage.value = ''

    const result = await getStationValidDatesList(station)

    if (currentRequestId !== requestId) {
      return validDates.value
    }

    validDates.value = result.data
    errorMessage.value = result.success ? '' : result.message
    loading.value = false
    return validDates.value
  }

  watch(
    stationRef,
    async (station) => {
      await loadValidDates(station)
      options.onLoaded?.(validDates.value)
    },
    {
      immediate: options.immediate ?? true,
    },
  )

  return {
    validDates,
    loading,
    errorMessage,
    loadValidDates,
  }
}
