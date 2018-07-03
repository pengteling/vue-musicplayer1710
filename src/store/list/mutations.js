// import { SET_MUSIC_LIST } from './mutation-types'
import * as Types from './mutation-types'
export default {
  [Types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [Types.CHANGE_REPEAT_TYPE] (state) {
    let newRepeatType
    switch (state.repeatType) {
      case 'cycle':
        newRepeatType = 'once'
        break
      case 'once':
        newRepeatType = 'random'
        break
      default:
        newRepeatType = 'cycle'
    }
    state.repeatType = newRepeatType
  },
  [Types.PREV_NEXT] (state, type) {
    let currentIndex = state.currentIndex
    let num = state.musicList.length
    let repeatType = state.repeatType
    // console.log(currentIndex, num, repeatType)
    if (repeatType === 'cycle' || repeatType === 'once') {
      if (type === 'prev') {
        currentIndex = (currentIndex - 1 + num) % num
      } else {
        currentIndex = (currentIndex + 1) % num
      }
    } else {
      let rd = (currentIndex) => {
        let newIndex = Math.floor(num * Math.random())
        if (newIndex === currentIndex) {
          return rd(currentIndex)
        } else {
          return newIndex
        }
      }
      currentIndex = rd(currentIndex)
    }
    state.currentIndex = currentIndex
  }
}
