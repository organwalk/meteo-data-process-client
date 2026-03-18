import { login, register, signOut } from '@/api/auth/api-auth'

function getErrorMessage(error, fallbackMessage) {
  return error?.message || fallbackMessage
}

export async function loginToSystem(auth) {
  try {
    const response = await login(auth)
    const authInfo = response.data?.auth ?? null

    if (response.data?.success === 1 && authInfo) {
      return {
        success: true,
        message: '登录成功',
        auth: authInfo,
      }
    }

    return {
      success: false,
      message: '用户名或密码错误',
      auth: null,
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '登录失败，请稍后重试'),
      auth: null,
    }
  }
}

export async function registerToSystem(auth) {
  try {
    const response = await register(auth)

    if (response.data?.success === 1) {
      return {
        success: true,
        message: '注册成功',
      }
    }

    return {
      success: false,
      message: '注册失败，请稍后重试',
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '注册失败，请稍后重试'),
    }
  }
}

export async function signOutSystem() {
  try {
    const response = await signOut()

    if (response.data?.success === 1) {
      return {
        success: true,
        message: '已退出登录',
      }
    }

    return {
      success: false,
      message: '退出登录失败，请重试',
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, '退出登录失败，请重试'),
    }
  }
}
