import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home'),
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/pages/home/home')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login/login')
    }
  ]
})
