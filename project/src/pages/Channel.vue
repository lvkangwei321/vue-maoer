<template>
  <div id="channel">
    <div class="channel-wall">
      <div class="channel-body">
        <div class="channel-title">{{channelRes.name}}</div>
        <div class="channel-detail">
          <span class="channel-intro">{{channelRes.sintro}}</span>
          <div class="channel-btn"></div>
        </div>
      </div>
      <div class="channel-wrap" :style="{background:'url('+ channelRes.bigpic +')'}"></div>
    </div>
    <div class="tabs">
      <ul class="tab-list">
        <router-link :to="'./intro'" tag="li" class="tab" active-class="active" exact>动态</router-link>
        <router-link :to="'./comments'" tag="li" class="tab" active-class="active" exact>评论</router-link>
        <router-link :to="'./admins'" tag="li" class="tab" active-class="active" exact>成员</router-link>
      </ul>
      <div class="comments-num">({{num}})</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { get ,post} from "utils/http.js";
export default {
  data() {
    return {
      id: "",
      channelRes: "",
      num:0
    };
  },
  async mounted() {
    this.id = this.$route.params.id;
    var res = await get({
      url: `/api/mobileWeb/getChannel?channelid=${this.id}`
    });
    if(!res.success){
        this.$router.replace('/sound/223692')
    }
    this.channelRes = res.info.channel;
    var hotRes = await post("/api/site/getcomment", {
      order: 1,
      pagesize: 10,
      eId: this.id,
      type: 4,
      p: 1
    });
    if(hotRes.successVal.comment.num === undefined){
      return false
    }
  this.num = hotRes.successVal.comment.num + 5
  
  }
};
</script>

<style lang="stylus" scoped>
#channel {
  width: 100%;
  height: 100%;

  .active {
    color: #c14a3f;
    border-color: #c14a3f;
    border-bottom: 1px solid;
  }

  .channel-wall {
    height: 2.3rem;
    background-color: #fff;
    display: block;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    color: #fff;

    .channel-body {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.5));
      padding: 10px;
      overflow: hidden;
      left: 0;
      right: 0;
      top: 0;
      display: block;
      position: absolute;
      bottom: 0;
      z-index: 1;

      .channel-title {
        display: block;
        position: relative;
        width: 100%;
        text-align: center;
        font-size: 16px;
      }

      .channel-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        height: 28px;
        padding: 0 10px;

        .channel-btn {
          display: inline-block;
          position: relative;
          height: 24px;
          line-height: 22px;
          width: 60px;
          border: 1px solid #fff;
          border-radius: 12px;
          background-color: rgba(0, 0, 0, 0.8);
        }

        .channel-btn:after {
          content: '+ \5173\6CE8';
          display: block;
          position: absolute;
          top: 0;
          left: 0.08rem;
          right: 0;
          bottom: 0;
          font-size: 11px;
          color: #fff;
        }
      }
    }

    .channel-wrap {
      left: -20px;
      display: block;
      position: absolute;
      right: -20px;
      top: -20px;
      bottom: -20px;
      z-index: 0;
      background-position: 50% !important;
      background-repeat: no-repeat !important;
      background-size: 100% 100% !important;
    }
  }

  .tabs {
    position relative
    .comments-num{
      position absolute
      top .09rem
      left 54%
    }
    .tab-list {
      display: flex;
      margin: 0;
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      height: 40px;
      justify-content: space-between;
      font-size: 12px;
      margin: 6px 0;
      overflow-x: scroll;
      overflow-y: hidden;
      line-height: 40px;

      .tab {
        width: 0.8rem;
        transition: color 0.2s ease, border-color 0.2s ease;
        position: relative;
        font-size: 12px;
        display: inline-block;
        text-align: center;
        flex: 1 0 auto;
        cursor: pointer;
        z-index: 0;
      }

      .tab:before {
        content: '';
        display: block;
        position: absolute;
        top: 10px;
        left: 0;
        border-left: 1px solid #e0e0e0;
        height: 18px;
      }

      .tab:after {
        content: '';
        width: 74px;
        height: 100%;
        display: block;
        position: absolute;
        bottom: 0;
        margin: 0 calc(((100% - 74px) / 2));
        border-bottom: 2px solid transparent;
        z-index: 1;
      }
    }
  }
}
</style>