<template>
  <div class="channel">
    <el-button class="add" type="primary" size="mini" @click="channelAdd">新增银行卡</el-button>
    <el-table border :data="channel" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号"  prop="traid" width="140" align="center"></el-table-column>
      <el-table-column label="银行名称"  prop="bankname" align="center"></el-table-column>
      <el-table-column label="单笔交易限额"  prop="singletradinglimit" align="center"></el-table-column>
      <el-table-column label="单日交易限额"  prop="onedaytradinglimit" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope" class="operate">
          <el-button type="primary" size="mini" @click="channelEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="channelDel(scope.$index,scope.row)">删除</el-button>
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
    <channel-edit :edit="editData" @updateOrAdd="updateOrAdd" :visible="editVisible" @close="closeEdit"></channel-edit>
  </div>
</template>

<script>
  import ChannelEdit from './channel-edit.vue'
  import { confirm ,solve_res ,getParams,dateFormat} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    components: {
      ChannelEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        loading:false,
        channel:[],
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
      channelAdd(){
        this.editData={
          bankname:'',
          singletradinglimit:'',
          onedaytradinglimit:''
        }
        this.editVisible=true;
      },
      channelEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
      },
      channelDel(index,row){
        console.log('del');
        var params={
          traid:row.traid,
        }
        confirm({},()=> {
          this.$http.delete(api.deleteChannel+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success("删除失败")
          })
        })
      },
      handleSizeChange(val){
        this.pageInfo.pageSize = val;
        this.updateList();
      },
      handleCurrentChange(val){
        this.pageInfo.pageNum = val;
        this.updateList();
      },
      updateList(){
        console.log("updateList");
        var params = {
          page : this.pageInfo.pageNum,
          rows : this.pageInfo.pageSize
        }
        this.loading = true;
        this.$http.get(api.getChannelList).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.channel = res.results || [];
            this.pageInfo.totalPage = res.total;
          }
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败");
        })
      },
      updateOrAdd(data){
        console.log(data)
        var params={
          bankname :data.bankname,
          singletradinglimit :data.singletradinglimit,
          onedaytradinglimit :data.onedaytradinglimit,
        }
        if(data.traid){
          params.traid = data.traid;
          this.$http.put(api.updateChannel,params).then(res=>{
            if(solve_res(res,"修改成功","修改失败")){
              this.updateList();
              this.closeEdit();
            }
          }).catch(err=>{
            console.log(err);
            this.$message.error("修改失败");
          })
        }else{
          this.$http.post(api.addChannel,params).then(res=>{
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
  .channel {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
