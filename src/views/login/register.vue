<template>
  <div>
    <el-dialog title="注册" width="600px" :visible.sync="dialogVisible">
      <span>这个是测试dialog</span>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  //   props: ["isShow"],
  data() {
    return {
      //   dialogVisible: this.isShow,

      dialogVisible: false,
    };
  },
  //   watch: {
  //       isShow:function(newValue) {
  //           this.dialogVisible = newValue
  //       }
  //   }
};
</script>
