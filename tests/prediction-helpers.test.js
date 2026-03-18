import {
  formatModelReport,
  formatPredictionRows,
  getFutureDates,
  getPredictionModelType,
  PREDICTION_PLAN_TYPES,
} from '@/modules/prediction/prediction-helpers'

describe('prediction helpers', () => {
  it('maps plan types to model types', () => {
    expect(getPredictionModelType(PREDICTION_PLAN_TYPES.SHORT)).toBe('SHORTTERM_LSTM')
    expect(getPredictionModelType(PREDICTION_PLAN_TYPES.LONG)).toBe('LONGTERM_LSTM')
  })

  it('formats short term prediction rows with hourly prefixes', () => {
    expect(
      formatPredictionRows(
        [
          [1, 2],
          [3, 4],
        ],
        PREDICTION_PLAN_TYPES.SHORT,
        '2024-01-01',
      ),
    ).toEqual([
      ['00:00', 1, 2],
      ['01:00', 3, 4],
    ])
  })

  it('formats long term prediction rows with future dates', () => {
    expect(getFutureDates('2024-01-01', 3)).toEqual(['2024-01-01', '2024-01-02', '2024-01-03'])
    expect(
      formatPredictionRows(
        [
          [1, 2],
          [3, 4],
        ],
        PREDICTION_PLAN_TYPES.LONG,
        '2024-01-01',
      ),
    ).toEqual([
      ['2024-01-01', 1, 2],
      ['2024-01-02', 3, 4],
    ])
  })

  it('formats model reports with numeric precision', () => {
    expect(
      formatModelReport({
        date: '2024-01-01',
        rmse: 1.234,
        mae: 2.345,
        r2: 0.987,
        train_loss: 0.111,
        val_loss: 0.222,
      }),
    ).toEqual({
      date: '2024-01-01',
      rmse: '1.23',
      mae: '2.35',
      r2: '0.99',
      train_loss: '0.11',
      val_loss: '0.22',
    })
  })
})
