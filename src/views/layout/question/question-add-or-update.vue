<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <div slot="title" class="title">
        {{ mode === "add" ? "新增试题" : "编辑试题" }}
      </div>
      <el-form
        class="form"
        :model="questionForm"
        :rules="rules"
        ref="questionFormRef"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select
            class="selectWidth"
            v-model="questionForm.subject"
            placeholder="请选择学科"
          >
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionEdit",
  //   props: ['subjectList','enterpriseList'],
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object,
  },
  data() {
    return {
      mode: "", // add 新增 edit 修改
      dialogVisible: false, // 控制dialog的显示及隐藏
      questionForm: {
        // 这个里面的所有值，将来是传递给服务器的
        subject: "",
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
      },
    };
  },
};
</script>

<style lang="less">
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
}
</style>
