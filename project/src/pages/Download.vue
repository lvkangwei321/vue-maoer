<template>
  <div id="app">
    <img src="https://static.missevan.com/app/mobilebg.jpg" alt />
    <div class="btn-row">
      <a href="https://www.missevan.com/app/download?device=0&ct=missevan"></a>
      <a href="https://www.missevan.com/app/download?device=1"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["scroll"],   


  
  async mounted() {
    if (typeof this.scroll == "object") {
      location.reload();
    }
  }
};
</script>

<style lang = "stylus" scoped>
#app img {
  width: 100%;
}

.btn-row {
  position: absolute;
  width: 100vw;
  height: 0.6rem;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  top: 70vw;

  :nth-child(1) {
    background-position: 0 0;
    width: 1.01rem;
    display: block;
    height: 0.36rem;
    background: url('https://static.missevan.com/assets/m/images/build/sprite-icons-app@2x.51ed024b.png');
    background-size: 1.71rem 0.74rem;
  }

  :nth-child(2) {
    width: 1.01rem;
    display: block;
    height: 0.36rem;
    background: url('https://static.missevan.com/assets/m/images/build/sprite-icons-app@2x.51ed024b.png');
    background-size: 1.71rem 0.74rem;
    background-position: 0 -0.38rem;
  }
}
</style>