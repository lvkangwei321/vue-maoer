<template>
  <div id="home">
    <ul class="tab-list">
      <router-link to="/albums" tag="li" class="tab" active-class="active">音单</router-link>
      <router-link to="/recommend" tag="li" class="tab" active-class="active">推荐</router-link>
      <router-link to="/catalogs" tag="li" class="tab" active-class="active">分类</router-link>
    </ul>
    <router-view :key="keyTime"></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    "$route.params.id"() {
      setTimeout(function(){
        this.keyTime = new Date().getTime();
      }.bind(this),600)
      
    }
    },
    data() {
      return {
        keyTime:0
      }
    },
};
</script>

<style lang = 'stylus' scoped>
#home {
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
      padding: 0 0.3rem;
    }

    .active {
      color: #000000;
      border-bottom: 2px solid #000;
    }
  }
}
</style>