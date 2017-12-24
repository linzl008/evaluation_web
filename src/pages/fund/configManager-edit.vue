<template>
  <el-dialog class="configManager-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="基金经理编辑">
    <el-input
            placeholder="搜索基金经理"
            v-model="keyword"
            size="small"
            @change="handleSearch">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
    </el-input>
    <div class="noline"></div>
    <el-table
            :data="results"
            height="350"
            style="width: 100%">
      <el-table-column prop="manurl" label="头像" >
        <template slot-scope="scope">
          <img :src="debugHead+scope.row.manurl">
        </template>
      </el-table-column>
      <el-table-column prop="manname" label="名称"></el-table-column>
      <el-table-column prop="" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.selected" @click="handleSelect(scope.row,scope.$index)">添加
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  import { DebugHead } from '@/config/base_config';
  export default {
    name: '',
    props: {
      visible: Boolean,
      edit: Object,
      selectedManagers:Array,
    },
    watch:{
      keyword(newVal){
        this.handleSearch();
      },
      edit (newVal) {
        console.log("newVal:", newVal)
        this.form = Object.assign({}, newVal);
        if(this.form.manid){
          this.form.oldmanid=this.form.manid;
        }
        this.checkManagerList();
        this.handleSearch(this.keyword);
      }
    },
    data(){
      return {
        keyword:'',
        debugHead:'',
        managers: [],
        form:{},
        results:[],
      }
    },
    mounted(){
      this.debugHead = DebugHead;
      this.updateManagers();
    },
    methods: {
      updateManagers(){
        var params={
          page:1,
          rows:9999
        }
        this.$http.get(api.getManagerList+`?${getParams(params)}`).then(res=>{
          console.log('---',res);
          this.managers = res.rows||[];
          this.checkManagerList();
        }).catch(err=>{
          console.log(err);
          this.$message.error("获取基金经理数据失败！");
        })
      },
      checkManagerList(){
        console.log(this.managers)
        //选出已经选择的基金
        for (var i = 0; i < this.managers.length; i++) {
          this.managers[i].selected = false;
        }
        for (var j = 0; j < this.selectedManagers.length; j++) {
          for (var i = 0; i < this.managers.length; i++) {
            if(this.managers[i].manid == this.selectedManagers[j].manid){
              this.managers[i].selected = true;
              this.managers[i] = Object.assign({},this.managers[i]);
            }
          }
        }
      },
      handleSearch(){
        this.results = this.querySearchAsync(this.keyword);
      },
      querySearchAsync(queryString, cb) {
        var managers = this.managers;
        return queryString ? managers.filter(this.createStateFilter(queryString)) : managers;
      },
      createStateFilter(queryString) {
        return (state) => {
            return (state.manname.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item,index) {
        console.log(item);
        this.keyword = item.value;
        if (item.value == "") {
          this.form.manid = "";
        } else {
          this.form.manid = item.manid;
        }
        console.log("f", this.form);
        this.submit();
      },
      submit(){
        //添加基金操作 根据ID的有无，进行 put | post操作
        confirm({title:'确定编辑该基金经理？',confirm_btn:'确定'},()=> {
          console.log("submit", this.edit, this.form);
          this.$emit('updateOrAdd',this.form);
        })
      },
      handleClose () {
        console.log("handleClose");
        this.form = Object.assign({}, this.edit);//深拷贝，防止对象引用
        this.keyword = '';
        this.$emit('close');
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .configManager-edit{
    img{
      max-height: 40px;
      max-width: 40px;
    }
  }
</style>