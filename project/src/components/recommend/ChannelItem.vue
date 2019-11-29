<template>
  <a href="javascript:void(0)" class="channel-item" @click="handleClick(item)">
    <div
      class="item-img"
      :style="{background: 'url('+ item.smallpic +')',backgroundPosition : '50%',backgroundSize:'100%',backgroundRepeat:'no-repeat'} "
    >
      <div class="follow">{{item.follow_num}}</div>
    </div>
    <div class="title">{{item.name}}</div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    index: Number
  },
  methods: {
    handleClick(item){
      this.$router.push(`/channel/${item.id}`)
    }
  },
};
</script>

<style lang = "stylus" scoped>
.channel-item {
  display: block;

  .item-img {
    width: 1.79rem;
    height: 1.19rem;
    border-radius: 0.04rem;
    position: relative;
  }

  .follow {
    color: #fff;
    float: right;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
    margin-right: 0.05rem;
  }

  .follow:before {
    content: '';
    position: absolute;
    display: block;
    top: 0.04rem;
    right: 0.4rem;
    width: 0.15rem;
    height: 0.13rem;
    background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.c71cb7b7.png');
    background-position: -0.18rem -0.26rem;
    background-size: 0.56rem 0.55rem;
  }

  .title {
    color: #616161;
    font-size: 0.13rem;
    margin-top: 0.03rem;
    width: 100%;
    height: 0.4rem;
  }
}
</style>