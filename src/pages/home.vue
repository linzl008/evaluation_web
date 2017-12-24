<template>
  <div class="home">
    <my-header :logType="true"></my-header>
    <div class="content-wrap">
      <div class="side">
        <side-bar></side-bar>
      </div>
      <div class="view">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from '@/components/my-header'
  import SideBar from '@/components/side-bar'

  export default {
    name: 'home',

    components: {
      SideBar,
      MyHeader
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec;
    background-color: #eef1f6;
    color: #3a3a3a;
    padding: 8px 0;
  }
  .el-table td, .el-table th {
    padding: 5px 0;
  }
  .line{
    height: 2px;
    margin: 7px 0 10px 0;
    background-color: lightgray
  }
  .noline{
    margin: 7px 0 10px 0;
  }
  /*修复element-ui v-modal显示bug*/
  .v-modal {
    z-index: 1000 !important;
  }
  .view .el-tabs.el-tabs--top{
    padding-bottom: 50px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-submenu__title i{
    color: #f8f8f8;
  }
  /*修正table的modal 显示高于弹窗*/
  .el-loading-mask{
    z-index:999;
  }
  .el-form-item__label{
    font-weight: 800 !important;
  }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;

  .side{
    height: 100%;
    position: fixed;
    top:45px;
    width: 200px;
  }
  .content-wrap {
    height: 100% ;
  }

  .view {
    margin-left: 200px;
    padding: 75px 25px 25px 25px;
    height: 100%;
    background-color: #f1f2f7;
  }
  }

  .fade-enter-active {
    transition: all ease .5s;
    opacity: 1;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(20px);
  }
</style>



