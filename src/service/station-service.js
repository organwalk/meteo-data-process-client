import {
  getStationCollectionDataCountByMonth,
  getStationDate,
  getStationInfo,
} from '@/api/station/api-station'
import { setCachedStations } from '@/lib/storage'

function normalizeStationList(stationList) {
  return Array.isArray(stationList) ? stationList : []
}

function getErrorMessage(error, fallbackMessage) {
  return error?.message || fallbackMessage
}

export async function getStationData() {
  try {
    const response = await getStationInfo()
    const stationList = normalizeStationList(response.data?.station)

    if (response.data?.success === 1) {
      setCachedStations(stationList.map((item) => item.station))

      return {
        success: true,
        numberOfStation: stationList.length,
        stationList,
      }
    }

    return {
      success: false,
      numberOfStation: 0,
      stationList: [],
      message: '获取站点列表失败',
    }
  } catch (error) {
    return {
      success: false,
      numberOfStation: 0,
      stationList: [],
      message: getErrorMessage(error, '获取站点列表失败'),
    }
  }
}

export async function getStartDate(station) {
  try {
    const response = await getStationDate(station)

    if (response.data?.success === 1) {
      return {
        success: true,
        data: response.data?.data?.[0] ?? '',
      }
    }

    return {
      success: false,
      data: '',
      message: '获取站点起始日期失败',
    }
  } catch (error) {
    return {
      success: false,
      data: '',
      message: getErrorMessage(error, '获取站点起始日期失败'),
    }
  }
}

export async function getStationValidDatesList(station) {
  try {
    const response = await getStationDate(station)

    if (response.data?.success === 1) {
      return {
        success: true,
        data: Array.isArray(response.data?.data) ? response.data.data : [],
      }
    }

    return {
      success: false,
      data: [],
      message: '获取有效日期列表失败',
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(error, '获取有效日期列表失败'),
    }
  }
}

export async function getStationMeteoDataCountByMonthList(station, year, month) {
  try {
    const response = await getStationCollectionDataCountByMonth(station, String(year), String(month))

    if (response.data?.success === 1) {
      return {
        success: true,
        data: Array.isArray(response.data?.data) ? response.data.data : [],
      }
    }

    return {
      success: false,
      data: [],
      message: '获取站点统计数据失败',
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: getErrorMessage(error, '获取站点统计数据失败'),
    }
  }
}
