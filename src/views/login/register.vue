<template>
  <div class="register">
    <el-dialog width="600px" center :visible.sync="dialogVisible">
      <div slot="title" class="title">
        注册
      </div>
      <el-form :model="resgisterForm" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="resgisterForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resgisterForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="resgisterForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="resgisterForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="resgisterForm.code"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
              <img
                class="captcha"
                src="http://47.106.148.205/heimamm/public/captcha?type=sendsms&t=1589773089302"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model.number="resgisterForm.rcode"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Register",
  //   props: ["isShow"],
  data() {
    return {
      //   dialogVisible: this.isShow,

      dialogVisible: false,
      resgisterForm: {
        // 这里面的数据，将来是要提交给服务器
        username: "", // 用户名
        phone: "", // 手机号
        email: "", // 邮箱
        avatar: "", // 头像地址
        password: "", // 密码
        code: "", // 图形码
        rcode: "", // 验证码
      },
      rules: {
        // 校验规则
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("邮箱不能为空"));
                return;
              }

              // 邮箱的正则
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!reg.test(value)) {
                return callback(new Error("邮箱不合法!"));
              }

              callback();
            },
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("手机号不能为空"));
                return;
              }

              // 手机的正则
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法!"));
              }

              callback();
            },
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, message: "密码长度最小是6位", trigger: "blur" },
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形码必须是4位", trigger: "blur" },
        ],
        rcode: [
          // { required: true, message: "验证码不能为空", trigger: "blur" },
          // { min: 4, max: 4, message: "验证码必须是4位", trigger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }

              if (value.trim().length !== 4) {
                return callback(new Error("验证码必须是4位"));
              }

              if (!Number.isInteger(value)) {
                return callback(new Error("验证码必须是数字"));
              }

              callback();
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  //   watch: {
  //       isShow:function(newValue) {
  //           this.dialogVisible = newValue
  //       }
  //   }
};
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>
