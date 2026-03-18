const imageModules = import.meta.glob('../assets/*', {
  eager: true,
  import: 'default',
})

export function getImagePath(fileName) {
  return imageModules[`../assets/${fileName}`] ?? ''
}

export function getAnimationDelay(index) {
  return `${index * 0.5}s`
}

export function checkOnlyEngAndNumber(value) {
  return /^[a-zA-Z0-9]+$/.test(value ?? '')
}

export function toISODate(value) {
  if (!value) {
    return ''
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getGMTTimeToStrISO8601(value) {
  return toISODate(value)
}

export function getDisabledDate(date, validDates) {
  const dateList = Array.isArray(validDates) ? validDates : validDates?.value ?? []
  return !dateList.includes(toISODate(date))
}

export function checkMeteoElementsNotNull(value, number = 1) {
  const fallback = value ? [value] : ['1']
  return fallback.slice(0, number)
}

export function extractLabels(valuesArray, originalArray) {
  const labelMap = new Map((originalArray ?? []).map((item) => [item.value, item.label]))
  const labels = (valuesArray ?? []).map((value) => labelMap.get(value)).filter(Boolean)
  return ['采集时间', ...labels]
}

export function convertToObjectArrayFrom2DArray(array2D, labelArray) {
  if (!Array.isArray(array2D) || !Array.isArray(labelArray)) {
    return []
  }

  return array2D.map((row) => {
    return labelArray.reduce((result, label, index) => {
      result[label] = Array.isArray(row) ? row[index] : undefined
      return result
    }, {})
  })
}

export function getPageData(tableData, total, pageSize = 10) {
  const rowCount = Array.isArray(tableData?.value) ? tableData.value.length : Array.isArray(tableData) ? tableData.length : 0
  const totalCount = Number(total?.value ?? total ?? 0)

  return {
    size: rowCount,
    count: Math.max(1, Math.ceil(totalCount / pageSize)),
  }
}

export function notEmptyValues(target) {
  if (!target || typeof target !== 'object') {
    return false
  }

  return Object.values(target).every((value) => value !== null && value !== undefined && value !== '')
}

export function formatDate(value) {
  return toISODate(value)
}
