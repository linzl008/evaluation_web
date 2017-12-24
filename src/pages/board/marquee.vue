<template>
  <div class="marquee">
    <el-button class="add" type="primary" size="mini" @click="marqueeAdd">发布新基金消息</el-button>
    <el-table border :data="marquee" class="table"  v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="跑马灯滚动消息序号"  prop="id" width="180" align="center"></el-table-column>
      <el-table-column label="基金名称"  prop="fundname" align="center"></el-table-column>
      <el-table-column label="发布时间"  prop="pushtime" align="center"></el-table-column>
      <el-table-column label="下架时间"  prop="endtime" align="center"></el-table-column>
      <el-table-column label="消息状态"  prop="msgstatus" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.msgstatus=='0'">已下架</div>
          <div v-if="scope.row.msgstatus=='1'">展示中</div>
          <div v-if="scope.row.msgstatus=='2'">等待展示</div>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope" class="operate">
          <el-button type="primary" size="mini" @click="marqueeEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="marqueeDel(scope.$index,scope.row)">删除</el-button>
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
    <marquee-edit :edit="editData" :visible="editVisible" @updateOrAdd="updateOrAdd" @close="closeEdit"></marquee-edit>
  </div>
</template>

<script>
import MarqueeEdit from './marquee-edit.vue'
import { confirm ,solve_res ,getParams} from '@/tool/utils';
import api from '@/api/restful-api'

export default {
  name:'',
  components: {
    MarqueeEdit
  },
  data(){
    return {
      funds: [],
      loading:false,
      notifytype:1,  //跑马灯
      timeout:  null,
      editVisible: false,
      editData:{},
      marquee:[],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        totalPage: 10,
        pageSizes: [10, 20, 50, 100],
      },
    }
  },
  created(){
    this.updateMarquee();
  },
  methods:{
    marqueeAdd(){
      //弹框
      this.editData={
        fundcode: "",
        fundname: "",
        fundid: "",
        pushtime: "",
        endtime: ""
      }
      this.editVisible = true
    },
    marqueeEdit(index,row){
      console.log("edit",row);
      this.editData = row;
      this.editVisible = true
    },
    marqueeDel(index,row){
      console.log("del",row);

      confirm({title:'确定删除该基金？',confirm_btn:'删除'},()=> {
        var params={
          id:row.id
        }
        this.$http.delete(api.deleteNewsMarFundList+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"删除成功","删除失败")){
            this.updateMarquee();
            this.closeEdit();
          }
        }).catch(err=>{
          this.$message.success('删除失败!')
        })
      })
    },
    updateOrAdd(data){
      console.log(data);
      var params = {
        fundcode : data.fundcode,
        pushtime :data.pushtime,
        endtime : data.endtime,
        notifytype :this.notifytype
      }
      if(data.startTimeType == '0'){
        params.pushtime = "";
      }
      if(data.endTimeType == '0'){
        params.endtime = "";
      }

      if(data.id){
        params.id = data.id;
        this.$http.put(api.updateNewsMarFundList,params).then(res=>{
            if(solve_res(res,"更新成功","更新失败")){
              this.updateMarquee();
              this.closeEdit();
            }
          }).catch(err=>{
            this.$message.error("更新失败");
          })
      }else{
        this.$http.post(api.addNewsMarFundList,params).then(res=>{
          if(solve_res(res,"添加成功","添加失败")){
            this.updateMarquee();
            this.closeEdit();
          }
        }).catch(err=>{
          this.$message.error("添加失败");
        })
      }
    },
    handleSizeChange(val){
      this.pageInfo.pageSize = val;
        console.log("handleSizeChange", val, this.pageInfo);
      //更新跑马灯数据
      this.updateMarquee();
    },
    handleCurrentChange(val){
      this.pageInfo.pageNum = val;
        console.log("handleCurrentChange", val, this.pageInfo);
      //更新跑马灯数据
      this.updateMarquee();
    },
    updateMarquee(){
      console.log("updateMarquee");
      var params={
        page:this.pageInfo.pageNum,
        rows:this.pageInfo.pageSize,
        notifytype:this.notifytype,
      }
      this.loading = true;
      this.$http.get(api.getNewsMarFundList+`?${getParams(params)}`).then(res=>{
        console.log(res);
        if(solve_res(res,"","查询失败")){
          this.marquee = res.results;
          this.pageInfo.totalPage = res.total;
        }
        this.loading = false;
      }).catch(err=>{
        this.$message.error("获取数据失败，请刷新重试！")
        this.loading = false;
      })
    },
    closeEdit () {
      this.editVisible = false
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .marquee {
    text-align:left;

    .add{
      padding-left: 15px;
      padding-right: 15px;
    }

  }

</style>
