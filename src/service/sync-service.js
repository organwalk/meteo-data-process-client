import {
  connectDataSaveServer,
  syncDateRange,
  syncHavingData,
  syncLatestDate,
  syncMeteoDataByInfo,
  syncStationData,
} from '@/api/meteo-data/api-obtain-sync'

function getErrorMessage(error, fallbackMessage) {
  return error?.message || fallbackMessage
}

function normalizeSuccessResponse(response, fallbackMessage) {
  const success = response.data?.success === 1 || response.data?.code === 200

  return {
    success,
    message: response.data?.data || response.data?.msg || fallbackMessage,
  }
}

export async function connectSyncServer() {
  try {
    const response = await connectDataSaveServer()
    return normalizeSuccessResponse(response, '连接同步服务失败')
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '连接同步服务失败'),
    }
  }
}

export async function syncStationCatalog() {
  try {
    const response = await syncStationData()
    return normalizeSuccessResponse(response, '同步站点编号失败')
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '同步站点编号失败'),
    }
  }
}

export async function syncRemoteDateRange() {
  try {
    const response = await syncDateRange()
    return normalizeSuccessResponse(response, '同步日期范围失败')
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '同步日期范围失败'),
    }
  }
}

export async function getLatestSyncedDate(station) {
  try {
    const response = await syncLatestDate(station)

    return {
      success: response.data?.success === 1,
      data: response.data?.data ?? '',
      message: response.data?.data || '',
    }
  } catch (error) {
    return {
      success: false,
      data: '',
      message: getErrorMessage(error, '获取最近同步日期失败'),
    }
  }
}

export async function hasRemoteSyncedData(station) {
  try {
    const response = await syncHavingData(station)

    return {
      success: response.data?.success === 1 || response.data?.data === 'true' || response.data?.data === 'false',
      data: response.data?.data === 'true',
      message: response.data?.data ?? '',
    }
  } catch (error) {
    return {
      success: false,
      data: false,
      message: getErrorMessage(error, '获取远端数据状态失败'),
    }
  }
}

export async function syncMeteoDataRange(apiObj) {
  try {
    const response = await syncMeteoDataByInfo(apiObj)

    return {
      success: response.data?.success === 1 || response.data?.code === 200,
      message: response.data?.data || response.data?.msg || '',
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '同步气象数据失败'),
    }
  }
}
