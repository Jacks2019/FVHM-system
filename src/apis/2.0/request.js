import axios from 'axios'
import { ElMessage } from 'element-plus'
import { store } from '../../stores/index'
// import request from '../../request'

// const baseUrl = 'http://115.157.195.222:8787'
// const baseUrl = 'http://112.124.39.133:8080'
// const baseUrl = 'http://47.113.225.96:8080' //OUR
// const baseUrl = 'http://58.20.51.78:9292'
const baseUrl='http://192.168.249.43:8080'
// axios.defaults.paramsSerializer = params => {
//   // Sample implementation of query string building
//   let result = ''
//   Object.keys(params).forEach(key => {
//     result += `${key}=${encodeURIComponent(params[key])}&`
//   })
//   return result.substr(0, result.length - 1)
// }
/**
 * P 开头方法只返回内容，无内容时返回 undefined ：： data
 * 非 P 开头方法返回原内容（保证有对象返回） ：： { msg, code, data }
 */
const request = {
  async get(url, options) {
    return this._normal('get', url, options, false)
  },
  async post(url, options) {
    return this._normal('post', url, options, false)
  },
  async put(url, options) {
    return this._normal('put', url, options, false)
  },
  async delete(url, options) {
    return this._normal('delete', url, options, false)
  },
  async Pget(url, options) {
    return this._normal('get', url, options, true)
  },
  async Ppost(url, options) {
    return this._normal('post', url, options, true)
  },
  async Pput(url, options) {
    return this._normal('put', url, options, true)
  },
  async Pdelete(url, options) {
    return this._normal('delete', url, options, true)
  },
  async _normal(method, url, options, needPackage) {
    const { headers, ...others } = options || {}
    let res
    const mergeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : baseUrl + url
    try {
      res = await axios.request({
        url: mergeUrl,
        method,
        headers: {
          ...headers,
          Authorization: store.getters['user/token'],
        },
        ...others,
      })
      if (!res.data) {
        throw '返回数据格式异常'
      }
    } catch (e) {
      console.log('error', e)
      // const msg = '网络请求失败：网络请求错误'
      const msg = '尚无数据'
      ElMessage({
        type: 'info',
        message: msg,
      })
      return needPackage
        ? undefined
        : {
            code: 404,
            msg,
          }
    }
    if (res.data.code != 200) {
      const msg = res.data.message
      // const msg = '尚无数据'
      ElMessage({
        type: 'info',
        message: msg,
      })
    }
    return needPackage ? res.data.data : res.data
  },
}

export default request
