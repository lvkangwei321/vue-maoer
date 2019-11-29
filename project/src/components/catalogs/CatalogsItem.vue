<template>
  <div class="catalog"   @click="handleClick(item)">
    <span class="catalog-icon">
      <img :src="item.pic" alt />
    </span>
    <span class="catalog-title">{{item.title}}</span>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    handleClick(item){
      this.$router.push(`catalogs/${item.id}`)
    }
  }
};
</script>
<style lang = "stylus" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  width: 1.22rem;
  height: 1.04rem;
  margin: 0 0.06rem 0.1rem 0;
  font-size: 0.14rem;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 0.04rem;
  background-color: #fff;

  .catalog-icon img {
    display: block;
    height: 50px;
    width: 50px;
    margin: 15px auto 8px;
  }
}
</style>