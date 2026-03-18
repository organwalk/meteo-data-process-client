import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  clearCachedPendingDates,
  getCachedPendingDates,
  getCachedStations,
  setCachedPendingDates,
  setCachedStations,
} from '@/lib/storage'
import { getDatesAfter, getProgressPercentage, sumPendingDateCounts } from '@/modules/sync/sync-helpers'
import {
  cleanMeteoDataByRange,
  getLatestCleanedDateByStation,
} from '@/service/meteo-data-service'
import { getStationData, getStationValidDatesList } from '@/service/station-service'
import {
  connectSyncServer,
  getLatestSyncedDate,
  hasRemoteSyncedData,
  syncMeteoDataRange,
  syncRemoteDateRange,
  syncStationCatalog,
} from '@/service/sync-service'

export function useSyncTasks() {
  const dialogVisible = ref(false)
  const percentage = ref(0)
  const loading = ref(false)
  const syncCounts = reactive({
    sync: 0,
    clean: 0,
  })

  const disabledState = reactive({
    sync: false,
    clean: true,
  })

  const hasNothingPending = computed(() => syncCounts.sync === 0 && syncCounts.clean === 0)

  function resetProgress() {
    percentage.value = 0
  }

  function applyCachedStations(stations) {
    setCachedStations(stations.map((station) => station.station))
  }

  async function buildPendingSyncDates(stations) {
    const pendingDateMap = {}

    for (const station of stations) {
      const [validDatesResult, latestSyncResult, remoteSyncState] = await Promise.all([
        getStationValidDatesList(station.station),
        getLatestSyncedDate(station.station),
        hasRemoteSyncedData(station.station),
      ])

      const validDates = validDatesResult.data
      let pendingDates = []

      if (latestSyncResult.data) {
        pendingDates = getDatesAfter(validDates, latestSyncResult.data)
      } else if (!remoteSyncState.data) {
        pendingDates = [...validDates]
      }

      pendingDateMap[station.station] = pendingDates
      setCachedPendingDates('sync', station.station, pendingDates)
    }

    syncCounts.sync = sumPendingDateCounts(pendingDateMap)
    disabledState.sync = syncCounts.sync === 0
  }

  async function buildPendingCleanDates(stations) {
    const pendingDateMap = {}

    for (const station of stations) {
      const [validDatesResult, latestCleanedResult, remoteSyncState] = await Promise.all([
        getStationValidDatesList(station.station),
        getLatestCleanedDateByStation(station.station),
        hasRemoteSyncedData(station.station),
      ])

      const validDates = validDatesResult.data
      let pendingDates = []

      if (latestCleanedResult.data) {
        pendingDates = getDatesAfter(validDates, latestCleanedResult.data)
      } else if (remoteSyncState.data) {
        pendingDates = [...validDates]
      }

      pendingDateMap[station.station] = pendingDates
      setCachedPendingDates('clean', station.station, pendingDates)
    }

    syncCounts.clean = sumPendingDateCounts(pendingDateMap)
    disabledState.clean = syncCounts.clean === 0
  }

  async function refreshStatus() {
    loading.value = true
    resetProgress()
    syncCounts.sync = 0
    syncCounts.clean = 0
    disabledState.sync = false
    disabledState.clean = true

    const connectResult = await connectSyncServer()

    if (!connectResult.success) {
      loading.value = false
      disabledState.sync = true
      disabledState.clean = true
      ElMessage.warning(connectResult.message)
      return
    }

    const syncCatalogResult = await syncStationCatalog()

    if (!syncCatalogResult.success) {
      loading.value = false
      disabledState.sync = true
      disabledState.clean = true
      ElMessage.warning(syncCatalogResult.message)
      return
    }

    const syncRangeResult = await syncRemoteDateRange()

    if (!syncRangeResult.success) {
      loading.value = false
      disabledState.sync = true
      disabledState.clean = true
      ElMessage.warning(syncRangeResult.message)
      return
    }

    const stationResult = await getStationData()

    if (!stationResult.success) {
      loading.value = false
      disabledState.sync = true
      disabledState.clean = true
      ElMessage.error(stationResult.message)
      return
    }

    applyCachedStations(stationResult.stationList)
    await buildPendingSyncDates(stationResult.stationList)
    await buildPendingCleanDates(stationResult.stationList)

    if (hasNothingPending.value) {
      disabledState.sync = true
      disabledState.clean = true
    }

    loading.value = false
  }

  async function syncMeteoData() {
    const stations = getCachedStations()
    const tasks = stations.map((station) => ({
      station,
      dates: getCachedPendingDates('sync', station),
    }))

    const total = tasks.reduce((count, task) => count + task.dates.length, 0)

    if (total === 0) {
      disabledState.sync = true
      return
    }

    loading.value = true
    resetProgress()

    let processed = 0

    for (const task of tasks) {
      for (const date of task.dates) {
        const result = await syncMeteoDataRange({
          station: task.station,
          start: date,
          end: date,
        })

        if (!result.success) {
          ElMessage.warning(result.message || `站点 ${task.station} 在 ${date} 的同步失败`)
        }

        processed += 1
        percentage.value = getProgressPercentage(processed, total)
      }

      clearCachedPendingDates('sync', task.station)
    }

    loading.value = false
    await refreshStatus()
  }

  async function cleanMeteoData() {
    const stations = getCachedStations()
    const tasks = stations.map((station) => ({
      station,
      dates: getCachedPendingDates('clean', station),
    }))

    const total = tasks.reduce((count, task) => count + task.dates.length, 0)

    if (total === 0) {
      disabledState.clean = true
      return
    }

    loading.value = true
    resetProgress()

    let processed = 0

    for (const task of tasks) {
      for (const date of task.dates) {
        const result = await cleanMeteoDataByRange({
          station: task.station,
          start_date: date,
          end_date: date,
        })

        if (!result.success) {
          ElMessage.warning(result.message || `站点 ${task.station} 在 ${date} 的清洗失败`)
        }

        processed += 1
        percentage.value = getProgressPercentage(processed, total)
      }

      clearCachedPendingDates('clean', task.station)
    }

    loading.value = false
    await refreshStatus()
  }

  return {
    dialogVisible,
    percentage,
    loading,
    syncCounts,
    disabledState,
    hasNothingPending,
    refreshStatus,
    syncMeteoData,
    cleanMeteoData,
  }
}
