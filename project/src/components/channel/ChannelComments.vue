<template>
  <div id="comments">
    <div class="comment hot-comment" v-for="item in normalRes" :key="item.id + '1'">
      <img :src="item.icon" alt class="comment-img" @click="handleClick(item)" />
      <div class="comment-body">
        <span class="name">{{item.username}}</span>
        <div class="comment-time">{{item.ctime}}</div>
        <div class="comment-like">{{item.like_num}}</div>
        <div class="comment-content">{{item.comment_content}}</div>
      </div>
    </div>
    <span class="get-more">更多热门评论 ></span>
    <div class="comment hot-comment" v-for="item in hotRes" :key="item.id">
      <img :src="item.icon" alt class="comment-img" @click="handleClick(item)"/>
      <div class="comment-body">
        <span class="name">{{item.username}}</span>
        <div class="comment-time">{{item.ctime}}</div>
        <div class="comment-like">{{item.like_num}}</div>
        <div class="comment-content">{{item.comment_content}}</div>
      </div>
    </div>
    <div class="download-app" @click="handleAppClick">
      <div class="download-cont">下载客户端，查看更多评论</div>
    </div>
  </div>
</template>

<script>
import { post, get } from "utils/http.js";
export default {
  data() {
    return {
      hotRes: [],
      normalRes: []
    };
  },
  methods: {
    handleAppClick() {
      this.$router.push("/download");
    },
    handleClick(item){
      window.open(`https://www.missevan.com/${item.id}/`)
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    var hotRes = await post("/api/site/getcomment", {
      order: 1,
      pagesize: 10,
      eId: id,
      type: 4,
      p: 1
    });
    var normalRes = await post("/api/site/getcomment", {
      order: 3,
      pagesize: 4,
      eId: id,
      type: 4,
      p: 1
    });
    this.normalRes = normalRes.successVal.comment.Datas;
    this.hotRes = hotRes.successVal.comment.Datas;
  }
};
</script>

<style lang="stylus" scoped>
#comments {
  .get-more {
    color: #c14a3f;
    display: block;
    position: relative;
    height: 0.2rem;
    margin: 0.2rem 0;
    font-size: 0.14rem;
    text-align: center;
  }

  .get-more:before {
    content: '';
    display: block;
    left: 0;
    position: absolute;
    width: calc(50% - 60px);
    top: 9px;
    border-bottom: 1px solid #e0e0e0;
  }

  .get-more:after {
    right: 0;
    content: '';
    display: block;
    position: absolute;
    width: calc(50% - 60px);
    top: 9px;
    border-bottom: 1px solid #e0e0e0;
  }

  .comment:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0.62rem;
    border-bottom: 1px solid #e0e0e0;
  }
  .comment:nth-child(4):after{
    border none
  } 
  .comment {
    position: relative;
    margin: 0.12rem 0.1rem;
    display: flex;
    font-size: 0.14rem;

    .comment-img {
      top: 0;
      left: 0.1rem;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
    }

    .comment-body {
      position: relative;
      padding: 0.03rem 0 0.12rem 0.1rem;
      color: #757575;
      font-size: 0.12rem;
      width: 100%;

      .comment-like {
        position: absolute;
        top: 0.05rem;
        right: 0;
        height: 0.16rem;
        line-height: 0.16rem;
        padding-left: 0.2rem;
        font-size: , 11rem;
        color: #757575;
        cursor: pointer;
      }

      .comment-like:before {
        content: '';
        position: absolute;
        top: -1px;
        left: 0;
        width: 16px;
        height: 16px;
        background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.1592535d.png);
        background-position: -94px -74px;
        background-size: 262px 234px;
      }

      .comment-content {
        padding-top: 0.06rem;
        word-break: break-all;
        font-size: 0.14rem;
        color: black;
      }
    }
  }

  .download-app {
    margin: 0.28rem 0;
    display: flex;
    justify-content: center;

    .download-cont {
      margin: 0;
      height: 0.32rem;
      line-height: 0.18rem;
      font-size: 0.14rem;
      border-radius: 0.06rem;
      width: 2.06rem;
      color: #fff;
      background-color: #c14a3f;
      border-color: #c14a3f;
      padding: 0.06rem 0.18rem;
    }
  }
}
</style>