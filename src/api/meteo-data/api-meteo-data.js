import apiClient from '@/lib/http/api-client'

export function getMeteoDataByHour(apiObj) {
  return apiClient.post('/qx/stat_hour', null, {
    params: apiObj,
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getMeteoDataByDay(station, date, which, type) {
  return apiClient.post('/qx/stat_day', null, {
    params: {
      station,
      date,
      which,
      type,
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getMeteoDataByDate(apiObj) {
  return apiClient.post('/qx/stat_day_range', null, {
    params: apiObj,
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getMeteoDataByComplex(apiObj) {
  return apiClient.post('/qx/query', null, {
    params: apiObj,
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getMeteoModelInfo() {
  return apiClient.get('/anapredict/model/info', {
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function getMeteoModelPrediction(apiObj) {
  return apiClient.post('/anapredict/model/prediction', apiObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    meta: {
      auth: true,
    },
  })
}

export function getMeteoCorrelation(apiObj) {
  return apiClient.post('/anapredict/analyze/correlation', apiObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    meta: {
      auth: true,
    },
  })
}

export function getModelReport(apiObj) {
  return apiClient.post('/anapredict/model/report', apiObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    meta: {
      auth: true,
      retryOnTimeout: true,
    },
  })
}

export function cleanedData(apiObj) {
  return apiClient.post('/anapredict/cleaned', apiObj, {
    headers: {
      'Content-Type': 'application/json',
    },
    meta: {
      auth: true,
    },
  })
}

export function getLatestCleanedDate(station) {
  return apiClient.post(
    '/anapredict/latest_date',
    {
      station,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      meta: {
        auth: true,
        retryOnTimeout: true,
      },
    },
  )
}
