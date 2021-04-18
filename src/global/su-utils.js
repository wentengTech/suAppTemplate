import { Appearance, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

// 工具函数
const utils = {
  
  // 判断是否是暗夜模式
  isDarkTheme: () => {
    return Appearance.getColorScheme() === 'dark'
  },

  // 判断是否是苹果设备
  isIos: () => {
    return Platform.OS.toLowerCase() === 'ios'
  },

  // 判断是否是安卓
  isAndroid: () => {
    return Platform.OS.toLowerCase() === 'android'
  },

  // 判断是否是开发环境
  isDevelopment: () => {
    return __DEV__
  },

  // 判断当前app的版本号是否低于有效版本号
  // validationVersion 建议设置为当前最新上架的版本号
  lowerAppVersion: () => {
    if (!validationVersion) {
      return false
    }
    return DeviceInfo.getBuildNumber() <= validationVersion
  },
}

export default utils
