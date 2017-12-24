<template>
  <div class="configOverView-edit">
    <div class="info">
      <p class="label">基本信息</p>
      <p>基金名称：{{overview.fundname}}</p>
      <p>基金类型：
        {{overview.fundtype == '2' ?"货币型":""}}
        {{overview.fundtype == '3' ?"ETF型":""}}
        {{overview.fundtype == '0' ?"股票型":""}}
        {{overview.fundtype == '4' ?"保本型":""}}
        {{overview.fundtype == '1' ?"债券型":""}}
        {{overview.fundtype == 'A' ?"混合型":""}}
        {{overview.fundtype == '5' ?"QDII型":""}}
      </p>
      <p>基金管理人：华泰柏瑞基金管理有限公司</p>
      <p>基金托管人：中国银行股份有限公司</p>
    </div>
    <div class="info">
      <p class="label">投资目标</p>
      <el-input
              :autosize="{ minRows: 2, maxRows: 4}" type="textarea"
              v-model="overview.investobj" placeholder="请输入投资目标" auto-complete="off">
      </el-input>
    </div>
    <div class="info">
      <p class="label">投资组合范围</p>
      <el-input
              :autosize="{ minRows: 6, maxRows: 10}" type="textarea"
              v-model="overview.portfoliOrange" placeholder="请输入投资组合范围" auto-complete="off">
      </el-input>
    </div>
    <div class="info">
      <p class="label">风险收益特征</p>
      <el-input
              :autosize="{ minRows: 6, maxRows: 10}" type="textarea"
              v-model="overview.riskReturnCharact" placeholder="请输入风险收益特征" auto-complete="off">
      </el-input>
    </div>
    <div class="info">
      <p class="label">业绩基准</p>
      <el-input
              :autosize="{ minRows: 1, maxRows: 4}" type="textarea"
              v-model="overview.gips" placeholder="请输入业绩评价标准" auto-complete="off">
      </el-input>
    </div>
    <div class="info">
      <p class="label">费率折扣</p>
      <span>原费率：
        <el-input style="width:60px" size="small" v-model="overview.orifareratio" auto-complete="off"></el-input>
      %</span>&emsp;&emsp;
      <span>折扣率：
        <el-input style="width:60px" size="small" v-model="overview.discountrate" auto-complete="off"></el-input>
      折</span>&emsp;&emsp;
      <span>折扣后费率：{{overview.orifareratio*overview.discountrate/10}} %</span>
    </div>
    <div class="info">
      <p class="label">交易限额：
        <el-input
                style="width:150px" size="small" v-model="overview.tradinglimit" placeholder="请输入交易限额" auto-complete="off">
        </el-input>
      </p>

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  export default {
    name: '',
    data(){
      return {
        overview:{},
      }
    },
    created(){
      this.fundcode = this.$route.query.fundcode;
      this.getOverview(this.fundcode);
//      this.getInfo(fundinfoid);
    },
    methods: {
      getOverview(fundcode){
        var params={
          fundcode : fundcode
        }
        this.$http.get(api.getFundDetail+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            this.overview = res.results;
          }
        })
      },
      handleClose(){
        this.$router.push({path:'/home/fund/config-edit',query:{fundcode:this.fundcode,tab:'overview'}});
      },
      submit(){
        //先提交数据,获取id链接
        console.log("submit",this.overview);
        var params={
          fundcode : this.overview.fundcode,
          investobj : this.overview.investobj,
          portfoliorange : this.overview.portfoliOrange,
          riskreturncharact : this.overview.riskReturnCharact,
          gips : this.overview.gips,
          fundmanager : this.overview.fundmanager,
          fundtrustee : this.overview.fundtrustee,
          discountrate : this.overview.discountrate,
          orifareratio : this.overview.orifareratio,
          tradinglimit: this.overview.tradinglimit,

        }
        this.$http.put(api.updateFundDetail,params).then(res=>{
          if(solve_res(res,"更新数据成功","更新数据失败")){
            this.getOverview(this.fundcode);
            this.$router.push({path:'/home/fund/config-edit',query:{fundcode:this.fundcode,tab:'overview'}});
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .configOverView-edit {
    text-align: left;

  .label{
    line-height: 36px;
    font-weight: 800;
  }
  .el-row{
    padding-bottom:20px ;
  }
  .info{
    padding-bottom: 20px;
  }

  }
</style>