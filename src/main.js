import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less，webpack会让 main.js 这个入口文件和 .less 建立依赖关系
// import '@/styles/base.less'

// 导入 element.js
import '@/plugins/element.js'

// 导入 request(封装了axios)
import '@/utils/request.js'

import router from '@/router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
