<template>
  <div class="userEdit">
    <el-dialog center :visible.sync="dialogVisible" width="600">
      <div slot="title" class="title">
        {{ mode === "add" ? "新增用户" : "修改用户" }}
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      mode: "", // 模式，add 代表新增  edit 代表修改
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style lang="less">
.userEdit {
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: #0e9cfa;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
