<template>
  <div>
    <div
      class="commic"
      @click="handleSendClick"
      :style="{background: 'url(' + imgurl +')'}"
      :class="{'full-screen': fullScreen,'bg-video' : changeMedia}"
    >
      <img
        :src="introRes.front_cover "
        alt
        v-if="this.introRes !== undefined && !this.changeMedia && this.bgImg === ''"
      />
      <!-- <img :src="imgRes[0].front_cover " alt v-else-if="this.bgImg == null " /> -->
      <img :src="bgImg " alt v-else class="bgImg"/>
      <!-- <img :src="bgImg " alt v-else /> -->
      <div
        class="controller"
        :class="{'send-nowrap' : !show , 'full-btn' : fullScreen}"
        @click.stop="handleController"
      >
        <div class="btn-play" :class="[controllerShow? '':'suspend']"></div>
      </div>
      <div class="send-wrap" :class=" {'send-nowrap': !show , 'full-send': fullScreen}">
        <form action class="send-input">
          <input type="text" placeholder="来点弹幕啊~" class="text-area" />
          <input type="submit" value="发送" class="btn-send" />
          <button class="btn-toggle" type="button"></button>
          <button
            type="button"
            class="full"
            v-if="videoExist && changeMedia"
            @click.stop="handleFullClick"
          ></button>
        </form>
      </div>
    </div>
    <div id="audio">
      <video
        ref="video"
        v-if="changeMedia"
        class="video"
        playsinline
        @timeupdate="updateTime"
        :class="{'full-video': fullScreen}"
        @click="show = !show"
      >
        <source :src="introRes.videourl" type="video/mp4" />
      </video>
      <audio :src="src" ref="audio" @timeupdate="updateTime" v-else></audio>
      <div
        class="progress-bar"
        @click="handleProgressClick"
        ref="progress"
        @touchmove="handleProgressTouch"
      >
        <div class="loaded" :style="{'width':this.loadedWidth}"></div>
        <div class="played" :style="{'width':this.playedWidth}">
          <div class="draggable"></div>
        </div>
      </div>
      <div class="sound-time">
        <span class="played-time">{{format(currentTime)}}</span>
        <span class="total-time">{{duration}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http.js";
import { Bus } from "utils/bus.js";
export default {
  props: ["id"],
  data() {
    return {
      show: true,
      controllerShow: true,
      introRes: [],
      imgurl: "",
      src: "",
      media: "",
      duration: 0,
      currentTime: 0,
      playedWidth: 0,
      loadedWidth: 0,
      imgRes: [],
      bgImg: "",
      videoExist: false,
      changeMedia: false,
      fullScreen: false,
      totalWidth: 0
    };
  },
  methods: {
    handleProgressTouch(e) {
      this.totalWidth = this.$refs.progress.offsetWidth;
      var percent = (e.touches[0].pageX / this.totalWidth) * 100 + "%";
      this.playedWidth = percent;
      if (this.$refs.audio != undefined) {
        this.$refs.audio.currentTime =
          this.media.duration * (e.touches[0].pageX / this.totalWidth);
      } else {
        this.$refs.video.currentTime =
          this.media.duration * (e.touches[0].pageX / this.totalWidth);
      }
    },
    handleProgressClick(e) {
      if (e.target.className !== "progress-bar") {
        return false;
      }
      this.totalWidth = this.$refs.progress.offsetWidth;
      var percent = (e.offsetX / this.totalWidth) * 100 + "%";
      this.playedWidth = percent;
      if (this.$refs.audio != undefined) {
        this.$refs.audio.currentTime =
          this.media.duration * (e.offsetX / this.totalWidth);
      } else {
        this.$refs.video.currentTime =
          this.media.duration * (e.offsetX / this.totalWidth);
      }
    },
    handleFullClick() {
      this.fullScreen = !this.fullScreen;
    },
    format(interval) {
      interval = interval | 0;
      var minute = (interval / 60) | 0;
      var second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return `${minute}:${second}`;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      if (this.imgRes != undefined) {
        if (this.imgRes.length === 1) {
          this.bgImg = this.imgRes[0].front_cover;
          return false;
        }
        for (var i = 0; i < this.imgRes.length; i++) {
          if (i === this.imgRes.length - 1) {
            break;
          }
          if (
           Number(this.currentTime) >= this.imgRes[i].stime &&
           Number(this.currentTime) < this.imgRes[i + 1].stime
          ) {
            this.bgImg = this.imgRes[i].front_cover;
          }
        }
      }
      var timeRanges = e.target.buffered;
      if (timeRanges.length !== 0) {
        this.loadedWidth =
          (timeRanges.end(timeRanges.length - 1) / this.media.duration) * 100 +
          "%";
      }
      this.playedWidth = (this.currentTime / this.media.duration) * 100 + "%";
    },
    handleSendClick() {
      this.show = !this.show;
    },
    handleController() {
      this.controllerShow = !this.controllerShow;
      if (this.controllerShow) {
        this.media.pause();
      } else {
        this.media.play();
      }
    }
  },
  async mounted() {
    this.introRes = await get({
      url: `/api/sound/getsound?soundid=${this.$route.params.id}`
    });
    if(!this.introRes.success){
      this.$router.replace('/sound/223692')
      return false
    }
    this.src =
      "https://static.missevan.com/MP3/" + this.introRes.info.sound.soundurl;
    this.media = this.$refs.audio;
    this.media.load();
    this.media.oncanplay = function() {
      if (this.media.duration <= 60) {
        this.duration = "0:" + parseInt(this.media.duration);
      } else {
        if (parseInt(this.media.duration % 60) < 10) {
          this.duration =
            parseInt(this.media.duration / 60) +
            ":0" +
            parseInt(this.media.duration % 60);
        } else {
          this.duration =
            parseInt(this.media.duration / 60) +
            ":" +
            parseInt(this.media.duration % 60);
        }
      }
    }.bind(this);
    this.introRes = this.introRes.info.sound;
    this.imgurl =
      "https://static.missevan.com/mosaic/" + this.introRes.cover_image;
    var imgRes = await get({
      url: `/api/sound/getSortedImage?soundid=${this.$route.params.id}`
    });
    this.imgRes = imgRes.info;
    if (this.introRes.videourl !== "") {
      this.videoExist = true;
    }
    Bus.$emit("videoArg", this.videoExist);
    Bus.$on("fullArg", async data => {
      this.changeMedia = data;
      await this.$nextTick();
      if (!this.changeMedia) {
        this.media = this.$refs.audio;
      } else {
        this.media = this.$refs.video;
      }
      this.controllerShow = true;
    });
  },
  watch: {
    async changeMedia() {}
  }
};
</script>

<style lang = "stylus" scoped>
.bgImg{
  border-radius : 0 !important
  background-repeat: no-repeat !important
  background-size: 100% 100% !important
}
#audio {
  position: relative;

  .video {
    width: 100%;
    position: absolute;
    top: -2.9rem;
    visibility: visible;
  }

  .sound-time {
    position: absolute;
    bottom: -0.14rem;
    left: 0;
    top: 0.05rem;
    width: 100%;
    font-size: 0.09rem;
    color: #a6a6a6;
    height: 0.14rem;
    line-height: 0.12rem;
    padding: 0.01rem 0.05rem;
    pointer-events: none;

    .played-time {
      font-size: 0.09rem;
      color: #a6a6a6;
      height: 0.14rem;
      line-height: 0.12rem;
      padding: 0.01rem 0.05rem;
      pointer-events: none;
    }

    .total-time {
      font-size: 0.09rem;
      color: #a6a6a6;
      height: 0.14rem;
      line-height: 0.12rem;
      padding: 0.01rem 0.05rem;
      pointer-events: none;
      float: right;
    }
  }

  .progress-bar {
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 4px;
    padding: 1px 0;
    z-index: 4;
    cursor: none;
    user-select: none;
  }

  .progress-bar:before {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    right: 0;
    bottom: -2px;
    left: 0;
  }

  .loaded {
    background-color: #b2b2b2;
    width: 0;
    position: absolute;
    top: 1px;
    left: 0;
    height: 2px;
  }

  .played {
    background-color: #e63c3c;
    width: 0;
    position: absolute;
    top: 1px;
    left: 0;
    height: 2px;

    .draggable {
      position: absolute;
      top: -7px;
      right: -7px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 4px solid rgba(0, 0, 0, 0.3);
      cursor: pointer;
      user-select: none;
    }

    .draggable:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}

.commic {
  height: 3.43rem;
  display: flex;
  width: 4.14rem;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;
  background: url('https://static.missevan.com/mosaic/201701/22/81ff3c90c111f9d44c1ed72c4662ad5c011424.jpg');

  img {
    position: absolute;
    left: 20%;
    width: 2.5rem;
    height: 2.5rem;
    bottom: 20%;
    border-radius: 50%;
  }

  .controller {
    position: absolute;
    z-index: 5;
    right: 0.1rem;
    bottom: 0.6rem;
    width: 0.48rem;
    height: 0.3rem;
    background-color: hsla(0, 0%, 84%, 0.4);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s ease;
    display: flex;
    justify-content: center;

    .btn-play {
      width: 0.28rem;
      height: 0.28rem;
      background: url('https://static.missevan.com/assets/m/images/build/sprite-icons-sound@2x.8414b2aa.png');
      background-size: 120px 102px;
      margin-left: 1px;
      background-position: -75px 0;
    }
  }

  .send-wrap {
    position: relative;
    bottom: -1.5rem;
    width: 100%;
    padding: 0.12rem 0.1rem;
    background: #3d3d3d;
    transition: all 0.5s ease;

    .send-input {
      display: flex;
    }
  }
}

.text-area {
  float: left;
  height: 0.28rem;
  border: none;
  flex: 1;
  border-radius: 4px 0 0 4px;
  padding-left: 0.08rem;
  text-align: left;
  line-height: normal;
  color: #bdbdbd;
  background: #757575;
}

.btn-send {
  height: 0.28rem;
  width: 0.45rem;
  padding: 0.06rem 0.11rem;
  background: #757575;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 0.12rem;
  color: #bdbdbd;
}

input::placeholder {
  color: #bdbdbd;
}

.btn-toggle {
  height: 0.28rem;
  width: 0.28rem;
  position: relative;
  float: right;
  border: none;
  border-radius: 4px;
  background: #5d5d5d;
  margin-left: 0.1rem;
  color: #bdbdbd;
  font-size: 0.12rem;
}

.btn-toggle:before {
  background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-sound@2x.8414b2aa.png'); // static.missevan.com/assets/m/images/build/sprite-icons-sound@2x.8414b2aa.png)
  background-position: -30px -44px;
  background-size: 120px 102px;
  content: '';
  width: 0.24rem;
  height: 0.24rem;
  position: absolute;
  left: 0;
  top: 0;
}

.full {
  height: 28px;
  width: 28px;
  position: relative;
  float: right;
  margin-left: 0.1rem;
  border: none;
  border-radius: 4px;
  background: #5d5d5d;
  color: #bdbdbd;
  font-size: 12px;
}

.full:before {
  background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons-sound@2x.8414b2aa.png'); // static.missevan.com/assets/m/images/build/sprite-icons-sound@2x.8414b2aa.png);
  background-size: 120px 102px;
  background-position: 0 -74px;
  content: '';
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0;
  top: 0;
}

.full-send {
  bottom: -3rem !important;
}

.full-screen {
  height: 100vh !important;
}

.full-video {
  top: -4.5rem !important;
}

.full-btn {
  bottom: 1rem !important;
}

.bg-video {
  background: black !important;
}

.send-nowrap {
  transform: translate(0, 0.52rem);
}

.suspend {
  background-position: -75px -30px !important;
}
</style>