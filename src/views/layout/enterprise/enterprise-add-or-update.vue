<template>
  <div class="enterprise">
    <el-dialog :visible.sync="dialogVisible" center width="600px">
      <div slot="title" class="title">
        {{ mode === "add" ? "新增企业" : "修改企业" }}
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="企业编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业备注">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EnterpriseEdit",
  data() {
    return {
      dialogVisible: false,
      mode: "", // 新增(add) & 修改(edit)
    };
  },
  methods: {
    // 新增 & 修改最终点击确定调用的方法
    submit() {},
  },
};
</script>

<style lang="less">
.enterprise {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
