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
    }
  },
  methods: {

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
  }

}
</script>

<style>

</style>
