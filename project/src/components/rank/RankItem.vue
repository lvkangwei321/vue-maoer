<template>
  <div class="rank-item" @click="handleClick(item)">
    <div class="album">
      <div class="album-bg"></div>
      <img :src="coverImg" class="album-img" />
      <div class="sound-num">
        <span>{{item.album.music_count}}</span>
      </div>
    </div>
    <ul class="rank-list">
      <li
        class="list-item"
        v-for="(rItem,index) in rankItem"
        :key="rItem.id"
        :index="index"
      >{{index+1}} {{rItem.soundstr}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleClick(item) {
      this.$router.push(`/album/${item.album.id}`);
    }
  },
  data() {
    return {
      coverImg: "",
      rankItem: []
    };
  },
  mounted() {
    this.coverImg =
      "https://static.missevan.com/coversmini/" + this.item.album.cover_image;
    this.rankItem = this.item.sounds;
  }
};
</script>

<style lang="stylus" scoped>
.rank-item {
  height: 1.3rem;
  display: flex;
  padding: 0.1rem;
  justify-content: space-around;
  position: relative;
  align-items: center;

  .album {
    position: relative;
    width: 1.12rem;
    height: 1rem;
    margin: 0.05rem 0.03rem;

    .album-bg {
      display: block;
      position: absolute;
      width: 1.12rem;
      height: 1.12rem;
      padding-bottom: 100%;
      background: url('https://static.missevan.com/assets/m/images/build/album-cover.efe70663.png') no-repeat; // static.missevan.com/assets/m/images/build/album-cover.efe70663.png) no-repeat;
      background-size: contain;
      z-index: -1;
    }

    .album-img {
      width: 100px;
      height: 100px;
      overflow: visible;
      background-color: #e0e0e0;
      z-index: 100;
      display: block;
    }

    .sound-num {
      position: absolute;
      bottom: 0;
      right: 0.15rem;
      font-size: 0.12rem;
      color: #fff;
    }

    .sound-num span:before {
      content: '';
      display: block;
      position: absolute;
      margin: 4px 0 3px;
      height: 11px;
      right: 0.15rem;
      width: 13px;
      background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
      background-position: 0 -44px;
      background-size: 56px 55px;
    }
  }

  .rank-list {
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    align-items: center;
    width: 2.36rem;

    tex, .list-item {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #9e9e9e;
    }
  }
}

.rank-item:before {
  content: '';
  display: block;
  position: absolute;
  width: 90%;
  bottom: 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>