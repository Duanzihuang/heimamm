<template>
  <div class="questionType">
    <div v-if="questionForm.type == 1">
      单选的内容
    </div>
    <div v-if="questionForm.type == 2">
      多选的内容
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
