<template>
  <div id="drama" :class="{'extend':all}">
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <div class="all" v-if="all">
        <div class="sub-header">
          <div class="return" @click="handleClick">返回</div>
          {{dramaRes.name}}
        </div>
        <div class="sub-cont">
          <div
            class="sub-item"
            v-for="item in episodes.episode"
            :key="item.id"
            @click="handleSoundClick(item.sound_id)"
          >
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="drama-cont">
      <span class="title">{{dramaRes.name}}</span>
      <div class="wall-blur" :style="{background: 'url('+ coverSrc +')'} "></div>
      <div class="wall-cover" :style="{background: 'url('+ coverSrc +')'} ">
        <span class="view-count">4756</span>
      </div>
    </div>
    <div class="drama-detail">
      <p class="detail-author">原创 {{dramaRes.author}}</p>
      <p class="detail-type">类型: {{dramaRes.type}}</p>
      <p class="detail-type" v-if="dramaRes.serialize">更新中</p>
      <p class="detail-type" v-else>已完结</p>
    </div>
    <Title :title="title" :panelType="panelType" v-on:func="handleClick"></Title>
    <div class="scroll">
      <div class="scroll-cont">
        <div
          class="drama-item"
          v-for="item in episodes.music"
          :key="item.id"
          @click="handleSoundClick(item.sound_id)"
        >
          <div>{{item.name}}</div>
        </div>
        <div
          class="drama-item"
          v-for="item in episodes.episode"
          :key="item.id"
          @click="handleSoundClick(item.sound_id)"
        >
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <Title :title="title2"></Title>
    <div class="intro-cont" :class="{'intro-fold':fold}" v-html="dramaRes.abstract"></div>
    <div v-if="ifFold">
      <div class="unfold" v-if="fold" @click="handleFoldClick"></div>
      <div class="fold" v-else @click="handleFoldClick"></div>
    </div>
  </div>
</template>

<script>
import Title from "components/Title.vue";
import { get } from "utils/http.js";
export default {
  data() {
    return {
      title: "选集",
      panelType: "全部",
      title2: "简介",
      fold: true,
      dramaRes: [],
      episodes: [],
      coverSrc: "",
      ifFold: false,
      all: false
    };
  },
  components: {
    Title
  },
  async mounted() {
    var res = await get({
      url: `/api/dramaapi/getdrama?drama_id=${this.$route.params.id}`
    });
    this.dramaRes = res.info.drama;
    this.episodes = res.info.episodes;
    this.coverSrc =
      "https://static.missevan.com/dramacoversmini/" + this.dramaRes.cover;
    this.ifFold = this.dramaRes.abstract.split("<p>").length > 2;
  },
  methods: {
    handleClick() {
      this.all = !this.all;
    },
    handleFoldClick() {
      this.fold = !this.fold;
    },
    handleSoundClick(id) {
      this.$router.push(`/sound/${id}`);
    }
  }
};
</script>

<style lang = "stylus" scoped>
.extend{
  height : 180VH !important
}
#drama {
  position: relative;
  height: auto
  .all {
    width: 100%;
    z-index: 100;
    height: 180VH;
    position: absolute;
    background-color: #eee;

    .sub-header {
      display: block;
      width: 100%;
      line-height: 40px;
      background-color: #fff;
      color: #000;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #e0e0e0;
      position: relative;

      .return {
        position: absolute;
        width: 1rem;
        border: 1px solid #ddd;
        color: #ddd;
        border-radius: .04rem;
        left: 0;
      }
    }

    .sub-cont {
      display: flex;
      width: 100%;
      flex-wrap: wrap;

      .sub-item {
        align-items: center;
        position: relative;
        background-color: #fff;
        text-align: center;
        line-height: 0.56rem;
        border: 1px solid #e0e0e0;
        color: #616161;
        margin-right: 5px;
        margin-top: 10px;
        font-size: 13px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 0.56rem;
        width: calc(50vw - 0.3rem);
        border-radius: 4px;
        margin: 5px 10px;
      }
    }
  }

  .drama-cont {
    text-align: center;
    z-index: 1;
    height: 2.16rem;
    width: 100%;
    position: relative;

    .title {
      font-size: 0.16rem;
      position: relative;
      top: 0.55rem;
      z-index: 1;
      color: white;
    }

    .wall-blur {
      height: 2.16rem;
      filter: blur(20px);
      position: absolute;
      overflow: hidden;
      left: -20px;
      right: -20px;
      top: 20px;
      z-index: 0;
      background-repeat: no-repeat;
      position: absolute;
    }

    .wall-cover {
      position: absolute;
      z-index: 10;
      height: 184px;
      width: 184px;
      border: 2px solid #fff;
      border-radius: 4px;
      top: 0.84rem;
      left: calc(50vw - 92px);
      background-position: 50% !important;
      background-size: cover !important;

      .view-count {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 38px;
        font-size: 12px;
        box-sizing: border-box;
        color: #fff;
        padding: 20px 10px 20px 30px;
      }

      .view-count:before {
        content: '';
        display: block;
        position: absolute;
        left: 10px;
        top: 23px;
        height: 11px;
        width: 14px;
        background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
        background-position: -247px -174px;
        background-size: 262px 234px;
      }
    }
  }

  .drama-detail {
    margin-top: 0.7rem;
    width: 100%;
    text-align: center;
    font-size: 0.12rem;
    color: #757575;
  }

  .scroll {
    left: -12px;
    z-index: 100;
    padding-left: 12px;

    .scroll-cont {
      display: flex;
      flex-wrap: wrap;
      height: 1.4rem;
      overflow: hidden;

      .drama-item {
        display: flex;
        align-items: center;
        -webkit-flex: 0 0 auto;
        justify-content: center;
        -moz-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        position: relative;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        color: #616161;
        font-size: 13px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 56px;
        width: 106px;
        padding: 6px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        margin: 0 0.1rem;
        margin-top: 0.1rem;
      }
    }
  }

  .intro-cont {
    display: block;
    position: relative;
    font-size: 0.13rem;
    margin: 0 0.2rem 0.1rem 0.2rem;
    color: #616161;
    white-space: pre-wrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    box-orient: vertical;
    line-clamp: 3;
    line-height: 18px;
    margin-bottom: 5px;
  }

  .intro-fold {
    height: 0.54rem;
    display: block;
  }

  .fold {
    color: #9e9e9e;
    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 10px;
  }

  .fold:before {
    content: '';
    height: 4px;
    width: 7px;
    top: 7px;
    left: calc(50% + 14px);
    display: block;
    position: absolute;
    background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
    background-position: -103px -92px;
    background-size: 262px 234px;
  }

  .fold:after {
    font-size: 12px;
    content: '\6536\8D77';
  }

  .unfold {
    color: #9e9e9e;
    display: block;
    position: relative;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 10px;
  }

  .unfold:before {
    content: '';
    height: 4px;
    width: 7px;
    top: 7px;
    left: calc(50% + 14px);
    display: block;
    position: absolute;
    background-image: url('https://static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
    background-position: -94px -92px;
    background-size: 262px 234px;
  }

  .unfold:after {
    font-size: 12px;
    content: '\5C55\5F00';
  }
}
</style>