<template>
  <el-dialog class="version-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="版本管理编辑">
    <el-form :model="form"  ref="form">
      <el-form-item label="版本号：" :label-width="formLabelWidth" >
        <el-input v-model="form.versionno" size="small" placeholder="请输入版本号" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="渠道："  :label-width="formLabelWidth" >
        <el-select v-model="form.channel" size="small" placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提示标题：" :label-width="formLabelWidth" >
        <el-input v-model="form.prompttitle" size="small" placeholder="请输入标题" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="提示内容：" :label-width="formLabelWidth">
        <el-input
                :autosize="{ minRows: 2, maxRows: 8}" type="textarea"  size="small"
                v-model="form.promptcontent" placeholder="请输入提示内容" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="下载链接：" :label-width="formLabelWidth" prop="start_time">
        <el-input v-model="form.link" size="small" placeholder="请输入下载链接" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否强制：" :label-width="formLabelWidth">
        <el-radio v-model="form.isconstraint" label="1">强制更新</el-radio>
        <el-radio v-model="form.isconstraint" label="2">可选更新</el-radio>
        <el-radio v-model="form.isconstraint" label="3">不推送更新</el-radio>
      </el-form-item>
      <el-form-item label="状态：" :label-width="formLabelWidth">
        <el-radio v-model="form.status" label="1">未发布</el-radio>
        <el-radio v-model="form.status" label="2">已发布</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="handleClose">取 消</el-button>
      <el-button  size="small" type="primary" @click="submit">确 定</el-button>
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
        this.form = Object.assign({}, newVal);
        console.log(this.form)
//        return newVal
      }
    },
    data(){
      return {
        formLabelWidth: '120px',
        form:{},
        options:[
          {label:'安卓',val:'1'},
          {label:'IOS',val:'2'},
        ]
      }
    },
    methods: {
      submit(){
        if(this.checkList()){
          console.log("submit",this.edit,this.form);
          confirm({title:'确定发布该版本信息？',confirm_btn:'发布'},()=> {
            this.$emit('add',this.form);
          })
        }
      },
      checkList(){
        if(this.form.versionno.trim().length==0){
          this.$message.error("版本号不能为空");
          return false;
        }
        var re = this.form.versionno.search(/^[0-9a-zA-Z\.]*$/g);
        if(re == -1){
          this.$message.error("提示标题格式错误");
          return false;
        }
        if(this.form.prompttitle.trim().length==0){
          this.$message.error("提示标题不能为空");
          return false;
        }
        if(this.form.promptcontent.trim().length==0){
          this.$message.error("提示内容不能为空");
          return false;
        }
        if(this.form.link.trim().length==0){
          this.$message.error("下载链接不能为空");
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
