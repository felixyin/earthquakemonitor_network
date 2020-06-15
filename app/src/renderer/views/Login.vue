<template>
  <div class="my-login-bg">
    <titler></titler>
    <div class="my-login-header">
      <!--<img src="../assets/img/login/login-logo.png" style=""/>-->
      <span>地震预警信息发布平台</span>
    </div>
    <div class="login">
      <div class="logo">
        <h1>登&nbsp;&nbsp;录</h1>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="50px">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" style="margin-left:25%;background-color: #7893B9;font-weight: bold;">&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;&nbsp;</el-button>
          <!--<el-button @click="handleRegist">新用户注册</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import titler from '../components/Titler'
  import store from '../store';

  export default {
    name: 'login',
    components: {
      titler
    },
    created(){
      store.dispatch('setLoginPageShow', true)
    },
    data () {
      var validateName = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }

      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            {validator: validateName, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            let args = [
              this.loginForm.username,
              this.loginForm.password
            ]
            window.localStorage.setItem('username', args[0]);
            window.localStorage.setItem('password', args[1]);
            this.$store.dispatch('login', args).then(() => {
              this.$router.push('/main')
            }, msg => {
//              this.$notify.error({
//                title: '错误',
//                offset:30,
//                message: msg
//              });
              this.$message.error(msg)
            })
          }
        })
      },
      handleRegist () {
        this.$router.push('/regist')
      }
    }
  }
</script>

<style scoped>
  * {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
  }

  .btn, button {
    cursor: pointer;
  }

  .login {
    position: absolute;
    width: 320px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 10px;
    margin: auto;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid #f4f8ef;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
  }

  .logo {
    text-align: center;
  }

  .logo > h1 {
    color: #6888AD;
  }

  .my-login-header {
    position: absolute;
    width: 100%;
    height: 140px;
    top: 70px;
  }

  .my-login-header img {
    float: left;
    height: 100px;
    margin-top: 20px;
    margin-left: 80px;
  }

  .my-login-header span {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    float: left;
    margin-top: 40px;
    /*margin-left: 180px;*/
    font-family: 'PingFang SC';
    font-size: 70px;
    font-weight: 900;
    color: dimgray;
    letter-spacing: 20px;
  }

  .el-form-item {
    width: 92%;
  }
</style>
