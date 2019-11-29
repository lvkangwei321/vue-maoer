import Vue from 'vue'
import Vuex from 'vuex'
var store = require('store')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:store.get('token'),
    username:store.get('username')
  },
  mutations: {
    increment(state,username){
      state.username = username
    }
  },
  actions: {
    changeUsername({commit },payload){
     commit('increment',payload.username)
    }
  },
  modules: {
  }
})
