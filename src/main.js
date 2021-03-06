import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import host from '../config/host'
import ajax from './api/base'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'

// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import Echart from 'echarts'

// var echarts = require('echarts');


// import axios from 'axios';


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.prototype.host = host;
Vue.prototype.ajax = ajax;
Vue.prototype.Echart = Echart;

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }

  if(from.path === '/currentOrder'){
    console.log(from);
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }

  if(user && user.role !== 'master'){
    if(to.path === "/hotelSetting" || to.path === "/accountSetting"){
      next({ path: '/404' });
    }else{
      next()
    }
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

