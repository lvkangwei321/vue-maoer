<template>
  <div class="panel-head">
    <div class="panel-title">
      <div class="callout">{{title}}</div>
    </div>
    <div class="panel-nav" @click="myClick">
      <span class="album-panel-type" v-if="panelType">{{panelType}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "panelType"],
  methods: {
    myClick() {
      this.$emit("func", "");
    }
  }
};
</script>

<style lang = "stylus" scoped>
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.24rem;
  margin: 0.2rem 0;
  line-height: 0.24rem;
  padding: 0 0.2rem;

  .panel-title {
    font-size: 0.16rem;

    .callout {
      position: relative;
      margin: 0.1rem 0;
      padding-left: 0.1rem;
    }

    .callout:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 10%;
      height: 80%;
      background-color: #000;
      width: 0.04rem;
      border-radius: 0.04rem;
    }
  }

  .panel-nav {
    font-size: 0.14rem;
    color: #9e9e9e;

    .album-panel-type {
      display: block;
      position: relative;
      float: right;
      background-color: #fff;
      border: 0.01rem solid #e0e0e0;
      border-radius: 0.2rem;
      width: 0.64rem;
      height: 0.24rem;
      line-height: 0.24rem;
      font-size: 0.13rem;
      text-align: center;
      color: #757575;
    }

    .album-panel-type:after {
      content: '';
      display: block;
      position: relative;
      float: right;
      top: 0.07rem;
      right: 0.12rem;
      width: 0.08rem;
      height: 0.08rem;
      box-sizing: border-box;
      border: 0.01rem solid #757575;
      border-bottom: none;
      border-left: none;
      transform: rotate(45deg);
    }
  }
}
</style>