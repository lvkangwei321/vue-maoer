<template>
  <div class="albums-item" @click="handleClick">
    <div class="albums-cover">
      <img src="https://static.missevan.com/assets/m/images/build/album-cover.efe70663.png" alt />
    </div>
    <img :src="item.front_cover" alt class="item-img" />

    <div class="sound-num">
      <span>
        <div class="sound-img"></div>
        {{item.music_count}}
      </span>
    </div>
    <div class="title">{{item.title}}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleClick() {
      this.$router.push(`/album/${this.item.id}`);
    }
  }
};
</script>

<style lang="stylus" scoped>
.albums-item {
  position: relative;
  height: 2.11rem;
  width: 1.83rem;
  margin-left: 0.2rem;

  .albums-cover {
    position: absolute;

    img {
      width: 1.83rem;
      height: 1.83rem;
    }
  }

  .item-img {
    position: absolute;
    top: 0.1rem;
    height: 1.65rem;
    width: 1.65rem;
  }

  .sound-num span {
    position: absolute;
    right: 0.15rem;
    bottom: 0.35rem;
    padding-right: 0.1rem;
    text-shadow: 0.5px 0 1px #000;
    height: 0.36rem;
    line-height: 0.36rem;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.26));
    z-index: 10;
    font-size: 0.12rem;
    color: #fff;
    width: 1.69rem;
    text-align: right;
  }

  .sound-img {
    position: absolute;
    right: 0.3rem;
    bottom: 0.13rem;
    height: 0.11rem;
    width: 0.13rem;
    background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png');
    background-position: 0 -0.44rem;
    background-size: 0.56rem 0.55rem;
  }

  .title {
    position: absolute;
    width: 100%;
    top: 1.78rem;
    color: #616161;
    font-size: 0.13rem;
  }
}
</style>