import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/welcome'
import UserList from '@/components/user/userList'
import Right from '@/components/power/Right'
import Roles from '@/components/power/Roles'

Vue.use(Router)
// 创建路由对象
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, {
      path: '/users',
      component: UserList
    }, {
      path: '/rights',
      component: Right
    },
    {
      path: '/roles',
      component: Roles
    }]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
