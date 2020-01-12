import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import './mock/mock'
import './mock/users'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
