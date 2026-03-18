import axios from 'axios'
import { getAuthSession } from '@/lib/storage'

function normalizeApiError(error) {
  if (!error) {
    return new Error('未知请求错误')
  }

  const normalizedError = new Error(
    error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      '请求失败',
  )

  normalizedError.status = error.response?.status ?? 0
  normalizedError.code = error.code
  normalizedError.data = error.response?.data ?? null
  normalizedError.raw = error

  return normalizedError
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9094/',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 30000),
})

apiClient.interceptors.request.use((config) => {
  const nextConfig = {
    ...config,
    headers: {
      ...(config.headers ?? {}),
    },
  }

  if (config.meta?.auth) {
    const session = getAuthSession()

    if (session) {
      nextConfig.headers.name = session.name
      nextConfig.headers.access_token = session.access_token
    }
  }

  return nextConfig
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config ?? {}
    const shouldRetry = config.meta?.retryOnTimeout && error.code === 'ECONNABORTED' && !config.__retried

    if (shouldRetry) {
      config.__retried = true
      return apiClient(config)
    }

    return Promise.reject(normalizeApiError(error))
  },
)

export default apiClient
