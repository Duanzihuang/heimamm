import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import { getToken } from "@/utils/token";

// 导入页面
// import Login from "@/views/login";
// import Layout from "@/views/layout";
// import Chart from "@/views/layout/chart";
// import Enterprise from "@/views/layout/enterprise";
// import Question from "@/views/layout/question";
// import Subject from "@/views/layout/subject";
// import User from "@/views/layout/user";
// import Welcome from "@/views/layout/welcome";
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Chart = () => import('@/views/layout/chart')
const Enterprise = () => import('@/views/layout/enterprise')
const Question = () => import('@/views/layout/question')
const Subject = () => import('@/views/layout/subject')
const User = () => import('@/views/layout/user')
const Welcome = () => import('@/views/layout/welcome')

// 以下是测试的
// import Slot1 from "@/test/slot1/parent";
// import Slot2 from "@/test/slot2/parent";
// import Slot3 from "@/test/slot3/index"
// import Parent from '@/test/parent-child-brother/parent'
// import VModel from '@/test/v-model'
// import VModelParent from '@/test/v-model/parent'

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login , meta: {title: '登录'} },
    {
      path: "/layout",
      component: Layout,
      meta: { roles: ["超级管理员", "管理员", "老师", "学生"] },
      children: [
        {
          path: "welcome",
          component: Welcome,
          // 元信息
          meta: {
            roles: ["超级管理员", "管理员", "老师", "学生"],
            icon: "el-icon-date",
            fullPath: "/layout/welcome",
            title: "个人信息",
          },
        },
        {
          path: "chart",
          component: Chart,
          meta: {
            roles: ["超级管理员", "管理员", "老师"],
            icon: "el-icon-pie-chart",
            fullPath: "/layout/chart",
            title: "数据预览",
          },
        },
        {
          path: "user",
          component: User,
          meta: {
            roles: ["超级管理员", "管理员", "老师"],
            icon: "el-icon-user",
            fullPath: "/layout/user",
            title: "用户列表",
          },
        },
        {
          path: "enterprise",
          component: Enterprise,
          meta: {
            roles: ["超级管理员", "管理员", "老师"],
            icon: "el-icon-office-building",
            fullPath: "/layout/enterprise",
            title: "企业列表",
          },
        },
        {
          path: "question",
          component: Question,
          meta: {
            roles: ["超级管理员", "管理员", "老师", "学生"],
            icon: "el-icon-edit-outline",
            fullPath: "/layout/question",
            title: "题库列表",
          },
        },
        {
          path: "subject",
          component: Subject,
          meta: {
            roles: ["超级管理员", "管理员", "老师"],
            icon: "el-icon-notebook-2",
            fullPath: "/layout/subject",
            title: "学科列表",
          },
        },
      ],
    },

    // 下面是测试的路由
    // { path: "/slot1", component: Slot1 },
    // { path: "/slot2", component: Slot2 },
    // { path: "/slot3",component: Slot3},
    // { path: "/parent", component: Parent },
    // { path: "/vmodel", component: VModel },
    // { path: "/vmodelparent", component: VModelParent }
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

// 全局后置钩子
router.afterEach((to,from) => {
  document.title = to.meta.title || '黑马面面'
})

export default router;
