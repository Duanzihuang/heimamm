<template>
    <div>
        <!-- {{username}} --- {{age}} 欢迎您 -->
        <!-- <el-button @click="add" type="primary">新增用户</el-button> -->
        <!-- todo 展示图像 -->
        <!-- <user-edit ref="userEditRef"></user-edit> -->
        {{$store.getters.getUserInfo.username}} 欢迎您，您的角色是 {{$store.getters.getUserInfo.role}}
        <br />
        <el-button type="primary" @click="changeModel">更改模型的值</el-button>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    data() {
        return {
            // username: '18511111111',
            // age: 10
        }
    },
    methods: {
        // add() {
        //     this.$refs.userEditRef.dialogVisible = true
        // }
        changeModel() {
            this.username = '18211111111'
            this.age = 20

            // 拿到
        }
    }
}
</script>