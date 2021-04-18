import React from 'react'
import configuration from '../config'
import RootToast from 'react-native-root-toast'
import { Platform } from 'react-native'
import toast from './su-toast'
import utils from './su-utils'
import DeviceInfo from 'react-native-device-info'

// 网络架构
const ajax = {
  get: ({ url, parameters, successEvent, completionEvent, failureEvent, loadingTitle }) => {
    loadingTitle = loadingTitle === undefined ? '加载中...' : loadingTitle
    request(url, 'GET', parameters, completionEvent, successEvent, failureEvent, loadingTitle)
  },

  put: ({ url, parameters, successEvent, completionEvent, failureEvent, loadingTitle }) => {
    request(url, 'PUT', parameters, completionEvent, successEvent, failureEvent, loadingTitle)
  },

  post: ({ url, parameters, successEvent, loadingTitle, completionEvent, failureEvent }) => {
    loadingTitle = loadingTitle === undefined ? '提交中...' : loadingTitle
    request(url, 'POST', parameters, completionEvent, successEvent, failureEvent, loadingTitle)
  },

  delete: ({ url, parameters, successEvent, loadingTitle, completionEvent, failureEvent }) => {
    loadingTitle = loadingTitle === undefined ? '删除中...' : loadingTitle
    request(url, 'DELETE', parameters, completionEvent, successEvent, failureEvent, loadingTitle)
  },
}
export default ajax


// 统一当前正在执行请求的数量
let requestAmount = 0
// 延时显示loading的定时器
let showLoadingTimer = null

// 统一的请求函数
function request(url, type, parameters, completionEvent, successEvent, failureEvent, loadingTitle) {
  // 请求接口的统一loading效果处理, get请求都采用延时请求, 非get请求立即显示loading
  if (loadingTitle) {
    if (type === 'GET') {
      // 如果存在showLoadingTimer则将其清除，以当前最新的为准
      if (showLoadingTimer) {
        clearTimeout(showLoadingTimer)
        showLoadingTimer = null
      }
      // 设置延时显示loading
      showLoadingTimer = setTimeout(() => {
        toast.showLoading(loadingTitle)
      }, RootToast.durations.SHORT)
    }
    // 非get请求则立即显示loading
    else {
      toast.showLoading(menubar)
    }
  }

  // 统计当前正在执行的请求数 += 1
  requestAmount += 1

  // 发起请求
  fetch(getRequestUrl(url, parameters, type), {
    method: type,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'access-token': accessToken,
      'platform': Platform.OS,
      'buildNumber': DeviceInfo.getBuildNumber(),
      'version': DeviceInfo.getVersion(),
    },
    body: type === 'GET' ? null : getRequestBody(parameters),
  })
    .then((response) => {
      // 做响应数据的更新，像token
      // if (response.headers && response.headers.map && response.headers.map.access_token) {
      //     AsyncStorage.setItem('@login_access_token', response.headers.map.access_token);
      // }
      return response.json()
    })
    .then(resultJson => {
      // 根据系统自行编写统一的解析代码
      if (successEvent != null && typeof successEvent === 'function') {
        successEvent(resultJson)
      }
    })
    .catch((error) => {
      // 网络请求异常逻辑
      handleFailureEvent(failureEvent, '网络连接异常，请稍后重试')
    })
    .finally(() => {
      // 核减统计当前正在执行的请求数
      requestAmount -= 1

      // 如果当前没有正在执行的请求，则清除loading和清空显示loading的定时器
      if (requestAmount <= 0) {
        toast.hideLoading()
        if (showLoadingTimer) {
          clearTimeout(showLoadingTimer)
          showLoadingTimer = null
        }
      }

      // 请求完成逻辑
      if (completionEvent != null && typeof completionEvent === 'function') {
        completionEvent()
      }
    })
}

// 请求失败的回调函数
function handleFailureEvent(failureEvent, errorMessage) {
  if (failureEvent != null && typeof failureEvent === 'function') {
    failureEvent(errorMessage)
  } else {
    toast.showFailure(errorMessage || '请求异常，请稍后重试')
  }
}


// 获取完整的网络请求的url, 如果是get请求，则将请求内容接到url上，其他的设置在body属性上
const getRequestUrl = (url, parameters, type) => {
  let requestUrl = configuration.baseUrl + '/' + url
  // get请求则拼接url参数
  if (type === 'GET') {
    const parameterBody = getRequestBody(parameters, '_' + type)
    if (parameterBody) {
      requestUrl += (requestUrl.indexOf('?') >= 0 ? '&' : '?')
      requestUrl += parameterBody
    }
  }

  if (utils.isDevelopment()) {
    console.log('=================请求信息=================')
    console.log('requestUrl = ' + requestUrl)
    if (type !== 'GET') {
      console.log(JSON.stringify(parameters, null, 4))
    }
    console.log('=========================================')
  }

  return requestUrl
}

// 请求体, , 如果是get请求，则将请求内容接到url上，其他的设置在body属性上
const getRequestBody = (parameters) => {
  if (!parameters) {
    return null
  }
  let body = ''
  for (let key in parameters) {
    if (parameters.hasOwnProperty(key) && parameters[key] != null) {
      body += key + '=' + parameters[key] + '&'
    }
  }
  return body === '' ? null : body.substring(0, body.length - 1)
}
