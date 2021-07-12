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


import './style.css'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';



Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);



Vue.config.productionTip = false
console.log(process.env);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
