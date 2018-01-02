<template>
  <!--选择申请的类型-->
  <div class="homepage">
    <div class="content">
      <el-row>
        <el-col :span="6" >
          <span class="label">学科：</span>
        </el-col>
        <el-col :span="12">
          <el-select class="myselect" v-model="apply.subject"  placeholder="请选择" size="small">
            <el-option
                    v-for="item in subjects"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" ><span class="label" >授权级别：</span></el-col>
        <el-col :span="12">
          <el-select class="myselect"  v-model="apply.level" placeholder="请选择" size="small">
            <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="6" :span="12">
          <div class="content_bottom">
            <el-button size="small" type="primary" @click="submit()">确认提交</el-button>
            <div class="remind">深圳大学研究生院
              2017年11月制</div>
          </div>
        </el-col>
      </el-row>


    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data(){
      return {
        subjects:[
          {value:'0',label:'学术学位'},
          {value:'1',label:'硕士学位'},
          {value:'2',label:'博士学位'},
        ],
        levels:[
          {value:'0',label:'学士'},
          {value:'1',label:'硕士'},
          {value:'2',label:'博士'},
        ],
        apply:{
          subject:'',
          level:''
        }
      }
    },
    methods: {
      submit(){
       //根据 跳转
        this.$router.push({path:'/home/degree/degree-info',query:{subject:this.apply.subject,level:this.apply.level}});
      }
    }
  }
</script>

<!--<style rel="stylesheet/scss" scoped></style>-->
<style rel="stylesheet/scss" lang="scss"  scoped>
  .homepage{
    .content{
      margin: 10% 15% 10% 15%;
      text-align: right;
      .label{
        line-height: 36px !important;
        font-weight: 800;
      }
      .myselect{
        display: block;
        max-width: 100%;
      }
      .content_bottom{
        text-align: center;
        padding-top: 20px;
        .remind{
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
  }
</style>