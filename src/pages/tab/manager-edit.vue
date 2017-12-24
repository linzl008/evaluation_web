<template>
  <el-dialog class="manager-edit"
             :visible.sync="visible"
             :before-close="handleClose"
             title="基金经理编辑">
    <el-form :model="form"  ref="form">
      <el-form-item :label-width="formLabelWidth">
        <!--<el-input v-model="form.link" placeholder="请输入标题" auto-complete="off"></el-input>-->
        <!--<img src="../../assets/gold.png">-->
        <el-upload
                action=""
                :multiple = "false"
                :file-list="fileList"
                :http-request = "falseAjax"
                :before-upload="beforeAvatarUpload"
                list-type="picture"
                :on-change="changeImg">
          <el-button size="small" type="primary"><i class="el-icon-plus"></i>&nbsp上传头像</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名:" :label-width="formLabelWidth">
        <el-input v-model="form.manname" size="small"></el-input>
      </el-form-item>
      <el-form-item label="简介:" :label-width="formLabelWidth">
        <el-input
                :autosize="{ minRows: 4, maxRows: 8}" type="textarea" size="small"
                v-model="form.manintroduction" placeholder="请输入简介" auto-complete="off">
        </el-input>
      </el-form-item>

      <el-form-item label="获奖记录:" :label-width="formLabelWidth">
        <el-table
                :data="form.winrecord"
                height="200"
                style="width: 100%;line-height:24px;">
          <el-table-column prop="fundname" label="获奖基金" width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fundname"  placeholder="请选择" size="mini" @change="(item)=>selectFund(item,scope.row)">
                <el-option
                        v-for="item in options"
                        :key="item.fundname"
                        :label="item.fundname"
                        :value="item.fundname">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="awardname" label="获奖奖项" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.awardname" size="small" placeholder="请输入获奖奖项"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="获奖时间" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.time"  size="small" placeholder="获奖时间：YYYY-MM-DD"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="delRecord(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="mini" @click="addRecord">新增获奖记录</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="small" @click="submit">确 定</el-button>
      <!--<el-button type="danger"  size="small" @click="reset">重 置</el-button>-->
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
      edit: Object,
      type:String
    },
    watch: {
      edit (newVal) {
        console.log("newVal",newVal)
        this.form = Object.assign({}, newVal);
//        this.form.winrecord = []
        this.uploadFile={};
        this.fileList=[];
      }
    },
    data(){
      return {
        fileList:[],
        imageUrl: '',
        dialogVisible: false,
        formLabelWidth: '120px',
        form:{},
        uploadFile:{},
        options:[],
      }
    },
    created(){
      this.updateFunds();
    },
    methods: {
      submit(){
        console.log("submit",this.edit,this.form);
        if(this.checkList()){
          this.fileList=[];
          this.$emit('upadteOrAdd',{data:this.form,uploadfile:this.uploadFile});
        }
      },
      checkList(){
//        console.log(!this.form.manname.manid && !this.uploadFile.uid)
        if(!this.form.manname.manid && !this.uploadFile.uid){
          this.$message.error("新增基金经理头像不能为空");
          return false;
        }
        if(this.form.manname.trim().length==0){
          this.$message.error("基金经理名称不能为空");
          return false;
        }
        if(this.form.manintroduction.trim().length==0){
          this.$message.error("基金经理介绍不能为空");
          return false;
        }
        return true;
      },
      addRecord(){
        console.log('addRecord');
        var record = {fundname:'',fundode:"",time:'',awardname:''};
        this.form.winrecord.push(record);
        console.log(this.form.winrecord);
      },
      delRecord(index,row){
        console.log("del:",index,row);
        this.form.winrecord.splice(index,1);
        console.log(this.form.winrecord);
      },
      updateFunds(){
        var params = {
          page: 1,
          rows: 9999,
          type: "",
          module: "",
          msg: ""
        }
        this.$http.get(api.getPageFunds + `?${getParams(params)}`).then(res=> {
          console.log(res);
          this.options = res.results;
        }).catch(err=> {
          console.log(err);
          this.$message.error("获取基金列表数据失败！");
        })
      },
      selectFund(item,row){
        //console.log("select:",item,row);
        //选定 基金 后，将基金代码附加到 form 表单上
        for (var i = 0; i < this.options.length; i++) {
          if(this.options[i].fundname == item){
            row.fundcode = this.options[i].fundcode;
            break;
          }
        }
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
        this.uploadFile={};
        this.$emit('close')
      },
      getTime(date,str){
        this.form[str]= date;
      },
      beforeAvatarUpload(file) {
        console.log(file)
        this.uploadFile = file;
        const fileType= (file.type === 'image/jpeg') || (file.type === 'image/png')|| (file.type === 'image/bmp')
                || (file.type === 'image/gif');

        if (!fileType) {
          this.$message.error('上传文件类型错误');
        }
        return fileType;
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .manager-edit{
    img{
      max-height: 200px;
      max-width: 200px;
    }
    .el-table td, .el-table th{
      line-height: 24px;
    }
  }

</style>
