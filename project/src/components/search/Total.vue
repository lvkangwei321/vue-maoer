<template>
  <div class="sound-list">
    <div
      @click="handleClick(sonItem)"
      class="sound-item"
      v-for="sonItem in searchRes"
      :key="sonItem.id"
    >
      <div class="cover">
        <img :src="sonItem.front_cover" alt />
      </div>
      <div class="details">
        <div class="title">{{sonItem.soundstr}}</div>
        <div class="username">UP主： {{sonItem.username}}</div>
        <div class="statistic">
          <span
            class="play-times"
            v-if="parseInt(sonItem.comment_count) >= 10000"
          >{{(sonItem.comment_count / 10000).toFixed(1)}} 万</span>
          <span class="play-times" v-else>{{(sonItem.comment_count) }}</span>
          <div class="duration">{{sonItem.duration | toTime()}}</div>
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
      searchRes:[],
    }
  },
  async mounted() {
      this.handleSearch(this.$route.params.id)
  },
  methods: {
   async handleSearch(value){
     var value = encodeURI(value);
     var searchRes = await get({
       url:`/api/sound/getsearch?s=${value}&type=3&page_size=10&p=1`
     })
         this.searchNavRes = searchRes.info.navs
     this.searchRes = searchRes.info.Datas
     await this.$nextTick()
    },
      handleClick(item){
    this.$router.push(`/sound/${item.id}`)
  }
  },
};
</script>

<style lang='stylus' scoped>
.sound-list 
    position relative
    .sound-item 
        height: 90px;
        position relative
        .cover img
            height: 70px;
            width: 70px;
            border-radius: 4px;
            margin: 10px;
            float: left;
        .details 
            .title 
                font-size: .16rem
                color: #616161;
                padding-top .1rem
                line-height .18rem
            .username
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                color: #9e9e9e;
            .statistic
                height: 12px;
                line-height: 12px;
                display flex
                position absolute
                bottom .1rem
                left .9rem
            .play-times
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
            .play-times:before 
                background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                background-size: 56px 55px;
                background-position: -44px -27px;
                content: "";
                display: block;
                position: absolute;
                height .12rem
                left: 2px;
                top: 1px;
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
                background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                background-size: 56px 55px;
                background-position: -29px -44px;
                content: "";
                display: block;
                position: absolute;
                height .12rem
                left: 2px;
                top: 1px;
                width: 12px;
</style>