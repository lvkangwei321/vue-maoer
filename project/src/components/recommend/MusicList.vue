<template>
  <div class="panel-sounds">
    <div class="panel-head">
      <div class="panel-title">
        <i :class="'img' + item.id"></i>
        {{item.title}}
      </div>
      <div class="panel-nav">
        <a href="javascript:void(0)" @click="handleClick(item)">更多</a>
      </div>
    </div>

    <div class="panel-body">
      <MusicItem v-for="(item,index) in content" :key="item.id" :index="index" :item="item"></MusicItem>
    </div>
  </div>
</template>

<script>
import MusicItem from "components/recommend/MusicItem.vue";
export default {
  props: ["item"],
  components: {
    MusicItem
  },
  methods: {
    handleClick(item){
      this.$router.push(`/catalogs/${item.id}`)
    }
  },
  data() {
    return {
      content: this.item
    };
  },
  mounted() {
    this.content = this.content.objects_point;
  }
};
</script>

<style lang = "stylus" scoped>
.panel-sounds {
  padding-bottom: 0.16rem;
  margin: 0.1rem 0;

  .panel-head {
    width: 100%;
    padding: 0 0.2rem;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .panel-title {
      display: flex;
      align-items: center;
      font-size: 0.16rem;

      i {
        background: url('https://static.missevan.com/assets/m/images/build/sprite-icons-catalog@2x.4584f6ff.png');
        display: block;
        width: 0.26rem;
        height: 0.26rem;
        background-size: 1.66rem 1.66rem;
        background-position: -0.84rem -0.56rem;
      }

      .img5 {
        background-position: -0.56rem -0.28rem;
      }

      .img8 {
        background-position: -0.28rem -0.56rem;
      }

      .img26 {
        background-position: -0.84rem 0;
      }

      .img41 {
        background-position: -0.84rem -0.28rem;
      }

      .img6 {
        background-position: 0 -0.56rem;
      }

      .img65 {
        background-position: -0.84rem -0.84rem;
      }

      .img54 {
        background-position: -0.28rem -0.84rem;
      }
    }

    .panel-nav {
      a {
        font-size: 0.13rem;
        color: #9e9e9e;
      }
    }

    .panel-nav:after {
      background-size: 262px 234px;
      background-position: -223px -132px;
      width: 18px;
      height: 18px;
      background-image: url('//static.missevan.com/assets/m/images/build/sprite-icons@2x.bfd3fcc1.png'); // static.missevan.com/assets/m/images/build/sprite-icons@2x.bfd3fcc1.png)
      content: '';
      display: inline-block;
      position: relative;
      top: 4px;
      right: -3px;
    }
  }

  .panel-body {
    margin: 0 0.2rem;
    display: flex;
    justify-content: space-around;
  }
}
</style>