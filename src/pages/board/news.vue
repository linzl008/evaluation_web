<template>
  <div class="news">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="首页显示" name="home">
        <el-button class="add" type="primary" size="mini" @click="newsHomeAdd">发布新的资讯公告</el-button>
        <div class="noline"></div>
        <el-table border :data="newsHome" class="table" v-loading="loading1" element-loading-text="拼命加载中">
          <el-table-column label="滚动消息序号"  prop="id" width="140" align="center"></el-table-column>
          <el-table-column label="资讯公告标题"  prop="title" align="center"></el-table-column>
          <el-table-column label="跳转链接"  prop="link" align="center"></el-table-column>
          <el-table-column label="发布时间"  prop="pushtime" align="center"></el-table-column>
          <el-table-column label="下架时间"  prop="endtime" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center" width="120" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.infotype" size="mini" @change="(val)=>handleInfoChange(val,scope.row)"  placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作"  prop="title" align="center">
            <template slot-scope="scope" class="operate">
              <el-button type="primary" size="mini" @click="newsHomeEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="newsDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: right">
          <el-pagination
                  @size-change="handleSizeChangeH"
                  @current-change="handleCurrentChangeH"
                  :current-page="pageInfoH.pageNum"
                  :page-sizes="pageInfoH.pageSizes"
                  :page-size="pageInfoH.pageSize"
                  :total="pageInfoH.totalPage"
                  layout="total, sizes,jumper ,prev, pager, next ">
          </el-pagination>
        </div>
        <newsHome-edit :edit="editHomeData" :visible="editHomeVisible" @updateOrAdd="updateOrAdd" @close="closeHomeEdit"></newsHome-edit>
      </el-tab-pane>
      <el-tab-pane label="列表显示" name="list">
        <el-radio-group v-model="tabListType" size="mini" >
          <el-radio-button label="基金公告"></el-radio-button>
          <el-radio-button label="资讯热点"></el-radio-button>
          <el-radio-button label="法律文件"></el-radio-button>
        </el-radio-group>
        <div class="noline"></div>
        <div>
          <el-button class="add" type="primary" size="mini" @click="newsAdd" >发布新的资讯公告</el-button>
        </div>
        <el-table border :data="newsTab" class="table" v-loading="loading2" element-loading-text="拼命加载中">
          <el-table-column label="标题"  prop="title" align="center"></el-table-column>
          <el-table-column label="跳转链接"  prop="link" align="center"></el-table-column>
          <el-table-column label="发布时间"  prop="pushtime" align="center"></el-table-column>
          <el-table-column label="下架时间"  prop="endtime" align="center"></el-table-column>
          <el-table-column label="消息状态" prop="msgstatus" align="center" width="180">
            <template slot-scope="scope">
              {{scope.row.msgstatus == '0'?"已下架":""}}
              {{scope.row.msgstatus == '1'?"展示中":""}}
              {{scope.row.msgstatus == '2'?"等待展示":""}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  prop="title" align="center" >
            <template slot-scope="scope" class="operate">
              <el-button type="primary" size="mini" @click="newsEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="newsDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: right">
          <el-pagination
                  @size-change="handleSizeChangeT"
                  @current-change="handleCurrentChangeT"
                  :current-page="pageInfoT.pageNum"
                  :page-sizes="pageInfoT.pageSizes"
                  :page-size="pageInfoT.pageSize"
                  :total="pageInfoT.totalPage"
                  layout="total, sizes,jumper ,prev, pager, next ">
          </el-pagination>
        </div>
        <news-edit :edit="editData" :visible="editVisible" @updateOrAdd="updateOrAdd" @close="closeEdit"></news-edit>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
  import NewsEdit from './news-edit.vue';
  import NewsHomeEdit from './newsHome-edit.vue';
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name:'',
    components: {
      NewsEdit,NewsHomeEdit
    },
    watch :{
      //监听列表的tab的变化,
      tabListType(newVal){
        if(newVal == '基金公告'){
          this.infotype = 1;
        }
        if(newVal == '资讯热点'){
          this.infotype = 2;
        }
        if(newVal == '法律文件'){
          this.infotype = 3;
        }
        this.pageInfoT ={
          pageNum: 1,
          pageSize: 10,
          totalPage: 10,
          pageSizes: [10, 20, 50, 100],
        }
        this.updatenews();
      },
      activeName(newVal){
        console.log("tab",newVal);
        if(newVal == 'home'){
          this.notifytype = 2;
        }
        if(newVal == 'list'){
          this.notifytype = 3;
        }
        this.updatenews();
      },
    },
    data(){
      return {
        activeName:'home',
        editHomeVisible: false,
        editVisible: false,
        editHomeData:{},
        editData:{},
        notifytype : 2,
        infotype : 1,
        loading1:false,
        loading2:false,
        tabListType:"基金公告",
        options:[
          { value: '1', label: '基金公告'},
          { value: '2', label: '资讯热点'},
          { value: '3', label: '法律文件'},
        ],
        newsHome:[],
        newsTab:[],
        pageInfoH: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 10,
          pageSizes: [10, 20, 50, 100],
        },
        pageInfoT: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 10,
          pageSizes: [10, 20, 50, 100],
        },
      }
    },
    mounted(){
      this.updatenews()
    },
    methods:{
      newsHomeAdd(){
        //弹框
        console.log("enter")
        this.editHomeData={
          title:'',
          link:'',
          pushtime:'',
          endtime:'',
        }
        this.editHomeVisible = true
      },
      newsHomeEdit(index,row){
        console.log("edit");
        this.editHomeData = row;
        this.editHomeVisible = true
      },
      newsAdd(){
        //弹框
        this.editData={
          title:'',
          pushtime:'',
          endtime:'',
          link:'',
          fundcode:'',
          fundname:'',
        }
        this.editVisible = true
      },
      newsEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
      },
      newsDel(index,row){
        console.log("del");
        var params = {
          id :row.id
        }
        confirm({},()=> {
          this.$http.delete(api.deleteNewsMarFundList+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updatenews();
            }
          })
        })
      },
      handleSizeChangeH(val){
        this.pageInfoH.pageSize = val;
        this.updatenews();
      },
      handleCurrentChangeH(val){
        this.pageInfoH.pageNum = val;
        this.updatenews();
      },
      handleSizeChangeT(val){
        this.pageInfoT.pageSize = val;
        this.updatenews();
      },
      handleCurrentChangeT(val){
        this.pageInfoT.pageNum = val;
        this.updatenews();
      },
      updatenews(){
        console.log("updatenews");
        var params ={
          notifytype : this.notifytype,
          page: 1,
          rows:10
        }

        if(this.notifytype == 2){
          params.page = this.pageInfoH.pageNum;
          params.rows = this.pageInfoH.pageSize
          this.loading1 =true;
        }
        if(this.notifytype == 3){
          params.infotype = this.infotype;
          params.page = this.pageInfoT.pageNum;
          params.rows = this.pageInfoT.pageSize
          this.loading2 =true;
        }
        this.$http.get(api.getNewsMarFundList+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            if(this.notifytype == '2' ){
              this.newsHome = res.results
              this.pageInfoH.totalPage = res.total;
            }
            if(this.notifytype == '3' ){
              this.newsTab = res.results
              this.pageInfoT.totalPage = res.total;
            }
            this.loading1 = false;
            this.loading2 = false;
          }
        })
      },
      handleInfoChange(newVal,row){
        console.log(newVal,row);
        this.updateOrAdd(row)
      },
      updateOrAdd(data){
        console.log("enter",data);
        var params = {};
        //首页和列表， 时间是相同的
        if(data.startTimeType == '0'){
          params.pushtime ="";
        }else{
          params.pushtime =data.pushtime;
        }
        if(data.endTimeType == '0'){
          params.endtime ="";
        }else{
          params.endtime = data.endtime;
        }

        if(this.notifytype == 2){//首页资讯
          params.title = data.title;
          params.link = data.link;
          params.notifytype = this.notifytype;

          if(data.id){ //更新数据
            params.id = data.id;
            if(data.infotype){
              params.infotype = data.infotype;
            }
            console.log(params)
            this.$http.put(api.updateNewsMarFundList,params).then(res=>{
              if(solve_res(res,"更新成功","更新失败")){
                this.updatenews();
                this.closeHomeEdit();
              }
            })
          }else{
            params.infotype = '1'
            this.$http.post(api.addNewsMarFundList,params).then(res=>{
              if(solve_res(res,"添加成功","添加失败")){
                this.updatenews();
                this.closeHomeEdit();
              }
            })
          }
        }
        if(this.notifytype == 3){//列表资讯
          params.title = data.title;
          params.link = data.link;
          params.fundcode = data.fundcode;
          params.notifytype = this.notifytype;

          if(data.id){ //更新数据
            params.id = data.id;
            params.infotype = data.infotype;
            console.log(params)
            this.$http.put(api.updateNewsMarFundList,params).then(res=>{
              if(solve_res(res,"更新成功","更新失败")){
                this.updatenews();
                this.closeEdit();
              }
            })
          }else{
            params.infotype = this.infotype;
            this.$http.post(api.addNewsMarFundList,params).then(res=>{
              if(solve_res(res,"添加成功","添加失败")){
                this.updatenews();
                this.closeEdit();
              }
            })
          }
        };
      },
      closeEdit () {
        this.editVisible = false
      },
      closeHomeEdit () {
        this.editHomeVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .news {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
