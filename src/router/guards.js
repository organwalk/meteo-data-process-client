export function evaluateRouteAccess(route, isAuthenticated) {
  if (route.meta?.requiresAuth && !isAuthenticated) {
    return {
      allow: false,
      redirect: {
        name: 'index',
        query: {
          redirect: route.fullPath,
        },
      },
    }
  }

  if (route.name === 'index' && isAuthenticated) {
    return {
      allow: false,
      redirect: {
        name: 'main',
      },
    }
  }

  return {
    allow: true,
    redirect: null,
  }
}
