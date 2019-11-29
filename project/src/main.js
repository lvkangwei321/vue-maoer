import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import reset from 'assets/reset.css'
import mySwiper from 'assets/swiper.css'
import animation from 'assets/animation.css'
import Vuex from 'vuex'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Vuex)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App) 
})
Vue.filter('toTime', function (data) {
  if (data <= 60000) {
    data = "0:" + parseInt(data)
  } else {
    if (parseInt(data % 60000) < 10000) {
      data = parseInt(data / 60000) + ":0" + parseInt(data % 60000)
    } else {
      data = parseInt(data / 60000) + ":" + parseInt(data % 60000)
    }
  }
  data = data.substring(0, 4)
  return data
})