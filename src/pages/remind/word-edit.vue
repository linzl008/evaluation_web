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
      <!--<el-form-item label="文字所在位置：" :label-width="formLabelWidth">
        <el-input v-model="form.showlocation" placeholder="请输入文字所在位置" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="文案类型：" :label-width="formLabelWidth">
        <el-input v-model="form.lettertype" placeholder="请输入文案类型" auto-complete="off"></el-input>
      </el-form-item>-->
      <el-form-item label="请输入内容信息：" :label-width="formLabelWidth">
        <el-input
                :autosize="{ minRows: 8, maxRows: 12}" type="textarea"
                v-model="form.letter" placeholder="限制字数140字" auto-complete="off">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确认修改</el-button>
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
          this.$emit('update',this.form)
        }
      },
      checkList(){
        if(this.form.letter.length >=140){
          this.$message.error("文案信息不能超过140个字");
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
