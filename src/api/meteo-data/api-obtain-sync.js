import apiClient from '@/lib/http/api-client'

export function connectDataSaveServer() {
  return apiClient.get('/qx/obtain/connect', {
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function syncStationData() {
  return apiClient.get('/qx/obtain/sync/station', {
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function syncDateRange() {
  return apiClient.get('/qx/obtain/sync/date_range', {
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function syncLatestDate(station) {
  return apiClient.get('/qx/obtain/sync/latest_date', {
    params: {
      station,
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function syncHavingData(station) {
  return apiClient.get('/qx/obtain/sync/exist', {
    params: {
      station,
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function syncMeteoDataByInfo(apiObj) {
  return apiClient.post('/qx/obtain/sync/meteo_data', apiObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    meta: {
      auth: true,
    },
  })
}
