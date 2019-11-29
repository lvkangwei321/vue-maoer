<template>
  <div class="admins">
    <div class="admins-title">
      频道管理员 (1)
    </div>
    <div class="admins-cont">
      <div class="admins-item"
      v-for="item in res"
      :key="item.id"
      @click="handleClick(item)"
      >
        <div class="cover" :style="{background: 'url('+ item.boardiconurl2 +')'}">

        </div>
        <div class="name">
          {{item.username}}
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
    url:`/api/mobileWeb/channeladmin?channel_id=${this.$route.params.id}`
  })
  this.res = res.info
},
methods: {
  handleClick(item){
    console.log(item)
    window.open(`https://www.missevan.com/${item.id}/sound`)
  }
},
}
</script>

<style lang="stylus" scoped>
.admins 
  height 60VH
  .admins-title:after 
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -12px;
    right: -12px;
    border-bottom: 1px solid #e0e0e0;
  .admins-title 
    padding-left .1rem
    display: block;
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 22px;
    font-size: 12px;
  .admins-cont 
    display flex
    width: 100%;
    padding: 10px;
    .admins-item 
      position: relative;
      height: 70px;
      width: 70px;
      margin: 0;
      text-align: center;
      .cover 
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: auto;
        display: block;
        overflow: hidden;
        position: relative;
        background-repeat: no-repeat !important
        background-position: 50% !important
        background-size: 100% !important

    .admins-item:before 
      content: "";
      display: block;
      position: absolute;
      right: 10px;
      top: 36px;
      z-index: 1;
      height: 15px;
      width: 15px;
      background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
      background-position: -247px 0;
      background-size: 262px 234px;
</style>