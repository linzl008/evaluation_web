<template>
  <el-dialog class="imageUpload-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="现有图片">
    <el-form :model="form"  ref="form">
      <el-form-item label="">
        <!--<el-input v-model="form.link" placeholder="请输入标题" auto-complete="off"></el-input>-->

          <!--<el-col :span="12">-->
            <!--<img :src="debugHead+form.imgurl"/>-->
          <!--</el-col>action="https://jsonplaceholder.typicode.com/photos/"-->
          <el-form-item label="图片：" :label-width="formLabelWidth" prop="name">
            <el-upload
                    action=""
                    :multiple = "false"
                    :file-list="fileList"
                    :http-request = "falseAjax"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture"
                    :on-change="changeImg"
                    >
              <el-button size="mini" type="primary" ><i class="el-icon-plus"></i>&nbsp上传新的图片</el-button>
              <div slot="tip" class="el-upload__tip" style="line-height: 16px;margin-top: 0;margin-bottom: 7px;color:gray;"><span>图片尺寸推荐：750px*188px</span><br/><span>图片格式说明：jpg、png</span></div>
            </el-upload>
            <!--<p>{{uploadFile.name}}</p>-->
          </el-form-item>

        <el-form-item label="跳转链接：" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.imglink" size="small" placeholder="请输入跳转链接" auto-complete="off"></el-input>
        </el-form-item>

        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
      <!--<el-button type="danger" size="small" @click="reset">重 置</el-button>-->
    </div>
  </el-dialog>

</template>

<script>
  import { DebugHead } from '@/config/base_config';

  export default {
    name: '',
    props: {
      visible: Boolean,
      edit: Object,
      type:String,
    },
    watch: {
      edit (newVal) {
        console.log("newVal",newVal)
        this.form = Object.assign({}, newVal);
        this.fileList=[];
        this.uploadFile={};
//        return newVal
      }
    },
    created(){
      this.debugHead = DebugHead;
    },
    data(){
      return {
        debugHead:"",
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '120px',
        form:{},
        uploadFile:{},
      }
    },
    methods: {
      submit(){
        console.log("submit",this.edit,this.form);
//        this.fileList=[];
        this.$emit('upadteOrAdd',{data:this.form,file:this.uploadFile});
//        this.uploadFile={};
      },
      reset(){
        console.log("reset")
        this.$message.success("重置成功");
        this.form = Object.assign({},this.edit);
        this.fileList=[];
        this.uploadFile={};
//        this.$emit('close')
      },
      handleClose () {
        console.log("handleClose",this.edit,this.form);
        this.form = Object.assign({},this.edit);//深拷贝，防止对象引用
        this.fileList=[];
        this.uploadFile = {};
        this.$emit('close')
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getTime(date,str){
        this.form[str]= date;
      },
      beforeAvatarUpload(file) {
        this.uploadFile = file;
        console.log(file,this.fileList);
        //上传规则 （jpg|png）&（750*188） pad格式就不要啦
        const fileType= (file.type === 'image/jpeg') || (file.type === 'image/png');

        if (!fileType) {
          this.$message.error('上传文件类型错误');
        }
        return fileType;
//        return true;
      },
      changeImg(file, fileList){                //当上传了新图片
        console.log("gggg:",file,fileList)
        if (fileList.length > 1) {
          fileList.shift()                      //清空之前的图片
        }
      },
      falseAjax(){
        console.log("falseUpload");
      }


    }
  }
</script>

<style  rel="stylesheet/scss" lang="scss"  scoped>
  img{
    max-height: 200px;
    max-width: 200px;
  }

</style>
