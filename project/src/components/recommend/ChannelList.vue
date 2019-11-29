<template>
  <div class="panel-sounds">
    <div class="panel-head">
      <div class="panel-title">
        <i></i>频道
      </div>
      <div class="panel-nav">
        <a href="javascript:void(0)"  @click="handleClick">更多</a>
      </div>
    </div>

    <div class="panel-body">
      <ChannelItem v-for="(item,index) in channelList" :key="item.id" :index="index" :item="item"></ChannelItem>
    </div>
  </div>
</template>

<script>
import ChannelItem from "components/recommend/ChannelItem.vue";
export default {
  props: ["channelList"],
  components: {
    ChannelItem
  },
  methods: {
    handleClick(){
      this.$router.push('/channels')
    }
  },
};
</script>

<style lang = "stylus" scoped>
.panel-sounds {
  margin: 0.1rem 0;

  .panel-head {
    width: 100%;
    padding: 0 0.2rem;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .panel-title {
      display: flex;
      align-items: center;
      font-size: 0.16rem;

      i {
        background: url('https://static.missevan.com/assets/m/images/build/sprite-icons-catalog@2x.4584f6ff.png');
        display: block;
        width: 0.26rem;
        height: 0.26rem;
        background-size: 1.66rem 1.66rem;
        background-position: -1.12rem 0;
      }
    }

    .panel-nav {
      a {
        font-size: 0.13rem;
        color: #9e9e9e;
      }
    }

    .panel-nav:after {
      background-size: 262px 234px;
      background-position: -223px -132px;
      width: 18px;
      height: 18px;
      background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons@2x.bfd3fcc1.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.bfd3fcc1.png)
      content: '';
      display: inline-block;
      position: relative;
      top: 4px;
      right: -3px;
    }
  }

  .panel-body {
    margin: 0 0.2rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>