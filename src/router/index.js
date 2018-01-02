import Vue from 'vue'
import Router from 'vue-router'
import Log from '@/pages/log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app.log',
      component: Log,
        redirect: '/home/degree/home',
    }, {
      path: '/home',
      name: 'app.home',
      component: (resolve) => {
        require(['@/pages/home'], resolve)
      },
      redirect: '/home/degree/home',
      children: [

          { path:'degree/home', name:'app.home.degree.home',component: (resolve) => {require(['@/pages/degree/home'], resolve)}},
          { path:'degree/apply', name:'app.home.degree.apply',component: (resolve) => {require(['@/pages/degree/apply'], resolve)}},
          { path:'degree/degree-info', name:'app.home.degree.degree-info',component: (resolve) => {require(['@/pages/degree/degree-info'], resolve)}},


          { path:'board/banner', name:'app.home.board.banner',component: (resolve) => {require(['@/pages/board/banner'], resolve)}},
          { path:'board/marquee', name:'app.home.board.marquee',component: (resolve) => {require(['@/pages/board/marquee'], resolve)}},
          { path:'board/news', name:'app.home.board.news',component: (resolve) => {require(['@/pages/board/news'], resolve)}},

          { path:'main/production', name:'app.home.main.production',component: (resolve) => {require(['@/pages/main/production'], resolve)}},
          { path:'main/index', name:'app.home.main.index',component: (resolve) => {require(['@/pages/main/index'], resolve)}},
          { path:'main/select', name:'app.home.main.select',component: (resolve) => {require(['@/pages/main/select'], resolve)}},
          { path:'main/popular', name:'app.home.main.popular',component: (resolve) => {require(['@/pages/main/popular'], resolve)}},
          { path:'main/hot', name:'app.home.main.hot',component: (resolve) => {require(['@/pages/main/hot'], resolve)}},
          { path:'main/search', name:'app.home.main.search',component: (resolve) => {require(['@/pages/main/search'], resolve)}},


          { path:'sys/version', name:'app.home.sys.version',component: (resolve) => {require(['@/pages/sys/version'], resolve)}},
          { path:'sys/user', name:'app.home.sys.user',component: (resolve) => {require(['@/pages/sys/user'], resolve)}},

          { path:'fund/config', name:'app.home.fund.config',component: (resolve) => {require(['@/pages/fund/config'], resolve)}},
          { path:'fund/config-edit', name:'app.home.fund.config-edit',component: (resolve) => {require(['@/pages/fund/config-edit'], resolve)}},
          { path:'fund/configOverview-edit', name:'app.home.fund.configOverview-edit',component: (resolve) => {require(['@/pages/fund/configOverview-edit'], resolve)}},
          { path:'fund/configInfo-edit', name:'app.home.fund.configInfo-edit',component: (resolve) => {require(['@/pages/fund/configInfo-edit'], resolve)}},

          { path:'deal/channel', name:'app.home.deal.channel',component: (resolve) => {require(['@/pages/deal/channel'], resolve)}},

          { path:'remind/word', name:'app.home.remind.word',component: (resolve) => {require(['@/pages/remind/word'], resolve)}},
      ]
    }
  ]
})
