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
        <el-form-item label="阶段" prop="step">
          <el-select
            class="selectWidth"
            v-model="questionForm.step"
            placeholder="请选择阶段"
          >
            <el-option
              v-for="(value, name) in stepObj"
              :key="name"
              :label="value"
              :value="name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select
            class="selectWidth"
            v-model="questionForm.enterprise"
            placeholder="请选择企业"
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            size="large"
            :options="options"
            :props="{ value: 'label' }"
            v-model="questionForm.city"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="questionForm.type">
            <el-radio
              v-for="(value, name) in typeObj"
              :key="name"
              :label="name"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio
              v-for="(value, name) in difficultyObj"
              :key="name"
              :label="name"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "QuestionEdit",
  //   props: ['subjectList','enterpriseList'],
  created() {
    console.log(regionData);
  },
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
      options: regionData,
      questionForm: {
        // 这个里面的所有值，将来是传递给服务器的
        subject: "", // 学科
        step: "", // 阶段
        enterprise: "", // 企业
        city: [], // 城市
        type: "1", // 题型
        difficulty: "1", // 难度
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 新增 & 修改
    submit() {},
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
