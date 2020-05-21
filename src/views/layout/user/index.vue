<template>
  <div class="user">
    <!-- 搜索部分 -->
    <el-card>
      <el-form
        inline
        :model="searchForm"
        ref="searchFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名称">
          <el-input
            style="width:150px;"
            v-model="searchForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input style="width:150px;" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            style="width:150px;"
            v-model="searchForm.role_id"
            placeholder="请选择"
          >
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="default">清除</el-button>
          <el-button type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分 -->
    <el-card style="margin-top:20px;">
      <!-- 表格     -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status === 1" style="color:#6ac144;"
              >启用</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button :type="scope.row.status === 0 ? 'success' : 'info'">{{
              scope.row.status === 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button type="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      searchForm: {
        username: "", // 昵称
        email: "", // 邮箱
        role_id: "", // 角色数字 1、超级管理员 2管理员、3老师、 4学生
      },
      page: 1, // 查询时候的页码
      limit: 2, // 查询时候的页容量(每页查询多少条)
      userList: [], // 展示用户列表所需要的数据
      total: 0, // 总条数，分页时候用得着
    };
  },
  created() {
    // 获取用户列表数据，用于内容展示
    this.getUserListData();
  },
  methods: {
    async getUserListData() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm,
          //   username: this.searchForm.username,
          //   email: this.searchForm.email,
          //   role_id: this.searchForm.role_id
        },
      });

      if (res.data.code === 200) {
        this.userList = res.data.data.items;

        this.total = res.data.data.pagination.total;
      }
    },
  },
};
</script>
