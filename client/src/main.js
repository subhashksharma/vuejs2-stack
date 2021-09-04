import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/css/global.css"
import * as uiv from 'uiv'

import store from '@/app-store/AppCentralStore';
import router from '@/app-routers/AppRouter.js';

//ENV is the command line param passed when running or building the app
const endpoints = require(`./app-configs/endpoints-${ ENV }`).default;
import config from './app-configs/app-config.js'


//setup mixins as global
Vue.mixin(endpoints); 
Vue.mixin(config);
Vue.use(uiv);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
