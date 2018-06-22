<template>
<div class="player-page">
  <h2 class="caption">
    <router-link to="/list">我的私人音乐坊 &gt;</router-link>
  </h2>
  <div class="mt20 row">
    <div class="controll-wrapper">
      <h2 class="music-title">
        <router-link to="/lrc">{{ currentItem.title }}</router-link>
        <!-- <a href="/lrc">风继续吹</a> -->
      </h2>
      <h3 class="music-artist mt10">{{ currentItem.artist }}</h3>
      <div class="row mt20">
        <div class="left-time -col-auto">-05:02</div>
        <div class="volume-container">
          <i
            class="icon-volume rt"
            style="top: 5px; left: -5px;"
          ></i>
            <div class="volume-wrapper">
              <div class="components-progress">
                <div
                  class="progress"
                  style="width: 80%; background: rgb(170, 170, 170);"
                ></div>
            </div>
        </div>
      </div>
    </div>
    <div style="height: 10px; line-height: 10px;">
      <div class="components-progress">
        <div
          class="progress"
          style="width: 2.64284%; background: rgb(47, 152, 66);"
        ></div>
    </div>
  </div>
  <div class="mt35 row">
    <div><i class="icon prev"></i><i class="icon ml20 pause"></i><i class="icon next ml20"></i></div>
    <div class="-col-auto"><i class="icon repeat-cycle"></i></div>
  </div>
</div>
<div class="-col-auto cover"><a href="/lrc"><img class="play" src="http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.jpg" alt="风继续吹"></a></div>
</div>
</div>
</template>

<script>
// import { formatTime } from '@/utils/formatTime'
import {EventBus} from '@/EventBus'
export default {
  name: 'Player',
  data () {
    return {
      currentItem: {},
      repeatType: 'cycle',
      paused: true,
      currentTime: 0,
      duration: 0,
      volume: 80
    }
  },
  created () {
    EventBus.$on('setMedia', (currentItem) => {
      this.currentItem = currentItem
    })
    EventBus.$on('getDuration', (duration) => {
      this.duration = duration
    })
    EventBus.$on('getCurrentTime', (currentTime) => {
      this.currentTime = currentTime
    })
  }
}
</script>

<style lang="scss">
.player-page {
  width: 700px;
  margin: auto;
  margin-top: 120px;
  .caption a {
    font-size: 16px;
    color: rgb(47, 152, 66);
    text-decoration: none;
  }
  .cover {
    width: 180px;
    height: 180px;
    margin-left: 20px;
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      &.play {
        animation-play-state: running;
      }
      &.pause {
        animation-play-state: paused;
      }
      animation: rotate 15s linear forwards infinite;
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  .volume-container {
    position: relative;
    left: 20px;
    top: -3px;
  }
  .volume-container .volume-wrapper {
    opacity: 0;
    transition: opacity .5s linear;
  }
  .volume-container:hover .volume-wrapper {
    opacity: 1;
  }
  .music-title {
    font-size: 25px;
    font-weight: 400;
    color: rgb(3, 3, 3);
    height: 36px;
    line-height: 36px;
  }
  .music-artist {
    font-size: 15px;
    font-weight: 400;
    color: rgb(74, 74, 74);
  }
  .left-time {
    font-size: 14px;
    color: #999;
    font-weight: 400;
    width: 40px;
  }
  .icon {
    cursor: pointer;
  }
  .ml20 {
    margin-left: 20px;
  }
  .mt35 {
    margin-top: 35px;
  }
  .volume-wrapper {
    width: 60px;
    display: inline-block;
  }
}
</style>
