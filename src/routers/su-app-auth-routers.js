// app的授权模块页面路由
import navigatorScreenOptions from '../su-navigator-screen-options'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const StackNavigator = createStackNavigator()

// 授权模块页面的路由
import AuLogin from '../pages/authentication/au-login'
import Register from '../pages/authentication/su-register'


export default function() {
  return (
    <StackNavigator.Navigator screenOptions={navigatorScreenOptions}>
      <StackNavigator.Screen options={{ title: '登录' }} name={su.routers.login} component={AuLogin} />
      <StackNavigator.Screen options={{ title: '注册' }} name={su.routers.register} component={Register} />
    </StackNavigator.Navigator>
  )
}
