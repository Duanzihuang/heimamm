import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less，webpack会让 main.js 这个入口文件和 .less 建立依赖关系
// import '@/styles/base.less'

import router from '@/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
