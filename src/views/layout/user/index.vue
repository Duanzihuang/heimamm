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
        <el-form-item label="用户名称" prop="username">
          <el-input
            style="width:150px;"
            v-model="searchForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input style="width:150px;" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
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
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="clear" type="default">清除</el-button>
          <el-button @click="add" type="primary">+新增用户</el-button>
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
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
        ></el-table-column>
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
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              >{{ scope.row.status === 0 ? "启用" : "禁用" }}</el-button
            >
            <el-button
              @click="deleteUser(scope.row.id, scope.row.username)"
              type="default"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next,jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <user-edit ref="userEditRef"></user-edit>
  </div>
</template>

<script>
// 导入子组件
import UserEdit from "./user-add-or-update";
export default {
  components: {
    UserEdit,
  },
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
    // 搜索
    search() {
      this.page = 1; // 从第一页开始搜索

      this.getUserListData();
    },
    // 清除
    clear() {
      // this.searchForm.username = ''
      // this.searchForm.email = ''
      // this.searchForm.role_id = ''
      // 重置表单项的内容
      this.$refs.searchFormRef.resetFields();

      this.search();
    },
    // 分页条的页容量发生了改变
    handleSizeChange(val) {
      this.limit = val;

      this.search();
    },
    // 分页条的当前页发生了改变
    handleCurrentChange(val) {
      this.page = val;

      this.getUserListData();
    },
    // 更改当前行的状态
    async changeStatus(id) {
      const res = await this.$axios.post("/user/status", { id });

      if (res.data.code === 200) {
        this.$message({
          message: "更改状态成功~",
          type: "success",
        });

        // 重新查询
        this.search();
      }
    },
    deleteUser(id, username) {
      this.$confirm(`确定删除 ${username} 该用户吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.post("/user/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功~",
              type: "success",
            });

            // 重新查询
            this.search();
          }
        })
        .catch(() => {});
    },
    add() {
      // 让新增用户的对话框显示出来
      this.$refs.userEditRef.dialogVisible = true;
      this.$refs.userEditRef.mode = "add";
    },
  },
};
</script>
