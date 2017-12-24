<template>
  <div class="manager">
    <el-button class="add" size="small" type="primary" @click="managerAdd">新增基金经理</el-button>
    <el-table border :data="manager" class="table" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="头像"  prop="manurl" width="180" align="center">
        <template slot-scope="scope">
          <img :src="debugHead+scope.row.manurl"/>
        </template>
      </el-table-column>
      <el-table-column label="姓名"  prop="manname" align="center" width="150"></el-table-column>
      <el-table-column label="基本介绍"  prop="manintroduction" align="center"></el-table-column>
      <el-table-column label="获奖记录"  prop="winrecord" align="center">
        <template slot-scope="scope">
          <div v-for="record in scope.row.winrecord" style="text-align: left">
            <p><strong>基金：</strong>{{record.fundname}}</p>
            <p><strong>时间：</strong>{{record.time}}</p>
            <p><strong>奖项：</strong>{{record.awardname}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center" width="180">
        <template slot-scope="scope" class="operate">
          <el-button type="primary" size="mini" @click="managerEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="managerDel(scope.$index,scope.row)">删除</el-button>
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
    <manager-edit :edit="editData" :visible="editVisible"  @upadteOrAdd="upadteOrAdd" @close="closeEdit"></manager-edit>
  </div>
</template>

<script>
  import ManagerEdit from './manager-edit.vue';
  import { DebugHead } from '@/config/base_config';
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name:'',
    components: {
      ManagerEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        loading:false,
        allManagers:[],
        debugHead:'',
        manager:[],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 10,
          pageSizes: [10, 20, 50, 100],
        },
      }
    },
    created(){
      this.debugHead = DebugHead;
      this.updateList();
    },
    methods:{
      updateList(){
        //获取所有基金经理数据
        var params={
          page :1,
          rows:9999,
        }
        this.loading = true;
        this.$http.get(api.getManagerList+`?${getParams(params)}`).then(res=>{
          console.log(res);
          var re = solve_res(res,"","获取基金信息列表失败");
          if(re){
            this.allManagers = res.rows;
            //解析基金经理的获奖记录
//            for (var i = 0; i < this.allManagers.length; i++) {
//              if(this.allManagers[i].winrecord)
//                this.allManagers[i].winrecord = JSON.parse(this.allManagers[i].winrecord+"");
//            }
            this.updateManager();
          }
          this.loading = false;
        }).catch(err=>{
          this.loading = false;
          this.$message.error("获取数据失败，请刷新重试！")
        })
      },
      managerAdd(){
        //弹框
        console.log("managerAdd");
        this.editData={
          manname:'',
          manintroduction:'',
          winrecord:[]
        }
        this.editVisible = true
      },
      managerEdit(index,row){
        console.log("edit");
        this.editData = row;
        this.editVisible = true
      },
      managerDel(index,row){
        console.log("del");
        var params = {
          manid :row.manid
        }
        confirm({title:'确定删除该基金经理？',confirm_btn:'删除'},()=> {
          this.$http.delete(api.deleteManager+`?${getParams(params)}`).then(res=>{
            if(solve_res(res,"删除成功","删除失败")){
              this.updateList();
            }
          }).catch(err=>{
            this.$message.success('删除失败!');
          })
        })
      },
      handleSizeChange(val){
        this.pageInfo.pageSize = val;
        this.updateManager();
      },
      handleCurrentChange(val){
        this.pageInfo.pageNum = val;
        this.updateManager();
      },
      updateManager(){
        console.log("updateManager");
        var result = [].concat(this.allManagers)
        var pn = this.pageInfo.pageNum;
        var ps = this.pageInfo.pageSize;
        var start = (pn -1) * ps ;
        var end = start + ps;
        this.manager = result.slice(start,end);
        this.pageInfo.totalPage = result.length;
        console.log(this.manager,this.pageInfo,result);
      },
      upadteOrAdd(data){
        console.log(data);
        var formData =new FormData();
        formData.append('manname', data.data.manname);
        formData.append('manintroduction',data.data.manintroduction);
        formData.append('winrecord',JSON.stringify(data.data.winrecord));
        console.log(JSON.stringify(data.data.winrecord),typeof JSON.stringify(data.data.winrecord))
        if(!data.data.manid ){//执行增加操作
          formData.append('uploadfile', data.uploadfile);
          this.$http.post(api.addManager , formData).then(res=>{
            var re = solve_res(res,"增加成功","增加失败");
            if(re){
              this.updateList()
              this.closeEdit();
            }
          }).catch(err=>{
            this.$message.error("添加失败");
          })
        }else{//执行更新操作
          if(data.uploadfile.uid){ //如果选择了文件，就上传否则不上传
            formData.append('uploadfile', data.uploadfile);
          }
          formData.append('manid', data.data.manid);
          this.$http.post(api.updateManager , formData).then(res=>{
            var re = solve_res(res,"更新成功","更新失败");
            if(re){
              this.updateList()
              this.closeEdit();
            }
          }).catch(err=>{
            this.$message.error("更新失败");
          })
        }
      },
      closeEdit () {
        this.editVisible = false
      },
    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .manager {
    text-align:left;
    img {
      max-height: 100px;
      max-width: 100px;
    }
  }

</style>
