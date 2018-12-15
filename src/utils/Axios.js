import Vue from 'vue'
import axios from 'axios'
// import { Message } from 'element-ui'
import router from '../router/index'
Vue.prototype.$axios = axios

// 全局请求拦截
axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  if (config.method === 'post') {
    let formData = new FormData()
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
  console.log(res)
  if (res.status === 200 && res.data.code === 2000) {
    if (res.config.method === 'post') {
      // Message({
      //   showClose: true,
      //   message: res.data.message,
      //   type: 'success'
      // })
      // alert(res.data.message)
      console.log(res)
    }
    return res.data
  } else if (res.dsata && res.data.code !== 2000) {
    // Message({
    //   showClose: true,
    //   message: res.data.message,
    //   type: 'warning'
    // })
    alert(res.data.message)
    return Promise.reject(res.data)
  }
},
error => {
  let status = error.response.status
  if (status === 401) {
    localStorage.removeItem('token')
    // Message({
    //   showClose: true,
    //   message: '登录状态信息过期,请重新登录',
    //   type: 'error'
    // })
    alert('登录状态信息过期,请重新登录')
    router.push('/login')
  } else if (status === 404) {
    router.push('/error/404')
  } else if (status === 500) {
    router.push('/error/500')
  } else if (status === 402) {
    // Message({
    //   showClose: true,
    //   message: '已登录，请不要重复操作',
    //   type: 'error'
    // })
    alert('已登录，请不要重复操作')
    router.push('/home')
  } else {
  /*
   * status不在指定内容中时，将服务器端返回信息通过element-ui的错误信息提示进行提示
   * 同时通过promise返回data数据
   */
    // Message({
    //   showClose: true,
    //   message: error.response.data.message,
    //   type: 'error'
    // })
    alert(error.response.data.message)
  }
  return Promise.reject(error.response.data)
})
