import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI,{
  size: 'mini', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
});
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
import VChart from "../../components/VChart.vue"; //引入全局对象Catagory侧滑
Vue.component("VChart", VChart);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
