<template>
  <div class="config-edit">
    <h3>基金配置:{{fundname}}</h3>
    <div class="noline"></div>
    <el-tabs v-model="activeTabName" >
      <el-tab-pane label="推荐理由" name="reason">
        <el-row>
          <el-col :span="4" >
            <span class="label">推荐语</span>
          </el-col>
          <el-col :span="12">
            <el-input v-model="reason.recommend" size="small" placeholder="请输入推荐理由"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" ><span class="label" >"特色"标签</span></el-col>
          <el-col :span="12">
            <el-input v-model="reason.labels" :maxlength="5" size="small" placeholder="不超过5个字的特色标签"></el-input>
          </el-col>
        </el-row>
        <div style="text-align: center">
          <el-button size="small" @click="recommendClear()">重置</el-button>
          <el-button size="small" @click="updateRecommend()">确认提交</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基金概述"  name="overview">
        <div style="text-align: right">
          <el-button class="add" size="mini" type="primary" @click="overviewEdit">编辑</el-button>
        </div>
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
            {{overview.fundtype == '8' ?"专户理财":""}}
            {{overview.fundtype == '9' ?"超短期理财产品":""}}
          </p>
          <p>基金管理人：华泰柏瑞基金管理有限公司</p>
          <p>基金托管人：中国银行股份有限公司</p>
        </div>
        <div class="info">
          <p class="label">投资目标</p>
          <p>{{overview.investobj}}</p>
        </div>
        <div class="info">
          <p class="label">投资组合范围</p>
          <p>{{overview.portfoliOrange}}</p>
        </div>
        <div class="info">
          <p class="label">风险收益特征</p>
          <p>{{overview.riskReturnCharact}}</p>
        </div>
        <div class="info">
          <p class="label">业绩基准</p>
          <p>{{overview.gips}}</p>
        </div>
        <div class="info">
          <p class="label">费率折扣</p>
          <span>原费率：{{overview.orifareratio}} %</span>&emsp;&emsp;
          <span>折扣率：{{overview.discountrate}} 折</span>&emsp;&emsp;
          <span>折扣后费率：{{overview.orifareratio*overview.discountrate/10}} %</span>
        </div>
        <div class="info">
          <p class="label">交易限额：&emsp;<span>{{overview.tradinglimit}} </span></p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="基金经理" name="manager">
        <el-button class="add" size="mini" type="primary" @click="managerAdd">添加基金经理</el-button>
        <el-table border :data="manager" class="table" v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column label="头像"  prop="manurl" width="140" align="center">
            <template slot-scope="scope">
              <img :src="debugHead+scope.row.manurl">
            </template>
          </el-table-column>
          <el-table-column label="姓名"  prop="manname" width="140" align="center"></el-table-column>
          <el-table-column label="基本介绍"  prop="manintroduction" align="center"></el-table-column>
          <el-table-column label="操作" width="180"  align="center">
            <template slot-scope="scope" class="operate">
              <el-button type="primary" size="mini" @click="managerEdit(scope.$index,scope.row)">更换</el-button>
              <el-button type="danger" size="mini" @click="managerDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <configManager-edit :edit="editData" :selectedManagers="manager" @updateOrAdd="upOrAddManagers" :visible="editVisible" @close="closeEdit"></configManager-edit>
      </el-tab-pane>
      <el-tab-pane label="费率信息" name="info">
        <el-button class="add" type="primary" size="mini" @click="infoEdit">编辑</el-button>
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
                  {{info.purchaserate['purchaserate'+[scope.$index+1]]}}
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
                  <!--<span>{{scope.row.from}} &#45;&#45;&#45;&#45; {{scope.row.to}}</span>-->
                </template>
              </el-table-column>
              <el-table-column label="赎回费率"  prop="rate"  align="center">
                <template slot-scope="scope">
                  {{info.rademptionrate['rademptionrate'+[scope.$index+1]]}}
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
                  <!--<span>{{scope.row.from}} &#45;&#45;&#45;&#45; {{scope.row.to}}</span>-->
                </template>
              </el-table-column>
              <el-table-column label="买入费率"  align="center">
                <template slot-scope="scope">
                  {{info.subscriptionrate['subscriptionrate'+[scope.$index+1]] }}
                </template>
              </el-table-column>

            </el-table>
          </el-col>
          <el-col :offset="1" :span="11">
            <h4 class="title">基金运作费</h4>
            <div class="box">
              <div class="head" ><h4>管理费率</h4></div>
              <div>{{info.managementrate}}</div>
              <div class="head"><h4>托管费率</h4></div>
              <div>{{info.managedrate}}</div>
              <div class="head"><h4>销售服务费率</h4></div>
              <div>{{info.salesServicerate}}</div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import ConfigManagerEdit from './configManager-edit.vue';
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  import { DebugHead } from '@/config/base_config';
  export default {
    name:'',
    components: {
      ConfigManagerEdit
    },
    data(){
      return {
        editVisible: false,
        editData:{},
        loading:false,
        debugHead:'',
        fundcode:'',
        fundname:'',
        activeTabName: 'reason',
        reason:{
          recommend:'',
          labels:''
        },
        overview:{
          fundName:'华泰柏瑞基金',
          fundType:'指数基金',
          fundManager:'华泰柏瑞基金管理有限公司',
          fundCollect:'中国银行股份有限公司',
          target:'本基金主要通过对目标ETF基金份额的投资，紧密跟踪中国黄金现货价格的表现。',
          combination:'本基金主要投资于目标ETF基金份额以及上海黄金交易所挂盘交易的黄金现货合约等黄金品种。此外，本基金还可以投资于固定收益类证券、货币市场工具以及法律法规或中国证监会允许基金投资的其他金融工具。正常情况下，本基金投资于目标ETF的比例不低于基金资产净值的90%，现金或者到期日在一年以内的政府债券不低于基金资产净值的5%。',
          income:'本基金是目标ETF的联接基金，目标ETF为黄金ETF，因此本基金的风险收益特征与国内黄金现货价格的风险收益特征相似，不同于股票基金、混合基金、债券基金和货币市场基金。',
          evaluation:'内黄金现货价格收益率*95%+人民币活期存款税后利率*5%',
          rate:'1.5',
          discount:'1'
        },
        manager:[],
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
      if(this.$route.query.tab){
        this.activeTabName = this.$route.query.tab;
      }
      this.debugHead = DebugHead;
      this.getRecommend(this.fundcode);
      this.getOverview(this.fundcode);
      this.getManager(this.fundcode);
      this.getInfo(this.fundcode);
    },
    methods:{
      getRecommend(fundcode){
        console.log(fundcode)
        var params = {
          fundcode : fundcode
        }
        this.$http.get(api.getFundRecomment+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            this.reason = res.comments;
          }
        })
      },
      recommendClear(){
        this.reason.recommend = '';
        this.reason.labels= '';
      },
      updateRecommend(){
        console.log("reasonCommit");

        var params={
          fundcode :this.reason.fundcode,
          recommend:this.reason.recommend,
          labels:this.reason.labels,
        }
        this.$http.put(api.updateFundRecomment,params).then(res=>{
          if(solve_res(res,"更新数据成功","更新数据失败")){
            this.getRecommend(this.fundcode);
          }
        })
      },
      checkRecommend(){
//        if()this.reason.labels
      },
      getOverview(fundcode){
        var params={
          fundcode : fundcode
        }
        this.$http.get(api.getFundDetail+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            this.overview = res.results;
            this.fundname=this.overview.fundname;
          }
        })
      },
      overviewEdit(){
        console.log('overviewEdit');
        //传数据过去
        this.$router.push({path:'/home/fund/configOverview-edit',query:{fundcode:this.fundcode}})
      },
      getInfo(fundcode){
        var params={
          fundcode : fundcode
        }
        this.$http.get(api.getFundRate+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            console.log(res);
            this.info.purchaserate = res.results.purchaserate;
            this.info.rademptionrate = res.results.rademptionrate;
            this.info.subscriptionrate = res.results.subscriptionrate;
            this.info.managementrate = res.results.managementrate;
            this.info.managedrate = res.results.managedrate;
            this.info.salesServicerate = res.results.salesServicerate;
          }
        })
      },
      managerAdd(){
        //弹框
        console.log("managerAdd");
        this.editData={
          manid:'',
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
        var params={
          manid:row.manid,
          fundcode:this.fundcode
        }
        confirm({title:'确定删除该基金经理？',confirm_btn:'删除'},()=> {
          this.$http.delete(api.deleteFundManager+`?${getParams(params)}`).then(res=> {
            if (solve_res(res, "", "获取数据失败")) {
              this.getManager();
            }
          })
        })
      },
      getManager(fundcode){
        var params={
          fundcode : fundcode,
          page:1,
          rows:9999
        }
        this.loading = true;
        this.$http.get(api.getFundManagerList+`?${getParams(params)}`).then(res=>{
          if(solve_res(res,"","获取数据失败")){
            console.log(res);
            this.manager=res.results;
          }
          this.loading = false;
        })
      },
      upOrAddManagers(data){
        console.log(data,"man");
        var params={
          fundcode:this.fundcode
        }
        if(data.oldmanid){//执行替换操作
          params.newmanid = data.manid;
          params.manid = data.oldmanid;
          this.$http.put(api.updateFundManager,params).then(res=>{
            if(solve_res(res,"替换成功","替换失败")){
              this.getManager(this.fundcode);
              this.closeEdit();
            }
          })
        }else{ //执行添加操作
          params.manid=data.manid;
          this.$http.post(api.addFundManager,params).then(res=>{
            if(solve_res(res,"添加成功","添加失败")){
              this.getManager(this.fundcode);
              this.closeEdit();
            }
          })
        }
      },
      closeEdit () {
        this.editVisible = false
      },
      infoEdit(index,row){
        console.log("edit");
        //传数据
        this.$router.push({path:'/home/fund/configInfo-edit',query:{fundcode:this.fundcode}})
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .config-edit {
    text-align: left;
    img{
      max-height: 130px;
      max-width: 130px;
    }
    .label{
      line-height: 36px;
      font-weight: 800;
    }
    .title{
      text-align: center;
      padding-bottom: 10px;
    }
    .box{
       min-height: 169px;
       border: 1px solid #e2e7f3;
       text-align: center;
       background-color: white;
       line-height: 26px;
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
      span{
        font-weight:normal;
      }
    }

  }
</style>
