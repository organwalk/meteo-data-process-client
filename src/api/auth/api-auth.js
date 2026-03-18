import apiClient from '@/lib/http/api-client'
import { getAuthSession } from '@/lib/storage'

export function login(userInfo) {
  return apiClient.post('/user/login', userInfo)
}

export function register(userInfo) {
  return apiClient.post('/user/register', userInfo)
}

export function signOut() {
  const authSession = getAuthSession()
  return apiClient.post('/user/logout', null, {
    params: {
      username: authSession?.name ?? '',
    },
  })
}
