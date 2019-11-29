<template>
  <div id="images">
    <img :src="item.front_cover" alt v-for="item in res" :key="item.id" />
  </div>
</template>

<script>
import { get } from "utils/http.js";
export default {
  async mounted() {
    var res = await get({
      url: `/api/sound/getSortedImage?soundid=${this.$route.params.id}`
    });
    this.res = res.info;
  },
  data() {
    return {
      res: []
    };
  }
};
</script>

<style lang="stylus" scoped>
#images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  img {
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.2rem;
  }
}
</style>