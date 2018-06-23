<template>
  <ul>
    <MusicItem
      v-for="(item,index) in musicList"
      :key="item.id"
      :musicItem="item"
      :focus="index===currentIndex"
    />
  </ul>
</template>
<script>
import MusicItem from './MusicItem'
import {EventBus} from '@/EventBus'
export default {
  components: {
    MusicItem
  },
  data () {
    return {
      musicList: [],
      currentIndex: 0
    }
  },
  created () {
    EventBus.$on('getList', data => {
      console.log(data)
      this.musicList = data.musicList
      this.currentIndex = data.currentIndex
    })
  }
}
</script>
