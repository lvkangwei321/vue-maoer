<template>
  <div id="rank">
    <div class="rank-header">排行榜</div>
    <RankItem v-for="(item,index) in rankRes" :item="item" :index="index" :key="item.id"></RankItem>
  </div>
</template>

<script>
import RankItem from "components/rank/RankItem.vue";
import { get } from "utils/http.js";
export default {
  components: {
    RankItem
  },
  data() {
    return {
      rankRes: []
    };
  },
  async mounted() {
    this.rankRes = await get({
      url: "/api/mobileWeb/albumList"
    });
    this.rankRes = this.rankRes.info;
  }
};
</script>

<style lang="stylus" scoped>
#rank {
  .rank-header {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.16rem;
    text-align: center;
    line-height .4rem
    border-bottom: 0.01rem solid #e0e0e0;
  }
}
</style>