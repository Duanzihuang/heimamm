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
    <el-card style="margin-top:20px;"> </el-card>
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
    };
  },
};
</script>
