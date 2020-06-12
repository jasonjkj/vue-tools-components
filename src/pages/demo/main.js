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

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
stockInit(Highcharts)

import Highcharts3D from 'highcharts/highcharts-3d';
import Drilldown from 'highcharts/modules/drilldown.js'
import Exporting from 'highcharts/modules/exporting.js'

Highcharts3D(Highcharts);
Drilldown(Highcharts)
Exporting(Highcharts)
Vue.use(HighchartsVue)

Vue.config.productionTip = false
console.log(process.env);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
