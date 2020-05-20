import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import { getToken } from "@/utils/token";

// 导入页面
import Login from "@/views/login";
import Layout from "@/views/layout";
import Chart from "@/views/layout/chart"
import Enterprise from "@/views/layout/enterprise"
import Question from "@/views/layout/question"
import Subject from "@/views/layout/subject"
import User from "@/views/layout/user"

// 以下实测实的
import Slot1 from "@/test/slot1/parent";
import Slot2 from "@/test/slot2/parent";

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/layout", component: Layout, children: [
      {path: 'chart',component: Chart},
      {path: 'enterprise',component: Enterprise},
      {path: 'question',component: Question},
      {path: 'subject',component: Subject},
      {path: 'user',component: User}
    ] },

    // 下面是测试的路由
    { path: "/slot1", component: Slot1 },
    { path: "/slot2", component: Slot2 },
  ],
});

// 全局导航守卫
/**
 * 在Vue中，只要发生了路由跳转，他都会来到这个方法中
 * 相当于拦截到了所有的路由跳转，然后我们再根据实际情况处理
 */
router.beforeEach((to, from, next) => {
  if (to.fullPath == "/login") {
    next();
  } else {
    // 你要去非登录页面，这个时候，我就要先判断你是否登录了，如果登录了，让你走，没有登录则回到登录页面
    const token = getToken();
    if (token) {
      // 代表登录了
      next(); // 去到你想去的页面
    } else {
      next("/login");
    }
  }
});

export default router;
