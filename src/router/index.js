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
        },
        {
          path: 'me',
          name: 'AboutMe',
          component: () => import('@/pages/me/me')
        },
        {
          path: 'tags',
          name: 'Tags',
          component: () => import('@/pages/tags/tags')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/pages/admins/home/home'),
      redirect: '/admin/article',
      children: [
        {
          path: 'article',
          name: 'AdminArticle',
          component: () => import('@/pages/admins/article/article')
        },
        {
          path: 'article/add',
          name: 'AdminArticleAdd',
          component: () => import('@/pages/admins/article/add')
        },
        {
          path: 'article/edit',
          name: 'AdminArticleEdit',
          component: () => import('@/pages/admins/article/edit')
        },
        {
          path: 'tag',
          name: 'AdminTag',
          component: () => import('@/pages/admins/tag/tag')
        },
        {
          path: 'user',
          name: 'AdminUser',
          component: () => import('@/pages/admins/user/user')
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
