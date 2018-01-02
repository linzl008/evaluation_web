<template>
  <div class="login-wrap">
    <login-bg></login-bg>
    <div class="log">
      <my-header :logType="logType"></my-header>
      <el-form ref="form" :model="form" label-width="0" :rules="rules" :show-message="false" class="login-form">
        <div class="logo">
          <!--<img style="background-color: #2d2f33"  src="../../src/assets/logo.png" alt="login-logo">-->
          <h1>学术评估系统</h1>
        </div>
        <div class="user">
          <el-form-item prop="userno">
            <el-input placeholder="用户" v-model="form.userno" :autofocus="true">
              <template slot="prepend">
                <i class="iconfont icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="passwd">
          <el-form-item prop="psd">
            <el-input placeholder="密码" type="password" v-model="form.passwd"  @keyup.native.enter="submit">
              <template slot="prepend">
                <i class="iconfont  icon-password"></i>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="12" class="t-left">
            <el-checkbox v-model="form.flag" checked>七日自动登录</el-checkbox>
          </el-col>

        </el-row>
        <div class="btn" @click="submit">
          <el-button type="primary" :loading='loading'>登录</el-button>
        </div>
      </el-form>


    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/my-header';
  import LoginBg from '@/components/login-bg'
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name: 'log',
    components: {
      MyHeader,
      LoginBg
    },
    data(){
      return {
        form: {
          userno: '',
          passwd: '',
          flag:0
        },
        loading: false,
        logType: false,
        rules: {
          userno: [
            {required: true, message: '请输入用户名', trigger: 'change'}
          ],
          passwd: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      submit(){
        this.loading = true;
        console.log(this.form);
        var temp_flag = this.form.flag;
        if(temp_flag == false){
          temp_flag = 0;
        }
        if(temp_flag == true){
          temp_flag = 1;
        }
        if(this.checkForm()){
          let params = {
            userno:this.form.userno,
            userpwd:this.form.passwd,
            flag:temp_flag
          }
//          console.log('temp:',params);
          this.$http.post(api.login ,params).then(res=>{
            if(solve_res(res,"登录成功","用户名或密码错误")){
              //判断是否正确，设置user，token，页面跳转
              this.$store.dispatch('setUser', {
                userName: this.form.userno
              })
              localStorage.setItem("user",this.form.userno);
              setTimeout(()=>{this.loading = false;this.$router.push('/home')},500);
            }else{
              setTimeout(()=>{this.loading = false;},500);
            }
          }).catch(err=>{
            this.$message({
              type: 'error',
              message: '登录失败',
              duration: 1000,
              onClose: () => {
                this.$router.push('/')
              }
            })
            console.log(err);
            setTimeout(()=>{this.loading = false},1000);
          })
        }

      },

      checkForm() {
        if (this.form.userno == '') {
          this.$message.error('账号不能为空');
          return false;
        }
        else if (this.form.passwd == '') {
          this.$message.error('密码不能为空');
          return false;
        }
        else {
          return true;
        }
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-input-group__prepend {
    /*修复登录图表显示问题*/
    padding: 0 10px !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/tool.scss';
  .login-wrap {
    width: 100%;
    height: 100%;
    background: #f7f5f0;
    position: relative;
    background-size: cover;
    overflow: hidden;
  }
  .login-form {
    width: 320px;
    height: 360px;
    position: absolute;
    top: 18%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    background: #fff;
    padding: 24px 36px;
    border-radius: 0 0 4px 4px;
    border: 1px solid #dbd6c9;
    border-top: 3px solid #b2881a;
    box-shadow: 2px 2px 2px #dbd6c9;
    .el-button {
      width: 98%;
    }
    .el-input input {
      border-radius: 0;
      text-align: left;
    }
    .logo{
      padding-bottom: 24px;
    }
    .btn {
      margin-top: 20px;
    }
  }

</style>


<!--
<template>
  <div class="log">
    <my-header :logType="logType"></my-header>
    <div class="log_content">
      &lt;!&ndash;<img @click="to('http://www.ccbfund.com')" class="logo" src="http://www.ccbfund.com/r/cms/jx/jx/images/img3.jpg" alt="">&ndash;&gt;
      <h1>华泰基金中台</h1>
      <el-form :model="form" ref="form">
        <el-form-item prop="userName">
          <el-input :autofocus="true" class="username" v-model="form.userName" placeholder="请输入用户名">
            <template slot="prepend"><i class="iconfont icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input type="password"
                    class="password"
                    v-model="form.passwd"
                    @keydown.native.enter="submit"
                    placeholder="请输入密码">
            <template slot="prepend"><i class="iconfont icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <div class="t-left">
          <el-checkbox v-model="form.flag">七天内自动登录</el-checkbox>
        </div>
        <el-form-item>
          <el-button @click="submit" :loading='loading' class="submit" type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { Login } from '@/api'
  import MyHeader from '@/components/my-header';

  export default {
    name: 'log',
    components: {
      MyHeader
    },
    data(){
      return {
        form: {
          userName: '',
          passwd: '',
          flag:0
        },
        loading: false,
        logType: false
      }
    },
    methods: {
      submit(){
        this.loading = true;
        if(this.checkForm()){
          var temp_flag = this.form.flag ;
          console.log(temp_flag,"yyy")
          if(temp_flag == false){
            temp_flag = 0;
          }
          if(temp_flag == true){
            temp_flag = 1;
          }
          let params = {
            userno:this.form.userName,
            userpwd:this.form.passwd,
            flag:temp_flag
          }
//          console.log('temp:',params);
          Login(params).then(res=>{
            console.log(res)
            //判断是否正确，设置user，token，页面跳转
            this.$store.dispatch('setUser', {
              userName: this.form.userName
            })
            sessionStorage.setItem("user",this.form.userName);

            this.$message({
              type: 'success',
              message: '登录成功',
              duration: 1000,
              onClose: () => {
                this.$router.push('/home')
              }
            })
            setTimeout(()=>{this.loading = false},1000);
          }).catch(err=>{
            this.$message({
              type: 'error',
              message: '登录失败',
              duration: 1000,
              onClose: () => {
                this.$router.push('/')
              }
            })
            console.log(err);
            setTimeout(()=>{this.loading = false},1000);
          })
        }

      },

      checkForm() {
        if (this.form.userName == '') {
          this.$message.error('账号不能为空');
          return false;
        }
        else if (this.form.passwd == '') {
          this.$message.error('密码不能为空');
          return false;
        }
        else {
          return true;
        }
      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .log_content {
  .el-input__inner, .el-button {
    height: 50px;
  }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/tool.scss';

  .log_content {
    min-height: 380px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
    border-radius: 4px;
    box-shadow: 0 0 14px rgba(59, 188, 245, .3);
    overflow-x: hidden;

  .icon-user {
    font-size: 30px;
  }

  .icon-lock {
    font-size: 30px;
  }

  .logo {
    width: 100%;
    cursor: pointer;
  }

  .username {
    margin-top: 50px;
  }

  .password {
    /*margin-top: 20px;*/
    height: 50px;
  }

  .submit {
    /*margin-top: 35px;*/
    width: 100%;
  }
  }
</style>
-->
