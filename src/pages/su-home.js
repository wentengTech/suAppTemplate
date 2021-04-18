import React, { useContext, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../store'
import Icon from 'react-native-vector-icons/FontAwesome'
import Mock from 'mockjs'

export default function SuHome({ navigation }) {

  const { logout } = useContext(AuthContext)

  useEffect(() => {
    console.log('hello world')
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>这是主页</Text>
      <Button
        title="跳转去详情页面"
        onPress={() => navigation.navigate('details')}
      />
      <Icon name="rocket" size={30} color="#900" />
      <Button
        title="退出登录"
        onPress={logoutAction}
      />
    </View>
  )

  function logoutAction() {
    logout({ userId: null })
  }
}
