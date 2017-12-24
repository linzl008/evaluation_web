<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  //此处使用 sessionStorage
//  async beforeCreate () {
//    const token = sessionStorage.getItem('token')
//    if (token) {
//      await this.$store.dispatch('setToken', token)
//    }
//  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 50px;*/
}
.add{
  padding-left: 15px;
  padding-right: 15px;
}
</style>
