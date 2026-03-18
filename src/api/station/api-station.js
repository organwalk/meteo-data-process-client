import apiClient from '@/lib/http/api-client'

export function getStationInfo() {
  return apiClient.get('/qx/stations', {
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getStationDate(station) {
  return apiClient.get('/qx/stations', {
    params: {
      station,
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getStationCollectionDataCountByMonth(station, year, month) {
  return apiClient.get('/qx/data_sum', {
    params: {
      station,
      year,
      month,
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}
