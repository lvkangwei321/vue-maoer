<template>
  <div id="search">
    <div class="header">
      <form action class="search-input">
        <span></span>
        <input type="text" class="search" v-model="inputValue" @input="handleInput(inputValue)" @keydown.enter.prevent="handleClick(inputValue)"> 
      </form>
      <span class="btn-text" @click="handleToHome">取消</span>
    </div>
    <div  v-if="inputValue !== '' && searchRes.length !==0 && keywordsRes.length === 0" class="search-cont">
      <div class="cont-header">
        <ul class="sub-catalogs">
              <div>
              <router-link active-class="active" tag="li" :to="`/search/${$route.params.id}/total`">综合</router-link>
              <router-link
              tag="li"
              v-for="item in searchNavRes"
              active-class="active"
              :key="item.id"
              :to="`/search/${$route.params.id}/${'type'+item.type}`"
              >
              {{item.name}} ({{item.total}})  </router-link>
              </div>
          </ul>
      </div>
      <router-view :key="keyTime"></router-view>

    </div>



    
    <div class="keywords" v-else-if="keywordsRes.length !== 0">
      <div class="key"
      @click="handleClick(inputValue)"
      >
        搜索 <span>"{{inputValue}}"</span>
      </div>
        <ul class="keywords-list">
            <li class="keywords-item"
            v-for="item in keywordsRes"
            :key='item.id'
            @click="handleClick(item)"
            >
              <i class="icon"></i>
                <span>{{item}}</span>
            </li>
        </ul>
    </div>

  <div v-else>
    <div class="search-hot" >
      热门搜索
    </div>
    <div class="search-content">
      <span class="search-tag"
      v-for="item in tagRes"
      :key="item.id"
      @click="handleClick(item.key)"
      >{{item.key}}</span>
    </div>
    </div>
  </div>
</template>

<script>
import {get} from 'utils/http.js'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      tagRes:[],
      inputValue:'',
      keywordsRes:[],
      searchRes:[],
      searchNavRes:[],
      keyTime:0
    }
  },


  watch: {
    '$route.params.id'(){
    if(this.$route.params.id != undefined){
      this.keyTime = new Date().getTime();
      this.$router.push(`${this.$route.params.id}/total`)
    }
    }
  },

  async mounted() {
    var tagRes = await get({
      url:'/api/mobileWeb/hotsearch'
    })
    this.tagRes = tagRes.info
    if(this.$route.params.id){
      this.inputValue = this.$route.params.id
      this.handleSearch()
    }
  },





  methods: {
    handleSoundClick(item){
        this.$router.push(`/sound/${item.id}`)
      },



    handleToHome(){
      this.$router.push('/')
    },



  async  handleInput(){
        var keywordsRes =  await get({
        url:`/api/sound/suggest?s=${this.inputValue}`
      })
      if(keywordsRes.success === false){
        return false
      }
      this.keywordsRes = keywordsRes.info
    },



   async handleClick(item){
     console.log(item);
     
      this.inputValue = item
      this.keywordsRes = []
     await this.handleSearch()
     this.$router.push(`/search/${this.inputValue}`)
    },




   async handleSearch(){
     var value = encodeURI(this.inputValue);
     var searchRes = await get({
       url:`/api/sound/getsearch?s=${value}&type=3&page_size=10&p=1`
     })
     this.searchNavRes = searchRes.info.navs
     this.searchRes = searchRes.info.Datas
     
     await this.$nextTick()
      var scroll =  new BScroll(".sub-catalogs", {
      click: "ture",
      scrollX:true
    });
    }
  },
};
</script>

<style lang='stylus' scoped>
.active 
    color black
.active:after
    pointer-events: none;
    border-color: #000;
    content: "";
    transition: .2s ease;
    width: 100%;
    display: block;
    position: absolute;
    bottom: 1px;
    left 0
    border-bottom: 2px solid
    z-index: 1;
#search
  min-height 82VH
  .header 
    display flex
    width 100%
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    line-height: 20px;
    background-color: #000;
    .search-input 
      flex: 1 1 auto;
      display: inline-block;
      position relative
      span 
        display: block;
        position: absolute;
        top: .08rem
        left: .02rem
        width: 14px;
        height: 14px;
        background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
        background-position: -247px -87px;
        background-size: 262px 234px;
        opacity: .3;
      .search
        padding-left: 30px;
        margin: 0;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 30px;
        padding: 6px .2rem;
        background-color: #fff;
        color: #000;
        border: none;
        border-radius: 2px;
        overflow: hidden;
    .btn-text
      color #fff
      padding 0 .1rem
  .search-hot 
    display: block;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    height: 40px;
    padding: 10px;
    font-size: 14px;
    color: #424242;
  .search-hot:after
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 10px;
    border-bottom: 1px solid #e0e0e0;
  .search-content 
    display: block;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    .search-tag 
      display: inline-block;
      position: relative;
      padding: 4px 10px;
      margin: 5px 6px;
      color: #9e9e9e;
      border: 1px solid #9e9e9e;
      border-radius: 20px;
      background-color: #fff;
      font-size: 12px;
  .keywords
    .key
      display: block;
      position: relative;
      height: 40px;
      border-bottom: 1px solid #e0e0e0;
      line-height: 40px;
      padding-left .1rem
      span 
        color red
    .keywords-list
      .keywords-item
        display: block;
        position: relative;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left .1rem
        .icon 
          display: inline-block;
          position: relative;
          width: 13px;
          height: 13px;
          margin: 14px 10px 0 0;
          background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
          background-position: -247px -103px;
          background-size: 262px 234px;
          vertical-align: top;
  .search-cont 
    .cont-header 
      .sub-catalogs
        top: .4rem;
        height: 35px;
        display flex
        line-height: 35px;
        width: 100%;
        background-color: #fff;
        color #9e9e9e
        border-bottom: 1px solid #e0e0e0;
        z-index: 10;
        overflow-x: auto;
        white-space: nowrap;
        li 
          display: inline-block;
          position: relative;
          height: 100%;
          padding 0 .2rem
          text-align center
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