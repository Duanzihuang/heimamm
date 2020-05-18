<template>
    <div id="parentId">
        父组件
        <hr>
        <child>
            <!-- <span style="color:red;">测试默认操作</span> -->
            <!-- <h1>111</h1> -->
            <img src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290" alt="">
        </child>
    </div>
</template>

<script>
import child from './child'
export default {
    components: {
        child
    }
}
</script>