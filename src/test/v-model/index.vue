<template>
    <div>
        测试 v-model<br/>
        <!-- <input type="text" v-model="name"> -->

        <input :value="name" @input="changeValue"/>
    </div>
</template>

<script>
export default {
    name: 'TestVModel',
    data() {
        return {
            name: 'zhangsan'
        }
    },
    methods: {
        changeValue(e) {
            this.name = e.target.value
        }
    }
}
</script>