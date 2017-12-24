<template>
  <el-dialog class="search-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="热门搜索配置">
    <el-form :model="form" ref="form">
      <el-form-item label="搜索类型：" :label-width="formLabelWidth">
        <el-radio v-model="form.searchType" label="1">基金</el-radio>
        <el-radio v-model="form.searchType" label="2">资讯公告</el-radio>
      </el-form-item>
      <template v-if="form.searchType == 1">
        <el-form-item label="基金名称：" :label-width="formLabelWidth">
          <el-input
                  placeholder="搜索基金"
                  v-model="keyword"
                  size="small"
                  @change="handleSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
          </el-input>
          <!--<div class="noline"></div>-->
          <el-table
                  v-loading="loading" element-loading-text="拼命加载中"
                  :data="results"
                  height="250"
                  style="width: 100%;line-height: 24px;">
            <el-table-column prop="fundcode" label="基金代码" width="80"></el-table-column>
            <el-table-column prop="fundname" label="基金名称"></el-table-column>
            <el-table-column prop="updatetime" label="更新时间" width="100">
              <template slot-scope="scope">
                <!--{{scope.row.updatetime.split(' ')[0]}}-->
                {{scope.row.updatetime}}
              </template>
            </el-table-column>
            <el-table-column prop="fundtype" label="基金类型" width="80">
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
            <el-table-column prop="" label="操作" width="100" >
              <template slot-scope="scope">
                <!--<el-button size="mini" @click="handleSelect(scope.row,scope.$index)">添加-->
                <el-button size="mini" :disabled="scope.row.selected" @click="handleSelect(scope.row,scope.$index)">添加
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </template>
      <template v-if="form.searchType == 2">
        <el-form-item label="词条名称：" :label-width="formLabelWidth">
          <el-input v-model="form.searchName" :maxlength="10" size="small" placeholder="词条字数不得超过10个"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接：" :label-width="formLabelWidth">
          <el-input v-model="form.link" size="small" placeholder="请输入跳转链接" auto-complete="off"></el-input>
        </el-form-item>
      </template>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {confirm, solve_res, getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name: '',
    props: {
      visible: Boolean,
      edit: Object,
    },
    watch: {
      keyword(newVal){
        this.handleSearch();
      },
      edit (newVal) {
        console.log("newVal", newVal)
        this.form = Object.assign({}, newVal);
        this.keyword = this.form.fundname || this.form.fundcode;
//        this.checkFundList();
        this.handleSearch(this.keyword);
//        return newVal
      }
    },
    data(){
      return {
        formLabelWidth: '120px',
        keyword: '',
        funds: [],
        timeout: null,
        form: {},
        results: [],
        loading:false,
      }
    },
    mounted(){
      this.updateFunds();

    },
    methods: {
      submit(){
        if(this.checkList()) {
          confirm({title: '立即更新该热门搜索？', confirm_btn: '添加'}, ()=> {
            console.log("submit", this.edit, this.form);
            this.$emit('add', this.form);
          })
        }
      },
      checkList(){
        if(this.form.searchType == ""){
          this.$message.error("搜索类型不能为空");
          return false;
        }
        if(this.form.searchType == '1' && this.form.fundname == ""){
          this.$message.error("基金名称不能为空");
          return false;
        }
        if(this.form.searchType == '2' && (this.form.link.trim() == "" || this.form.searchName.trim() == "")){
          this.$message.error("词条或链接不能为空");
          return false;
        }
        return true;
      },
      updateFunds(){
        var params = {
          page: 1,
          rows: 9999,
          type: "",
          module: "",
          msg: ""
        }
        this.loading = true;
        this.$http.get(api.getFundList + `?${getParams(params)}`).then(res=> {
          console.log(res);
          this.funds = res.results;
          this.loading = false;
//          this.checkFundList();
        }).catch(err=> {
          console.log(err);
          this.loading = false;
          this.$message.error("获取基金列表数据失败！");
        })
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
          if (!isNaN(queryString)) {
            var fundcode = state.fundcode + ""
            return (fundcode.indexOf(queryString.toLowerCase()) >= 0);
          }
          else {
            var fundname = state.fundname.toLowerCase();
            return (fundname.indexOf(queryString.toLowerCase()) >= 0);
          }
        };
      },
      handleSelect(item, index) {
        console.log(item);
        this.keyword = item.value;
        if (item.value == "") {
          this.form.fundname = "";
          this.form.fundcode = "";
        } else {
          this.form.fundcode = item.fundcode;
          this.form.fundname = item.fundname;
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
  .search-edit{
  }

</style>