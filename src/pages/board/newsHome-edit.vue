<template>
  <el-dialog class="news-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="首页资讯公告编辑">
    <el-form :model="form"  ref="form">
      <el-form-item label="资讯名称：" :label-width="formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入资讯名称"  size="small" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接：" :label-width="formLabelWidth">
        <el-input v-model="form.link" placeholder="请选择跳转链接"  size="small" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：" :label-width="formLabelWidth" prop="sendTimeType disable">
        <el-radio-group v-model="form.startTimeType" style="padding-top: 12px" @change="toggle('start')">
          <el-radio label="0" >点击发布</el-radio>
          <div class="m-t">
            <el-radio label="1" style="padding-right: 10px">定时发布</el-radio>
            <el-date-picker
                    type="datetime"
                    size="mini"
                    placeholder="选择日期"
                    @change="(date)=>getTime(date,'pushtime')"
                    :editable="false"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :disabled="form.startTimeState"
                    v-model="form.pushtime"
                    class="inline">
            </el-date-picker>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下架时间：" :label-width="formLabelWidth" >
        <el-radio-group v-model="form.endTimeType" style="padding-top: 12px" @change="toggle('end')">
          <el-radio label="0" >点击下架</el-radio>
          <div class="m-t">
            <el-radio label="1" style="padding-right: 10px">定时下架</el-radio>
            <el-date-picker
                    type="datetime"
                    size="mini"
                    placeholder="选择日期"
                    @change="(date)=>getTime(date,'endtime')"
                    :editable="false"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :disabled="form.endTimeState"
                    v-model="form.endtime"
                    class="inline">
            </el-date-picker>
          </div>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'

  export default {
    name: '',
    props: {
      visible: Boolean,
      edit: Object
    },
    watch: {
      visible (newVal) {
        if(this.visible == true){
          this.form.id = ""
          this.form = Object.assign({}, this.form,this.edit);
          if(this.edit.pushtime){
            this.form.startTimeType = "1";
          }else{
            this.form.startTimeType = "0"
          }
          if(this.edit.endtime){
            this.form.endTimeType = "1"
          }else{
            this.form.endTimeType = "0"
          }
          if(this.form.startTimeType == 0){
            this.form.startTimeState = true;
          }
          if(this.form.endTimeType == 0){
            this.form.endTimeState = true;
          }
        }
      }

    },
    data(){
      return {
        formLabelWidth: '120px',
        keyword:'',
        results:[],
        form:{
          startTimeType:"1",
          endTimeType:"1",
          startTimeState:false,
          endTimeState:false
        },
      }
    },
    mounted(){
    },
    methods: {
      submit(){
        if(this.checkList()){
          console.log("submit",this.edit,this.form);
          confirm({title: '确定发布该资讯？', confirm_btn: '发布'}, ()=> {
            this.$emit('updateOrAdd', this.form);
          })
        }
      },
      checkList(){
        if(this.form.title == ""){
          this.$message.error("标题不能为空")
          return false;
        }
        if(this.form.link == ""){
          this.$message.error("链接不能为空")
          return false;
        }
        //定时发布 不选时间
        if((this.form.startTimeType === '1' && this.form.pushtime=="") || (this.form.endTimeType === '1' && this.form.endtime=="")){
          this.$message.error("请选择时间");
          return false;
        }
        //发布时间小于结束时间
        if(this.form.startTimeType === '1'){
          var start = new Date(this.form.pushtime ).getTime() ;
        }else{
          var start = Date.now() ;
        }
        var end = new Date(this.form.endtime).getTime();
        if( this.form.endTimeType === '1'){
          if(start>end){
            this.$message.error("结束时间必须晚于发布时间");
            return false;
          }
        }
        return true;
      },
      handleClose () {
        console.log("handleClose",this.edit,this.form);
        var initForm = {
          startTimeType:"1",
          endTimeType:"1",
          startTimeState:false,
          endTimeState:false
        }
        this.form = {};
        this.form = Object.assign({},initForm,this.edit);//伪深拷贝，防止对象引用
        this.$emit('close')
      },
      getTime(date,str){
        console.log("data")
        this.form[str]= date;
      },
      toggle(op){
        if(op == "start"){
          if(this.form.startTimeType == "0") {
            this.form.startTimeState = true;
          }else{
            this.form.startTimeState =false;
          }
        }
        if(op == "end"){
          if(this.form.endTimeType == "0") {
            this.form.endTimeState = true;
          }else{
            this.form.endTimeState=false;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .news-edit{
    /*z-index: 2050;*/
  }
</style>
