<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item,index) in bannerList"
        :key="item.id"
        :index="index"
        :item="item"
      >
        <img :src="item.pic" alt @click="handleClick(index)" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { get } from "utils/http.js";
export default {
  props: ["bannerList"],
  methods: {
    handleClick(index) {
      this.$router.push({ path: this.bannerList[index].url.split("com/")[1] });
    }
  },
  mounted() {
    if (this.bannerList.length === 0) {
      return false;
    }
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true
      });
    });
  },
  watch: {
    bannerList() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          pagination: {
            el: ".swiper-pagination"
          },
          autoplay: true
        });
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.swiper-slide img {
  width: 4.14rem;
  height: 1.38rem;
}

.swiper-pagination {
  left: 1.4rem !important;
  bottom: 0 !important;

  .swiper-pagination-bullet-active {
    background: white !important;
  }
}
</style>