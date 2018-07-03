import axios from 'axios'
import {evil} from '@/utils/evil'
export default {
  loadData ({commit}) {
    axios.get('http://music.henshui.com/api/musicList.js?!234').then(res => {
      let musicList = evil(res.data)
      commit('SET_MUSIC_LIST', musicList)
    })
  }
}
