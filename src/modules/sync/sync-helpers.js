export function getDatesAfter(dataList, latestDate) {
  if (!Array.isArray(dataList) || dataList.length === 0) {
    return []
  }

  if (!latestDate) {
    return [...dataList]
  }

  const sortedDates = [...dataList].sort((left, right) => new Date(left) - new Date(right))
  const latestIndex = sortedDates.findIndex((date) => date === latestDate)

  if (latestIndex === -1) {
    return [...sortedDates]
  }

  return sortedDates.slice(latestIndex + 1)
}

export function sumPendingDateCounts(pendingDateMap) {
  return Object.values(pendingDateMap ?? {}).reduce((count, dates) => {
    return count + (Array.isArray(dates) ? dates.length : 0)
  }, 0)
}

export function getProgressPercentage(processed, total) {
  if (!total) {
    return 0
  }

  return Math.min(100, Math.round((processed / total) * 100))
}
