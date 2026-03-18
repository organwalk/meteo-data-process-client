import { METEO_ELEMENT_LABEL_MAP } from '@/constants/meteo'

export const PAGE_SIZE = 10
export const CONDITION_FIELD_KEY_MAP = {
  '1': 'temperature',
  '2': 'humidity',
  '3': 'speed',
  '4': 'direction',
  '5': 'rain',
  '6': 'sunlight',
  '7': 'pm25',
  '8': 'pm10',
}

export const QUERY_TYPES = {
  HOUR: 'Query by hour',
  DAY: 'Query by day',
  DATE: 'Query by date',
  CONDITION: 'Query by condition',
}

export function getDefaultDateRange(validDates, queryType) {
  if (!Array.isArray(validDates) || validDates.length === 0) {
    return {
      date: '',
      endDate: '',
    }
  }

  if (queryType === QUERY_TYPES.HOUR || queryType === QUERY_TYPES.DAY) {
    return {
      date: validDates.at(-1) ?? '',
      endDate: '',
    }
  }

  if (validDates.length === 1) {
    const singleDate = validDates[0]
    return {
      date: singleDate,
      endDate: singleDate,
    }
  }

  return {
    date: validDates.at(-2) ?? validDates.at(-1) ?? '',
    endDate: validDates.at(-1) ?? '',
  }
}

export function clampDateRange(date, endDate) {
  if (!date || !endDate) {
    return {
      date: date ?? '',
      endDate: endDate ?? '',
    }
  }

  if (date <= endDate) {
    return {
      date,
      endDate,
    }
  }

  return {
    date: endDate,
    endDate,
  }
}

export function ensureMeteoElements(values, fallback = ['1'], minimum = 1) {
  const nextValues = Array.isArray(values) ? values.filter(Boolean) : []

  if (nextValues.length >= minimum) {
    return nextValues
  }

  return fallback.slice(0, minimum)
}

export function buildConditionFields(selectedElements, optionList) {
  return selectedElements
    .map((value) => optionList.find((item) => item.value === value))
    .filter(Boolean)
}

export function buildConditionPayload(selectedElements, startValues, endValues) {
  return selectedElements.reduce((result, value) => {
    const key = CONDITION_FIELD_KEY_MAP[value]
    const startKey = key ? `start_${key}` : ''
    const endKey = key ? `end_${key}` : ''

    if (!startKey || !endKey) {
      return result
    }

    result[startKey] = startValues[startKey]
    result[endKey] = endValues[endKey]
    return result
  }, {})
}

export function isConditionPayloadComplete(payload, selectedCount) {
  const values = Object.values(payload ?? {})
  return values.length === selectedCount * 2 && values.every((value) => value !== null && value !== undefined && value !== '')
}

export function getQueryOffset(pageNumber, pageSize = PAGE_SIZE) {
  const safePageNumber = Number(pageNumber)

  if (!Number.isFinite(safePageNumber) || safePageNumber <= 1) {
    return 0
  }

  return (safePageNumber - 1) * pageSize
}

export function buildQueryWhich(selectMeteoElements) {
  return [...ensureMeteoElements(selectMeteoElements)]
    .sort((left, right) => Number(left) - Number(right))
    .join(',')
}

export function extractTableHeader(selectMeteoElements) {
  const labels = ensureMeteoElements(selectMeteoElements)
    .map((value) => METEO_ELEMENT_LABEL_MAP[value])
    .filter(Boolean)

  return ['采集时间', ...labels]
}
