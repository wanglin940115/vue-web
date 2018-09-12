<template>
  <div class="login_container">
    <div class="log_box">
      <div class="avatar_box">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :offset=15>
            <el-button type="primary" @click='login'>登录</el-button>
            <el-button type="danger" @click='resetFrom'>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetFrom() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async res => {
        // console.log(res)
        if (!res) return
        const { data: req } = await this.$http.post('login', this.loginForm)
        // console.log(req)
        if (req.meta.status !== 200) {
          window.sessionStorage.removeItem('token')
          return this.$message.error(req.meta.msg)
        }
        this.$message.success(req.meta.msg)
        window.sessionStorage.setItem('token', req.data.token)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: #2b4b6b;
  width: 100%;
  height: 100%;
}
.log_box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  background-color: #fff;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.el-form {
  position: absolute;
  bottom: 14px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
