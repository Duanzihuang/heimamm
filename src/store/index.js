import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 仓库中要操作的数据
    state : {
        // 定义将来仓库中要操作的数据
        userInfo: {
            name: '张三',
            age: 30
        },
        count: 0
    }
})

export default store