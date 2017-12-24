<template>
  <el-dialog class="marquee-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="提示性文字编辑">
    <!--wordId:'',-->
    <!--position:'',-->
    <!--type:"",-->
    <!--content:"",-->
    <el-form :model="form"  ref="form">
      <el-form-item label="交易渠道名称：" :label-width="formLabelWidth">
        <el-input v-model="form.bankname" size="small" placeholder="" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="单比交易限额：" :label-width="formLabelWidth">
        <el-input v-model="form.singletradinglimit" size="small" placeholder="" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="单日交易限制：" :label-width="formLabelWidth">
        <el-input v-model="form.onedaytradinglimit" size="small" placeholder="" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 认</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import { confirm } from '@/tool/utils'
  export default {
    name: '',
    props: {
      visible: Boolean,
      edit: Object
    },
    watch: {
      edit (newVal) {
        console.log("newVal",newVal)
        this.form = Object.assign({}, newVal)
//        return newVal
      }
    },
    data(){
      return {
        formLabelWidth: '120px',
        form:{},
      }
    },
    methods: {
      submit(){
        if(this.checkList()){
          console.log("submit",this.edit,this.form);
          this.$emit('updateOrAdd',this.form)
        }
      },
      checkList(){
        if(this.form.bankname.trim().length==0){
          this.$message.error("交易渠道不能为空");
          return false;
        }
        if(isNaN(Number(this.form.singletradinglimit)) || isNaN(Number(this.form.onedaytradinglimit))){
          this.$message.error("交易限额格式错误");
          return false;
        }
        return true;
      },
      handleClose () {
        console.log("handleClose",this.edit,this.form);
        this.form = Object.assign({},this.edit);//深拷贝，防止对象引用
        this.$emit('close')
      },
      getTime(date,str){
        this.form[str]= date;
      }
    }
  }
</script>

<style scoped>
</style>
