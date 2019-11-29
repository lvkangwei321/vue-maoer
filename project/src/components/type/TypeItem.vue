<template>
          <div class="tags-outer" >
          <div class="tags-img">
            {{index}}
          </div>
          <div class="tag-list">
          <div class="tag-item" 
          v-for="(tItem,itemIndex) in tagItem"
          :class="{'active': tItem[0] == $route.params.id}"
          :key="tItem.id"
          :index="itemIndex"
          @click="handleClick(tItem)"
          >{{tItem[1]}}</div>
          </div>
          </div>
</template>

<script>
import { Bus } from "utils/bus.js";
export default {
props:["item","index"],
data() {
  return {
    tagItem : [],
    id:0
  }
},
methods: {
  handleClick(item){
     Bus.$emit("changeShow", false);
    this.$router.push({
      path:`/albums/${item[0]}`,
      query:{
        data:`${item[1]}`
      }
    })
  }
},
mounted() {
  this.tagItem = this.item
},
}
</script>

<style lang = "stylus" scoped>
.active 
  border 1px solid black !important
.tags-outer:nth-of-type(2)
  .tags-img:before
    background-position -38px -108px
.tags-outer:nth-of-type(3)
  .tags-img:before
    background-position -76px -108px
.tags-outer
  display flex
  margin-top .14rem
  align-items center
  .tags-img
    width 1rem
    text-align center
    line-height 100%
    font-size .16rem
    color #757575
    padding 0 .26rem
    margin-top .14rem
  .tags-img:before
    background-image: url(https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
    background-position: 0 -108px;
    background-size: 262px 234px;
    content: "";
    display: block;
    position: relative;
    margin: 0 auto;
    height: 36px;
    width: 36px;
  .tag-list
    display flex
    flex-wrap wrap
    margin-left .12rem
    .tag-item
      width 1.57rem
      height .46rem
      border 1px solid #e1e1e1
      border-top none
      box-sizing border-box
      text-align center
      line-height .46rem
    .tag-item:last-child
      border-bottom none
</style>