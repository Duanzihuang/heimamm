import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 仓库中要操作的数据
    state : {
        // 定义将来仓库中要操作的数据
        userInfo: {}
    },
    // 所有获取仓库中值的代码，写在getters 中
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    // 所有更改仓库操作的方法都写在这里
    mutations: {
        /**
         * state 就代表上面 state对象
         * userInfo 代表要传递过来的用户信息 
         */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    }
})

export default store