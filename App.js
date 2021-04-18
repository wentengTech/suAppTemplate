import * as React from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useEffect, useReducer } from 'react'
import { authReducer, authState, AuthContext, authConstants } from './src/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootSiblingParent } from 'react-native-root-siblings'
import { suAppRouters, suAppAuthRouters } from './src/routers'

function App() {

  // reducer
  const [state, dispatch] = useReducer(authReducer, authState)

  // 监听其他页面调用的函数，再统一dispatch，目前仅提供了login，logout函数
  const authContext = React.useMemo(() => ({
    login: async data => {
      dispatch({ ...data, type: authConstants.methodNames.login })
    },
    logout: async data => {
      dispatch({ ...data, type: authConstants.methodNames.logout })
    },
  }))

  // 类mounted钩子函数，完成用户授权初始化逻辑
  useEffect(() => {
    AsyncStorage.getItem(authConstants.fieldNames.userId).then(userId => {
      dispatch({
        type: authConstants.methodNames.initial,
        hasInitialed: true,
        userId: userId,
      })
    })
  }, [])


  return (
    <AuthContext.Provider value={authContext}>
      {state.hasInitialed ?
        <RootSiblingParent>
          {!state.userHasLoginIn() ?
            <NavigationContainer key={su.routers.login} theme={su.utils.isDarkTheme() ? DarkTheme : DefaultTheme}>
              {suAppAuthRouters()}
            </NavigationContainer>
            :
            <NavigationContainer key={su.routers.home} theme={su.utils.isDarkTheme() ? DarkTheme : DefaultTheme}>
              {suAppRouters()}
            </NavigationContainer>
          }
        </RootSiblingParent>
        : null}
    </AuthContext.Provider>
  )
}

export default App
