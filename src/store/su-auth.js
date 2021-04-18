import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = React.createContext()

/**
 * 缓存用户授权登陆的信息
 */
const authState = {
  // 认证授权信息是否初始化完成了,
  hasInitialed: false,
  // 登录的用户ID,
  userId: null,

  // 判断用户是否登陆了
  userHasLoginIn: () => {
    return authState.userId && true
  },
}


/**
 * 名称的设定，为了不用手动写名称，统一使用
 */
const authConstants = {
  fieldNames: {
    userId: 'global-login-cached-user-id',
  },
  methodNames: {
    login: 'login-event',
    logout: 'logout-event',
    initial: 'system-initial-event',
  },
}

/**
 * 接受外部dispatch的函数
 * action.type 访问函数事件的名称
 *
 * @param state
 * @param action
 */
const authReducer = (state, action) => {
  for (let key in authState) {
    if (action[key] !== undefined) {
      authState[key] = action[key]
      updateAsyncStorage(authConstants.fieldNames[key], authState[key])
    }
  }
  return {
    ...state,
    ...authState,
  }
}

export {
  authState,
  authConstants,
  authReducer,
  AuthContext,
}


// 更新本地缓存数据，如果value为空则清除
function updateAsyncStorage(key, value) {
  if (!key) {
    return
  }
  if (value) {
    AsyncStorage.setItem(key, value)
  } else {
    AsyncStorage.removeItem(key)
  }
}
