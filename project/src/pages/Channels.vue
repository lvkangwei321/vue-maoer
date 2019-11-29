<template>
  <div id="channels">
      <div class="sub-header">
          频道
      </div>
      <div class="channels-cont">
          <div class="channels-item" v-for="item in res"
          :key="item.id"
          @click="handleClick(item)"
          >
              <div class="cover" :style="{background:'url('+ item.smallpic  +')'}">
                  <div class="follow">
                      <span class="num">{{item.follow_num}}</span>
                  </div>
              </div>
              <div class="title">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import {get} from 'utils/http.js'
export default {
    data() {
        return {
            res :[]
        }
    },
async mounted() {
  var res =  await get({
        url:"/api/mobileWeb/channels?type=2"
    })
    this.res = res.info
},
methods: {
    handleClick(item){
        this.$router.push(`/channel/${item.id}`)
    }
},
}
</script>

<style lang="stylus" scoped>
#channels
    .sub-header 
        height: .4rem
        width 100%
        text-align center
        line-height .4rem
        font-size .2rem
        border-bottom: 1px solid #e0e0e0;
    .channels-cont 
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        padding: 12px;
        position: relative;
        min-height: calc(100vh - 160px);
        .channels-item 
            height: 150px;
            width: 170px;
            padding: 0;
            .cover 
                width: 100%;
                height: 106px;
                display: block;
                overflow: hidden;
                position: relative;
                border-radius: 4px;
                background-repeat: no-repeat !important
                background-position: 50% !important
                background-size: 100% !important
            .follow 
                position: absolute
                top: 0
                right: 0
                background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2))
                width: 80px
                height: 20px
                padding: 0 5px
                text-align: right
                border-top-right-radius: 4px
                .num 
                    float: right;
                    display: inline-block;
                    position: relative;
                    height: 20px;
                    line-height: 20px;
                    padding-left: 18px;
                    color: #fff;
                    font-size: 12px;
                    text-shadow: 0 1px 1px rgba(0,0,0,.7);
                .num:before
                    content: "";
                    position: absolute;
                    top: 4px;
                    left: 0;
                    width: 15px;
                    height: 13px;
                    background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                    background-position: -18px -26px;
                    background-size: 56px 55px;
</style>