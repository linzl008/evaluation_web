<template>
  <div class="train-direction">
    <el-form :model="edit"  :label-position="labelPosition" label-width="formLabelWidth" >
      <h3 class="title">学科简介（限1000字）</h3>
      <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 15}" :maxlength="1000" placeholder="学科简介（限1000字）" v-model="edit.subjectIntro">
      </el-input>
      <h3  class="title">学科方向与特色 </h3>
      <el-table
              :data="edit.subjectsInfo"
              style="width: 100%">
        <el-table-column prop="direction" label="学科方向名称" width="200">
          <template slot-scope="scope">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" size="mini" v-model="scope.row.direction"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="主要研究领域、特色与优势（限200字）">
            <template slot-scope="scope">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" :maxlength="200" size="mini" v-model="scope.row.intro"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delSubjectsInfo(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add">
        <el-button type="primary" size="small" @click="addSubjectsInfo">新增</el-button>
      </div>
      <div class="btns t-center">
        <el-button type="primary" size="small" @click="submitForm('baseForm')">保存线上草稿箱</el-button>
        <el-button type="primary" size="small" @click="submitForm('baseForm')">提交</el-button>
        <el-button  size="small" @click="resetForm('baseForm')">重置</el-button>
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
      addSubjectsInfo(){
        console.log('enter')
        var tempInfos = {
          direction:'',
          intro:''
        }
        this.edit.subjectsInfo.push(tempInfos);
      },
      delSubjectsInfo(index,row){
        console.log(index,row);
        this.edit.subjectsInfo.splice(index,1);
      }
    }
  }
</script>

<style scoped>
</style>