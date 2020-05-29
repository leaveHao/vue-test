import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入ant-design-vue UI库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

//引入全局样式
import 'assets/css/base.css'

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
