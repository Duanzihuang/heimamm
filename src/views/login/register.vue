<template>
  <div class="register">
    <el-dialog width="600px" center :visible.sync="dialogVisible">
      <div slot="title" class="title">
        注册
      </div>
      <el-form ref="registerFormRef" :model="resgisterForm" :rules="rules" label-width="100px">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
                @click="changeCodeURL"
                :src="codeURL"
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
              <el-button @click="getRcode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="submit" type="primary"
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
      imageUrl: "", // 头像的url
      uploadAction: process.env.VUE_APP_BASEURL + '/uploads',
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
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
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
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
  methods: {
    changeCodeURL() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },
    async getRcode() {
      /**
      this.$axios.post('/sendsms',{
        code: this.resgisterForm.code,
        phone: this.resgisterForm.phone
      }).then(res => {
        if (res.data.code === 200) {
          this.resgisterForm.rcode = res.data.data.captcha
        } else {
          this.$message.error(res.data.message)
          // 重新刷新验证码
          this.changeCodeURL()
        }
      })
       */

      const res = await this.$axios.post("/sendsms", {
        code: this.resgisterForm.code,
        phone: this.resgisterForm.phone,
      });

      if (res.data.code === 200) {
        this.resgisterForm.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
        // 重新刷新验证码
        this.changeCodeURL();
      }
    },
    // 图片真正上传之前的回调函数
    beforeAvatarUpload(file) {
      const isImage = (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      // 如果要进行上传文件的请求，我们必须返回true，它才会进行文件上传
      return isImage && isLt2M;
    },
    // 上传成功之后的回调函数
    handleAvatarSuccess(res, file) {
      // 给imageUrl赋值
      this.imageUrl = process.env.VUE_APP_BASEURL + '/' + res.data.file_path

      // 给registerForm中的avatar模型赋值
      this.resgisterForm.avatar = res.data.file_path
    },
    // 注册
    submit() {
      // 做最后一次校验
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return

        const res = await this.$axios.post('/register', this.resgisterForm)

        if (res.data.code === 200) {
          // 提示
          this.$message({
            message: '注册成功~',
            type: 'success'
          });

          // 关闭掉当前窗口
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
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
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
