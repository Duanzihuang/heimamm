<template>
  <div>
    <!-- 搜索内容区域 -->
    <el-card>
      <el-form inline :model="searchForm" ref="form" label-width="80px">
        <el-form-item label="学科">
          <el-select v-model="searchForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="searchForm.step" placeholder="请选择阶段">
            <el-option
              v-for="(value,name) in stepObj"
              :key="name"
              :label="value"
              :value="name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="searchForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表区域 -->
    <el-card style="margin-top:15px;"> </el-card>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      subjectList: [], // 学科列表
      enterpriseList: [], // 企业列表
      stepObj: { 1: '初级', 2: '中级', 3: '高级' }, //阶段
      typeObj: { 1: '单选', 2: '多选', 3: '简答' }, //题型
      difficultyObj: { 1: '简单', 2: '一般', 3: '困难' }, //难度
      searchForm: { // 搜索的时候要传递给后台的
        subject: "", // 学科
        enterprise: "", // 企业
        step: ""
      },
    };
  },
  created() {
    // 获取所有的学科
    this.getSubjectListData();
    // 获取所有的企业
    this.getEnterpriseListData();
  },
  methods: {
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");

      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
      }
    },
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");

      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
      }
    },
  },
};
</script>
