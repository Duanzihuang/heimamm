# Day08

## 权限控制

> 实现效果：

当用户随便输入一个不在它权限里面的路径的时候，跳转回登录页面

> 实现步骤：

1. 修改`src/router/index.js`中的路由配置，修改如下

   ```js
   // 创建路由对象
   const router = new VueRouter({
     // routes 路由规则配置、这个单词不要写错
     routes: [
       /**
        * meta 可以理解为携带的额外之外，它的值是一个对象，对象里面就可以为所欲为
        * 路由元信息仅仅就是携带点参数，不要把它的功能想得过于强大
        */
       { path: '/login', component: Login, meta: { title: '登录' } },
       { path: '/', redirect: '/login' },
       {
         path: '/layout',
         component: Layout,
         redirect: '/layout/welcome',
         meta: {
           title: '后台管理',
           roles: ['超级管理员', '管理员', '老师', '学生']
         },
         children: [
           // 嵌套路由里面的path，前面不要加/，否则会把layout干掉
           {
             path: 'welcome',
             component: Welcome,
             meta: {
               /**
                * fullPath、icon、title是为了生成左边的每一个菜单项 el-menu-item
                */
               fullPath: '/layout/welcome',
               icon: 'el-icon-s-home',
               title: '首页',
               /**
                * roles是来决定，是否能生成或显示
                */
               roles: ['超级管理员', '管理员', '老师', '学生']
             }
           },
           {
             path: 'chart',
             component: Chart,
             meta: {
               fullPath: '/layout/chart',
               icon: 'el-icon-pie-chart',
               title: '数据预览',
               roles: ['超级管理员', '管理员', '老师']
             }
           },
           {
             path: 'user',
             component: User,
             meta: {
               fullPath: '/layout/user',
               icon: 'el-icon-user',
               title: '用户列表',
               roles: ['超级管理员', '管理员', '老师']
             }
           },
           {
             path: 'enterprise',
             component: Enterprise,
             meta: {
               fullPath: '/layout/enterprise',
               icon: 'el-icon-office-building',
               title: '企业列表',
               roles: ['超级管理员', '管理员', '老师']
             }
           },
           {
             path: 'question',
             component: Question,
             meta: {
               fullPath: '/layout/question',
               icon: 'el-icon-edit-outline',
               title: '题库列表',
               roles: ['超级管理员', '管理员', '老师', '学生']
             }
           },
           {
             path: 'subject',
             component: Subject,
             meta: {
               fullPath: '/layout/subject',
               icon: 'el-icon-notebook-2',
               title: '学科列表',
               roles: ['超级管理员', '管理员', '老师']
             }
           }
         ]
       }
     ]
   })
   ```

2. 在`src/router/index.js`中实现导航守卫的代码
	 ```js
   // 导入token工具类
   import { getToken } from '../utils/token'
   
   // 导航守卫（前置守卫）
   /**
    * 这个回调函数，在每次路由切换之前（无论是声明式导航，还是编程式导航）都会执行这个方法
    *
    * 参数1：to 表示你要去的路径
    * 参数2：from 你上一次的路径
    * 参数3：next 代表放行以及跳转指定的页面
    */
   router.beforeEach((to, from, next) => {
     if (to.path === '/login') {
       // 登录页面直接放行
       next()
     } else {
       const token = getToken()
       if (token) {
         // 登录了
         next()
       } else {
	      // 没有登录，跳转到登录页面
	      next('/login')
	    }
	  }
	})
	```
	
3. 在`src/views/layout/index.vue`中，渲染左侧菜单的时候，根据它具有的权限进行动态渲染

   ```vue
   <el-container>
         <el-aside width="auto">
           <!--
             collapse：折叠，如果折叠那么el-aside的width要设置auto，并且el-menu要与一个默认的宽度
             router：如果设置了它，会把el-menu-item中的index当做是路径
             default-active：当前激活菜单的 index
            -->
           <el-menu
             :collapse="isCollapse"
             class="el-menu-vertical-demo"
             :default-active="defaultActive"
             router
           >
             <div
               v-for="item in $router.options.routes[2].children"
               :key="item.path"
             >
               <el-menu-item
                 :index="item.meta.fullPath"
                 v-if="item.meta.roles.includes(userInfo.role)"
               >
                 <i :class="item.meta.icon"></i>
                 <span slot="title">{{ item.meta.title }}</span>
               </el-menu-item>
             </div>
   
             <!--
             <el-menu-item
               v-for="item in $router.options.routes[2].children"
               :key="item.path"
               :index="item.meta.fullPath"
               v-show="item.meta.roles.includes(userInfo.role)"
             >
               <i :class="item.meta.icon"></i>
               <span slot="title">{{ item.meta.title }}</span>
             </el-menu-item>
             -->
   
             <!-- <el-menu-item index="/layout/welcome">
               <i class="el-icon-s-home"></i>
               <span slot="title">首页</span>
             </el-menu-item>
             <el-menu-item index="/layout/chart">
               <i class="el-icon-pie-chart"></i>
               <span slot="title">数据预览</span>
             </el-menu-item>
             <el-menu-item index="/layout/user">
               <i class="el-icon-user"></i>
               <span slot="title">用户列表</span>
             </el-menu-item>
             <el-menu-item index="/layout/enterprise">
               <i class="el-icon-office-building"></i>
               <span slot="title">企业列表</span>
             </el-menu-item>
             <el-menu-item index="/layout/question">
               <i class="el-icon-edit-outline"></i>
               <span slot="title">题库列表</span>
             </el-menu-item>
             <el-menu-item index="/layout/subject">
               <i class="el-icon-notebook-2"></i>
               <span slot="title">学科列表</span>
             </el-menu-item> -->
           </el-menu>
         </el-aside>
         <el-main class="main">
           <router-view></router-view>
         </el-main>
       </el-container><el-container>
         <el-aside width="auto">
            <el-menu
                 router
                 :default-active="defaultActive"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
               >
                 <el-menu-item
                   v-for="item in $router.options.routes[2].children"
                   :key="item.meta.fullPath"
                   :index="item.meta.fullPath"
                   v-show="
                     item.meta.roles.includes(
                       $store.getters.getUserInfo
                         ? $store.getters.getUserInfo.role
                         : ''
                     )
                   "
                 >
                   <i :class="item.meta.icon"></i>
                   <span slot="title">{{ item.meta.title }}</span>
                 </el-menu-item>
   		</el-menu>
      </el-aside>
   </el-container>
   ```
   
4. 在`src/views/layout/index.vue`中，在获取用户信息的函数中，增加如下代码

   ```js
   export default  {
       methods: {
           // 获取用户信息
           async getUserInfoData () {
             const res = await this.$http.get('/info')
   
             this.userInfo = res.data
             this.userInfo.avatar = process.env.VUE_APP_BASEURL + res.data.avatar
   
             // 这个地方，因为我们只需要判断当前地址栏中的路径是否有权限访问，所以使用 $route
             if (!this.$route.meta.roles.includes(res.data.role)) {
               // 提示
               this.$message.error('您没有访问该页面的权限！')
   
               // 跳转到登录页面
               this.$router.push('/login')
             } else {
               // console.log(this.$store.state)
               // 非严格模式下，这样是可以的
               // this.$store.state.userInfo = res.data
   
               // 比较推荐的更改仓库中值的写法，这个地方是触发了 mutations 中的 setUserInfo 这个方法
               this.$store.commit('setUserInfo', res.data)
             }
           }
       }
   }
   ```

5. 在`src/views/layout/index.vue`中，使用`watch`监听用户强制刷新，对访问的url进行鉴权

   ```js
   watch: {
       $route (newValue) {
         if (!newValue.meta.roles.includes(this.userInfo.role)) {
           // 提示
           this.$message.error('您没有访问该页面的权限！')
   
           // 跳转到登录页面
           this.$router.push('/login')
         }
   
         // 设置激活的index
         this.defaultActive = newValue.path
       }
   }
   ```

## Vuex

> 作用：

全局状态管理，在我们项目中，当在`src/views/layout/index.vue`的获取用户信息函数中，获取了用户信息之后把它保存到仓库中，然后在`src/views/layout/welcome/index.vue`中获取出来并且展示

>实现步骤：

1. 在`src/store/index.js`中写好相应的代码，并且在`main.js`中引入，并且注入到根实例中

   ```js
   // 导包
   import Vue from 'vue'
   import Vuex from 'vuex'
   
   // 使用了vuex
   Vue.use(Vuex)
   
   // Vuex.Store 特别容易写错，Store容易小写
   const store = new Vuex.Store({
     strict: true,
     // 核心概念 state、getters、mutations、actions、modules都是对象
     // state中写的是要操作的值
     state: {
       userInfo: {}
     },
     // 在组件中获取值
     getters: {
       getUserInfo (state) {
         return state.userInfo
       }
     },
     // 在组件中更改仓库中的值
     mutations: {
       setUserInfo (state, payload) {
         state.userInfo = payload
       }
     }
   })
   
   // 导出
   export default store
   ```

   `main.js`中的代码

   ```js
   // 导入store
   import store from '@/store'
   
   new Vue({
     render: h => h(App),
     router,
     store
   }).$mount('#app')
   ```

2. 在`src/views/layout/index.vue`中，当获取到了用户信息之后，把它保存到仓库中

   ```js
     methods: {
       // 获取用户信息
       async getUserInfoData () {
         const res = await this.$http.get('/info')
   
         this.userInfo = res.data
         this.userInfo.avatar = process.env.VUE_APP_BASEURL + res.data.avatar
   
         // 这个地方，因为我们只需要判断当前地址栏中的路径是否有权限访问，所以使用 $route
         if (!this.$route.meta.roles.includes(res.data.role)) {
           // 提示
           this.$message.error('您没有访问该页面的权限！')
   
           // 跳转到登录页面
           this.$router.push('/login')
         } else {
           // console.log(this.$store.state)
           // 非严格模式下，这样是可以的
           // this.$store.state.userInfo = res.data
   
           // 比较推荐的更改仓库中值的写法，这个地方是触发了 mutations 中的 setUserInfo 这个方法
           this.$store.commit('setUserInfo', res.data)
         }
       }
   }
   ```
   
3. 在`src/views/layout/welcome/index.vue`中，从仓库中获取用户的信息并且进行展示

   ```vue
   <template>
     <div>
       <el-card>
         <!-- {{ $store.state.userInfo.username }} 深圳欢迎您，您的角色是：{{
           $store.state.userInfo.role
         }} -->
   
         尊贵的
         {{ $store.getters.getUserInfo.username }} 深圳欢迎您，您的角色是：{{
           $store.getters.getUserInfo.role
         }}
       </el-card>
     </div>
   </template>
   ```
   
   