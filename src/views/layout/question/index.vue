<template>
  <div class="question">
    <!-- 搜索内容区域 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item class="selectWidth" label="学科" prop="subject">
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="searchForm.step" placeholder="请选择阶段">
                <el-option
                  v-for="(value, name) in stepObj"
                  :key="name"
                  :label="value"
                  :value="name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select
                v-model="searchForm.enterprise"
                placeholder="请选择企业"
              >
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select v-model="searchForm.type" placeholder="请选择题型">
                <el-option
                  v-for="(value, name) in typeObj"
                  :key="name"
                  :label="value"
                  :value="name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select
                v-model="searchForm.difficulty"
                placeholder="请选择难度"
              >
                <el-option
                  v-for="(value, name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input
                style="width:208px;"
                v-model="searchForm.username"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"> </el-option>
                <el-option label="禁用" value="0"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                v-model="searchForm.create_date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input
                style="width:500px"
                v-model="searchForm.title"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button @click="search" type="primary">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度

      searchForm: {
        // 搜索的时候要传递给后台的
        subject: "", // 学科
        enterprise: "", // 企业
        step: "", // 阶段
        type: "", // 题型
        difficulty: "", // 难度
        username: "", // 作者
        status: "", // 状态 0 禁用 1 启用
        create_date: "", // 创建日期
        title: "", // 标题
      },
      page: 1, // 页码
      limit: 2, // 页容量（每页加载多少条）
      questionList: [], // 题库列表
      total: 0, // 总条数
    };
  },
  created() {
    // 获取题库列表数据
    this.getQuestionListData()
    // 获取所有的学科
    this.getSubjectListData();
    // 获取所有的企业
    this.getEnterpriseListData();
  },
  methods: {
    // 分页获取题库列表
    async getQuestionListData() {
      const res = await this.$axios.get('/question/list',{
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      })

      if (res.data.code === 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total
      }
    },
    // 查询所有的学科列表
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");

      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
      }
    },
    // 获取所有的企业列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");

      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
      }
    },
    // 搜索
    search() {
      this.page = 1

      this.getQuestionListData()
    },
    // 清除
    clear() {
      // 如果要调用 form 表单的 resetFields 这个方法，需要给 el-form-item 设置 prop
      this.$refs.searchFormRef.resetFields()

      this.search()
    }
  },
};
</script>
