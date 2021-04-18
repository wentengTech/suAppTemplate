/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

// 全局配置su资源
import './src/global'

AppRegistry.registerComponent(appName, () => App)
