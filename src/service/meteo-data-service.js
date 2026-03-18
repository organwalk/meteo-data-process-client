import {
  cleanedData,
  getLatestCleanedDate,
  getMeteoCorrelation,
  getMeteoDataByComplex,
  getMeteoDataByDate,
  getMeteoDataByDay,
  getMeteoDataByHour,
  getMeteoModelInfo,
  getMeteoModelPrediction,
  getModelReport,
} from '@/api/meteo-data/api-meteo-data'
import { QUERY_TYPES, buildQueryWhich, extractTableHeader } from '@/modules/query/query-helpers'
import { getPredictionModelType } from '@/modules/prediction/prediction-helpers'
import { getStationValidDatesList } from '@/service/station-service'

function getErrorMessage(error, fallbackMessage) {
  return error?.message || fallbackMessage
}

function normalizePagedResult(response, emptyMessage) {
  if (response.data?.success === 1) {
    return {
      success: true,
      list: Array.isArray(response.data?.data) ? response.data.data : [],
      total: Number(response.data?.total || 0),
      message: '',
    }
  }

  return {
    success: false,
    list: [],
    total: 0,
    message: emptyMessage,
  }
}

export async function getMeteoByDayAboutStatusAndDataList(station, selectMeteoElement) {
  try {
    const validDatesResult = await getStationValidDatesList(station.station)
    const latestDate = validDatesResult.data.at(-1)

    if (!latestDate) {
      return {
        success: false,
        dataList: [],
        message: '当前站点没有可用日期数据',
      }
    }

    const response = await getMeteoDataByDay(station.station, latestDate, selectMeteoElement, '2')

    return {
      success: response.data?.success === 1,
      dataList: Array.isArray(response.data?.data) ? response.data.data : [],
      message: response.data?.success === 1 ? '' : '未查询到最新日内气象数据',
    }
  } catch (error) {
    return {
      success: false,
      dataList: [],
      message: getErrorMessage(error, '未查询到最新日内气象数据'),
    }
  }
}

export async function getMeteoDataListByHour(apiObj) {
  try {
    const response = await getMeteoDataByHour(apiObj)
    return normalizePagedResult(response, '当前小时内未查询到气象数据')
  } catch (error) {
    return {
      success: false,
      list: [],
      total: 0,
      message: getErrorMessage(error, '当前小时内未查询到气象数据'),
    }
  }
}

export async function getMeteoDataListByDay(apiObj) {
  try {
    const response = await getMeteoDataByDay(apiObj.station, apiObj.date, apiObj.which, '1')

    if (response.data?.success === 1) {
      return {
        success: true,
        list: Array.isArray(response.data?.data) ? response.data.data : [],
        total: 0,
        message: '',
      }
    }

    return {
      success: false,
      list: [],
      total: 0,
      message: '当日内未查询到气象数据',
    }
  } catch (error) {
    return {
      success: false,
      list: [],
      total: 0,
      message: getErrorMessage(error, '当日内未查询到气象数据'),
    }
  }
}

export async function getMeteoDataListByDate(apiObj) {
  try {
    const response = await getMeteoDataByDate(apiObj)
    return normalizePagedResult(response, '当前时间段内未查询到气象数据')
  } catch (error) {
    return {
      success: false,
      list: [],
      total: 0,
      message: getErrorMessage(error, '当前时间段内未查询到气象数据'),
    }
  }
}

export async function getMeteoDataListByComplex(apiObj) {
  try {
    const response = await getMeteoDataByComplex(apiObj)
    return normalizePagedResult(response, '当前复合条件下未查询到气象数据')
  } catch (error) {
    return {
      success: false,
      list: [],
      total: 0,
      message: getErrorMessage(error, '当前复合条件下未查询到气象数据'),
    }
  }
}

export async function getMeteoDataQueryTableByType(formData, editObj = {}) {
  const which = buildQueryWhich(formData.selectMeteoElements)

  switch (formData.queryType) {
    case QUERY_TYPES.HOUR:
      return getMeteoDataListByHour({
        station: formData.selectStation,
        date: formData.date,
        hour: String(formData.hour).split(':')[0],
        which,
        pageSize: 10,
        offset: formData.offset,
      })
    case QUERY_TYPES.DAY:
      return getMeteoDataListByDay({
        station: formData.selectStation,
        date: formData.date,
        which,
      })
    case QUERY_TYPES.DATE:
      return getMeteoDataListByDate({
        station: formData.selectStation,
        start_date: formData.date,
        end_date: formData.end_date,
        which,
        pageSize: 10,
        offset: formData.offset,
      })
    case QUERY_TYPES.CONDITION:
      return getMeteoDataListByComplex({
        station: formData.selectStation,
        start_date: formData.date,
        end_date: formData.end_date,
        pageSize: 10,
        offset: formData.offset,
        ...editObj,
      })
    default:
      return {
        success: false,
        list: [],
        total: 0,
        message: '未知查询类型',
      }
  }
}

export function createQueryTableResult(formData, result) {
  return {
    tableHeader: extractTableHeader(formData.selectMeteoElements),
    tableData: result.list,
    total: result.total,
  }
}

export async function getMeteoModelInfoData() {
  try {
    const response = await getMeteoModelInfo()

    if (response.data?.code === 200) {
      return {
        success: true,
        data: response.data?.data ?? {},
      }
    }

    return {
      success: false,
      data: {},
      message: '获取模型信息失败',
    }
  } catch (error) {
    return {
      success: false,
      data: {},
      message: getErrorMessage(error, '获取模型信息失败'),
    }
  }
}

export async function getMeteoModelPredictData(configForm, planType) {
  try {
    const response = await getMeteoModelPrediction({
      station: configForm.station,
      start_date: configForm.date,
      model_type: getPredictionModelType(planType),
    })

    if (response.data?.code === 200) {
      return {
        success: true,
        data: Array.isArray(response.data?.data) ? response.data.data : [],
        message: '已成功获取预测结果',
      }
    }

    return {
      success: false,
      data: [],
      message: response.data?.msg || '获取预测结果失败',
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(error, '获取预测结果失败'),
    }
  }
}

export async function getMeteoCorrelationDataList(analyzeForm) {
  try {
    const response = await getMeteoCorrelation({
      station: analyzeForm.station,
      start_date: analyzeForm.date,
      end_date: analyzeForm.end_date,
      correlation: analyzeForm.selectMeteoElements.join(','),
    })

    if (response.data?.code === 200) {
      return {
        success: true,
        data: Array.isArray(response.data?.data) ? response.data.data : [],
        message: '已成功获取分析结果',
      }
    }

    return {
      success: false,
      data: [],
      message: response.data?.msg || '获取分析结果失败',
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(error, '获取分析结果失败'),
    }
  }
}

export async function getModelReportData(modelType) {
  try {
    const response = await getModelReport({
      model_type: modelType,
    })

    if (response.data?.code === 200) {
      return {
        success: true,
        data: response.data?.data ?? {},
      }
    }

    return {
      success: false,
      data: null,
      message: '暂无模型报告',
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: getErrorMessage(error, '暂无模型报告'),
    }
  }
}

export async function getLatestCleanedDateByStation(station) {
  try {
    const response = await getLatestCleanedDate(station)

    if (response.data?.code === 200) {
      return {
        success: true,
        data: response.data?.data ?? '',
      }
    }

    return {
      success: false,
      data: '',
      message: response.data?.msg || '获取最近清洗日期失败',
    }
  } catch (error) {
    return {
      success: false,
      data: '',
      message: getErrorMessage(error, '获取最近清洗日期失败'),
    }
  }
}

export async function cleanMeteoDataByRange(apiObj) {
  try {
    const response = await cleanedData(apiObj)

    return {
      success: response.data?.code === 200 || response.data?.success === 1,
      message: response.data?.msg || response.data?.data || '',
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '数据清洗失败'),
    }
  }
}
