<template>
  <div class="configInfo-edit">
    <el-row>
      <el-col :span="11">
        <h4 class="title">申购费率</h4>
        <el-table border :data="info.purLabel" class="table" >
          <el-table-column label="买入金额"  align="center">
            <template slot-scope="scope">
              <div class="row">
                <div class="col-33">{{scope.row.from}}</div>
                <div class="col-33">----</div>
                <div class="col-33">{{scope.row.to}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="买入费率" align="center">
            <template slot-scope="scope">
              <el-input style="width:80px" size="mini" v-model="info.purchaserate['purchaserate'+[scope.$index+1]]" placeholer=""></el-input>
              <!--{{'purchaserate'+[scope.$index+1]}}-->
              <!--{{info.purchaserate['purchaserate'+[scope.$index+1]]}}-->
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :offset="1" :span="11">
        <h4 class="title">赎回费率</h4>
        <el-table border :data="info.redLabel" class="table" >
          <el-table-column label="持有时间"  prop="from"  align="center">
            <template slot-scope="scope">
              <div class="row">
                <div class="col-33">{{scope.row.from}}</div>
                <div class="col-33">----</div>
                <div class="col-33">{{scope.row.to}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="赎回费率"  prop="rate"  align="center">
            <template slot-scope="scope">
              <el-input style="width:80px" size="mini" v-model="info.rademptionrate['rademptionrate'+[scope.$index+1]]" placeholer=""></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <h4 class="title">认购费率</h4>
        <el-table border :data="info.subLabel" class="table" >
          <el-table-column label="买入金额"   align="center">
            <template slot-scope="scope">
              <div class="row">
                <div class="col-33">{{scope.row.from}}</div>
                <div class="col-33">----</div>
                <div class="col-33">{{scope.row.to}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="买入费率"  align="center">
            <template slot-scope="scope">
              <el-input style="width:80px" size="mini" v-model="info.subscriptionrate['subscriptionrate'+[scope.$index+1]]" placeholer=""></el-input>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :offset="1" :span="11">
        <h4 class="title">基金运作费</h4>
        <div class="box">
          <div class="head" ><h4>管理费率</h4></div>
          <div>
            <el-input   v-model="info.managementrate" size="mini" placeholer=""></el-input></div>
          <div class="head"><h4>托管费率</h4></div>
          <div>
            <el-input  v-model="info.managedrate" size="mini" placeholer=""></el-input></div>
          <div class="head"><h4>销售服务费率</h4></div>
          <div>
            <el-input  v-model="info.salesServicerate" size="mini" placeholer=""></el-input></div>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 定</el-button>
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
        fundcode:'',
        info:{
          purchaserate:{
            purchaseamount1:'50万',
            purchaseamount2:'100万',
            purchaseamount3:'1000万',
            purchaseamount4:'以上',
            purchaserate1:'',
            purchaserate2:'',
            purchaserate3:'',
            purchaserate4:''
          },
          rademptionrate:{
            rademptionamount1:'1年',
            rademptionamount2:'2年',
            rademptionamount3:'3年',
            rademptionamount4:'以上',

            rademptionrate1:'',
            rademptionrate2:'',
            rademptionrate3:'',
            rademptionrate4:'',
          },
          subscriptionrate:{
            subscriptionamount1:'50万',
            subscriptionamount2:'100万',
            subscriptionamount3:'1000万',
            subscriptionamount4:'以上',

            subscriptionrate1:'',
            subscriptionrate2:'',
            subscriptionrate3:'',
            subscriptionrate4:'',
          },
          managementrate:'',
          managedrate:'',
          salesServicerate:'',
          purLabel:[
            {from:'0',to:'50万'},
            {from:'50万(含)',to:'100万'},
            {from:'100万(含)',to:'1000万'},
            {from:'1000万(含)',to:'以上'},
          ],
          redLabel:[
            {from:'0',to:'1年'},
            {from:'1年(含)',to:'2年'},
            {from:'2年(含)',to:'3年'},
            {from:'3年(含)',to:'以上'},
          ],
          subLabel:[
            {from:'0',to:'50万'},
            {from:'50万(含)',to:'100万'},
            {from:'100万(含)',to:'1000万'},
            {from:'1000万(含)',to:'以上'},
          ],
          runLabel:[
            { label:'管理费率',label2:'托管费率'}
          ]
        }
      }
    },
    created(){
      this.fundcode = this.$route.query.fundcode;
      this.getInfo(this.fundcode);
    },
    methods: {
      getInfo(fundcode){
        var params={
          fundcode : fundcode
        }
        this.$http.get(api.getFundRate+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            console.log(res);
            this.info.purchaserate = Object.assign({},this.info.purchaserate,res.results.purchaserate);
            this.info.rademptionrate = Object.assign({},this.info.rademptionrate,res.results.rademptionrate);
            this.info.subscriptionrate = Object.assign({},this.info.subscriptionrate,res.results.subscriptionrate);
            this.info.managementrate = res.results.managementrate;
            this.info.managedrate = res.results.managedrate;
            this.info.salesServicerate = res.results.salesServicerate;
            console.log(this.info)
          }
        })
      },
      handleClose(){
        this.$router.push({path:'/home/fund/config-edit',query:{fundcode:this.fundcode,tab:'info'}});
      },
      submit(){
        //先提交数据,获取id链接
        console.log("submit")
        var params = {
          fundcode : this.fundcode,
          purchaserate: this.info.purchaserate,
          rademptionrate:this.info.rademptionrate ,
          subscriptionrate:this.info.subscriptionrate ,
          managementrate: this.info.managementrate,
          managedrate:this.info.managedrate,
          salesServicerate:this.info.salesServicerate
        }
        this.$http.put(api.updateFundRate,params).then(res=>{
          if(solve_res(res,"更新数据成功","更新数据失败")){
            console.log(res);
            console.log(this.info)
            this.$router.push({path:'/home/fund/config-edit',query:{fundcode:this.fundcode,tab:'info'}});
          }
        })

      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .configInfo-edit {
    text-align: left;

    .label{
      line-height: 36px;
      font-weight: 800;
    }
    .title{
      text-align: center;
      padding-bottom: 10px;

    }
    .box{
      min-height: 192px;
      border: 1px solid #e2e7f3;
      text-align: center;
      background-color: white;
      line-height: 28px;
      font-size: 16px;

      .head{
        background-color: #eef1f6;
        border-top: 1px solid #e2e7f3;
        border-bottom: 1px solid #e2e7f3;
      }
      div{
        text-align: left;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 10px;
        padding-right: 10px;

      }
    }
    .el-row{
      padding-bottom:20px ;
    }
    .info{
      padding-bottom: 20px;
    }
    .small_input{
      display: inline;
    }

  }
</style>