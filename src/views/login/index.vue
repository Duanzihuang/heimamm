<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        class="login-form"
      >
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="loginForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input
                v-model="loginForm.code"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>
          我已阅读并同意<el-link type="primary" href="http://www.baidu.com"
            >用户协议</el-link
          >和<el-link type="primary" href="http://www.baidu.com"
            >隐私条款</el-link
          >
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="loginClick" type="primary"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt="" />
    </div>
  </div>
</template>

<script>
// 按需导入
import { setToken } from '@/utils/token'
export default {
  name: "Login",
  data() {
    return {
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      loginForm: {
        // 模型
        phone: "18511111111", // 手机号
        password: "12345678", // 密码
        code: "", // 验证码
        isCheck: true, // 是否勾选了用户协议
      },
      rules: {
        // 校验规则
        phone: [
          // 是个数组，代表这个里面可以写多个校验规则
          // { required: true, message: "必须输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }

              // 手机号的正则表达式
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }

              callback();
            },
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "必须输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "必须输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度必须是4位",
            trigger: "blur",
          },
        ],
        isCheck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("必须勾选用户协议"));
              }

              callback();
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    // function promiseTest() {
    //   const promise = new Promise((resolve, reject) => {
    //     const r = Math.random();
    //     console.log(r);
    //     setTimeout(() => {
    //       if (r > 0.5) {
    //         resolve("成功之后的结果");
    //       } else {
    //         reject("失败");
    //       }
    //     }, 2000);
    //   });
    //   return promise
    // }
    // const res = await promiseTest()
    // console.log(res)
    // const res2 = await xxx(res)
    // const res3 = await yyy(res2)
    /**
    promiseTest().then(res => {
      console.log(res)
      xxx(res).then(res2 => {
        yyy(res2).then(res3 => {
          ...
        })
      })
    }).catch(err => {
      console.log(err)
    })
     */
    /** 
    promise
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      */
  },
  methods: {
    // 获取验证码
    getCode() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login&t=" +
        (new Date() - 0);
    },
    // 登录
    loginClick() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;

        // 发请求给后台进行登录
        /**
        this.$axios.post("/login", this.loginForm).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "登录成功~",
              type: "success",
            });
          } else {
            this.$message.error(res.data.message);

            this.codeURL =
              process.env.VUE_APP_BASEURL +
              "/captcha?type=login&t=" +
              (new Date() - 0);
          }
        });
         */
        const res = await this.$axios.post("/login", this.loginForm);

        if (res.data.code === 200) {
          // 提示
          this.$message({
            message: "登录成功~",
            type: "success",
          });

          // 保存token
          setToken(res.data.data.token)

          // 跳转到后台管理页面
          this.$router.push('/layout')
        } else {
          this.$message.error(res.data.message);

          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&t=" +
            (new Date() - 0);
        }
      });
    },
  },
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
