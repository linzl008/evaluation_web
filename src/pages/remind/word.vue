<template>
  <div class="word">
    <!--<el-button class="add" size="mini" @click="wordAdd">新增提示性文字</el-button>-->
    <el-table border :data="word" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号"  prop="proid" width="140" align="center"></el-table-column>
      <el-table-column label="文字所在位置"  prop="showlocation" align="center"></el-table-column>
      <el-table-column label="文案类型"  prop="lettertype" align="center"></el-table-column>
      <el-table-column label="现有文案"  prop="letter" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope" class="operate">
          <el-button type="primary" size="mini" @click="wordEdit(scope.$index,scope.row)">编辑</el-button>
          <!--<el-button type="danger" size="mini" @click="wordDel(scope.$index,scope.row)">删除</el-button>-->
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
    <word-edit :edit="editData" @update="updateWord" :visible="editVisible" @close="closeEdit"></word-edit>
  </div>
</template>

<script>
  import WordEdit from './word-edit.vue'
  import { confirm ,solve_res ,getParams,dateFormat} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    components: {
      WordEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        word:[],
        loading:false,
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
     /* wordAdd(){
        //弹框
        /!*var params={
          showlocation:'现金宝充值页面-风险提示',
          lettertype:"交易风险提示",
          letter:"1"
        }*!/
        /!*var params={
          showlocation:'选择提现方式-普通取现',
          lettertype:"补充说明",
          letter:"2"
        }*!/
        /!*var params={
          showlocation:'选择提现方式-快速取现',
          lettertype:"补充说明",
          letter:"3"
        }*!/
        this.$http.post(api.addRemind,params).then(res=>{
          if(solve_res(res,"增加成功","增加失败")){
            this.updateList()
          }
        }).catch(err=>{
          this.$message.error("获取数据失败");
        })
      },*/
      wordEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
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
        this.$http.get(api.getRemindList).then(res=>{
          if(solve_res(res,"","数据获取失败")){
            this.word = res.results || [];
            this.pageInfo.totalPage = res.total;
          }
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败");
        })
      },
      updateWord(data){
        console.log(data)
        var params={
          proid : data.proid,
          letter : data.letter
        }
        this.$http.put(api.updateRemind,params).then(res=>{
          if(solve_res(res,"修改成功","修改失败")){
            this.updateList();
            this.closeEdit();
          }
        }).catch(err=>{
          console.log(err);
          this.$message.error("修改失败");
        })
      },
      closeEdit () {
        this.editVisible = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .word {
    text-align:left;

  .add{
    padding-left: 15px;
    padding-right: 15px;
  }
  }

</style>
