<template>
  <div class="question">
    <!-- 搜索内容区域 -->
    <el-card>
      <el-form
        inline
        :model="searchForm"
        ref="searchFormRef"
        label-width="50px"
      >
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
              <el-button @click="add" type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表区域 -->
    <el-card style="margin-top:15px;">
      <el-table :data="questionList" border stripe>
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="题目" width="200">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="学科.阶段" :formatter="formatterSubject" width="150"/> -->
        <el-table-column label="学科.阶段" width="150">
          <template slot-scope="scope">
            <span
              >{{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}</span
            >
          </template>
        </el-table-column>
        <!-- <el-table-column label="题型" prop="type"/> -->
        <el-table-column label="题型" :formatter="formatterType">
          <!-- <template slot-scope="scope">
            <span> -->
          <!-- 直接写最直接 -->
          <!-- {{typeObj[scope.row.type]}} -->
          <!-- 过滤器发现不好使: 过滤器中使用this发现是undefined -->
          <!-- {{scope.row.type | formatType}} -->
          <!-- 计算属性不好使: 无法传递及接收参数 -->
          <!-- {{formatType}} -->
          <!-- 使用调用方法的形势，可以：既可以接收参数，也可以获取到this -->
          <!-- {{formatType(scope.row.type)}} -->
          <!-- </span>
          </template> -->
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name" />
        <el-table-column label="创建者" prop="username" />
        <el-table-column label="访问量" prop="reads" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#6ac144' }"
            >
              {{ scope.row.status === 0 ? "禁用" : "启用" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="editSubject(scope.row)" type="primary"
              >编辑</el-button
            >
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              >{{ scope.row.status === 0 ? "启用" : "禁用" }}</el-button
            >
            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </el-card>
    <question-edit ref="questionEditRef"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
    ></question-edit>
  </div>
</template>

<script>
import QuestionEdit from './question-add-or-update'
export default {
  name: "Question",
  components: {
    QuestionEdit
  },
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
    this.getQuestionListData();
    // 获取所有的学科
    this.getSubjectListData();
    // 获取所有的企业
    this.getEnterpriseListData();
  },
  methods: {
    // 分页获取题库列表
    async getQuestionListData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm,
        },
      });

      if (res.data.code === 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
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
      this.page = 1;

      this.getQuestionListData();
    },
    // 清除
    clear() {
      // 如果要调用 form 表单的 resetFields 这个方法，需要给 el-form-item 设置 prop
      this.$refs.searchFormRef.resetFields();

      this.search();
    },
    // formatType(val) {
    //   return this.typeObj[val]
    // }
    // 格式化题型
    formatterType(row) {
      return this.typeObj[row.type];
    },
    // 格式化学科和阶段
    formatterSubject(row) {
      return `${row.subject_name}.${this.stepObj[row.step]}`;
    },
    // 页容量发生了改变
    sizeChange(val) {
      this.limit = val;

      this.search();
    },
    // 当前页发生了改变
    currentChange(val) {
      this.page = val;

      this.getQuestionListData();
    },
    // 更改状态
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code === 200) {
        // 提示
        this.$message({
          type: "success",
          message: "更改状态成功~",
        });

        // 刷新当前页
        this.getQuestionListData();
      }
    },
    // 删除
    async del(id) {
      this.$confirm("确定删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code === 200) {
            // 提示
            this.$message({
              type: "success",
              message: "删除成功~",
            });

            // 从第一页数据加载
            this.search();
          }
        })
        .catch(() => {});
    },
    // 新增
    add() {
      this.$refs.questionEditRef.mode = 'add'
      this.$refs.questionEditRef.dialogVisible = true
    },
    // 修改
    editSubject(row) {},
  },
  // filters: {
  //   formatType(val) {
  //     return this.typeObj[val]
  //   }
  // }
  // computed: {
  //   formatType(val){
  //     console.log('...val...',val)
  //     return 'test'
  //   }
  // }
};
</script>
