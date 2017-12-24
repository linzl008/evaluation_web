<template>
  <div class="side-bar">
    <el-menu :default-active="activeRouteName" :unique-opened="true" theme="dark" @open="navOpen" @close="navClose" @select="navSelect" :router="true">
      <template v-for="(menu,index) in menus">
        <template v-if="menu.items.length > 0">
          <el-submenu :index="String(index)">
            <template slot="title">
              <i class="iconfont" :class="[menu.menu_icon]"></i>
              {{menu.menu_name}}
            </template>
            <el-menu-item :index="subMenu.menu_url" v-for="(subMenu, index) in menu.items" :route="{name: subMenu.menu_url}" :key="index">
              <!--<i class="iconfont" :class="[subMenu.menu_icon]"></i>-->
              {{subMenu.menu_name}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="menu.menu_url" :route="{name: menu.menu_url}">
            {{menu.menu_name}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
  // import { mapState } from 'vuex'

  export default {
    name: 'side-bar',

    components: {
      [Menu.name]: Menu,
      [Submenu.name]: Submenu,
      [MenuItem.name]: MenuItem,
      [MenuItemGroup.name]: MenuItemGroup
    },

    computed: {
      menus () {
        return this.$store.state.menuList.menus
      },
      activeRouteName () {
        return this.$store.state.route.name
      }
    },

    methods: {
      navOpen (index) {
      },

      navClose () {

      },

      navSelect (index) {
        this.isActive = false
      },

      openMenu () {
        this.isActive = !this.isActive
      },

      logout () {
        this.$router.replace({name: 'login'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .side-bar {
    height: 100%;
    text-indent: 10px;
    text-align: left;
    .el-menu {
      height: 100%;
      background-color: #324157;
      color: azure;
      .el-submenu__icon-arrow {
        top: 60%
      }
      .el-submenu__title {
        font-size: 14px;
        height: 50px;
        text-align: left;
        color: white;
      }

      .el-menu-item {
        /*font-size: 16px;*/
        font-size: 13px;
        padding-right: 0;
        height: 45px;
        line-height: 45px;
        color: white;
        background-color: #212c3b;
      }

      .el-menu-item:hover, .el-submenu__title:hover {
        background-color: rgba(141, 141, 141, 0.2);
      }

      .el-menu-item.is-active {
        background-color: rgba(141, 141, 141, 0.2);
        /*font-weight: bolder;*/
        color: #1bbcff;
      }
    }
  }
</style>



