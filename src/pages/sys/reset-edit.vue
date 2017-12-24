<template>
  <el-dialog class="reset-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="重置密码编辑">
    <el-form :model="form"  ref="form">
      <el-form-item label="输入新密码：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.userpwd" type="password" size="small" placeholder="请输入新密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="再次输入：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.rp_passwd" type="password" size="small" placeholder="请再次输入新密码" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">确 定</el-button>
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
        form:{
          userpwd:'',
          rp_passwd:''
        },
      }
    },
    methods: {
      submit(){
        console.log("submit",this.edit,this.form);
        if(this.form.userpwd.length===0 || this.form.userpwd !==this.form.rp_passwd){
          confirm({title:'两次密码输入为空或者不一致？',confirm_btn:'重新输入'},()=> {})
        }else{
            this.$emit('reset',this.form);
        }
      },
      handleClose () {
        console.log("handleClose",this.edit,this.form);
        this.form = Object.assign({},this.edit);//深拷贝，防止对象引用
        this.form.userpwd = '';
        this.form.rp_passwd = '';
        this.$emit('close')
      },
    }
  }
</script>

<style scoped>
</style>
