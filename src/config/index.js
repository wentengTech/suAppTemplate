import utils from '../global/su-utils'
/**
 * 配置生产环境，开发环境的参数信息
 *
 * 由于没有vue下的 .env.producton和 .env.
 */

// 开发环境的
import DEVELOPMENT from './su-development'
// 生产环境的
import PRODUCTION from './su-production'

// 根据环境配置变量
const configObj = utils.isDevelopment() ? { ...DEVELOPMENT } : { ...PRODUCTION }


export default configObj
