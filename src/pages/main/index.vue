<template>
  <div class="index">
    <el-tabs v-model="activeMainName"  @tab-click="handleTabClick">
      <el-tab-pane label="热门产品" name="production"></el-tab-pane>
      <el-tab-pane label="指数宝" name="index">
        <el-button class="add" type="primary" size="mini" @click="mainIndexAdd">新增</el-button>
        <el-table border :data="mainIndex" class="table" v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column label="序号"  prop="sortflag" width="70" align="center"></el-table-column>
          <el-table-column label="基金代码"  prop="fundcode" align="center"></el-table-column>
          <el-table-column label="基金名称"  prop="fundname" align="center"></el-table-column>
          <el-table-column label="数据名称"  prop="ratetype" align="center"></el-table-column>
          <el-table-column label="操作"   align="center">
            <template slot-scope="scope" class="operate">
              <el-button type="danger" size="mini" @click="mainIndexDel(scope.$index,scope.row)">删除</el-button>
              <el-button size="mini" @click="mainIndexMove(scope.$index,scope.row,'top')">置顶</el-button>
              <el-button size="mini" @click="mainIndexMove(scope.$index, scope.row,'up')">上移</el-button>
              <el-button size="mini" @click="mainIndexMove(scope.$index,scope.row,'down')">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基金精选" name="select">基金精选</el-tab-pane>
      <el-tab-pane label="人气之选" name="popular">人气之选</el-tab-pane>
      <el-tab-pane label="热门关注" name="hot">热门关注</el-tab-pane>

    </el-tabs>
    <fundAdd-edit :type="tabName" :edit="editData" :selectedFunds="mainIndex"  :visible="editVisible" @close="closeEdit" @add="addFund"></fundAdd-edit>
  </div>
</template>

<script>
  import fundAddEdit from './fundAdd-edit.vue';
  import { confirm ,solve_res ,getParams,changeNumToCN,changeCNToNum} from '@/tool/utils';
  import api from '@/api/restful-api';
  export default {
    name:'',
    components: {
      fundAddEdit
    },
    data(){
      return {
        editVisible: false,
        tabName:'index',
        loading:false,
        activeMainName: 'index',
        type:1, //1.首页  2.标签页
        module:2,//首页   1热门产品、2指数宝、3基金精选、4人气之王、5热门关注
                 //标签页：1优化量选、2优选指数、3优选定投、4优选货基、
        editData: {},
        mainIndex:[]
      }
    },
    created(){
      this.updateList();
    },
    methods:{
      handleTabClick(){
        if(this.tabName !== this.activeMainName ){
          this.$router.push({path:`/home/main/${this.activeMainName}`})
        }
      },
      mainIndexAdd(){
        console.log('mainIndexAdd');
        this.editData={
          fundname: "",
          fundcode: "",
          ratetype: "",
          updatetime:""
        }
        this.editVisible = true
      },
      updateList(){
        var params={
          page:1,
          rows:9999,
          type:this.type,
          module:this.module
//        fundtype:''
        }
        this.loading = true;
        this.$http.get(api.getPageFundList+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.mainIndex=res.results || [];
            for (var i = 0; i < this.mainIndex.length; i++) {
              this.mainIndex[i].ratetype = changeNumToCN(this.mainIndex[i].ratetype);
            }
          }
          this.loading = false;
        }).catch(err=>{
          this.$message.error("获取数据失败");
          this.loading = false;
        })
      },
      mainIndexMove(index,row,operate){
        var params = {
          sortflag1:row.sortflag,
          sortflag2:row.sortflag,
          type:this.type,
          module:this.module,
        }
        params.sortflag1 = Number(params.sortflag1);
        var end = Number(this.mainIndex[this.mainIndex.length-1].sortflag);
        if(operate == 'top'){
          if(params.sortflag1<=1){
            return ;
          }else{
            params.sortflag2 = 1;
          }
        }
        if(operate == 'up'){
          if(params.sortflag1<=1){
            return ;
          }else{
            params.sortflag2 = params.sortflag1 - 1;
          }
        }
        if(operate == 'down'){
          if(params.sortflag1>=end){
            return ;
          }else{
            params.sortflag2 = params.sortflag1 + 1;
          }
        }
        console.log("pro move:",row,params);
        this.$http.get(api.movePageFundList+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"移动数据成功","移动数据失败")){
            this.updateList();
          }
        }).catch(err=>{
          this.$message.error("移动失败");
        })
      },
      mainIndexDel(index,row){
        console.log('del');
        var params={
          type:this.type,
          module:this.module,
          fundcode:row.fundcode,
        }
        confirm({},()=> {
          this.$http.delete(api.deletePageFundList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success("删除失败")
          })
        })
      },
      addFund(data){
        var params = {
          ratetype:changeCNToNum(data.ratetype),
          fundcode:data.fundcode,
          type:this.type,
          module:this.module
        }
        this.$http.post(api.addPageFundList,params).then(res=>{
          if(solve_res(res,"添加成功","添加失败")){
            this.updateList();
            this.closeEdit()
          }
        }).catch(err=>{
          console.log("添加失败");
        })
      },
      closeEdit () {
        this.editVisible = false
      },
    }
  }
</script>

<style rel="stylesheet/scss" scoped>
  .index {
    text-align: left;
  }
</style>
