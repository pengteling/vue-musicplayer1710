<template>
  <div id="app">
    <router-view name="header"></router-view>
    <Mplayer
      :url="currentItem.file"
      :paused="paused"
      :changeTime="changeTime"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import {EventBus} from '@/EventBus'
import {MUSIC_LIST} from '@/data/musicList'
import Mplayer from '@/components/Mplayer'
import './comm.scss'
// import MusicItem from './components/MusicItem'
export default {
  name: 'App',
  components: {
    Mplayer
  },
  data () {
    return {
      musicList: MUSIC_LIST,
      currentIndex: 0,
      paused: true,
      repeatType: 'cycle',
      changeTime: 0
      // currentTime: 0,
      // duration: 0
    }
  },
  computed: {
    currentItem () {
      return this.musicList[this.currentIndex]
    }
  },
  watch: {
    'currentItem' (val) {
      EventBus.$emit('setMedia', val)
    },
    '$route' (to, form) {
      if (to.name === 'List') {
        this.$nextTick(() => {
          EventBus.$emit('getList', {
            musicList: this.musicList,
            currentIndex: this.currentIndex
          })
        })
      }
      if (to.name === 'Player') {
        this.$nextTick(() => {
          EventBus.$emit('setMedia', this.currentItem)
        })
      }
    }
  },
  methods: {
    prevNextHandler (type) {
      // console.log(type)
      let currentIndex = this.currentIndex
      let num = this.musicList.length
      let repeatType = this.repeatType
      if (repeatType === 'cycle' || repeatType === 'once') {
        if (type === 'prev') {
          currentIndex = (currentIndex - 1 + num) % num
        } else {
          currentIndex = (currentIndex + 1) % num
        }
      } else {
        /* 随机播放 */
        if (num > 1) {
          let rd = (currentIndex) => {
            let newIndex = Math.floor(Math.random() * num)
            if (newIndex === currentIndex) {
              return rd(currentIndex)
            } else {
              return newIndex
            }
          }
          currentIndex = rd(currentIndex)
        }
      }

      this.currentIndex = currentIndex
    }
  },
  mounted () {
    EventBus.$emit('setMedia', this.currentItem)
    EventBus.$on('changeCurrentTime', time => {
      this.changeTime = time
    })
    EventBus.$on('playPause', paused => {
      this.paused = paused
    })
    EventBus.$emit('getList', {
      musicList: this.musicList,
      currentIndex: this.currentIndex
    })
    EventBus.$on('changeMusicItem', musicItem => {
      let curIndex = this.musicList.findIndex(item => item === musicItem)
      console.log(curIndex)
      this.currentIndex = curIndex
      EventBus.$emit('getList', {
        musicList: this.musicList,
        currentIndex: this.currentIndex
      })
    })
    EventBus.$on('changeRepeatType', val => {
      this.repeatType = val
    })
    EventBus.$on('prevNext', type => {
      this.prevNextHandler(type)
    })
  }

}
</script>

<style>

</style>
