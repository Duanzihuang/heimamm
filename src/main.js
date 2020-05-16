import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'

Vue.config.productionTip = false

// 导入less
import '@/styles/base.less'

new Vue({
  render: h => h(App),
}).$mount('#app')
