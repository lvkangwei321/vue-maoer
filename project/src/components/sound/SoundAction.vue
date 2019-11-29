<template>
  <div id="sound-action">
    <ul class="action-cont">
      <li class="share" @click="handleAppClick">
        <i></i>
        <span>分享</span>
      </li>
      <li class="like">
        <i></i>
        <span>喜欢</span>
      </li>
      <li class="download" @click="handleAppClick">
        <i></i>
        <span>下载</span>
      </li>
      <div v-if="videoExist" class="video-cont">
        <span class="video" v-if="!changeMedia" @click="handleClick">
          <i></i>
          <span>视频</span>
        </span>
        <li class="music" v-else @click="handleClick">
          <i></i>
          <span>音频</span>
        </li>
      </div>
    </ul>
    <div class="btn-open">用客户端打开</div>
  </div>
</template>

<script>
import { Bus } from "utils/bus.js";

export default {
  data() {
    return {
      videoExist: false,
      changeMedia: false
    };
  },
  mounted() {
    Bus.$on("videoArg", data => {
      this.videoExist = data;
    });
  },
  methods: {
    handleClick() {
      this.changeMedia = !this.changeMedia;
      Bus.$emit("fullArg", this.changeMedia);
    },
    handleAppClick() {
      this.$router.push("/download");
    }
  }
};
</script>

<style lang="stylus" scoped>
#sound-action {
  display: flex;
  align-items: center;
  padding: 0.14rem 0.12rem 0.1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #fff;
  margin-top: 0.2rem;

  .action-cont {
    display: flex;
    justify-content: space-around;
    width: 2.59rem;
    align-items: center;

    .share i {
      background-position: -149px -74px;
    }

    .like i {
      background-position: 0 -146px;
    }

    .download i {
      background-position: -74px -146px;
    }

    .music i {
      background-position: -148px -146px;
    }
    .video i {
      background-position: -186px 0;
      background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png');
      display: block; 
      background-size: 262px 234px;
      width: 35px;
      height: 35px;
    }
  }
  .video-cont{
    width: 0.39rem;
    height: 0.54rem;
    text-align: center;
    padding: 0 0.02rem;
    font-size: 0.1rem;
  }
  .action-cont li {
    width: 0.39rem;
    height: 0.54rem;
    text-align: center;
    padding: 0 0.02rem;
    font-size: 0.1rem;
  }

  .action-cont li i {
    display: block;
    background-size: 262px 234px;
    width: 35px;
    height: 35px;
    background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
  }

  .btn-open {
    width: 1.2rem;
    height: 0.32rem;
    margin-left: 0.08rem;
    border-color: #ed7760;
    background-color: #ed7760;
    text-align: center;
    border-radius: 3px;
    font-size: 0.12rem;
    line-height: 0.2rem;
    padding: 0.06rem 0.18rem;
    color: #fff;
  }
}
</style>