<template>
  <div class="my-header">
    <el-col :span="12" class="setting-wrap">
      <!--<h3 style="color: azure">&nbsp&nbsp华泰基金中台</h3>-->
      <div class="logo-wrap">
        <img class="logo" src="../assets/logo.png">
      </div>
    </el-col>
    <el-col v-if="logType" :span="12" class="setting-wrap-right">
      <div v-if="user" :span="12" >
        <span class="user">{{user}}</span>
        <el-button  size="mini" @click="logout()"><i class="iconfont icon-signout"></i>&nbsp退出登录</el-button>
      </div>
      <div v-else>
        <el-button  size="mini" @click="logout()"><i class="iconfont icon-user"></i>&nbsp登录</el-button>
      </div>
    </el-col>

  </div>
</template>

<script>
//  import { Login , Loginout } from '@/api'
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name: 'my-header',

    props: {
      logType: Boolean
    },
    data(){
      return {
        user:"",
        token:""
      }
    },
    mounted(){
      if(this.logType){//表示是内部页面
        this.user = localStorage.getItem("user");
        if(!this.user){//用户没有登录
//          this.$router.push({ path: '/'});
        }
      }
    },
    methods: {
      logout(){
        //清除token,user
        localStorage.removeItem('user');
//        sessionStorage.removeItem('token');
        //清除session，跳转页面
        this.$http.post(api.loginout).then(res=>{
          this.$router.push({ path : '/'});
        }).catch(err=> {
          this.$router.push({ path : '/'});
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../styles/tool.scss';

  .my-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;
    height: 50px;
    background-color: #324157;
    /*border-bottom: 1px solid #eee;*/
    box-shadow: 0 0 14px rgba(238, 238, 238, 0);

    .logo-wrap {


      .logo {
        padding-left:20px;
        padding-top: 8px;
        height: 46px;
      }

    }

    .setting-wrap {
      height: 100%;
      text-align: left;
      line-height: 50px;
    }
    .setting-wrap-right {
      height: 100%;
      text-align: right;
      line-height: 50px;
      padding-right: 10px;

      i{
        font-size: 14px;
      }
    }
    .user{
      line-height: 50px;
      color: azure;
      padding-right: 20px;
    }
  }
</style>
