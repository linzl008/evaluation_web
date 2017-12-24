// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import {sync} from 'vuex-router-sync'
import plugins from '@/plugins'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './styles/app.scss'
import Config from '@/api/config'
import './styles/base.scss'

//注入http
Vue.prototype.$http = Config.axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
plugins() 
Config.setting(router);

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
