<template>
  <div id="catalogs">
    <div class="catalog-cont" v-if="catalogsList.length !== 0">
      <CatalogsItem v-for="(item,index) in catalogsList" :item="item" :key="item.id" :index="index"></CatalogsItem>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </div>
</template>
<script>
import CatalogsItem from "components/catalogs/CatalogsItem.vue";
import Loading from "components/loading/LoadingTwo.vue";
import { get } from "utils/http.js";
export default {
  components: {
    CatalogsItem,
    Loading
  },
  data() {
    return {
      catalogsList: []
    };
  },
  async mounted() {
    var catalogsRes = await get({
      url: "/api/mobileWeb/catalogroot"
    });
    this.catalogsList = catalogsRes.info;
    console.log(this.catalogsList);
    
    this.catalogsList.splice(5, 0, {
      title: "日抓",
      id: "41",
      pic: "http://static.missevan.com/app/41.png"
    });
  }
};
</script>
<style lang = "stylus" scoped>
#catalogs {
  padding-bottom: 2rem;

  .catalog-cont {
    display: flex;
    flex-wrap: wrap;
    padding: 0.14rem;
  }
}
</style>