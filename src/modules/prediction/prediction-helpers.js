export const PREDICTION_PLAN_TYPES = {
  SHORT: '24小时预测',
  LONG: '未来七日预测',
}

export function getPredictionModelType(planType) {
  return planType === PREDICTION_PLAN_TYPES.LONG ? 'LONGTERM_LSTM' : 'SHORTTERM_LSTM'
}

export function getFutureDates(startDate, days) {
  if (!startDate || !days) {
    return []
  }

  const currentDate = new Date(startDate)

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  })
}

export function formatPredictionRows(predictionData, planType, startDate) {
  if (!Array.isArray(predictionData)) {
    return []
  }

  if (planType === PREDICTION_PLAN_TYPES.LONG) {
    const futureDates = getFutureDates(startDate, predictionData.length)
    return predictionData.map((row, index) => [futureDates[index] ?? '', ...(Array.isArray(row) ? row : [])])
  }

  return predictionData.map((row, index) => {
    const hour = String(index).padStart(2, '0')
    return [`${hour}:00`, ...(Array.isArray(row) ? row : [])]
  })
}

export function formatModelReport(report) {
  if (!report || typeof report !== 'object') {
    return null
  }

  return {
    date: report.date ?? '',
    rmse: Number(report.rmse).toFixed(2),
    mae: Number(report.mae).toFixed(2),
    r2: Number(report.r2).toFixed(2),
    train_loss: Number(report.train_loss).toFixed(2),
    val_loss: Number(report.val_loss).toFixed(2),
  }
}
