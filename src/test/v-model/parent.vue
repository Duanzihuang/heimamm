<template>
  <div>
    父组件<br />
    {{ url }}
    <br />
    <br />
    <hr />
    <br />
    <br />
    <br />
    <child v-model="url" />
    <!-- v-model 其实就是一个语法糖，它相当于是 :value 和 @input 构成的 -->
    <!-- <child :value="url" @input="xxx"/> -->
  </div>
</template>

<script>
import Child from "./child";
export default {
  components: {
    Child,
  },
  data() {
    return {
      url: "www.baidu.com",
    };
  },
};
</script>
