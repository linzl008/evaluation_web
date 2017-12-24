<template>
  <div class="version">
    <el-button class="add" type="primary" size="mini" @click="versionAdd">发布新版本</el-button>
    <el-table border :data="version" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="版本号"  prop="versionno" width="70" align="center"></el-table-column>
      <el-table-column label="更新时间"  prop="updatetime" align="center"></el-table-column>
      <el-table-column label="更新人员"  prop="updateperson" width="120" align="center"></el-table-column>
      <el-table-column label="提示标题"  prop="prompttitle" align="center"></el-table-column>
      <el-table-column label="更新提示内容" prop="promptcontent" align="center" width="180"></el-table-column>
      <el-table-column label="下载链接" prop="link" align="center" width="180"></el-table-column>
      <el-table-column label="渠道" prop="channel" align="center" width="120">
        <template slot-scope="scope">
          {{scope.row.channel == '1'?"安卓":""}}
          {{scope.row.channel == '2'?"IOS":""}}
        </template>
      </el-table-column>
      <el-table-column label="是否强制" prop="isconstraint" align="center" width="120">
        <template slot-scope="scope">
          {{scope.row.isconstraint == '1'?"强制更新":""}}
          {{scope.row.isconstraint == '2'?"可选更新":""}}
          {{scope.row.isconstraint == '3'?"不推送更新":""}}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" width="120">
        <template slot-scope="scope">
          {{scope.row.status == '1'?"未发布":""}}
          {{scope.row.status == '2'?"已发布":""}}
        </template></el-table-column>
      </el-table-column>
      <el-table-column label="操作"align="center" width="120">
        <template slot-scope="scope" class="operate">
          <!--<el-button type="info" size="small" @click="versionEdit(scope.$index,scope.row)">编辑</el-button>-->
          <el-button type="danger" size="mini" @click="versionDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <version-edit :edit="editData" :visible="editVisible" @add="addVersion" @close="closeEdit"></version-edit>
  </div>
</template>

<script>
  import VersionEdit from './version-edit.vue'
  import { confirm ,solve_res ,getParams,dateFormat} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    components: {
      VersionEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        loading:false,
        version:[],
      }
    },
    created(){
      this.updateList();
    },
    methods:{
      versionAdd(){
        //弹框
        console.log("versionAdd");
        this.editData={
          versionno :'',
          updatetime :'',
          updateperson :'',
          prompttitle :'',
          promptcontent :'',
          link :'',
          channel:'1',
          isconstraint:'2',
          status:'2'
        }
        this.editVisible = true
      },
      versionEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
      },
      updateList(){
        this.loading = true;
        this.$http.get(api.getVersionList).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.version = res.list || [];
          }
        this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败");
        })
      },
      versionDel(index,row){
        console.log("del");
        var params={
          versionid:row.versionid,
        }
        confirm({},()=> {
          this.$http.delete(api.deleteVersion+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success("删除失败")
          })
        })
      },
      addVersion(data){
        console.log(data,"333");
        var updateperson = localStorage.getItem('user');
        var updatetime = dateFormat(new Date(),"YYYY-MM-dd HH:mm:ss");
        var params = {
          versionno :data.versionno,
          updatetime :updatetime,
          updateperson :updateperson,
          prompttitle :data.prompttitle,
          promptcontent :data.promptcontent,
          link :data.link,
          channel :data.channel,
          isconstraint :data.isconstraint,
          status :data.status,
        }
        this.$http.post(api.addVersion,params).then(res=>{
          if(solve_res(res,"添加成功","添加失败")){
            this.updateList();
            this.closeEdit();
          }
        }).catch(err=>{
          console.log(err);
          this.$message.error("添加失败");
        })
      },
      closeEdit () {
        this.editVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .version {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
