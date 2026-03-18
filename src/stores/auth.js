import { defineStore } from 'pinia'
import { getAuthSession, removeAuthSession, setAuthSession } from '@/lib/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    dialog: {
      type: 'login',
      open: false,
    },
    loading: false,
    session: getAuthSession(),
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.session?.name && state.session?.access_token),
  },
  actions: {
    openDialog(type = 'login') {
      this.dialog = {
        type,
        open: true,
      }
    },
    closeDialog() {
      this.dialog.open = false
    },
    setLoading(loading) {
      this.loading = loading
    },
    hydrateSession() {
      this.session = getAuthSession()
    },
    updateSession(session) {
      this.session = session
      setAuthSession(session)
    },
    clearSession() {
      this.session = null
      removeAuthSession()
    },
  },
})
