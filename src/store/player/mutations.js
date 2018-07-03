import * as Types from './mutation-types'
export default {
  [Types.CHANGE_PROGRESS] (state, progress) {
    state.changeTime = progress * state.duration
  },
  [Types.CHANGE_VOLUME] (state, volume) {
    state.volume = volume * 100
  },
  [Types.PLAY_PAUSE] (state) {
    state.paused = !state.paused
  }
}
