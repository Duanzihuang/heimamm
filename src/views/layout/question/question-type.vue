<template>
  <div class="questionType">
    <div v-if="questionForm.type == 1">
      <div v-for="item in questionForm.select_options" :key="item.label" class="item">
        <!-- radio -->
        <el-radio v-model="questionForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <!-- input -->
        <el-input v-model="item.text"></el-input>
        <!-- 上传的子组件 -->
      </div>
    </div>
    <div v-if="questionForm.type == 2">
      
      <div v-for="item in questionForm.select_options" :key="item.label" class="item">
        <!-- checkbox -->
        <el-checkbox v-model="questionForm.multiple_select_answer" :label="item.label"></el-checkbox>
        <!-- input -->
        <el-input style="margin-left:15px;" v-model="item.text"></el-input>
        <!-- 上传的子组件 -->
      </div>
    </div>
    <div v-if="questionForm.type == 3">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="questionForm.short_answer"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionType",
  props: ["questionForm"],
};
</script>

<style lang="less">
  .questionType{
    .item{
      display: flex;
      align-items: center;
    }
  }
</style>
