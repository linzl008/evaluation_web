<template>
  <div class="targetStandard">
    <el-form :model="edit"  :label-position="labelPosition" label-width="formLabelWidth">
      <h3 class="title">培养目标（培养目标和定位）</h3>
      <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 15}" placeholder="请输入培养目标" v-model="edit.target">
      </el-input>
      <h3  class="title">学位标准（授予博士、硕士学位的具体要求）</h3>
      <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 15}" placeholder="请输入学位标准" v-model="edit.standard">
      </el-input>
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
    }
  }
</script>

<style scoped>
</style>