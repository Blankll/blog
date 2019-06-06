import Vue from 'vue'
import axios from 'axios'
// import { Message } from 'element-ui'
import router from '../router/index'
import Token from './token'
Vue.prototype.$axios = axios

// 全局请求拦截
axios.interceptors.request.use(config => {
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  if (config.method === 'post' || config.method === 'put') {
    let formData = new FormData()
    if (config.method === 'put') {
      formData.append('_method', 'put')
      config.method = 'post'
    }
    for (let key in config.data) {
      formData.append(key, config.data[key])
    }
    config.data = formData
  }
  return config
},
error => {
  return Promise.reject(error)
})

// 全局回复拦截
axios.interceptors.response.use(res => {
  if (res.status === 200 && res.data.code === 2000) {
    if (res.config.method === 'post') {
    }
    return res.data
  } else if (res.dsata && res.data.code !== 2000) {
    return Promise.reject(res.data)
  }
},
error => {
  let status = error.response.status
  if (status === 401) {
    if (Token.getToken()) {
      axios
        .get('/home/loginrefresh')
        .then(res => {
          Token.setToken(res.data.data.accss_token)
        })
        .catch(err => {
          console.log(err)
          alert('登录状态信息过期,请重新登录')
          router.push('/login')
        })
    }
    localStorage.removeItem('token')
    alert('登录状态信息过期,请重新登录')
    router.push('/login')
  } else if (status === 404) {
    router.push('/error/404')
  } else if (status === 500) {
    router.push('/error/500')
  } else if (status === 402) {
    alert('已登录，请不要重复操作')
    router.push('/')
  } else {
  /*
   * status不在指定内容中时，将服务器端返回信息通过element-ui的错误信息提示进行提示
   * 同时通过promise返回data数据
   */
    // alert(error.response.data.message)
  }
  return Promise.reject(error.response.data)
})
