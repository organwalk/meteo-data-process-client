import {
  clearCachedPendingDates,
  getAuthSession,
  getCachedPendingDates,
  removeAuthSession,
  safeParseJSON,
  setAuthSession,
  setCachedPendingDates,
} from '@/lib/storage'

describe('storage helpers', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('parses JSON safely with fallback', () => {
    expect(safeParseJSON('{"ok":true}', {})).toEqual({ ok: true })
    expect(safeParseJSON('invalid-json', { ok: false })).toEqual({ ok: false })
  })

  it('stores and restores auth session only when token is complete', () => {
    setAuthSession({
      name: 'tester',
      access_token: 'token-1',
    })

    expect(getAuthSession()).toEqual({
      name: 'tester',
      access_token: 'token-1',
    })

    removeAuthSession()
    expect(getAuthSession()).toBeNull()
  })

  it('ignores broken auth session payloads', () => {
    window.sessionStorage.setItem('meteo.auth', '{"name":"tester"}')
    expect(getAuthSession()).toBeNull()
  })

  it('stores pending dates by task type', () => {
    setCachedPendingDates('sync', 'A001', ['2024-01-01', '2024-01-02'])
    setCachedPendingDates('clean', 'A001', ['2024-02-01'])

    expect(getCachedPendingDates('sync', 'A001')).toEqual(['2024-01-01', '2024-01-02'])
    expect(getCachedPendingDates('clean', 'A001')).toEqual(['2024-02-01'])

    clearCachedPendingDates('sync', 'A001')
    expect(getCachedPendingDates('sync', 'A001')).toEqual([])
  })
})
