<template>
  <div id="live">
      <div class="live-cont">
          <div class="live-item"
          v-for="item in res"
          :key="item.id"
          >
              <img :src="item.background.image_url" alt="">
              <div class="name">{{item.name}}</div>
              <div class="username">{{item.creator_username}}</div>
              <div class="info">
                  <div class="accumulation">
                      --
                  </div>
                  <div class="status">
                      暂无直播
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
methods: {
    handleClick(){

    }
},
async mounted() {
   var  res = await get({
       url:`/ajax/chatroom/search?q=%E9%AD%94%E9%81%93%E7%A5%96%E5%B8%88&p=1&page_size=10`
   })  
   this.res = res.info.roomlist
},

}
</script> 

<style lang='stylus' scoped>
#live
    .live-cont 
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 10px;
        position: relative;
        min-height: calc(100vh - 160px);
        .live-item 
            position: relative;
            width: calc(50vw - 22px);
            display: inline-block;
            margin: 5px;
            padding: 0;
            img 
                width: 100%;
                height: calc(50vw - 22px);
                display: block;
                overflow: hidden;
                position: relative;
                border-radius: 4px;
                background-repeat: no-repeat;
                background-position: 50%;
                background-size: 100%;
            .name 
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-top: 5px;
                color: #3d3d3d;
                font-size: 14px;
            .username
                margin-bottom: 10px;
                color: #757575;
                font-size: 12px;
                line-height: 18px;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            .info 
                display: flex;
                position: absolute;
                top: calc(50vw - 52px);
                right: 0;
                left: 0;
                align-items: center;
                justify-content: space-between;
                height: 30px;
                overflow: hidden;
                background: linear-gradient(0deg,rgba(0,0,0,.5),transparent);
                .accumulation
                    height: 18px;
                    margin-left: 10px;
                    color: #fff;
                    font-size: 10px;
                    line-height: 18px;
                .accumulation:before 
                    background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                    background-position: -44px -14px;
                    background-size: 56px 55px;
                    content: "";
                    display: inline-block;
                    width: 11px;
                    height: 9px;
                    margin-right: 4px;
                .status 
                    width: 76px;
                    height: 18px;
                    border-radius: 9px 0 0 9px;
                    background-color: #757575;
                    color: #fff;
                    font-size: 10px;
                    line-height: 18px;
                    text-align: center;
                .status:before 
                    background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
                    background-position: -43px -44px;
                    background-size: 56px 55px;
                    content: "";
                    display: inline-block;
                    width: 11px;
                    height: 9px;
                    margin-right: 4px;
</style>