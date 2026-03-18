import {
  buildConditionPayload,
  buildQueryWhich,
  clampDateRange,
  extractTableHeader,
  getDefaultDateRange,
  getQueryOffset,
  isConditionPayloadComplete,
  QUERY_TYPES,
} from '@/modules/query/query-helpers'

describe('query helpers', () => {
  it('derives default date ranges for day and range queries', () => {
    expect(getDefaultDateRange(['2024-01-01', '2024-01-02'], QUERY_TYPES.DAY)).toEqual({
      date: '2024-01-02',
      endDate: '',
    })

    expect(getDefaultDateRange(['2024-01-01', '2024-01-02'], QUERY_TYPES.DATE)).toEqual({
      date: '2024-01-01',
      endDate: '2024-01-02',
    })

    expect(getDefaultDateRange(['2024-01-01'], QUERY_TYPES.DATE)).toEqual({
      date: '2024-01-01',
      endDate: '2024-01-01',
    })
  })

  it('clamps reversed date ranges', () => {
    expect(clampDateRange('2024-01-05', '2024-01-03')).toEqual({
      date: '2024-01-03',
      endDate: '2024-01-03',
    })
  })

  it('creates condition payloads and validates completeness', () => {
    const payload = buildConditionPayload(
      ['1', '2'],
      {
        start_temperature: 1,
        start_humidity: 2,
      },
      {
        end_temperature: 3,
        end_humidity: 4,
      },
    )

    expect(payload).toEqual({
      start_temperature: 1,
      end_temperature: 3,
      start_humidity: 2,
      end_humidity: 4,
    })
    expect(isConditionPayloadComplete(payload, 2)).toBe(true)
  })

  it('builds query offsets and sorted which strings', () => {
    expect(getQueryOffset(1)).toBe(0)
    expect(getQueryOffset(3)).toBe(20)
    expect(buildQueryWhich(['3', '1', '2'])).toBe('1,2,3')
  })

  it('builds table headers from selected elements', () => {
    expect(extractTableHeader(['1', '8'])).toEqual(['采集时间', '温度', 'PM10'])
  })
})
