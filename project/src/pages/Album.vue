<template>
  <div id="album">
    <div class="wall">
      <div class="wall-body">
        <img :src="src" alt />
        <div class="album-details">
          <span class="album-title">{{wallRes.title}}</span>
          <div class="logo">
            <img src="https://static.missevan.com/web_app/lazy_load.png" alt />
            <span>{{wallRes.username}}</span>
          </div>
        </div>
      </div>
      <div class="wall-blur" :style="{background: 'url('+ src +')'} "></div>
    </div>
    <div class="sound-list">
      <div class="sound-item" v-for="item in listRes" :key="item.id" @click="handleClick(item.id)">
        <div class="cover">
          <img :src="item.front_cover" alt />
        </div>
        <div class="detail">
          <div class="title">{{item.soundstr}}</div>
          <div class="statistics">
            <div class="play-times">{{item.view_count_formatted}}</div>
            <div class="duration">{{item.duration | toTime()}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http.js";
export default {
  methods: {
    handleClick(id) {
      this.$router.push(`/sound/${id}`);
    }
  },
  data() {
    return {
      listRes: [],
      wallRes: [],
      src: ""
    };
  },
  async mounted() {
    var res = await get({
      url: `/api/sound/soundalllist?albumid=${this.$route.params.id}`
    });
    if (!res.success) {
      this.$router.replace("/sound/223692");
    }
    this.listRes = res.info.sounds;
    this.wallRes = res.info.album;
    this.src =
      "https://static.missevan.com/coversmini/" + this.wallRes.cover_image;
  }
};
</script>

<style lang = "stylus" scoped>
#album {
  .wall {
    height: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;

    .wall-body {
      z-index: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      margin-top: 0.1rem;
      overflow: hidden;
      left: 0;
      right: 0;
      top: 0;
      position: absolute;
      bottom: 0;

      img {
        width: 1.1rem;
        height: 1.1rem;
      }

      .album-details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #fff;
        width: -webkit-calc(100% - 130px);
        width: calc(100% - 130px);
      }

      .album-title {
        width: calc(100% - 10px);
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        box-orient: vertical;
        line-clamp: 2;
        line-height: 25px;
        margin-left: 10px;
        margin-bottom: 0.4rem;
        font-size: 0.16rem;
      }

      .logo {
        position: relative;

        img {
          height: 25px;
          width: 25px;
          display: block;
          position: absolute;
          left: 2px;
          margin: 2px;
          border-radius: 50%;
        }

        span {
          display: block;
          position: relative;
          margin-left: 0.4rem;
          font-size: 0.16rem;
          margin-top: 0.05rem;
          width: calc(100% - 40px);
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }

    .wall-blur {
      left: -20px;
      right: -20px;
      position: absolute;
      top: -0.2rem;
      height: 1.9rem;
      bottom: -20px;
      z-index: 0;
      filter: blur(20px);
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .sound-list {
    .sound-item {
      display: block;
      position: relative;
      height: 70px;
      width: 100%;
      margin: 0;

      .cover {
        img {
          border-radius: 4px;
          height: 50px;
          width: 50px;
          margin: 10px;
          float: left;
        }
      }

      .detail {
        width: 100%;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #e0e0e0;

        .title {
          height: 36px;
          word-break: break-all;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -moz-box;
          display: -webkit-box;
          box-orient: vertical;
          color: #616161;
          line-clamp: 2;
          line-height: 18px;
          font-size: 12px;
        }

        .statistics {
          display: flex;
          height: 12px;
          line-height: 12px;

          .play-times {
            font-size: 12px;
            color: #9e9e9e;
            margin-right: 20px;
            padding-left: 18px;
            width: 66px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            position: relative;
          }

          .play-times:before {
            background-position: -44px -27px;
            background-size: 56px 55px;
            background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
            content: '';
            display: block;
            position: absolute;
            left: 2px;
            height: 0.12rem;
            top: 1px;
            width: 12px;
          }

          .duration {
            font-size: 12px;
            color: #9e9e9e;
            margin-right: 20px;
            padding-left: 18px;
            width: 66px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            position: relative;
          }

          .duration:before {
            background-position: -29px -44px;
            background-size: 56px 55px;
            background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
            content: '';
            display: block;
            position: absolute;
            left: 2px;
            height: 0.12rem;
            top: 1px;
            width: 12px;
          }
        }
      }
    }
  }
}
</style>