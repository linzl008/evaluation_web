<template>
  <div class="config">
    <el-col :xs="12" :sm="8" :md="8" :lg="6">
      <el-input
              size="small"
              placeholder="请输入搜索基金代码或名称"
              icon="search"
              v-model="keyword"
              @change="handleSearch"
              :on-icon-click="handleSearch">
        <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
      </el-input>
    </el-col>
    <el-table border :data="config" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="基金代码"  prop="fundcode" width="140" align="center"></el-table-column>
      <el-table-column label="基金名称"  prop="fundname" align="center"></el-table-column>
      <el-table-column label="基金类型"  prop="fundtype" align="center">
        <template slot-scope="scope">
          {{scope.row.fundtype == '2' ?"货币型":""}}
          {{scope.row.fundtype == '3' ?"ETF型":""}}
          {{scope.row.fundtype == '0' ?"股票型":""}}
          {{scope.row.fundtype == '4' ?"保本型":""}}
          {{scope.row.fundtype == '1' ?"债券型":""}}
          {{scope.row.fundtype == 'A' ?"混合型":""}}
          {{scope.row.fundtype == '5' ?"QDII型":""}}
        </template>
      </el-table-column>
      <el-table-column label="最低费率/折扣费率" align="center">
        <template slot-scope="scope">
          {{scope.row.orifareratio ? scope.row.orifareratio+'%' : '--' }} / {{scope.row.discountrate ?scope.row.discountrate+'%' : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="推荐语"  prop="recommend" align="center">
        <template slot-scope="scope">
          {{scope.row.recommend ? scope.row.recommend+'%' : '--' }}
        </template>
      </el-table-column>
      <el-table-column label="操作"  prop="title" align="center">
        <template slot-scope="scope" class="operate">
          <el-button type="primary" size="mini" @click="configEdit(scope.$index,scope.row)">配置详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: right">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageNum"
              :page-sizes="pageInfo.pageSizes"
              :page-size="pageInfo.pageSize"
              :total="pageInfo.totalPage"
              layout="total, sizes,jumper ,prev, pager, next ">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    watch:{
      keyword(newVal){
        this.handleSearch();
      },
    },
    data(){
      return {
        keyword:'',
        funds: [],
        loading:false,
        config:[],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 10,
          pageSizes: [10, 20, 50, 100],
        },
      }
    },
    created(){
      this.updateList();
    },
    methods:{
      configEdit(index,row){
        console.log("edit");
        //利用点击的row里面的id，进行跳转

        this.$router.push({path:'/home/fund/config-edit',query:{fundcode:row.fundcode}});
      },
      handleSizeChange(val){
        this.pageInfo.pageSize = val;
        this.updateConfig();
      },
      handleCurrentChange(val){
        this.pageInfo.pageNum = val;
        this.updateConfig();
      },
      updateList(){
        //获取所有基金数据
        var params={
          page:1,
          rows:9999,
          type:"",
          module:"",
          msg:""
        }
        this.loading = true;
        this.$http.get(api.getFundList+`?${getParams(params)}`).then(res=>{
            console.log(res);
          if(solve_res(res,"","获取基金列表数据失败")){
            this.funds = res.results;
            this.pageInfo.totalPage = res.total;
            this.updateConfig();
          }
          this.loading = false;
        }).catch(err=>{
          console.log(err);
          this.loading = false;
          this.$message.error("获取基金列表数据失败！");
        })
      },
      updateConfig(){
        //更新搜索信息
        //获取搜索的数据，利用pageInfo ，进行数组的截取
        var result = this.querySearchAsync(this.keyword);
        console.log(result);
        var pn = this.pageInfo.pageNum;
        var ps = this.pageInfo.pageSize;
        var start = (pn -1) * ps ;
        var end = start + ps;
        this.config = result.slice(start,end);
        this.pageInfo.totalPage = result.length;
        console.log(this.config,this.pageInfo,result);
      },
      querySearchAsync(queryString) {
        var funds = this.funds;
        return queryString ? funds.filter(this.createStateFilter(queryString)) : funds;
      },
      createStateFilter(queryString) {
        return (state) => {
          if (!isNaN(queryString)){
            var fundcode = state.fundcode+""
            return (fundcode.indexOf(queryString.toLowerCase()) >= 0);
          }
          else{
            var fundname = state.fundname.toLowerCase();
            return (fundname.indexOf(queryString.toLowerCase()) >= 0);
          }
        };
      },
      handleSearch(){
        console.log("click");
        this.pageInfo.pageNum = 1;
        this.updateConfig();
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .config {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
