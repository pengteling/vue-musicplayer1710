import { formatTime } from '@/utils/formatTime'
export default {
  leftTime (state) {
    return formatTime(state.duration - state.currentTime)
  },
  currentPercentAbsolute (state) {
    return state.currentTime / state.duration * 100
  }
}
