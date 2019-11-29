<template>
  <router-link :to="id" href class="soundsItem" :data-id="item.id" tag="div">
    <img :src="getImgUrl(item.cover_image)" alt v-if="item.front_cover === undefined" />
    <img :src="item.front_cover" alt v-else />
    <div class="title">{{item.soundstr}}</div>
    <div class="itemDetails">
      <span
        class="play-times"
        v-if="parseInt(item.view_count) >= 10000"
      >{{(item.view_count / 10000).toFixed(1)}} 万</span>
      <span class="play-times" v-else>{{(item.view_count) }}</span>
      <span
        class="comments"
        v-if="parseInt(item.comment_count) >= 10000"
      >{{(item.comment_count / 10000).toFixed(1)}} 万</span>
      <span class="comments" v-else>{{item.comment_count}} {{item.all_comments}}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  props: ["item"],
  methods: {
    getImgUrl(url) {
      if (url == undefined) {
        return false;
      }
      var url = "https://static.missevan.com/coversmini/" + url;
      return url;
    },
    handleClick() {
      var id = this.item.id;
      this.$router.replace({ path: `sound/${id}` });
    }
  },
  mounted() {
    this.id = "/sound/" + this.item.id;
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