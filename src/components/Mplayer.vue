<template>
  <audio
    :src="url"
    ref="audio"
    @loadedmetadata="loadedmetadata"
    @timeupdate="timeupdate"
  />

</template>
<script>
export default {
  data () {
    return {
      duration: 0,
      currentTime: 0
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    paused: {
      type: Boolean,
      required: true
    },
    volume: {
      default: 80
    },
    // curTime:{
    //   type:Number
    // }
    changeTime: {
      type: Number
    }
  },
  watch: {
    'paused' () {
      this.playPause()
    },
    'volume' (val) {
      this.changeVolume(val)
    },
    'curTime' (val, oldVal) {
      if (Math.abs(val - oldVal) > 1) {
        this.changeCurrentTime(val)
      }
    },
    'changeTime' (val) {
      this.changeCurrentTime(val)
    }
  },
  computed: {
    audio () {
      return this.$refs.audio
    }
  },
  methods: {
    playPause () {
      if (this.audio.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    changeVolume (volume) {
      this.audio.volume = (volume / 100) * (volume / 100)
    },
    loadedmetadata () {
      this.duration = this.audio.duration
      this.$emit('getDuration', this.duration)
    },
    timeupdate () {
      this.currentTime = this.audio.currentTime
      this.$emit('getCurrentTime', this.currentTime)
    },
    changeCurrentTime (time) {
      this.currentTime = time
      this.audio.currentTime = time
    }

  }
}
</script>
