<template>
  <div class="intro">
    <div class="sound-list">
      <div class="sound-item" 
      v-for="(item,index) in res"
      :key="item.id"
      :index="index"
      :item="item"
      @click="handleClick(item)"
      >
          <div class="cover">
            <img :src="item.front_cover" alt="">
          </div>
          <div class="detail">
            <div class="title hot" v-if="index<3">
                {{item.soundstr}}
            </div>
              <div class="title" v-else>
                {{item.soundstr}}
            </div>
            <div class="statistics">
            <span
              class="play-times"
              v-if="parseInt(item.view_count) >= 10000"
            >{{(item.view_count / 10000).toFixed(1)}} 万</span>
            <span class="play-times" v-else>{{(item.view_count) }}</span>
            <div class="duration">{{item.duration | toTime()}}</div>
          </div>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {get} from 'utils/http.js'
export default {
  data() {
    return {
      res:[]
    }
  },
  async mounted() {
    var res = await get({
      url:`/api/mobileWeb/getchanneldetail?&order=3&channel_id=${this.$route.params.id}`
    })
    this.res= res.info.Datas
  },
  methods: {
    handleClick(item){
      this.$router.push(`/sound/${item.id}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
.intro 
  .sound-list 
    .sound-item:after
      content: "";
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 10px;
      border-bottom: 1px solid #e0e0e0; 
    .sound-item 
      position: relative;
      height: 70px;
      width: 100%;
      padding: 0;
      margin: .2rem .2rem
      display flex
      .cover 
        display: block;
        overflow: hidden;
        position: relative;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
        img 
          border-radius: 4px;
          height: 50px;
          width: 50px;
    .detail 
      margin-left .18rem
      .title 
        color: #424242;
        height: 36px;
        word-break: break-all;
        box-orient: vertical;
        position relative
        width 3rem
        line-height: 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
      .hot  
        padding-left .12rem
      .hot:before 
        content: "";
        display: block;
        position: absolute;
        height: 12px;
        left 0
        top 2px
        width: 12px;
        background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
        background-position: -44px 0;
        background-size: 56px 55px;
      .play-times 
        font-size: 12px;
        color: #9e9e9e;
        margin-right: 20px;
        padding-left: 18px;
        width: 66px;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        position: relative;
      .play-times:before 
        background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
        background-position: -44px -27px;
        background-size: 56px 55px;
        content: "";
        display: block;
        position: absolute;
        left: 2px;
        top: 3px;
        height 12px
        width: 12px;
      .duration
        font-size: 12px;
        color: #9e9e9e;
        margin-right: 20px;
        padding-left: 18px;
        width: 66px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        position: relative;
      .duration:before
        background-image: url(//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
        background-size: 56px 55px;
        content: "";
        display: block;
        position: absolute;
        left: 2px;
        background-position: -29px -44px;
        height 12px
        top: 3px;
        width: 12px;
</style>