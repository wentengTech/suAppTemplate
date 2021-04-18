import utils from './su-utils'
import toast from './su-toast'
import ajax from './su-ajax'
import routers from './su-routers'
import css from './su-css'

/*
 * 通过su变量整合系统写好的：工具函数，统一的网络请求，统一的消息提示。等等
 * 全局su，特定页面可直接通过su.xxx访问特定模块的内容
 * 比如在某个页面需要访问utils内isIos函数。写法：su.utils.isIos()，不需要再import了
 */
global.su = {

  // 工具函数集合
  utils,

  // 消息提示
  toast,

  // 网络请求
  ajax,

  // 页面路由
  routers,

  // 全局样式，定义了统一的颜色，字体大小，间距，图片大小等等
  css,
}
