import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player'
import List from '@/components/List'
import Lrc from '@/components/Lrc.jsx'
import Main from '@/components/Main'
import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Main,
        header: Header
      },
      children: [
        {
          path: '', component: Player, name: 'Player'
        },
        {
          path: 'lrc', component: Lrc, name: 'Lrc'
        },
        {
          path: 'list', component: List, name: 'List'
        }
      ]
    }
  ]
})
