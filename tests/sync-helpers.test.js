import { getDatesAfter, getProgressPercentage, sumPendingDateCounts } from '@/modules/sync/sync-helpers'

describe('sync helpers', () => {
  it('returns dates after the last processed date', () => {
    expect(getDatesAfter(['2024-01-01', '2024-01-03', '2024-01-02'], '2024-01-02')).toEqual(['2024-01-03'])
    expect(getDatesAfter(['2024-01-01', '2024-01-02'], '')).toEqual(['2024-01-01', '2024-01-02'])
  })

  it('sums pending date counts safely', () => {
    expect(
      sumPendingDateCounts({
        A001: ['2024-01-01'],
        A002: ['2024-01-01', '2024-01-02'],
      }),
    ).toBe(3)
  })

  it('calculates progress percentages', () => {
    expect(getProgressPercentage(3, 10)).toBe(30)
    expect(getProgressPercentage(0, 0)).toBe(0)
  })
})
