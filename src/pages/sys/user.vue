<template>
  <div class="user">
    <el-button class="add" size="mini" type="primary" @click="userAdd">新增管理员</el-button>
    <el-table border :data="user" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="账号"  prop="userno" width="70" align="center"></el-table-column>
      <el-table-column label="备注"  prop="userdept" align="center">
        <template slot-scope="scope">
          {{scope.row.userdept}}--{{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="角色"  prop="userrolecode" align="center">
        <template slot-scope="scope">
          {{scope.row.userrolecode == 1 ? "超级管理员 ":"" }}
          {{scope.row.userrolecode == 2 ? "普通管理员 ":"" }}
        </template>
      </el-table-column>
      <el-table-column  label="操作" align="center" >
        <template slot-scope="scope" class="operate">
            <el-button type="primary" size="mini" @click="userReset(scope.$index,scope.row)">重置密码</el-button>
            <el-button v-if="scope.row.userrolecode != 1" type="danger" size="mini" @click="userDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <user-edit :edit="editData"  @add="addUser"  :visible="userEditVisible" @close="closeUserEdit"></user-edit>
    <reset-edit :edit="editData"  @reset="resetUser" :visible="resetEditVisible" @close="closeResetEdit"></reset-edit>
  </div>
  </div>
</template>

<script>
  import UserEdit from './user-edit.vue'
  import ResetEdit from './reset-edit.vue'
  import { confirm ,solve_res ,getParams,dateFormat} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name:'',
    components: {
      UserEdit,
      ResetEdit
    },
    data(){
      return {
        userEditVisible: false,
        resetEditVisible: false,
        editData:{},
        loading:false,
        user:[],
        userno:''
      }
    },
    created(){
      this.userno = localStorage.getItem('user');
      this.updateList();
    },
    methods:{
      userAdd(){
        //弹框
        console.log("userAdd");
        this.editData={
          userno:'',
          username:'',
          userdept:'',
          userpwd:'',
//          userrolecode:''
        }
        this.userEditVisible = true
      },
      userReset(index,row){
        console.log('userReset')
        this.editData = row;
        this.resetEditVisible = true
      },
      updateList(){
        this.loading = true;
        this.$http.get(api.getUserList).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.user = res.list || [];
          }
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败");
        })
      },
      userDel(index,row){
        console.log("del");
        var params={
          userid:row.userid,
        }
        confirm({title:"是否删除该用户？"},()=> {
          this.$http.delete(api.deleteUser+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success("删除失败")
          })
        })
      },
      addUser(data){
        var params = {
          userno : data.userno,
          username : data.username,
          userdept : data.userdept,
          userpwd : data.userpwd,
          userrolecode : data.userrolecode,
        }
        this.$http.post(api.addUser,params).then(res=>{
          if(solve_res(res,"添加成功","添加失败")){
            this.updateList();
            this.closeUserEdit();
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error("添加失败");
        })
      },
      resetUser(data){
        console.log(data,"333搜索");
        var params = {
          userid : data.userid,
          userpwd : data.userpwd,
        }
        this.$http.put(api.resetUser,params).then(res=>{
          if(solve_res(res,"修改成功","修改失败")){
            this.updateList();
            this.closeResetEdit();
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error("修改失败");
        })
      },
      closeUserEdit () {
        this.userEditVisible = false
      },
      closeResetEdit () {
        this.resetEditVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
