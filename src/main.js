import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 配置请求的根路径
axios.default.baseURL = 'http://127.0.0.1:8090/mcs/'
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
