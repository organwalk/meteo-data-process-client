const STORAGE_KEYS = {
  auth: 'meteo.auth',
  stations: 'meteo.sync.stations',
  sync: 'meteo.sync.station.',
  clean: 'meteo.clean.station.',
}

export function safeParseJSON(value, fallback = null) {
  if (!value || typeof value !== 'string') {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function getSessionStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage
}

function readJSON(key, fallback = null) {
  const storage = getSessionStorage()

  if (!storage) {
    return fallback
  }

  return safeParseJSON(storage.getItem(key), fallback)
}

function writeJSON(key, value) {
  const storage = getSessionStorage()

  if (!storage) {
    return
  }

  storage.setItem(key, JSON.stringify(value))
}

function removeKey(key) {
  const storage = getSessionStorage()

  if (!storage) {
    return
  }

  storage.removeItem(key)
}

function normalizeDateList(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item) => typeof item === 'string' && item.length > 0)
}

function normalizeAuthSession(session) {
  if (!session || typeof session !== 'object') {
    return null
  }

  const name = typeof session.name === 'string' ? session.name : ''
  const accessToken = typeof session.access_token === 'string' ? session.access_token : ''

  if (!name || !accessToken) {
    return null
  }

  return {
    ...session,
    name,
    access_token: accessToken,
  }
}

export function getAuthSession() {
  return normalizeAuthSession(readJSON(STORAGE_KEYS.auth))
}

export function setAuthSession(session) {
  const normalizedSession = normalizeAuthSession(session)

  if (!normalizedSession) {
    removeAuthSession()
    return
  }

  writeJSON(STORAGE_KEYS.auth, normalizedSession)
}

export function removeAuthSession() {
  removeKey(STORAGE_KEYS.auth)
}

export function getCachedStations() {
  return normalizeDateList(readJSON(STORAGE_KEYS.stations, []))
}

export function setCachedStations(stations) {
  writeJSON(STORAGE_KEYS.stations, normalizeDateList(stations))
}

export function getCachedPendingDates(type, station) {
  const key = `${type === 'clean' ? STORAGE_KEYS.clean : STORAGE_KEYS.sync}${station}`
  return normalizeDateList(readJSON(key, []))
}

export function setCachedPendingDates(type, station, dates) {
  const key = `${type === 'clean' ? STORAGE_KEYS.clean : STORAGE_KEYS.sync}${station}`
  writeJSON(key, normalizeDateList(dates))
}

export function clearCachedPendingDates(type, station) {
  const key = `${type === 'clean' ? STORAGE_KEYS.clean : STORAGE_KEYS.sync}${station}`
  removeKey(key)
}
