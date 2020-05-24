<template>
  <div>
    <table border="1">
        <tr>
            <th style="width:100px;">名称</th>
            <th style="width:200px;">地址</th>
            <th style="width:100px;">状态</th>
        </tr>
        <tr v-for="item in data" :key="item.id">
            <td style="width:100px;">{{item.name}}</td>
            <td style="width:200px;">{{item.address}}</td>
            <td style="width:100px;">
                <!-- 把遍历到的这一行数据，传递给父组件 -->
                <slot :row="item"/>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
