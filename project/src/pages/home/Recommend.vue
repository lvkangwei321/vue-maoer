<template>
  <div id="recommend">
    <div class="recommend-cont" v-if="musicList.length !== 0">
      <Banner :bannerList="bannerList"></Banner>
      <SoundsList :soundsList="soundsList"></SoundsList>
      <ChannelList :channelList="channelList"></ChannelList>
      <MusicList v-for="(item,index) in musicList" :key="item.id" :index="index" :item="item"></MusicList>
    </div>
    <div v-else>
      <Loading class="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Banner from "components/recommend/Banner.vue";
import SoundsList from "components/recommend/SoundsList.vue";
import ChannelList from "components/recommend/ChannelList.vue";
import MusicList from "components/recommend/MusicList.vue";
import Loading from "components/loading/Loading.vue";
import { get } from "utils/http.js";
export default {
  components: {
    Banner,
    SoundsList,
    ChannelList,
    MusicList,
    Loading
  },


  data() {
    return {
      soundsList: [],
      channelList: [],
      musicList: [],
      bannerList: []
    };
  },
  async mounted() {
    var result = await get({ url: "/api/mobileWeb/newHomepage3" });
    this.soundsList = result.info.sound.slice(0, 3);
    this.channelList = result.info.channel;
    this.bannerList = result.info.banner;
    var musicResult = await get({ url: "/api/sound/newhomepagedata" });
    this.musicList = musicResult.music;
  }
};
</script>

<style lang = "stylus" scoped>
.loading {
  padding: 30% 0;
}
</style>