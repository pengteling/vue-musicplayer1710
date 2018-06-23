import {EventBus} from '@/EventBus'
export default {
  name:'MusicItem',
  props:{
    musicItem:{
      type:Object,
      required:true
    },
    currentIndex:{
      type:Number
    },
    focus:{
      type:Boolean
    }
  },
  methods:{
    deleteMusicItem(musicItem, e){
      e.stopPropagation()
      EventBus.$emit('deleteMusicItem', musicItem)
    },
    changeMusicItem(musicItem){
      EventBus.$emit('changeMusicItem',musicItem)
    }
  },
  render(){
    return (
      <li class={`components-listitem row ${this.focus? 'focus':''}`} onClick={()=>{
        if(!this.focus){
          this.changeMusicItem(this.musicItem)
        }
      }
      }>
        <p>{this.musicItem.title} - {this.musicItem.artist}</p>
        <p class="lrclink -col1"><router-link to="/lrc">歌词</router-link></p>
        <p class="-col-auto delete" onClick={this.deleteMusicItem.bind(this,this.musicItem)}></p>
      </li>
    )
  }
}
