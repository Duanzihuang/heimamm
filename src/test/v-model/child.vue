<template>
    <div>
        子组件<br/>
        <br/>
        <br/>
        传递过来的值：{{value}}
        <br/>
        <br/>
        <button @click="changeValue">更改url</button>
    </div>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        changeValue() {
            this.$emit('input','www.jd.com')
        }
    }
}
</script>