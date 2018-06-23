<template>
  <div id="app">
    <router-view name="header"></router-view>
    <Mplayer
      :url="fileUrl"
      :paused="paused"
      :changeTime="changeTime"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import {EventBus} from '@/EventBus'
// import {MUSIC_LIST} from '@/data/musicList'
import {evil} from '@/utils/evil'
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
      musicList: [],
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
    },
    fileUrl () {
      if (this.currentItem) {
        return this.currentItem.file
      } else {
        return ''
      }
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
          // paused
          // EventBus.$emit('sendPaused', this.paused)

          // duration
        })
      }
      if (to.name === 'Lrc') {
        this.$nextTick(() => {
          EventBus.$emit('setLrc', this.currentItem.lrc)
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
  created () {
    /* ajax的调整 */
    axios.get('/static/data/musicList.js').then(res => {
      this.musicList = evil(res.data)
      EventBus.$emit('setMedia', this.currentItem)
      EventBus.$emit('setLrc', this.currentItem.lrc)
    })
  },
  mounted () {
    // EventBus.$emit('setMedia', this.currentItem)
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
    EventBus.$on('ended', () => {
      if (this.repeatType === 'once') {
        /* this.paused = !this.paused
        this.paused = !this.paused */
        this.changeTime = 0
      } else {
        this.prevNextHandler('next')
        EventBus.$emit('getList', {
          musicList: this.musicList,
          currentIndex: this.currentIndex
        })
        /* 在LRC页面 歌曲自动下一曲的时候 需要重新发送歌词数据 */
        EventBus.$emit('setLrc', this.currentItem.lrc)
      }
    })
    EventBus.$on('deleteMusicItem', musicItem => {
      // let curIndex = this.musicList.findIndex(item => item === musicItem)
      let oldCurIndex = this.currentIndex
      // let currentIndex
      if (this.musicList.length > 1) {
        let deleteIndex = this.musicList.indexOf(musicItem)
        this.musicList = this.musicList.filter(item => item !== musicItem)
        if (oldCurIndex > deleteIndex) {
          this.currentIndex = oldCurIndex - 1
        } else if (oldCurIndex < deleteIndex) {
          // 不变
        } else {
          /* 删除当前歌曲 */
          this.currentIndex = oldCurIndex % this.musicList.length
        }
        EventBus.$emit('getList', {
          musicList: this.musicList,
          currentIndex: this.currentIndex
        })
      }
    })
    // EventBus.$emit('setLrc', this.currentItem.lrc)
  }

}
</script>

<style>

</style>
