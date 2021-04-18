import utils from './su-utils'

// 浅色 - 深色 模式下各启用一套标准
const isDarkTheme = utils.isDarkTheme()

const css = {
  // 颜色
  color: {
    mainColor: isDarkTheme ? 'red' : 'blue',
  },

  // 字体大小
  fontSize: {},

  // 间隙：设置padding或margin的数值时候用的
  interval: {},
}
export default css
