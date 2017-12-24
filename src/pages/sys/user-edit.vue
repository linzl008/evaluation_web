<template>
  <el-dialog class="user-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="新增管理员编辑">
    <!--userId:'',-->
    <!--passwd:'',-->
    <!--department:'',-->
    <!--name:'',-->
    <!--character:''-->
    <el-form :model="form"  ref="form">
      <el-form-item label="账号：" :label-width="formLabelWidth" prop="userId">
        <el-input v-model="form.userno" size="small" placeholder="请输入账号" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="初始密码：" :label-width="formLabelWidth" prop="passwd">
        <el-input v-model="form.userpwd" type="password" size="small" placeholder="请输入初始密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门：" :label-width="formLabelWidth" prop="department">
        <el-input v-model="form.userdept" size="small" placeholder="请输入部门" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.username" size="small" placeholder="请输入姓名" auto-complete="off"></el-input>
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
        options:[
                {value:'1',label:'超级管理员'},
                {value:'2',label:'普通管理员'},
        ],
        formLabelWidth: '120px',
        form:{},
      }
    },
    methods: {
      submit(){
        if(this.checkList()){
          console.log("submit",this.edit,this.form);
          confirm({title:'确定新增该管理员？',confirm_btn:'确定新增'},()=> {
            this.$emit('add',this.form)
          })
        }

      },
      checkList(){
        if(this.form.userno == ""){
          this.$message.error("账号不能为空");
          return false;
        }
        return true;
      },
      handleClose () {
        console.log("handleClose",this.edit,this.form);
        this.form = Object.assign({},this.edit);//深拷贝，防止对象引用
        this.$emit('close')
      },

    }
  }
</script>

<style scoped>
</style>
