<template>
  <div class="express">
    <!--第一部分-->
    <el-form :model="edit" ref="baseForm" :label-position="labelPosition" label-width="formLabelWidth" class="demo-ruleForm">
      <el-form-item label="一级学科获学位授权时间：" prop="authTime" >
        <el-date-picker size="small" type="date" placeholder="选择日期" v-model="edit.authTime" style="max-width: 300px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否按一级学科招收培养研究生：" prop="takeStudentType" >
        <el-radio-group v-model="edit.takeStudentType">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <!--第二部分-->
      <h3 class="title">一级学科招收培养研究生情况</h3>
      <table border="1">
        <tr>
          <td colspan="4">培养博士研究生情况</td>
          <td colspan="4">培养硕士研究生情况</td>
        </tr>
        <tr>
          <td >近五年获学位人数</td>
          <td >
            <el-form-item label="" prop="dr5degreeNum" >
              <el-input size="small"  v-model="edit.dr5degreeNum"></el-input>
            </el-form-item>
          </td>
          <td >在学人数</td>
          <td >
            <el-form-item label="" prop="dr5num" >
              <el-input size="small"  v-model="edit.dr5num"></el-input>
            </el-form-item>
          </td>
          <td >近五年获学位人数</td>
          <td >
            <el-form-item label="" prop="mr5degreeNum" >
              <el-input size="small"  v-model="edit.mr5degreeNum"></el-input>
            </el-form-item>
          </td>
          <td >在学人数</td>
          <td >
            <el-form-item label="" prop="mr5num" >
              <el-input size="small"  v-model="edit.mr5num"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td >博士研究生指导教师数</td>
          <td >
            <el-form-item label="" prop="dr5teacherNum" >
              <el-input size="small"  v-model="edit.dr5teacherNum"></el-input>
            </el-form-item>
          </td>
          <td >生师比</td>
          <td >
            <el-form-item label="" prop="dr5rate" >
              <el-input size="small"  v-model="edit.dr5rate"></el-input>
            </el-form-item>
          </td>
          <td >博士研究生指导教师数</td>
          <td >
            <el-form-item label="" prop="mr5teacherNum" >
              <el-input size="small"  v-model="edit.mr5teacherNum"></el-input>
            </el-form-item>
          </td>
          <td >生师比</td>
          <td >
            <el-form-item label="" prop="mr5rate" >
              <el-input size="small"  v-model="edit.mr5rate"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <!--第三部分-->
      <h3 class="title">二级学科招收培养研究生情况</h3>
      <el-table
              :data="edit.secTackStu"
              style="width: 100%">
        <el-table-column prop="codeAndName" label="二级学科代码及名称（按一级学科招生的可不填）" >
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.codeAndName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="培养博士研究生情况">
          <el-table-column prop="autnDrTime" label="获博士学位授权时间" width="150">
            <template slot-scope="scope">
              <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="scope.row.autnDrTime" style="max-width: 100%;">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="dr5degreeNum" label="近五年获学位人数">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.dr5degreeNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dr5num" label="在学人数">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.dr5num"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="培养硕士研究生情况">
          <el-table-column prop="autnMrTime" label="获博士学位授权时间"  width="150">
            <template slot-scope="scope">
              <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="scope.row.autnMrTime" style="max-width: 100%;">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="mr5degreeNum" label="近五年获学位人数">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.mr5degreeNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mr5num" label="在学人数">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.mr5num"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delSecTackStu(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button type="primary" size="small" @click="addSecTackStu()">
          <i class="el-icon-plus"></i>新增
        </el-button>
      </div>
      <div>
        <p>说明：1.获学位人数含全日制研究生（双证）、同等学力申请学位（单证）等所有研究生；在学人数以2017年12月31日在学全日制研究生数为准.</p>
        <p>2.“博/硕导人数”仅统计具有博/硕导资格，且2017年12月31日仍指导博/硕士研究生的导师（导师指导的全部学生均已毕业的不计入内），“硕导人数”包括既指导硕士又指导博士的导师.</p>
      </div>
      <!--提交-->
      <div class="btns t-center">
        <el-button type="primary" size="small" @click="submitForm()">保存线上草稿箱</el-button>
        <el-button type="primary" size="small" @click="submitForm()">提交</el-button>
        <el-button  size="small" @click="resetForm()">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      edit: Object,
    },
    data(){
      return {
        formLabelWidth:'250px',
        labelPosition:'left',
      }
    },
    methods: {
      submitForm() {
        alert('submit!');
      },
      resetForm() {
        alert('reset')
      },
      addSecTackStu(){
        var tempSecForm = {
          codeAndName:'',
          autnDrTime:'',
          dr5degreeNum:'',
          dr5num:'',
          autnMrTime:'',
          mr5degreeNum:'',
          mr5num:'',
        }
        this.edit.secTackStu.push(tempSecForm);
      },
      delSecTackStu(index,row){
        console.log(index,row);
        this.edit.secTackStu.splice(index,1);
      }
    }
  }
</script>

<style scoped>
</style>