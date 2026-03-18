import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { evaluateRouteAccess } from '@/router/guards'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const authStore = useAuthStore(pinia)
  authStore.hydrateSession()
  const accessResult = evaluateRouteAccess(to, authStore.isAuthenticated)

  if (!accessResult.allow) {
    return accessResult.redirect
  }

  return true
})

export default router
