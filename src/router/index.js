import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/pages/home'),
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/pages/home/home')
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/pages/article/article')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/pages/admins/home/home'),
      children: [
        {
          path: 'article',
          name: 'AdminArticle',
          component: () => import('@/pages/admins/article/article')
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
