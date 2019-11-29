<template>
  <div id="soundPage">
    <SoundPlayer v-bind="$attrs" :key="keyTime"></SoundPlayer>
  </div>
</template>

<script>
import SoundPlayer from "components/sound/SoundPlayer.vue";
export default {
  data() {
    return {
      keyTime: 0
    };
  },
  components: {
    SoundPlayer
  },
  mounted() {
    this.$nextTick();
  },
  watch: {
    "$route.params.id"() {
      this.keyTime = new Date().getTime();
    }
  }
};
</script>

<style>
</style>