<template>
  <div id="soundintro">
    <div class="intro-brief">
      <h3 class="title">{{introRes.soundstr}}</h3>
      <ul class="status">
        <li class="play-times">{{introRes.view_count_formatted}}</li>
        <li class="comments">{{introRes.all_comments}}</li>
        <li class="music-id">音频ID : {{introRes.id}}</li>
      </ul>
      <div class="intro-cont">
        <p>简介:</p>
        <div v-html="introRes.intro" class="lot-intro" :class="{'intro-show':introShow}"></div>
        <div
          class="btn-expand"
          :class="{'notShow': introRes.intro != undefined && introRes.intro.split('<p>').length <= 2 ,
          'rotate':introShow
          }"
          @click="handleExpandClick"
        ></div>
      </div>
    </div>
    <div class="sound-drama" v-if="drama.success == true" @click="handleDramaClick(drama.info.drama)">
      <div class="drama-cover">
        <img :src="dramaRes.cover " alt />
      </div>
      <div class="drama-details">
        <div class="drama-title">{{dramaRes.name}}</div>
        <div class="drama-type">{{dramaRes.catalog_name}} 类型 {{dramaRes.type_name}}</div>
        <div class="drama-update">更新至 {{dramaRes.newest}}</div>
      </div>
      <div class="btn-follow"></div>
    </div>
    <div class="sound-cv" v-if="drama.success == true && person !== 0">
      <div class="title">参演cv({{person}})</div>
      <div class="cv-cont">
        <div class="cv-block" :class="{'cv-show': blockShow}">
          <div class="cv-sound" v-for="(item) in cvs" :key="item.id">
            <img :src="item.cvinfo.icon" alt />
            <div class="name">{{item.cvinfo.name}}</div>
            <div class="character">饰：{{item.character}}</div>
            <div class="group">{{item.group}}</div>
          </div>
        </div>
        <span
          class="btn-text btn-expand"
          :class="{'notShow':person<=4,'rotate':blockShow}"
          @click="handleBlockClick"
        ></span>
      </div>
    </div>
    <div class="sound-user" @click="handleUserClick">
      <img :src="introImg" alt />
      <div class="user-info">
        <div class="username" v-if="drama.success == true">{{dramaRes.username}}</div>
        <div class="username" v-else>{{introRes.username}}</div>
        <div class="publish-time">{{time}}</div>
      </div>
      <div class="btn-focus"></div>
    </div>
    <div class="sound-related">
      <div class="related-drama" v-if="drama.success == true">
        <div class="selection">剧集推荐</div>
        <div class="drama-conts">
          <div class="re-drama" v-for="item in likeDrama" :key="item.id" @click="handleDramaClick(item)">
            <img :src="item.front_cover" alt />
            <div class="title">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="related-sound">
        <div class="selection">相似音频</div>
        <div class="sound-conts">
          <MusicItem v-for="(item,index) in likeSound" :key="item.id" :index="index" :item="item"></MusicItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicItem from "components/recommend/MusicItem.vue";
import { get } from "utils/http.js";
export default {
  components: {
    MusicItem
  },
  data() {
    return {
      dramaRes: [],
      cvs: [],
      person: 0,
      time: 0,
      intro: [],
      introRes: [],
      introImg: "",
      likeDrama: [],
      likeSound: [],
      drama: [],
      introShow: false,
      blockShow: false
    };
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    handleDramaClick(item) {
      this.$router.push(`/drama/${item.id}`);
    },
    handleExpandClick() {
      this.introShow = !this.introShow;
    },
    handleBlockClick() {
      this.blockShow = !this.blockShow;
    },
    handleUserClick() {
      var id = this.intro.info.user.id;
      window.open(`https://www.missevan.com/${id}/`, "_blank");
    },
    async getData() {
      this.intro = await get({
        url: `/api/sound/getsound?soundid=${this.$route.params.id}`
      });
      this.introRes = this.intro.info.sound;
      if(this.intro.info.user){
        this.introImg = this.intro.info.user.icon;
      this.drama = await get({
        url: `/api/dramaapi/getdramabysound?sound_id=${this.$route.params.id}`
      });
      this.dramaRes = this.drama.info.drama;

      if (this.drama.success != false) {
        this.cvs = this.drama.info.cvs;
        this.person = this.cvs.length;
        this.time = parseInt(this.dramaRes.create_time);
        this.time = this.timestampToTime(this.time);
      } else {
        this.time = parseInt(this.introRes.create_time);
        this.time = this.timestampToTime(this.time);
      }

      var like = await get({
        url: `/api/sound/getsoundlike?type=15&sound_id=${this.$route.params.id}`
      });
      this.likeDrama = like.info.dramas;
      this.likeSound = like.info.sounds;
      }
    }
  },
  async mounted() {
    this.getData();
  }
};
</script>
<style lang = "stylus" scoped>
.notShow {
  display: none !important;
}

.rotate {
  transform: rotate(180deg);
}

#soundintro {
  padding: 0.12rem 0.1rem;
  padding-bottom: 0.18rem;

  .intro-brief {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #e0e0e0;

    .title {
      font-size: 0.14rem;
      font-weight: 400;
      min-height: 0.24rem;
      line-height: 0.24rem;
    }

    .status {
      display: flex;
      margin: 0.1rem 0;

      li {
        margin-right: 0.2rem;
        padding-left: 0.16rem;
        line-height: 0.14rem;
        font-size: 0.1rem;
        color: #757575;
        height: 0.14rem;
        position: relative;
      }

      .play-times:before {
        background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
        background-size: 56px 55px;
        background-position: -44px -27px;
        content: '';
        position: absolute;
        left: 1px;
        width: 12px;
        height: 10px;
      }

      .comments:before {
        background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png'); // static.missevan.com/assets/m/images/build/sprite-icons-thumbnails@2x.8e0a6b22.png);
        background-size: 56px 55px;
        background-position: -15px -44px;
        content: '';
        position: absolute;
        left: 1px;
        width: 12px;
        height: 10px;
      }
    }

    .intro-cont {
      color: #9e9e9e;
      font-size: 0.12rem;

      .lot-intro {
        height: 0.2rem;
        overflow: hidden;
      }

      .intro-show {
        height: 100%;
        overflow: visible;
      }
    }

    .intro-cont p {
      margin: 0.02rem 0;
    }

    .btn-expand {
      display: block;
      background-size: 262px 234px;
      background-position: -247px -218px;
      width: 14px;
      height: 8px;
      background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
      display: block;
      position: relative;
      margin-left: calc(100% - 16px);
      transition: transform 0.3s;
    }
  }

  .sound-drama {
    display: flex;
    height: 1.04rem;
    border-bottom: 1px solid #e0e0e0;
    align-items: center;

    .drama-cover img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 3px;
    }

    .drama-details {
      margin-left: 0.2rem;
      color: #9e9e9e;
      width: 1.5rem;
      font-size: 0.12rem;

      .drama-title {
        font-size: 0.14rem;
        color: black;
      }
    }

    .btn-follow {
      width: 0.65rem;
      height: 0.26rem;
      margin: 0.16rem 0;
      padding: 0.03rem;
      padding-left: 0.2rem;
      float: right;
      border-color: #ed7760;
      background-color: #ed7760;
      color: #fff;
      font-size: 0.12rem;
      line-height: 0.18rem;
      border-radius: 3px;
      position: relative;
      left: 1rem;
    }

    .btn-follow:before {
      background-size: 262px 234px;
      background-position: -247px -118px;
      width: 0.13rem;
      height: 0.12rem;
      background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
      content: '';
      display: block;
      position: absolute;
      top: 0.06rem;
      left: 0.12rem;
    }

    .btn-follow:after {
      content: '\8FFD\5267';
      position: absolute;
      left: 0.3rem;
      top: 0.05rem;
    }
  }

  .sound-cv {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.1rem;

    .title {
      width: 1rem;
      margin-top: -0.1rem;
      background-color: #fff;
      margin-left: 36%;
    }

    .cv-cont {
      margin-left: 0.1rem;

      .btn-expand {
        display: block;
        position: relative;
        padding: 5px 0;
        text-align: center;
      }

      .btn-expand:before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        margin: 0 auto;
        transform: rotate(-135deg);
        border-top: 2px solid #9e9e9e;
        border-left: 2px solid #9e9e9e;
      }

      .cv-show {
        height: 100% !important;
        overflow: visible !important;
      }

      .cv-block {
        display: flex;
        flex-wrap: wrap;
        height: 1rem;
        overflow: hidden;

        .cv-sound {
          margin-top: 0.2rem;
          font-size: 0.12rem;
          color: #9e9e9e;
          width: 0.935rem;

          img {
            width: 46px;
            height: 46px;
            margin: 0 auto;
            border-radius: 50%;
          }

          .name {
            color: black;
          }
        }
      }
    }
  }

  .sound-user {
    display: flex;
    position: relative;
    height: 0.78rem;
    margin-bottom: 0.18rem;
    border-bottom: 1px solid #e0e0e0;
    align-items: center;

    img {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
    }

    .user-info {
      margin-left: 0.1rem;

      .username {
        display: block;
        margin-bottom: 0.02rem;
        color: #3d3d3d;
        font-size: 0.14rem;
      }

      .publish-time {
        font-size: 0.12rem;
        color: #8c8c8c;
      }
    }

    .btn-focus {
      height: 0.26rem;
      margin: 0.06rem 0;
      width: 0.65rem;
      position: absolute;
      right: 0;
      float: right;
      border-radius: 3px;
      padding: 0.03rem;
      border-color: #ed7760;
      background-color: #ed7760;
      color: #fff;
      font-size: 0.12rem;
      line-height: 0.2rem;
    }

    .btn-focus:after {
      content: '\5173\6CE8';
      position: absolute;
      left: 0.2rem;
    }
  }

  .sound-related {
    .related-drama {
      .selection {
        margin-bottom: 0.1rem;
        font-size: 0.13rem;
        color: #979797;
      }

      .drama-conts {
        display: flex;
        justify-content: space-around;

        .re-drama {
          width: 1.18rem;
          overflow: hidden;

          img {
            width: 1.18rem;
            height: 1.53rem;
          }

          .title {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 0.02rem;
            color: #424242;
            font-size: 0.13rem;
          }
        }
      }
    }

    .related-sound {
      margin-top: 0.2rem;

      .selection {
        margin-bottom: 0.1rem;
        font-size: 0.13rem;
        color: #979797;
      }

      .sound-conts {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>