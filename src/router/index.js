import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import { getToken } from '@/utils/token'

import Login from "@/views/login";
import Layout from "@/views/layout";

// 以下实测实的
import Slot1 from '@/test/slot1/parent'
import Slot2 from '@/test/slot2/parent'

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/layout", component: Layout },


    // 下面是测试的路由
    { path:'/slot1', component:  Slot1},
    { path:'/slot2', component:  Slot2}
  ],
});

// 全局导航守卫
router.beforeEach((to,from,next) => {
  if (to.fullPath == '/login') {
    next()
  } else {
    // 你要去非登录页面，这个时候，我就要先判断你是否登录了，如果登录了，让你走，没有登录则回到登录页面
    const token = getToken()
    if (token) { // 代表登录了
      next() // 去到你想去的页面
    } else {
      console.log('token没有，没有登录...')
      next('/login')
    }
  }
})

export default router;
