<template>
  <el-dialog class="fundAdd-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="基金添加">
      <el-input
              placeholder="搜索基金"
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
        <el-table-column prop="fundcode" label="基金代码" width="100"></el-table-column>
        <el-table-column prop="fundname" label="基金名称"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间"></el-table-column>
        <el-table-column prop="ratetype" label="展示数据" width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ratetype"  placeholder="请选择" size="mini">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <!--<el-button size="mini" @click="handleSelect(scope.row,scope.$index)">添加-->
            <el-button size="mini" :disabled="scope.row.selected" @click="handleSelect(scope.row,scope.$index)">添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button @click="handleClose">取 消</el-button>-->
      <!--<el-button type="primary" @click="submit">添 加</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name: '',
    props: {
      visible: Boolean,
      type:String,
      edit: Object,
      selectedFunds:Array,
    },
    watch:{
      keyword(newVal){
        this.handleSearch();
      },
      edit (newVal) {
        console.log("newVal", newVal)
        this.form = Object.assign({}, newVal);
        this.keyword = this.form.fundname  || this.form.fundcode;
        this.checkFundList();
        this.handleSearch(this.keyword);
//        return newVal
      }
    },
    data(){
      return {
        keyword:'',
        funds: [],
        timeout:  null,
        form:{},
        results:[],
        options:[
          {value:'单位净值'},
          {value:'累计净值'},
          {value:'万份收益'},
          {value:'七日年化'},
          {value:'最近一日'},
          {value:'最近一周'},
          {value:'最近一月'},
          {value:'最近三月'},
          {value:'最近六月'},
          {value:'最近一年'},
          {value:'今年以来'},
          {value:'成立以来'},
        ],
      }
    },
    mounted(){
      this.updateFunds();

    },
    methods: {
      updateFunds(){
        var params={
          page:1,
          rows:9999,
          type:"",
          module:"",
          msg:""
        }
        this.$http.get(api.getPageFunds+`?${getParams(params)}`).then(res=>{
          console.log(res);
          this.funds = res.results;
          this.checkFundList();
        }).catch(err=>{
          console.log(err);
          this.$message.error("获取基金列表数据失败！");
        })
      },
      checkFundList(){
        for (var i = 0; i < this.funds.length; i++) {
          this.funds[i].selected = false;
        }
        for (var j = 0; j < this.selectedFunds.length; j++) {
          for (var i = 0; i < this.funds.length; i++) {
            if(this.funds[i].fundcode == this.selectedFunds[j].fundcode){
              this.funds[i].selected = true;
              this.funds[i] = Object.assign({},this.funds[i]);
            }
          }
        }
      },
      handleSearch(){
        this.results = this.querySearchAsync(this.keyword);
      },
      querySearchAsync(queryString) {
        var funds = this.funds;
        var results = queryString ? funds.filter(this.createStateFilter(queryString)) : funds;
        for (var i = 0; i < funds.length; i++) {
          funds[i].value = funds[i].fundname;
        }
        return results;
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
      handleSelect(item,index) {
        console.log(item);
        this.keyword = item.value;
        if (item.value == "") {
          this.form.fundid = "";
          this.form.fundcode = "";
          this.form.fundname = "";
          this.form.updatetime = "";
          this.form.ratetype = "";
        } else {
          this.form.fundid = item.fundid;
          this.form.fundcode = item.fundcode;
          this.form.fundname = item.fundname;
          this.form.updatetime = item.updatetime;
          this.form.ratetype = item.ratetype;
        }
        console.log("f", this.form);
        this.submit();
      },
      submit(){
        //添加基金操作 根据type 添加在不同的版面
        if (this.form.fundcode) {
          confirm({title: '确定添加该基金产品？', confirm_btn: '添加'}, ()=> {
            console.log("submit", this.type, this.edit, this.form);
//            this.form.type = this.edit.type;
//            this.form.module = this.edit.module;
//            this.keyword = '';
            this.$emit('add',this.form);
          })
        } else {
          this.$message.info("请选择好基金再添加！")
        }

      },
      handleClose () {
        console.log("handleClose", this.edit, this.form);
        this.form = Object.assign({}, this.edit);//深拷贝，防止对象引用
        this.keyword = '';
        this.$emit('close');
      },
      handleIconClick(){
        console.log("click")
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .el-table td, .el-table th{
      padding: 6px 0;
    }
</style>