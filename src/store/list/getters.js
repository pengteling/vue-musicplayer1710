export default {
  currentItem: (state, getters) => {
    return state.musicList[state.currentIndex] ? state.musicList[state.currentIndex] : {}
  }
}
