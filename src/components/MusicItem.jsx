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
    deleteMusicItem(musicItem){

    }
  },
  render(){
    return (
      <li class={`components-listitem row ${this.focus? 'focus':''}`}>
        <p>{this.musicItem.title} - {this.musicItem.artist}</p>
        <p class="lrclink -col1"><router-link to="/lrc">歌词</router-link></p>
        <p class="-col-auto delete" onClick={this.deleteMusicItem.bind(this.musicItem)}></p>
      </li>
    )
  }
}
