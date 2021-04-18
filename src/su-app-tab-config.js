/**
 * app 底部分页栏
 */
import React from 'react'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// 底部模块页面
import SuHome from './pages/su-home'
import SuTabView1 from './pages/su-tab-view1'
import SuTabView2 from './pages/su-tab-view2'

const BottomTabNavigator = createBottomTabNavigator()
const tabPageNames = {
  home: 'tab-name',
  tab1: 'tab-tab1',
  tab2: 'tab-tab2',
}

export function tabBarNavigator(props) {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={({ navigation, route }) => tabBarScreenOptions(navigation, route)}
      tabBarOptions={{
        // tab页面被选中后的颜色配置
        activeTintColor: 'red',
        // tab页面未被选中后的颜色配置
        inactiveTintColor: 'grey',
      }}
    >
      <BottomTabNavigator.Screen name={tabPageNames.home} component={SuHome} />
      <BottomTabNavigator.Screen name={tabPageNames.tab1} component={SuTabView1} />
      <BottomTabNavigator.Screen name={tabPageNames.tab2} component={SuTabView2} />
    </BottomTabNavigator.Navigator>
  )
}

export function tabNavigatorOptions(route, navigation, msgCountInfo) {
  const routeName = getFocusedRouteNameFromRoute(route)
  return {
    // tab页面的导航栏标题配置
    headerTitle: getHomeStackNavigatorTitle(routeName),
  }
}


function tabBarScreenOptions(navigation, route) {
  return {
    // 自定义tab的label
    tabBarLabel: ({ focused, color, size }) => {
      return <Text style={{ color: color, fontSize: size }}>{getHomeStackNavigatorTitle(route.name)}</Text>
    },
    // 自定义tab的icon
    tabBarIcon: ({ focused, color, size }) => {
      return <Image source={focused ? require('./assets/image/dashboard_focus.png') : require('./assets/image/dashboard.png')} style={{ width: size, height: size }} />
    },
  }
}


// 根据tab的名称返回其标题信息
function getHomeStackNavigatorTitle(routeName) {
  switch (routeName) {
    case tabPageNames.home :
      return '主页'
    case tabPageNames.tab1 :
      return '分页1'
    case tabPageNames.tab2 :
      return '分页2'
    default:
      return '主页'
  }
}

