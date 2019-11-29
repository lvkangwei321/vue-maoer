<template>
  <a href="javascript:void(0)" class="soundsItem" v-on:click="handleClick">
    <img :src="item.front_cover" alt />
    <div class="title">{{item.soundstr}}</div>
    <div class="itemDetails">
      <span class="play-times">{{item.view_count_formatted}}</span>
      <span class="comments">{{item.all_comments}}</span>
    </div>
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
    handleClick() {
      var id = this.item.id;
      this.$router.push({ path: `sound/${id}` });
    }
  }
};
</script>

<style lang = "stylus" scoped>
.soundsItem {
  width: 1.06rem;
  height: 1.63rem;
  margin: 0.05rem;
  display: block;
  color: #616161;
  font-size: 0.13rem;

  img {
    width: 1.06rem;
    height: 1.06rem;
    border-radius: 0.04rem;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .title {
    width: 100%;
    height: 0.36rem;
    width: 1.06rem;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    box-orient: vertical;
    line-clamp: 2;
    line-height: 0.18rem;
    margin: 0.04rem 0;
  }

  .itemDetails {
    font-size: 0.11rem;
    line-height: 0.11rem;
    display: flex;
    width: 1.06rem;
    justify-content: space-between;
    color: #bdbdbd;

    .play-times {
      display: flex;
      align-items: center;
    }

    .play-times:before {
      background: url('//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.c71cb7b7.png');
      background-size: 0.56rem 0.55rem;
      background-position: -0.29rem -0.44rem;
      content: '';
      display: block;
      height: 0.1rem;
      width: 0.12rem;
      margin-right: 0.02rem;
    }

    .comments {
      display: flex;
      align-items: center;
    }

    .comments:before {
      background: url('//static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.c71cb7b7.png');
      background-size: 0.56rem 0.55rem;
      background-position: -0.44rem -0.27rem;
      content: '';
      display: block;
      height: 0.1rem;
      width: 0.12rem;
      margin-right: 0.02rem;
    }
  }
}
</style>