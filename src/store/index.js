import Vuex from 'vuex'
import Vue from 'vue'
import list from './list/index'
import player from './player/index'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    list,
    player
  }
})
