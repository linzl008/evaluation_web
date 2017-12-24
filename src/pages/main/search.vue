<template>
  <div class="search">
    <h3>热门搜索配置</h3>
    <div class="line"></div>
    <el-button class="add" type="primary" size="mini" @click="searchAdd">新增</el-button>
    <el-table border :data="search" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号"  prop="sid" width="100" align="center"></el-table-column>
      <el-table-column label="搜索类型"  prop="searchType" align="center">
        <template slot-scope="scope">
          {{scope.row.searchType == '1'?"基金":""}}
          {{scope.row.searchType == '2'?"咨询公告":""}}
        </template>
      </el-table-column>
      <el-table-column label="搜索词条名称" align="center">
        <template slot-scope="scope">
          {{scope.row.searchType == '1'? scope.row.fundname:""}}
          {{scope.row.searchType == '2'? scope.row.searchName:""}}
        </template>
      </el-table-column>
      <el-table-column label="跳转链接"  prop="link" align="center">
        <template slot-scope="scope">
          {{scope.row.searchType == '1'? "跳转基金详情页":""}}
          {{scope.row.searchType == '2'? scope.row.link:""}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope" class="operate">
          <!--<el-button type="info" size="small" @click="searchEdit(scope.$index,scope.row)">编辑</el-button>-->
          <el-button type="danger" size="mini" @click="searchDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <search-edit :edit="editData" :visible="editVisible" @add="addSearch" @close="closeEdit"></search-edit>
  </div>
</template>

<script>
  import SearchEdit from './search-edit.vue'
  import { confirm ,solve_res ,getParams,dateFormat} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    components: {
      SearchEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        loading:false,
        search:[],
      }
    },
    created(){
      this.updateList();
    },
    methods:{
      searchAdd(){
        //弹框
        console.log("searchAdd");
        this.editData={
          fundcode:'',
          fundname:'',
          link:'',
          searchName:'',
          searchType:'1',
        }
        this.editVisible = true
      },
      searchEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
      },
      updateList(){
        this.loading = true;
        this.$http.get(api.getSearchList).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.search = res.results || [];
          }
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败");
        })
      },
      searchDel(index,row){
        console.log("del");
        var params={
          sid:row.sid,
        }
        confirm({},()=> {
          this.$http.delete(api.deleteSearch+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success("删除失败")
          })
        })
      },
      addSearch(data){
        console.log(data,"333");
        //基金类型
        var params = {};
        if(data.searchType == 1){
           params = {
            fundcode :data.fundcode,
            fundname :data.fundname,
            link :"",
            searchName :"",
            searchType :data.searchType,
          }
        }
        //资讯公告
        if(data.searchType == 2){
           params = {
            fundcode :"",
            fundname :"",
            link :data.link,
            searchName :data.searchName,
            searchType :data.searchType,
          }
        }

        if(data.sid){//更新
          this.$http.put(api.updateSearch,params).then(res=>{
            if(solve_res(res,"更新成功","更新失败")){
              this.updateList();
              this.closeEdit();
            }
          }).catch(err=>{
            console.log(err);
            this.$message.error("更新失败");
          })
        }else{//添加
          this.$http.post(api.addSearch,params).then(res=>{
            if(solve_res(res,"添加成功","添加失败")){
              this.updateList();
              this.closeEdit();
            }
          }).catch(err=>{
            console.log(err);
            this.$message.error("添加失败");
          })
        }
      },
      closeEdit () {
        this.editVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search {
    text-align:left;

    .add{
      padding-left: 15px;
      padding-right: 15px;
    }
  }

</style>
