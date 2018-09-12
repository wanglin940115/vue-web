import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui组件
import ElementUI from 'element-ui'
// 引入axios
import axios from 'axios'
// 引入字体图标样式
import './assets/fonts/iconfont.css'
// 导入全局的样式表
import './assets/css/global.css'
// 把element-ui安装到vue身上
// 配置axios
axios.defaults.baseURL = 'https://www.escook.cn:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
