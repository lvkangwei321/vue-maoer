<template>
  <div id="albums">
    <div v-if="albumsList.length !==0">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <div class="type-cont" v-if="show">
          <div class="tap-title">
            <span class="btn" @click="showType">取消</span>
            <span class="my-title">类型选择</span>
          </div>
          <div class="tags-row" @click="handleHomeClick">全部音单</div>
          <TypeList></TypeList>
        </div>
      </transition>
      <Title :title="title" :panelType="panelType" v-on:func="showType"></Title>

      <div class="panel-body">
        <AlbumsItem v-for="(item,index) in albumsList" :item="item" :key="item.id" :index="index"></AlbumsItem>
      </div>
      <div v-if="page<=0">
        <button class="open-app" @click="handleClick">更多</button>
      </div>
      <div v-else>
        <button class="open-app" @click="handleAppClick">下载APP查看更多</button>
      </div>
    </div>
    <div v-else>
      <Loading class="loading"></Loading>
    </div>
  </div>
</template>
<script>
import AlbumsItem from "components/albums/AlbumsItem.vue";
import Loading from "components/loading/Loading.vue";
import Title from "components/Title.vue";
import { get } from "utils/http.js";
import TypeList from "components/type/TypeList.vue";
import { Bus } from "utils/bus.js";
export default {
  components: {
    AlbumsItem,
    Loading,
    Title,
    TypeList
  },
  data() {
    return {
      albumsList: [],
      title: "全部音单",
      panelType: "类型",
      page: 0,
      show: false,
      id:this.$route.params.id
    };
  },
  async mounted() {
    
    Bus.$on("changeShow", data => {
      this.show = data;
    });
    if(this.id === undefined){
    var albumsRes = await get({
      url: "/api/explore/tagalbum?order=0"
    });
      this.albumsList = albumsRes.albums;
    }
    else{
      var albumsRes = await get({
      url: `/api/explore/tagalbum?order=0&tid=${this.$route.params.id}`
    });
    this.albumsList = albumsRes.albums;
    this.title = this.$route.query.data
    }
  },
  methods: {
    handleHomeClick(){
      if(this.$route.path !== '/albums'){
        this.$router.push('/albums')
      }
      this.showType()
    },
    handleAppClick() {
      this.$router.push("/download");
    },
    async handleClick() {
      this.page++;
      var albumsMoreRes = await get({
        url: "/api/explore/tagalbum?order=1"
      });
      albumsMoreRes = albumsMoreRes.albums;
      this.albumsList = [...this.albumsList, ...albumsMoreRes];
    },
    showType(data) {
      this.show = !this.show;
    }
  }
};
</script>
<style lang="stylus" scoped>
#albums {
  .panel-body {
    display: flex;
    flex-wrap: wrap;
  }

  .loading {
    padding: 30% 0;
  }

  .open-app {
    display: block;
    width: 80%;
    height: 0.3rem;
    margin: 0.1rem auto;
    background-color: #e0e0e0;
    border: none;
    font-size: 0.14rem;
  }

  .type-cont {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    background-color: #fff;

    .tap-title {
      line-height: 0.4rem;
      font-size: 0.16rem;
      border-bottom: 0.01rem solid #eee;
      height: 0.4rem;
      margin-top: 0.4rem;

      .btn {
        color: #9e9e9e;
        position: relative;
        left: 5%;
      }

      .my-title {
        position: relative;
        left: 35%;
      }
    }

    .tags-row {
      height: 0.46rem;
      width: 90%;
      position: relative;
      left: 5%;
      border: 1px solid #3d3d3d;
      text-align: center;
      line-height: 0.46rem;
      margin: 0.1rem 0;
      font-weight: 700;
      font-size: 0.14rem;
    }
  }
}
</style>