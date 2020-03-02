import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes'
import {getCookie,isUndefined } from '@/utils/util'
Vue.use(Router);

let router = new Router({
    routes
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  let token = getCookie('token'); 
  let isLogin = !isUndefined(token);
  if (isLogin) {
    // 如果是登录
    if (to.name === 'login') {
        next({path:'/'})
    } else {
      next();
    }
  } else {
    let flag = to.matched.some(item => item.meta.needLogin);
    if (flag) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router