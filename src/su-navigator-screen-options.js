import { TransitionPresets } from '@react-navigation/stack'

export default {
  // 页面切换方式：采用ios模式，从右边滑入，从右边滑出。
  ...TransitionPresets.SlideFromRightIOS,

  // 导航栏左边的标题都采用：'返回'
  headerBackTitle: '返回',
}

