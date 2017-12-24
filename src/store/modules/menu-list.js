/**
 * Created by Linzl on 2017/09/26.
 */
import * as types from '../mutation-types'

const state = {
  'menus': [
    { 'menu_name': '公告资讯', 'menu_url': '', 'menu_icon': 'icon-gonggao',
      'items': [
        {'menu_name': 'banner与介绍', 'menu_url': 'app.home.board.banner'},
        {'menu_name': '跑马灯', 'menu_url': 'app.home.board.marquee'},
        {'menu_name': '资讯管理', 'menu_url': 'app.home.board.news'},
      ]
    },
    { 'menu_name': '主页面板块内基金', 'menu_url': '', 'menu_icon': 'icon-caidan',
      'items': [
        {'menu_name': '热门产品', 'menu_url': 'app.home.main.production'},
        {'menu_name': '指数宝', 'menu_url': 'app.home.main.index'},
        {'menu_name': '基金精选', 'menu_url': 'app.home.main.select'},
        {'menu_name': '人气之选', 'menu_url': 'app.home.main.popular'},
        {'menu_name': '热门关注', 'menu_url': 'app.home.main.hot'},
        {'menu_name': '热门搜索配置', 'menu_url': 'app.home.main.search'},
      ]
    },
    { 'menu_name': '标签页内容基金', 'menu_url': '', 'menu_icon': 'icon-caidan',
      'items': [
        {'menu_name': '优选量化', 'menu_url': 'app.home.tab.quantity'},
        {'menu_name': '优选指数', 'menu_url': 'app.home.tab.index'},
        {'menu_name': '优选定投', 'menu_url': 'app.home.tab.plan'},
        {'menu_name': '优选货基', 'menu_url': 'app.home.tab.base'},
        {'menu_name': '人气之选', 'menu_url': 'app.home.tab.popular'},
        {'menu_name': '热门关注', 'menu_url': 'app.home.tab.hot'},
        {'menu_name': '基金经理', 'menu_url': 'app.home.tab.manager'},
      ]
    },
    { 'menu_name': '全部基金', 'menu_url': '', 'menu_icon': 'icon-jijin',
      'items': [
        {'menu_name': '基金配置', 'menu_url': 'app.home.fund.config'},
      ]
    },
    { 'menu_name': '交易管理', 'menu_url': '', 'menu_icon': ' icon-match',
      'items': [
        {'menu_name': '交易渠道管理', 'menu_url': 'app.home.deal.channel'},
      ]
    },
    { 'menu_name': '提示性文字', 'menu_url': '', 'menu_icon': ' icon-content',
      'items': [
        {'menu_name': '提示性文字', 'menu_url': 'app.home.remind.word'},
      ]
    },
    { 'menu_name': '系统管理', 'menu_url': '', 'menu_icon': 'icon-setting',
      'items': [
        {'menu_name': '版本管理', 'menu_url': 'app.home.sys.version'},
        {'menu_name': '用户管理', 'menu_url': 'app.home.sys.user'},
      ]
    },

  ]
}

const mutations = {
  [types.ADD_TO_MENU] (state, { menuItem }) {
    state.data.push(menuItem)
  }
}

export default {
  state,
  mutations
}
