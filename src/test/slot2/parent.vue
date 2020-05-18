<template>
    <div id="parentId">
        父组件
        <hr>
        <child>
            <div slot="title">xxxxyyyzzz</div>
            

            内容

            <span slot="footer">
                底部
            </span>
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