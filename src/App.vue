<template>
  <div id="app">
    <router-view name="header"></router-view>
    <Mplayer
      url="http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
      :paused="true"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import {MUSIC_LIST} from '@/data/musicList'
import Mplayer from '@/components/Mplayer'
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
      currentTime: 0,
      duration: 0
    }
  }
}
</script>

<style>

</style>
