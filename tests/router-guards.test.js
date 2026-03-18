import { evaluateRouteAccess } from '@/router/guards'

describe('route guards', () => {
  it('redirects anonymous users away from protected routes', () => {
    const result = evaluateRouteAccess(
      {
        name: 'main',
        fullPath: '/main',
        meta: {
          requiresAuth: true,
        },
      },
      false,
    )

    expect(result.allow).toBe(false)
    expect(result.redirect).toEqual({
      name: 'index',
      query: {
        redirect: '/main',
      },
    })
  })

  it('redirects authenticated users away from the index page', () => {
    const result = evaluateRouteAccess(
      {
        name: 'index',
        fullPath: '/',
        meta: {},
      },
      true,
    )

    expect(result.allow).toBe(false)
    expect(result.redirect).toEqual({
      name: 'main',
    })
  })

  it('allows authenticated users to protected routes', () => {
    const result = evaluateRouteAccess(
      {
        name: 'modelPrediction',
        fullPath: '/modelPrediction',
        meta: {
          requiresAuth: true,
        },
      },
      true,
    )

    expect(result).toEqual({
      allow: true,
      redirect: null,
    })
  })
})
