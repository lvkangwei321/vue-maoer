<template>
  <div class="sound-player">
    <div v-if="total !== undefined">
      <SoundImg></SoundImg>
      <SoundAction></SoundAction>
      <div class="sound-meta">
        <ul class="tab-list">
          <router-link :to="'./intro'" tag="li" class="tab" active-class="active" exact>简介</router-link>
          <router-link :to="'./comments'" tag="li" class="tab" active-class="active" exact>评论</router-link>
          <router-link :to="'./images'" tag="li" class="tab" active-class="active" exact>图片</router-link>
        </ul>
        <div class="total">( {{this.total}} )</div>
        <router-view v-bind="$attrs"></router-view>
      </div>
    </div>  
    <Loading v-else class="loading"></Loading>
  </div>
</template>

<script>
import SoundImg from "components/sound/SoundImg.vue";
import SoundAction from "components/sound/SoundAction.vue";
import { post, get } from "utils/http.js";
import Loading from "components/loading/Loading.vue";
export default {
  components: {
    SoundImg,
    SoundAction,
    Loading
  },
  data() {
    return {
      id: "/sound/" + this.$route.params.id,
      introRes: [],
      total: 0
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    var normalRes = await post("/api/site/getcomment", {
      order: 3,
      pagesize: 4,
      eId: id,
      type: 1,
      p: 1
    });
    if (normalRes.successVal.comment.num === undefined) {
      return false;
    }
    this.total = normalRes.successVal.comment.num;
  }
};
</script>

<style lang = "stylus" scoped>
.loading {
  margin: 1.5rem 0;
}

.sound-player {
  position: relative;
  width: 100%;

  .sound-meta {
    position: relative;

    .total {
      position: absolute;
      left: 2.22rem;
      top: 0.09rem;
      color: #9e9e9e;
    }

    .tab-list {
      background-color: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-around;

      .tab {
        height: 0.39rem;
        line-height: 0.39rem;
        color: #9e9e9e;
        font-size: 0.14rem;
        padding: 0 0.55rem;
        position: relative;
      }

      .tab:before {
        content: '';
        display: block;
        position: absolute;
        top: 10px;
        left: 0;
        border-left: 1px solid #e0e0e0;
        height: 18px;
      }

      .active {
        color: #c14a3f;
        border-bottom: 2px solid #c14a3f;
      }
    }
  }
}
</style>