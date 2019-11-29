<template>
  <div class="loading">
    <img
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573827947363&di=a1e802dc2cb9c362349ec11006ca58ca&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181114%2F7c252a7af87c4f29925a2732714571c6.gif"
      alt
    />
    <p class="title">正在疯狂加载~</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.loading {
  width: 100%;
  text-align: center;
  border-radius: 1.5rem;

  img {
    border-radius: 1.5rem;
  }

  .title {
    margin-top: 0.2rem;
    font-size: 0.25rem;
    color: grey;
  }
}
</style>