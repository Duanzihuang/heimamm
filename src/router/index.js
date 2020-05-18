import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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

export default router;
