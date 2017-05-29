//基本插件依赖
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)

/* 注册全局组件 */
import bbtsInput from './components/bbtsInput.vue'
import bbtsSearchBox from './components/bbtsSearchBox.vue'
import bbtsForm from './components/bbtsForm.vue'
import bbtsTable from './components/bbtsTable'
import bbtsPageJump from './components/bbtsPageJump'
import bbtsDialog from './components/bbtsDialog'

Vue.component("bbts-search-box",bbtsSearchBox)
Vue.component("bbts-input",bbtsInput)
Vue.component("bbts-form",bbtsForm)
Vue.component("bbts-table",bbtsTable)
Vue.component("bbts-page-jump",bbtsPageJump)
Vue.component("bbts-dialog", bbtsDialog)

import App from './App'//入口文件
import routes from './config/routes'//路由文件

// 使用路由文件配置规则
const router = new VueRouter({
  routes
})

// 跑起来吧
new Vue({
  router:router,
  el: '#app',
  render: (h) => h(App)
})
