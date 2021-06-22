import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: {},
    currentPath: '',
    connected: false
  },
  mutations: {
    refreshList: function(state, arg) {
      state.dataList = arg
    },
    refreshPath: function(state, arg) {
      state.currentPath = arg
    },
    setConnection: function(state, arg){
      localStorage.setItem('connection', arg.toString())
      state.connected = arg
    },
    getConnection: function(state){
      var item = localStorage.getItem('connection')
      if(item == 'false')
        state.connected = false
      else
        state.connected = true
    },
  }
})