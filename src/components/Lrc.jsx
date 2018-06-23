import './Lrc.scss'
import { EventBus } from '@/EventBus'
import {parseLrc} from '@/utils/parseLrc'
export default {
  name: 'Lrc',
  data(){
    return {
      lrc:[],
      currentTime:0,
      curli:0
    }
  },
  mounted(){
    EventBus.$on('setLrc', lrc=>{
      console.log(lrc)
      this.lrc = parseLrc(lrc)
    })
    EventBus.$on('getCurrentTime', currentTime => {
      this.currentTime = currentTime
      if(currentTime<0.5){
        this.curli=0
      }
    })
  },
  updated(){
    //console.log("updated")
    //console.log(this.$refs.cur)
    let h = this.$refs.cur.offsetTop -245
    this.$refs.lrcul.scrollTop = h

  },
  render(){
    let curClass='cur'
    let lrcList = this.lrc.map((item,i)=>{

      if( item[0]<= this.currentTime && i>=this.curli ){
        this.curli = i
        curClass='cur'

      } else{
        curClass='normal'
      }

      return (
        <li class={curClass} key={i} data-time={item[0]} ref={curClass === 'cur' ? 'cur':''}>
          {item[1]}
        </li>
      )
    })
    return (
      <div class="lrc-component">
        <ul ref="lrcul">
          {lrcList}
        </ul>
      </div>
    )
  }
}
