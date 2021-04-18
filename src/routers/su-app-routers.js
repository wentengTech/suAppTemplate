// app页面路由
import navigationScreenOptions from '../su-navigator-screen-options'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { tabBarNavigator, tabNavigatorOptions } from '../su-app-tab-config'

// 创建导航栈
const StackNavigator = createStackNavigator()

// 各页面的路由
import SuDetails from '../pages/su-details'

export default function() {
  return (
    <StackNavigator.Navigator screenOptions={navigationScreenOptions}>
      <StackNavigator.Screen
        name={su.routers.home}
        component={tabBarNavigator}
        options={({ navigation, route }) => tabNavigatorOptions(route, navigation)}
      />

      <StackNavigator.Screen options={{ title: '详情' }} name={su.routers.details} component={SuDetails} />
    </StackNavigator.Navigator>
  )
}
